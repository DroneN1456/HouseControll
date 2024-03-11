import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { HouseService } from './house.service';
import { HouseDTO } from './house.dto';

@Controller('house')
export class HouseController {
  constructor(private houseService: HouseService) {}
  @Post()
  async createHouse(
    @Body() houseDTO: HouseDTO,
    @Headers('token') token: string,
  ) {
    return this.houseService.CreateHouse(houseDTO, token);
  }
  @Get(':id')
  async GetHouseInfo(
    @Param('id') houseId: string,
    @Headers('token') token: string,
  ) {
    return this.houseService.GetHouseInfo(houseId, token);
  }
}
