import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  fullname: "",
  username: "",
  role: "",
};
const auth = createSlice({
  initialState,
  name: "auth",
  reducers: {
    setData: (state, action) => {
      state.username = action.payload.username;
      state.fullname = action.payload.fullname;
      state.role = action.payload.role;
    },
    removeData: (state, action) => {
      state.username = "";
      state.fullname = "";
      state.role = "";
    },
  },
});
export const { setData, removeData } = auth.actions;
export default auth.reducer;
