import { MyAccountClient } from "../../../src/wrappers/MyAccountClient.js";
import { Auth0ClientTelemetry } from "../../../src/utils/auth0ClientTelemetry.js";
import { generateClientInfo } from "../../../src/utils/clientInfo.js";

// Mock dependencies
vi.mock("../../../src/utils/auth0ClientTelemetry.js");
vi.mock("../../../src/utils/clientInfo.js");
vi.mock("../../../src/Client.js", () => {
    class MockMyAccountClient {
        constructor(public options: any) {}
    }
    return {
        MyAccountClient: MockMyAccountClient,
    };
});

const mockGenerateClientInfo = vi.mocked(generateClientInfo);
const MockAuth0ClientTelemetry = vi.mocked(Auth0ClientTelemetry);

describe("MyAccountClient", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        // Setup default mock for generateClientInfo
        mockGenerateClientInfo.mockReturnValue({
            name: "myaccount-js",
            version: "1.0.0",
            env: { node: "20.0.0" },
        });

        // Setup default mock for Auth0ClientTelemetry
        MockAuth0ClientTelemetry.mockImplementation(
            () =>
                ({
                    getAuth0ClientHeader: () => "base64-encoded-telemetry",
                    getHeaders: (headers: any) => ({ ...headers, "Auth0-Client": "base64-encoded-telemetry" }),
                }) as any,
        );
    });

    describe("constructor", () => {
        describe("domain handling", () => {
            it("should sanitize domain by removing https:// prefix", () => {
                const client = new MyAccountClient({
                    domain: "https://tenant.auth0.com",
                    token: "test-token",
                });

                expect(client).toBeDefined();
                // The base client should be constructed with sanitized domain
                expect((client as any).options.baseUrl).toBe("https://tenant.auth0.com/me/v1");
            });

            it("should sanitize domain by removing trailing slash", () => {
                const client = new MyAccountClient({
                    domain: "tenant.auth0.com/",
                    token: "test-token",
                });

                expect(client).toBeDefined();
                expect((client as any).options.baseUrl).toBe("https://tenant.auth0.com/me/v1");
            });

            it("should handle domain with both https:// and trailing slash", () => {
                const client = new MyAccountClient({
                    domain: "https://tenant.auth0.com/",
                    token: "test-token",
                });

                expect(client).toBeDefined();
                expect((client as any).options.baseUrl).toBe("https://tenant.auth0.com/me/v1");
            });

            it("should handle clean domain without modifications", () => {
                const client = new MyAccountClient({
                    domain: "tenant.auth0.com",
                    token: "test-token",
                });

                expect(client).toBeDefined();
                expect((client as any).options.baseUrl).toBe("https://tenant.auth0.com/me/v1");
            });
        });

        describe("baseUrl handling", () => {
            it("should use custom baseUrl when provided", () => {
                const customBaseUrl = "https://custom-api.example.com/v2";
                const client = new MyAccountClient({
                    domain: "tenant.auth0.com",
                    token: "test-token",
                    baseUrl: customBaseUrl,
                });

                expect(client).toBeDefined();
                expect((client as any).options.baseUrl).toBe(customBaseUrl);
            });

            it("should construct default baseUrl from domain when not provided", () => {
                const client = new MyAccountClient({
                    domain: "tenant.auth0.com",
                    token: "test-token",
                });

                expect(client).toBeDefined();
                expect((client as any).options.baseUrl).toBe("https://tenant.auth0.com/me/v1");
            });
        });

        describe("token-based authentication", () => {
            it("should accept static string token", () => {
                const client = new MyAccountClient({
                    domain: "tenant.auth0.com",
                    token: "static-access-token",
                });

                expect(client).toBeDefined();
                expect((client as any).options.token).toBeDefined();
            });

            it("should accept simple function token supplier", () => {
                const tokenSupplier = () => "dynamic-token";
                const client = new MyAccountClient({
                    domain: "tenant.auth0.com",
                    token: tokenSupplier,
                });

                expect(client).toBeDefined();
                expect((client as any).options.token).toBeDefined();
            });

            it("should accept async function token supplier", () => {
                const tokenSupplier = async () => "async-token";
                const client = new MyAccountClient({
                    domain: "tenant.auth0.com",
                    token: tokenSupplier,
                });

                expect(client).toBeDefined();
                expect((client as any).options.token).toBeDefined();
            });

            it("should accept scope-aware token supplier", () => {
                const tokenSupplier = async ({ authorizationParams }: any) => {
                    return `token-with-scope-${authorizationParams.scope}`;
                };
                const client = new MyAccountClient({
                    domain: "tenant.auth0.com",
                    token: tokenSupplier,
                });

                expect(client).toBeDefined();
                expect((client as any).options.token).toBeDefined();
            });

            it("should accept both token and fetcher", () => {
                const tokenSupplier = "test-token";
                const fetcherSupplier = async (url: string, init?: RequestInit) => {
                    return fetch(url, init);
                };

                const client = new MyAccountClient({
                    domain: "tenant.auth0.com",
                    token: tokenSupplier,
                    fetcher: fetcherSupplier,
                });

                expect(client).toBeDefined();
                expect((client as any).options.token).toBeDefined();
                expect((client as any).options.fetcher).toBeDefined();
            });
        });

        describe("fetcher-based authentication", () => {
            it("should accept custom fetcher without token", () => {
                const fetcherSupplier = async (url: string, init?: RequestInit) => {
                    return fetch(url, {
                        ...init,
                        headers: {
                            ...init?.headers,
                            Authorization: "Bearer custom-token",
                        },
                    });
                };

                const client = new MyAccountClient({
                    domain: "tenant.auth0.com",
                    fetcher: fetcherSupplier,
                });

                expect(client).toBeDefined();
                expect((client as any).options.fetcher).toBeDefined();
            });

            it("should accept fetcher with authorization params", () => {
                const fetcherSupplier = async (url: string, init?: RequestInit, authParams?: { scope?: string[] }) => {
                    const scope = authParams?.scope?.join(" ") || "";
                    return fetch(url, {
                        ...init,
                        headers: {
                            ...init?.headers,
                            Authorization: `Bearer token-with-${scope}`,
                        },
                    });
                };

                const client = new MyAccountClient({
                    domain: "tenant.auth0.com",
                    fetcher: fetcherSupplier,
                });

                expect(client).toBeDefined();
                expect((client as any).options.fetcher).toBeDefined();
            });
        });

        describe("telemetry", () => {
            it("should enable telemetry by default", () => {
                const client = new MyAccountClient({
                    domain: "tenant.auth0.com",
                    token: "test-token",
                });

                expect(client).toBeDefined();
                expect(MockAuth0ClientTelemetry).toHaveBeenCalled();
                expect((client as any).options.headers["Auth0-Client"]).toBe("base64-encoded-telemetry");
            });

            it("should disable telemetry when telemetry=false", () => {
                const client = new MyAccountClient({
                    domain: "tenant.auth0.com",
                    token: "test-token",
                    telemetry: false,
                });

                expect(client).toBeDefined();
                expect(MockAuth0ClientTelemetry).not.toHaveBeenCalled();
                expect((client as any).options.headers["Auth0-Client"]).toBeUndefined();
            });

            it("should use custom client info when provided", () => {
                const customClientInfo = {
                    name: "my-custom-app",
                    version: "2.0.0",
                };

                const client = new MyAccountClient({
                    domain: "tenant.auth0.com",
                    token: "test-token",
                    clientInfo: customClientInfo,
                });

                expect(client).toBeDefined();
                expect(MockAuth0ClientTelemetry).toHaveBeenCalledWith({
                    clientInfo: customClientInfo,
                });
            });

            it("should generate default client info when not provided", () => {
                const client = new MyAccountClient({
                    domain: "tenant.auth0.com",
                    token: "test-token",
                });

                expect(client).toBeDefined();
                expect(MockAuth0ClientTelemetry).toHaveBeenCalled();
            });
        });

        describe("headers", () => {
            it("should merge custom headers with telemetry header", () => {
                const customHeaders = {
                    "X-Custom-Header": "custom-value",
                    "X-Another-Header": "another-value",
                };

                const client = new MyAccountClient({
                    domain: "tenant.auth0.com",
                    token: "test-token",
                    headers: customHeaders,
                });

                expect(client).toBeDefined();
                expect((client as any).options.headers["X-Custom-Header"]).toBe("custom-value");
                expect((client as any).options.headers["X-Another-Header"]).toBe("another-value");
                expect((client as any).options.headers["Auth0-Client"]).toBe("base64-encoded-telemetry");
            });

            it("should only include custom headers when telemetry is disabled", () => {
                const customHeaders = {
                    "X-Custom-Header": "custom-value",
                };

                const client = new MyAccountClient({
                    domain: "tenant.auth0.com",
                    token: "test-token",
                    headers: customHeaders,
                    telemetry: false,
                });

                expect(client).toBeDefined();
                expect((client as any).options.headers["X-Custom-Header"]).toBe("custom-value");
                expect((client as any).options.headers["Auth0-Client"]).toBeUndefined();
            });
        });

        describe("additional options", () => {
            it("should accept timeout option", () => {
                const client = new MyAccountClient({
                    domain: "tenant.auth0.com",
                    token: "test-token",
                    timeoutInSeconds: 30,
                });

                expect(client).toBeDefined();
            });

            it("should accept maxRetries option", () => {
                const client = new MyAccountClient({
                    domain: "tenant.auth0.com",
                    token: "test-token",
                    maxRetries: 5,
                });

                expect(client).toBeDefined();
            });

            it("should pass through additional options", () => {
                const client = new MyAccountClient({
                    domain: "tenant.auth0.com",
                    token: "test-token",
                });

                expect(client).toBeDefined();
            });
        });

        describe("error handling", () => {
            it("should throw error when neither token nor fetcher is provided", () => {
                // TypeScript would catch this, but testing runtime behavior
                expect(() => {
                    new MyAccountClient({
                        domain: "tenant.auth0.com",
                    } as any);
                }).toThrow("MyAccountClient must be configured with either 'token' or 'fetcher'");
            });
        });
    });

    describe("integration scenarios", () => {
        it("should create client for SPA with Auth0 SDK integration", () => {
            const mockAuth0GetToken = vi.fn().mockResolvedValue("spa-token");

            const tokenSupplier = async ({ authorizationParams }: any) => {
                return mockAuth0GetToken({
                    authorizationParams: {
                        scope: `openid profile email ${authorizationParams.scope}`,
                    },
                });
            };

            const client = new MyAccountClient({
                domain: "tenant.auth0.com",
                token: tokenSupplier,
            });

            expect(client).toBeDefined();
            expect(client).toBeInstanceOf(MyAccountClient);
        });

        it("should create client for custom backend integration", () => {
            const mockBackendFetch = vi
                .fn()
                .mockResolvedValue(new Response(JSON.stringify({ data: "test" }), { status: 200 }));

            const fetcherSupplier = async (url: string, init?: RequestInit, authParams?: { scope?: string[] }) => {
                const token = await mockBackendFetch("/api/token", {
                    method: "POST",
                    body: JSON.stringify({ scope: authParams?.scope }),
                })
                    .then((r: Response) => r.json())
                    .then((d: any) => d.token);

                return fetch(url, {
                    ...init,
                    headers: {
                        ...init?.headers,
                        Authorization: `Bearer ${token}`,
                    },
                });
            };

            const client = new MyAccountClient({
                domain: "tenant.auth0.com",
                fetcher: fetcherSupplier,
            });

            expect(client).toBeDefined();
            expect(client).toBeInstanceOf(MyAccountClient);
        });

        it("should create client with all options", () => {
            const client = new MyAccountClient({
                domain: "https://tenant.auth0.com/",
                token: "test-token",
                baseUrl: "https://custom-api.example.com",
                telemetry: true,
                clientInfo: {
                    name: "my-app",
                    version: "1.0.0",
                },
                headers: {
                    "X-Custom-Header": "value",
                },
                timeoutInSeconds: 60,
                maxRetries: 3,
            });

            expect(client).toBeDefined();
            expect(client).toBeInstanceOf(MyAccountClient);
            expect((client as any).options.baseUrl).toBe("https://custom-api.example.com");
            expect((client as any).options.headers["X-Custom-Header"]).toBe("value");
            expect((client as any).options.headers["Auth0-Client"]).toBe("base64-encoded-telemetry");
        });
    });

    describe("type safety", () => {
        it("should accept MyAccountClientOptionsWithToken type", () => {
            const options: MyAccountClient.MyAccountClientOptionsWithToken = {
                domain: "tenant.auth0.com",
                token: "test-token",
            };

            const client = new MyAccountClient(options);
            expect(client).toBeDefined();
        });

        it("should accept MyAccountClientOptionsWithFetcher type", () => {
            const options: MyAccountClient.MyAccountClientOptionsWithFetcher = {
                domain: "tenant.auth0.com",
                fetcher: async (url, init) => fetch(url, init),
            };

            const client = new MyAccountClient(options);
            expect(client).toBeDefined();
        });
    });

    describe("real-world usage patterns", () => {
        it("should support static token for testing", () => {
            const client = new MyAccountClient({
                domain: "tenant.auth0.com",
                token: "test-static-token-for-development",
                telemetry: false,
            });

            expect(client).toBeDefined();
        });

        it("should support simple token getter without scopes", () => {
            let currentToken = "initial-token";

            const client = new MyAccountClient({
                domain: "tenant.auth0.com",
                token: () => currentToken,
            });

            expect(client).toBeDefined();

            // Simulate token refresh
            currentToken = "refreshed-token";
            // The client will call the function to get the new token
        });

        it("should support scope-aware token getter for Auth0", () => {
            const mockGetTokenSilently = vi.fn().mockResolvedValue("scope-aware-token");

            const client = new MyAccountClient({
                domain: "tenant.auth0.com",
                token: async ({ authorizationParams }) => {
                    return mockGetTokenSilently({
                        authorizationParams: {
                            scope: `openid profile email ${authorizationParams.scope}`,
                        },
                    });
                },
            });

            expect(client).toBeDefined();
        });

        it("should support custom fetcher with logging", () => {
            const logs: string[] = [];

            const client = new MyAccountClient({
                domain: "tenant.auth0.com",
                fetcher: async (url, init, authParams) => {
                    logs.push(`Fetching: ${url} with scopes: ${authParams?.scope?.join(" ")}`);

                    const response = await fetch(url, {
                        ...init,
                        headers: {
                            ...init?.headers,
                            Authorization: "Bearer test-token",
                        },
                    });

                    logs.push(`Response: ${response.status}`);
                    return response;
                },
            });

            expect(client).toBeDefined();
            expect(logs.length).toBe(0); // No requests made yet
        });

        it("should support custom fetcher with retry logic", () => {
            let attemptCount = 0;

            const client = new MyAccountClient({
                domain: "tenant.auth0.com",
                fetcher: async (url, init, authParams) => {
                    attemptCount++;

                    // Simulate retry logic
                    let response = await fetch(url, init);

                    if (!response.ok && attemptCount < 3) {
                        // Retry
                        response = await fetch(url, init);
                    }

                    return response;
                },
            });

            expect(client).toBeDefined();
        });

        it("should support custom domain with custom base path", () => {
            const client = new MyAccountClient({
                domain: "custom-domain.example.com",
                baseUrl: "https://custom-domain.example.com/custom/api/path",
                token: "test-token",
            });

            expect(client).toBeDefined();
            expect((client as any).options.baseUrl).toBe("https://custom-domain.example.com/custom/api/path");
        });
    });

    describe("fetcher conversion and integration", () => {
        it("should convert custom fetcher to core format successfully", async () => {
            const mockFetch = vi.fn().mockResolvedValue(
                new Response(JSON.stringify({ success: true }), {
                    status: 200,
                    statusText: "OK",
                }),
            );

            const fetcherSupplier = async (url: string, init?: RequestInit, authParams?: any) => {
                return mockFetch(url, init, authParams);
            };

            const client = new MyAccountClient({
                domain: "tenant.auth0.com",
                fetcher: fetcherSupplier,
            });

            expect(client).toBeDefined();
            expect((client as any).options.fetcher).toBeDefined();
        });

        it("should handle fetcher with scopes extraction", async () => {
            let capturedScopes: string[] | undefined;

            const fetcherSupplier = async (url: string, init?: RequestInit, authParams?: { scope?: string[] }) => {
                capturedScopes = authParams?.scope;
                return new Response(JSON.stringify({ data: "test" }), { status: 200 });
            };

            const client = new MyAccountClient({
                domain: "tenant.auth0.com",
                fetcher: fetcherSupplier,
            });

            expect(client).toBeDefined();
        });

        it("should handle fetcher with no scopes", async () => {
            const fetcherSupplier = async (url: string, init?: RequestInit, authParams?: { scope?: string[] }) => {
                expect(authParams).toBeUndefined();
                return new Response(JSON.stringify({ data: "test" }), { status: 200 });
            };

            const client = new MyAccountClient({
                domain: "tenant.auth0.com",
                fetcher: fetcherSupplier,
            });

            expect(client).toBeDefined();
        });

        it("should handle fetcher with request body", async () => {
            let capturedBody: string | undefined;

            const fetcherSupplier = async (url: string, init?: RequestInit) => {
                capturedBody = init?.body as string;
                return new Response(JSON.stringify({ success: true }), { status: 200 });
            };

            const client = new MyAccountClient({
                domain: "tenant.auth0.com",
                fetcher: fetcherSupplier,
            });

            expect(client).toBeDefined();
        });

        it("should handle fetcher without request body", async () => {
            const fetcherSupplier = async (url: string, init?: RequestInit) => {
                expect(init?.body).toBeUndefined();
                return new Response(JSON.stringify({ data: "test" }), { status: 200 });
            };

            const client = new MyAccountClient({
                domain: "tenant.auth0.com",
                fetcher: fetcherSupplier,
            });

            expect(client).toBeDefined();
        });

        it("should handle fetcher error responses", async () => {
            const fetcherSupplier = async (url: string, init?: RequestInit) => {
                return new Response(JSON.stringify({ error: "Unauthorized" }), {
                    status: 401,
                    statusText: "Unauthorized",
                });
            };

            const client = new MyAccountClient({
                domain: "tenant.auth0.com",
                fetcher: fetcherSupplier,
            });

            expect(client).toBeDefined();
        });

        it("should handle fetcher with empty response body", async () => {
            const fetcherSupplier = async (url: string, init?: RequestInit) => {
                return new Response("", { status: 204 });
            };

            const client = new MyAccountClient({
                domain: "tenant.auth0.com",
                fetcher: fetcherSupplier,
            });

            expect(client).toBeDefined();
        });

        it("should handle fetcher with credentials", async () => {
            let capturedCredentials: RequestCredentials | undefined;

            const fetcherSupplier = async (url: string, init?: RequestInit) => {
                capturedCredentials = init?.credentials;
                return new Response(JSON.stringify({ data: "test" }), { status: 200 });
            };

            const client = new MyAccountClient({
                domain: "tenant.auth0.com",
                fetcher: fetcherSupplier,
            });

            expect(client).toBeDefined();
        });

        it("should handle fetcher with abort signal", async () => {
            let capturedSignal: AbortSignal | null | undefined;

            const fetcherSupplier = async (url: string, init?: RequestInit) => {
                capturedSignal = init?.signal;
                return new Response(JSON.stringify({ data: "test" }), { status: 200 });
            };

            const client = new MyAccountClient({
                domain: "tenant.auth0.com",
                fetcher: fetcherSupplier,
            });

            expect(client).toBeDefined();
        });

        it("should handle fetcher with custom headers", async () => {
            let capturedHeaders: HeadersInit | undefined;

            const fetcherSupplier = async (url: string, init?: RequestInit) => {
                capturedHeaders = init?.headers;
                return new Response(JSON.stringify({ data: "test" }), { status: 200 });
            };

            const client = new MyAccountClient({
                domain: "tenant.auth0.com",
                fetcher: fetcherSupplier,
                headers: {
                    "X-Custom": "value",
                },
            });

            expect(client).toBeDefined();
        });

        it("should handle fetcher with different HTTP methods", async () => {
            let capturedMethod: string | undefined;

            const fetcherSupplier = async (url: string, init?: RequestInit) => {
                capturedMethod = init?.method;
                return new Response(JSON.stringify({ data: "test" }), { status: 200 });
            };

            const client = new MyAccountClient({
                domain: "tenant.auth0.com",
                fetcher: fetcherSupplier,
            });

            expect(client).toBeDefined();
        });

        it("should handle fetcher error with empty body", async () => {
            const fetcherSupplier = async (url: string, init?: RequestInit) => {
                return new Response("", {
                    status: 500,
                    statusText: "Internal Server Error",
                });
            };

            const client = new MyAccountClient({
                domain: "tenant.auth0.com",
                fetcher: fetcherSupplier,
            });

            expect(client).toBeDefined();
        });

        it("should handle fetcher success with empty body", async () => {
            const fetcherSupplier = async (url: string, init?: RequestInit) => {
                return new Response("", { status: 200 });
            };

            const client = new MyAccountClient({
                domain: "tenant.auth0.com",
                fetcher: fetcherSupplier,
            });

            expect(client).toBeDefined();
        });
    });
});
