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
     * Token supplier function that can optionally receive scope information for the API call.
     *
     * The SDK automatically calls your function with the scopes needed for each endpoint.
     * You can choose to use the scopes or ignore them based on your needs.
     *
     * @param options - Optional object containing the required scopes
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
     *   token: () => getCurrentToken()  // Ignores scope parameter
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
     *   token: getAccessToken  // SDK automatically passes { scope: '...' }
     * });
     * ```
     */
    export type TokenSupplier = (options?: TokenOptions) => Promise<string> | string;
}

/**
 * Token configuration for the MyAccountClient.
 * Supports multiple patterns for maximum flexibility:
 *
 * - **String**: Static token (⚠️ not recommended for production)
 * - **Function**: `(options?) => string` - Token supplier that optionally uses scope information
 *
 * The function pattern supports both simple token suppliers that ignore scopes
 * and scope-aware suppliers that use the scopes provided by the SDK.
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
 * ```
 */
export type Auth0TokenSupplier = string | Auth0Token.TokenSupplier;
/**
 * Converts an Auth0TokenSupplier to the core EndpointSupplier format.
 * Handles scope extraction from endpoint metadata and calls the token supplier
 * with scopes when available.
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
            // Call the supplier with scope if available, otherwise without arguments
            if (scope) {
                return await tokenSupplier({ scope });
            }
            return await tokenSupplier();
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
