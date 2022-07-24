const express = require("express");
// userRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /user.
const userRoutes = express.Router();
// This will help us connect to the database
const dbo = require("../db/conn");
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
// This section will help you get a list of all the users.
// userRoutes.route("/users").get(function (req, res) {
//     let db_connect = dbo.getDb(); // dental_clinic_db>
//     db_connect
//         .collection("users") // dental_clinic_db>db.users
//         .find({}) // dental_clinic_db>db.users.find({})
//         .toArray(function (err, result) {
//             if (err) throw err;
//             res.json(result);
//         });
// });
userRoutes.route('/users').get(function (request, response) {
    let db_connect = dbo.getDb()
    //dental_clinic_db> db.users.find({})
    db_connect.collection("users").find({}).toArray(function (err, result) {
        if (err) throw err;
        response.json(result)
    })
})

userRoutes.route('/users/:id').get(function (request, response) {
    const db_connect = dbo.getDb();
    db_connect.collection('users')
        .findOne({ _id: ObjectId(request.params.id) }, function (err, result) {
            if (err) throw errr;
            response.json(result);
        })
})

userRoutes.route('/users/add').post(function(request,respone){
    let db_connect=dbo.getDb();
    console.log(request.body)
    const query=(({name,email,phone,city,township})=>({name,email,phone,city,township}))(request.body)
    db_connect.collection("users").insertOne(query,function(err,result){
        if(err) throw err;
        respone.json(result);
    })
})
userRoutes.route('/users/:id').post(function (request, response) {
    const db_connect = dbo.getDb();
    const _id = request.params.id
    const payload = request.body
    console.log(payload)
    console.log(_id)
    db_connect.collection('users').updateOne({ _id: ObjectId(_id) }, {
        $set: payload
    }).then((obj) => {
        response.json(obj)
    })
})
userRoutes.route('/users/:id').delete(function (request, response) {
    const db_connect = dbo.getDb();
    db_connect.collection('users').deleteOne({ _id: ObjectId(request.params.id) }, function (err, result) {
        if (err) throw err;
        response.json(result)
    })
})
module.exports = userRoutes;