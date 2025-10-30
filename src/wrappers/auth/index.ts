/**
 * Authentication utilities for MyOrg Client.
 *
 * @module Wrappers.Auth
 * @group MyOrg API
 */

export type { Auth0TokenSupplier, Auth0Token } from "./Token.js";
export { createCoreTokenSupplier, extractScopesFromMetadata } from "./Token.js";

export type { Auth0FetcherSupplier, Auth0Fetcher } from "./Fetcher.js";
