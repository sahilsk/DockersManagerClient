
var serverCtrl = require("../actions/serverAction");

exports.makeRoutes = function(router){
	router.get("/hello").bind( function(req, res){
        res.send("Hi There");    
	})
	
	
	router.path("/docker", function(){
		this.get().bind( function(req, res){
			res.send({dockerListener: "Docker operation"});
			
		});;
		
		
		
	});
	
	
	router.path("/host", function(){
		
		this.get().bind( serverCtrl.getServerStat);
		
		
		
		
		this.get("/avgLoad").bind( serverCtrl.getAvgLoad);
		
		this.get("/freeMemPercentage").bind(serverCtrl.getFreeMemPercentage);
		
		this.get("/processUptime").bind( serverCtrl.getProcessUptime );
		
		
		
	});
	
}