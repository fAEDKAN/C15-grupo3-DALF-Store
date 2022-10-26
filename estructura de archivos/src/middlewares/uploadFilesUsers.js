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

const fileFilter = (req, file, cb) => {
    if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png)$/)) {
        req.fileValidationError =
            "Sólo se permiten imágenes en formato .jpg, .jpeg y .png";
        return cb(null, false, req.fileValidationError);
    }
    return cb(null, true);
};

const uploadUsers = multer({
    storage: storageUser,
    fileFilter,
    limits: {fileSize : 2000000} // 1 millón de bytes = 1 MB - Se limita el tamaño del archivo
});

module.exports = { uploadUsers };
