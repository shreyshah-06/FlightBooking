const express = require("express");
const router = express.Router();

const {addFlight,getFlights} = require("../controllers/flightDetails");
const {addTraveller,addBooking,cancelBooking} = require("../controllers/booking");

router.route("/addflight").post(addFlight);
router.route("/getflight").post(getFlights);
router.route("/addtraveller").patch(addTraveller);
router.route("/addbooking").patch(addBooking);
router.route("/cancelbooking").patch(cancelBooking);

module.exports = router;