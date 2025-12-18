import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
const PROTO_PATH = path.resolve("contracts/grpc/user_service.proto");
const packageDef = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const grpcObj = grpc.loadPackageDefinition(packageDef);
/**
 * IMPORTANT:
 * proto package = user.v1
 */
const userService = grpcObj.user?.v1?.UserService;
if (!userService) {
    throw new Error("❌ UserService not found in proto definition");
}
const server = new grpc.Server();
server.addService(userService.service, {
    GetUser: (_call, callback) => {
        callback(null, {
            user: {
                id: "1",
                email: "mock@user.com",
                name: "Mock User",
                status: "ACTIVE",
                created_at: Date.now(),
                updated_at: Date.now()
            }
        });
    },
    CreateUser: (call, callback) => {
        callback(null, {
            user: {
                id: "2",
                email: call.request.email,
                name: call.request.name,
                status: "ACTIVE",
                created_at: Date.now(),
                updated_at: Date.now()
            }
        });
    },
    UpdateUser: (call, callback) => {
        callback(null, {
            user: {
                id: call.request.user_id,
                name: call.request.name,
                status: call.request.status,
                updated_at: Date.now()
            }
        });
    },
    DeleteUser: (_call, callback) => {
        callback(null, { success: true });
    },
    ListUsers: (_call, callback) => {
        callback(null, {
            users: [
                {
                    id: "1",
                    email: "mock@user.com",
                    name: "Mock User",
                    status: "ACTIVE"
                }
            ],
            total: 1
        });
    }
});
server.bindAsync("127.0.0.1:4030", grpc.ServerCredentials.createInsecure(), (err) => {
    if (err)
        throw err;
    console.log("🟢 gRPC Mock running on 127.0.0.1:4030");
    server.start();
});
