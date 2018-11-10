import Person from "./Person";

export default class Student extends Person {
  constructor(firstname, lastname, ssn, school) {
    super(firstname, lastname, ssn);
    this._school = school;
  }

  get school() {
    return this._school;
  }

  studentsInSameCountryAndSchool(friends) {
    let closeFriends = super.peopleInSameCountry(friends);
    let result = [];
    for (let idx in closeFriends) {
      let friend = closeFriends[idx];
      if (friend.school === this.school) {
        result.push(friend);
      }
    }
    return result;
  }
}
