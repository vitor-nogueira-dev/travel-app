import * as chai from 'chai';
import { describe, it } from 'mocha';
import sinon from 'sinon';
import axios from 'axios';

import drivesServices from '../../../src/services/drives.services';
import ridesServices from '../../../src/services/ride.services';

import functions from '../../../src/utils/functions';

import { stubModelMethod, resetStubs, expectError } from '../../utils/helpers';

import { driveByMinKm, driverData } from '../mocks/data';

describe("Testing Service layer", () => {
  afterEach(resetStubs);
  describe("Testing Service Drivers layer", () => {
    it("should return all drivers when getDrivers is called", async () => {
      stubModelMethod('getDrivers', driverData);

      const result = await drivesServices.getDrivers();
      const format = functions.formatDrivers(driverData);

      chai.expect(result).to.be.an('array');
      chai.expect(result).to.deep.equal(format);
    });
    it("should return a driver by ID when getDriverById is called", async () => {
      stubModelMethod('getDriverById', [driverData[0]]);

      const result = await drivesServices.getDriverById(1);
      const format = functions.formatDrivers([driverData[0]]);

      chai.expect(result).to.be.an('object');
      chai.expect(result).to.deep.equal(format[0]);
    });
    it("should return an error when no drivers are found", async () => {
      stubModelMethod('getDriverById', []);

      try {
        await drivesServices.getDriverById(1);
      } catch (error) {
        expectError(error, 'DRIVER_NOT_FOUND', 'Motorista não encontrado');
      }
    });
    it("should return an error when driver is invalid", async () => {
      stubModelMethod('getDriverById', []);

      try {
        await drivesServices.getDriverById(999, true);
      } catch (error) {
        expectError(error, 'INVALID_DRIVER', 'Motorista inválido');
      }
    });
    it("should return true when distance is valid", async () => {
      stubModelMethod('getDriverById', driveByMinKm);

      const result = await drivesServices.validateDistanceDriver(1, 5);

      chai.expect(result).to.be.true;
    });
    it("should return an error when distance is invalid", async () => {
      stubModelMethod('getDriverById', driveByMinKm);

      try {
        const result = await drivesServices.validateDistanceDriver(1, 1);
        chai.expect(result).to.be.true;
      } catch (error) {
        expectError(error, 'INVALID_DISTANCE', 'Quilometragem inválida para o motorista');
      }
    });
    it("should return drivers with minimum distance of 5km when getDriversByMinKm is called", async () => {
      stubModelMethod('getDriversByMinKm', [driverData[0]]);

      const result = await drivesServices.getDriversByMinKm(5);

      chai.expect(result).to.be.an('array');
      chai.expect(result).to.deep.equal(functions.formatDrivers([driverData[0]]));
    });
  });
});