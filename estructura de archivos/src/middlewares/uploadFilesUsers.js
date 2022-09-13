 //MULTER USERS
const multer = require("multer");
const path = require("path");

const storageUser = multer.diskStorage({
    //DESTINY
    destination: (req, file, cb) => {
        cb(null, "./public/images/users");
    },

    //NAME
    filename: (req, file, cb) => {
        cb(null, `avatar-${Date.now()}${path.extname(file.originalname)}`);
    },
});

/* const fileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        req.fileValidationError = "Sólo se permiten imágenes en formato .jpg, .jpeg y .png"
        return cb(null, false, req.fileValidationError)
    }
    return cb(null, true)
 }; */

const uploadUsers = multer({
    storage: storageUser
    /* fileFilter */
});

module.exports = { uploadUsers };
