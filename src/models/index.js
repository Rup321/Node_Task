"use strict";

import { readdirSync } from "fs";
import { fileURLToPath, pathToFileURL } from "url";
import { dirname, basename as _basename, join } from "path";
import Sequelize, { DataTypes } from "sequelize";
import sequelize from "../../config/sequelize.js";

// Reconstruct __filename and __dirname for ESM environments
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const basename = _basename(__filename);
const db = {};

// Encapsulate dynamic imports in an async execution flow
const loadModels = async () => {
  const files = readdirSync(__dirname).filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  });

  // Process sequentially to maintain deterministic loading
  for (const file of files) {
    const filePath = join(__dirname, file);

    // pathToFileURL guarantees cross-platform reliability for absolute paths
    const module = await import(pathToFileURL(filePath).href);

    // Extract the default export (your model initialization function)
    const model = module.default(sequelize, DataTypes);
    db[model.name] = model;
  }

  // Run associations after all models are loaded
  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
};

// Top-level await blocks execution until the DB object is fully hydrated
await loadModels();

export default db;
