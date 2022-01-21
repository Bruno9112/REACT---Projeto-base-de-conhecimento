import { createSlice, configureStore } from '@reduxjs/toolkit'

export const toggleMenuSlice = createSlice({
  name: 'togglemenu',
  initialState: {
    isMenuVisible: true,
    user: {
      name: "Usuário Mock",
      email: "mock@email.com"
    }
  },
  reducers: {
    changeToggle: (state, action) => {
      if (action.payload === undefined) {
        state.isMenuVisible = !state.isMenuVisible
      } else {
        state.isMenuVisible = action.payload
      }
    }
  }
})

export const { changeToggle } = toggleMenuSlice.actions

export const menuState = state => state.isMenuVisible
export const userState = state => state.user

export default configureStore({
  reducer: toggleMenuSlice.reducer
})
