import { spawn, execSync } from "child_process";
import net from "net";
import path from "path";
import fs from "fs";
const REST_PORT = 4010;
const GRAPHQL_PORT = 4020;
const GRPC_PORT = 4030;
const processes = [];
/* -------------------- UTILITIES -------------------- */
function waitForPort(port, timeout = 15000) {
    return new Promise((resolve, reject) => {
        const start = Date.now();
        const check = () => {
            const socket = new net.Socket();
            socket.setTimeout(1000);
            socket
                .once("connect", () => {
                socket.destroy();
                resolve();
            })
                .once("error", () => {
                socket.destroy();
                if (Date.now() - start > timeout) {
                    reject(new Error(`Port ${port} not ready after ${timeout}ms`));
                }
                else {
                    setTimeout(check, 500);
                }
            })
                .connect(port, "127.0.0.1");
        };
        check();
    });
}
function killPort(port) {
    try {
        execSync(`npx kill-port ${port}`, { stdio: "ignore" });
    }
    catch {
        // ignore
    }
}
function startProcess(cmd, args, name) {
    const p = spawn(cmd, args, { stdio: "inherit", shell: true });
    processes.push(p);
    p.on("error", (err) => {
        console.error(`❌ ${name} failed`, err);
    });
    return p;
}
function cleanup() {
    console.log("🧹 Stopping mock servers...");
    processes.forEach(p => {
        try {
            p.kill("SIGTERM");
        }
        catch { }
    });
}
/* -------------------- MAIN -------------------- */
(async () => {
    process.on("exit", cleanup);
    process.on("SIGINT", () => process.exit(1));
    process.on("SIGTERM", () => process.exit(1));
    try {
        console.log("🧹 Cleaning occupied ports...");
        [REST_PORT, GRAPHQL_PORT, GRPC_PORT].forEach(killPort);
        /* REST */
        console.log("▶️ Starting REST (Prism) mock...");
        startProcess("npx", [
            "prism",
            "mock",
            "contracts/rest/sample-api.yaml",
            "-p",
            REST_PORT.toString()
        ], "Prism");
        /* GraphQL */
        console.log("▶️ Starting GraphQL mock...");
        startProcess("node", [
            path.join("dist", "src", "scripts", "graphql-mock-server.js")
        ], "GraphQL");
        /* gRPC (optional) */
        const grpcProto = "contracts/grpc/user_service.proto";
        if (fs.existsSync(grpcProto)) {
            console.log("▶️ Starting gRPC mock...");
            startProcess("node", [
                path.join("dist", "src", "scripts", "grpc-mock-server.js")
            ], "gRPC");
        }
        else {
            console.warn("⚠️ gRPC proto not found, skipping gRPC mock");
        }
        console.log("▶️ Waiting for mock servers...");
        await Promise.all([
            waitForPort(REST_PORT),
            waitForPort(GRAPHQL_PORT)
        ]);
        console.log("▶️ Running Playwright tests...");
        const pw = startProcess("npx", ["playwright", "test"], "Playwright");
        await new Promise((resolve, reject) => {
            pw.on("exit", code => {
                code === 0 ? resolve() : reject(new Error(`Playwright exited with ${code}`));
            });
        });
        console.log("✅ Tests completed successfully");
        process.exit(0);
    }
    catch (err) {
        console.error("❌ Test execution failed");
        console.error(err);
        process.exit(1);
    }
})();
