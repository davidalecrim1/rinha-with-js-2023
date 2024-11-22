class PersonService {
  constructor(PersonRepository) {
    this.repo = PersonRepository;
  }

  async CreatePerson(person) {
    await this.repo.CreatePerson(person);
  }

  async GetPersonById(id) {
    return await this.repo.GetPersonById(id);
  }
  async SearchPeople(term) {
    return await this.repo.SearchPeople(term);
  }
  async GetPersonsCount() {
    return await this.repo.GetPersonsCount();
  }
}

export default PersonService;
