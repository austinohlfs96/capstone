import { configureStore } from "@reduxjs/toolkit"
import coachReducer from "../features/coach/coachSlice"
import appointmentReducer from '../features/appointment/appointmentSlice'
import athleteReducer from '../features/athlete/AthleteSlice'

export const store = configureStore({
  reducer: {
    coach: coachReducer,
    athlete: athleteReducer,
    appointment: appointmentReducer
  }
})
