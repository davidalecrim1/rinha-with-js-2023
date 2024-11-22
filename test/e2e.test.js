import request from "supertest";
import app from "../src/server";
import { createServer } from "../src/server";

createServer();

describe("make sure api is health for tests", () => {
  it("should return a health check status", async () => {
    const response = await request(app).get("/api/health");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });
});
