import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { ITravelHistory, ITravelState } from '@/interfaces/ITravel';
import { IDriver } from '@/interfaces/IDriver';

const api = axios.create({
  baseURL: 'http://localhost:8080/ride',
  headers: {
    'Content-Type': 'application/json',
  },
});

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

export const fetchTripOptions = createAsyncThunk(
  'travel/fetchTripOptions',
  async (_, { getState, rejectWithValue }) => {
    const { travel } = getState() as { travel: ITravelState };
    try {
      const body = {
        customer_id: travel.userId,
        origin: travel.origin,
        destination: travel.destination,
      }
      const response = await api.post('/estimate', body);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createTrip = createAsyncThunk(
  'travel/createTrip',
  async (_, { getState, rejectWithValue }) => {
    const { travel } = getState() as { travel: ITravelState };
    try {
      const body = {
        customer_id: travel.userId,
        origin: travel.origin,
        destination: travel.destination,
        distance: travel.tripOptions?.distance,
        duration: travel.tripOptions?.duration,
        driver: {
          id: travel.selectedDriver?.id,
          name: travel.selectedDriver?.name,
        },
        value: travel.selectedDriver?.value,
      }
      await api.patch('/confirm', body);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchTravelHistory = createAsyncThunk(
  'travel/fetchTravelHistory',
  async (driverId: string | undefined, { getState, rejectWithValue }) => {
    const { travel } = getState() as { travel: ITravelState };
    try {
      const url = driverId && driverId !== '-1' ? `/${travel.userId}?driver_id=${driverId}` : `/${travel.userId}`;
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchDrivers = createAsyncThunk(
  'travel/fetchDrivers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/drivers');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue((error as Error).message);
    }
  }
);

export const travelSlice = createSlice({
  name: 'travel',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setOrigin: (state, action: PayloadAction<string>) => {
      state.origin = action.payload;
    },
    setDestination: (state, action: PayloadAction<string>) => {
      state.destination = action.payload;
    },
    setSelectedDriver: (state, action: PayloadAction<IDriver>) => {
      state.selectedDriver = action.payload;
    },
    setTravelHistory: (state, action: PayloadAction<ITravelHistory>) => {
      state.travelHistory = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTripOptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTripOptions.fulfilled, (state, action) => {
        state.loading = false;
        state.tripOptions = action.payload;
      })
      .addCase(fetchTripOptions.rejected, (state, action) => {
        state.loading = false;
        state.loading = false;

        const error = action.payload as { error_description?: string };
        state.error = error?.error_description || 'Erro ao buscar as opções de viagem';
        state.tripOptions = null;
      })
      .addCase(createTrip.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTrip.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createTrip.rejected, (state, action) => {
        state.loading = false;
        state.loading = false;

        const error = action.payload as { error_description?: string };
        state.error = error?.error_description || 'Erro ao criar a viagem';
      })
      .addCase(fetchTravelHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTravelHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.travelHistory = action.payload;
      })
      .addCase(fetchTravelHistory.rejected, (state, action) => {
        state.loading = false;

        const error = action.payload as { error_description?: string };
        state.error = error?.error_description || 'Erro ao buscar o histórico de viagens';
        state.travelHistory = {
          customer_id: '',
          rides: []
        }
      })
      .addCase(fetchDrivers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDrivers.fulfilled, (state, action) => {
        state.loading = false;
        state.drivers = [{ name: 'Todos os Motoristas', id: -1 }, ...action.payload];
      });
  },
});

export const { setUserId, setOrigin, setDestination, setSelectedDriver, setTravelHistory } = travelSlice.actions;

export default travelSlice.reducer;

