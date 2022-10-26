const Review = require('./../models/reviewModel');
const catchAsync = require('./../middleware/catchAsync');
const factory = require('./handlerFactory');

const reivewController = {
  getAllReviews: factory.getAll(Review),

  getReview: factory.getOne(Review),

  createReview: factory.createOne(Review),

  updateReview: factory.updateOne(Review),

  deleteReview: factory.deleteOne(Review),

  userAddReview: catchAsync(async (req, res) => {
    const data = { ...req.body };
    data.user = req.user.id;
    const newReview = new Review(data);
    const review = await newReview.save();
    res.status(200).json({
      status: 'success',
      message: 'Thêm nhận xét thành công',
      review,
    });
  }),
  getMyReview: catchAsync(async (req, res) => {
    const reviews = await Review.find({ user: req.user.id }).populate({
      path: 'tour',
    });
    res.status(200).json({
      status: 'success',
      reviews,
    });
  }),
};

module.exports = reivewController;
