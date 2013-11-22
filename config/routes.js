
var serverCtrl = require("../actions/serverAction");

var dockerCtrl = require("../actions/dockerAction");

exports.makeRoutes = function(router){
	router.get("/hello").bind( function(req, res){
        res.send("Hi There");    
	})
	
	
	router.path("/docker", function(){
		this.get().bind( dockerCtrl.getDockerStat);	
		
		this.post("/pullImage").bind( dockerCtrl.pullImageFromRepo);
		
	});
	
	
	router.path("/host", function(){
		
		this.get().bind( serverCtrl.getServerStat);
		
		this.get("/avgLoad").bind( serverCtrl.getAvgLoad);
		
		this.get("/freeMemPercentage").bind(serverCtrl.getFreeMemPercentage);
		
		this.get("/processUptime").bind( serverCtrl.getProcessUptime );
		
		this.get("/cpu").bind( serverCtrl.getCpuStat);

		
	});
	
}