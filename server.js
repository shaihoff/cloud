var azure = require('azure-storage');

var blobSvc = azure.createBlobService('imgallery','+ooOpZ195pkhCHARogYMtOyr8u9C0edW7ltUl2DDfhp2TpV8H5HTsjag/we8NVRfa12h53qR0cCPH0JuiJiDdQ==');
/**
blobSvc.createBlockBlobFromLocalFile('test', 'myblob', 'img/58afc01fea438e644d05e0e601b8d740.jpg', function(error, result, response){
  if(!error){
    // file uploaded
  }
});

blobSvc.createBlockBlobFromLocalFile('test', 'myblob2', 'img/Esti-Ginzburg-Miller-Jewelry--485x728.jpg', function(error, result, response){
  if(!error){
    // file uploaded
  }
});
**/
blobSvc.createContainerIfNotExists('fuckdick69', {publicAccessLevel : 'blob'}, function(error, result, response){
  if(!error){
    console.log("1");
  }
});

blobSvc.createBlockBlobFromLocalFile('fuckdick69', 'zaynbayn', 'img/Esti-Ginzburg-Miller-Jewelry--485x728.jpg', function(error, result, response){
  if(!error){
console.log("2")
    // file uploaded
  }
});


