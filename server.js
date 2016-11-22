var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;
var kommunalka = [];
var kommunalkaNextId = 1;

app.use(bodyParser.json());

app.get('/', function(req, res){
	res.send('S nami vygodno')
});

// GET /todos
app.get('/kommunalka', function(req, res){
	res.json(kommunalka);
});

// GET /todos/:id
app.get('/kommunalka/:id', function(req, res){
	var kommunalkaId = parseInt(req.params.id, 10);
	var matchedkommunalka = _.findWhere(kommunalka, {id: kommunalkaId});

	if(matchedkommunalka){
		res.json(matchedkommunalka);
	}else{
		res.status(404).send();
	}
});

// POST /todos

app.post('/kommunalka', function(req, res){
	var body = _.pick(req.body, 'month','gaz','water');

if (!_.isString(body.month) || body.month.trim().length === 0 
 || body.gaz.length===0 || !_.isNumber(body.gaz) || body.water.length === 0 ||  
 !_.isNumber(body.water))

{ 

return res.status(400).send(); 
} 

body.month = body.month.trim(); 
body.id = kommunalkaNextId++; 


kommunalka.push(body.id + ')'+ 'Month'  + " " + body.month + ', pay for gaz ' + body.gaz + ' and pay for water ' + body.water + ' = Total is' +
" " + (body.gaz+body.water)); 

res.json(body.id + ')'+ 'Month'  + " " + body.month + ', pay for gaz ' + body.gaz + ' and pay for water ' + body.water + ' = Total is' +
" " + (body.gaz+body.water))
});

app.listen(PORT, function(){
	console.log('Express listening on port ' + PORT + '!');
});
