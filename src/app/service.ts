import PersonRepository from "../infra/repository.ts";
import { Person } from "./domain.ts";

class PersonService {
  repo: PersonRepository;
  constructor(PersonRepository: PersonRepository) {
    this.repo = PersonRepository;
  }

  async CreatePerson(person: Person) {
    await this.repo.CreatePerson(person);
  }

  async GetPersonById(id: string) {
    return await this.repo.GetPersonById(id);
  }
  async SearchPeople(term: string) {
    return await this.repo.SearchPeople(term);
  }
  async GetPersonsCount() {
    return await this.repo.GetPersonsCount();
  }
}

export default PersonService;
