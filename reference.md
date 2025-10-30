# Reference

## factors

<details><summary><code>client.factors.<a href="/src/api/resources/factors/client/Client.ts">list</a>() -> Auth0MyAccount.ListFactorsResponseContent</code></summary>
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

**requestOptions:** `Factors.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## AuthenticationMethods

<details><summary><code>client.authenticationMethods.<a href="/src/api/resources/authenticationMethods/client/Client.ts">list</a>() -> Auth0MyAccount.ListAuthenticationMethodsResponseContent</code></summary>
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
await client.authenticationMethods.list();
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

**requestOptions:** `AuthenticationMethods.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.authenticationMethods.<a href="/src/api/resources/authenticationMethods/client/Client.ts">create</a>({ ...params }) -> Auth0MyAccount.CreateAuthenticationMethodResponseContent</code></summary>
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
    type: "passkey",
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

**request:** `Auth0MyAccount.CreateAuthenticationMethodRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `AuthenticationMethods.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.authenticationMethods.<a href="/src/api/resources/authenticationMethods/client/Client.ts">get</a>(authenticationMethodId) -> Auth0MyAccount.GetAuthenticationMethodResponseContent</code></summary>
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

**authenticationMethodId:** `Auth0MyAccount.PathAuthenticationMethodId` — Authentication Method ID. This value is part of the Location header returned when creating an authentication method. It should be used as it is, without any modifications.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `AuthenticationMethods.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.authenticationMethods.<a href="/src/api/resources/authenticationMethods/client/Client.ts">delete</a>(authenticationMethodId) -> void</code></summary>
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

**authenticationMethodId:** `Auth0MyAccount.PathAuthenticationMethodId` — Authentication Method ID. This value is part of the Location header returned when creating an authentication method. It should be used as it is, without any modifications.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `AuthenticationMethods.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.authenticationMethods.<a href="/src/api/resources/authenticationMethods/client/Client.ts">update</a>(authenticationMethodId, { ...params }) -> Auth0MyAccount.UpdateAuthenticationMethodResponseContent</code></summary>
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

**authenticationMethodId:** `Auth0MyAccount.PathAuthenticationMethodId` — Authentication Method ID. This value is part of the Location header returned when creating an authentication method. It should be used as it is, without any modifications.

</dd>
</dl>

<dl>
<dd>

**request:** `Auth0MyAccount.UpdateAuthenticationMethodRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `AuthenticationMethods.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.authenticationMethods.<a href="/src/api/resources/authenticationMethods/client/Client.ts">verify</a>(authenticationMethodId, { ...params }) -> Auth0MyAccount.VerifyAuthenticationMethodResponseContent</code></summary>
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
    auth_session: "auth_session",
    authn_response: {
        id: "id",
        rawId: "rawId",
        response: {
            attestationObject: "attestationObject",
            clientDataJSON: "clientDataJSON",
        },
        type: "public-key",
    },
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

**authenticationMethodId:** `Auth0MyAccount.PathAuthenticationMethodId` — Authentication Method ID. This value is part of the Location header returned when creating an authentication method. It should be used as it is, without any modifications.

</dd>
</dl>

<dl>
<dd>

**request:** `Auth0MyAccount.VerifyAuthenticationMethodRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `AuthenticationMethods.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## ConnectedAccounts

<details><summary><code>client.connectedAccounts.<a href="/src/api/resources/connectedAccounts/client/Client.ts">create</a>({ ...params }) -> Auth0MyAccount.CreateConnectedAccountsResponseContent</code></summary>
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

**request:** `Auth0MyAccount.CreateConnectedAccountsRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ConnectedAccounts.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.connectedAccounts.<a href="/src/api/resources/connectedAccounts/client/Client.ts">complete</a>({ ...params }) -> Auth0MyAccount.CompleteConnectedAccountsResponseContent</code></summary>
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

**request:** `Auth0MyAccount.CompleteConnectedAccountsRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ConnectedAccounts.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.connectedAccounts.<a href="/src/api/resources/connectedAccounts/client/Client.ts">list</a>({ ...params }) -> core.Page<Auth0MyAccount.ConnectedAccount></code></summary>
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
const response = await client.connectedAccounts.list({
    connection: "connection",
    from: "from",
    take: 1,
});
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.connectedAccounts.list({
    connection: "connection",
    from: "from",
    take: 1,
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}
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

**request:** `Auth0MyAccount.ListConnectedAccountsRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ConnectedAccounts.RequestOptions`

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

**id:** `Auth0MyAccount.ConnectedAccountId` — The unique identifier of the connected account

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ConnectedAccounts.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## ConnectedAccounts Connections

<details><summary><code>client.connectedAccounts.connections.<a href="/src/api/resources/connectedAccounts/resources/connections/client/Client.ts">list</a>({ ...params }) -> core.Page<Auth0MyAccount.ConnectedAccountConnection></code></summary>
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
const response = await client.connectedAccounts.connections.list({
    from: "from",
    take: 1,
});
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.connectedAccounts.connections.list({
    from: "from",
    take: 1,
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}
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

**request:** `Auth0MyAccount.ListConnectedAccountsConnectionsRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Connections.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>
