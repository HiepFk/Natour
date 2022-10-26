const multer = require('multer');

const catchAsync = require('./../middleware/catchAsync');
const AppError = require('./../utils/appError');

const User = require('./../models/userModel');
const factory = require('./handlerFactory');

const filterObj = (obj, ...notAllowed) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (!notAllowed.includes(key)) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};

const userController = {
  getAllUsers: factory.getAll(User),
  getUser: factory.getOne(User),
  createUser: factory.createOne(User),
  updateUser: factory.updateOne(User),
  deleteUser: factory.deleteOne(User),
  getMe: catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    token = req.headers.token?.split(' ')?.[1];
    const { password, ...others } = user._doc;
    res.status(200).json({
      ...others,
      accessToken,
      status: 'success',
    });
  }),
  updateMe: catchAsync(async (req, res, next) => {
    if (req.body.password || req.body.passwordConfirm || req.body.role) {
      return next(
        new AppError(
          'This route is not allowed to be update passWord and role! '
        ),
        400
      );
    }
    const filterBody = filterObj(req.body, 'role', 'password');
    const user = await User.findByIdAndUpdate(req.user.id, filterBody, {
      new: true,
      runValidators: true,
    });
    token = req.headers.token?.split(' ')?.[1];
    const { password, ...others } = user._doc;
    res.status(200).json({
      ...others,
      accessToken: token,
      status: 'success',
      message: 'Cập nhật thành công',
    });
  }),
};

module.exports = userController;
