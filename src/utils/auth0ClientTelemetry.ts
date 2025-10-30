import { base64urlEncodeJson } from "./base64url.js";
import { generateClientInfo, type ClientInfo } from "./clientInfo.js";

/**
 * Options for Auth0 client telemetry
 */
export interface Auth0ClientTelemetryOptions {
    clientInfo?: ClientInfo;
}

/**
 * Handles Auth0 client telemetry functionality for generating telemetry headers
 */
export class Auth0ClientTelemetry {
    private readonly clientInfo: ClientInfo;

    constructor(options: Auth0ClientTelemetryOptions = {}) {
        this.clientInfo = options.clientInfo || generateClientInfo();
    }

    /**
     * Get the Auth0-Client header value for telemetry.
     * This method generates the telemetry header that should be included in API requests.
     * @returns The Auth0-Client header value or undefined if client name is invalid
     */
    getAuth0ClientHeader(): string | undefined {
        if (typeof this.clientInfo.name === "string" && this.clientInfo.name.length > 0) {
            return base64urlEncodeJson(this.clientInfo);
        }
        return undefined;
    }

    /**
     * Get headers object with Auth0-Client header included
     * @param existingHeaders - Existing headers to merge with
     * @returns Headers object with Auth0-Client header
     */
    getHeaders(existingHeaders: Record<string, string> = {}): Record<string, string> {
        const auth0ClientHeader = this.getAuth0ClientHeader();

        if (auth0ClientHeader) {
            return {
                ...existingHeaders,
                "Auth0-Client": auth0ClientHeader,
            };
        }

        return existingHeaders;
    }
}
