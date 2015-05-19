var databaseUrl = "albums"; // "username:password@example.com/mydb"
var collections = ["users", "albums"]
var db = require("mongojs").connect(databaseUrl, collections);

db.users.find({}, function(err, users) {
  if( err || !users) console.log("No female users found");
  else {
        console.log("databse contains:");
  console.log(users);

  }
});

db.albums.find({}, function(err, users) {
  if( err || !users) console.log("No female users found");
  else {
	console.log("databse contains:");
  console.log(users);
	
  }
});
