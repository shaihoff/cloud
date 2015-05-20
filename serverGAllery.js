var databaseUrl='albums';
var collections=["albums"]
var db = require("mongojs").connect(databaseUrl, collections);
var azure = require('azure-storage');
var blobSvc = azure.createBlobService('imgallery','+ooOpZ195pkhCHARogYMtOyr8u9C0edW7ltUl2DDfhp2TpV8H5HTsjag/we8NVRfa12h53qR0cCPH0JuiJiDdQ==');  



var app = require('express')(),
    swig = require('swig'),
    people;

// This is where all the magic happens!
app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// Swig will cache templates for you, but you can disable
// that and use Express's caching instead, if you like:
app.set('view cache', false);
// To disable Swig's cache, do the following:
swig.setDefaults({ cache: false });
// NOTE: You should always cache templates in a production environment.
// Don't leave both of these to `false` in production!

app.get('/', function (req, res) {
		res.render('zmoor', { /* template locals context */ });
		});


app.post('/createNewAlbum/:username/:albumName',function(req,res){
	var username=req.params.username;
	console.log(req.params.username);
	var newContainer=req.params.albumName;
console.log(req.params.albumName)

	//	var username="tupac"
	//	var newContainer="50cent"
		blobSvc.createContainerIfNotExists(newContainer, function(error, result, response){
	  if(!error){
	console.log("inserted album succesfully1")
	  	db.albums.insert({"name" : newContainer, "read" : [ username], "write" : [  username ], "images" : [ ] });
	res.send("inserted succesfully!")	
  }
	  else{
	  	console.log("error:")
	  	console.log(error)
	  }
	});
	
});

app.get('/:username/albums',function (req, res) {



                var albumsRead=[];
		var albumsWrite=[];
		var username=req.params.username;
		 db.albums.find({'read': username }).toArray(function(err,docs){
                        
			if (docs.length === 0 ) {
			docs=['this user has no fucking albums!']
			res.render('images', {albums:docs ,title:"no albums!"});
			}
			else{
			console.log(docs);
			for (i=0;i<docs.length;i++)
                        {
                        x=docs[i];
			albumsRead.push(x['name']);
			}
			db.albums.find({'write': username }).toArray(function(err,docs){

                        if (docs.length === 0 ) {
                        docs=['this user has no fucking albums!']
                        res.render('images', {albums:docs ,title:"no albums!"});
                        }
                        else{
                        console.log(docs);
                        for (i=0;i<docs.length;i++)
                        {
                        x=docs[i];
                        albumsWrite.push(x['name']);
                        }
			
			
			console.log(albumsRead);
			res.render('albums', { pagename:'i wanna go gome',albumsRead:albumsRead,albumsWrite:albumsWrite,title:"album lists"});
			}
});
}
});

});
app.get('/images', function (req, res) {



		var imagesVar=[];
	//	var containerName=req.body.album
	var containerName="test"	
	blobSvc.listBlobsSegmented(containerName, null, function(error, result, response){
			if(!error){
			console.log(result.entries[1])
			console.log(result.entries[0])
			var arr=result.entries;
			console.log("list of files");
			console.log(result.entries);
			//  for(var x in arr){
			for (i=0;i<arr.length;i++)   
			{		
	//		console.log(arr[i]);
			x=arr[i];
			imagesVar.push(x['name']);
			/**   		blobService.getBlobToFile('myblob', i, '/tmp/FUCKKK'+i, function(error, result ,response){
			  if(!error){
			  console.log(filePath);
			  images.push('/tmp/FUCKKK'+i);

			  }
			  });**/


			/**%
			  blobSvc.getBlobToStream('mycontainer', 'myblob', fs.createWriteStream('output.txt'), function(error, result, response){
			  if(!error){
			// blob retrieved
			}
			});**/

			}




		console.log(imagesVar)
			res.render('images', { pagename:'i wanna go gome',images:imagesVar ,album_name:'test',title:"huffucker"});

			}
			  else{
				  console.log(error)
			  }
			});





			//console.log(images)
			//res.render('albums', { pagename:'i wanna go gome',images:images ,album_name:'test'});
		});












app.get('/css/:file',function(req,res){
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
		}

		// res.sendfile("./index.html");}

		catch (e) {
			res.send('err');
		}
		//res.sendfile("./uploads/121432026802614.jpg");
});




















app.listen(8080);
console.log('Application Started on ima shelcha zona!');
