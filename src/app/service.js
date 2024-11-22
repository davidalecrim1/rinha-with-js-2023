import { PersonInvalidNickname } from "./errors.js";

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
