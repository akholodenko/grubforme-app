/*
// 3rd party modules
var _http = require("http");

*/
/**	HTTP server instance to respond to API requests	*//*

var server = _http.createServer(function(request, response) {
	response.end('Hello World\n');
});

server.listen(8080);
console.log("Server is listening");*/

var http = require('http'),
	url = require('url'),
	path = require('path'),
	fs = require('fs');
var mimeTypes = {
	"html": "text/html",
	"jpeg": "image/jpeg",
	"jpg": "image/jpeg",
	"png": "image/png",
	"js": "text/javascript",
	"css": "text/css"};

http.createServer(function(req, res) {
	var uri = url.parse(req.url).pathname;
	var filename = path.join(process.cwd(), uri);
	fs.exists(filename, function(exists) {
		if(!exists) {
			console.log("not exists: " + filename);
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.write('404 Not Found\n');
			res.end();
			return;
		}
		var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
		res.writeHead(200, {'Content-Type':mimeType});

		var fileStream = fs.createReadStream(filename);
		fileStream.pipe(res);

	}); //end path.exists
}).listen(8080);