import {
    createCoreTokenSupplier,
    extractScopesFromMetadata,
    type Auth0TokenSupplier,
} from "../../../../src/wrappers/auth/Token.js";
import * as core from "../../../../src/core/index.js";

describe("Token", () => {
    describe("createCoreTokenSupplier", () => {
        it("should handle static string token", async () => {
            const tokenSupplier: Auth0TokenSupplier = "static-token";
            const coreSupplier = createCoreTokenSupplier(tokenSupplier);

            expect(coreSupplier).toBe("static-token");
        });

        it("should handle simple function token supplier", async () => {
            const tokenSupplier: Auth0TokenSupplier = () => "dynamic-token";
            const coreSupplier = createCoreTokenSupplier(tokenSupplier);

            // Call the supplier with empty endpoint metadata
            const result = await core.EndpointSupplier.get(coreSupplier as core.EndpointSupplier<string>, {
                endpointMetadata: { security: [] },
            });

            expect(result).toBe("dynamic-token");
        });

        it("should handle async simple function token supplier", async () => {
            const tokenSupplier: Auth0TokenSupplier = async () => "async-token";
            const coreSupplier = createCoreTokenSupplier(tokenSupplier);

            const result = await core.EndpointSupplier.get(coreSupplier as core.EndpointSupplier<string>, {
                endpointMetadata: { security: [] },
            });

            expect(result).toBe("async-token");
        });

        it("should handle scope-aware token supplier with scopes", async () => {
            const tokenSupplier: Auth0TokenSupplier = async ({ scope }) => {
                return `token-with-scope-${scope}`;
            };
            const coreSupplier = createCoreTokenSupplier(tokenSupplier);

            const endpointMetadata: core.EndpointMetadata = {
                security: [
                    {
                        OAuth2: ["read:users", "write:users"],
                    },
                ],
            };

            const result = await core.EndpointSupplier.get(coreSupplier as core.EndpointSupplier<string>, {
                endpointMetadata,
            });

            expect(result).toBe("token-with-scope-read:users write:users");
        });

        it("should handle scope-aware token supplier with empty scopes", async () => {
            const tokenSupplier: Auth0TokenSupplier = async ({ scope }) => {
                return `token-with-scope-${scope}`;
            };
            const coreSupplier = createCoreTokenSupplier(tokenSupplier);

            const endpointMetadata: core.EndpointMetadata = {
                security: [],
            };

            const result = await core.EndpointSupplier.get(coreSupplier as core.EndpointSupplier<string>, {
                endpointMetadata,
            });

            expect(result).toBe("token-with-scope-");
        });

        it("should handle scope-aware token supplier with multiple security schemes", async () => {
            const tokenSupplier: Auth0TokenSupplier = async ({ scope }) => {
                return `scope:${scope}`;
            };
            const coreSupplier = createCoreTokenSupplier(tokenSupplier);

            const endpointMetadata: core.EndpointMetadata = {
                security: [
                    {
                        OAuth2: ["read:profile"],
                        Bearer: ["access:api"],
                    },
                    {
                        OAuth2: ["read:email"],
                    },
                ],
            };

            const result = await core.EndpointSupplier.get(coreSupplier as core.EndpointSupplier<string>, {
                endpointMetadata,
            });

            // Should contain all unique scopes
            expect(result).toContain("read:profile");
            expect(result).toContain("access:api");
            expect(result).toContain("read:email");
        });

        it("should deduplicate scopes in scope-aware token supplier", async () => {
            const tokenSupplier: Auth0TokenSupplier = async ({ scope }) => {
                const scopeArray = scope.split(" ");
                return `count:${scopeArray.length}`;
            };
            const coreSupplier = createCoreTokenSupplier(tokenSupplier);

            const endpointMetadata: core.EndpointMetadata = {
                security: [
                    {
                        OAuth2: ["read:users", "write:users"],
                    },
                    {
                        OAuth2: ["read:users"], // Duplicate
                    },
                ],
            };

            const result = await core.EndpointSupplier.get(coreSupplier as core.EndpointSupplier<string>, {
                endpointMetadata,
            });

            // Should have only 2 unique scopes (duplicates removed)
            expect(result).toBe("count:2");
        });

        it("should throw error for invalid token supplier", () => {
            const invalidSupplier = 123 as any;

            expect(() => createCoreTokenSupplier(invalidSupplier)).toThrow("Invalid token supplier provided");
        });

        it("should throw error for null token supplier", () => {
            const invalidSupplier = null as any;

            expect(() => createCoreTokenSupplier(invalidSupplier)).toThrow("Invalid token supplier provided");
        });

        it("should throw error for undefined token supplier", () => {
            const invalidSupplier = undefined as any;

            expect(() => createCoreTokenSupplier(invalidSupplier)).toThrow("Invalid token supplier provided");
        });

        it("should throw error for object token supplier", () => {
            const invalidSupplier = {} as any;

            expect(() => createCoreTokenSupplier(invalidSupplier)).toThrow("Invalid token supplier provided");
        });

        it("should throw error for array token supplier", () => {
            const invalidSupplier = [] as any;

            expect(() => createCoreTokenSupplier(invalidSupplier)).toThrow("Invalid token supplier provided");
        });
    });

    describe("extractScopesFromMetadata", () => {
        it("should extract scopes from single security scheme", () => {
            const metadata: core.EndpointMetadata = {
                security: [
                    {
                        OAuth2: ["read:users", "write:users"],
                    },
                ],
            };

            const scopes = extractScopesFromMetadata(metadata);

            expect(scopes).toEqual(["read:users", "write:users"]);
        });

        it("should extract scopes from multiple security schemes", () => {
            const metadata: core.EndpointMetadata = {
                security: [
                    {
                        OAuth2: ["read:profile"],
                        Bearer: ["access:api"],
                    },
                ],
            };

            const scopes = extractScopesFromMetadata(metadata);

            expect(scopes).toHaveLength(2);
            expect(scopes).toContain("read:profile");
            expect(scopes).toContain("access:api");
        });

        it("should deduplicate scopes from multiple security collections", () => {
            const metadata: core.EndpointMetadata = {
                security: [
                    {
                        OAuth2: ["read:users", "write:users"],
                    },
                    {
                        OAuth2: ["read:users", "delete:users"],
                    },
                ],
            };

            const scopes = extractScopesFromMetadata(metadata);

            // Should have 3 unique scopes
            expect(scopes).toHaveLength(3);
            expect(scopes).toContain("read:users");
            expect(scopes).toContain("write:users");
            expect(scopes).toContain("delete:users");
        });

        it("should return empty array for undefined security", () => {
            const metadata: core.EndpointMetadata = {
                security: undefined,
            };

            const scopes = extractScopesFromMetadata(metadata);

            expect(scopes).toEqual([]);
        });

        it("should return empty array for empty security array", () => {
            const metadata: core.EndpointMetadata = {
                security: [],
            };

            const scopes = extractScopesFromMetadata(metadata);

            expect(scopes).toEqual([]);
        });

        it("should handle empty scope arrays in security schemes", () => {
            const metadata: core.EndpointMetadata = {
                security: [
                    {
                        OAuth2: [],
                    },
                ],
            };

            const scopes = extractScopesFromMetadata(metadata);

            expect(scopes).toEqual([]);
        });

        it("should handle mixed empty and non-empty scope arrays", () => {
            const metadata: core.EndpointMetadata = {
                security: [
                    {
                        OAuth2: [],
                        Bearer: ["access:api"],
                    },
                ],
            };

            const scopes = extractScopesFromMetadata(metadata);

            expect(scopes).toEqual(["access:api"]);
        });

        it("should preserve scope order (insertion order)", () => {
            const metadata: core.EndpointMetadata = {
                security: [
                    {
                        First: ["scope1"],
                        Second: ["scope2"],
                        Third: ["scope3"],
                    },
                ],
            };

            const scopes = extractScopesFromMetadata(metadata);

            // Should maintain insertion order
            expect(scopes[0]).toBe("scope1");
            expect(scopes[1]).toBe("scope2");
            expect(scopes[2]).toBe("scope3");
        });

        it("should handle complex nested security structure", () => {
            const metadata: core.EndpointMetadata = {
                security: [
                    {
                        OAuth2: ["read:profile", "read:email"],
                        Bearer: ["access:api"],
                    },
                    {
                        OAuth2: ["write:profile"],
                    },
                    {
                        ApiKey: ["admin:access"],
                    },
                ],
            };

            const scopes = extractScopesFromMetadata(metadata);

            expect(scopes).toHaveLength(5);
            expect(scopes).toContain("read:profile");
            expect(scopes).toContain("read:email");
            expect(scopes).toContain("access:api");
            expect(scopes).toContain("write:profile");
            expect(scopes).toContain("admin:access");
        });
    });
});
