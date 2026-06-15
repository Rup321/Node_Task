// Insert a single record or multiple records (bulk) into the database
export async function create({
  model,
  body,
  isBulk = false,
  transaction = null,
  returning = true,
}) {
  const options = transaction ? { transaction } : {};

  if (isBulk) {
    return await model.bulkCreate(body, { ...options, returning });
  }

  return await model.create(body, options);
}

// Find a single record matching the provided conditions
export async function findOne({
  model,
  condition,
  include,
  attributes,
  raw = false,
  transaction = null,
}) {
  const fetchedRecord = await model.findOne({
    where: condition,
    include,
    attributes,
    raw,
    ...(transaction && { transaction }),
  });

  return fetchedRecord;
}

// Update records matching the target conditions
export async function update({
  model,
  condition,
  updatedBody,
  options = {},
  transaction = null,
}) {
  const returning = options.returning ?? false;
  const individualHooks = options.individualHooks ?? true;

  const updateRecord = await model.update(updatedBody, {
    where: condition,
    returning,
    individualHooks,
    ...(transaction && { transaction }),
  });

  return updateRecord;
}

// Delete records from the database (supports soft-delete or hard-force delete)
export async function destroy({
  model,
  condition,
  hardDelete = false,
  transaction = null,
}) {
  const options = {
    where: condition,
    force: hardDelete,
    ...(transaction && { transaction }),
  };

  const deletedRecord = await model.destroy(options);
  return deletedRecord;
}

// Fetch records alongside a total row count (ideal for paginated lists)
export async function findAll({
  model,
  condition,
  attributes,
  include,
  group,
  order,
  limit,
  offset,
  transaction = null,
  nested = true,
  raw = false,
  distinct = false,
  subQuery,
}) {
  const fetchedRecord = await model.findAndCountAll({
    ...(condition && { where: condition }),
    ...(attributes && { attributes }),
    ...(include && { include }),
    ...(group && { group }),
    ...(order && { order }),
    ...(limit !== undefined && { limit }),
    ...(offset !== undefined && { offset }),
    ...(transaction && { transaction }),
    ...(subQuery === false ? { subQuery } : {}),
    distinct,
    raw,
    nested,
  });

  return fetchedRecord;
}

// Look up a record explicitly by its primary key value
export async function findByPk({
  model,
  id,
  condition,
  include,
  attributes,
  subQuery,
  nested = true,
  raw = true,
  transaction = null,
}) {
  const fetchedRecord = await model.findByPk(id, {
    ...(condition && { where: condition }),
    ...(include && { include }),
    ...(attributes && { attributes }),
    ...(subQuery === false ? { subQuery } : {}),
    ...(transaction && { transaction }),
    raw,
    nested,
  });

  return fetchedRecord;
}

// Counts the matching total entries for a query condition
export async function count({ model, condition, transaction = null }) {
  const recordCount = await model.count({
    where: condition,
    ...(transaction && { transaction }),
  });

  return recordCount ?? 0;
}
