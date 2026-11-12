# Reference

## factors

<details><summary><code>client.factors.<a href="/src/api/resources/factors/client/Client.ts">list</a>() -> MyAccount.ListFactorsResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

List of factors enabled for the Auth0 tenant and available for enrollment by this user.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.factors.list();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `FactorsClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## AuthenticationMethods

<details><summary><code>client.authenticationMethods.<a href="/src/api/resources/authenticationMethods/client/Client.ts">list</a>({ ...params }) -> MyAccount.ListAuthenticationMethodsResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve detailed list of authentication methods belonging to the authenticated user.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.authenticationMethods.list({
    type: "password",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `MyAccount.ListAuthenticationMethodsRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `AuthenticationMethodsClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.authenticationMethods.<a href="/src/api/resources/authenticationMethods/client/Client.ts">create</a>({ ...params }) -> MyAccount.CreateAuthenticationMethodResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Start the enrollment of a supported authentication method.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.authenticationMethods.create({
    type: "phone",
    phone_number: "phone_number",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `MyAccount.CreateAuthenticationMethodRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `AuthenticationMethodsClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.authenticationMethods.<a href="/src/api/resources/authenticationMethods/client/Client.ts">get</a>(authentication_method_id) -> MyAccount.GetAuthenticationMethodResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieves a single authentication method belonging to the authenticated user.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.authenticationMethods.get("authentication_method_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**authentication_method_id:** `MyAccount.PathAuthenticationMethodId` — Authentication Method ID. This value is part of the Location header returned when creating an authentication method. It should be used as it is, without any modifications.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `AuthenticationMethodsClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.authenticationMethods.<a href="/src/api/resources/authenticationMethods/client/Client.ts">delete</a>(authentication_method_id) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Deletes a single authentication method belonging to the authenticated user.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.authenticationMethods.delete("authentication_method_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**authentication_method_id:** `MyAccount.PathAuthenticationMethodId` — Authentication Method ID. This value is part of the Location header returned when creating an authentication method. It should be used as it is, without any modifications.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `AuthenticationMethodsClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.authenticationMethods.<a href="/src/api/resources/authenticationMethods/client/Client.ts">update</a>(authentication_method_id, { ...params }) -> MyAccount.UpdateAuthenticationMethodResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Updates a single authentication method

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.authenticationMethods.update("authentication_method_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**authentication_method_id:** `MyAccount.PathAuthenticationMethodId` — Authentication Method ID. This value is part of the Location header returned when creating an authentication method. It should be used as it is, without any modifications.

</dd>
</dl>

<dl>
<dd>

**request:** `MyAccount.UpdateAuthenticationMethodRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `AuthenticationMethodsClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.authenticationMethods.<a href="/src/api/resources/authenticationMethods/client/Client.ts">verify</a>(authentication_method_id, { ...params }) -> MyAccount.VerifyAuthenticationMethodResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Confirm the enrollment of a supported authentication method.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.authenticationMethods.verify("authentication_method_id", {
    auth_session: "Fe26.2**05c400ed...",
    otp_code: "123456",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**authentication_method_id:** `MyAccount.PathAuthenticationMethodId` — Authentication Method ID. This value is part of the Location header returned when creating an authentication method. It should be used as it is, without any modifications.

</dd>
</dl>

<dl>
<dd>

**request:** `MyAccount.VerifyAuthenticationMethodRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `AuthenticationMethodsClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## ConnectedAccounts

<details><summary><code>client.connectedAccounts.<a href="/src/api/resources/connectedAccounts/client/Client.ts">create</a>({ ...params }) -> MyAccount.CreateConnectedAccountsResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Start an authorization flow to link the authenticated user's account with an external identity provider.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.connectedAccounts.create({
    connection: "connection",
    redirect_uri: "redirect_uri",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `MyAccount.CreateConnectedAccountsRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ConnectedAccountsClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.connectedAccounts.<a href="/src/api/resources/connectedAccounts/client/Client.ts">complete</a>({ ...params }) -> MyAccount.CompleteConnectedAccountsResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Complete a previously started authorization flow to link the authenticated user's account with an external identity provider.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.connectedAccounts.complete({
    auth_session: "auth_session",
    connect_code: "connect_code",
    redirect_uri: "redirect_uri",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `MyAccount.CompleteConnectedAccountsRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ConnectedAccountsClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.connectedAccounts.<a href="/src/api/resources/connectedAccounts/client/Client.ts">list</a>({ ...params }) -> core.Page&lt;MyAccount.ConnectedAccount, MyAccount.ListConnectedAccountsResponseContent&gt;</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve connected accounts belonging to the authenticated user.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.connectedAccounts.list({
    connection: "connection",
    from: "from",
    take: 1,
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.connectedAccounts.list({
    connection: "connection",
    from: "from",
    take: 1,
});
while (page.hasNextPage()) {
    page = await page.getNextPage();
}

// You can also access the underlying response
const response = page.response;
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `MyAccount.ListConnectedAccountsRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ConnectedAccountsClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.connectedAccounts.<a href="/src/api/resources/connectedAccounts/client/Client.ts">delete</a>(id) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Delete a connected account belonging to the authenticated user.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.connectedAccounts.delete("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `MyAccount.ConnectedAccountId` — The unique identifier of the connected account

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ConnectedAccountsClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## consents

<details><summary><code>client.consents.<a href="/src/api/resources/consents/client/Client.ts">list</a>() -> MyAccount.ListConsentsResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve the list of consents for the authenticated user.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.consents.list();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `ConsentsClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.consents.<a href="/src/api/resources/consents/client/Client.ts">get</a>(consent_id) -> MyAccount.Consent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve a specific consent for the authenticated user by ID.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.consents.get("consent_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**consent_id:** `string` — The ID of the consent to retrieve

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ConsentsClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.consents.<a href="/src/api/resources/consents/client/Client.ts">decide</a>(consent_id, { ...params }) -> MyAccount.DecideConsentResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Approve or deny a pending consent for the authenticated user. When `signature` and `kid` are supplied, the consents service verifies the JWS signature against the user's registered consent signing key before recording the decision.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.consents.decide("consent_id", {
    decision: "approve",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**consent_id:** `string` — The ID of the consent to retrieve

</dd>
</dl>

<dl>
<dd>

**request:** `MyAccount.DecideConsentRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ConsentsClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.consents.<a href="/src/api/resources/consents/client/Client.ts">listSigningKeys</a>() -> MyAccount.ListSigningKeysConsentResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve the list of consent signing keys registered for the authenticated user.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.consents.listSigningKeys();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `ConsentsClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.consents.<a href="/src/api/resources/consents/client/Client.ts">createSigningKey</a>({ ...params }) -> MyAccount.ConsentSigningKey</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Register a consent signing key for the authenticated user. The key is used to verify signed consent decisions. Only the public key is supplied; the corresponding private key must never leave the device.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.consents.createSigningKey({
    jwk: {
        kty: "EC",
        crv: "P-256",
        alg: "ES256",
        use: "sig",
        x: "x",
        y: "y",
    },
    device_identifier: "device_identifier",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `MyAccount.CreateConsentSigningKeyRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ConsentsClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.consents.<a href="/src/api/resources/consents/client/Client.ts">getSigningKey</a>(kid) -> MyAccount.GetSigningKeyConsentResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve a specific consent signing key for the authenticated user by its key identifier.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.consents.getSigningKey("kid");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**kid:** `string` — The identifier of the consent signing key. This value is returned as `kid` when the key is registered.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ConsentsClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.consents.<a href="/src/api/resources/consents/client/Client.ts">deleteSigningKey</a>(kid) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Delete a consent signing key registered by the authenticated user. Succeeds whether or not a key with the given identifier exists. Access tokens issued before the deletion remain verifiable, because the public key is embedded in the token at issuance.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.consents.deleteSigningKey("kid");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**kid:** `string` — The identifier of the consent signing key. This value is returned as `kid` when the key is registered.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ConsentsClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## ConnectedAccounts Connections

<details><summary><code>client.connectedAccounts.connections.<a href="/src/api/resources/connectedAccounts/resources/connections/client/Client.ts">list</a>({ ...params }) -> core.Page&lt;MyAccount.ConnectedAccountConnection, MyAccount.ListConnectedAccountsConnectionsResponseContent&gt;</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve available connections that can be used for account linking by the authenticated user.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.connectedAccounts.connections.list({
    from: "from",
    take: 1,
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.connectedAccounts.connections.list({
    from: "from",
    take: 1,
});
while (page.hasNextPage()) {
    page = await page.getNextPage();
}

// You can also access the underlying response
const response = page.response;
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `MyAccount.ListConnectedAccountsConnectionsRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ConnectionsClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>
