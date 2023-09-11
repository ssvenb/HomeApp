import { Pool } from "pg";

export const db = new Pool();
export async function initDB() {
  try {
    await db.query("SELECT * FROM stores;");
    console.log("Successfully connected to Database");
    return true;
  } catch (err) {
    try {
      await db.query(
        "CREATE TABLE stores(id BIGSERIAL NOT NULL PRIMARY KEY, name VARCHAR(100) NOT NULL);"
      );
      await db.query(
        "CREATE TABLE items(id BIGSERIAL NOT NULL PRIMARY KEY, name VARCHAR(100) NOT NULL, store INT NOT NULL);"
      );
      await db.query(
        "CREATE TABLE todos(id BIGSERIAL NOT NULL PRIMARY KEY, name VARCHAR(100) NOT NULL);"
      );
      console.log("Successfully initialized Database");
      return true;
    } catch (err) {
      console.error("Failed to connect to Database");
      return false;
    }
  }
}
