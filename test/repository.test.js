import { describe, expect, it, beforeAll, afterAll } from "@jest/globals";
import PersonRepository from "../src/infra/repository.js";
import db from "../src/infra/database.js";
import { PersonAlreadyExists } from "../src/app/errors.js";

describe("create person", () => {
  let repo;

  beforeAll(() => {
    repo = new PersonRepository(db);
  });

  const validPerson = {
    id: "123e4567-e89b-12d3-a456-426614174000",
    nickname: "Alice",
    name: "Alice Foster",
    dob: "2000-01-01",
    stack: ["Python", "Go"],
  };

  it("should save the valid person in the database", async () => {
    await expect(repo.CreatePerson(validPerson)).resolves.not.toThrow();
    const res = await db.query("SELECT * FROM people WHERE id = $1", [
      validPerson.id,
    ]);

    expect(res.rows.length).toBe(1);
  });

  it("should throw an error if the person already exists", async () => {
    const existingPerson = validPerson;
    await expect(repo.CreatePerson(existingPerson)).rejects.toThrow(
      PersonAlreadyExists
    );
  });

  afterAll(async () => {
    await db.query("DELETE FROM people");
    await db.end();
  });
});
