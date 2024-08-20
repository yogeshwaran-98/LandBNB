const Bookings = require("../models/bookingModel");

const createBooking = async (req, res, next) => {
  try {
    const { customerId, hostId, listingId, startDate, endDate, totalPrice } =
      req.body;
    const newBooking = await Bookings.create({
      customerId,
      hostId,
      listingId,
      startDate,
      endDate,
      totalPrice,
    });

    if (!newBooking) {
      console.log("Error - Booking Controller - createBooking");
      res.status(400);
      throw new Error("Not able to create the booking !! Error");
    }

    return res.status(200).json(newBooking);
  } catch (err) {
    console.log("Catch Err - booking controller - createBooking ", err);
    res.status(400);
    next(err);
  }
};

const getMyBookings = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const myBookings = await Bookings.find({ userId }).populate("Listing");

    if (!myBookings) {
      console.log("Error in getting mybookings");
      res.status(400);
      throw new Error("Error in getting mybookings");
    }

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { createBooking, getMyBookings };
