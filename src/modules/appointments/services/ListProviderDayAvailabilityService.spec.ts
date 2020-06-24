
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
      date: new Date(2020, 6, 21, 13, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 6, 21, 14, 0, 0),
    })

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 21, 11).getTime();
    })


    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      month: 7,
      year: 2020,
      day: 21,
    })

    expect(availability).toEqual(expect.arrayContaining([
      { hour: 8, available: false },
      { hour: 9, available: false },
      { hour: 10, available: false },
      { hour: 11, available: false },
      { hour: 12, available: true },
      { hour: 13, available: false },
      { hour: 14, available: false },
      { hour: 15, available: true },
      { hour: 16, available: true },
      { hour: 17, available: true },
    ]));

  });

});
