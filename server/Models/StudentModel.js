const mongoose = require('mongoose');

const StudentShema = new mongoose.Schema({
    StudentID: {
        type: String,
        required: [true, "Student ID is Required"],
        unique: true
    },

    StudentName: {
        type: String,
        required: [true, "Student name is required"]
    },

    StudentEmail: {
        type: String,
        required: [false]
    },

    Guardian: {
        type: String,
        required: [true, "Guardian name is required"]
    },

    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports= mongoose.model("Student", StudentShema);