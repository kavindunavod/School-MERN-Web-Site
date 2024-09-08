const mongoose = require('mongoose');

const StaffShema = new mongoose.Schema({
    StaffID: {
        type: String,
        required: [true, "Staff ID is Required"],
        unique: true
    },

    StaffName: {
        type: String,
        required: [true, "Staff name is required"]
    },

    StaffEmail: {
        type: String,
        required: [false]
    },

    Position: {
        type: String,
        required: [true, "Position is required"]
    },

    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports= mongoose.model("Staff", StaffShema);