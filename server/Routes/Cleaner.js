const { createCleaner, viewCleaner, deleteCleaner, updateCleaner, getAllCleaners } = 
require ('../Controllers/CleanerController');

const router = require("express").Router();

router.post("/create", createCleaner);
router.get("/:CleanerID", viewCleaner);
router.get("/", getAllCleaners);
router.delete("/delete/:CleanerID", deleteCleaner);
router.put("/update/:CleanerID", updateCleaner);

module.exports = router;