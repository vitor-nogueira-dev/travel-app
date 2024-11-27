import { executeQuery } from "../../src/utils/executeQuery";

import { IRideSave } from "../../src/interfaces/IRide";

const saveRide = async (ride: IRideSave) => {
  const date = new Date();

  const localOffset = date.getTimezoneOffset() * 60000;

  const brasiliaOffset = -3 * 60;
  const brasiliaTime = new Date(date.getTime() + localOffset + brasiliaOffset * 60000);

  const formattedDate = brasiliaTime.toISOString().slice(0, 19).replace('T', ' ');

  return executeQuery<void>(
    'INSERT INTO rides (customer_id, date, destination, origin, distance, duration, driver_id, value) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [ride.customer_id, formattedDate, ride.destination, ride.origin, ride.distance, ride.duration, ride.driver.id, ride.value]
  );
};

export default { saveRide };