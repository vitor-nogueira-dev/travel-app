import sinon from 'sinon';
import { Pool } from 'mysql2/typings/mysql/lib/Pool';

import connection from '../../src/database/connection';

export const stubConnection = (method: keyof Pool, returnValue: any) => {
  return sinon.stub(connection, method).resolves([returnValue]);
};

export const resetStubs = () => {
  sinon.restore();
};
