const Cleaner= require('../Models/CleanerModel');

module.exports.createCleaner = async (req, res, next) => {
  try {
      const { CleanerID, CleanerName, CleanerContact, createdAt } = req.body;
      const cleaner = await Cleaner.findOne({ CleanerID });
      if (cleaner) {
          return res.status(400).json({ message: "Cleaner already exists" });
      }
      const createCleaner = await Cleaner.create({ CleanerID, CleanerName, CleanerContact, createdAt });
      res
          .status(201)
          .json({ message: "Created the Cleaner log successfully", success: true, createCleaner });
  } catch (error) {
      console.error(error);
  }
};

module.exports.getAllCleaners = async (req, res, next) => {
  try {
    const cleaner = await Cleaner.find();
    res.status(200).json(cleaner);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports.viewCleaner = async (req, res, next) => {
    try {
      const {CleanerID} = req.params;
  
      const cleaner = await Cleaner.findOne({ CleanerID });
      if (!cleaner) {
        return res.status(400).json({ message: "Cleaner not found" });
      }
      res
        .status(201)
        .json({ message: "Cleaner Found", success: true, cleaner });
    } catch (error) {
      console.error(error);
    }
  };
  
  
  module.exports.deleteCleaner = async (req, res, next) => {
      try {
        const { CleanerID } = req.params;
    
        const cleaner = await Cleaner.findOne({ CleanerID });
        if (!cleaner) {
          return res.status(400).json({ message: "Cleaner not found" });
        }
        deletedCleaner = await Cleaner.findOneAndDelete({CleanerID} );
        res
          .status(201)
          .json({ message: "Student Record Deleted", success: true, deletedCleaner });
      } catch (error) {
        console.error(error);
      }
    };
  
  
    module.exports.updateCleaner = async (req, res) => {
      try {
          const { CleanerID } = req.params;
          const { CleanerName, CleanerContact, createdAt } = req.body;
          
          // Find the cleaner by CleanerID
          const cleaner = await Cleaner.findOne({ CleanerID });
          
          // Check if cleaner exists
          if (!cleaner) {
              return res.status(404).json({ message: "Cleaner not found" });
          }
          
          // Update cleaner fields
          cleaner.CleanerName = CleanerName;
          cleaner.CleanerContact = CleanerContact;
          cleaner.createdAt = createdAt;
          
          // Save updated cleaner
          await cleaner.save();
          
          res.status(200).json({ message: "Cleaner updated successfully", success: true, updatedCleaner: cleaner });
      } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal server error" });
      }
  };
  
  