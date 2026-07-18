const express = require("express");
const { getAllNasabah,createNasabah,getNasabahById } = require("../controllers/nasabah.controller.js");
const router = express.Router();
router.get("/", getAllNasabah);
router.get("/:id",getNasabahById);
router.post("/",createNasabah);
module.exports = router;
