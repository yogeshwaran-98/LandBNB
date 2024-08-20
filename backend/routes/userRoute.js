const { Router } = require("express");
const auth = require("../middlewares/auth");

const {
  myTrips,
  addToWishList,
  myProperties,
  myReservations,
} = require("../controllers/userController");
const router = Router();

router.get("/:userId/mytrips", auth, myTrips);
router.patch("/:userId/:listingId", auth, addToWishList);
router.get("/:userId/properties", auth, myProperties);
router.get("/:userId/reservations", auth, myReservations);

module.exports = router;
