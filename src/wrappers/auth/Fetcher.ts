/**
 * Auth0 fetcher types for custom fetch implementations.
 * Provides a user-friendly interface for custom fetcher patterns.
 *
 * @group MyAccount API
 * @public
 */
export namespace Auth0Fetcher {
    /**
     * Authorization parameters passed to custom fetch functions.
     * Contains the scopes required for the current API endpoint.
     * Users can add additional parameters like audience as needed.
     *
     * @group MyAccount API
     * @public
     */
    export interface AuthorizationParams {
        /**
         * Array of scopes required for the current API endpoint.
         * Extracted from the endpoint's security requirements.
         *
         * Join them with a space when passing to Auth0:
         * `scope: authParams?.scope?.join(' ')`
         */
        scope?: string[];
        /**
         * The audience for the token.
         */
        audience: string;
    } /**
     * Custom fetch function that receives authorization parameters.
     * This is the recommended pattern for Auth0 applications using custom fetch.
     *
     * The SDK automatically calls your function with the authorization params needed for each endpoint.
     *
     * @param input - The URL or Request object
     * @param init - The fetch RequestInit options
     * @param authParams - Authorization parameters (scope, audience) from the SDK
     * @returns A Promise that resolves to the Response
     *
     * @example Custom fetcher with Auth0 SDK
     * ```typescript
     * const client = new MyAccountClient({
     *   domain: 'your-tenant.auth0.com',
     *   fetcher: async (url, init, authParams) => {
     *     // Get token with required scopes
     *     const token = await auth0.getTokenSilently({
     *       authorizationParams: {
     *         scope: authParams?.scope?.join(' ')
     *       }
     *     });
     *
     *     // Add auth header
     *     const headers = {
     *       ...init?.headers,
     *       'Authorization': `Bearer ${token}`
     *     };
     *
     *     // Make the fetch call
     *     return fetch(url, { ...init, headers });
     *   }
     * });
     * ```
     *
     * @example Custom fetcher with error handling
     * ```typescript
     * const client = new MyAccountClient({
     *   domain: 'your-tenant.auth0.com',
     *   fetcher: async (url, init, authParams) => {
     *     const token = await getToken(authParams);
     *     const response = await fetch(url, {
     *       ...init,
     *       headers: {
     *         ...init?.headers,
     *         'Authorization': `Bearer ${token}`
     *       }
     *     });
     *
     *     // Custom error handling
     *     if (!response.ok) {
     *       const error = await response.json();
     *       throw new Error(error.message);
     *     }
     *
     *     return response;
     *   }
     * });
     * ```
     *
     * @example Using Auth0's createFetcher() directly
     * ```typescript
     * import { Auth0Client } from '@auth0/auth0-spa-js';
     *
     * const auth0 = new Auth0Client({
     *   domain: 'your-tenant.auth0.com',
     *   clientId: 'your-client-id'
     * });
     *
     * // Create Auth0 fetcher with DPoP support and automatic token handling
     * const auth0Fetcher = auth0.createFetcher();
     *
     * const client = new MyAccountClient({
     *   domain: 'your-tenant.auth0.com',
     *   fetcher: auth0Fetcher.fetch // Pass Auth0's fetch directly
     * });
     * ```
     */
    export type CustomFetchFunction = (
        input: RequestInfo | URL,
        init?: RequestInit,
        authParams?: AuthorizationParams,
    ) => Promise<Response>;
}

/**
 * Custom fetch function supplier for the MyAccountClient.
 * Allows users to provide a custom fetch implementation that receives authorization parameters.
 *
 * @group MyAccount API
 * @public
 */
export type Auth0FetcherSupplier = (
    url: string,
    init?: RequestInit,
    authParams?: Auth0Fetcher.AuthorizationParams,
) => Promise<Response>;
