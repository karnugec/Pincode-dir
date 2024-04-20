const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Pin = require("../models/pincode");
const ErrorHandler = require("../utils/errorhandler");


// Creating Pincode Object
exports.createPincode = catchAsyncErrors(async (req, res, next) => {
    const {
        Officename,
        Pincode,
        Officetype,
        Deliverystatus,
        Divisionname,
        Regionname,
        Circlename,
        Taluk,
        Districtname,
        Statename
    } = req.body;

    const pincode = await Pin.findOne({ Pincode });

    if (pincode) {
        return next(new ErrorHandler("Pincode Already Exist", 401));
    }

    const pin = await Pin.create({
        Officename,
        Pincode,
        Officetype,
        Deliverystatus,
        Divisionname,
        Regionname,
        Circlename,
        Taluk,
        Districtname,
        Statename
    })

    res.status(200).json({
        success: true,
        message: "Pincode Created.",
        pin,
    });
});

// Get Pincode Object by id
exports.getPincode = catchAsyncErrors(async (req, res, next) => {
    const pincode = await Pin.findById(req.params.id);

    if (!pincode) {
        return next(new ErrorHandler("Pincode Not Found", 404));
    }
    res.status(200).json({
        success: true,
        pincode
    });
});

// Get All Pincode Obj
exports.getAllPin = catchAsyncErrors(async (req, res, next) => {
    const pincodes = await Pin.find();

    if (!pincodes) {
        return next(new ErrorHandler("Pincode Not Found", 404));
    }

    res.status(200).json({
        success: true,
        pincodes
    });
});

// Updating Pincode obj by Pincode
exports.updatePincode = catchAsyncErrors(async (req, res, next) => {
    const newPincodeData = {
        _id:req.body._id,
        Officename: req.body.Officename,
        Pincode: req.body.Pincode,
        Officetype: req.body.Officetype,
        Deliverystatus: req.body.Deliverystatus,
        Divisionname: req.body.Divisionname,
        Regionname: req.body.Regionname,
        Circlename: req.body.Circlename,
        Taluk: req.body.Taluk,
        Districtname: req.body.Districtname,
        Statename: req.body.Statename
    };

    console.log(newPincodeData);
    console.log(req.body._id)

    const pincode = await Pin.findByIdAndUpdate(req.body._id, newPincodeData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        message: "updated the field",
    });
});

///Deleting Pincode Obj
exports.deletePincode = catchAsyncErrors(async (req, res, next) => {
    const pincode = await Pin.findById(req.params.id);

    if (!pincode) {
        return next(new ErrorHandler(`Pincode doen not Exist with id ${req.params.id}`));
    }

    await pincode.deleteOne();

    res.status(200).json({
        success: true,
        message: "Pincode Deleted Successfully"
    });
});

// Search Obj by District, Pincode, State, Locality
exports.search = catchAsyncErrors(async (req, res, next) => {
    const { Districtname, Statename, Pincode, Regionname } = req.query;
    let query = {};

    if (Districtname) query.Districtname = Districtname;
    if (Statename) query.Statename = Statename;
    if (Pincode) query.Pincode = Pincode;
    if (Regionname) query.Regionname = Regionname;

    try {
        const results = await Pin.find(query);
        res.status(200).json({
            success: true,
            results
        })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})