 const { create, getUserByMatric, getUsers, updatePassword, updateProfile , getUserProfile} = require("./user.service");
const { sign } = require("jsonwebtoken");
 const { genSaltSync, hashSync, compareSync} = require("bcrypt");

 module.exports = {


    //Register Student into the database;
    createUser: (req, res) => {
         const body = req.body;
         const salt = genSaltSync(10);
         body.password = hashSync(body.password, salt);
            const matricId = body.matric;
         getUserByMatric(matricId, (err, results)=>{
            if(err){
                console.log(err);
            }

            // console.log(results);
            if (results) {
                return res.json({
                    success:0,
                    data:"Matric ID Already exist"
                });
            }

            if (!results) {
                create(body, (err, results) => {
                    const jsonToken = sign({ result: results}, "qwe1234", {expiresIn:"1h"});
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            success: 0,
                            message: "Database Connection error"
                        });
                    }
       
                //     if (!results) {
                //        return res.json({
                //            success:0,
                //            message:"Server Error"
                //        });
                //    }
                    return res.status(200).json({
                        success:1,
                        data:results,
                        token: jsonToken
                    });
                });
            }

         });


        
     },





     //Change Password 
     updatePassword: (req, res) => {
        const body = req.body;
        // const matric = req.params.matric;
        // if(){}
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        updatePassword(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database Connection error"
                });
            }

            // if(!results){
            //     return res.json({
            //      success:0,
            //      message: "Invalid Matric Username"
            //     });
            //  }

            return res.status(200).json({
                success:1,
                data:results,
                message:"Password Successfully Changed"
            });
        });
    },

    // Get users by Id
     getUserByUserId: (req, res) => {

        const matric = req.params.matric;
        getUserProfile(matric,(err, results)=> {

            const jsonToken = sign({ result: results}, "672829", {expiresIn:"1h"});
            if (err) {
                console.log(err);
                return;
            }

            if(!results){
               return res.json({
                success:0,
                message: "Unable to get the record"
               });
            }
            return res.json({
                success:1,
                data:results,
                token: jsonToken
               });

        });
     },




     //Get all element by ID
     getUsers: (req, res) => {

        // const matric = req.params.matric;
        getUsers((err, results)=> {
            if (err) {
                console.log(err);
                return;
            }

            if(!results){
               return res.json({
                success:0,
                message: "Unable to get the record"
               });
            }
            return res.json({
                success:1,
                data:results
               });

        });
     },


     loginUser: (req, res) =>{
         const body = req.body;
         getUserByMatric(body.matric, (err, results)=>{
            if(err){
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success:0,
                    data:"Invalid credentials"
                });
            }

            const result = compareSync(body.password, results.password);

            if (result) {
                result.password=undefined;
                const jsonToken = sign({ result: results}, "qwe1234", {expiresIn:"1h"});

                return res.json({
                    success:1,
                    message:"Login Successfully",
                    token: jsonToken
                });
            }else{
                return  res.json({
                    success:0,
                    message:"Invalid credentials",

                    // token: jsonToken
                });
            }


         });

     },


    // allUsers: (req, res) => {

    //     getUsers: (body, (err, results) =>{


    //     });
    // }
     
    updateProfile: (req, res) => {
        const body = req.body;
        // const salt = genSaltSync(10);
        // body.password = hashSync(body.password, salt);
        updateProfile(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database Connection error"
                });
            }


            // if(!results){
            //     return res.json({
            //      success:0,
            //      message: "Unable to get the record"
            //     });
            //  }
            return res.status(200).json({
                success:1,
                data:"Profile Successfully Updated"
            });
        });
    },
     
 }