const mysql = require("mysql2")
const konek = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "sekolah"
})

//cek koneksi

konek.connect((err) => {
    if (err) {
        console.log("koneksi gagal")
    } else {
        console.log("koneksi berhasil")
    }
})

module.exports = {konek}