/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MapProxy } from './map/map.proxy';
@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [MapProxy],
  exports: [MapProxy],
})
export class ProxyModule {}
