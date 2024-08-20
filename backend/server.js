const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoute");
const bookingRoutes = require("./routes/bookingRoute");
const listingRoutes = require("./routes/listingRoute");
const errorHandler = require("./middlewares/errorHandler");

const connection = require("./config/db");

const app = express();
const port = process.env.PORT || 5000;

connection();

app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/properties", listingRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on ${port}`));
