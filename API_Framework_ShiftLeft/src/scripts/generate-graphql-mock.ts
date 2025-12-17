import { readFileSync } from "fs";
import path from "path";
import { createServer } from "http";

import { createYoga } from "graphql-yoga";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { addMocksToSchema } from "@graphql-tools/mock";

// --------------------
// Load schema (contract-driven)
// --------------------
const schemaPath = path.join(
  process.cwd(),
  "contracts/graphql/user.graphql"
);

const typeDefs = readFileSync(schemaPath, "utf-8");

// --------------------
// Build executable schema
// --------------------
const schema = makeExecutableSchema({ typeDefs });

// --------------------
// Auto-generate mocks from schema
// --------------------
const mockedSchema = addMocksToSchema({
  schema,
  mocks: {
    String: () => "mock-string",
    Int: () => 1,
    Float: () => 1.1,
    Boolean: () => true
  },
  preserveResolvers: false
});

// --------------------
// Create Yoga server
// --------------------
const yoga = createYoga({
  schema: mockedSchema,
  graphqlEndpoint: "/graphql"
});

// --------------------
// Start HTTP server
// --------------------
const server = createServer(yoga);

server.listen(4020, () => {
  console.log(
    "🟢 GraphQL Mock running (schema-driven) at http://127.0.0.1:4020/graphql"
  );
});
