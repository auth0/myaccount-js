# Change Log

## [v1.0.0-beta.1](https://github.com/auth0/myaccount-js/tree/v1.0.0-beta.1) (2026-04-29)

[Full Changelog](https://github.com/auth0/myaccount-js/compare/v1.0.0-beta.0...v1.0.0-beta.1)

### Features

- Authentication method types now use discriminated unions with a `type` field for variant selection (e.g., `AuthenticationMethod.Password`, `AuthenticationMethod.Passkey`) [#16](https://github.com/auth0/myaccount-js/pull/16)
- New `QueryStringBuilder` with fluent API for constructing query strings, supporting repeat and comma-separated array formats [#16](https://github.com/auth0/myaccount-js/pull/16)
- `CreateAuthenticationMethodRequestContent` now requires a `type` discriminator field [#16](https://github.com/auth0/myaccount-js/pull/16)
- New `UnsupportedMediaTypeError` (415) error type [#15](https://github.com/auth0/myaccount-js/pull/15)
- New `CreatePasswordAuthenticationMethod` type with connection and identity support [#15](https://github.com/auth0/myaccount-js/pull/15)
- New `VerifyPasswordAuthenticationMethod` type for password change verification flows [#15](https://github.com/auth0/myaccount-js/pull/15)
- Password policy types: `PasswordAuthenticationMethodPolicy`, `PasswordComplexityPolicy`, `PasswordDictionaryPolicy`, `PasswordHistoryPolicy`, `PasswordProfileDataPolicy`, and related enums [#15](https://github.com/auth0/myaccount-js/pull/15)
- New `PasswordCreationResponse` type returned when creating password authentication methods [#15](https://github.com/auth0/myaccount-js/pull/15)
- New `Connection` and `IdentityUserId` types for identity provider associations [#15](https://github.com/auth0/myaccount-js/pull/15)
- Passthrough `fetch()` method on `MyAccountClient` for making requests to endpoints not yet supported in the SDK [#15](https://github.com/auth0/myaccount-js/pull/15)
- Structured logging support via `logging` option on client configuration [#15](https://github.com/auth0/myaccount-js/pull/15)

### Fixes

- Custom fetcher now delegates to `core.fetcher` for proper header serialization, retries, timeouts, and error handling [#15](https://github.com/auth0/myaccount-js/pull/15)
- Placeholder `Authorization: Bearer ` header is now stripped in fetcher-only mode to avoid interfering with user-provided auth [#15](https://github.com/auth0/myaccount-js/pull/15)

### Breaking

- `AuthenticationMethod` union variants moved to namespaced interfaces (e.g., `AuthenticationMethodPassword` is now `AuthenticationMethod.Password`) [#16](https://github.com/auth0/myaccount-js/pull/16)
- Removed standalone `CreateEmailAuthenticationMethod` and `CreatePhoneAuthenticationMethod` types in favor of the unified discriminated union [#16](https://github.com/auth0/myaccount-js/pull/16)
- `queryParameters` on the fetcher is deprecated in favor of pre-built `queryString` [#16](https://github.com/auth0/myaccount-js/pull/16)
- Client resource classes renamed: `AuthenticationMethods` to `AuthenticationMethodsClient`, `ConnectedAccounts` to `ConnectedAccountsClient`, `Factors` to `FactorsClient` [#15](https://github.com/auth0/myaccount-js/pull/15)
- `token` removed from `BaseClientOptions` interface, now provided via `BearerAuthProvider.AuthOptions` [#15](https://github.com/auth0/myaccount-js/pull/15)
- `GoogleAccessTypeEnum` type removed [#15](https://github.com/auth0/myaccount-js/pull/15)
- `access_type` and `scope` properties removed from `AuthorizationParams` [#15](https://github.com/auth0/myaccount-js/pull/15)
- `AccessTypeEnum` and `ConnectedAccountAccessTypeEnum` changed from plain string literals to const object enums [#15](https://github.com/auth0/myaccount-js/pull/15)

## [v1.0.0-beta.0](https://github.com/auth0/myaccount-js/tree/v1.0.0-beta.0) (2025-11-07)

**Initial beta release of Auth0 MyAccount JavaScript SDK**

### Features

- Complete MyAccount API client implementation
- TypeScript support with full type coverage
- Automatic scope-aware token supplier
- Support for custom fetcher implementations
- Built-in telemetry and error handling
- Dual package support (CommonJS and ESM)
- Comprehensive API documentation

### API Support

- Authentication Methods management
- MFA Factors enrollment
- Connected Accounts management

### Developer Experience

- Scope-aware token supplier with Auth0 SPA SDK integration
- Flexible authentication patterns (token-based and custom fetcher)
- Strong TypeScript types for all API operations
- Built-in retry logic and error handling
- Automatic Auth0-Client telemetry headers
