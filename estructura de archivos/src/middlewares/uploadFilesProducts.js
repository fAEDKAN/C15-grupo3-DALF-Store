 //MULTER PRODUCTS
 const multer = require("multer");
 const path = require("path");
 
 const storage = multer.diskStorage({

  //DESTINY
    destination: (req, file, cb) => {
    cb(null, "public/images/products");
     },
     
   //NAME
     filename: (req, file, cb) => {
     cb(null, `products-${Date.now()}${path.extname(file.originalname)}`);
     }
 });
 const fileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|raw|webp)$/)) 
    {
        req.fileValidationError = "No se acepta este formato de imagen, pruebe con(.jpg, .jpeg, .png, raw o webp) "
            return cb(null, false, req.fileValidationError);
    }else return cb(null, true);
};
 const uploadProducts = multer({
  storage,
  fileFilter
 });
 module.exports= uploadProducts;