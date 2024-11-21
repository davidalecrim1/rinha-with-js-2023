class PersonService {
  constructor(PersonRepository) {
    this.repo = PersonRepository;
  }

  async CreatePerson() {}
  async GetPersonById() {}
  async SearchPersons() {}
  async GetPersonsCount() {}
}

export default PersonService;
