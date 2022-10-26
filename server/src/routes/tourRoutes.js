const express = require('express');
const tourController = require('../controllers/tourController');
const { isAuthenticatedUser, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(tourController.getAllTours);
router.route('/random').get(tourController.getRandomTour);
router.route('/:id').get(tourController.getTour);

router.use(isAuthenticatedUser);
router.use(isAdmin);

router.route('/').post(tourController.createTour);

router
  .route('/:id')
  .patch(tourController.saveImages, tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
