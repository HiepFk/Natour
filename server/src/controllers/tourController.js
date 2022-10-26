const Tour = require('./../models/tourModel');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const catchAsync = require('../middleware/catchAsync');

const multer = require('multer');
const cloudinary = require('../utils/cloudinary');

const multerStorage = multer.diskStorage({});
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const tourController = {
  uploadPhoto: upload.single('image'),
  saveImages: async (req, res, next) => {
    req.body.image = '';
    const file = await cloudinary.uploader.upload(req.files.image.path, {
      resource_type: 'auto',
    });

    req.body.image = file.secure_url;
    req.body.cloudinary_id = file.public_id;
    next();
  },
  getAllTours: factory.getAll(Tour),

  getTour: factory.getOne(Tour, { path: 'reviews' }),

  createTour: factory.createOne(Tour),

  updateTour: factory.updateOne(Tour),

  deleteTour: factory.deleteOne(Tour),

  getRandomTour: catchAsync(async (req, res) => {
    let shuffled = await Tour.find();
    shuffled = [...shuffled].sort(() => 0.5 - Math.random());
    const data = shuffled.slice(0, 5);
    res.status(200).json({
      status: 'success',
      results: 5,
      data,
    });
  }),
};
module.exports = tourController;
