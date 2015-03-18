
// non express method
// get the http and filesystem modules
var http=require('http'),
    fs = require('fs');

//create server
http.createServer(function(req, res){
  //write to our server. set config for the response
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Access-Control-Allow-Origin':'*'
  });

  //grab the index file using fs
  var readStream = fs.createReadStream(__dirname + "/index.html");

  //send the index file to our user
  readStream.pipe(res);

}).listen(1337);

console.log('Visit me at http://localhost:1337');

