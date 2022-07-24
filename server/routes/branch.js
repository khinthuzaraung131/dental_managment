const express = require("express");

const branchRoutes = express.Router();

const dbo = require('../db/conn');

const ObjectId = require("mongodb").ObjectId;


branchRoutes.route('/branches').get(function(request,response){
    let db_connect=dbo.getDb();

    db_connect.collection("branches").find({}).toArray(function(err,result){
        if(err) throw err;
        response.json(result);
    })
})

branchRoutes.route('/branches/:id').get(function (request, response) {
    const db_connect = dbo.getDb();
    db_connect.collection('branches')
        .findOne({ _id: ObjectId(request.params.id) }, function (err, result) {
            if (err) throw errr;
            response.json(result);
        })
})
module.exports=branchRoutes;