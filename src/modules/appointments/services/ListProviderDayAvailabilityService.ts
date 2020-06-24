// import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import 'reflect-metadata';
import { getDaysInMonth, getDate, getHours } from 'date-fns';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { Index } from 'typeorm';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
};

type IResponse = Array<{
  hour: number;
  available: boolean;
}>

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) { };

  public async execute({ provider_id, month, year, day }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayByProvider({
      provider_id,
      month,
      year,
      day
    })

    const hourStart = 8;

    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    const availability = eachHourArray.map(hour => {
      const availableHours = appointments.filter(appointment =>
        getHours(appointment.date) === hour
      )

      return { hour: hour, available: availableHours.length < 1 }
    })


    return availability;
  }
}

export default ListProviderDayAvailabilityService;
