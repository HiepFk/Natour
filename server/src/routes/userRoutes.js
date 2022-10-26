const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { isAuthenticatedUser, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/sign-google', authController.googleAuth);
router.post('/activation', authController.activateEmail);
router.post('/forgot', authController.forgotPassword);
router.post('/reset', authController.resetPassword);

router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/refresh', authController.requestRefreshToken);

router.use(isAuthenticatedUser);

// Phần user
router.get('/me', userController.getMe);
router.patch('/updateMyPassword', authController.updatePassword);
router.patch('/updateInfo', userController.updateMe);

// Phần admin
router.use(isAdmin);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
