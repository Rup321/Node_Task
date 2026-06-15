import * as dbOperations from '../../utils/dbOperations.js';
import * as commonFunctions from '../../utils/commonFunctions.js';
import models from '../models/index.js';
import { Op } from 'sequelize';
import { BadRequestError } from '../../utils/customErrors.js';
import { specificationSheetTemplate } from '../../utils/pdf/pdfTemplate.js';
import { compileHtmlTemplate, generatePdfBuffer } from '../../utils/pdf/index.js';
import { user_roles } from '../../utils/enums.js';

export async function createProduct({ userId, name, description, brands = [] }) {
  await validateBrandImages({ brandsImageIds: brands.map((brand) => brand.file_id), userId });

  const finalProduct = await models.sequelize.transaction(async (transaction) => {
    const product = await dbOperations.findOne({
      model: models.product,
      condition: {
        name,
      },
      transaction,
    });

    if (product) {
      throw new BadRequestError('Product with this name already exists');
    }

    const productResult = await dbOperations.create({
      model: models.product,
      body: {
        name,
        description,
        seller_id: userId,
      },
      transaction,
    });

    if (brands && brands.length > 0) {
      const mappedBrands = brands.map((brand) => ({
        ...brand,
        product_id: productResult.id,
        user_id: userId,
      }));

      await dbOperations.create({
        model: models.brand,
        body: mappedBrands,
        isBulk: true,
        transaction,
      });
    }

    return productResult;
  });

  return commonFunctions.handleSuccess('Product Created Successfully', finalProduct);
}

export async function getProducts({ page = 1, limit = 10, search = '' }) {
  const result = await dbOperations.findAll({
    model: models.product,
    condition: {
      deleted_at: null,
      ...(search && {
        [Op.or]: [{ name: { [Op.iLike]: `%${search}%` } }, { description: { [Op.iLike]: `%${search}%` } }],
      }),
    },
    include: [
      {
        model: models.brand,
      },
    ],
    ...commonFunctions.getPagination({ page, limit }),

    //NOTE: Forces Sequelize to count the distinct primary keys
    // of the main model (products) rather than the duplicated JOIN rows.
    distinct: true,
  });

  return commonFunctions.handleSuccess(
    'Products Fetched Successfully',
    commonFunctions.paginatedResponse({
      page,
      limit,
      totalCount: result.count,
      responses: await calculateAveragePriceForProduct(result.rows),
    }),
  );
}

export const generatePdfBufferFromProducts = async ({ productId, userId }) => {
  const rawProduct = await dbOperations.findOne({
    model: models.product,
    condition: { id: productId },
    include: [
      {
        model: models.brand,
        attributes: ['name', 'detail', 'price'],
        // Include the alias we just defined in the model
        include: [{ model: models.file, as: 'image' }],
      },
    ],
  });

  if (!rawProduct) throw new NoDataFoundError('Product not found');

  const productData = rawProduct.get({ plain: true });

  const calculatedTotal = productData.brands.reduce((sum, brand) => {
    return sum + Number(brand.price || 0);
  }, 0);

  const dynamicData = {
    generationDate: new Date().toLocaleDateString(),
    sellerId: userId,
    products: [
      {
        name: productData.name,
        description: productData.description,
        totalPrice: calculatedTotal.toFixed(2),
        brands: productData.brands.map((brand) => ({
          name: brand.name,
          detail: brand.detail,
          price: Number(brand.price).toFixed(2),
          imagePath: brand.image?.file_url,
        })),
      },
    ],
  };

  const finalHtml = compileHtmlTemplate(specificationSheetTemplate, dynamicData);
  const pdfBuffer = await generatePdfBuffer(finalHtml);

  return pdfBuffer;
};

export async function deleteProduct({ productId, userId, role }) {
  const product = await dbOperations.findOne({
    model: models.product,
    condition: {
      id: productId,
      ...(role === user_roles.seller && { seller_id: userId }),
    },
  });

  if (!product) {
    throw new Error('Product not found or not owned by the user');
  }

  await dbOperations.destroy({
    model: models.product,
    condition: {
      id: productId,
      ...(role === user_roles.seller && { seller_id: userId }),
    },
  });

  return commonFunctions.handleSuccess('Product deleted successfully');
}

/* <----------------- Utils -----------------> */

async function validateBrandImages({ brandsImageIds, userId }) {
  const imageCount = await dbOperations.count({
    model: models.file,
    condition: {
      id: {
        [Op.in]: brandsImageIds,
      },
      user_id: userId,
    },
  });

  if (imageCount !== brandsImageIds.length) {
    throw new Error('One or more brand image IDs are invalid or not owned by the user');
  }
}

async function calculateAveragePriceForProduct(products) {
  const formattedResponses = products.map((product) => {
    // Convert the Sequelize model instance into a standard JSON object
    const productData = product.get({ plain: true });

    let averagePrice = 0;

    // Ensure brands exist and calculate the average
    if (productData.brands && productData.brands.length > 0) {
      const totalPrice = productData.brands.reduce((sum, brand) => {
        //NOTE: Ensure price is treated as a number (Decimal types sometimes return as strings from Postgres)
        return sum + Number(brand.price || 0);
      }, 0);

      averagePrice = totalPrice / productData.brands.length;
    }

    // Attach the calculated field (rounded to 2 decimal places)
    productData.averagePrice = Number(averagePrice.toFixed(2));

    return productData;
  });

  return formattedResponses;
}
