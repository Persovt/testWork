import { createSlice } from "@reduxjs/toolkit";
export type StateType = {
  data: Object;
};
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: {},
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload.data;
    },
  },
});

export const { setData } = authSlice.actions;

export default authSlice.reducer;
