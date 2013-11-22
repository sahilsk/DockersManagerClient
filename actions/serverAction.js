
var osUtils = require("os-utils");
var docker = require('docker.io')({ socketPath: '/var/run/docker.sock' });


exports.getAvgLoad = function(req, res){
	
	
	res.send( { "AverageLoad": osUtils.loadavg(15) });
}



exports.getProcessUptime = function(req, res){
	res.send( { "ProcessUptime": osUtils.processUptime() });
}

exports.getFreeMemPercentage = function(req, res){
	res.send( { "FreeMemPercentage": osUtils.freememPercentage() });
}

exports.getServerStat = function(req,res){
	var stat = {};
	stat.platform = osUtils.platform();
	stat.freemem = osUtils.freemem();
	stat.totalmem = osUtils.totalmem();
	stat.freememPercentage = osUtils.freememPercentage();
	
	stat.sysUptime = osUtils.sysUptime();
	stat.processUptime = osUtils.processUptime();
	
	stat.loadavg = [osUtils.loadavg(5), osUtils.loadavg(15), osUtils.loadavg(30) ];
	
	res.send( stat);
}