// Suite module for oauth_authorization_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  TestNewOAuthAuthorizationProviderEmptyConfigFails,
  TestNewOAuthAuthorizationProviderExtraParams,
  TestNewOAuthAuthorizationProviderFailingTokenSourceResultsInError,
  TestNewOAuthAuthorizationProviderTokenSourceReturnsToken,
} from './oauth_authorization_test.js';

describe("oauth_authorization", () => {
  it("TestNewOAuthAuthorizationProviderEmptyConfigFails", TestNewOAuthAuthorizationProviderEmptyConfigFails);
  it("TestNewOAuthAuthorizationProviderExtraParams", TestNewOAuthAuthorizationProviderExtraParams);
  it("TestNewOAuthAuthorizationProviderFailingTokenSourceResultsInError", TestNewOAuthAuthorizationProviderFailingTokenSourceResultsInError);
  it("TestNewOAuthAuthorizationProviderTokenSourceReturnsToken", TestNewOAuthAuthorizationProviderTokenSourceReturnsToken);
});
