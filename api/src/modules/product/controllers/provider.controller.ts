/* eslint-disable prettier/prettier */

import { ProviderService } from './../services/provider.service';
import { Get, Param, Post, Body, Put, Logger, UseGuards } from '@nestjs/common';
/* eslint-disable prettier/prettier */
import { Controller, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Provider } from 'src/entities/product/provider.entity';
import { AuthGuard } from 'src/lib/guard/auth.guard';
import { ResponseBase } from 'src/shared/payload/response-base';
import { CreateProviderDto } from '../dto/request/create-provider.dto';

@ApiTags('Provider Endpoint')
@Controller('/provider')
export class ProviderController {
  private readonly logger = new Logger(ProviderController.name);

  constructor(private readonly providerService: ProviderService) {}
  //TODO Query
  //Get Provider List
  @Get()
  @UseGuards(AuthGuard)
  async findAll(): // @Query('pageSize') pageSize: number,
  // @Query('page') page: number,
  Promise<ResponseBase> {
    return this.providerService.findAll();
  }

  //Get Provider By Id
  @Get(':id')
  async getProviderByID(@Param('id') id: string): Promise<ResponseBase> {
    return this.providerService.findById(id);
  }

  //Search Provider By Name
  @Get('name/:name')
  async search(
    @Param('name') name: string,
    // @Query('pageSize') pageSize: number,
    // @Query('page') page: number,
  ): Promise<ResponseBase> {
    return this.providerService.findByName(name);
  }
  //TODO Command
  //Create Provider
  @Post()
  async createProvider(@Body() provider: CreateProviderDto): Promise<ResponseBase> {
    return this.providerService.createProvider(provider);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() provider: Provider,
  ): Promise<ResponseBase> {
    provider.id = id;
    return this.providerService.updateProvider(provider);
  }
}
