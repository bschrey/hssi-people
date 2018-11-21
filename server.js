const restify = require('restify');
const pkg = require('./package.json');
const people = require("./models/people");

var server = restify.createServer();

server.use(restify.plugins.bodyParser());

server.get('/', (req, res, next) => {
  	res.send(200, {'people': 'server'});
  	next();
});

server.get('/api/version', (req, res, next) => {
  	res.send(200, pkg.version);
  	next();
});

server.get('/v1/person', async (req, res, next) => {
    try {
	  	let allPeople = await people.keylist();
	  	res.send(200, JSON.stringify(allPeople));
	} catch(e) {
		console.log(e);
		res.send(500, {"error": "server error"});
	}
});

server.get('/v1/person/:key', async (req, res, next) => {
    try {
	  	let person = await people.read(req.params.key);
	  	console.log(JSON.stringify(person));
	  	if(person) {
			res.send(JSON.stringify(person));
	  	} else {
	  		res.send(400, {"error": "not found"});
	  	}
	} catch(e) {
		console.log(e);
		res.send(500, {"error": "server error"});
	}
});

server.post('/v1/person', async (req, res, next) => {
    try {
		let person = await people.create(req.body.first, req.body.last, req.body.age, req.body.gender);
		console.log(JSON.stringify(person));
		res.send(200, JSON.stringify(person));
	} catch(e) {
		console.log(e);
		res.send(500, {"error": "server error"});
	}
});

server.put('/v1/person', async (req, res, next) => {
    try {
		let person = await people.update(req.body.key, req.body.first, req.body.last, req.body.age, req.body.gender);
		console.log(JSON.stringify(person));
		res.send(200, JSON.stringify(person));
	} catch(e) {
		console.log(e);
		res.send(500, {"error": "server error"});
	}
});

server.del('/v1/person/:key', async (req, res, next) => {
    try {
	  	let person = await people.destroy(req.params.key);
	  	console.log(JSON.stringify(person));
	  	if(person) {
			res.send(200, JSON.stringify(person));
	  	} else {
	  		res.send(400, {"error": "not found"});
	  	}
	} catch(e) {
		console.log(e);
		res.send(500, {"error": "server error"});
	}
});

const port = process.env.PORT || 3000;

server.listen(port, function() {
  console.log(`Listening on ${port}`);
});