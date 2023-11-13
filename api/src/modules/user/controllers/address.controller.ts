import { UserService } from 'src/modules/user/services/user.service';
import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddAddressDto } from '../dto/request/add-address.dto';
import { FormDataRequest } from 'nestjs-form-data';
@ApiTags('Address')
@Controller('address')
export class AddressController {
  private readonly logger = new Logger(AddressController.name);
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getAddressUser(@Param('id') id: string) {
    return this.userService.getAddressUser(id);
  }
  @Post()
  async addAddressUser(@Body() userAddress: AddAddressDto): Promise<any> {
    const data = await this.userService.addAddressUser(userAddress);
    return data;
  }
}
