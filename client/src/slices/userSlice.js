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
  },
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;
