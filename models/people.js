const {ObjectID} = require('mongodb');

const {mongoose} = require('../db/mongoose');
const {PersonModel} = require('./people-mongoose-model');
const Person = require("./Person");

exports.update = function(key, first, last, age, gender) {
	return new Promise((resolve, reject) => {
		try {
			if(!ObjectID.isValid(key)) {
				console.log('Key not valid');
				reject(`Key is not valid.`);
			}	

			PersonModel.findByIdAndUpdate(key,
				{$set: {first: first, last: last, age: age, gender: gender }}, {new: true}).then((person) => {
					if(!person) {
						reject(`Person not found with key ${key}.`);
					}
					resolve(person);
				}).catch((err) => {
					reject(`Error updating Person.`);
				});

		} catch(e) {
			console.log(e);
			reject(`Error creating Person.`);
		}
	});
};

exports.create = function(first, last, age, gender) {
	return new Promise((resolve, reject) => {
		try {
			let personModel = new PersonModel({
				first: first,
				last: last,
				age: age,
				gender: gender
			});

			personModel.save().then((doc) => {
				console.log(doc);
				let person = new Person(doc._id, doc.first, doc.last, doc.age, doc.gender);
				console.log(person);
				resolve(person);
			}, (err) => {
				console.log(e);
				reject(`Error creating Person.`);
			});
		} catch(e) {
			console.log(e);
			reject(`Error creating Person.`);
		}
	});
};

exports.read = function(key) {
	return new Promise((resolve, reject) => {
		try {
			if(!ObjectID.isValid(key)) {
				console.log('Key not valid');
				reject(`Error Person key is invalid: ${key}.`);
			}	

			PersonModel.findById(key).then((doc) => {
				if(!doc) {
					console.log('Key not found');
				 	resolve(null);
				}

				let person = new Person(doc._id, doc.first, doc.last, doc.age, doc.gender);
				resolve(person);

			}).catch((err) => {
				console.log(err)
				reject(`Error reading Person ${key}.`);
			});

		} catch(e) {
			console.log(e);
			reject(`Error reading Person ${key}.`);
		}
	});
};

exports.destroy = function(key) {
	return new Promise((resolve, reject) => {
		try {
			if(!ObjectID.isValid(key)) {
				console.log('Key not valid');
				reject(`Key is not valid.`);
			}	

			PersonModel.findByIdAndRemove(key).then((person) => {
				if(!person) {
					console.log('Key not removed');
					reject(`Key not removed.`);
				}
				console.log(person);
				resolve(person);
			}).catch((err) => {
				console.log(err);
				reject(err);
			});
		} catch(e) {
			console.log(e);
			reject(`Error destroying Person ${key}.`);
		}
	});
};

exports.keylist = function() { 
	return new Promise((resolve, reject) => {
		PersonModel.find().distinct('_id').then((peopleIds) => {
			resolve(peopleIds);
		}, (err) => {
			reject(`Error getting key list of Persons.`);
		});
	});
};

exports.count = function() { 
	return new Promise((resolve, reject) => {
		PersonModel.count().then((count) => {
			resolve(count);
		}, (err) => {
			reject(`Error getting key list of Persons.`);
		});
	});
};

exports.close = async function() { };
