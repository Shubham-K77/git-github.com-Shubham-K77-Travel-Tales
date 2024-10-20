import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: "",
};
const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;
