const pool = require("../../config/database");

module.exports = {
    //Register the Course  with matric Id and password 
    createCourse: (data, callBack) => {
        pool.query(
            `insert into course(matric, course) values(?,?)`,
            [
                data.matric,
                data.course,

            ],
            (error, results, fields) => {
                if (error) {
                   return  callBack(error);
                }
                return callBack(null, results)
            }

        );
    },


    deleteCourse: (data, callBack)=>{
        pool.query(
            `delete from course where id=? `,
            [
                data.id,
            ], (error, results, fields)=>{
                if (error) {
                     callBack(error);   
                }
                return callBack(null, results[0]);
            }
        );
    }




}