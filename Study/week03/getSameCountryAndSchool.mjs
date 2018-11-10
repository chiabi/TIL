import Student from "./Student";
import Address from "./Address";

const curry = new Student("Haskell", "curry", "111-11-111", "Penn State");
curry.address = new Address("US");

const turing = new Student("Alan", "Turing", "222-22-222", "Princeton");
turing.address = new Address("England");

const church = new Student("Alonzo", "Church", "333-33-333", "Princeton");
church.address = new Address("US");

const kleene = new Student("Stephen", "Kleene", "444-44-444", "Princeton");
kleene.address = new Address("US");

// 다음은 church학생과 거주 국가와 학교가 모두 같은 학생을 찾습니다.
// OOP
const friends = [curry, turing, kleene];
const result = church.studentsInSameCountryAndSchool(friends);
console.log(result);

// FP
const selector = (country, school) => student =>
  student.address.country === country && student.school === school;

const findStudentBy = (friends, selector) => friends.filter(selector);
console.log(
  findStudentBy([curry, turing, church, kleene], selector("US", "Princeton"))
);
