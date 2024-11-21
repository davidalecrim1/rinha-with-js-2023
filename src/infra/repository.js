import { PersonAlreadyExists } from "../app/errors.js";

class PersonRepository {
  constructor(db) {
    this.db = db;
  }

  async CreatePerson(person) {
    try {
      const query = `
        INSERT INTO people (id, nickname, name, dob, stack) 
        VALUES ($1, $2, $3, $4, $5)`;

      const values = [
        person.id,
        person.nickname,
        person.name,
        person.dob,
        person.stack,
      ];

      await this.db.query(query, values);
    } catch (err) {
      if (err.code === "23505") {
        throw new PersonAlreadyExists();
      } else throw err;
    }
  }

  async GetPersonById() {}
  async SearchPersons() {}
  async GetPersonsCount() {}
}

export default PersonRepository;
