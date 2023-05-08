const { validationResult } = require("express-validator");
const db = require("../db/database");

function getSiswa(req, res) {
  db.konek.query("SELECT * FROM siswa", function (err, result) {
    if (err) {
      res.status(400).json({
        errStatus: true,
        msgerr: err.message,
      });
    } else {
      res.status(200).json({
        status: 200,
        data: result,
        message: "Successfully GET siswa",
      });
    }
  });
}

function createdSiswa(req, res) {
    const { nama } = req.body;
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.status(400).json({
          error: result.array(),
        });
      } else { res.status(200).json({
        error: result.array(),
        message:"succewsfully"
      }) }
  
    db.konek.query(
      `INSERT INTO siswa (nama) VALUES ('${nama}')`,
      function (err, result) {
        if (err) {
          {
            res.status(400).json({
              status: 200,
              errstatus: true,
              message: err.message,
            });
          }
        } else {
          return res.status(201).json({
            status: 201,
            data: result,
            message: "succesfully Created Siswa",
          });
        }
      }
    );
  }
  function updateSiswa(req, res) {
    const { id } = req.params;
    const { nama } = req.body;

    if (id === null) {
      res.status(400).json({
        message : " id kosong "
      })
    } else {
      db.konek.query(
        `UPDATE siswa SET nama = '${nama}' WHERE id = '${id}'`,
        function (err, result) {
          if (err) {
            res.status(400).json({
              status: 400,
              errstatus: true,
              message: err.message,
            });
          } else {
            if (result.length === undefined) {
              res.status(400).json({
                message : " siswa tidak ditemukan"
              });
            } else{
            res.status(201).json({
              status: 201,
              message: "update succesfully",
            });
            }
           } 
          }
      )
    }
   };
    function deleteSiswa(req, res) {
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
              
                message:"delete siswa succesfully"
              })
            }
          }
        );
      }


    function detailSiswa (req, res) {
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
        `SELECT * FROM siswa WHERE id = ${id}`,
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

module.exports = {getSiswa,createdSiswa,updateSiswa,deleteSiswa
,detailSiswa
}