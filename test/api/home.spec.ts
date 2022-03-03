import request from 'supertest';
import { StatusCodes } from 'http-status-codes';

import app from '../../src/app';

describe('Home Workflow', () => {
  test('should get successfully with valid search string.', () => {
    const expectedResponse = {
      status: StatusCodes.OK,
      search: 'White Bear Yard',
      location: {
        city: 'London',
        lat: 51.5222691,
        lng: -0.1098115,
        serviceArea: 'LONCENTRAL',
        postcode: 'EC1R 5DP'
      }
    };

    return request(app)
      .get('/?search=White Bear Yard')
      .then((res) => {
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body).toEqual(expectedResponse);
      });
  });

  test('should fail with invalid search string.', () => {
    const expectedResponse = {
      code: StatusCodes.NOT_FOUND,
      message: 'Non-existing address'
    };

    return request(app)
      .get('/?search=asdf')
      .then((res) => {
        expect(res.status).toBe(StatusCodes.NOT_FOUND);
        expect(res.body).toEqual(expectedResponse);
      });
  });

  test('should fail with valid search string outside service area.', () => {
    const expectedResponse = {
      code: StatusCodes.NOT_FOUND,
      message: 'Out of service area'
    };

    return request(app)
      .get('/?search=berlin')
      .then((res) => {
        expect(res.status).toBe(StatusCodes.NOT_FOUND);
        expect(res.body).toEqual(expectedResponse);
      });
  });
});
