import pointInPolygon from 'point-in-polygon';

import logger from '../utils/logger';
import config from '../config/config';
import NotFoundError from '../exceptions/NotFoundError';
import londonDistrictsGeo from '../resources/constants/londonDistrictsGeo.json';

const { errors } = config;

export const getDistrictFromCoords = (
  latitude: number,
  longitude: number
): string | void => {
  logger.log(
    'info',
    `Districs Location Service: Getting district for: ${latitude} ${longitude}`
  );

  const district = londonDistrictsGeo.features.find((feat) => {
    const [polygon] = feat.geometry.coordinates;

    return pointInPolygon([longitude, latitude], polygon);
  });

  if (!district) {
    throw new NotFoundError(errors.outOfServiceArea);
  }

  return district?.properties.Name;
};
