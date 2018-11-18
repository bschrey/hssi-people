const _person_key = Symbol('key');
const _person_first = Symbol('first');
const _person_last = Symbol('last');
const _person_age = Symbol('age');
const _person_gender = Symbol('gender');

module.exports = class Person {
	constructor(key, first, last, age, gender) {
		this[_person_key] = key;
		this[_person_first] = first;
		this[_person_last] = last;
		this[_person_age] = age;
		this[_person_gender] = gender;
	}

	get key() { return this[_person_key]; }
	set key(newKey) { this[_person_key] = newKey; }
	
	get first() { return this[_person_first]; }
	set first(newFirst) { this[_person_first] = newFirst; }

	get last() { return this[_person_last]; }
	set last(newLast) { this[_person_last] = newLast; }

	get age() { return this[_person_age]; }
	set age(newAge) { this[_person_age] = newAge; }

	get gender() { return this[_person_gender]; }
	set gender(newGender) { this[_person_gender] = newGender; }
	
	toJSON() {
		let {key, first, last, age, gender} = this;
		return {key, first, last, age, gender};
	}

	static fromJSON(json) {
		var data = JSON.parse(json);
		var person = new Person(data.key, data.first, data.last, data.age, data.gender);
		return person;
	}

}