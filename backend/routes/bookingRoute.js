const { Router } = require("express");
const {
  createBooking,
  getMyBookings,
} = require("../controllers/bookingController");
const auth = require("../middlewares/auth");

const router = Router();

router.post("/create", auth, createBooking);
router.post("/userId", auth, getMyBookings);

module.exports = router;
