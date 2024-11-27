import * as chai from 'chai';
import { describe, it } from 'mocha';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import rideModel from '../../../src/models/ride.model';
import ridesController from '../../../src/controllers/ride.controller';

import { mockExpress, resetStubs, stubModelMethod, stubServiceMethod } from '../../utils/helpers';

import { drivers, rideBodyConfirm, rideEstimate, rideResultByCustomer } from '../mocks/data';

chai.use(sinonChai);

describe("Testing Controller layer", () => {
  afterEach(resetStubs);

  describe("Testing Service Rides layer", () => {
    it("Should return ride estimates", async () => {
      const { req, res, next } = mockExpress({
        body: {
          customer_id: 1,
          origin: "Rua Vitalino Rosa de Carvalho, 42, Cristiano Otoni",
          destination: "Rua José Josino de Oliveira, 6, Barbacena"
        }
      });

      const getRideEstimatesStub = stubServiceMethod('getRideEstimates', rideEstimate, true);

      await ridesController.getRideEstimates(req, res, next);

      chai.expect(res.status).to.have.been.calledWith(200);
      chai.expect(res.json).to.have.been.calledWith(rideEstimate);
      sinon.assert.calledOnce(getRideEstimatesStub);
    });

    it("Should confirm ride", async () => {
      const { req, res, next } = mockExpress({
        body: rideBodyConfirm,
      });
      const confirmRideStub = stubServiceMethod('getDriverById', drivers[0]);
      const validateDistanceDriverStub = stubServiceMethod('validateDistanceDriver', true);

      stubModelMethod('saveRide', rideResultByCustomer, true);

      await ridesController.confirmRide(req, res, next);

      chai.expect(res.status).to.have.been.calledWith(200);
      chai.expect(res.json).to.have.been.calledWith({ "success": true });
      sinon.assert.calledOnce(confirmRideStub);
      sinon.assert.calledOnce(validateDistanceDriverStub);
      sinon.assert.calledOnce(rideModel.saveRide);
    });

    it("Should return rides by customer ID and driver ID", async () => {
      const { req, res, next } = mockExpress({
        params: { customer_id: '1' },
        query: { driver_id: '1' },
      });

      const getDriverByIdStub = stubServiceMethod('getDriverById', drivers[0]);
      const getRidesByCustomerIdAndDriverIdStub = stubServiceMethod('getRidesByCustomerIdAndDriverId', rideResultByCustomer.rides, true);

      await ridesController.getRidesByCustomerIdAndDriverId(req, res, next);

      chai.expect(res.status).to.have.been.calledWith(200);
      chai.expect(res.json).to.have.been.calledWith(rideResultByCustomer);
      sinon.assert.calledOnce(getDriverByIdStub);
      sinon.assert.calledOnce(getRidesByCustomerIdAndDriverIdStub);
    });

    it("Should return all drivers", async () => {
      const { req, res, next } = mockExpress();

      const getDriversStub = stubServiceMethod('getDrivers', drivers);

      await ridesController.getDrivers(req, res, next);

      chai.expect(res.status).to.have.been.calledWith(200);
      chai.expect(res.json).to.have.been.calledWith(drivers);
      sinon.assert.calledOnce(getDriversStub);
    });
  });
});
