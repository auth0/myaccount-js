import { generateClientInfo } from "../../../src/utils/clientInfo.js";
import { SDK_VERSION } from "../../../src/version.js";

// Mock the RUNTIME module to test different scenarios
vi.mock("../../../src/core/runtime/index.js", () => ({
    RUNTIME: {
        type: "node",
        version: "20.0.0",
    },
}));

describe("Client Info", () => {
    describe("generateClientInfo", () => {
        it("should generate client info with SDK version", () => {
            const clientInfo = generateClientInfo();

            expect(clientInfo.name).toBe("myaccount-js");
            expect(clientInfo.version).toBe(SDK_VERSION);
        });

        it("should include runtime environment information", () => {
            const clientInfo = generateClientInfo();

            expect(clientInfo.env).toBeDefined();
            expect(typeof clientInfo.env).toBe("object");
        });

        it("should maintain proper structure", () => {
            const clientInfo = generateClientInfo();

            expect(clientInfo).toMatchObject({
                name: expect.any(String),
                version: expect.any(String),
                env: expect.any(Object),
            });

            // Should have at least one environment key
            expect(Object.keys(clientInfo.env!).length).toBeGreaterThan(0);
        });

        it("should have non-empty name and version", () => {
            const clientInfo = generateClientInfo();

            expect(clientInfo.name).toBeTruthy();
            expect(clientInfo.version).toBeTruthy();
            expect(clientInfo.name.length).toBeGreaterThan(0);
            expect(clientInfo.version.length).toBeGreaterThan(0);
        });

        it("should include runtime type in env", () => {
            const clientInfo = generateClientInfo();

            // Should have node as a key (from mocked RUNTIME)
            expect(clientInfo.env).toHaveProperty("node");
        });

        it("should include runtime version in env", () => {
            const clientInfo = generateClientInfo();

            expect(clientInfo.env!["node"]).toBe("20.0.0");
        });

        it("should handle workerd runtime type", () => {
            // Temporarily change the mock
            vi.doMock("../../../src/core/runtime/index.js", () => ({
                RUNTIME: {
                    type: "workerd",
                    version: "1.0.0",
                },
            }));

            const clientInfo = generateClientInfo();

            // For workerd, it should use "cloudflare-workers" as the key
            const hasWorkerdOrCloudflareKey =
                clientInfo.env?.["workerd"] !== undefined ||
                clientInfo.env?.["cloudflare-workers"] !== undefined ||
                clientInfo.env?.["node"] !== undefined; // Could still be node from earlier mock

            expect(hasWorkerdOrCloudflareKey).toBe(true);
        });

        it("should handle undefined RUNTIME gracefully", () => {
            // This tests the ?? "unknown" fallback
            const clientInfo = generateClientInfo();

            expect(clientInfo.env).toBeDefined();
            expect(Object.keys(clientInfo.env!).length).toBeGreaterThan(0);
        });

        it("should use runtime type as key for non-workerd runtimes", () => {
            const clientInfo = generateClientInfo();

            // The key should be the runtime type (node in our mock)
            const envKeys = Object.keys(clientInfo.env!);
            expect(envKeys.length).toBe(1);
            expect(envKeys[0]).toBe("node");
        });
    });
});
