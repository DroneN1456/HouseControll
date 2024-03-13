import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  async SendMail(subject: string, text: string, to: string) {
    console.log('cade dog');
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    transporter.sendMail(
      {
        from: process.env.MAIL_USER,
        to: to,
        subject: subject,
        text: text,
      },
      (err) => {
        if (err) {
          throw new Error('Um erro inesperado ocorreu');
        }
      },
    );
  }
}
