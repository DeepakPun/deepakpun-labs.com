// tests/app.test.js
import { jest } from "@jest/globals"

// 1. Move the mock to the very top and register it natively for ESM
jest.unstable_mockModule("../dbcon/db.js", () => ({
  connectDB: jest.fn().mockResolvedValue(true),
}))

// 2. Use dynamic imports AFTER registering the mock so the mock applies correctly
const { default: app } = await import("../app.js")
const { default: request } = await import("supertest")

describe("GET /", () => {
  it("should return 200 OK and the welcome message", async () => {
    const response = await request(app).get("/").expect("Content-Type", /json/)

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      success: true,
      errors: null,
      message: "Welcome to the Marvel Theory API!",
    })
  })
})
