// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { expect } from 'vitest';
import { LoadRSAPrivateKey, LoadRSAPublicKey } from './rsa.js';
import { readFileSync } from 'fs';

export function loadTestKeyFile(path: string): Buffer {
  return readFileSync(new URL(path, import.meta.url));
}

export function TestLoadRSAPublicKey(): void {
    const publicKeyPEM = loadTestKeyFile("./../auth/credentials/keytest");

    const key = LoadRSAPublicKey(publicKeyPEM);
    expect(key).not.toBeNull();
    expect(key.asymmetricKeyDetails?.modulusLength ?? 0).toBe(2048);

    expect(() => LoadRSAPublicKey(Buffer.from("invalid PEM data"))).toThrow(
        "failed to parse PEM block containing the public key",
    );

    const privateKeyPEM = loadTestKeyFile("./../auth/credentials/keytest");
    expect(() => LoadRSAPublicKey(privateKeyPEM)).toThrow(
        "failed to parse PEM block containing the public key",
    );
}

export function TestLoadRSAPrivateKey(): void {
    const privateKeyPEM = loadTestKeyFile("./../auth/credentials/keytest");

    const key = LoadRSAPrivateKey(privateKeyPEM);
    expect(key).not.toBeNull();
    expect(key.asymmetricKeyDetails?.modulusLength ?? 0).toEqual(2048);

    expect(() => LoadRSAPrivateKey(Buffer.from("invalid PEM data"))).toThrow(
        "failed to parse PEM block containing the private key",
    );

    const publicKeyPEM = loadTestKeyFile("./../auth/credentials/keytest.pub");
    expect(() => LoadRSAPrivateKey(publicKeyPEM)).toThrow(
        "failed to parse PEM block containing the private key",
    );
}
