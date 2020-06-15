import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';
import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
// import AppError from '@shared/errors/AppError';

@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailProvider')
    private mailTemplateProvider: IMailTemplateProvider,

  ) {
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

  public async sendMail({ to, from, subject, templateData }: ISendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe GoBarber',
        address: from?.email || 'equipe@gobarber.com.br'
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

    console.log('Mensage enviada: %s', message.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))

  }

}
