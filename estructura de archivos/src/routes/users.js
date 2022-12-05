const express = require('express');
const router = express.Router();

//REQUIRE CONTROLLERS - MIDDLEWARES - VALIDATIONS - MULTER - SESSION
const { uploadUsers } = require('../middlewares/uploadFilesUsers');
const userSessionCheck = require('../middlewares/userSessionCheck');

const guestCheck = require('../middlewares/guestCheck');

const { register, processRegister, login, processLogin, /* shopping, */ profile, profileUpdate, update, logout, deleteAcc, remove } = require('../controllers/userController');

const loginValidator = require('../validations/loginValidator');
const registerValidator = require('../validations/registerValidator');
const profileValidator = require('../validations/profileValidator');

//USER REGISTER
router.get('/register',guestCheck, register);
router.post('/register', registerValidator, processRegister);

//USER LOGIN AND LOGOUT
router.get('/login',guestCheck, login);
router.post('/login', loginValidator, processLogin);
router.get('/logout', logout);

//USER PROFILE
router.get('/profile', userSessionCheck, profile);
router.get('/profileUpdate', userSessionCheck, profileUpdate);
router.put('/update/:id', uploadUsers.single('avatarFile'), profileValidator, update);

/* //MY SHOPPING
router.get('/shopping', shopping); */

//USER DELETE ACCOUNT
router.get('/deleteAcc/', userSessionCheck, deleteAcc)
router.delete('/delete/:id', remove);

module.exports = router;


