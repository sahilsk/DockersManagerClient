var http = require("http");
var util = require("util");
var osUtils = require("os-utils");
var config = require("../config/config");
var logger = require("../config/logger.js");
//var docker = require('docker.io')({ socketPath: '/var/run/docker.sock' });


exports.getDockerStat = function(req, res){
	var stat = {};
	var resBody = "";
	var options = {
	  hostname: config.docker.hostname,
	  port: config.docker.port,
	  path: "/info",
	  method: 'GET'
	};
	console.log(JSON.stringify(options));
	var cliRequest = http.request(options, function (cliResponse) {
	  console.log('STATUS: ' + cliResponse.statusCode);
	  console.log('HEADERS: ' + JSON.stringify(cliResponse.headers));
	  cliResponse.setEncoding('utf8');
	  cliResponse.on('data', function (chunk) {
		resBody += chunk;
	  });
	  cliResponse.on('end', function () {
		  
		  switch(cliResponse.statusCode){
				  case(200):
				  	logger.log("info", "Docker information retrieved..");
				  	res.send( JSON.parse( resBody)) ;		  
				  	return ;
				  	break;
				  case(500):
				  	logger.log("error", "Server Error");
				  	res.send({error: "Server Error"});
				  	return;
				  	break;	
				  default:
				  	logger.log("error", "Unable to connect to docker server. Please check connection");
				  	res.send({error: "Unable to connect to docker server. Please check connection"});
				  	return;
				  	break;			  				  
		  }
		  
	  });
	});
	cliRequest.on('error', function (e) {
		resBody = "";
		logger.log("error", "Unable to connect to docker server. Please check connection");
		res.send({error: "Unable to connect to docker server. Please check connection"});
	});
	cliRequest.end();
}

exports.pullImageFromRepo = function(req, res, params){
	
	var repository = JSON.parse(params.repository);
	var tag = params.tag.trim();
	if( typeof tag === "undefined" && tag.length === 0){
		res.send({"Error":"No image name provided."});
		return;
	}
	
	if( typeof repository=== "undefined" && !repository.ip && !repository.port){
		res.send({"Error":"No repository provided."});
		return;
	}
	
	//Create Child process
	var cmdToPullImage = util.format("docker pull %s:%s/%s", repository.ip, repository.port, tag );
	
	logger.info("Command to execute : %s", cmdToPullImage);
		
	var child;
	child = exec(cmdToPullImage, function (error, stdout, stderr) {
		tag
		 logger.info( 'stdout: ' + stdout);
		 if (error !== null) {
			 logger.info( 'exec error: ' + error);
			 res.send({success: false, error: error, message: stderr});
		  }else
			  res.send({success: true, stdout : stdout });
	});
	
	
	/*
	pullRequest.on("close", function(code, signal){
	 	logger.info('child process terminated due to receipt of signal' + signal);   
		res.send('child process terminated due to receipt of signal '+ signal );
	 });
	
	pullRequest.on("error", function(err){
		logger.info("Error: "+err);
	});
	*/
	
}

exports.pushImageOnRegistry = function(req, res, params){
	
	var repository = JSON.parse(params.repository);
	var tag = params.tag.trim();
	if( typeof tag === "undefined" && tag.length === 0){
		res.statusCode = 404;
		res.send({"Error":"No image name provided."});
		return;
	}
	
	if( typeof repository=== "undefined" && !repository.ip && !repository.port){
		res.statusCode = 404;
		res.send({"Error":"Registry address not provided."});
		return;
	}
	
	//Create Child process
	var cmdToPullImage = util.format("docker push %s:%s/%s", repository.ip, repository.port, tag );
	
	logger.info("Executing : %s", cmdToPullImage);
		
	var child;
	child = exec(cmdToPullImage, function (error, stdout, stderr) {
		logger.info( 'stdout: ' + stdout);
		 if (error !== null) {
			 logger.info( 'exec error: ' + error);
			 res.send({success: false, error: error, message: stderr});
		  }else
			  res.send({success: true, stdout : stdout });
	});
	
}
