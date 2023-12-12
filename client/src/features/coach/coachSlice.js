import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  data: null,
  errors: [],
  loading: true
}

const coachSlice = createSlice({
  name: "coach",
  initialState,
  reducers: {
    setCurrentCoach(state, action) {
      state.loading = false
      state.data = action.payload
    },
    logout(state) {
      state.data = null
    },
    addError(state, action) {
      state.loading = false
      state.errors.push(action.payload)
    },
    clearAllErrors(state, action) {
      state.loading = false
      state.errors = []
    },
    patchCoach(state, action) {
      state.loading = false
      state.data = action.payload
    },
    deleteCoach(state, action) {
      state.loading = false
      state.data = null
    },
    addAthleteToCoach(state, action) {
      state.loading = false
      state.data.athletes.push(action.payload)
      state.errors = []
    },
    deleteAthleteToCoach(state, action) {
      const athleteIdToRemove = action.payload;
      debugger
      state.loading = false
      state.data.athletes = state.data.athletes.filter(
        (athlete) => athlete.id !== athleteIdToRemove
      );
      state.errors = []
    },
    patchAthlete(state, action) {
      const updatedAthlete = action.payload;
      state.loading = false;
      state.data.athletes = state.data.athletes.map((athlete) =>
        athlete.id === updatedAthlete.id ? updatedAthlete : athlete
      );
      state.errors = [];
    },
    addAppointmentsToCoach(state, action) {
      state.loading = false
      state.data.appointment.push(action.payload)
      state.errors = []
    },
    deleteAppointmentsToCoach(state, action) {
      const appointmentIdToRemove = action.payload;
      state.loading = false
      state.data.appointment = state.data.appointment.filter(
        (appointment) => appointment.id !== appointmentIdToRemove
      );
      state.errors = []
  },
    patchAppointment(state, action) {
      const updatedAppointment = action.payload;
      state.loading = false;
      state.data.appointment = state.data.appointment.map((appointments) =>
        appointments.id === updatedAppointment.id ? updatedAppointment : appointments
      );
      state.errors = [];
  }
  }
})

export const {setCurrentCoach, logout, addErrors, clearAllErrors, patchCoach, deleteCoach, addAthleteToCoach, deleteAthleteToCoach, patchAthlete, addAppointmentsToCoach, deleteAppointmentsToCoach, patchAppointment} = coachSlice.actions

export default coachSlice.reducer