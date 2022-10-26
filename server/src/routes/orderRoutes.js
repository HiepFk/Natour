const express = require('express');
const orderController = require('./../controllers/orderController');
const { isAuthenticatedUser, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.use(isAuthenticatedUser);

router.route('/user').post(orderController.userAddOrder);
router.route('/myorder').get(orderController.getMyOrder);

router.use(isAdmin);

router.route('/user/:id').get(orderController.getUserOrder);

router
  .route('/')
  .get(orderController.getAllOrders)
  .post(orderController.createOrder);

router
  .route('/:id')
  .get(orderController.getOrder)
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);

module.exports = router;
