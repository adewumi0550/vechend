const { 
    createUser, 
    getUserByUserId, 
    updateProfile, 
    loginUser,
    updatePassword,
    getUsers } = require("./user.controller");
const router = require("express").Router();

const { checkToken } = require('../auth/token_validation');

router.post("/", checkToken, createUser);
router.post("/login", loginUser);
router.get("/", getUsers);
router.get("/:matric", getUserByUserId);
router.patch("/updateProfile", updateProfile);
router.patch("/password", updatePassword);

module.exports = router;