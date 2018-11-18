const mongoose = require('mongoose');

const PersonModel = mongoose.model('person', {
	first: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	last: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	age: {
		type: Number,
		default: null
	},
	gender: {
		type: String,
		default: null
	}
});

module.exports = {PersonModel};
