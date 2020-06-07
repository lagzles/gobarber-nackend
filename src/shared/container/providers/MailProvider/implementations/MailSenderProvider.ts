import IMailProvider from '../models/IMailProvider';

class MailSenderProvider implements IMailProvider {
  public async sendMail(to: string, body: string): Promise<void> {

  }

}

export default MailSenderProvider;
