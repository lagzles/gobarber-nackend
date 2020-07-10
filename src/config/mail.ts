interface IMailConfig {
  driver: 'ses' | 'ethereal';
  defaults: {
    from: {
      email: string;
      name: string;
    }
  }
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'contato@lagzles.page',
      name: 'Contato LAG',
    },
  }
} as IMailConfig;
