const { addCourse,deleteCourse } = require("./courseControlller");
const router = require("express").Router();

const { checkToken } = require('../auth/token_validation');

router.post("/",  addCourse);
router.delete("/delete",  deleteCourse);

module.exports = router;