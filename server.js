'use strict';

const dotenv = require('dotenv').config(),
  hapi = require('hapi'),
  mysql = require('mysql'),
  Joi = require('joi'),
  bcrypt = require('bcrypt'),
  fs=require('fs');
  

/*create a new server from hapi*/
const server = new hapi.Server({
  host: 'localhost',
  port: process.env.PORT
});

/*mysql database connection*/
const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DATABASE,
  multipleStatements: true
})
/*database connection establishment*/
con.connect(function(err) {
  if (err) {
    return console.error('error :' + err.message);
  }
  
  let querys = "";
  fs.readFile('./query.sql','utf8',function(err,data){	 
	  querys=data;
	  /*auto create table and insert statements*/
	  con.query(querys, function(er, results, fields) {
		if (er) {
		  console.log(er);
		}
	  });
	  con.end(function(err) {
		if (err)
		  return console.log(err.message);
	  })
  });
  
  
  
  
});

/*simple route for hello world */
server.route({
  method: 'GET',
  path: '/helloworld',
  handler: function(request, reply) {
    return "hello world";
  }
});
/*service for work category*/
server.route({
  method: 'GET',
  path: '/wcate',
  handler: function(req, res) {
    const uid = req.params.uid;
    con.query('select * from wcat', function(err, results, fields) {
      if (err) throw err;
      console.log(results);
      res(results);
    })
  }
});

/*start the server*/
server.start(err => {
  if (err) {
    throw err;
  }
  console.log("Server running at:", server.info.uri);
});
