import { request } from "express";
import supertest from "supertest";
import app from "../app.js";
const req = supertest(app);
describe("POST /weather", () => {
  describe("Given a city name", () => {
    test("should respond with a 200 status code", async () => {
      const response = await req.post("/weather").send({
        cityName: "Amsterdam",
      });
      expect(response.statusCode).toBe(200);
    });
    test("Should respond with a weather result", async () => {
      const response = await req.post("/weather").send({
        cityName: "Amsterdam",
      });
      expect(response.body.weatherText).toBeDefined();
    });
    test("should specify json in the content type header", async () => {
      const response = await req.post("/weather").send({
        cityName: "Amsterdam",
      });
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
  });
  describe("When the city name is missing", () => {
    test("should respond with 400 status code", async () => {
      const response = await req.post("/weather").send({ cityName: "" });
      expect(response.statusCode).toBe(400);
    });
  });
  describe("When the city name is wrong", () => {
    test("should respond with 400 status code", async () => {
      const response = await req
        .post("/weather")
        .send({ cityName: "Invalid name" });
      expect(response.statusCode).toBe(400);
    });
  });
});
