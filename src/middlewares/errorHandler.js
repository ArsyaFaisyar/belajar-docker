const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (err.code === "23505") {
    return res.status(409).join({
      status: "fail",
      message: "Email sudah digunakan!",
    });
  }
  if (err.code === "23514") {
    return res.status(400).json({
      status: "fail",
      message: "Saldo tidak boleh negatif",
    });
  }
  if (err.code === "22P02") {
    return res.status(400).json({
      status: "fail",
      message: "Format data tidak valid",
    });
  }
  return res.status(500).json({
    status: "error",
    message: "Terjadi kesalahan pada server",
  });
};
module.exports = errorHandler;
