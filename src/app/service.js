import { PersonInvalidNickname } from "./errors.js";
import { v4 as uuidv4 } from "uuid";

class Person {
  constructor(nickname, name, dob, stack) {
    this.id = uuidv4();
    this.nickname = nickname;
    this.name = name;
    this.dob = dob;
    this.stack = stack;
  }
}

class PersonService {
  constructor(PersonRepository) {
    this.repo = PersonRepository;
  }

  async CreatePerson(person) {
    if (person.nickname === "") {
      throw new PersonInvalidNickname();
    }

    return await this.repo.CreatePerson(person);
  }

  async GetPersonById() {}
  async SearchPersons() {}
  async GetPersonsCount() {}
}

export default PersonService;
