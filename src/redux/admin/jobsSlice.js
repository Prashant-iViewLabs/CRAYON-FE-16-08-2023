import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { ALERT_TYPE, ERROR_MSG } from "../../utils/Constants";
import { getApi, postApi } from "../../utils/Apis";
import { setLoading } from "../configSlice";

const initialState = {
  jobs: [],
};

export const adminJobsFilter = createAsyncThunk(
  "adminJobsFilter",
  async (
    {
      lastKey,
      status_id,
      job_stage,
      job_title,
      job_type,
      team_member_user_id,
      company_id,
    },
    { dispatch }
  ) => {
    dispatch(setLoading(true));
    const { data } = await getApi(
      "/admin/job?lastKey=" +
        lastKey +
        "&status_id=" +
        status_id +
        "&job_title=" +
        job_title +
        "&job_stage=" +
        job_stage +
        "&job_type=" +
        job_type +
        "&team_member_user_id=" +
        team_member_user_id +
        "&company_id=" +
        company_id,
      true
    );

    dispatch(setLoading(false));
    return data;
  }
);

export const getTeamMembers = createAsyncThunk(
  "getTeamMembers",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await getApi("/admin/teammember?lastKey=", true);
    dispatch(setLoading(false));
    return data;
  }
);

export const updateTalentPool = createAsyncThunk(
  "updateTalentPool",
  async (payload, { dispatch }) => {
    console.log(payload);
    dispatch(setLoading(true));
    const { data } = await postApi("/admin/editpool", payload, true);
    dispatch(setLoading(false));
    return data;
  }
);
export const deleteTalentPool = createAsyncThunk(
  "deleteTalentPool",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi("/admin/deletepool", payload, true);
    dispatch(setLoading(false));
    return data;
  }
);

export const getSearchResult = createAsyncThunk(
  "getSearchResult",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/buildsearch?lastKey=",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const getAllJobs = createAsyncThunk(
  "getAllJobs",
  async (
    { lastKey, status_id, job_stage, job_title, job_type },
    { dispatch }
  ) => {
    dispatch(setLoading(true));
    const { data } = await getApi(
      "/admin/job?lastKey=" +
        lastKey +
        "&status_id=" +
        status_id +
        "&job_title=" +
        job_title +
        "&job_stage=" +
        job_stage +
        "&job_type=" +
        job_type,
      true
    );

    dispatch(setLoading(false));
    return data;
  }
);

export const getAdminTalentJobList = createAsyncThunk(
  "getAdminTalentJobList",
  async (payload, { dispatch }) => {
    const { data } = await getApi(
      "/admin/getTalentJobData?lastKey=" + payload,
      true
    );
    return data;
  }
);

export const getJobCount = createAsyncThunk(
  "getJobCount",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await getApi(`/admin/getcount?status_id=${payload}`, true);
    dispatch(setLoading(false));
    return data;
  }
);

export const approveJob = createAsyncThunk(
  "approveJob",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi("/admin/approvejob", payload, true);
    dispatch(setLoading(false));
    return data;
  }
);

export const talentPersonality = createAsyncThunk(
  "talentPersonality",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi("/admin/talentPersonality", payload, true);
    dispatch(setLoading(false));
    return data;
  }
);

export const addJobComment = createAsyncThunk(
  "addJobComment",
  async (payload, { dispatch }) => {
    // dispatch(setLoading(true));
    const { data } = await postApi("/admin/addJobComment", payload, true);
    // dispatch(setLoading(false));
    return data;
  }
);

export const getAllComments = createAsyncThunk(
  "getAllComments",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await getApi(
      `/admin/allJobComment?job_id=${payload}`,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const getAllTalentJobs = createAsyncThunk(
  "getAllTalentJobs",
  async (
    {
      lastKey,
      title,
      applicantpool = "false",
      followerpool = "false",
      pool_id,
      job_id,
      stage,
    },
    { dispatch }
  ) => {
    dispatch(setLoading(true));
    const { data } = await getApi(
      "/admin/talent?lastKey=" +
        lastKey +
        "&title=" +
        title +
        "&applicantpool=" +
        applicantpool +
        "&followerpull=" +
        followerpool +
        "&pool_id=" +
        pool_id +
        "&job_id=" +
        job_id +
        "&stage=" +
        stage,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);
export const getTalentFullDetails = createAsyncThunk(
  "getTalentFullDetails",
  async (payload, { dispatch }) => {
    console.log(payload);
    dispatch(setLoading(true));
    const { data } = await getApi(
      `/admin/getFullTalentData?talent_user_id=${payload}`,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const getTalentPool = createAsyncThunk(
  "getTalentPool",
  async ({ lastKey }, { dispatch }) => {
    // dispatch(setLoading(true));
    const { data } = await getApi("/admin/getpools?lastKey=" + lastKey, true);
    // dispatch(setLoading(false));
    return data;
  }
);

export const addTalentPool = createAsyncThunk(
  "addTalentPool",
  async (payload, { dispatch }) => {
    // dispatch(setLoading(true));
    const { data } = await postApi("/admin/addusertopool", payload, true);
    // dispatch(setLoading(false));
    return data;
  }
);

export const addTalentToJob = createAsyncThunk(
  "addTalentToJob",
  async (payload, { dispatch }) => {
    // dispatch(setLoading(true));
    const { data } = await postApi("/admin/addtojob", payload, true);
    // dispatch(setLoading(false));
    return data;
  }
);

export const createTalentPool = createAsyncThunk(
  "createTalentPool",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi("/admin/createpool", payload, true);
    dispatch(setLoading(false));
    return data;
  }
);

export const getPoolUsers = createAsyncThunk(
  "getPoolUsers",
  async ({ lastKey, pool_id }, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await getApi(
      "/admin/getpoolusers?lastKey=" + lastKey + "&pool_id=" + pool_id,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const getApplicants = createAsyncThunk(
  "getApplicants",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await getApi(
      "/admin/getapplicantpool?lastKey=" + payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const getFollowers = createAsyncThunk(
  "getFollowers",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await getApi(
      "/admin/getfollowerpool?lastKey=" + payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const jobsSlice = createSlice({
  name: "config",
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
export const {} = jobsSlice.actions;
export default jobsSlice.reducer;
