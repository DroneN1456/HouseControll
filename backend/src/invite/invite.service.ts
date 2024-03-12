import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Invite } from './invite.schema';
import { Model } from 'mongoose';
import { CreateInviteDTO } from './createInvite.DTO';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { HouseService } from 'src/house/house.service';

@Injectable()
export class InviteService {
  constructor(
    @InjectModel(Invite.name) private inviteModel: Model<Invite>,
    private authService: AuthService,
    private userService: UserService,
    private houseService: HouseService,
  ) {}
  async CreateInvite(createInviteDTO: CreateInviteDTO, token: string) {
    const payload = await this.authService.ValidateUser({ token });
    const user = await this.userService.GetById(payload.UserId);

    const house = await this.houseService.GetById(createInviteDTO.HouseId);
    if (user == null) {
      throw new NotFoundException('Serio?');
    }
    if (house.OwnerId != user._id.toString()) {
      throw new BadRequestException('You are not the owner of this house.');
    }
    const newInvite = new this.inviteModel();
    newInvite.HouseId = house._id.toString();
    newInvite.save();
    return newInvite;
  }
  async UseInvite(inviteId: string, token: string) {
    await this.authService.ValidateUser({ token });
    const invite = await this.inviteModel.findById(inviteId);
    if (invite == null) {
      throw new NotFoundException('Convite Inválido.');
    }
    return this.houseService.EnterHouse(invite.HouseId, token);
  }
  async GetInvite(houseId: string, token: string) {
    const user = await this.authService.ValidateUser({ token });

    const house = await this.houseService.GetById(houseId);

    if (house.OwnerId != user.UserId) {
      throw new BadRequestException();
    }

    if (house == null) {
      throw new BadRequestException();
    }

    const invite = await this.inviteModel.findOne({ HouseId: houseId });

    if (invite == null) {
      const newInvite = this.CreateInvite(new CreateInviteDTO(houseId), token);
      return newInvite;
    } else {
      return invite;
    }
  }
}
