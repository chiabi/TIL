export const people = [
  {
    id: 1,
    name: 'syami',
    age: 9,
    gender: 'female'
  },
  {
    id: 2,
    name: 'jojo',
    age: 8,
    gender: 'male'
  },
  {
    id: 3,
    name: 'loki',
    age: 5,
    gender: 'male'
  },
  {
    id: 4,
    name: 'kkonnim',
    age: 4,
    gender: 'female'
  },
]

export const getById = id =>  {
  const filteredPeople = people.filter(person => id === person.id);
  return filteredPeople[0];
}
