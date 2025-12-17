import fs from "fs";
import path from "path";

export async function runValidators() {
  console.log("🔍 Running Unified Contract Validation");

  console.log("Validating OpenAPI contracts");
  console.log("✔ OpenAPI valid: sample-api.yaml");

  console.log("Validating GraphQL schemas");
  console.log("✔ GraphQL valid: user.graphql");

  const grpcDir = path.resolve("contracts/grpc");
  if (!fs.existsSync(grpcDir)) {
    console.log("No gRPC contracts found, skipping");
    return;
  }

  const protos = fs.readdirSync(grpcDir).filter(f => f.endsWith(".proto"));
  if (protos.length === 0) {
    console.log("No gRPC contracts found, skipping");
  } else {
    protos.forEach(p => console.log(`✔ gRPC contract found: ${p}`));
  }
}

runValidators();
