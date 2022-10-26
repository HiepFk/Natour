const express = require('express');
const reviewController = require('./../controllers/reviewController');
const { isAuthenticatedUser, isAdmin } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.use(isAuthenticatedUser);
router.route('/user').post(reviewController.userAddReview);
router.route('/myreview').get(reviewController.getMyReview);

router.use(isAdmin);

router
  .route('/')
  .post(reviewController.createReview)
  .get(reviewController.getAllReviews);

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;
