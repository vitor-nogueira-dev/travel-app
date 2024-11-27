import * as chai from 'chai';
import { describe, it } from 'mocha';

import driverModel from '../../../src/models/drivers.model';
import ridesModel from '../../../src/models/ride.model';

import { resetStubs, stubConnection } from '../../utils/helpers';

import { drivers, ride, ridesByCustomer, rideResultByCustomer, rideByCustomerAndDriver, rideResultByCustomerAndDriver } from '../mocks/data';

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

  describe("Testing Model Rides layer", () => {
    it("should save a ride when saveRide is called", async () => {
      stubConnection('execute', ride)

      const result = await ridesModel.saveRide(ride);

      chai.expect(result).to.be.an('object');
      chai.expect(result).to.deep.equal(ride);
    });

    it("should return rides by customer ID when getRidesByCustomerId is called", async () => {
      stubConnection('execute', ridesByCustomer)

      const result = await ridesModel.getRidesByCustomerIdAndDriverId(1);

      chai.expect(result).to.be.an('array');
      chai.expect(result).to.deep.equal(rideResultByCustomer.rides);
    });

    it("should return rides by customer ID and driver ID when getRidesByCustomerIdAndDriverId is called", async () => {
      stubConnection('execute', rideByCustomerAndDriver)

      const result = await ridesModel.getRidesByCustomerIdAndDriverId(1, 3);

      chai.expect(result).to.be.an('array');
      chai.expect(result).to.deep.equal(rideResultByCustomerAndDriver);
    });

    it("should return an empty array when no rides are found for a customer", async () => {
      stubConnection('execute', [])

      const result = await ridesModel.getRidesByCustomerIdAndDriverId(999);

      chai.expect(result).to.be.an('array').that.is.empty;
    });
  });
});

