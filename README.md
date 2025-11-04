![Auth0 MyAccount SDK for JavaScript/TypeScript](https://cdn.auth0.com/website/sdks/banners/myaccount-js-banner.png)

![Release](https://img.shields.io/npm/v/@auth0/myaccount-js)
[![License](https://img.shields.io/:license-mit-blue.svg?style=flat)](https://opensource.org/licenses/MIT)
[![fern shield](https://img.shields.io/badge/%F0%9F%8C%BF-Built%20with%20Fern-brightgreen)](https://buildwithfern.com?utm_source=github&utm_medium=github&utm_campaign=readme&utm_source=https%3A%2F%2Fgithub.com%2Fauth0%2Fmyaccount-js)

📚 [Documentation](#documentation) - 🚀 [Getting Started](#getting-started) - 💻 [API Reference](#api-reference) - 💬 [Feedback](#feedback)

## Documentation

- [Docs Site](https://auth0.com/docs) - explore our docs site and learn more about Auth0
- [API Reference](https://github.com/auth0/myaccount-js/blob/main/reference.md) - full reference for this library

## Getting Started

### Requirements

This library supports the following tooling versions:

- Node.js: `^20.19.0 || ^22.12.0 || ^24.0.0`

### Installation

Using [npm](https://npmjs.org) in your project directory run the following command:

```bash
npm install @auth0/myaccount-js
```

### Configure the SDK

The MyAccount client allows end-users to manage their own Auth0 profile, authentication methods, and connected accounts.

Initialize your client with a domain and token supplier:

```typescript
import { MyAccountClient } from "@auth0/myaccount-js";

const client = new MyAccountClient({
    domain: "{YOUR_TENANT_AND_REGION}.auth0.com",
    token: "YOUR_ACCESS_TOKEN", // or use a token supplier function
});
```

#### Using a Token Supplier

For dynamic token retrieval (recommended for production):

```typescript
import { MyAccountClient } from "@auth0/myaccount-js";

const client = new MyAccountClient({
    domain: "{YOUR_TENANT_AND_REGION}.auth0.com",
    token: async ({ authorizationParams }) => {
        // Fetch token with required scopes
        return await getAccessToken({
            scope: `openid profile email ${authorizationParams.scope}`,
        });
    },
});
```

#### Using a Custom Fetcher

For advanced authentication scenarios:

```typescript
import { MyAccountClient } from "@auth0/myaccount-js";

const client = new MyAccountClient({
    domain: "{YOUR_TENANT_AND_REGION}.auth0.com",
    fetcher: async (url, init, authParams) => {
        const token = await getAccessToken({ scope: authParams?.scope });
        return fetch(url, {
            ...init,
            headers: {
                ...init?.headers,
                Authorization: `Bearer ${token}`,
            },
        });
    },
});
```

## Request and Response Types

The SDK exports all request and response types as TypeScript interfaces. You can import them directly:

```typescript
import { MyAccountClient, MyAccount } from "@auth0/myaccount-js";

const client = new MyAccountClient({
    domain: "{YOUR_TENANT_AND_REGION}.auth0.com",
    token: "YOUR_ACCESS_TOKEN",
});

// Use the request type
const request: MyAccount.UpdateAuthenticationMethodRequestContent = {
    name: "My Security Key",
};

await client.authenticationMethods.update("auth_method_id", request);
```

## API Reference

### Generated Documentation

- [Full Reference](./reference.md) - complete API reference guide

### Key Classes

- **MyAccountClient** - for managing user profiles and authentication methods

## Exception Handling

When the API returns a non-success status code (4xx or 5xx response), a subclass of the following error will be thrown:

```typescript
import { MyAccountClient, MyAccountError } from "@auth0/myaccount-js";

const client = new MyAccountClient({
    domain: "{YOUR_TENANT_AND_REGION}.auth0.com",
    token: "YOUR_ACCESS_TOKEN",
});

try {
    await client.authenticationMethods.create({
        type: "passkey",
    });
} catch (err) {
    if (err instanceof MyAccountError) {
        console.log(err.statusCode);
        console.log(err.message);
        console.log(err.body);
        console.log(err.rawResponse);
    }
}
```

## Pagination

Some list endpoints are paginated. You can manually iterate page-by-page:

```typescript
import { MyAccountClient } from "@auth0/myaccount-js";

const client = new MyAccountClient({
    domain: "{YOUR_TENANT_AND_REGION}.auth0.com",
    token: "YOUR_ACCESS_TOKEN",
});

let page = await client.connectedAccounts.list({
    connection: "connection",
    take: 10,
});

// Process first page
console.log(page.data);

// Get next pages
while (page.hasNextPage()) {
    page = await page.getNextPage();
    console.log(page.data);
}
```

## Advanced

### Additional Headers

If you would like to send additional headers as part of the request, use the `headers` request option:

```typescript
const response = await client.authenticationMethods.create(
    {
        type: "passkey",
    },
    {
        headers: {
            "X-Custom-Header": "custom value",
        },
    },
);
```

### Additional Query String Parameters

If you would like to send additional query string parameters as part of the request, use the `queryParams` request option:

```typescript
const response = await client.authenticationMethods.create(
    {
        type: "passkey",
    },
    {
        queryParams: {
            customQueryParamKey: "custom query param value",
        },
    },
);
```

### Retries

The SDK is instrumented with automatic retries with exponential backoff. A request will be retried as long as the request is deemed retryable and the number of retry attempts has not grown larger than the configured retry limit (default: 2).

A request is deemed retryable when any of the following HTTP status codes is returned:

- [408](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/408) (Timeout)
- [429](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429) (Too Many Requests)
- [5XX](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500) (Internal Server Errors)

Use the `maxRetries` request option to configure this behavior:

```typescript
const response = await client.authenticationMethods.create(
    {
        type: "passkey",
    },
    {
        maxRetries: 0, // override maxRetries at the request level
    },
);
```

### Timeouts

The SDK defaults to a 60 second timeout. Use the `timeoutInSeconds` option to configure this behavior:

```typescript
const response = await client.authenticationMethods.create(
    {
        type: "passkey",
    },
    {
        timeoutInSeconds: 30, // override timeout to 30s
    },
);
```

### Aborting Requests

The SDK allows users to abort requests at any point by passing in an abort signal:

```typescript
const controller = new AbortController();
const response = await client.authenticationMethods.create(
    {
        type: "passkey",
    },
    {
        abortSignal: controller.signal,
    },
);
controller.abort(); // aborts the request
```

### Access Raw Response Data

The SDK provides access to raw response data, including headers, through the `.withRawResponse()` method. The `.withRawResponse()` method returns a promise that results to an object with a `data` and a `rawResponse` property:

```typescript
const { data, rawResponse } = await client.authenticationMethods
    .create({
        type: "passkey",
    })
    .withRawResponse();

console.log(data);
console.log(rawResponse.headers["X-My-Header"]);
```

### Runtime Compatibility

The SDK works in the following runtimes:

- Node.js 20+, 22+, 24+
- Vercel
- Cloudflare Workers
- Deno v1.25+
- Bun 1.0+
- React Native

## Feedback

### Contributing

We appreciate feedback and contribution to this repo! Before you get started, please see the following:

- [Auth0's general contribution guidelines](https://github.com/auth0/open-source-template/blob/master/GENERAL-CONTRIBUTING.md)
- [Auth0's code of conduct guidelines](https://github.com/auth0/open-source-template/blob/master/CODE-OF-CONDUCT.md)

While we value open-source contributions to this SDK, this library is generated programmatically. Additions made directly to this library would have to be moved over to our generation code, otherwise they would be overwritten upon the next generated release. Feel free to open a PR as a proof of concept, but know that we will not be able to merge it as-is. We suggest opening an issue first to discuss with us!

On the other hand, contributions to the README are always very welcome!

### Raise an issue

To provide feedback or report a bug, please [raise an issue on our issue tracker](https://github.com/auth0/myaccount-js/issues).

### Vulnerability Reporting

Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## What is Auth0?

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://cdn.auth0.com/website/sdks/logos/auth0_dark_mode.png" width="150">
    <source media="(prefers-color-scheme: light)" srcset="https://cdn.auth0.com/website/sdks/logos/auth0_light_mode.png" width="150">
    <img alt="Auth0 Logo" src="https://cdn.auth0.com/website/sdks/logos/auth0_light_mode.png" width="150">
  </picture>
</p>
<p align="center">
  Auth0 is an easy to implement, adaptable authentication and authorization platform. To learn more checkout <a href="https://auth0.com/why-auth0">Why Auth0?</a>
</p>
<p align="center">
  This project is licensed under the MIT license. See the <a href="./LICENSE"> LICENSE</a> file for more info.
</p>
