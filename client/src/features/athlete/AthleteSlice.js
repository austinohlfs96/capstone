import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  data: null,
  errors: [],
  loading: true
}

const athleteSlice = createSlice({
  name: "athlete",
  initialState,
  reducers: {
    setCurrentAthlete(state, action) {
      state.loading = false
      state.data = action.payload
    },
    addError(state, action) {
      state.loading = false
      state.errors.push(action.payload)
    },
    clearAllErrors(state, action) {
      state.loading = false
      state.errors = []
    },
    patchAthlete(state, action) {
      state.loading = false
      state.data = action.payload
    },
    deleteAthlete(state, action) {
      state.loading = false
      state.data = null
    },
    addEquipmentToAthlete(state, action) {
      state.loading = false
      state.data.equipment.push(action.payload)
      state.errors = []
    },
  }
})

export const {setCurrentAthlete, addErrors, clearAllErrors, patchAthlete, deleteAthlete, addEquipmentToAthlete} = athleteSlice.actions

export default athleteSlice.reducer