
// import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

let listProviderMonthAvailability: ListProviderMonthAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;


describe('List Provider Month Availability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(fakeAppointmentsRepository);

  });

  it('should be able to list month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      user_id: '11111111',
      provider_id: 'user',
      date: new Date(2020, 5, 21, 8, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      user_id: '11111111',
      provider_id: 'user',
      date: new Date(2020, 6, 21, 8, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      user_id: '11111111',
      provider_id: 'user',
      date: new Date(2020, 6, 21, 9, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      user_id: '11111111',
      provider_id: 'user',
      date: new Date(2020, 6, 21, 10, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      user_id: '11111111',
      provider_id: 'user',
      date: new Date(2020, 6, 21, 11, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      user_id: '11111111',
      provider_id: 'user',
      date: new Date(2020, 6, 21, 12, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      user_id: '11111111',
      provider_id: 'user',
      date: new Date(2020, 6, 21, 13, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      user_id: '11111111',
      provider_id: 'user',
      date: new Date(2020, 6, 21, 14, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      user_id: '11111111',
      provider_id: 'user',
      date: new Date(2020, 6, 21, 15, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      user_id: '11111111',
      provider_id: 'user',
      date: new Date(2020, 6, 21, 16, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      user_id: '11111111',
      provider_id: 'user',
      date: new Date(2020, 6, 21, 17, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      user_id: '11111111',
      provider_id: 'user',
      date: new Date(2020, 6, 22, 8, 0, 0),
    })

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      month: 7,
      year: 2020,
    })

    expect(availability).toEqual(expect.arrayContaining([
      { day: 20, available: true },
      { day: 21, available: false },
      { day: 22, available: true },
    ]));

  });

});
