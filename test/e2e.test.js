import request from "supertest";
import app from "../src/server";
import { createServer, closeServer } from "../src/server";
import db from "../src/infra/database.js";
import { describe, expect, it, afterAll, afterEach } from "@jest/globals";

createServer();

describe("make sure api is health for tests", () => {
  it("should return a health check status", async () => {
    const response = await request(app).get("/api/health");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });
});

describe("create a new person", () => {
  afterEach(async () => {
    await db.query("DELETE FROM people");
  });

  it("should create a valid person", async () => {
    const reqBody = {
      apelido: "alice",
      nome: "Alice Foster",
      nascimento: "2000-01-01",
      stack: ["Python", "Go"],
    };

    const response = await request(app).post("/pessoas").send(reqBody);
    expect(response.statusCode).toBe(201);
  });

  it("should not create a person with invalid name", async () => {
    const reqBody = {
      apelido: "Alice",
      nome: null,
      nascimento: "2000-01-01",
      stack: ["Python", "Go"],
    };

    const response = await request(app).post("/pessoas").send(reqBody);
    expect(response.statusCode).toBe(422);
  });

  it("should not create a person with invalid type in name", async () => {
    const reqBody = {
      apelido: "Alice",
      nome: 1,
      nascimento: "2000-01-01",
      stack: ["Python", "Go"],
    };

    const response = await request(app).post("/pessoas").send(reqBody);
    expect(response.statusCode).toBe(400);
  });

  it("should not create a person with invalid type in stack", async () => {
    const reqBody = {
      apelido: "Alice",
      nome: 1,
      nascimento: "2000-01-01",
      stack: [1, "Go"],
    };

    const response = await request(app).post("/pessoas").send(reqBody);
    expect(response.statusCode).toBe(400);
  });

  it("should not create a person with invalid dob", async () => {
    const reqBody = {
      apelido: "Alice",
      nome: "Alice Foster",
      nascimento: null,
      stack: ["Python", "Go"],
    };

    const response = await request(app).post("/pessoas").send(reqBody);
    expect(response.statusCode).toBe(422);
  });
  it("should not create a person with invalid stack", async () => {
    const reqBody = {
      apelido: "Alice",
      nome: "Alice Foster",
      nascimento: "2000-01-01",
      stack: [1, "Go"],
    };

    const response = await request(app).post("/pessoas").send(reqBody);
    expect(response.statusCode).toBe(400);
  });
  it("should create a person without stack (empty)", async () => {
    const reqBody = {
      apelido: "Alice",
      nome: "Alice Foster",
      nascimento: "2000-01-01",
      stack: [],
    };

    const response = await request(app).post("/pessoas").send(reqBody);
    expect(response.statusCode).toBe(201);
  });
  it("should create a person without stack (null)", async () => {
    const reqBody = {
      apelido: "Alice",
      nome: "Alice Foster",
      nascimento: "2000-01-01",
      stack: null,
    };

    const response = await request(app).post("/pessoas").send(reqBody);
    expect(response.statusCode).toBe(201);
  });
  it("should not create the valid person twice", async () => {
    const reqBody = {
      apelido: "Alice",
      nome: "Alice Foster",
      nascimento: "2000-01-01",
      stack: ["Python", "Go"],
    };

    const response = await request(app).post("/pessoas").send(reqBody);
    expect(response.statusCode).toBe(201);

    const response2 = await request(app).post("/pessoas").send(reqBody);
    expect(response2.statusCode).toBe(422);
  });
  it("should not use a taken nickname", async () => {
    let takenNickname = "bob";

    const reqBody = [
      {
        apelido: takenNickname,
        nome: "Robert Foster",
        nascimento: "2000-01-01",
        stack: ["Python"],
      },
      {
        apelido: takenNickname,
        nome: "Robert Martin",
        nascimento: "1999-01-01",
        stack: ["Java"],
      },
    ];

    const response = await request(app).post("/pessoas").send(reqBody[0]);
    expect(response.statusCode).toBe(201);

    const response2 = await request(app).post("/pessoas").send(reqBody[1]);
    expect(response2.statusCode).toBe(422);
  });
  it("should not create a person with too long nickname (> 32 chars)", async () => {
    const reqBody = {
      apelido: "ThisIsTooooooooooooooooooooooLong",
      nome: "Alice",
      nascimento: "2000-01-01",
      stack: ["Python", "Go"],
    };

    const response = await request(app).post("/pessoas").send(reqBody);
    expect(response.statusCode).toBe(422);
  });
  it("should not have an invalid date", async () => {
    const reqBody = {
      apelido: "alice",
      nome: "Alice",
      nascimento: "20000101",
      stack: ["Python", "Go"],
    };

    const response = await request(app).post("/pessoas").send(reqBody);
    expect(response.statusCode).toBe(400);
  });
});

describe("from the created people", () => {
  beforeAll(async () => {
    const reqBody = [
      {
        apelido: "mike",
        nome: "Michael Shur",
        nascimento: "2020-01-01",
        stack: ["Python", "Java", "Go"],
      },
      {
        apelido: "alice",
        nome: "Alice Foster",
        nascimento: "2020-01-01",
        stack: ["C#", "Go"],
      },
    ];

    for (const person of reqBody) {
      let response = await request(app).post("/pessoas").send(person);
      expect(response.statusCode).toBe(201);
    }
  });

  it("should get people", async () => {
    const resCount = await request(app).get("/contagem-pessoas");
    expect(resCount.statusCode).toBe(200);
    expect(resCount.body).toEqual(2);
  });

  it("should get people by the id", async () => {
    const result = await db.query("SELECT id FROM people");
    for (const row of result.rows) {
      const res = await request(app).get(`/pessoas/${row.id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("apelido");
      expect(res.body).toHaveProperty("nome");
      expect(res.body).toHaveProperty("nascimento");
      expect(res.body).toHaveProperty("stack");
    }
  });
  it("should search people by different terms", async () => {
    const testCases = [
      { term: "go", expectedLength: 2 },
      { term: "mike", expectedLength: 1 },
      { term: "nonexistent", expectedLength: 0 },
    ];

    for (const { term, expectedLength } of testCases) {
      const res = await request(app).get(`/pessoas?t=${term}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveLength(expectedLength);
    }
  });
  it("should not search people by invalid term", async () => {
    const res = await request(app).get("/pessoas?t=");
    expect(res.statusCode).toBe(400);
  });
});

afterAll(async () => {
  await db.query("DELETE FROM people");
  await closeServer();
  await db.end();
});
