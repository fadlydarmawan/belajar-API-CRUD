const { validationResult } = require("express-validator");
const db = require("../db/database");

function createdKelas(req, res) {
    const{ nomer } = req.body.nomer;
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.status(405).json({
            error: result.array(),
            message: result.message
        })
    } else {
      db.konek.query(`INSERT INTO kelas(nomer) VALUES ('${nomer}')`,
      function (err, result) {
       if (err) {
         res.status(400).json({
           errStatus: true,
           msgerr: err.message,
         });
       } else {
         res.status(201).json({
           status: 201,
           data: result,
           message: "Successfully created siswa",
         });
       }
     });
    }
  
}
function deletekelas(req, res) {
    const { id } = req.params;
    db.konek.query(
      `DELETE FROM siswa WHERE id = ${id}`,
      function (err, result) {
        if (err) {
         res.status(400).json({
          status: 400,
          errstatus: true,
          message : err.message,
         })
        } else {
          return res.status(200).json({
          
            message:"delete kelas succesfully"
          })
        }
      }
    );
  }
  function getKelas(req, res) {
    db.konek.query("SELECT * FROM kelas", function (err, result) {
      if (err) {
        res.status(400).json({
          errStatus: true,
          msgerr: err.message,
        });
      } else {
        res.status(200).json({
          status: 200,
          data: result,
          message: "Successfully GET kelas",
        });
      }
    });
  }
  function detailKelas (req, res) {
    const { id } = req.param;
    const result = validationResult(req);
    if (!result.isEmpty()){
      res.status(400).json({
        error: result.array(),
        message:"succesfully"
      })
    }
    console.log(id);
    db.konek.query(
      `SELECT * FROM kelas WHERE id = ${id}`,
      function (err, result){
        if (err) {
          res.status(400).json({
            status : 400,
            errstatus: true,
            message: err.message,
          });
        } else {
          res.status(201).json({
            status: 201,
            data: result,
            message :"succesfully"
          })
        }
      }
    )
  }

module.exports = {createdKelas,deletekelas,getKelas,detailKelas}