const { createCourse, deleteCourse} = require("./courseService");
// const { sign } = require("jsonwebtoken");
//  const { genSaltSync, hashSync, compareSync} = require("bcrypt");

 module.exports = {


    //Register Student into the database;
    addCourse: (req, res) => {
         const body = req.body;
        //  const salt = genSaltSync(10);
        //  body.password = hashSync(body.password, salt);
         createCourse(body, (err, results) => {
             if (err) {
                 console.log(err);
                 return res.status(500).json({
                     success: 0,
                     message: "Database Connection error"
                 });
             }
             return res.status(200).json({
                 success:1,
                 data:results
             });
         });
     },

     deleteCourse:(req, res) => {
         const data= req.body;
         deleteCourse(data, (err, results) =>{
            if (err) {
                console.log(err);
                return;
            }
            if(! results){
                return res.json({
                    success:0,
                    message:"Data Not found",
                });
                
            }
            return res.json({
                success:1,
                message:"Course Removed Successfully",
            });
         });
     }


 }