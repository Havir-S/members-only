const express = require('express');
const router = express.Router();

const mainpageController = require('../controllers/mainpageController');

router.get('/', mainpageController.index);

router.post('/register-user', mainpageController.register_user);

router.get('/delete/post/:id', mainpageController.delete_post);

router.post('/login-user', mainpageController.login_user);

router.post('/make-post', mainpageController.make_post);

router.get('/logout', mainpageController.logout_user);

module.exports = router;
