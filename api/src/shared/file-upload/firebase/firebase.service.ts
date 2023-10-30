/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  constructor(public readonly config: ConfigService) {}

  async initFirebase() {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: this.config.get<string>('app.firebase.projectId'),
        clientEmail: this.config.get<string>('app.firebase.clientEmail'),
        privateKey: this.config.get<string>('app.firebase.privateKey'),
      }),
      storageBucket: this.config.get<string>('app.firebase.bucket'),
    });
  }

  async uploadFile(files: Express.Multer.File[]) {
    const bucket = admin
      .storage()
      .bucket(this.config.get<string>('app.firebase.bucket'));

    const urls: string[] = [];

    for (const file of files) {
      const filename = `${Date.now()}-${file.originalname}`.replace(/ /g, '+');
      const fileUpload = bucket.file(filename);

      const stream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      await new Promise((resolve, reject) => {
        stream.on('error', (error) => reject(error));
        stream.on('finish', () => resolve('success'));
        stream.end(file.buffer);
      });
      // xóa khoảng trắng img
      urls.push(`https://storage.googleapis.com/${bucket.name}/${filename}`);
    }

    return urls;
  }
}
