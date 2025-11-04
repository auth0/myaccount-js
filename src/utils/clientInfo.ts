import { SDK_VERSION } from "../version.js";
import { RUNTIME } from "../core/runtime/index.js";

/**
 * Client information for Auth0 telemetry
 */
export interface ClientInfo {
    name: string;
    version: string;
    env?: Record<string, string>;
    [key: string]: unknown;
}

/**
 * Generates default client information for Auth0 telemetry with runtime environment detection
 * @returns Default client info object with environment information
 */
export function generateClientInfo(): ClientInfo {
    const runtimeType = RUNTIME?.type ?? "unknown";
    const runtimeKey = runtimeType === "workerd" ? "cloudflare-workers" : runtimeType;
    const runtimeVersion = RUNTIME?.version ?? "unknown";

    return {
        name: "myaccount-js",
        version: SDK_VERSION,
        env: {
            [runtimeKey]: runtimeVersion,
        },
    };
}
