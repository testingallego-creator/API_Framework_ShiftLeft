import { createServer } from "http";
import { readFileSync } from "fs";
import { buildSchema, graphql } from "graphql";
const schemaSDL = readFileSync("contracts/graphql/user.graphql", "utf-8");
const schema = buildSchema(schemaSDL);
// Generic resolver: koi bhi field ho, dummy value de dega
const rootResolver = new Proxy({}, {
    get: () => () => "mock-value"
});
const server = createServer(async (req, res) => {
    if (req.method !== "POST") {
        res.writeHead(404);
        return res.end();
    }
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", async () => {
        const { query, variables } = JSON.parse(body);
        const result = await graphql({
            schema,
            source: query,
            rootValue: rootResolver,
            variableValues: variables
        });
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
    });
});
server.listen(4020, () => {
    console.log("🟢 GraphQL Mock running on http://127.0.0.1:4020");
});
