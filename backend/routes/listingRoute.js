const router = require("express").Router();
const multer = require("multer");
const {
  createListing,
  getListingByCategory,
  getListingBySearch,
  getListingById,
} = require("../controllers/listingController");
const auth = require("../middlewares/auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post("/create", auth, upload.array("listingPhotos"), createListing);
router.get("/", getListingByCategory);
router.get("/search:search", getListingBySearch);
router.get("/:listingId", getListingById);

module.exports = router;
