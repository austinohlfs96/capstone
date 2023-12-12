import { configureStore } from "@reduxjs/toolkit"
import coachReducer from "../features/coach/coachSlice"

export const store = configureStore({
  reducer: {
    coach: coachReducer,
    // athlete: athleteRducer,
    // appointment: appointmentReducer
  }
})
