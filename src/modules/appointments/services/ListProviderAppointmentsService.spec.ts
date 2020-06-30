
// import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

let listProviderAppointmentsService: ListProviderAppointmentsService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;


describe('List Provider Appointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    listProviderAppointmentsService = new ListProviderAppointmentsService(fakeAppointmentsRepository);

  });

  it('should be able to list the providers appointments from the day', async () => {

    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 8, 21, 13, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 8, 21, 14, 0, 0),
    })

    const appointments = await listProviderAppointmentsService.execute({
      provider_id: 'provider',
      month: 9,
      year: 2020,
      day: 21,
    })

    expect(appointments).toEqual([
      appointment1,
      appointment2,
    ]);

  });

});
