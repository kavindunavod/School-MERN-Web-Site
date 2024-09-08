const Staff= require('../Models/StaffModel');

module.exports.createStaff = async (req, res, next) => {
    try {
        const {StaffID, StaffName, StaffEmail, Position, createdAt  } = req.body;
        const staff = await Staff.findOne({ StaffID });
        if (staff) {
          return res.status(400).json({ message: "Staff already exists" });
        }
        const createStaff = await Staff.create({ StaffID, StaffName, StaffEmail, Position, createdAt });
        res
          .status(201)
          .json({ message: "Created the Staff log successfully", success: true, createStaff });
      } catch (error) {
        console.error(error);
      }
};

module.exports.getAllStaff = async (req, res, next) => {
  try {
    const staff = await Staff.find();
    res.status(200).json(staff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports.viewStaff = async (req, res, next) => {
    try {
      const {StaffID} = req.params;
  
      const staff = await Staff.findOne({ StaffID });
      if (!staff) {
        return res.status(400).json({ message: "Staff not found" });
      }
      res
        .status(201)
        .json({ message: "Staff Found", success: true, staff });
    } catch (error) {
      console.error(error);
    }
  };
  
  
  module.exports.deleteStaff = async (req, res, next) => {
      try {
        const { StaffID } = req.params;
    
        const staff = await Staff.findOne({ StaffID });
        if (!staff) {
          return res.status(400).json({ message: "Staff not found" });
        }
        deletedStaff = await Staff.findOneAndDelete({StaffID} );
        res
          .status(201)
          .json({ message: "Staff Record Deleted", success: true, deletedStaff });
      } catch (error) {
        console.error(error);
      }
    };
  
  
  module.exports.updateStudent = async (req, res) => {
    try {
      const { StudentID } = req.params;
      const {  StudentName, StudentEmail, Guardian ,createdAt } = req.body;
  
      const student = await Student.findOne({ StudentID });
  
      if (!student) {
        return res.status(400).json({ message: "Student not found" });
      }
      student.StudentName= StudentName;
      student.StudentEmail= StudentEmail;
      student.Guardian= Guardian;
      student.createdAt= createdAt;
  
      await student.save();
  
      res.status(200).json({ message: "Student updated successfully", success: true, updatedStudent: student });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  