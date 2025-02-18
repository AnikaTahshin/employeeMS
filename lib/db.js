import mysql from "mysql2/promise";

let connection;

export const createConnection = async () => {
  console.log("DATABASEEEEEEEEEEEe", {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
  });
  try {
    if (!connection) {
      connection = await mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        port: process.env.DATABASE_PORT,
      });
      console.log("Database connection successful");
    }
    return connection;
  } catch (error) {
    console.error("Database connection failed:", {
      code: error.code,
      errno: error.errno,
      sqlState: error.sqlState,
      message: error.message,
    });
    throw error;
  }
};
