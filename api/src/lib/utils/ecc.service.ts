import { Injectable } from '@nestjs/common';
import { ec as EC } from 'elliptic';

@Injectable()
export class EccService {
  private ec = new EC('secp256k1');

  generateKeyPair() {
    const keyPair = this.ec.genKeyPair();
    return {
      publicKey: keyPair.getPublic().encode('hex', false),
      privateKey: keyPair.getPrivate().toString(16),
    };
  }

  encrypt(message: string, publicKey: string) {
    const key = this.ec.keyFromPublic(publicKey, 'hex');
    const encryptedMessage = key.encrypt(message);
    return encryptedMessage.toString('hex');
  }

  decrypt(encryptedMessage: string, privateKey: string) {
    const key = this.ec.keyFromPrivate(privateKey, 'hex');
    const decryptedMessage = key.decrypt(Buffer.from(encryptedMessage, 'hex'));
    return decryptedMessage.toString();
  }
}
