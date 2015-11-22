var fs = require('co-fs');
var config = require('./config/config');
var log = require('./utilities/logger');
var koa = require('koa');
var route = require('koa-route');
var cors = require('koa-cors');

var app = module.exports = koa();
app.use(cors());

app.use(route.get('/features', getFeatures));
app.use(route.get('/price', getPrice));
app.use(route.get('/', main));


function *main() {
	this.body = yield fs.readFile('./index.html', {encoding: 'utf8'});
	log.info(this.body);
}

function *getFeatures() {
	var params = JSON.parse(this.request.query.params);
	var searchTerm = params.searchTerm;

	var res = {features: { feature1: {options: []}, feature2: {options: []} }};
	log.info(res);
	this.body = res;
}

function *getPrice() {
	var params = JSON.parse(this.request.query.params);
	var searchTerm = params.searchTerm;
	var featureChoices = params.features;

	var res = {prices: {lower: 10, median: 15, upper: 20}};
	log.info(res);
	this.body = res;
}

function *getSearchSuggestions() {
	var res = {suggestions: ['a', 'b', 'c']};
	log.info(res);
	this.body = res;
}


if (!module.parent) app.listen(config.port);