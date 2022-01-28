import { createSlice, configureStore } from '@reduxjs/toolkit'
import axios from 'axios'

export const toggleMenuSlice = createSlice({
  name: 'togglemenu',
  initialState: {
    isMenuVisible: false,
    user: null
  },
  reducers: {
    changeToggle: (state, action) => {
      if(!state.user){
        state.isMenuVisible = false
        return
      }

      if (action.payload === undefined) {
        state.isMenuVisible = !state.isMenuVisible
      } else {
        state.isMenuVisible = action.payload
      }
    },
    setUser: (state, action) => {
      state.user = action.payload
      if(action.payload){
          axios.defaults.headers.common["Authorization"] = `bearer ${action.payload.token}`
      }else{
          delete axios.defaults.headers.common["Authorization"]
          state.isMenuVisible = false
      }
    }
  }
})

export const { changeToggle, setUser } = toggleMenuSlice.actions

export const menuState = state => state.isMenuVisible
export const userState = state => state.user

export default configureStore({
  reducer: toggleMenuSlice.reducer
})
