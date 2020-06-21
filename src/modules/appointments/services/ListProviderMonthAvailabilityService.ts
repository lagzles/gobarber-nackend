import AppError from '@shared/errors/AppError';
import 'reflect-metadata';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import { injectable, inject } from 'tsyringe';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
};

type IResponse = Array<{
  day: number;
  available: boolean;
}>

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) { };

  public async execute({ provider_id, month, year }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMonthByProvider({
      provider_id,
      month,
      year
    })

    return [{ day: 1, available: false }];
  }
}

export default ListProviderMonthAvailabilityService;
