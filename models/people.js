const Person = require("./Person");

let people = [];

exports.update = exports.create = async function(key, first, last, age, gender) {
	try {
		people[key] = new Person(key, first, last, age, gender);
		return people[key];
	} catch(e) {
		console.log(e);
		throw new Error(`Error creating Person.`);
	}
};

exports.read = async function(key) {
	try {
		if(people[key]) {
			return people[key];
		} else {
			return null;
		}
	} catch(e) {
		console.log(e);
		throw new Error(`Error reading Person ${key}.`);
	}
};

exports.destroy = async function(key) {
	try {
		if(people[key]) {
			let person = people[key];
			delete people[key];
			return person;
		} else {
			return null;
		}
	} catch(e) {
		console.log(e);
		throw new Error(`Error destroying Person ${key}.`);
	} 
}

exports.keylist = async function() { return Object.keys(people); };
exports.count = async function() { return people.length; };
exports.close = async function() { };
