const Class= require('../Models/ClassModel');

module.exports.createClass = async (req, res) => {
  try {
      const { ClassID, ClassName, ClassTeacher, StudentCount, createdAt } = req.body;
      const existingClass = await Class.findOne({ ClassID });
      if (existingClass) {
          return res.status(400).json({ message: "Class already exists" });
      }
      const newClass = await Class.create({ ClassID, ClassName, ClassTeacher, StudentCount, createdAt });
      res.status(201).json({ message: "Class created successfully", success: true, newClass });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getAllClasses = async (req, res, next) => {
  try {
    const classes = await Class.find();
    res.status(200).json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports.viewClass = async (req, res, next) => {
    try {
      const {ClassID} = req.params;
  
      const grade = await Class.findOne({ ClassID });
      if (!grade) {
        return res.status(400).json({ message: "Class not found" });
      }
      res
        .status(201)
        .json({ message: "Class Found", success: true, grade });
    } catch (error) {
      console.error(error);
    }
  };
  
  
  module.exports.deleteClass = async (req, res, next) => {
      try {
        const { ClassID } = req.params;
    
        const grade = await Class.findOne({ ClassID });
        if (!grade) {
          return res.status(400).json({ message: "Class not found" });
        }
        deletedClass = await Class.findOneAndDelete({ClassID} );
        res
          .status(201)
          .json({ message: "Class Record Deleted", success: true, deletedClass });
      } catch (error) {
        console.error(error);
      }
    };
  
  
    module.exports.updateClass = async (req, res) => {
      try {
        const { ClassID } = req.params;
        const { ClassName, ClassTeacher, StudentCount, createdAt } = req.body;
    
        const grade = await Class.findOne({ ClassID });
    
        if (!grade) {
          return res.status(404).json({ message: "Class not found" });
        }
    
        grade.ClassName = ClassName;
        grade.ClassTeacher = ClassTeacher;
        grade.StudentCount = StudentCount;
        grade.createdAt = createdAt;
    
        const updatedClass = await grade.save();
    
        res.status(200).json({ message: "Class updated successfully", success: true, updatedClass });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
    };
    
  