var express = require('express');
var app = express();

app.all('*',function(req,res,next) {
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Methods','PUT,GET,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers','Content-Type');
	next();
});

app.get('/docentes', function (req, res) {
	res.json([
  		{nome:"Sandra De Amo",cpf:"000.000.000-00", },
		{nome: "Gina Maria", cpf: "111.111.111-11"},
		{nome: "Joao Nunes", cpf: "222.222.222-22"}
	]);
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});