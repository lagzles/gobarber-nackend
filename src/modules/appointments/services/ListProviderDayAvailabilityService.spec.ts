
// import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

let listProviderDayAvailability: ListProviderDayAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;


describe('List Provider Day Availability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    listProviderDayAvailability = new ListProviderDayAvailabilityService(fakeAppointmentsRepository);

  });

  it('should be able to list day availability from provider', async () => {

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 6, 21, 8, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 6, 21, 10, 0, 0),
    })


    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      month: 7,
      year: 2020,
      day: 21,
    })

    expect(availability).toEqual(expect.arrayContaining([
      { hour: 8, available: false },
      { hour: 9, available: true },
      { hour: 10, available: false },
    ]));

  });

});
