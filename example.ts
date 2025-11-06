/**
 * Simple examples for MyAccountClient - Auth0 MyAccount API SDK
 */

import { MyAccountClient } from "./src/index.js";

// ============================================================================
// Basic Examples
// ============================================================================

// Example 1: Simple client with static token
const client = new MyAccountClient({
    domain: "your-tenant.auth0.com",
    token: "your-access-token",
});

// Example 2: With dynamic token (recommended for production)
const clientWithDynamicToken = new MyAccountClient({
    domain: "your-tenant.auth0.com",
    token: async ({ scope }) => {
        // SDK automatically provides required scopes
        // You can pass them to your Auth0 SDK
        const fullScope = `openid profile email ${scope}`;
        return await getToken(fullScope);
    },
});

async function getToken(scope: string): Promise<string> {
    // Your auth logic here
    // Example: return await auth0.getTokenSilently({ authorizationParams: { scope } });
    return "your-token";
}

// Example 3: Custom client info for telemetry
const clientWithTelemetry = new MyAccountClient({
    domain: "your-tenant.auth0.com",
    token: "your-access-token",
    clientInfo: {
        name: "my-app",
        version: "1.0.0",
    },
});

// Example 4: With custom headers
const clientWithHeaders = new MyAccountClient({
    domain: "your-tenant.auth0.com",
    token: "your-access-token",
    headers: {
        "X-Custom-Header": "value",
    },
});

// ============================================================================
// API Usage
// ============================================================================

async function usageExamples() {
    const myClient = client;

    try {
        // List authentication methods
        const methods = await myClient.authenticationMethods.list();
        console.log("Authentication methods:", methods);

        // Get a specific method
        if (methods.authentication_methods && methods.authentication_methods.length > 0) {
            const methodId = methods.authentication_methods[0].id;
            const method = await myClient.authenticationMethods.get(methodId);
            console.log("Method details:", method);
        }

        // List MFA factors
        const factors = await myClient.factors.list();
        console.log("Available factors:", factors);

        // List connected accounts
        const accounts = await myClient.connectedAccounts.list();
        console.log("Connected accounts:", accounts);
    } catch (error) {
        console.error("Error:", error);
    }
}

// Export for use
export { usageExamples, client, clientWithDynamicToken, clientWithTelemetry, clientWithHeaders };
