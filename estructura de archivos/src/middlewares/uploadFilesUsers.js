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
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png"
    ) {
        cb(null, true);
    } else {
        req.fileValidationError = "Sólo se permiten imágenes en formato .jpg, .jpeg y .png"
        return cb(null, false, req.fileValidationError);
    }
};

const uploadUsers = multer({
    storage: storageUser,
    fileFilter,
    limits: { fileSize: 2000000 }, // 1 millón de bytes = 1 MB - Se limita el tamaño del archivo
});

module.exports = { uploadUsers };
