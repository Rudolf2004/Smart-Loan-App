import { describe, expect, it } from "vitest";
import request from "supertest";
import app from "../app.js";

describe("Loan prediction API", () => {
  it("returns health information", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("healthy");
  });

  it("returns the API root message", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body.message).toContain("Loan Approval Machine Learning API");
  });

  it("rejects invalid prediction payloads", async () => {
    const response = await request(app).post("/api/predict").send({ age: "young" });

    expect(response.status).toBe(400);
  });
});
