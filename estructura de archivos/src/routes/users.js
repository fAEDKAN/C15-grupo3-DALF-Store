const express = require('express');
const router = express.Router();

//Middlewares
const { uploadUsers } = require('../middlewares/uploadFilesUsers');
const userSessionCheck = require('../middlewares/userSessionCheck');

//Controllers
const { register, processRegister, login, processLogin, /* shopping, */ profile, update, logout } = require('../controllers/userController');

//Validations
const loginValidator = require('../validations/loginValidator');
const registerValidator = require('../validations/registerValidator');

/* /users */
router
    .get('/register', register)
    .post('/register', registerValidator, processRegister)
    .get('/login', login)
    .post('/login', loginValidator, processLogin)
/*     .get('/shopping', shopping) */
    .get('/profile', userSessionCheck, profile)
    .put('/update/:id', uploadUsers.single('avatar'), update)
    .get('/logout', logout)



module.exports = router;


