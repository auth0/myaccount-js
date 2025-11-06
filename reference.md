# Reference

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
