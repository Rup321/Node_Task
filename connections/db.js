import sequelize from "../config/sequelize.js";
import { db_config_schema } from "../src/validations/db.js";
import { CONSTANT } from "../utils/constants.js";

await validateDbConfiguration();
await connectDatabase();

// authenticate db schema first
async function validateDbConfiguration() {
  try {
    await db_config_schema.validateAsync(CONSTANT.DB);
    console.log("✅ Database Configuration Validated.");
  } catch (error) {
    console.error("❌ Invalid Database Configuration:", error.message);
    process.exit(1);
  }
}

/**
 * Attempts to authenticate and establish a connection with the database.
 * Automatically retries every 5 seconds if the connection fails.
 */
export async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database Connected Successfully");

    // Run database sync logic if configuration is explicitly set to ALTER or FORCE
    if (CONSTANT.DB.SYNC !== "NONE") {
      await sequelize.sync({
        alter: CONSTANT.DB.SYNC === "ALTER",
        force: CONSTANT.DB.SYNC === "FORCE",
      });
      console.log(`🔄 Database Schema Synced via: ${CONSTANT.DB.SYNC}`);
    }
  } catch (err) {
    console.error(
      `🚨 DB Connection Failed\n${err.message}\n\nRetrying in 5000ms...\n`,
    );
    setTimeout(connectDatabase, 5000);
  }
}

/**
 * NOTE: Development utility only.
 * Regularly monitors and tracks idle transactions that were opened but never closed.
 */
export const idleTransactionsWatcher = () => {
  setInterval(async () => {
    try {
      const [results] = await sequelize.query(`
        SELECT pid, state, query, now() - xact_start AS open_for
        FROM pg_stat_activity
        WHERE state = 'idle in transaction'
      `);

      if (results.length > 0) {
        console.warn(
          "⚠️ Idle transactions detected in Postgres engine:",
          results,
        );
      }
    } catch (err) {
      console.error(
        "❌ Error while running idle transactions watcher:",
        err.message,
      );
    }
  }, 30000); // Runs every 30 seconds
};
