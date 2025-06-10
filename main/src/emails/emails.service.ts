import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class EmailsService {
  constructor(
    private configService: ConfigService,
  ) { }

  public sendEmail() {
    const resendApiKey = this.configService.get<string>('RESEND_API_KEY');

    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY is not defined in the configuration');
    }

    const resend = new Resend(this.configService.get<string>('RESEND_API_KEY'));

    resend.emails.send({
      from: 'pmp@atlasandco.dev',
      to: 'bornasepic98@gmail.com',
      subject: 'Hello from Resend',
      text: 'This is a test email sent using Resend.',
      html: '<strong>This is a test email sent using Resend.</strong>',
    }).then((response) => {
      console.log('Email sent successfully:', response);
    }).catch((error) => {
      console.error('Error sending email:', error);
    });
  }
}
