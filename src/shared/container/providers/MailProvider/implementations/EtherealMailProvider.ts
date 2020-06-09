import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from '../models/IMailProvider';
// import AppError from '@shared/errors/AppError';

export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {

      const transporter = nodemailer.createTransport({
        // host: account.smtp.host, // PQ ESSE ERRO?!?!
        // port: account.smtp.port,
        secure: account.smtp.secure,
        // aut: {
        //   user: account.user,
        //   pass: account.pass,
        // },
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'herta.harvey@ethereal.email',
          pass: 'JGURKk7KzunuzkQCE3'
        }



      });

      this.client = transporter;
    });

  }

  public async sendMail(to: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      from: 'Equipe GoBarber <equipe@gobarber.com.br>',
      to,
      subject: 'Recuperação de senha',
      text: body,
    });

    console.log('Mensage enviada: %s', message.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))

  }

}
