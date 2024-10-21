import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null, // Change to null for better type checking
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userData = action.payload; // Set user data
    },
    clearUserInfo: (state) => {
      state.userData = null; // Clear user data on logout
    },
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
