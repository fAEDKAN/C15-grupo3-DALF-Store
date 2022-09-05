 //Multer Productos//

 const multer = require("multer");
 const path = require("path");
 
 const storage = multer.diskStorage({
  //Destino
  destination: (req, file, cb) => {
   cb(null, "public/images/products");
  },
   //Nombre
  filename: (req, file, cb) => {
   cb(null, `products-${Date.now()}${path.extname(file.originalname)}`);
  }
 });
 const uploadProducts = multer({
  storage,
 });
 module.exports= uploadProducts