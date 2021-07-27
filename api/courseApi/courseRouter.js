const { addCourse,deleteCourse,getRegisteredCourseByUserId } = require("./courseControlller");
const router = require("express").Router();

const { checkToken } = require('../auth/token_validation');

router.post("/",  addCourse);
router.delete("/delete",  deleteCourse);
router.get("/:matric",  getRegisteredCourseByUserId);

module.exports = router;