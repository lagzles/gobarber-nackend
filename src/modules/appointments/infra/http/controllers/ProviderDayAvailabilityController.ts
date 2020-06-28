import { Response, Request } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';


export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year, day } = request.body;

    const listDayAvailability = container.resolve(ListProviderDayAvailabilityService);

    const availability = await listDayAvailability.execute({
      provider_id,
      month,
      year,
      day
    });
    return response.json(availability);
  }


};
