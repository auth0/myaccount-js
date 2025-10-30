import { MyAccountClient } from "../../../src/wrappers/MyAccountClient";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { Auth0FetcherSupplier } from "../../../src/wrappers/index.js";

const server = setupServer();

describe("Auth0Fetcher", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    const mockDpopProvider = {
        getNonce: vi.fn().mockResolvedValue(undefined),
        setNonce: vi.fn().mockResolvedValue(undefined),
        getPrivateKeyPair: vi
            .fn()
            .mockReturnValue(
                crypto.subtle.generateKey({ name: "ECDSA", namedCurve: "P-256" }, false, ["sign", "verify"]),
            ),
    };

    beforeEach(() => {
        mockDpopProvider.getNonce.mockClear();
        mockDpopProvider.setNonce.mockClear();
        mockDpopProvider.getPrivateKeyPair.mockClear();
    });

    it("should allow for a custom fetcher", async () => {
        server.use(
            http.get("https://example.com/me/v1/authentication-methods/auth_method_123", (req) => {
                return HttpResponse.json({
                    id: "auth_method_123",
                    created_at: "2024-01-01T00:00:00.000Z",
                    usage: {
                        first_used_at: "2024-01-01T00:00:00.000Z",
                        last_used_at: "2024-01-15T00:00:00.000Z",
                    },
                });
            }),
        );

        const fetcher: Auth0FetcherSupplier = vi
            .fn()
            .mockImplementation(async (url, init, authParams) => fetch(url, init));

        const myAccountClient = new MyAccountClient({
            fetcher: fetcher,
            domain: "example.com",
        });

        const result = await myAccountClient.authenticationMethods.get("auth_method_123");

        expect(result.id).toBe("auth_method_123");
        expect(result.created_at).toBe("2024-01-01T00:00:00.000Z");
    });

    it("should pass correct authParams to custom fetcher", async () => {
        server.use(
            http.get("https://example.com/me/v1/authentication-methods/auth_method_456", (req) => {
                return HttpResponse.json({
                    id: "auth_method_456",
                    created_at: "2024-01-01T00:00:00.000Z",
                    usage: {
                        first_used_at: "2024-01-01T00:00:00.000Z",
                        last_used_at: "2024-01-15T00:00:00.000Z",
                    },
                });
            }),
        );

        const fetcher: Auth0FetcherSupplier = vi
            .fn()
            .mockImplementation(async (url, init, authParams) => fetch(url, init));

        const myAccountClient = new MyAccountClient({
            fetcher: fetcher,
            domain: "example.com",
        });

        await myAccountClient.authenticationMethods.get("auth_method_456");

        // Verify the fetcher was called with correct authParams
        expect(fetcher).toHaveBeenCalledTimes(1);
        expect(fetcher).toHaveBeenCalledWith(
            "https://example.com/me/v1/authentication-methods/auth_method_456",
            expect.objectContaining({
                method: "GET",
                headers: expect.any(Object),
            }),
            {
                scope: ["read:me:authentication_methods"],
                audience: "https://example.com/me/",
            },
        );
    });
});
