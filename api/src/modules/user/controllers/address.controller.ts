/* eslint-disable prettier/prettier */
import { UserService } from 'src/modules/user/services/user.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddAddressDto } from '../dto/request/add-address.dto';
// import { FormDataRequest } from 'nestjs-form-data';
@ApiTags('Address')
@Controller('address')
export class AddressController {
  private readonly logger = new Logger(AddressController.name);
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getAddressUser(@Param('id') id: string) {
    return this.userService.getAddressUser(id);
  }
  @Put(':userId/:addressId')
  async updateAddress(
    @Param('userId') userId: string,
    @Param('addressId') addressId: string,
  ) {
    return this.userService.updateStatusAddress(addressId, userId);
  }
  @Post()
  async addAddressUser(@Body() userAddress: AddAddressDto): Promise<any> {
    const data = await this.userService.addAddressUser(userAddress);
    return data;
  }

  // @Put('status/:user/:address')
  // @HttpCode(200)
  // async updateStatusAddress(
  //   @Param('address') address: string,
  //   @Param('user') user: string,
  // ) {
  //   try {
  //     return this.userService.updateStatusAddress(address, user);
  //   } catch (error) {}
  // }
}
