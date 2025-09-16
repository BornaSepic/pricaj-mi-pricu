import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { Reading } from '../readings/entities/reading.entity';
import * as fs from 'fs'
import jsonCsv from '@iwsio/json-csv-node'
import { convertCsvToXlsx } from '@aternus/csv-to-xlsx';

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
    })
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
        <p><a href="${this.configService.get<string>('FRONTEND_URL')}/auth/reset-password?token=${token}">Reset Password</a></p>
        <p>If you have any questions, feel free to contact our support team.</p>
      `
    })
  }

  public sendReadingsReport(email: string, readings: Reading[]) {
    const resend = new Resend(this.configService.get<string>('RESEND_API_KEY'));

    jsonCsv.buffered(readings.map(reading => {
      const date = new Date(reading.date)
      const formattedDate = date.toLocaleDateString('hr')

      return ({
        name: reading.user?.name || 'N/A',
        email: reading.user?.email || 'N/A',
        phone: reading.user?.phone || 'N/A',
        date: formattedDate,
        department: reading.department.name,
        report: reading.report?.description || 'N/A'
      })
    }), {
      //field definitions for CSV export
      fields:
        [
          {
            name: 'name',
            label: 'Ime'
          },
          {
            name: 'email',
            label: 'Email'
          },
          {
            name: 'phone',
            label: 'Mobitel'
          },
          {
            name: 'date',
            label: 'Datum čitanja'
          },
          {
            name: 'department',
            label: 'Odjel'
          },
          {
            name: 'report',
            label: 'Izvještaj'
          }
        ],

      // Other default options:
      fieldSeparator: ","
      , ignoreHeader: false
      , buffered: true
      , encoding: "utf8"
    }, (err, csv) => {
      console.log(err, csv)
      if (!csv) {
        return null
      }

      // Check if static dir exists, and make it if not
      if (!fs.existsSync('./static')) {
        fs.mkdirSync('./static');
      }

      fs.writeFileSync(`./static/readings-report-${new Date().toDateString()}.csv`, csv);

      let source = `./static/readings-report-${new Date().toDateString()}.csv`;
      let destination = `./static/readings-report-${new Date().toDateString()}.xlsx`;
      try {
        convertCsvToXlsx(source, destination)

        const fileContents = fs.readFileSync(destination).toString('base64')

        resend.emails.send({
          from: 'pmp@atlasandco.dev',
          to: email,
          subject: 'Izvještaj',
          html: `
        <p>Dear User,</p>
        <p>Your report has been attached with this email.</p>
        <p>If you have any questions, feel free to contact our support team.</p>
      `,
          attachments: [{
            content: fileContents,
            filename: `readings-report-${new Date().toDateString()}.xlsx`
          }]
        }).then(() => {
          fs.unlinkSync(`./${destination}`);
          fs.unlinkSync(`./${source}`);
        });
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err.toString());
        }
      }
    })
  }
}
