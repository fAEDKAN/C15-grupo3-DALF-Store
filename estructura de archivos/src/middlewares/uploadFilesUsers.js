 //Multer Usuarios//

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
 //Destino
 destination: (req, file, cb) => {
  cb(null, "public/images/users");
 },
  //Nombre
 filename: (req, file, cb) => {
  cb(null, `user-${Date.now()}${path.extname(file.originalname)}`);
 },
});
const uploadUser = multer({
 storage,
});
module.exports= uploadUser
