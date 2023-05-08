const express = require("express");
const app = express();
const sekolahController = require("./controller/siswa");
const kelas = require("./controller/kelas");
const bodyparser = require("body-parser");
const multer = require("multer");
const { body, param } = require("express-validator");
// multer
const penyimpanan = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  },
});
const upload = multer({ storage: penyimpanan });

app.use(bodyparser.urlencoded({ extended: true }));

// multer

app.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.file);
  res.send("file berhasil diunggah");
});
//CRRUD SISWA
app.get("/get-siswa", sekolahController.getSiswa);
app.post(
  "/created-siswa",
  body("nama").isLength({ min: 3 }).withMessage("Minimal 3"),
  sekolahController.createdSiswa
);
app.delete("/delete-siswa", sekolahController.deleteSiswa);
app.put("/update-siswa/:id", sekolahController.updateSiswa);

//ROUTER KELAS
app.post(
  "/created-kelas",
  body("nomer").isNumeric().withMessage("numerik"),
  kelas.createdKelas
);
app.delete("/delete-kelas/id:", kelas.deletekelas);
app.get("/get-kelas", kelas.getKelas);

app.listen(3000);
