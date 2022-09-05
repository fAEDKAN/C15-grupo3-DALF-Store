var express = require('express');
var router = express.Router();


//Middlewares
const uploadUser = require('../middlewares/uploadFilesUsers');

//Controllers
const { login, register, shopping, userStore, profile } = require('../controllers/userController');

//Validations


/* /users */
router
    .get('/login', login) 
    .get('/register', register)
    .post('/register', userStore)
    .get('/shopping', shopping)
    .get('/userProfile', profile)

module.exports = router;