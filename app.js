require("dotenv").config();
const express = require("express");

const app = express();
const userRouter = require("./api/users/user.router");
const courseRouter= require("./api/courseApi/courseRouter");

// app.get("/api", (req, res) => {
//     res.json({
//         success: 1,
//         message: "This is rest apis working"
//     });
// });

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/course", courseRouter);




app.listen(process.env.APP_PORT, () => {
console.log("Server start :", process.env.APP_PORT);
}); 