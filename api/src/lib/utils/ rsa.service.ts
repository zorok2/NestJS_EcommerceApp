import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { Default } from 'config';

@Injectable()
export class CryptoService {
  private _publicKey: string;

  public get publicKey(): string {
    return this._publicKey;
  }

  public set publicKey(value: string) {
    this._publicKey = value;
  }

  private _privateKey: string;

  public get privateKey(): string {
    return this._privateKey;
  }

  public set privateKey(value: string) {
    this._privateKey = value;
  }

  constructor() {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
      },
    });

    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }

  encrypt(publicKey: string, data: any): string {
    return crypto
      .publicEncrypt(publicKey, Buffer.from(data))
      .toString('base64');
  }

  decrypt(data: string): string {
    return crypto
      .privateDecrypt(Default.PRIVATE_KEY, Buffer.from(data, 'base64'))
      .toString('utf8');
  }
}
