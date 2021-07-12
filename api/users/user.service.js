const pool = require("../../config/database");

module.exports = {
    //Register the users with matric Id and password 
    create: (data, callBack) => {
        pool.query(
            `insert into users(matric, password) values(?,?)`,
            [
                data.matric,
                data.password,              
            ],
            (error, results, fields) => {
                if (error) {
                   return  callBack(error);
                }
                return callBack(null, results)
            }

        );
    },


    //Login the users with matric Id and password 
    login: (data, callBack) => {
        pool.query(
            `select * from users where matric=? and password=?`,
            [
                data.matric,
                data.password,              
            ],
            (error, results, fields) => {
                if (error) {
                   return  callBack(error);
                }
                return callBack(null, results[0])
            }

        );
    },

    //Get All users With the API
    getUsers: callBack=>{
        pool.query(
            `select * from users`,
            [],
            (error, results, fields) => {
                if (error) {
                   return  callBack(error);
                }
                return callBack(null, results)
            }

        );
    },

    //Get the User profile 
    getUserProfile:(matric, callBack)=>{
        pool.query(
            `select * from users where matric = ?`,
            [matric],
            (error, results, fields) => {
                if (error) {
                   return  callBack(error);
                }
                return callBack(null, results[0])
            }

        );
    },

    updatePassword:(data, callBack)=>{
        pool.query(
            `update  users set  password=? where matric=?`,
            [
                data.password,
                data.matric,
              
            ],
            (error, results, fields) => {
                if (error) {
                   return  callBack(error);
                }
                return callBack(null, results[0])
            }

        );
    },  

  
  
    updateProfile:(data, callBack)=>{
        pool.query(
            `update  users set  level=?, department= ?, email=?  phone= ?, faculty=?, gender=?, fname=?, lname=?  where matric=?`,
            [
                data.level, 
                data.department,
                data.email,
                data.phone,
                data.faculty,
                data.gender,
                data.fname,
                data.lname,
                data.matric
              
            ],
            (error, results, fields) => {
                if (error) {
                   return  callBack(error);
                }
                return callBack(null, results[0])
            }

        );
    },


    getUserByMatric: (matric, callback)=>{
        pool.query(
            `select * from users where matric=?`,
            [matric],
            (error, results,fields)=>{

                if(error) {
                    callback(error);
                }
                return callback(null, results[0]);
            }
        );

    },


    getUserByEmail: (email, callback)=>{
        pool.query(
            `select * from users where email=?`,
            [matric],
            (error, results,fields)=>{

                if(error) {
                    callback(error);
                }
                return callback(null, results[0]);
            }
        );

    }


}