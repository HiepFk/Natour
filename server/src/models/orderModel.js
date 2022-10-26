const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      require: [true, 'Booking must belong to a Tour!'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      require: true,
    },
    price: {
      type: Number,
      require: [true, 'Booking must have  a price!'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    paid: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

orderSchema.pre(/^find/, function (next) {
  this.populate('user').populate('tour');
  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
