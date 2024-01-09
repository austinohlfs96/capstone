import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";
import { getToken, getRefreshToken } from "../../utils/main";

export const createSlice = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
})

const initialState = {
    data: null,
    errors: [],
    loading: true
}


const register = async ({values}, ) => {
  
    try {
        const response = await fetch('http://127.0.0.1:5555/auth/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        })
        const data = await response.json()
        if (response.ok) {
            return data
        } else {
            throw data.message    
        }
    } catch (error) {
        return error
    }
}
const fetchMe = async () => {
    try {
        const resp = await fetch("http://127.0.0.1:5555//auth/me", {
            headers: {
                "Authorization": `Bearer ${getToken()}` 
            }
        })
        const data = await resp.json()
        if (resp.ok) {
            return {coach: data, flag: "me"}
        } else {
            const response = await fetch("/auth/refresh", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${getRefreshToken()}`
                }
            })
            const data = await response.json()
            if (response.ok) {
                return {...data, flag: "refresh"}
            } else {
                throw data.msg
            }
        }
    } catch (error) {
        return error
    }
}

const coachSlice = createSlice({
  name: "coach",
  initialState,
  reducers: (create) => ({
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
      state.data.appointment = state.data.appointment.map((appointment) =>
        appointment.id === updatedAppointment.id ? updatedAppointment : appointment
      );
      state.errors = [];
  },
  deleteAthleteService(state, action) {
    const { appointmentId, serviceId } = action.payload;

    // Find the appointment by ID
    const appointment = state.data.appointment.find(app => app.id === appointmentId);

    if (appointment) {
      // Find the athlete service by ID and remove it
      appointment.athlete_services = appointment.athlete_services.filter(
        (service) => service.id !== serviceId
      );
    }

    state.loading = false;
    state.errors = [];
  },

  fetchCurrentUser: create.asyncThunk(
    fetchMe,
    {
        pending: (state) => {
            state.loading = true
            state.errors = []
        },
        rejected: (state, action) => {
            state.loading = false
            state.errors.push(action.payload)
        },
        fulfilled: (state, action) => {
            state.loading = false
            if (typeof action.payload === "string") {
                state.errors.push(action.payload)
            } else {
                state.data = action.payload.coach
            }
        },
    }
),
fetchRegister: create.asyncThunk(
    register,
    {
        pending: (state) => {
            state.loading = true
            state.errors = []
        },
        rejected: (state, action) => {
            state.loading = false
            state.errors.push(action.payload)
        },
        fulfilled: (state, action) => {
            state.loading = false
            if (typeof action.payload === "string") {
                state.errors.push(action.payload)
            } else {
                state.data = action.payload.coach
            }
        },
    }
)
  
}),
selectors: {
  selectUser(state){
      return state.data
  },
  selectErrors(state){
      return state.errors
  }
}

});
  
 

export const {setCurrentCoach, logout, addError, clearAllErrors, patchCoach, deleteCoach, addAthleteToCoach, deleteAthleteToCoach, patchAthlete, addAppointmentsToCoach, deleteAppointmentsToCoach, patchAppointment, patchAppointmentsAthleteServices, fetchCurrentUser, fetchRegister, deleteAthleteService} = coachSlice.actions

export const {selectUser, selectErrors} = coachSlice.selectors

export default coachSlice.reducer