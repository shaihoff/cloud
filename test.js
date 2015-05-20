var express=require("express");
var multer  = require('multer');
var multiparty = require('multiparty');
var app=express();
var bodyParser = require('body-parser');
var databaseUrl = "users" // "username:password@example.com/mydb"
var collections = ["users", "albums"]
var db = require("mongojs").connect(databaseUrl, collections);
//app.use(express.bodyParser());
var done=false;
var azure=require('azure-storage');
//app.use(express.urlencoded());
var formidable = require('formidable');
//app.use(express.json());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser());
app.use(bodyParser.urlencoded());
var jsonParser = bodyParser.json()


app.get('/',function(req,res){
                console.log("in iddddddddddddddddddddddddddddddddddndex");
                //res.sendfile("./uploads/121432026802614.jpg");
                res.sendfile("./index.html");
                });





app.listen(8080,function(){
		console.log("Working on port ima shelcha zona!");
		});










