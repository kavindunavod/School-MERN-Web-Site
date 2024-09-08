const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    TeacherID: {
        type: String,
        required: [true, "Teacher ID is required"],
        unique: true
    },

    TeacherName: {
        type: String,
        required: [true, "Teacher name is required"]
    },

    TeacherEmail: {
        type: String,
        required: false
    },

    Subject: {
        type: String,
        required: [true, "Subject name is required"]
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Teacher", TeacherSchema);
