import { Injectable, NotFoundException } from '@nestjs/common';
import { HouseDTO } from './house.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';
import { InjectModel } from '@nestjs/mongoose';
import { House } from './house.schema';
import { Model, now } from 'mongoose';
import { OwingService } from 'src/owing/owing.service';

@Injectable()
export class HouseService {
  constructor(
    @InjectModel(House.name) private houseModel: Model<House>,
    private authService: AuthService,
    private userService: UserService,
    private owingService: OwingService,
  ) {}
  async CreateHouse(houseDTO: HouseDTO, token: string) {
    const payload = await this.authService.ValidateUser({ token });
    const user = await this.userService.GetById(payload.UserId);
    const newHouse = new this.houseModel();

    newHouse.OwnerId = user._id.toString();

    newHouse.Members.push(user._id.toString());

    newHouse.Name = houseDTO.Name;

    newHouse.save();

    user.Houses.push(newHouse._id.toString());
    user.save();
    return newHouse;
  }
  async EnterHouse(houseId: string, token: string) {
    const payload = await this.authService.ValidateUser({ token });
    const user = await this.userService.GetById(payload.UserId);
    const house = await this.houseModel.findById(houseId);
    if (house == null) {
      throw new NotFoundException('Casa não eocontrada.');
    }
    if (house.Members.includes(user._id.toString())) {
      throw new NotFoundException('Você já está nessa casa.');
    }
    user.Houses.push(house._id.toString());
    user.save();
    house.Members.push(user._id.toString());
    house.save();
    return house;
  }
  async GetById(houseId: string) {
    return this.houseModel.findById(houseId);
  }
  async GetHouseInfo(houseId: string, token: string) {
    const payload = await this.authService.ValidateUser({ token });
    const house = await this.houseModel.findById(houseId);
    const houseMembers = await Promise.all(
      house.Members.map(async (member: any) => {
        const memberUser = await this.userService.GetById(member);
        return {
          Id: member,
          Name: memberUser.Name,
          IsOwner: member == house.OwnerId,
        };
      }),
    );
    let houseOwing = 0;
    const userOwings = await this.owingService.FindActiveOwings(payload.UserId);
    for (const owing of userOwings) {
      if (houseMembers.find((member) => member.Id == owing.Creditor)) {
        houseOwing += owing.PendingValue;
      }
    }
    return {
      Id: house._id.toString(),
      IsOwner: house.OwnerId == payload.UserId,
      Name: house.Name,
      Members: houseMembers,
      Owing: houseOwing,
    };
  }
}
