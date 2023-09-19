import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { ALERT_TYPE, ERROR_MSG } from "../../utils/Constants";
import { getApi, postApi } from "../../utils/Apis";
import { setLoading } from "../configSlice";

const initialState = {
  search: [],
};

export const buildSearch = createAsyncThunk(
  "buildSearch",
  async ({ lastKey, payload }, { dispatch }) => {
    console.log(payload);
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/buildsearch?lastKey=" + lastKey,
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const getSkillsData = createAsyncThunk(
  "getSkillsData",
  async ({ lastKey, keyword }, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await getApi(
      "/admin/search/getTag?lastKey=" + lastKey + "&keyword=" + keyword,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);
export const getSkillsCandidateData = createAsyncThunk(
  "getSkillsCandidateData",
  async ({ lastKey, tag_id }, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await getApi(
      "/admin/search/getTagUserData?lastKey=" + lastKey + "&tag_id=" + tag_id,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);
export const getQualificationsData = createAsyncThunk(
  "getQualificationsData",
  async ({ lastKey, keyword }, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await getApi(
      "/admin/search/getQualification?lastKey=" +
        lastKey +
        "&keyword=" +
        keyword,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);
export const getQualCandidateData = createAsyncThunk(
  "getQualCandidateData",
  async ({ lastKey, qualification_id }, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await getApi(
      "/admin/search/getQualificationUserData?lastKey=" +
        lastKey +
        "&qualification_id=" +
        qualification_id,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const getLanguageData = createAsyncThunk(
  "getLanguageData",
  async ({ lastKey, keyword }, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await getApi(
      "/admin/search/getLanguage?lastkey=" + lastKey + "&keyword=" + keyword,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const getLanguageCandidateData = createAsyncThunk(
  "getLanguageCandidateData",
  async ({ lastKey, language_id }, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await getApi(
      "/admin/search/getLanguageUserData?lastKey=" +
        lastKey +
        "&language_id=" +
        language_id,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const getAssociationsData = createAsyncThunk(
  "getAssociationsData",
  async ({ lastKey, keyword }, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await getApi(
      "/admin/search/getAssociation?lastKey=" + lastKey + "&keyword=" + keyword,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const getAssociationsCandidateData = createAsyncThunk(
  "getAssociationsCandidateData",
  async ({ lastKey, association_id }, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await getApi(
      "/admin/search/getAssociationUserData?lastKey=" +
        lastKey +
        "&association_id=" +
        association_id,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const getSchoolData = createAsyncThunk(
  "getSchoolData",
  async ({ lastKey, keyword }, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await getApi(
      "/admin/search/getSchool?lastKey=" + lastKey + "&keyword=" + keyword,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const getSchoolCandidateData = createAsyncThunk(
  "getSchoolCandidateData",
  async ({ lastKey, school_id }, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await getApi(
      "/admin/search/getSchoolUserData?lastKey=" +
        lastKey +
        "&school_id=" +
        school_id,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const getTownsData = createAsyncThunk(
  "getTownsData",
  async ({ lastKey, keyword }, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await getApi(
      "/admin/search/getTown?lastKey=" + lastKey + "&keyword=" + keyword,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const getTownsCandidateData = createAsyncThunk(
  "getTownsCandidateData",
  async ({ lastKey, town_id }, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await getApi(
      "/admin/search/getTownUserData?lastKey=" +
        lastKey +
        "&town_id=" +
        town_id,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const getNationalityData = createAsyncThunk(
  "getNationalityData",
  async ({ lastKey, keyword }, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await getApi(
      "/admin/search/getNationality?lastKey=" + lastKey + "&keyword=" + keyword,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const getNationalityCandidateData = createAsyncThunk(
  "getNationalityCandidateData",
  async ({ lastKey, nationality_id }, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await getApi(
      "/admin/search/getNationalityUserData?lastKey=" +
        lastKey +
        "&nationality_id=" +
        nationality_id,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const getInstitutionData = createAsyncThunk(
  "getInstitutionData",
  async ({ lastKey, keyword }, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await getApi(
      "/admin/search/getInstitute?lastKey=" + lastKey + "&keyword=" + keyword,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);
export const getInstitutionCandidateData = createAsyncThunk(
  "getInstitutionCandidateData",
  async ({ lastKey, institution_id }, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await getApi(
      "/admin/search/getInstitutionUserData?lastKey=" +
        lastKey +
        "&institution_id=" +
        institution_id,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const getToolsData = createAsyncThunk(
  "getToolsData",
  async ({ lastKey, keyword }, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await getApi(
      "/admin/search/getTool?lastKey=" + lastKey + "&keyword=" + keyword,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);
export const getToolsCandidateData = createAsyncThunk(
  "getToolsCandidateData",
  async ({ lastKey, tool_id }, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await getApi(
      "/admin/search/getToolUserData?lastKey=" +
        lastKey +
        "&tool_id=" +
        tool_id,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

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
    // dispatch(setLoading(true));
    const { data } = await getApi(
      "/admin/search/getJobTitleCandidates?lastKey=" +
        lastKey +
        "&keyword=" +
        keyword +
        "&job_title_id=" +
        job_title_id,
      true
    );
    // dispatch(setLoading(false));
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
