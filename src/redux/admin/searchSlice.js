import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { ALERT_TYPE, ERROR_MSG } from "../../utils/Constants";
import { getApi, postApi } from "../../utils/Apis";
import { setLoading } from "../configSlice";

const initialState = {
  search: [],
};

export const getJobTitleData = createAsyncThunk(
  "getJobTitleData",
  async ({ lastKey, keyword }, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await getApi(
      "/admin/search/getJobTitle?lastKey=" + lastKey + "&keyword=" + keyword,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);
export const getTitlesCandidateData = createAsyncThunk(
  "getTitlesCandidateData",
  async ({ lastKey, keyword, job_title_id }, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await getApi(
      "/admin/search/getJobTitleCandidates?lastKey=" +
        lastKey +
        "&keyword=" +
        keyword +
        "&job_title_id=" +
        job_title_id,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const searchSlice = createSlice({
  name: "configSearch",
  initialState,
  reducers: {
    // setLoading: (state, action) => {
    //     state.loading = action.payload
    // },
    // setAlert: (state, action) => {
    //     state.alert.show = action.payload.show;
    //     state.alert.type = action.payload.type;
    //     state.alert.msg = action.payload.msg;
    // }
  },
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
export const {} = searchSlice.actions;
export default searchSlice.reducer;
