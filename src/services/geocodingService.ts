import NodeGeocoder, { Entry } from 'node-geocoder';

import logger from '../utils/logger';
import config from '../config/config';
import NotFoundError from '../exceptions/NotFoundError';

const { errors } = config;

const geocoder = NodeGeocoder({
  provider: 'google',
  apiKey: config.geocode.googleApiKey
});

export const getCoordsFromAddress = async (
  address: string
): Promise<Entry[]> => {
  logger.log('info', 'Geocoding service: Fetching coordinates for -', address);

  const coordinates = await geocoder.geocode({ address });

  if (coordinates.length === 0) {
    throw new NotFoundError(errors.coordinatesNotfound);
  }

  logger.log(
    'debug',
    'Geocoding service: Coordinates fetch success -',
    coordinates
  );

  return coordinates;
};
