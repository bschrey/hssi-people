const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
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
}, {
    timestamps: true
});

const PersonModel = mongoose.model('person', PersonSchema);

module.exports = {PersonModel};
