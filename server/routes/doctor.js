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
doctorRoutes.route('/doctors').post(function(request,respone){
  let db_connect=dbo.getDb();
  console.log(request.body)
  const query=(({name,email,phone,viber,branch,age})=>({name,email,phone,viber,branch,age}))(request.body)
  db_connect.collection("doctors").insertOne(query,function(err,result){
      if(err) throw err;
      respone.json(result);
  })
})
doctorRoutes.route('/doctors/:id').post(function (request, response) {
  const db_connect = dbo.getDb();
  const _id = request.params.id
  const payload = request.body
  console.log(payload)
  console.log(_id)
  db_connect.collection('doctors').updateOne({ _id: ObjectId(_id) }, {
      $set: payload
  }).then((obj) => {
      response.json(obj)
  })
})
doctorRoutes.route('/doctors/:id').delete(function (request, response) {
  const db_connect = dbo.getDb();
  db_connect.collection('doctors').deleteOne({ _id: ObjectId(request.params.id) }, function (err, result) {
      if (err) throw err;
      response.json(result)
  })
})
 module.exports = doctorRoutes;


