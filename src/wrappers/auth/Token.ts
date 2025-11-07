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
     * Token supplier function that receives scope information for each API call.
     *
     * The SDK **always** calls your function with an object containing the scopes
     * required for the current endpoint (even if the scope is an empty string).
     * You can destructure the `scope` parameter to use it, or ignore the parameter
     * entirely if you don't need scope-aware tokens.
     *
     * @param options - Object containing the required scopes (always provided by SDK, never undefined)
     * @returns Access token string or a Promise that resolves to a token
     *
     * @example Recommended: Scope-aware token (Auth0 SPA)
     * ```typescript
     * const client = new MyAccountClient({
     *   domain: 'your-tenant.auth0.com',
     *   token: async ({ scope }) => {
     *     return await auth0.getTokenSilently({
     *       authorizationParams: {
     *         scope: `openid profile email ${scope}`
     *       }
     *     });
     *   }
     * });
     * ```
     *
     * @example Simple token without scope handling
     * ```typescript
     * const client = new MyAccountClient({
     *   domain: 'your-tenant.auth0.com',
     *   token: () => getCurrentToken() // Function doesn't declare parameters, so extra args are ignored
     * });
     * ```
     *
     * @example Custom function with scope support
     * ```typescript
     * async function getAccessToken({ scope }) {
     *   return await yourTokenProvider.getToken({
     *     authorizationParams: {
     *       scope: `openid profile email ${scope}`
     *     }
     *   });
     * }
     *
     * const client = new MyAccountClient({
     *   domain: 'your-tenant.auth0.com',
     *   token: getAccessToken // SDK automatically passes { scope: '...' }
     * });
     * ```
     */
    export type TokenSupplier = (options: TokenOptions) => string | Promise<string>;
}

/**
 * Token configuration for the MyAccountClient.
 * Supports multiple patterns for maximum flexibility:
 *
 * - **String**: Static token (⚠️ not recommended for production)
 * - **Function**: `(options) => string` - Token supplier that receives scope information
 *
 * **Important:** The SDK **always** calls your function with an object `{ scope: string }`,
 * even when the scope is an empty string. This ensures safe destructuring patterns.
 * JavaScript allows functions to ignore arguments they don't need, so both
 * `() => token` and `({ scope }) => token` patterns work correctly.
 *
 * @group MyAccount API
 * @public
 *
 * @example Static token (testing only)
 * ```typescript
 * const token: Auth0TokenSupplier = 'your-static-access-token';
 * ```
 *
 * @example Simple token supplier (ignores scopes)
 * ```typescript
 * const token: Auth0TokenSupplier = () => getCurrentToken();
 * // SDK calls: tokenSupplier({ scope: '...' })
 * // Your function ignores the parameter - works fine!
 * ```
 *
 * @example Recommended: Scope-aware token supplier
 * ```typescript
 * const token: Auth0TokenSupplier = async ({ scope }) => {
 *   return await auth0.getTokenSilently({
 *     authorizationParams: {
 *       scope: `openid profile email ${scope}`
 *     }
 *   });
 * };
 * // SDK calls: tokenSupplier({ scope: 'read:users write:users' })
 * // Your function destructures safely - always works!
 * ```
 */
export type Auth0TokenSupplier = string | Auth0Token.TokenSupplier;

/**
 * Converts an Auth0TokenSupplier to the core EndpointSupplier format.
 * Handles scope extraction from endpoint metadata and **always** calls the token
 * supplier with the scope object `{ scope: string }` for consistency, even when
 * the scope is an empty string. This ensures destructuring patterns are always safe.
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
            const scopes = extractScopesFromMetadata(endpointMetadata);
            const scope = scopes.join(" ");

            // Always call with scope object for consistency
            return await tokenSupplier({ scope });
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
