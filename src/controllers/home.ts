import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

// import SearchPayload from '../domain/requests/SearchPayload';
import * as geocodingService from '../services/geocodingService';
import * as districsLocationService from '../services/districsLocationService';

/**
 * Handle / GET request, responds API information.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {void}
 */
export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const search = req.query.search as string;
    const [coordinates] = await geocodingService.getCoordsFromAddress(search);
    const district = districsLocationService.getDistrictFromCoords(
      coordinates?.latitude || 0,
      coordinates?.longitude || 0
    );

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      search,
      location: {
        city: coordinates.city,
        lat: coordinates.latitude,
        lng: coordinates.longitude,
        serviceArea: district,
        postcode: coordinates.zipcode
      }
    });
  } catch (err) {
    next(err);
  }
};
