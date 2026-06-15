import fs from "fs/promises";
import path from "path";
import handlebars from "handlebars";
import pdf from "html-pdf-node";

const UPLOAD_DIR = path.join("public", "uploads");

/**
 * Simple HTML-to-PDF Converter Utility
 */
export async function generateProductPdf(inputData) {
  try {
    // 1. Calculate the total price of all brands
    const calculatedTotal = inputData.brands.reduce(
      (sum, brand) => sum + (parseFloat(brand.price) || 0),
      0,
    );

    // 2. Format data payload for the HTML template
    const templatePayload = {
      productName: inputData.productName,
      productDescription: inputData.productDescription,
      sellerId: inputData.sellerId || "N/A",
      generationDate: new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      brands: inputData.brands,
      totalPrice: calculatedTotal.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
      }),
    };

    // 3. Read and populate the template file using Handlebars
    const templatePath = path.join("src", "templates", "product-template.html");
    const rawHtml = await fs.readFile(templatePath, "utf-8");
    const compiledHtml = handlebars.compile(rawHtml)(templatePayload);

    // 4. Run the simple HTML-to-PDF conversion
    const options = {
      format: "A4",
      margin: { top: "20mm", bottom: "20mm", left: "20mm", right: "20mm" },
    };
    const file = { content: compiledHtml };

    // This converts the HTML string directly into a file buffer
    const pdfBuffer = await pdf.generatePdf(file, options);

    // 5. Ensure the destination directory exists and save the file
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    const fileName = `product-summary-${Date.now()}.pdf`;
    const fullWritePath = path.join(UPLOAD_DIR, fileName);

    await fs.writeFile(fullWritePath, pdfBuffer);

    // 6. Return the public asset path
    return `/uploads/${fileName}`;
  } catch (error) {
    console.error("❌ PDF Conversion Failed:", error.message);
    throw new Error(`PDF generation failed: ${error.message}`);
  }
}
