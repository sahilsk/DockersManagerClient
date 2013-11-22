
var osUtils = require("os-utils");
var logger = require("../config/logger");

exports.getAvgLoad = function(req, res, params){
	
	if( typeof params.minutes ==="undefined" && !params.minutes)
		res.send( { "AverageLoad": osUtils.loadavg(15), minutes:15 });
	else{
		logger.info("Minutes: " + params.minutes);
		res.send( { "AverageLoad": osUtils.loadavg( parseInt( params.minutes)  ) , minutes:params.minutes });
	}
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
	
	stat.loadavg = [{ AverageLoad: osUtils.loadavg(5), minutes: 5}, 
					{ AverageLoad: osUtils.loadavg(15), minutes: 15},
					{ AverageLoad: osUtils.loadavg(30), minutes: 30}
				   ];	
	res.send( stat);
}


exports.getCpuStat = function(req, res){
	var cpuInfo = {};
	osUtils.cpuUsage( function(value){
		cpuInfo.cpuUsage = value ;
		osUtils.cpuFree( function(value){
			cpuInfo.cpuFree = value ;
			res.send( cpuInfo);
		});
	});
	
}
