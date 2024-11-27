import { NextFunction, Request, Response } from 'express';

import { ERROR_CODE_INVALID_DATA, DESCRIPTION_INVALID_DATA } from '../utils/constants';

import APIError from '../utils/APIError';


const hasCustomerBody = (req: Request, _res: Response, next: NextFunction): void => {
  const { customer_id } = req.body;

  if (!customer_id) {
    return next(new APIError(ERROR_CODE_INVALID_DATA, DESCRIPTION_INVALID_DATA, 400));
  }

  next();
};

const hasAddress = (req: Request, _res: Response, next: NextFunction): void => {
  const { origin, destination } = req.body;

  if (!origin || !destination) {
    return next(new APIError(ERROR_CODE_INVALID_DATA, DESCRIPTION_INVALID_DATA, 400));
  }

  next();
};

const addressIsTheSame = (req: Request, _res: Response, next: NextFunction): void => {
  const { origin, destination } = req.body;

  if (origin === destination) {
    return next(new APIError(ERROR_CODE_INVALID_DATA, DESCRIPTION_INVALID_DATA, 400));
  }

  next();
};

const hasDriver = (req: Request, _res: Response, next: NextFunction): void => {
  const { driver } = req.body;

  if (!driver.id || !driver.name) {
    return next(new APIError(ERROR_CODE_INVALID_DATA, DESCRIPTION_INVALID_DATA, 400));
  }

  next();
}

const hasDistance = (req: Request, _res: Response, next: NextFunction): void => {
  const { distance } = req.body;

  if (!distance) {
    return next(new APIError(ERROR_CODE_INVALID_DATA, DESCRIPTION_INVALID_DATA, 400));
  }

  next();
}


export { hasAddress, hasCustomerBody, addressIsTheSame, hasDriver, hasDistance };
