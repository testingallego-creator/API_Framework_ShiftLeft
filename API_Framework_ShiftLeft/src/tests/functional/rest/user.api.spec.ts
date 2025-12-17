import {
  test,
  expect,
  request as pwRequest,
  APIRequestContext
} from "@playwright/test";

let api: APIRequestContext;

test.beforeAll(async () => {
  api = await pwRequest.newContext({
    baseURL: "http://127.0.0.1:4010",
    extraHTTPHeaders: {
      "Content-Type": "application/json"
    }
  });
});

test.afterAll(async () => {
  await api.dispose();
});

test.describe("Customer API - Contract Driven Tests", () => {

  test("Create customer", async () => {
    const res = await api.post("/customers", {
      data: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com"
      }
    });
    expect(res.status()).toBe(201);
  });

  test("Get customer by ID", async () => {
    const res = await api.get("/customers/123");
    expect(res.status()).toBe(200);
  });

  test("Update customer", async () => {
    const res = await api.put("/customers/123", {
      data: { phone: "9999999999" }
    });
    expect(res.status()).toBe(200);
  });

  test("List customers", async () => {
    const res = await api.get("/customers");
    expect(res.status()).toBe(200);
  });

  test("Deactivate customer", async () => {
    const res = await api.delete("/customers/123");
    expect(res.status()).toBe(204);
  });

});
