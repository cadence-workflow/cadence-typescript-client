// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import type { GoOAuth2Token } from './runtime/oauth2.js';
import { expect } from 'vitest';
import { NewOAuthAuthorizationProvider, OAuthProvider } from './oauth_authorization.js';

export class fakeOKTokenSource {
  constructor(init?: Partial<fakeOKTokenSource>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Token(): GoOAuth2Token {
    return { AccessToken: "token" };
  }

}

export class fakeFailingTokenSource {
  constructor(init?: Partial<fakeFailingTokenSource>) {
    Object.assign(this, Object.fromEntries(Object.entries(init ?? {}).filter(([, v]) => v !== undefined)));
  }

  Token(): GoOAuth2Token {
    throw new Error("error");
  }

}

export async function TestNewOAuthAuthorizationProviderEmptyConfigFails(): Promise<void> {
  const p = NewOAuthAuthorizationProvider({
    ClientID: "",
    ClientSecret: "",
    TokenURL: "",
  });
  let err: Error | null = null;
  try {
    await p.GetAuthToken();
  } catch (caught) {
    if (!(caught instanceof Error)) throw caught;
    err = caught;
  }
  expect(err).not.toBeNull();
}

export function TestNewOAuthAuthorizationProviderExtraParams(): void {
  const p = NewOAuthAuthorizationProvider({
    ClientID: "",
    ClientSecret: "",
    TokenURL: "",
    EndpointParams: { test1: "test2" },
  });
  expect(Object.keys(p.config!.EndpointParams!).length).toBeGreaterThan(0);
}

export async function TestNewOAuthAuthorizationProviderFailingTokenSourceResultsInError(): Promise<void> {
  const p = new OAuthProvider({
    tokenSource: new fakeFailingTokenSource({})
  });
  let token: Buffer = Buffer.alloc(0);
  let err: Error | null = null;

  try {
    token = await p.GetAuthToken();
  } catch (caught) {
    if (!(caught instanceof Error)) throw caught;
    err = caught;
  }

  expect(token).toEqual(Buffer.alloc(0));
  expect(err).not.toBeNull();
}

export async function TestNewOAuthAuthorizationProviderTokenSourceReturnsToken(): Promise<void> {
  const p = new OAuthProvider({
    tokenSource: new fakeOKTokenSource(),
  });
  const token = await p.GetAuthToken();
  expect(token).toEqual(Buffer.from("token"));
}
