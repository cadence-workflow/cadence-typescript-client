// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { background } from './runtime/context.js';
import type { GoOAuth2TokenSource } from './runtime/oauth2.js';
import { GoClientCredentialsConfig } from './runtime/oauth2.js';

/**
 * OAuthAuthorizerConfig allows to configure external OAuth provider
 * This is machine to machine / service to service 2-legged OAuth2 flow
 */
export interface OAuthAuthorizerConfig {
  ClientID: string;
  ClientSecret: string;
  TokenURL: string;
  Scopes?: string[];
  EndpointParams?: Record<string, string>;
}

export class OAuthProvider {
  constructor(init?: Partial<OAuthProvider>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  tokenSource?: GoOAuth2TokenSource;

  config?: GoClientCredentialsConfig;

  async GetAuthToken(): Promise<Buffer> {
    try {
      const token = await this.tokenSource!.Token();
      return Buffer.from(token.AccessToken);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
      throw new globalThis.Error("token source: " + err.message, { cause: err });
    }
  }

}

export function NewOAuthAuthorizationProvider(config: OAuthAuthorizerConfig): OAuthProvider {
  const oauthConfig = new GoClientCredentialsConfig({
    ClientID: config.ClientID,
    ClientSecret: config.ClientSecret,
    TokenURL: config.TokenURL,
    Scopes: config.Scopes,
  });

  if (config.EndpointParams != null) {
    const v: Record<string, string> = {};
    for (const [name, value] of Object.entries(config.EndpointParams)) {
      v[name] = value;
    }
    oauthConfig.EndpointParams = v;
  }

  return new OAuthProvider({
    tokenSource: oauthConfig.TokenSource(background()),
    config: oauthConfig,
  });
}
