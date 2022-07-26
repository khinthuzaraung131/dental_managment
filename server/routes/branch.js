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
branchRoutes.route('/branches').post(function(request,respone){
    let db_connect=dbo.getDb();
    console.log(request.body)
    const query=(({name,email,phone,viber,facebook_url,township})=>({name,email,phone,viber,facebook_url,township}))(request.body)
    db_connect.collection("branches").insertOne(query,function(err,result){
        if(err) throw err;
        respone.json(result);
    })
  })
  branchRoutes.route('/branches/:id').post(function (request, response) {
    const db_connect = dbo.getDb();
    const _id = request.params.id
    const payload = request.body
    console.log(payload)
    console.log(_id)
    db_connect.collection('branches').updateOne({ _id: ObjectId(_id) }, {
        $set: payload
    }).then((obj) => {
        response.json(obj)
    })
  })
  branchRoutes.route('/branches/:id').delete(function (request, response) {
    const db_connect = dbo.getDb();
    db_connect.collection('branches').deleteOne({ _id: ObjectId(request.params.id) }, function (err, result) {
        if (err) throw err;
        response.json(result)
    })
  })
module.exports=branchRoutes;