import { Module } from '@nestjs/common';
import { CryptoService } from './ rsa.service';
import { BCryptService } from './bcrypt.service';
import { EccService } from './ecc.service';
@Module({
  imports: [],
  controllers: [],
  providers: [CryptoService, BCryptService],
  exports: [CryptoService, BCryptService],
})
export class UtilsModule {}
