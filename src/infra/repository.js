import { PersonAlreadyExists } from "../app/errors.js";
import logger from "./logger.js";

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
        person.stack != null || undefined ? person.stack.join(" | ") : null,
      ];

      await this.db.query(query, values);
    } catch (err) {
      if (err.code === "23505") {
        throw new PersonAlreadyExists();
      } else throw err;
    }
  }

  async GetPersonById(id) {
    try {
      const query = `
      SELECT id, nickname, name, dob, string_to_array(stack, ' | ') as stack 
      FROM people 
      WHERE id = $1`;
      const result = await this.db.query(query, [id]);
      return result.rows[0];
    } catch (err) {
      logger.error(`error in getPersonsCount: ${err}`);
      throw err;
    }
  }

  async SearchPeople(term) {
    try {
      const query = `
      SELECT id, nickname, name, dob, string_to_array(stack, ' | ') as stack 
      FROM people
      WHERE searchable LIKE $1 
      LIMIT 50`;

      const result = await this.db.query(query, [`%${term}%`]);
      return result.rows;
    } catch (err) {
      logger.error(`error in SearchPeople: ${err}`);
      throw err;
    }
  }
  async GetPersonsCount() {
    try {
      const query = `SELECT COUNT(id) FROM people`;
      const result = await this.db.query(query);
      return parseInt(result.rows[0].count);
    } catch (err) {
      logger.error(`error in GetPersonsCount: ${err}`);
      throw err;
    }
  }
}

export default PersonRepository;
