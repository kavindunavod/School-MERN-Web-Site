const mongoose = require('mongoose');

const CleanerShema = new mongoose.Schema({
    CleanerID: {
        type: String,
        required: [true, "Cleaner ID is Required"],
        unique: true
    },

    CleanerName: {
        type: String,
        required: [true, "Cleaner name is required"]
    },

    CleanerContact: {
        type: String,
        required: [false]
    },

    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports= mongoose.model("Cleaner", CleanerShema);