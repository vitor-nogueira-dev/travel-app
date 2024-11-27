import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';

import driverRoutes from './routes/ride.routes';

import APIError from './utils/APIError';
import { STATUS_CODE_INTERNAL_SERVER_ERROR } from './utils/constants';

const app = express();

const access: express.RequestHandler = (_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', '*');
  next();
}

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(access);

app.use('/ride', driverRoutes);

const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof APIError) {
    res.status(err.statusCode).json({
      error_code: err.error_code,
      error_description: err.error_description,
    });
  } else {
    res.status(STATUS_CODE_INTERNAL_SERVER_ERROR).json({
      error_code: "INTERNAL_SERVER_ERROR",
      error_description: "An unexpected error occurred.",
    });
  }
};

app.use(errorHandler);


export default app;