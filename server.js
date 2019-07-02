'use strict';

const hapi=require('hapi'),
 MYSQL= require('mysql'),
 Joi=require('joi'),
 bcrypt=require('bcrypt');

const server = new Hapi.Server();

const con=MYSQL.createConnection({
  host:'localhost',
  user:'root',
  password:'admin',
  database:'work_repo'
})

server.connection({
  host:'localhost',
  port:8000
})

con.connect();
server.route({
  method:GET,
  path:'helloworld',
  handler:function(req,res){
    return reply("hello world");
  }
});

server.route({
  method:GET,
  path:'',
  handler:function(req,res){
    const uid=req.params.uid;
    con.query('',function(err,results,fields){
      if(err)throw err;
      console.log(results);
      reply(results);
    })
  }
});

server.start(err=>{
  if(err){
    throw err;
  }
  console.log("Server running at:", server.info.uri);
})
