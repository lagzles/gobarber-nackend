import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';


describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123123',
    });


    expect(appointment).toHaveProperty('id');
  });

  // it('should be able to create a new appointment', () => {
  //   expect().toBe();
  // });

  // it('should be able to create a new appointment', () => {
  //   expect().toBe();
  // });

});
