import { createSlice } from '@reduxjs/toolkit';

import { ITravelState } from '@/interfaces/ITravel';

const initialState: ITravelState = {
  userId: '',
  origin: '',
  destination: '',
  tripOptions: null,
  selectedDriver: null,
  drivers: [],
  travelHistory: {
    customer_id: '',
    rides: []
  },
  loading: false,
  error: null,
};

export const travelSlice = createSlice({
  name: 'travel',
  initialState,
});

export default travelSlice.reducer;

