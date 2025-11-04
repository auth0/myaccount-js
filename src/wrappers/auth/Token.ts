import * as core from "../../core/index.js";

/**
 * Auth0 token options that can be used with the MyAccountClient.
 * Provides a user-friendly interface for different token patterns.
 *
 * @group MyAccount API
 * @public
 */
export namespace Auth0Token {
    /**
     * Options passed to token functions that need scope information.
     *
     * @public
     */
    export interface TokenOptions {
        /**
         * Space-separated scopes required for the current API endpoint.
         */
        scope: string;
    }

    /**
     * Function that automatically receives required scopes for the API call.
     * This is the recommended pattern for Auth0 applications.
     *
     * The SDK automatically calls your function with the scopes needed for each endpoint.
     *
     * @param options - Object containing the required scopes
     * @returns Access token string
     *
     * @example Auth0 SPA with automatic scope handling
     * ```typescript
     * const client = new MyAccountClient({
     *   domain: 'your-tenant.auth0.com',
     *   token: async ({ scope }) => {
     *     const token = await auth0.getTokenSilently({
     *       authorizationParams: {
     *         scope: `openid profile email ${scope}`
     *       }
     *     });
     *     return token;
     *   }
     * });
     * ```
     *
     * @example Custom getAccessToken function
     * ```typescript
     * const client = new MyAccountClient({
     *   domain: 'your-tenant.auth0.com',
     *   token: getAccessToken  // SDK automatically passes { scope: '...' }
     * });
     *
     * // Your getAccessToken function receives scope automatically
     * async function getAccessToken({ scope }) {
     *   return await yourTokenProvider.getToken({
     *     authorizationParams: {
     *       scope: `openid profile email ${scope}`
     *     }
     *   });
     * }
     * ```
     */
    export type TokenSupplierWithScopes = (options: TokenOptions) => string | Promise<string>;

    /**
     * Simple function that returns a token without scope information.
     * Use this when you have a single token that works for all endpoints.
     *
     * @returns Access token string
     */
    export type SimpleTokenSupplier = () => string | Promise<string>;
}

/**
 * Token configuration for the MyAccountClient.
 * Supports multiple patterns for maximum flexibility:
 *
 * - **String**: Static token (⚠️ not recommended for production)
 * - **Simple function**: `() => string` - For dynamic tokens without scope handling
 * - **Scope-aware function**: `({ scope }) => string` - **RECOMMENDED** for Auth0 applications
 *
 * @group MyAccount API
 * @public
 *
 * @example Static token (testing only)
 * ```typescript
 * const token: Auth0TokenSupplier = 'your-static-access-token';
 * ```
 *
 * @example Simple dynamic token
 * ```typescript
 * const token: Auth0TokenSupplier = () => getCurrentToken();
 * ```
 *
 * @example Recommended: Automatic scope handling
 * ```typescript
 * // The SDK automatically calls your function with required scopes
 * const token: Auth0TokenSupplier = async ({ scope }) => {
 *   const token = await auth0.getTokenSilently({
 *     authorizationParams: {
 *       scope: `openid profile email ${scope}`
 *     }
 *   });
 *   return token;
 * };
 * ```
 */
export type Auth0TokenSupplier = string | Auth0Token.SimpleTokenSupplier | Auth0Token.TokenSupplierWithScopes;

/**
 * Type guard to check if a function is a TokenSupplierWithScopes.
 *
 * @internal
 */
function isTokenSupplierWithScopes(
    fn: Auth0Token.SimpleTokenSupplier | Auth0Token.TokenSupplierWithScopes,
): fn is Auth0Token.TokenSupplierWithScopes {
    return fn.length > 0;
}

/**
 * Converts an Auth0TokenSupplier to the core EndpointSupplier format.
 * Handles scope extraction from endpoint metadata.
 *
 * @param tokenSupplier - The user-provided token configuration
 * @returns A core-compatible EndpointSupplier
 * @internal
 */
export function createCoreTokenSupplier(tokenSupplier: Auth0TokenSupplier): core.EndpointSupplier<core.BearerToken> {
    if (typeof tokenSupplier === "string") {
        return tokenSupplier;
    }

    if (typeof tokenSupplier === "function") {
        return async ({ endpointMetadata }) => {
            if (isTokenSupplierWithScopes(tokenSupplier)) {
                const scopes = extractScopesFromMetadata(endpointMetadata);
                const scope = scopes.join(" ");
                return await tokenSupplier({ scope });
            }
            return await (tokenSupplier as Auth0Token.SimpleTokenSupplier)();
        };
    }

    throw new Error("Invalid token supplier provided");
}

/**
 * Extracts scopes from endpoint metadata.
 *
 * @param endpointMetadata - The endpoint security metadata
 * @returns Array of required scopes
 * @internal
 */
export function extractScopesFromMetadata(endpointMetadata: core.EndpointMetadata): string[] {
    if (!endpointMetadata.security) return [];

    const scopes = new Set<string>();

    for (const securityCollection of endpointMetadata.security) {
        for (const schemeScopes of Object.values(securityCollection)) {
            for (const scope of schemeScopes) {
                scopes.add(scope);
            }
        }
    }

    return [...scopes];
}
