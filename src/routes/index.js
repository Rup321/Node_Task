import { Router } from "express";
import { readdirSync } from "fs";
import { basename as _basename, join, dirname } from "path";
import { fileURLToPath, pathToFileURL } from "url";

// Reconstruct __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const basename = _basename(__filename);

const router = Router();

// Wrap in an async function to handle dynamic imports properly
const loadRoutes = async () => {
  const files = readdirSync(__dirname).filter(
    (file) =>
      file.indexOf(".") !== 0 && // Ignore hidden files like .DS_Store
      file !== basename && // Ignore this index.js file
      file.slice(-3) === ".js", // Only parse .js files
  );

  // Use a for...of loop to await each import sequentially
  for (const file of files) {
    const fileName = file.split(".js")[0];
    const mainRoute = fileName === "index" ? "/" : `/${fileName}`;

    const filePath = join(__dirname, file);

    // Load the route module using a secure file URL
    const module = await import(pathToFileURL(filePath).href);

    // Ensure the individual route file exports a default Express router
    const routeMiddleware = module.default;

    if (routeMiddleware) {
      router.use(mainRoute, routeMiddleware);
    } else {
      console.warn(`[Router] Warning: ${file} does not have a default export.`);
    }
  }
};

// Execute the async loading using top-level await
await loadRoutes();

export default router;
