import { test, expect } from "@playwright/test";

const GRAPHQL_URL = "http://127.0.0.1:4020";

test.describe("GraphQL API - Contract Driven Tests", () => {

 test("1. Get all users", async ({ request }) => {
  const response = await request.post(GRAPHQL_URL, {
    data: {
      query: `
        query {
          users {
            id
            name
            email
          }
        }
      `
    }
  });

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.data).toBeDefined();
  expect(body.data.users).toBeDefined();
});


  test("2. Get user by ID", async ({ request }) => {
    const response = await request.post(GRAPHQL_URL, {
      data: {
        query: `
          query GetUser($id: ID) {
            user(id: $id) {
              id
              name
              email
            }
          }
        `,
        variables: {
          id: "123"
        }
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data).toBeDefined();
    expect(body.data.user).toBeDefined();
  });

  test("3. Create user mutation", async ({ request }) => {
    const response = await request.post(GRAPHQL_URL, {
      data: {
        query: `
          mutation CreateUser($name: String, $email: String) {
            createUser(name: $name, email: $email) {
              id
              name
              email
            }
          }
        `,
        variables: {
          name: "John Doe",
          email: "john@example.com"
        }
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data).toBeDefined();
    expect(body.data.createUser).toBeDefined();
  });

});
