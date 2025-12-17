import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

const PROTO_PATH = path.resolve(
  "contracts/grpc/user_service.proto"
);

const packageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const proto = grpc.loadPackageDefinition(packageDef) as any;

export const userClient = new proto.user.v1.UserService(
  "127.0.0.1:4030",
  grpc.credentials.createInsecure()
);
