import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  errors: [],
  loading: true
}

const athleteServiceSlice = createSlice({
  name: 'athleteService',
  initialState,
  reducers: {
    patchAthleteService(state, action) {
      const { payload } = action;
      return {
        ...state,
        loading: false,
        data: payload,
      };
    },
  },
});

export const { patchAthleteService } = athleteServiceSlice.actions;

export default athleteServiceSlice.reducer;
