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
      state.data.athlete_services.push(action.payload)
      state.errors = []
    },
  }
})

export const {setCurrentAppointment, addServiceToAppointment} = appointmentSlice.actions

export default appointmentSlice.reducer