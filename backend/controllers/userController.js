const Booking = require("../models/bookingModel");
const User = require("../models/userModel");
const Listing = require("../models/listingModel");

const myTrips = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const trips = await Booking.find({ customerId: userId }).populate(
      "customerId hostId listingId"
    );

    console.log(trips);

    if (!trips) {
      res.status(400);
      throw new Error("Trips not found");
    }
    res.status(202).json(trips);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const addToWishList = async (req, res, next) => {
  try {
    const { userId, listingId } = req.params;
    const user = await User.findById(userId);
    const listing = await Listing.findById(listingId).populate("creator");

    const favoriteListing = user.wishList.find(
      (item) => item._id.toString() === listingId
    );

    if (!favoriteListing) {
      res.status(400);
      throw new Error("Not found");
    }

    if (favoriteListing) {
      user.wishList = user.wishList.filter(
        (item) => item._id.toString() !== listingId
      );
      await user.save();
      res.status(200).json({
        message: "Listing is removed from wish list",
        wishList: user.wishList,
      });
    } else {
      user.wishList.push(listing);
      await user.save();
      res.status(200).json({
        message: "Listing is added to wish list",
        wishList: user.wishList,
      });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const myProperties = async (req, res) => {
  try {
    const { userId } = req.params;
    const properties = await Listing.find({ creator: userId }).populate(
      "creator"
    );

    if (!properties) {
      res.status(400);
      throw new Error("Properties not found");
    }
    res.status(202).json(properties);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const myReservations = async (req, res) => {
  try {
    const { userId } = req.params;
    const reservations = await Booking.find({ hostId: userId }).populate(
      "customerId hostId listingId"
    );

    if (!reservations) {
      res.status(400);
      throw new Error("Reservations not found");
    }
    res.status(202).json(reservations);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  myTrips,
  addToWishList,
  myProperties,
  myReservations,
};
