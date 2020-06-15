import IParteMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ template, variables }: IParteMailTemplateDTO): Promise<string> {

    return '';
  };

};

export default FakeMailTemplateProvider;
