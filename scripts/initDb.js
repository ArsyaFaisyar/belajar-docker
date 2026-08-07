/***
 * Ini untuk testing db pas update fitur
 */
const fs = require("node:fs/promises");
const path = require("node:path");

const pool = require('../src/config/database');

async function initDatabase() {
  const sqlPath = path.join(__dirname, "..", "db", "init.sql");
  const sql = await fs.readFile(sqlPath, 'utf8');

  await pool.query(sql);
  console.log("Database Berhasil diinisialisasikan!");
}

initDatabase().catch((error) => {
  console.log(`Gagal menginisalisasi database: `, error);
  process.exitCode = 1;
}).finally(async () => {
  await pool.end();
});
