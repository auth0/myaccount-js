import { Auth0ClientTelemetry } from "../../../src/utils/auth0ClientTelemetry.js";
import { generateClientInfo } from "../../../src/utils/clientInfo.js";

// Mock the clientInfo module
vi.mock("../../../src/utils/clientInfo.js");
const mockGenerateClientInfo = vi.mocked(generateClientInfo);

/**
 * Helper function to decode base64url encoded strings used in tests
 * @param encodedString - The base64url encoded string
 * @returns The decoded JSON object
 */
function decodeBase64UrlJson(encodedString: string): any {
    return JSON.parse(atob(encodedString.replace(/-/g, "+").replace(/_/g, "/")));
}

describe("Auth0ClientTelemetry", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("constructor", () => {
        it("should use provided client info", () => {
            const customClientInfo = { name: "my-app", version: "1.0.0" };

            const telemetry = new Auth0ClientTelemetry({
                clientInfo: customClientInfo,
            });

            expect(mockGenerateClientInfo).not.toHaveBeenCalled();
            expect(telemetry).toBeDefined();
        });

        it("should generate default client info when none provided", () => {
            const defaultClientInfo = { name: "node-auth0-myaccount", version: "0.0.309" };
            mockGenerateClientInfo.mockReturnValue(defaultClientInfo);

            const telemetry = new Auth0ClientTelemetry({});

            expect(mockGenerateClientInfo).toHaveBeenCalled();

            const header = telemetry.getAuth0ClientHeader();
            expect(header).toBeDefined();

            // Decode and verify the header contains the mocked client info
            const decoded = decodeBase64UrlJson(header!);
            expect(decoded.name).toBe("node-auth0-myaccount");
            expect(decoded.version).toBe("0.0.309");
        });
    });

    describe("getAuth0ClientHeader", () => {
        it("should generate base64url encoded header", () => {
            const clientInfo = { name: "my-app", version: "1.0.0" };

            const telemetry = new Auth0ClientTelemetry({
                clientInfo,
            });

            const header = telemetry.getAuth0ClientHeader();

            expect(header).toBeDefined();
            expect(typeof header).toBe("string");

            // Verify it's base64url encoded by decoding
            const decoded = decodeBase64UrlJson(header!);
            expect(decoded.name).toBe("my-app");
            expect(decoded.version).toBe("1.0.0");
        });

        it("should return undefined for empty client name", () => {
            const clientInfo = { name: "", version: "1.0.0" };

            const telemetry = new Auth0ClientTelemetry({
                clientInfo,
            });

            const header = telemetry.getAuth0ClientHeader();

            expect(header).toBeUndefined();
        });

        it("should return undefined for non-string client name", () => {
            const clientInfo = { name: 123, version: "1.0.0" } as any;

            const telemetry = new Auth0ClientTelemetry({
                clientInfo,
            });

            const header = telemetry.getAuth0ClientHeader();

            expect(header).toBeUndefined();
        });
    });

    describe("getHeaders", () => {
        it("should merge telemetry header with existing headers", () => {
            const clientInfo = { name: "my-app", version: "1.0.0" };
            const existingHeaders = { "Custom-Header": "value", Authorization: "Bearer token" };

            const telemetry = new Auth0ClientTelemetry({
                clientInfo,
            });

            const headers = telemetry.getHeaders(existingHeaders);

            expect(headers["Custom-Header"]).toBe("value");
            expect(headers["Authorization"]).toBe("Bearer token");
            expect(headers["Auth0-Client"]).toBeDefined();
        });

        it("should work with empty existing headers", () => {
            const clientInfo = { name: "my-app", version: "1.0.0" };

            const telemetry = new Auth0ClientTelemetry({
                clientInfo,
            });

            const headers = telemetry.getHeaders({});

            expect(headers["Auth0-Client"]).toBeDefined();
            expect(Object.keys(headers)).toHaveLength(1);
        });

        it("should not add Auth0-Client header when telemetry header is undefined", () => {
            const clientInfo = { name: "", version: "1.0.0" };
            const existingHeaders = { "Custom-Header": "value" };

            const telemetry = new Auth0ClientTelemetry({
                clientInfo,
            });

            const headers = telemetry.getHeaders(existingHeaders);

            expect(headers["Custom-Header"]).toBe("value");
            expect(headers["Auth0-Client"]).toBeUndefined();
            expect(Object.keys(headers)).toHaveLength(1);
        });
    });
});
