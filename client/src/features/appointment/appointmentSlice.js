import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  data: null,
  errors: [],
  loading: true
}

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    setCurrentAppointment(state, action) {
      state.loading = false
      debugger
      state.data = action.payload
    },
    addServiceToAppointment(state, action) {
      state.loading = false
      state.data.athlete_services = [...state.data.athlete_services, action.payload];
      state.errors = []
    },
    patchAthleteService(state, action) {
      console.log('Action payload:', action.payload);
      debugger
      const updatedAthleteService = action.payload;
      console.log('Updated athlete service:', updatedAthleteService);
      debugger
      state.loading = false;
      state.data.athlete_services = state.data.athlete_services.map((service) =>
        service.id === updatedAthleteService.id ? updatedAthleteService : service
      );
    
      console.log('State after update:', state);
    },
  }
})

export const {setCurrentAppointment, addServiceToAppointment, patchAthleteService} = appointmentSlice.actions

export default appointmentSlice.reducer