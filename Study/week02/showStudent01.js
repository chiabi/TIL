class Person {
	constructor(ssn,firstname, lastname, birthYear = null, address = null) {
		this._ssn = ssn;
		this._firstname = firstname;
		this._lastname = lastname;
		this._birthYear = birthYear;
		this._address = address;
	}

	get ssn() {
		return this._ssn;
	}

	get firstname() {
		return this._firstname;
	}

	set firstname(firstname) {
		this._firstname = firstname;
		return this;
	}

	get lastname() {
		return this._lastname;
	}

	get birthYear() {
		return this._birthYear;
	}

	get address() {
		return this._address;
	}

	get fullname() {
		return `${this._firstname} ${this._lastname}`;  
	}
};

class Student extends Person {
	constructor(ssn, firstname, lastname, school, birthYear = null, address = null) {
		super(ssn, firstname, lastname, birthYear, address);
		this._school = school;
	}

	get school() {
		return this._school;
	}
};

var _students = {
	'444-44-4444': new Person('444-44-4444', 'Alonzo', 'Church'),
	'444444444'  : new Person('444-44-4444', 'Alonzo', 'Church')
};

const db = {
	find: function (ssn) {
		return _students[ssn];
  	}
};

function showStudent(ssn) {
  let student = db.find(ssn);
  if(student !== null) {
    document.querySelector(`#${elementId}`).innerHTML = `${student.ssn}, ${student.firstname}, ${student.lastname}`;
  } else {
    throw new Error('학생을 찾을 수 없습니다!');
  }
}

showStudent('444-44-4444');