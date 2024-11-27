import * as chai from 'chai';
import sinon from 'sinon';
import { Pool } from 'mysql2/typings/mysql/lib/Pool';

import connection from '../../src/database/connection';
import driversModel from '../../src/models/drivers.model';
import ridesModel from '../../src/models/ride.model';
import drivesServices from '../../src/services/drives.services';
import ridesServices from '../../src/services/ride.services';

import APIError from '../../src/utils/APIError';

export const stubConnection = (method: keyof Pool, returnValue: any) => {
  return sinon.stub(connection, method).resolves([returnValue]);
};

export const stubModelMethod = (method: keyof typeof driversModel | keyof typeof ridesModel, returnValue: any, isRide?: boolean) => {
  return sinon.stub(isRide ? ridesModel : driversModel, method).resolves(returnValue);
};

export const stubServiceMethod = (method: keyof typeof drivesServices | keyof typeof ridesServices, returnValue: any, isRide?: boolean) => {
  return sinon.stub(isRide ? ridesServices : drivesServices, method).resolves(returnValue);
};

export const expectError = (error: any, code: string, description: string) => {
  chai.expect(error).to.be.an('error');
  chai.expect((error as APIError).error_code).to.equal(code);
  chai.expect((error as APIError).error_description).to.equal(description);
};

export const resetStubs = () => {
  sinon.restore();
};
