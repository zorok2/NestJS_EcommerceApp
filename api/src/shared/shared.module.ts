import { Module } from '@nestjs/common';
import { FirebaseService } from './file-upload/firebase/firebase.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfig } from 'src/lib/configs/application.config';
import { ExcelService } from './file-upload/excell/excel.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [AppConfig],
    }),
  ],
  providers: [ConfigService, ExcelService, FirebaseService],
  exports: [ExcelService, FirebaseService],
})
export class SharedModule {}
