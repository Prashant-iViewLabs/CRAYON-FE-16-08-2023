import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { ALERT_TYPE, ERROR_MSG } from "../../utils/Constants";
import { postApi, getApi } from "../../utils/Apis";
import { setLoading } from "../configSlice";

const initialState = {};

export const getProfile = createAsyncThunk(
  "getProfile",
  async (payload, { dispatch }) => {
    const { data } = await getApi("/profile/get", true);
    return data;
  }
);

export const getCountry = createAsyncThunk(
  "getCountry",
  async (payload, { dispatch }) => {
    const { data } = await getApi("/regions", true);
    return data;
  }
);

export const getNationality = createAsyncThunk(
  "getNationality",
  async (payload, { dispatch }) => {
    const { data } = await getApi("/nationalities", true);
    return data;
  }
);

export const getTown = createAsyncThunk(
  "getTown",
  async (payload, { dispatch }) => {
    const { data } = await getApi("/towns", true);
    return data;
  }
);

export const getLanguage = createAsyncThunk(
  "getLanguage",
  async (payload, { dispatch }) => {
    const { data } = await getApi("/languages", true);
    return data;
  }
);

export const createProfile = createAsyncThunk(
  "createProfile",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const data = await postApi("/profile/create", payload, true);
    dispatch(setLoading(false));
    console.log(data);
    return data;
  }
);

export const resetPassword = createAsyncThunk(
  "resetPassword",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi("/reset/password", payload, true);
    dispatch(setLoading(false));
    return data;
  }
);

export const uploadProfilePic = createAsyncThunk(
  "uploadProfilePic",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/upload/profilepic",
      payload,
      true,
      "multipart/form-data"
    ); //"multipart/form-data"
    dispatch(setLoading(false));
    return data;
  }
);

export const uploadCompanyLogo = createAsyncThunk(
  "uploadCompanyLogo",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/upload/companylogo",
      payload,
      true,
      "multipart/form-data"
    ); //"multipart/form-data"
    dispatch(setLoading(false));
    return data;
  }
);
export const followCompany = createAsyncThunk(
  "followCompany",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const data = await postApi("/admin/followcompany", payload, true);
    dispatch(setLoading(false));
    return data;
  }
);

export const getFollowCompany = createAsyncThunk(
  "getFollowCompany",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await getApi(
      "/admin/getfollowedcompany?lastKey=",
      payload,
      true
    );
    console.log(data);
    dispatch(setLoading(false));
    return data;
  }
);

export const myProfileSlice = createSlice({
  name: "myProfile",
  initialState,
  reducers: {},
  // extraReducers(builder) {
  //     builder
  //         .addCase(signup.pending, (state, action) => {
  //             // state.status = 'loading'
  //         })
  //         .addCase(signup.fulfilled, (state, action) => {
  //             // state.status = 'succeeded'
  //         })
  //         .addCase(signup.rejected, (state, action) => {
  //             // state.status = 'failed'
  //         })
  // }
});

// Action creators are generated for each case reducer function
export const {} = myProfileSlice.actions;

export default myProfileSlice.reducer;
