import { Body, Controller, Post } from '@nestjs/common';
import { MailDTO } from './mail.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}
  @Post()
  async SendMail(@Body() mailDTO: MailDTO) {
    return this.mailService.SendMail(mailDTO.subject, mailDTO.text, mailDTO.to);
  }
}
