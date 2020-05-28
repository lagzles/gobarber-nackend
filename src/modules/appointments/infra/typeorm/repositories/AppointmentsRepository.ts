import { EntityRepository, Repository } from 'typeorm';

import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> implements IAppointmentsRepository {
  // TYPEORM possui um metodo proprio de pegar todos
  // public all(): Appointment[] {
  //   return this.appointments;
  // }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment;
  }
  // TYPEORM possui um metodo create proprio
  // public create({ provider, date }: CreateAppointmentDTO): Appointment {
  //   const appointment = new Appointment({ provider, date });

  //   this.appointments.push(appointment);

  //   return appointment;
  // }
}

export default AppointmentsRepository;
