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

**requestOptions:** `Factors.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## AuthenticationMethods

<details><summary><code>client.authenticationMethods.<a href="/src/api/resources/authenticationMethods/client/Client.ts">list</a>() -> MyAccount.ListAuthenticationMethodsResponseContent</code></summary>
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

**request:** `MyAccount.CreateAuthenticationMethodRequestContent`

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

<details><summary><code>client.authenticationMethods.<a href="/src/api/resources/authenticationMethods/client/Client.ts">get</a>(authenticationMethodId) -> MyAccount.GetAuthenticationMethodResponseContent</code></summary>
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

**authenticationMethodId:** `MyAccount.PathAuthenticationMethodId` — Authentication Method ID. This value is part of the Location header returned when creating an authentication method. It should be used as it is, without any modifications.

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

**authenticationMethodId:** `MyAccount.PathAuthenticationMethodId` — Authentication Method ID. This value is part of the Location header returned when creating an authentication method. It should be used as it is, without any modifications.

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

<details><summary><code>client.authenticationMethods.<a href="/src/api/resources/authenticationMethods/client/Client.ts">update</a>(authenticationMethodId, { ...params }) -> MyAccount.UpdateAuthenticationMethodResponseContent</code></summary>
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

**authenticationMethodId:** `MyAccount.PathAuthenticationMethodId` — Authentication Method ID. This value is part of the Location header returned when creating an authentication method. It should be used as it is, without any modifications.

</dd>
</dl>

<dl>
<dd>

**request:** `MyAccount.UpdateAuthenticationMethodRequestContent`

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

<details><summary><code>client.authenticationMethods.<a href="/src/api/resources/authenticationMethods/client/Client.ts">verify</a>(authenticationMethodId, { ...params }) -> MyAccount.VerifyAuthenticationMethodResponseContent</code></summary>
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

**authenticationMethodId:** `MyAccount.PathAuthenticationMethodId` — Authentication Method ID. This value is part of the Location header returned when creating an authentication method. It should be used as it is, without any modifications.

</dd>
</dl>

<dl>
<dd>

**request:** `MyAccount.VerifyAuthenticationMethodRequestContent`

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

**requestOptions:** `ConnectedAccounts.RequestOptions`

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

**requestOptions:** `ConnectedAccounts.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.connectedAccounts.<a href="/src/api/resources/connectedAccounts/client/Client.ts">list</a>({ ...params }) -> core.Page<MyAccount.ConnectedAccount, MyAccount.ListConnectedAccountsResponseContent></code></summary>
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
    page = page.getNextPage();
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

**id:** `MyAccount.ConnectedAccountId` — The unique identifier of the connected account

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

<details><summary><code>client.connectedAccounts.connections.<a href="/src/api/resources/connectedAccounts/resources/connections/client/Client.ts">list</a>({ ...params }) -> core.Page<MyAccount.ConnectedAccountConnection, MyAccount.ListConnectedAccountsConnectionsResponseContent></code></summary>
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
    page = page.getNextPage();
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

**requestOptions:** `Connections.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>
