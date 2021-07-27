const { 
    createUser, 
    getUserByUserId, 
    updateProfile, 
    loginUser,
    updatePassword,
    getUsers } = require("./user.controller");
const router = require("express").Router();

const { checkToken } = require('../auth/token_validation');

router.post("/",  createUser);
router.post("/login", loginUser);
router.get("/", checkToken, getUsers);
router.get("/:matric",checkToken, getUserByUserId);
router.patch("/updateProfile",checkToken, updateProfile);
router.patch("/password",checkToken, updatePassword);

module.exports = router;