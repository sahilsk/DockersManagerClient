var http = require("http"),
    logger = require("./logger"),
    Journey = require("journey"),
    ecstatic = require('ecstatic'),
	routes = require("./config/routes")
;

var router = new Journey.Router;



//var app = http.createServer( ecstatic({ root: __dirname + '/public' }) );
							
var app = http.createServer( function(request, response){;

	var body = "";
	request.addListener('data', function (chunk) { body += chunk });
	request.addListener('end', function () {
		// Dispatch the request to the router
		router.handle(request, body, function (result) {
			console.log(result); 
			response.writeHead(result.status, result.headers);
			response.end(result.body);
		});
	});
}).listen(3005);

//Routes information
routes.makeRoutes(router);

//Listener is up and running
logger.log('info', 'Listening on :3005');




    
