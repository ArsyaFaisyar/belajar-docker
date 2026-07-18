const pool = require("../config/database");
const asycHandler = require("../utils/asyncHandler");

const getAllNasabah = asycHandler(async (req, res) => {
  const result = await pool.query("SELECT * FROM nasabah ORDER BY id ASC");

  res.status(200).json({
    status: "Success",
    total: result.rowCount,
    data: result.rows,
  });
});

const getNasabahById = asycHandler(async (req, res) => {
  const { id } = req.params;

  const result = await pool.query("SELECT * FROM nasabah WHERE ID = $1", [id]);

  if (result.rowCount == 0) {
    return res.status(404).json({
      status: "fail",
      message: "Nasabah tidak ditemukan!",
    });
  }

  res.status(200).json({
    status: "success",
    data: result.rows[0],
  });
});

const createNasabah = asycHandler(async (req, res) => {
  const { nama, email, no_hp, alamat, saldo = 0 } = req.body;

  if (!nama || !email) {
    return res.status(400).json({
      status: "fail",
      message: "Nama dan email wajib di isi!",
    });
  }

  const result = await pool.query(
    `INSERT INTO nasabah (nama, email, no_hp, alamat, saldo)
    VALUES($1, $2, $3, $4, $5) RETURNING *`,[
      nama, email, no_hp || null, alamat || null, saldo
    ],
  );

  res.status(201).json({
    status: "success",
    message: "NASABAH BERHASIL DI BUAT!",
    data: result.rows[0],
  });
});

module.exports = {
  getAllNasabah,
  getNasabahById,
  createNasabah,
};
