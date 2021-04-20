import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: {},
    house: {},
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload.data;
    },
    setHouse: (state, action) => {
      state.house = action.payload.data;
    },
  },
});

export const { setData, setHouse } = authSlice.actions;

export default authSlice.reducer;
