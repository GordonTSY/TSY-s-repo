/***************************************************************************
*	SDS: Subject Data Server
*
****************************************************************************/
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var express = require('express');
var app = express();
var host="localhost";
//var port=Connection.DEFAULT_PORT;
var port=8080;
var db = new Db('SubjectInfo',new Server(host,port,{auto_reconnect:true,poolSize:20},{w:1}));

app.use(express.bodyParser());
app.post("/Creater",function(req, res){
	Creater(req.body.SubjectName,res);
});
app.listen(8080);





function Creater(collection_name,res){
	db.collection(collection_name,function(err,content){
		if(err)
			{
				console.error(err);
				return;
			}
		res.end("Collection :"+collection_name+" is accessible now...\n\n"+content);
		console.log("Register successfully")
	});
}
function Searcher(collection_name){
	
}

function Pusher(){
	
}
