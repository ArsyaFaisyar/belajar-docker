/**
 * ini untuk testing DB pas update fitur
 */

const fs = require("node:fs/promises")
const path = require("node:path")

const pool = require("../src/config/database.js")
const { error } = require("node:console")

async function initDatabase() {
    const sqlPath = path.join(__dirname, "", "db", "init.sql")
    const sql = await fs.readFile(sqlPath, "utf-8")
    
    await pool.query(sql)
    console.log("database berhasil di inisiasi")
    

    initDatabase().catch((error) => {
        console.log("gagal inisiasi database", error)
        process.exitCode = 1
    }).finally(async () => {
        await pool.end()
    })
}

