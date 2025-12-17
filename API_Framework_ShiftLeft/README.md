# 🚀 Shift-Left API Testing Framework

A **contract-first, mock-driven, shift-left API testing framework** that validates API contracts, spins up mock servers, runs impacted tests, and generates rich **Allure reports** — all **before code reaches integration or UI layers**.

---

## 🎯 Why This Framework?

Traditional API testing happens **too late** (after backend or UI integration).  
This framework shifts testing **left** by using **API contracts as the single source of truth**.

### Key Benefits
- 🚫 Catch breaking API changes early (PR-level)
- ⚡ Faster feedback with mocked services
- 🧪 Contract-driven tests (REST, GraphQL, gRPC)
- 📊 Rich Allure reporting
- 🔁 Impact-based test execution (future-ready)

---

## 🧠 High-Level Architecture

Contracts (OpenAPI / GraphQL / gRPC)
↓
Contract Validation (Fail Fast)
↓
Mock Servers (Prism / GraphQL / gRPC)
↓
Playwright API Tests
↓
Allure Report

yaml
Copy code

---

## 📁 Folder Structure & Description

API_Framework_ShiftLeft
│
├── contracts/ # API contracts (single source of truth)
│ ├── rest/ # OpenAPI (REST) contracts
│ │ └── sample-api.yaml
│ ├── graphql/ # GraphQL schemas (SDL only)
│ │ └── user.graphql
│ └── grpc/ # gRPC proto files
│ └── user.proto
│
├── src/
│ ├── uce/ # Unified Contract Engine
│ │ └── index.ts # Validates REST, GraphQL, gRPC contracts
│ │
│ ├── scripts/ # Framework orchestration scripts
│ │ ├── run-tests.ts # Starts mocks, waits, runs tests
│ │ ├── build-impact-map.ts # Builds API → test impact mapping
│ │ ├── generate-rest-mocks.ts # Generates MSW mocks (future use)
│ │ ├── graphql-mock-server.ts # Schema-driven GraphQL mock
│ │ └── grpc-mock-server.ts # Proto-driven gRPC mock
│ │
│ └── tests/
│ └── functional/
│ ├── rest/ # REST API tests (Playwright)
│ ├── graphql/ # GraphQL tests
│ └── grpc/ # gRPC tests (future-ready)
│
├── dist/ # Compiled JS output (generated)
│
├── allure-results/ # Allure raw results (generated)
├── allure-report/ # Allure HTML report (generated)
│
├── playwright.config.ts # Playwright + Allure configuration
├── tsconfig.json # TypeScript configuration
├── package.json # Scripts & dependencies
└── README.md # Documentation

markdown
Copy code

---

## ⚙️ Key Components (1–2 Line Explanation)

### 🔹 Contracts
- **REST (OpenAPI)**: Defines endpoints, requests, and responses.
- **GraphQL**: Defines queries, mutations, and types (SDL only).
- **gRPC**: Defines services and messages via proto files.

### 🔹 Unified Contract Engine (UCE)
- Validates all contracts before tests run.
- Fails fast if any contract is invalid.

### 🔹 Mock Servers
- **REST**: Prism spins up mocks from OpenAPI specs.
- **GraphQL**: Schema-driven mock server (no backend required).
- **gRPC**: Proto-driven mock server using `@grpc/grpc-js`.

### 🔹 Playwright API Tests
- Executes REST, GraphQL, and gRPC tests.
- Focuses on **contract compatibility**, not real data.

### 🔹 Allure Reporting
- Generates interactive HTML reports.
- Shows test status, steps, features, and failures.

---

## 🔁 Execution Workflow

1. **Build**
   - Compile TypeScript → JavaScript.

2. **Contract Validation**
   - Validate OpenAPI, GraphQL, and gRPC contracts.
   - Fail immediately on invalid contracts.

3. **Mock Startup**
   - REST → Prism
   - GraphQL → Schema-based mock
   - gRPC → Proto-based mock

4. **Test Execution**
   - Playwright runs API tests against mocks.

5. **Reporting**
   - Allure results generated.
   - HTML report created and opened (local).

---

## ▶️ How to Run

### 🔥 Local Shift-Left Run (One Command)

```bash
npm run shiftleft:local
This will:

Build the project

Validate all contracts

Start all mock servers

Run Playwright tests

Generate Allure report

Open report in browser

🧪 CI / PR Run (No Browser)
bash
Copy code
npm run shiftleft:pr
📊 View Allure Report Manually
bash
Copy code
npm run allure:generate
npm run allure:open
🧩 Prerequisites
Required
Node.js ≥ 18 (Node 20 supported)

npm ≥ 9

Java (JDK 8+) → Required by Allure

Optional (Global Allure CLI)
bash
Copy code
npm install -g allure-commandline
(Not required if using npx)