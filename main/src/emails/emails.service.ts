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

  public sendPasswordResetEmail(email: string, token: string) {
    const resend = new Resend(this.configService.get<string>('RESEND_API_KEY'));

    resend.emails.send({
      from: 'pmp@atlasandco.dev',
      to: email,
      subject: 'Password Reset Request',
      html: `
        <p>Dear User,</p>
        <p>We received a request to reset your password. If you did not make this request, please ignore this email.</p>
        <p>To reset your password, please click the link below:</p>
        <p><a href="${this.configService.get<string>('FRONTEND_URL')}/reset-password?token=${token}">Reset Password</a></p>
        <p>If you have any questions, feel free to contact our support team.</p>
      `
    })
  }
}
