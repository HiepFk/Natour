const Order = require('../models/orderModel');
const catchAsync = require('../middleware/catchAsync');
const factory = require('./handlerFactory');

const orderController = {
  getAllOrders: factory.getAll(Order),
  updateOrder: factory.updateOne(Order),
  createOrder: factory.createOne(Order),
  getOrder: factory.getOne(Order),
  deleteOrder: factory.deleteOne(Order),

  userAddOrder: catchAsync(async (req, res) => {
    const order = await Order.create(req.body);
    res.status(200).json({
      status: 'success',
      message: 'Đặt hàng thành công',
      order,
    });
  }),
  getMyOrder: catchAsync(async (req, res) => {
    const order = await Order.find({ user: req.user.id }).populate({
      path: 'tour',
    });
    res.status(200).json({
      status: 'success',
      order,
    });
  }),
  getUserOrder: catchAsync(async (req, res) => {
    const order = await Order.find({ user: req.user.id }).populate({
      path: 'tour',
    });
    res.status(200).json({
      status: 'success',
      order,
    });
  }),
};
module.exports = orderController;
