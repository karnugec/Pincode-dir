const mongoose = require("mongoose");

const pincodeSchema = new mongoose.Schema({
    Officename:{
        type: String,
        required: true
    },
    Pincode:{
        type: Number,
        required: true
    },
    Officetype:{
        type: String,
        required: true
    },
    Deliverystatus:{
        type: String,
        required: true
    },
    Divisionname:{
        type: String,
        required: true
    },
    Regionname:{
        type: String,
        required: true
    },
    Circlename:{
        type: String,
        required: true
    },
    Taluk: {
        type: String,
        required: true
    },
    Districtname: {
        type: String,
        required: true
    },
    Statename: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Pincode", pincodeSchema);