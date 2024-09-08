const { createClass, viewClass, deleteClass, updateClass, getAllClasses } = 
require ('../Controllers/ClassController');

const router = require("express").Router();

router.post("/create", createClass);
router.get("/:ClassID", viewClass);
router.get("/", getAllClasses);
router.delete("/delete/:ClassID", deleteClass);
router.put("/update/:ClassID", updateClass);

module.exports = router;