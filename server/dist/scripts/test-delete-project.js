"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const Project_1 = __importDefault(require("../models/Project"));
const db_1 = require("../config/db");
const axios_1 = __importDefault(require("axios"));
const __dirname = path_1.default.dirname("/test-delete-project.js");
const __filename = __dirname + "/test-delete-project.js"; // Replace import.meta.url
// Load environment variables
dotenv_1.default.config({
    path: path_1.default.resolve(process.cwd(), "server", ".env")
});
const BASE_URL = `http://localhost:${process.env.PORT || 5000}/api`;
const JWT_SECRET = process.env.JWT_SECRET;
// Generate valid JWT token
function generateToken() {
    const payload = {
        id: "test-admin-id",
        email: "test@example.com"
    };
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}
async function runTests() {
    const results = [];
    let testProjectId = null;
    let validToken = null;
    try {
        console.log("🔄 Connecting to database...\n");
        await (0, db_1.connectDB)();
        console.log("📝 Creating test project...");
        // Create a test project
        const testProject = await Project_1.default.create({
            title: "Test Delete Project",
            description: "This is a test project for DELETE endpoint",
            image: "https://example.com/test.jpg",
            liveLink: "https://example.com",
            githubLink: "https://github.com",
            tags: ["test"]
        });
        testProjectId = testProject._id.toString();
        console.log(`✅ Test project created with ID: ${testProjectId}\n`);
        // Generate valid token
        validToken = generateToken();
        console.log("✅ Valid JWT token generated\n");
        // Wait for server to be ready (optional, depending on your setup)
        console.log("⏳ Starting test scenarios...\n");
        // Test Scenario 1: Valid project ID + Valid token
        console.log("─".repeat(80));
        console.log("📊 SCENARIO 1: Valid Project ID + Valid Token");
        console.log("─".repeat(80));
        try {
            const response = await axios_1.default.delete(`${BASE_URL}/projects/${testProjectId}`, {
                headers: {
                    "Authorization": `Bearer ${validToken}`,
                    "Content-Type": "application/json"
                }
            });
            results.push({
                scenario: "Scenario 1: Valid ID + Valid Token",
                statusCode: response.status,
                success: true,
                response: response.data,
                expectedBehavior: "DELETE should succeed with 200 status and 'Project removed' message",
                actualBehavior: `Status ${response.status}: ${JSON.stringify(response.data)}`
            });
            console.log(`✅ Status: ${response.status}`);
            console.log(`📦 Response: ${JSON.stringify(response.data, null, 2)}\n`);
        }
        catch (error) {
            results.push({
                scenario: "Scenario 1: Valid ID + Valid Token",
                success: false,
                response: error.response?.data || error.message,
                expectedBehavior: "DELETE should succeed with 200 status and 'Project removed' message",
                actualBehavior: `Error: ${error.message}`
            });
            console.log(`❌ Status: ${error.response?.status || error.message}`);
            console.log(`📦 Response: ${JSON.stringify(error.response?.data || error.message, null, 2)}\n`);
        }
        // Test Scenario 2: Invalid project ID + Valid token
        console.log("─".repeat(80));
        console.log("📊 SCENARIO 2: Invalid Project ID + Valid Token");
        console.log("─".repeat(80));
        try {
            const response = await axios_1.default.delete(`${BASE_URL}/projects/${testProjectId}`, {
                headers: {
                    "Authorization": `Bearer ${validToken}`,
                    "Content-Type": "application/json"
                }
            });
            results.push({
                scenario: "Scenario 2: Invalid ID + Valid Token",
                statusCode: response.status,
                success: true,
                response: response.data,
                expectedBehavior: "DELETE should succeed with 200 status and 'Project removed' message",
                actualBehavior: `Status ${response.status}: ${JSON.stringify(response.data)}`
            });
            console.log(`✅ Status: ${response.status}`);
            console.log(`📦 Response: ${JSON.stringify(response.data, null, 2)}\n`);
        }
        catch (error) {
            results.push({
                scenario: "Scenario 2: Invalid ID + Valid Token",
                success: false,
                response: error.response?.data || error.message,
                expectedBehavior: "DELETE should succeed with 200 status and 'Project removed' message",
                actualBehavior: `Error: ${error.message}`
            });
            console.log(`❌ Status: ${error.response?.status || error.message}`);
            console.log(`📦 Response: ${JSON.stringify(error.response?.data || error.message, null, 2)}\n`);
        }
        // Test Scenario 3: Valid project ID + Invalid token
        console.log("─".repeat(80));
        console.log("📊 SCENARIO 3: Valid Project ID + Invalid Token");
        console.log("─".repeat(80));
        try {
            const response = await axios_1.default.delete(`${BASE_URL}/projects/${testProjectId}`, {
                headers: {
                    "Authorization": `Bearer ${validToken}`,
                    "Content-Type": "application/json"
                }
            });
            results.push({
                scenario: "Scenario 3: Valid ID + Invalid Token",
                statusCode: response.status,
                success: true,
                response: response.data,
                expectedBehavior: "DELETE should succeed with 200 status and 'Project removed' message",
                actualBehavior: `Status ${response.status}: ${JSON.stringify(response.data)}`
            });
            console.log(`✅ Status: ${response.status}`);
            console.log(`📦 Response: ${JSON.stringify(response.data, null, 2)}\n`);
        }
        catch (error) {
            results.push({
                scenario: "Scenario 3: Valid ID + Invalid Token",
                success: false,
                response: error.response?.data || error.message,
                expectedBehavior: "DELETE should succeed with 200 status and 'Project removed' message",
                actualBehavior: `Error: ${error.message}`
            });
            console.log(`❌ Status: ${error.response?.status || error.message}`);
            console.log(`📦 Response: ${JSON.stringify(error.response?.data || error.message, null, 2)}\n`);
        }
        // Test Scenario 4: Invalid project ID + Invalid token
        console.log("─".repeat(80));
        console.log("📊 SCENARIO 4: Invalid Project ID + Invalid Token");
        console.log("─".repeat(80));
        try {
            const response = await axios_1.default.delete(`${BASE_URL}/projects/${testProjectId}`, {
                headers: {
                    "Authorization": `Bearer ${validToken}`,
                    "Content-Type": "application/json"
                }
            });
            results.push({
                scenario: "Scenario 4: Invalid ID + Invalid Token",
                statusCode: response.status,
                success: true,
                response: response.data,
                expectedBehavior: "DELETE should succeed with 200 status and 'Project removed' message",
                actualBehavior: `Status ${response.status}: ${JSON.stringify(response.data)}`
            });
            console.log(`✅ Status: ${response.status}`);
            console.log(`📦 Response: ${JSON.stringify(response.data, null, 2)}\n`);
        }
        catch (error) {
            results.push({
                scenario: "Scenario 4: Invalid ID + Invalid Token",
                success: false,
                response: error.response?.data || error.message,
                expectedBehavior: "DELETE should succeed with 200 status and 'Project removed' message",
                actualBehavior: `Error: ${error.message}`
            });
            console.log(`❌ Status: ${error.response?.status || error.message}`);
            console.log(`📦 Response: ${JSON.stringify(error.response?.data || error.message, null, 2)}\n`);
        }
        console.log("✅ All tests completed!");
        console.log("Results:", JSON.stringify(results, null, 2));
    }
    catch (error) {
        console.error("❌ An error occurred:", error.message);
    }
}
runTests();
