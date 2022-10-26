const catchAsync = require('./../middleware/catchAsync');
const AppError = require('./../utils/appError');
const cloudinary = require('./../utils/cloudinary');

const handlerFactory = {
  createOne: (Model) =>
    catchAsync(async (req, res, next) => {
      const data = await Model.create(req.body);
      res.status(200).json({
        status: 'Success',
        data,
      });
    }),
  getOne: (Model, popOptions) =>
    catchAsync(async (req, res, next) => {
      let query = Model.findOne({ slug: req.params.id });
      if (popOptions) query = query.populate(popOptions);

      const data = await query;

      if (!data) {
        return next(new AppError('No document found with that ID', 404));
      }

      res.status(200).json({
        status: 'Success',
        data,
      });
    }),
  getAll: (Model) =>
    catchAsync(async (req, res, next) => {
      let data = {};
      if (req.query) {
        const queryObj = { ...req.query };
        const query = Model.find(queryObj);
        data = await query;
      } else {
        data = await Model.find();
      }

      res.status(200).json({
        status: 'Success',
        results: data.length,
        data,
      });
    }),
  deleteOne: (Model) =>
    catchAsync(async (req, res, next) => {
      const data = await Model.findByIdAndDelete(req.params.id);
      if (!data) {
        return next(new AppError('No document found with that ID', 404));
      }
      if (data.cloudinary_id) {
        await cloudinary.uploader.destroy(data.cloudinary_id);
      }

      res.status(200).json({
        status: 'Success',
        data: null,
      });
    }),
  deleteAll: (Model) =>
    catchAsync(async (req, res, next) => {
      const data = await Model.deleteMany({ user: req.params.id, paid: true });

      if (!data) {
        return next(new AppError('No document found with that ID', 404));
      }

      res.status(200).json({
        status: 'Success',
        data: null,
      });
    }),
  updateOne: (Model) =>
    catchAsync(async (req, res, next) => {
      const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!data) {
        return next(new AppError('No document found with that ID', 404));
      }

      res.status(200).json({
        status: 'Success',
        data,
      });
    }),
};
module.exports = handlerFactory;
