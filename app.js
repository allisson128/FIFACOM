var http 			= require('http');
var path 			= require('path');
var methodOverride 	= require('method-override');

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('fifacom');
var bodyParser = require('body-parser');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


/*********** GET methods *************/
app.get('/', function(req, res){
	res.render('index.ejs');
});

app.get('/docentes', function(req, res){
	res.render('docentes.ejs');
});

app.get('/disciplinas', function(req, res){
	res.render('disciplinas.ejs');
});



app.use(methodOverride('X-HTTP-Method'));          // Microsoft
app.use(methodOverride('X-HTTP-Method-Override')); // Google/GData
app.use(methodOverride('X-Method-Override'));      // IBM
app.use(methodOverride('_method'));


app.all('*',function(req,res,next) {
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Methods','PUT,GET,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers','Content-Type');
	next();
});

app.get('/carregardocentes', function (req, res) {
	db.collection('docentes').find({}, function(err, result){
		res.json(result);
	});
});

app.post('/adicionardocente', function (req,res){
	console.log("POST: ");
	//res.header("Access-Control-Allow-Origin", "http://localhost");
	//res.header("Access-Control-Allow-Methods", "GET, POST");
	//console.log(req.body);
	//db.collection('docentes').insert({'nome':'filomena','cpf':'111.111.111-22'});
	//var dado = req.body;

	db.collection('docentes').insert(req.body, function(err, result){
		console.log("Result: "+result);
		res.send(			
			(err == null) ? {msg: 'Inserido com suscesso'} : {msg: err}
		);
	});
});

var server = http.createServer(app).listen(3001, function () {

  var host = server.address().address;
  var port = server.address().port;
  console.log('FIFACOM - Escutando no endereco: http://%s:%s', host, port);

});



