import { startOfHour } from 'date-fns';
// import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
// import AppointmentsRepository from '@modules/appointments/infra/repositories/AppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  // private appointmentsRepository: IAppointmentsRepository;

  // constructor(
  //   appointmentsRepository: IAppointmentsRepository
  // ) {
  //   this.appointmentsRepository = appointmentsRepository
  // }

  constructor(
    private appointmentsRepository: IAppointmentsRepository
  ) {
  }

  public async execute({
    provider_id,
    date,
  }: IRequestDTO): Promise<Appointment> {
    // const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInDate) {
      throw new AppError('Agendamento não é valido. horario ocupado');
    }

    const appointment = this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });


    return appointment;
  }
}

export default CreateAppointmentService;
