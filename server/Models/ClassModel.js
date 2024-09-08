const mongoose = require('mongoose');

const ClassShema = new mongoose.Schema({
    ClassID: {
        type: String,
        required: [true, "Student ID is Required"],
        unique: true
    },

    ClassName: {
        type: String,
        required: [true, "Class name is required"]
    },

    ClassTeacher: {
        type: String,
        required: [true, "Class Teacher name is required"]
    },

    StudentCount: {
        type: Number,
        required: [true, "Student Count is required"]
    },

    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports= mongoose.model("Class", ClassShema);