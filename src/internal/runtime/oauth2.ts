// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
/*
 * GoOAuth2 — SDK-owned shim for `golang.org/x/oauth2` and `.../oauth2/clientcredentials`.
 * =====================================================================================
 * The Go client acquires a service-to-service token through the 2-legged client-credentials
 * flow: a `clientcredentials.Config` is filled in from user configuration, `TokenSource(ctx)`
 * hands back a lazy source, and `Token()` performs the token-endpoint round trip and caches
 * the result until it expires.
 *
 * Why a shim rather than an npm mapping
 *   - No npm package reproduces this surface. The Go names (`TokenSource`, `Token`,
 *     `AccessToken`, `EndpointParams`) are what the project's own code calls, and a library
 *     with a different shape mismatches every one of them.
 *   - The alternative — leaving the config an untyped bag — type-checks and then fails at
 *     runtime on the first `TokenSource(...)`, which is the failure mode this shim exists to
 *     remove.
 *   - The token endpoint is reached with the host's own `fetch`, so the shim adds no
 *     dependency.
 *
 * Blocking
 *   - `Token()` performs a network round trip, so it returns a Promise. Go's method is
 *     synchronous-blocking; in a single-threaded host the equivalent is to park, which is
 *     why `Token` is registered as a blocking method and every caller of it is planned
 *     async.
 *
 * Caching
 *   - A source caches the token it fetched and reuses it until `Expiry`, matching the Go
 *     source's own caching. A token with no expiry is treated as valid indefinitely, which
 *     is what a provider that omits `expires_in` is asserting.
 *   - Concurrent callers share ONE in-flight request rather than each starting their own:
 *     the Go source serializes on a mutex, and a burst of parallel RPCs at startup is the
 *     normal case.
 */

/** The token the endpoint returned. Field names are Go's, because the project reads them. */
export interface GoOAuth2Token {
  AccessToken: string;
  TokenType?: string;
  RefreshToken?: string;
  /** Absolute expiry as epoch milliseconds. Absent means the provider stated no expiry. */
  Expiry?: number;
}

/**
 * Anything that can produce a token — the project stores its own implementations here.
 *
 * The result is awaitable rather than strictly a Promise: the client-credentials source
 * below reaches the token endpoint and must park, while a source backed by a static or
 * already-cached token answers immediately, exactly as Go's synchronous `Token()` does.
 * Every consumer awaits, so both satisfy it.
 */
export interface GoOAuth2TokenSource {
  Token(): GoOAuth2Token | Promise<GoOAuth2Token>;
}

/** The 2-legged client-credentials configuration. */
export class GoClientCredentialsConfig {
  ClientID: string = '';
  ClientSecret: string = '';
  TokenURL: string = '';
  Scopes?: string[];
  /**
   * Extra token-endpoint parameters. Go's `url.Values` is a multimap, so a name may carry
   * several values; a caller that only ever sets one may pass the bare string.
   */
  EndpointParams?: Record<string, string | string[]>;

  constructor(init?: Partial<GoClientCredentialsConfig>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  /**
   * Returns a lazy, caching token source. Nothing is validated or fetched here — exactly as
   * in Go, an unusable configuration surfaces on the first `Token()` call, not at
   * construction.
   */
  TokenSource(_ctx?: unknown): GoOAuth2TokenSource {
    return new clientCredentialsTokenSource(this);
  }
}

class clientCredentialsTokenSource implements GoOAuth2TokenSource {
  private cached?: GoOAuth2Token;
  private inFlight?: Promise<GoOAuth2Token>;

  constructor(private readonly config: GoClientCredentialsConfig) {}

  Token(): Promise<GoOAuth2Token> {
    if (this.cached && !tokenExpired(this.cached)) {
      return Promise.resolve(this.cached);
    }
    // Invariant: at most one request is in flight. Callers that arrive while one is running
    // join it instead of opening a second connection to the token endpoint.
    if (!this.inFlight) {
      this.inFlight = this.fetchToken().finally(() => {
        this.inFlight = undefined;
      });
    }
    return this.inFlight;
  }

  private async fetchToken(): Promise<GoOAuth2Token> {
    if (this.config.TokenURL === '') {
      throw new Error('oauth2: token URL is not set');
    }
    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    body.set('client_id', this.config.ClientID);
    body.set('client_secret', this.config.ClientSecret);
    if (this.config.Scopes && this.config.Scopes.length > 0) {
      body.set('scope', this.config.Scopes.join(' '));
    }
    for (const [name, values] of Object.entries(this.config.EndpointParams ?? {})) {
      for (const value of Array.isArray(values) ? values : [values]) {
        body.append(name, value);
      }
    }

    let response: Response;
    try {
      response = await fetch(this.config.TokenURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
    } catch (err) {
      throw new Error(`oauth2: cannot fetch token: ${err instanceof Error ? err.message : String(err)}`);
    }
    const text = await response.text();
    if (!response.ok) {
      throw new Error(`oauth2: cannot fetch token: ${response.status} ${response.statusText}\nResponse: ${text}`);
    }

    let payload: Record<string, unknown>;
    try {
      payload = JSON.parse(text) as Record<string, unknown>;
    } catch {
      throw new Error(`oauth2: cannot parse token response: ${text}`);
    }
    const accessToken = typeof payload.access_token === 'string' ? payload.access_token : '';
    if (accessToken === '') {
      throw new Error('oauth2: server response missing access_token');
    }
    const token: GoOAuth2Token = { AccessToken: accessToken };
    if (typeof payload.token_type === 'string') {
      token.TokenType = payload.token_type;
    }
    if (typeof payload.refresh_token === 'string') {
      token.RefreshToken = payload.refresh_token;
    }
    if (typeof payload.expires_in === 'number') {
      token.Expiry = Date.now() + payload.expires_in * 1000;
    }
    this.cached = token;
    return token;
  }
}

/**
 * A token is spent slightly before its stated expiry: a token that expires while a request
 * is in flight is rejected by the server, and the Go source applies the same guard band.
 */
function tokenExpired(token: GoOAuth2Token): boolean {
  if (token.Expiry === undefined) {
    return false;
  }
  return Date.now() >= token.Expiry - 10_000;
}
