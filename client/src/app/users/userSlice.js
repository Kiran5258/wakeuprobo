import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  error: null,
  loading: false,
};
const userstate = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIninit: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInsuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateinit: (state) => {
      state.loading = true;
      state.error = null;
    },
    updatesuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    updatefailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteuser: (state) => {
      state.loading = false;
      state.error = null;
    },
    deletesuccess: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    deletefailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signoutsuccess: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
});
export const {
  signIninit,
  signInsuccess,
  signInFailure,
  updateinit,
  updatefailure,
  updatesuccess,
  deleteuser,
  deletesuccess,
  deletefailure,
  signoutsuccess,
} = userstate.actions;
export default userstate.reducer;
