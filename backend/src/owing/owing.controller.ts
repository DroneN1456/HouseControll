import { Body, Controller, Headers, Post } from '@nestjs/common';
import { CreateOwingDTO } from './owing.dto';
import { OwingService } from './owing.service';
import { PayOwingDTO } from './payOwing.dto';

@Controller('owing')
export class OwingController {
    constructor(private owingService: OwingService) {}

    @Post()
    async CreateOwing(@Body() createOwingDTO: CreateOwingDTO, @Headers('token') token){
        return this.owingService.CreateOwing(createOwingDTO, token);
    }

    @Post('payOwing')
    async PayOwing(@Body() payOwingDTO: PayOwingDTO, @Headers('token') token){
        return this.owingService.PayOwing(payOwingDTO, token);
    }
}
