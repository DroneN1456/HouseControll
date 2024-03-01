import { Body, Controller, Post } from '@nestjs/common';
import { CreateOwingDTO } from './owing.dto';
import { OwingService } from './owing.service';
import { PayOwingDTO } from './payOwing.dto';

@Controller('owing')
export class OwingController {
    constructor(private owingService: OwingService) {}

    @Post()
    async CreateOwing(@Body() createOwingDTO: CreateOwingDTO){
        return this.owingService.CreateOwing(createOwingDTO);
    }

    @Post('payOwing')
    async PayOwing(@Body() payOwingDTO: PayOwingDTO){
        return this.owingService.PayOwing(payOwingDTO);
    }
}
