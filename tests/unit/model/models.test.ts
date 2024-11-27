import * as chai from 'chai';
import { describe, it } from 'mocha';

import driverModel from '../../../src/models/drivers.model';

import { resetStubs, stubConnection } from '../../utils/helpers';

import { drivers } from '../mocks/data';

describe("Testing Model layer", () => {
  afterEach(resetStubs);
  describe("Testing Model Drivers layer", () => {
    it("should return all drivers when getDrivers is called", async () => {
      stubConnection('execute', drivers)

      const result = await driverModel.getDrivers();
      chai.expect(result).to.be.an('array');
      chai.expect(result).to.deep.equal(drivers);
    });

    it("should return a driver by ID when getDriverById is called", async () => {
      stubConnection('execute', drivers[0])

      const result = await driverModel.getDriverById(1);

      chai.expect(result).to.be.an('object');
      chai.expect(result).to.deep.equal(drivers[0]);
    });

    it("should return drivers with minimum distance of 1km when getDriversByMinKm is called", async () => {
      stubConnection('execute', drivers[0])

      const result = await driverModel.getDriversByMinKm(1);

      chai.expect(result).to.be.an('object');
      chai.expect(result).to.deep.equal(drivers[0]);
    });

    it("should return an empty array when no drivers are found", async () => {
      stubConnection('execute', [])

      const result = await driverModel.getDrivers();

      chai.expect(result).to.be.an('array').that.is.empty;
    });
  });
});

