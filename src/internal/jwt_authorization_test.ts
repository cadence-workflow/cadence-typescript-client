// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { expect } from 'vitest';
import { LoadRSAPublicKey } from './common/util/rsa.js';
import { NewAdminJwtAuthorizationProvider } from './jwt_authorization.js';
import { JWTClaims } from './common/auth/service_wrapper.js';
import { readFileSync } from 'fs';
import * as jwt from 'jsonwebtoken';

export function TestCorrectTokenCreation(): void {
  const keyBytes = readFileSync(new URL('./common/auth/credentials/keytest', import.meta.url));
  const key = Buffer.alloc(keyBytes.length);
  keyBytes.copy(key);
  const authorizer = NewAdminJwtAuthorizationProvider(key);
  const authToken = authorizer.GetAuthToken();

  const publicKeyBytes = readFileSync(new URL('./common/auth/credentials/keytest.pub', import.meta.url));
  const publicKeyStr = Buffer.alloc(publicKeyBytes.length);
  publicKeyBytes.copy(publicKeyStr);
  const publicKey = LoadRSAPublicKey(publicKeyStr);

  const claims = jwt.verify(authToken.toString(), publicKey, {
    algorithms: ['RS256'],
  }) as JWTClaims;

  expect(claims.Admin).toEqual(true);
  expect(claims.Groups).toEqual('');
  expect(claims.TTL).toEqual(60 * 10);
}

export function TestIncorrectPrivateKeyForTokenCreation(): void {
  const authorizer = NewAdminJwtAuthorizationProvider(Buffer.from([]));
  let err: Error | undefined;
  try {
    authorizer.GetAuthToken();
  } catch (caught) {
    if (!(caught instanceof Error)) throw caught;
    err = caught;
  }
  expect(err).toEqual(new Error('failed to parse PEM block containing the private key'));
}
