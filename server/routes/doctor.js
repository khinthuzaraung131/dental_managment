const express = require("express");

const doctorRoutes = express.Router();

const dbo = require('../db/conn');

const ObjectId = require("mongodb").ObjectId;


doctorRoutes.route('/doctors').get(function(request,response){
    let db_connect=dbo.getDb();

    db_connect.collection("doctors").find({}).toArray(function(err,result){
       if (err) throw err;
       response.json(result);
     })
 })

doctorRoutes.route('/doctors/:id').get(function(request,response){
  let db_connect=dbo.getDb();
  
  db_connect.collection("doctors").findOne({_id:ObjectId(request.params.id)}),function(request,response){
    if(err) throw err;
    response.json(result)
  }
})
 module.exports = doctorRoutes;


