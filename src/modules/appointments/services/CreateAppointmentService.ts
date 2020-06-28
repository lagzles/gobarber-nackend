import { startOfHour, isBefore, getHours } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import { th } from 'date-fns/locale';

interface IRequestDTO {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {

  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {
  }

  public async execute({
    provider_id,
    user_id,
    date,
  }: IRequestDTO): Promise<Appointment> {
    // const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('Data de agendamento não valida. Por favor inserir uma data que ainda não passou');
    }

    if (user_id === provider_id) {
      throw new AppError('Não se pode realizar agendamentos consigo mesmo! ')
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError("Não pode criar agendamentos antes das 8h e depois das 17h")
    }

    const findAppointmentInDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );


    if (findAppointmentInDate) {
      throw new AppError('Agendamento não é valido. horario ocupado');
    }

    const appointment = this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
