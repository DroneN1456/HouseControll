import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { InviteService } from './invite.service';
import { CreateInviteDTO } from './createInvite.DTO';

@Controller('invite')
export class InviteController {
  constructor(private inviteService: InviteService) {}
  @Post()
  async CreateInvite(
    @Body() createInviteDTO: CreateInviteDTO,
    @Headers('token') token: string,
  ) {
    return this.inviteService.CreateInvite(createInviteDTO, token);
  }
  @Post('use')
  async UseInvite(
    @Body('InviteId') inviteId: string,
    @Headers('token') token: string,
  ) {
    return this.inviteService.UseInvite(inviteId, token);
  }
  @Get(':id')
  async GetInvite(
    @Param('id') houseId: string,
    @Headers('token') token: string,
  ) {
    return this.inviteService.GetInvite(houseId, token);
  }
}
