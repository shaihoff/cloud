var express=require("express");
var multer  = require('multer');
var multiparty = require('multiparty');
var app=express();
var bodyParser = require('body-parser');
var databaseUrl = "albums"; // "username:password@example.com/mydb"
var collections = ["users", "albums"]
var db = require("mongojs").connect(databaseUrl, collections);
//app.use(express.bodyParser());
var done=false;
var azure=require('azure-storage');
var formidable = require('formidable');
//app.use(express.json());
app.use(bodyParser.json()); // for parsing application/json
var db = require("mongojs").connect(databaseUrl, collections);
var databaseUrl = "albums"; 
var collections = ["albums"]

app.post('/rollme',function(req,res){
	console.log(req,body);
	var user=req.body.split(' ')[0];
	var password = req.body.split[1];
	db.users.insert({'username': user, 'password': password });
	
});
db.users.insert({username: 'dsds', password: 'ssss'});




app.get('/',function(req,res){
		console.log("in iddddddddddddddddddddddddddddddddddndex");
		//res.sendfile("./uploads/121432026802614.jpg");
		res.sendfile("./index.html");
		});

app.get('/:file',function(req,res){
		var file=req.params.file;
		console.log(req.params.file);
		var filePath='./'+file;
		console.log(filePath);
		
		var fs = require('fs');
		try {
		// Query the entry
		stats = fs.lstatSync('./'+file);

		// Is it a directory?
		if (stats.isFile()) {
			
			res.sendfile('./'+file);
		}
		else
		{
			res.sendfile("./index.html");}
		}
		catch (e) {
			res.send('err');
		}
		//res.sendfile("./uploads/121432026802614.jpg");
		});

app.get('/uploads',function(req,res){
		var myFilename= req.body.filedname;
		//headers['filename'];
		console.log("im here");
		console.log(req.body);
		res.sendfile("./uploads/"+myFilename);
		});


app.post('/api/photo',function(req,res){
		if(done==true){
		console.log(req.files);
		res.end("File uploaded.");
		}
		else{
		res.end("sssssssssssssssss");
		}
		});		

app.post('/uploadImage', function (req, res) {
		//    var blobService = azure.createBlobService();
		var blobSvc = azure.createBlobService('imgallery','+ooOpZ195pkhCHARogYMtOyr8u9C0edW7ltUl2DDfhp2TpV8H5HTsjag/we8NVRfa12h53qR0cCPH0JuiJiDdQ==');  
		var form = new multiparty.Form();
		console.log("go fuck yourself");
		form.on('part', function(part) {
			if (part.filename) {
			console.log(part.filename.split('.')[0]);
			var size = part.byteCount - part.byteOffset;
			var name = part.filename;
			try{addImage(part.albumName,part,size,req,res)}
			catch(err){
			res.send(err)
			}
			} else {
			console.log(part)
			console.log("something went wrong while adding");
			console.log(part.filename);
			}
			});
		form.parse(req);
		res.send('OK');
});

function addImage(albumName ,part,size,req,res){
		console.log("addimage nigga!")
 blobSvc = azure.createBlobService('imgallery','+ooOpZ195pkhCHARogYMtOyr8u9C0edW7ltUl2DDfhp2TpV8H5HTsjag/we8NVRfa12h53qR0cCPH0JuiJiDdQ=='); 
 	console.log(part.filename)
	console.log(part)
	console.log(size)
	console.log(albumName)
	var albumName2="fuckdick69";
	console.log("hof is a dickfuck")
	blobSvc.createBlockBlobFromStream(albumName2, part.filename, part, size, function(error) {
				if (error) {
				console.log("blob insert failed")
				console.log(error)
				res.send({ Grrr: error });  
				}
				else{
					res.send("sallright  my nigga")
				}
		});
		albumName3="oldAlbum";
		
		db.albums.update({'name':albumName3}, {$push:{'images': part.filename}}, {multi:true}, function(err) {
		console.log(err)
		console.log('mongo db updated nigga!')
		});

}






/*Run the server.*/
app.listen(8080,function(){
		console.log("Working on port 3000");
		});
