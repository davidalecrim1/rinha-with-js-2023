import { Person } from "../app/domain.ts";
import { PersonAlreadyExists } from "../app/errors.ts";
import logger from "./logger.ts";
import { Pool } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

class PersonRepository {
  private db: Pool;

  constructor(db: Pool) {
    this.db = db;
  }

  async CreatePerson(person: Person) {
    const client = await this.db.connect();

    try {
      const query = `
        INSERT INTO people (id, nickname, name, dob, stack) 
        VALUES ($1, $2, $3, $4, $5)`;

      const values = [
        person.id,
        person.nickname,
        person.name,
        person.dob,
        person.stack ? person.stack.join(" | ") : null,
      ];

      await client.queryObject(query, values);
    } catch (err: any) {
      if (err.fields.code === "23505") {
        logger.debug(
          `CreatePerson - Repository - Person Already Exists: ${err}`,
        );
        throw new PersonAlreadyExists();
      } else {
        logger.error(`error in CreatePerson: ${err}`);
        throw err;
      }
    } finally {
      client.release();
    }
  }

  async GetPersonById(id: string) {
    const client = await this.db.connect();

    try {
      const query = `
      SELECT id, nickname, name, dob, string_to_array(stack, ' | ') as stack 
      FROM people 
      WHERE id = $1`;

      const result = await client.queryObject<Person>(query, [id]);
      return result.rows[0];
    } catch (err: any) {
      logger.error(`error in GetPersonById: ${err}`);
      throw err;
    } finally {
      client.release();
    }
  }

  async SearchPeople(term: string) {
    const client = await this.db.connect();
    try {
      const query = `
      SELECT id, nickname, name, dob, string_to_array(stack, ' | ') as stack 
      FROM people
      WHERE searchable LIKE $1 
      LIMIT 50`;

      const result = await client.queryObject<Person>(query, [`%${term}%`]);
      return result.rows;
    } catch (err: any) {
      logger.error(`error in SearchPeople: ${err}`);
      throw err;
    } finally {
      client.release();
    }
  }

  async GetPersonsCount() {
    const client = await this.db.connect();
    try {
      const query = `SELECT COUNT(id) FROM people`;
      const result = await client.queryObject<{ count: string }>(query);
      return parseInt(result.rows[0].count, 10);
    } catch (err: any) {
      logger.error(`error in GetPersonsCount: ${err}`);
      throw err;
    } finally {
      client.release();
    }
  }
}

export default PersonRepository;
