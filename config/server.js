var express = require('express');
var consign = require('consign');
const cors = require('cors');

var app = express();

app.use((req, res, next)=>{
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
	app.use(cors()); 
	next();
})
app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static('./app/public'));
app.use(express.urlencoded({extended: true}));

app.use(express.json());

consign()
	.include('app/routes')
	.then('app/controllers')
	.into(app);

module.exports = app;