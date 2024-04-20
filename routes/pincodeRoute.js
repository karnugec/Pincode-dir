const express = require("express");
const { createPincode, getPincode, updatePincode, deletePincode, search, getAllPin } = require("../controllers/apis");


const router = express.Router();

router
    .route("/create")
    .post(createPincode);

router
    .route("/getPincode/:id")
    .get(getPincode);

router
    .route("/getAllData")
    .get(getAllPin);

router
    .route("/updatePin")
    .put(updatePincode);

router
    .route("/deletePin/:id")
    .delete(deletePincode);

router
    .route("/searchPin")
    .get(search);

module.exports = router;