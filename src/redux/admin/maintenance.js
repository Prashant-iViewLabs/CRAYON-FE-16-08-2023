import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { ALERT_TYPE, ERROR_MSG } from "../../utils/Constants";
import { getApi, postApi } from "../../utils/Apis";
import { setLoading } from "../configSlice";

const initialState = {
  adminMaintenance: [],
};

export const getAllCompanies = createAsyncThunk(
  "getAllCompanies",
  async ({ lastKey }, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await getApi(
      "/admin/maintenance/getcompanies?lastKey=" + lastKey,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const approveCompany = createAsyncThunk(
  "approveCompany",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/updatecompanystatus",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const editCompany = createAsyncThunk(
  "editCompany",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/editcompany",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const getAllJobTitles = createAsyncThunk(
  "getAllJobTitles",
  async ({ lastKey }, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await getApi(
      "/admin/maintenance/gettitles?lastKey=" + lastKey,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const removeJobTitle = createAsyncThunk(
  "removeJobTitle",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/deletetitle",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const editJobTitle = createAsyncThunk(
  "editJobTitle",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/edittitle",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const addJobTitle = createAsyncThunk(
  "addJobTitle",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/addnewtitle",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const approveJobTitle = createAsyncThunk(
  "approveJobTitle",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/updatetitlestatus",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const getAllSkills = createAsyncThunk(
  "getAllSkills",
  async ({ lastKey }, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await getApi(
      "/admin/maintenance/getskills?lastKey=" + lastKey,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const removeSkill = createAsyncThunk(
  "removeSkill",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/deleteskill",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const approveSkill = createAsyncThunk(
  "approveSkill",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/updateskillstatus",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const addNewSkill = createAsyncThunk(
  "addNewSkill",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/addnewskill",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const editSkill = createAsyncThunk(
  "editSkill",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/editskill",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const getAllTools = createAsyncThunk(
  "getAllTools",
  async ({ lastKey }, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await getApi(
      "/admin/maintenance/gettools?lastKey=" + lastKey,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const removeTools = createAsyncThunk(
  "removeTools",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/deletetool",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const addNewTool = createAsyncThunk(
  "addNewTool",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/addnewtool",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const editTool = createAsyncThunk(
  "editTool",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/edittool",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const approveTool = createAsyncThunk(
  "approveTool",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/updatetoolstatus",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const getAllQualification = createAsyncThunk(
  "getAllQualification",
  async ({ lastKey }, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await getApi(
      "/admin/maintenance/getqualification?lastKey=" + lastKey,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const removeQualification = createAsyncThunk(
  "removeQualification",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/deletequalification",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const approveQualification = createAsyncThunk(
  "approveQualification",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/updatequalificationstatus",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const addNewQualification = createAsyncThunk(
  "addNewQualification",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/addnewqualification",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const editQualification = createAsyncThunk(
  "editQualification",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/editqualification",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const getAllAssociations = createAsyncThunk(
  "getAllAssociations",
  async ({ lastKey }, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await getApi(
      "/admin/maintenance/getassociation?lastKey=" + lastKey,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const removeAssociation = createAsyncThunk(
  "removeAssociation",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/deleteassociation",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const addAssociation = createAsyncThunk(
  "addAssociation",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/addnewassociation",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const approveAssociation = createAsyncThunk(
  "approveAssociation",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/updateassociationstatus",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const editAssociation = createAsyncThunk(
  "editAssociation",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/editassociation",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const getAllInstitute = createAsyncThunk(
  "getAllInstitute",
  async ({ lastKey }, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await getApi(
      "/admin/maintenance/getinstitution?lastKey=" + lastKey,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const removeInstitute = createAsyncThunk(
  "removeInstitute",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/deleteinstitution",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const addInstitute = createAsyncThunk(
  "addInstitute",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/addnewinstitution",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const editInstitute = createAsyncThunk(
  "editInstitute",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/editinstitution",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const approveInstitute = createAsyncThunk(
  "approveInstitute",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/updateinstitutionstatus",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const getAllTowns = createAsyncThunk(
  "getAllTowns",
  async ({ lastKey }, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await getApi(
      "/admin/maintenance/gettown?lastKey=" + lastKey,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const removeTown = createAsyncThunk(
  "removeTown",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/deletetown",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const addTown = createAsyncThunk(
  "addTown",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/addnewtown",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const editTown = createAsyncThunk(
  "editTown",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/edittown",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const approveTown = createAsyncThunk(
  "approveTown",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/updatetownstatus",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const getAllSchools = createAsyncThunk(
  "getAllSchools",
  async ({ lastKey }, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await getApi(
      "/admin/maintenance/getschool?lastKey=" + lastKey,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const removeSchool = createAsyncThunk(
  "removeSchool",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/deleteschool",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const addSchool = createAsyncThunk(
  "addSchool",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/addnewschool",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const editSchool = createAsyncThunk(
  "editSchool",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/editschool",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const approveSchool = createAsyncThunk(
  "approveSchool",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/updateschoolstatus",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const getAllNationality = createAsyncThunk(
  "getAllNationality",
  async ({ lastKey }, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await getApi(
      "/admin/maintenance/getnationality?lastKey=" + lastKey,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const removeNationalities = createAsyncThunk(
  "removeNationalities",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/deletenationality",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const editNationality = createAsyncThunk(
  "editNationality",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/editnationality",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const addNationality = createAsyncThunk(
  "addNationality",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/addnewnationality",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const getAllLanguages = createAsyncThunk(
  "getAllLanguages",
  async ({ lastKey }, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await getApi(
      "/admin/maintenance/getlanguage?lastKey=" + lastKey,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const removeLanguages = createAsyncThunk(
  "removeLanguages",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/deletelanguage",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const addLanguages = createAsyncThunk(
  "addLanguages",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/addnewlanguage",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const editLanguage = createAsyncThunk(
  "editLanguage",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/editlanguage",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const getAllIndustry = createAsyncThunk(
  "getAllIndustry",
  async ({ lastKey }, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await getApi(
      "/admin/maintenance/getindustry?lastKey=" + lastKey,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const removeIndustry = createAsyncThunk(
  "removeIndustry",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/deleteindustry",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const editIndustry = createAsyncThunk(
  "editIndustry",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/editindustry",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const getAllQualificationType = createAsyncThunk(
  "getAllQualificationType",
  async ({ lastKey }, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await getApi(
      "/admin/maintenance/getqualificationtype?lastKey=" + lastKey,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const removeQualificationType = createAsyncThunk(
  "removeQualificationType",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/deletequalificationtype",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const addQualificationType = createAsyncThunk(
  "addQualificationType",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/addnewqualificationtype",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const editQualificationType = createAsyncThunk(
  "editQualificationType",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/editqualificationtype",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const getAllCurrencies = createAsyncThunk(
  "getAllCurrencies",
  async ({ lastKey }, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await getApi(
      "/admin/maintenance/getcurrency?lastKey=" + lastKey,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const removeCurrencies = createAsyncThunk(
  "removeCurrencies",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/deletecurrency",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const addCurrencies = createAsyncThunk(
  "addCurrencies",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/addnewcurrency",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const editCurrency = createAsyncThunk(
  "editCurrency",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await postApi(
      "/admin/maintenance/editcurrency",
      payload,
      true
    );
    dispatch(setLoading(false));
    return data;
  }
);

export const maintenance = createSlice({
  name: "configMaintenance",
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
export const {} = maintenance.actions;
export default maintenance.reducer;
