import { useEffect, useState, useRef } from "react";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import locale from "../../../i18n/locale";
import { CV_STEPS } from "../../../utils/Constants";
import InputBox from "../../common/InputBox";
import SelectMenu from "../../common/SelectMenu";
import Slider from "@mui/material/Slider";
import {
  getTitles,
  getIndustries,
  getSkills,
  getWorkExperience,
  getNoticePeriod,
  getQualifications,
  getCurrency,
  uploadCv,
  uploadPortfolio,
  getSalary,
  addBasicData,
} from "../../../redux/candidate/myCvSlice";

import { setAlert, setLoading } from "../../../redux/configSlice";
import { ALERT_TYPE, ERROR_MSG, WORK_TYPE } from "../../../utils/Constants";
import AutoComplete from "../../common/AutoComplete";
import { InputLabel } from "@mui/material";
import { getLocalStorage, setLocalStorage } from "../../../utils/Common";
import { isEmpty } from "lodash";
import {
  getRoleTypes,
  getTools,
  getWorkSetup,
} from "../../../redux/employer/postJobSlice";
import { getCVBasics } from "../../../redux/candidate/myCVNew";
import eye from "../../../assets/Padding Excluded/Black_View.svg";
import profile from "../../../assets/Padding Excluded/Black_User_Profile.svg";
import { useTheme } from "@emotion/react";
import StyledButton from "../../common/StyledButton";
import SavaAndExit from "../myProfile/dialog/SavaAndExit";
import CompleteCV from "./dialogBox/CompleteCV";
import NextDialog from "./dialogBox/NextDialog";

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 20,
    label: "2 yrs",
  },
  {
    value: 40,
    label: "4 yrs",
  },
  {
    value: 60,
    label: "6yrs",
  },
  {
    value: 80,
    label: "8yrs",
  },
  {
    value: 100,
    label: "10yrs",
  },
];
function textValue(value) {
  return value / 10;
}
const rangeMarks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 20,
    label: "20,000",
  },
  {
    value: 40,
    label: "40,000",
  },
  {
    value: 60,
    label: "60,000",
  },
  {
    value: 80,
    label: "80,000",
  },
  {
    value: 100,
    label: "100000+",
  },
];

const rangeMarks2 = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 20,
    label: "100",
  },
  {
    value: 40,
    label: "200",
  },
  {
    value: 60,
    label: "300",
  },
  {
    value: 80,
    label: "400",
  },
  {
    value: 100,
    label: "500+",
  },
];

function rangeValueHandler(value) {
  return value * 1000;
}
function rangeValueHandler2(value) {
  return value * 5;
}

const noticePeriodMarks = [
  {
    value: 0,
    label: "Immediate",
  },
  {
    value: 20,
    label: "1 Week",
  },
  {
    value: 40,
    label: "2 week",
  },
  {
    value: 60,
    label: "30 Days",
  },
  {
    value: 80,
    label: "Calender Month",
  },
  {
    value: 100,
    label: "2 months",
  },
];
function noticeValue(value) {
  return value / 10;
}

const BASIC = {
  current_job_title_id: "",
  dream_job_title_id: "",
  industries: [],
  tags: [],
  experience_id: 0,
  notice_period_id: "",
  qualification_level: "",
  employment_type: "",
  salary: [],
  tools: [],
  currency_id: "",
  portfolio_link: "",
  work_setup: "in-office",
  experience: [],
};

const SALARY_OBJ = {
  min: 0,
  max: 0,
  step: 0,
};

const StyledButtonLeft = styled(Button)(({ theme }) => ({
  fontSize: "15px",
  width: "168px",
  height: "43px",
  color: "black",
  padding: "6px !important",
  //   border: `2px solid ${theme.palette.redButton100.main}`,
  "& .MuiSvgIcon-root": {
    fontSize: "16px",
  },
  borderRadius: "22px",
}));

export default function TheBasicsNew({
  changeStep,
  handleComplete,
  setProfileCompletion,
}) {
  const i18n = locale.en;
  const theme = useTheme();

  const fileAccept = "application/pdf, application/doc, application/docx";

  const dispatch = useDispatch();
  const hiddenFileInput = useRef(null);
  const hiddenFileInput2 = useRef(null);
  const [basicData, setBasicData] = useState(BASIC);
  const [salaryObj, setSalaryObj] = useState(SALARY_OBJ);
  const [rangeValue, setRangeValue] = useState([0, 20]);
  const [expRange, setExpRange] = useState([0, 1]);
  const [workSetup, setWorkSetup] = useState([]);
  const [roleTypes, setRoleTypes] = useState([]);
  const [errors, setErrors] = useState([]);
  const [cvName, setCvName] = useState("No file chosen");
  const [nextDialog, setNextDialog] = useState(false);
  const [saveAndExitDialog, setsaveAndExitDialog] = useState(false);
  const [portfolioName, setPortfolioName] = useState("No file chosen");

  const handleSaveButton = async () => {
    try {
      console.log("BASIC DATA", basicData);
      console.log(cvName);
      if (cvName == "No file chosen") {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.ERROR,
            msg: "Please Upload Your CV First",
          })
        );
        return;
      }
      const { payload } = await dispatch(addBasicData(basicData));
      if (payload?.status == "success") {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Basic data added successfully!",
          })
        );
        // changeStep(2);
        handleComplete();
        setErrors([]);
        handlesaveAndExitDialog();
      } else if (payload?.status == "error") {
        // console.log(payload?.data?.message);
        console.log("ERROR", payload);
        setErrors(payload?.message);
      } else {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.ERROR,
            msg: payload?.message,
          })
        );
      }
    } catch (error) {
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: ERROR_MSG,
        })
      );
    }
  };

  const {
    titles,
    industries,
    skills,
    experiences,
    noticePeriod,
    qualifications,
    currency,
    salary,
  } = useSelector((state) => state.myCv);

  const { tools } = useSelector((state) => state.postJobs);
  const getAllData = async () => {
    try {
      dispatch(setLoading(true));
      await Promise.all([
        dispatch(getTitles()),
        dispatch(getIndustries()),
        dispatch(getSkills()),
        dispatch(getTools()),
        dispatch(getWorkExperience()),
        dispatch(getNoticePeriod()),
        dispatch(getQualifications()),
        dispatch(getCurrency()),
      ]);
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: ERROR_MSG,
        })
      );
    }
  };

  const getWorkSet = async () => {
    try {
      dispatch(setLoading(true));
      const [workSetup, roleTypes] = await Promise.all([
        dispatch(getWorkSetup()),
        dispatch(getRoleTypes()),
      ]);
      setWorkSetup(workSetup.payload.data);
      setRoleTypes(roleTypes.payload.data);

      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: ERROR_MSG,
        })
      );
    }
  };

  const getCVBasicData = async () => {
    const { payload } = await dispatch(getCVBasics());
    if (payload?.status == "success" || payload?.status == "sucess") {
      if (payload?.message == "cv basic is not completed") {
        setBasicData(BASIC);
        return;
      }

      const basic = payload?.data;
      basic.industries = basic?.industry_id;
      const salary = basic?.salary?.map((item) => {
        return basic?.employment_type != "freelance" ? item / 1000 : item / 5;
      });

      const experience = basic.experience.map((item) => {
        return item * 10;
      });

      const profileCompletionPercentage = {
        profileCompletion: 25,
        cvBasics: payload?.data?.cv_basic_completed ? 10 : 0,
        workLife: payload?.data?.work_life_completed ? 5 : 0,
        studyLife: payload?.data?.study_life_completed ? 5 : 0,
        references: payload?.data?.user_reference_completed ? 5 : 0,
      };
      setBasicData(basic);
      setExpRange(experience);
      setRangeValue(salary == "undefined" ? [] : salary);
      setCvName(basic.cv_link);
      setProfileCompletion(profileCompletionPercentage);
    } else if (payload?.status == "error") {
      // dispatch(
      //   setAlert({
      //     show: true,
      //     type: ALERT_TYPE.ERROR,
      //     msg: "Fill the basic details",
      //   })
      // );
      return;
    } else {
      return;
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    getAllData();
    getCVBasicData();
    getWorkSet();
  }, []);

  const handleFileClick = () => {
    hiddenFileInput.current.click();
  };
  const handlePortClick = () => {
    hiddenFileInput2.current.click();
  };

  const handleFileChange = async (event) => {
    const formData = new FormData();
    formData.append("cv", event.target.files[0]);
    console.log(formData);
    try {
      const { payload } = await dispatch(uploadCv(formData));
      if (payload?.status == "success") {
        setCvName(event.target.files[0].name);
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "CV uploaded Successfully!",
          })
        );
      } else {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.ERROR,
            msg: payload?.message,
          })
        );
      }
    } catch (error) {
      dispatch(setAlert({ show: true }));
    }
  };
  const handlePortChange = async (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
    if (!selectedFile) {
      return;
    }
    console.log(event.target.files[0]);
    const formData = new FormData();
    formData.append("portfolio", event.target.files[0]);
    setTimeout(() => {
      console.log("FORM DATA", formData);
    }, 1000);
    try {
      const { payload } = await dispatch(uploadPortfolio(formData));
      if (payload?.status == "success") {
        setPortfolioName(event.target.files[0].name);
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Portfolio uploaded Successfully!",
          })
        );
      } else {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.ERROR,
            msg: payload?.message,
          })
        );
      }
    } catch (error) {
      dispatch(setAlert({ show: true }));
    }
  };

  const handleRangeSlider = (event, newValue) => {
    setRangeValue(newValue);
    console.log(event, newValue);
    let newArr = newValue?.map((val) => val * 1000);
    console.log(newArr);
    const newBasicData = {
      ...basicData,
      [event.target.name]: newArr,
    };
    console.log(newBasicData);
    const filteredErrors = errors?.filter(
      (item) => item.key != event.target.name
    );
    setErrors(filteredErrors);
    setBasicData(newBasicData);
  };

  const handleRangeSlider2 = (event, newValue) => {
    setRangeValue(newValue);
    let newArr = newValue?.map((val) => val * 5);
    const newBasicData = {
      ...basicData,
      [event.target.name]: newArr,
    };

    const filteredErrors = errors?.filter(
      (item) => item.key != event.target.name
    );
    setErrors(filteredErrors);
    setBasicData(newBasicData);
  };

  const handleWorkSetup = (event) => {
    const {
      target: { value },
      target: { name },
      target: { id },
    } = event;
    const newBasicData = {
      ...basicData,
      [name || id]: workSetup.find((work) => work.id == value).name,
    };
    setBasicData(newBasicData);
  };

  const expHandleChange = (event) => {
    const {
      target: { value },
      target: { name },
      target: { id },
    } = event;

    const newBasicData = {
      ...basicData,
      [name]: value / 10,
    };
    const filteredErrors = errors?.filter(
      (item) => item.key != event.target.name
    );
    setErrors(filteredErrors);
    setBasicData(newBasicData);
  };
  const noticeHandleChange = (event) => {
    const {
      target: { value },
      target: { name },
      target: { id },
    } = event;

    const newBasicData = {
      ...basicData,
      [name]: value / 10,
    };
    const filteredErrors = errors?.filter((item) => item.key != name);
    setErrors(filteredErrors);
    setBasicData(newBasicData);
  };

  const handleChange = (event) => {
    const {
      target: { value },
      target: { name },
      target: { id },
    } = event;
    let slider = false,
      sliderValue = "";

    console.log(basicData.job_role_type === "freelance");

    if (name === "currency_id") {
      const currencySalary = currency.find(
        (item) => item.currency_id === value
      );
      console.log(currencySalary.min_salary, currencySalary.max_salary);
      if (basicData.job_role_type === "freelance") {
        setRangeValue([
          currencySalary.min_rate / 5,
          currencySalary.max_rate / 5,
        ]);
      } else {
        setRangeValue([
          currencySalary.min_salary / 1000,
          currencySalary.max_salary / 1000,
        ]);
      }
    }
    if (name == "salary_id") {
      slider = true;
      sliderValue = salary.find((sal) => sal.max == value).salary_id;
    }
    let newBasicData = {};
    if (basicData.salary.length === 0) {
      console.log(currency);
      newBasicData = {
        ...basicData,
        [name || id]: slider ? sliderValue : value,
        salary: [0, 20000],
      };
    } else {
      newBasicData = {
        ...basicData,
        [name || id]: slider ? sliderValue : value,
      };
    }
    console.log(newBasicData);
    setBasicData(newBasicData);
  };
  const handleAutoComplete = (event, newValue, id) => {
    let newBasicData = {};

    if (typeof newValue === "string") {
      newBasicData = {
        ...basicData,
        [id]: newValue,
      };
    } else if (newValue && newValue.inputValue) {
      // Create a new value from the user input
      newBasicData = {
        ...basicData,
        [id]: newValue.inputValue,
      };
    } else {
      newBasicData = {
        ...basicData,
        [id]: newValue?.id,
      };
    }
    setBasicData(newBasicData);
  };

  const handleJobRoleChange = (event) => {
    const {
      target: { value },
      target: { name },
      target: { id },
    } = event;

    const newBasicData = {
      ...basicData,
      [name]: roleTypes.find((role) => role.id == value).name,
    };
    setBasicData(newBasicData);
  };

  const handleMultipleAutoComplete = (event, newValue, id) => {
    let newBasicData = {};
    newBasicData = {
      ...basicData,
      [id]: newValue?.map((val) => val?.inputValue || val?.id || val),
    };
    setBasicData(newBasicData);
  };

  const getIndValue = () => {
    if (basicData.industries?.length == 0) {
      return [];
    }
    return basicData.industries?.map(
      (industry) => industries?.find((ind) => ind.id == industry) || industry
    );
  };
  const getToolValue = () => {
    if (basicData.tools?.length == 0) {
      return [];
    }

    return basicData.tools?.map(
      (id) => tools?.find((tool) => tool.id == id) || id
    );
  };

  const getSkillValue = () => {
    if (basicData.tags?.length == 0) {
      return [];
    }
    console.log(
      basicData.tags?.map(
        (skill) => skills?.find((sk) => sk.id == skill) || skill
      )
    );
    return basicData.tags?.map(
      (skill) => skills?.find((sk) => sk.id == skill) || skill
    );
  };

  const getSalaryData = async (currency_id) => {
    try {
      dispatch(setLoading(true));
      const {
        payload: { data },
      } = await dispatch(getSalary(currency_id));
      console.log(data);
      setSalaryObj({
        min: data[0].max,
        max: data[data.length - 1].max,
        step: data[1].max - data[0].max,
      });
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: ERROR_MSG,
        })
      );
    }
  };

  const handlesaveAndExitDialog = () => {
    setsaveAndExitDialog((prevState) => !prevState);
  };

  const handleOpenNext = () => {
    setNextDialog((prevState) => !prevState);
  };

  useEffect(() => {
    if (basicData.currency_id) {
      console.log(basicData.currency_id);
      getSalaryData(basicData.currency_id);
    }
  }, [basicData.currency_id]);

  return (
    <Box>
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: 700,
          ml: 1,
        }}
      >
        {CV_STEPS[0]}
      </Typography>
      <Typography
        sx={{
          color: "black",
          paddingLeft: "10px",
          paddingBottom: "2px",
          fontSize: "14px",
          fontWeight: 500,
        }}
      >
        {"Upload your current CV. We'll help you build a new Crayon Vitae"}
      </Typography>
      <Box sx={{ mb: 3 }}>
        <input
          accept={fileAccept}
          ref={hiddenFileInput}
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
          required
        />
        <Box
          sx={{
            width: "32%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <StyledButtonLeft
            onClick={handleFileClick}
            variant="contained"
            color="grayButton500"
            sx={{ mt: 1 }}
            startIcon={
              <Box
                component="img"
                className="eye"
                alt="eye logo"
                src={profile}
                sx={{
                  height: 22,
                  width: 22,
                }}
              />
            }
          >
            {"Upload my CV"}
          </StyledButtonLeft>
          <StyledButtonLeft
            sx={{ mt: 1 }}
            variant="contained"
            color="grayButton500"
            startIcon={
              <Box
                component="img"
                className="eye"
                alt="eye logo"
                src={eye}
                sx={{
                  height: 26,
                  width: 26,
                }}
              />
            }
          >
            {"Scrape CV"}
          </StyledButtonLeft>
        </Box>
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: 400,
            ml: 1,
            mt: "4px",
          }}
        >
          {cvName}
        </Typography>
      </Box>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Box sx={{ width: "100%" }}>
            <InputLabel
              htmlFor="current_job_title"
              sx={{
                color: "black",
                paddingLeft: "10px",
                paddingBottom: "2px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {i18n["myCV.currentJobTitleLabel"]}
            </InputLabel>
            <AutoComplete
              id="current_job_title_id"
              value={
                titles?.find(
                  (title) =>
                    title.job_title_id == basicData.current_job_title_id
                ) || basicData.current_job_title_id
              }
              // defaultValue={basicData.current_job_title_id}
              onChange={handleAutoComplete}
              sx={{ width: "94%" }}
              placeholder={i18n["myCV.currentJobTitle"]}
              data={titles}
              showAddOption={true}
            ></AutoComplete>
            {!titles?.find(
              (title) => title.job_title_id == basicData.current_job_title_id
            ) &&
              !basicData.current_job_title_id &&
              errors?.find((error) => error.key == "current_job_title_id") && (
                <Typography color={"red !important"}>
                  {`*${
                    errors?.find((error) => error.key == "current_job_title_id")
                      .message
                  }`}
                </Typography>
              )}
          </Box>
          <Box sx={{ width: "100%" }}>
            <InputLabel
              htmlFor="dream_job_title_id"
              sx={{
                color: "black",
                paddingLeft: "10px",
                paddingBottom: "2px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {i18n["myCV.dreamNextJobLabel"]}
            </InputLabel>
            <AutoComplete
              id="dream_job_title_id"
              value={
                titles?.find(
                  (title) => title.job_title_id == basicData.dream_job_title_id
                ) || basicData.dream_job_title_id
              }
              onChange={handleAutoComplete}
              sx={{ width: "94%" }}
              placeholder={i18n["myCV.dreamNextJobTitle"]}
              data={titles}
              showAddOption={true}
            ></AutoComplete>
            {!titles?.find(
              (title) => title.job_title_id == basicData.dream_job_title_id
            ) &&
              !basicData.dream_job_title_id &&
              errors?.find((error) => error.key == "dream_job_title_id") && (
                <Typography color={"red !important"}>
                  {`*${
                    errors?.find((error) => error.key == "dream_job_title_id")
                      .message
                  }`}
                </Typography>
              )}
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Box sx={{ width: "100%" }}>
            <InputLabel
              htmlFor="industries"
              sx={{
                color: "black",
                paddingLeft: "10px",
                paddingBottom: "2px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {i18n["myCV.industriesLabel"]}
            </InputLabel>
            <AutoComplete
              multiple={true}
              id="industries"
              value={getIndValue()}
              onChange={handleMultipleAutoComplete}
              sx={{ width: "97%", display: "inline-table" }}
              placeholder={i18n["myCV.preferredIndustries"]}
              data={industries}
            ></AutoComplete>
            {getIndValue() == "" &&
              errors?.find((error) => error.key == "industries") && (
                <Typography color={"red !important"}>
                  {`*${
                    errors?.find((error) => error.key == "industries").message
                  }`}
                </Typography>
              )}
          </Box>
          <Box sx={{ width: "100%" }}>
            <InputLabel
              htmlFor="tools"
              sx={{
                color: "black",
                paddingLeft: "10px",
                paddingBottom: "2px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {i18n["postAJob.toolsLable"]}
            </InputLabel>
            <AutoComplete
              disableCloseOnSelect={true}
              limitTags={5}
              multiple={true}
              id="tools"
              value={getToolValue()}
              onChange={handleMultipleAutoComplete}
              sx={{ width: "96%", display: "inline-table" }}
              placeholder={i18n["postAJob.tools"]}
              data={tools}
            ></AutoComplete>
            {getToolValue() == "" &&
              errors?.find((error) => error.key == "tools") && (
                <Typography color={"red"}>
                  {`*${errors?.find((error) => error.key == "tools").message}`}
                </Typography>
              )}
          </Box>
        </Box>
        <Box sx={{ mb: 3 }}>
          <InputLabel
            htmlFor="tags"
            sx={{
              color: "black",
              paddingLeft: "10px",
              paddingBottom: "2px",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            {i18n["myCV.skillsLabel"]}
          </InputLabel>
          <AutoComplete
            multiple={true}
            id="tags"
            value={getSkillValue()}
            onChange={handleMultipleAutoComplete}
            sx={{ width: "98%", display: "inline-table" }}
            placeholder={i18n["myCV.skills"]}
            data={skills}
          ></AutoComplete>
          {getSkillValue() == "" &&
            errors?.find((error) => error.key == "tags") && (
              <Typography color={"red !important"}>
                {`*${errors?.find((error) => error.key == "tags").message}`}
              </Typography>
            )}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Box sx={{ width: "100%" }}>
            <InputLabel
              htmlFor="experience"
              sx={{
                color: "black",
                paddingLeft: "10px",
                paddingBottom: "2px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {i18n["myCV.yearsOfExperienceLabel"]}
            </InputLabel>
            <Slider
              name="experience_id"
              aria-label="Custom marks"
              // defaultValue={0}
              // value={basicData.experience_id*10}
              value={
                experiences.find((val) => val.id === basicData.experience_id)
                  ?.id * 10 || 0
              }
              color="blueButton800"
              getAriaValueText={textValue}
              step={10}
              onChange={expHandleChange}
              valueLabelDisplay="on"
              valueLabelFormat={textValue}
              marks={marks}
              sx={{
                width: "88%",
                ml: 2,
                "& .MuiSlider-rail": {
                  backgroundColor: theme.palette.eyeview100.main,
                  height: "10px",
                },
                "& .MuiSlider-track": {
                  height: "10px",
                },
                "& .MuiSlider-thumb": {
                  borderRadius: "15%",
                },
                "& .MuiSlider-valueLabel.MuiSlider-valueLabelOpen": {
                  backgroundColor: "#EBECF3",
                },
                "& .MuiSlider-valueLabel": {
                  color: "#000",
                },
              }}
            />
            {errors?.find((error) => error.key == "experience") && (
              <Typography color={"red !important"}>
                {`*${
                  errors?.find((error) => error.key == "experience").message
                }`}
              </Typography>
            )}
          </Box>
          <Box sx={{ width: "100%" }}>
            <InputLabel
              htmlFor="notice_period_id"
              sx={{
                color: "black",
                paddingLeft: "10px",
                paddingBottom: "2px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {i18n["myCV.noticePeriodLabel"]}
            </InputLabel>
            <Slider
              aria-label="Custom marks"
              name="notice_period_id"
              value={
                noticePeriod.find(
                  (val) => val.id === basicData.notice_period_id
                )?.id * 10 || 0
              }
              color="yellowButton100"
              getAriaValueText={noticeValue}
              onChange={noticeHandleChange}
              // valueLabelDisplay="on"
              step={20}
              sx={{
                width: "88%",
                ml: 2,
                "& .MuiSlider-rail": {
                  backgroundColor: theme.palette.eyeview100.main,
                  height: "10px",
                },
                "& .MuiSlider-track": {
                  height: "10px",
                },
                "& .MuiSlider-thumb": {
                  borderRadius: "15%",
                },
                "& .MuiSlider-valueLabel.MuiSlider-valueLabelOpen": {
                  backgroundColor: "#EBECF3",
                },
                "& .MuiSlider-valueLabel": {
                  color: "#000",
                },
              }}
              marks={noticePeriodMarks}
            />
            {errors?.find((error) => error.key == "notice_period_id") && (
              <Typography color={"red !important"}>
                {`*${
                  errors?.find((error) => error.key == "notice_period_id")
                    .message
                }`}
              </Typography>
            )}
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Box sx={{ width: "100%" }}>
            <InputLabel
              htmlFor="qualification_level"
              sx={{
                color: "black",
                paddingLeft: "10px",
                paddingBottom: "2px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {i18n["myCV.qualificationLevelLabel"]}
            </InputLabel>
            <SelectMenu
              name="qualification_level"
              value={basicData.qualification_level}
              onHandleChange={handleChange}
              options={qualifications}
              sx={{ width: "94%" }}
              placeholder={i18n["myCV.highestQualificationLevel"]}
            />
            {!basicData.qualification_level &&
              errors?.find((error) => error.key == "qualification_level") && (
                <Typography color={"red !important"}>
                  {`*${
                    errors?.find((error) => error.key == "qualification_level")
                      .message
                  }`}
                </Typography>
              )}
          </Box>
          <Box sx={{ width: "100%" }}>
            <InputLabel
              htmlFor="employment_type"
              sx={{
                color: "black",
                paddingLeft: "10px",
                paddingBottom: "2px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {i18n["myCV.preferedWorkTypeLabel"]}
            </InputLabel>
            <SelectMenu
              name="employment_type"
              value={basicData.employment_type}
              onHandleChange={handleJobRoleChange}
              options={roleTypes}
              sx={{ width: "94%" }}
              placeholder={i18n["myCV.preferredWorkType"]}
            />
            {!basicData.employment_type &&
              errors?.find((error) => error.key == "employment_type") && (
                <Typography color={"red !important"}>
                  {`*${
                    errors?.find((error) => error.key == "employment_type")
                      .message
                  }`}
                </Typography>
              )}
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Box sx={{ width: "100%" }}>
            <InputLabel
              htmlFor="currency_id"
              sx={{
                color: "black",
                paddingLeft: "10px",
                paddingBottom: "2px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {i18n["myCV.preferedCurrencyLabel"]}
            </InputLabel>
            <SelectMenu
              name="currency_id"
              value={basicData?.currency_id}
              onHandleChange={handleChange}
              options={currency}
              sx={{ width: "94%" }}
              placeholder={i18n["myCV.preferredCurrency"]}
            />
            {!basicData?.currency_id &&
              errors?.find((error) => error.key == "currency_id") && (
                <Typography color={"red !important"}>
                  {`*${
                    errors?.find((error) => error.key == "currency_id").message
                  }`}
                </Typography>
              )}
          </Box>
          <Box sx={{ width: "100%" }}>
            <InputLabel
              htmlFor="salary"
              sx={{
                color: "black",
                paddingLeft: "10px",
                paddingBottom: "2px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {basicData.employment_type == "freelance"
                ? i18n["myCV.requiredSalaryRangeLabel2"]
                : i18n["myCV.requiredSalaryRangeLabel"]}
            </InputLabel>
            <Slider
              disableSwap
              sx={{
                width: "89%",
                ml: 1,
                "& .MuiSlider-rail": {
                  backgroundColor: theme.palette.eyeview100.main,
                  height: "10px",
                },
                "& .MuiSlider-track": {
                  height: "10px",
                },
                "& .MuiSlider-thumb": {
                  borderRadius: "15%",
                },
                "& .MuiSlider-valueLabel.MuiSlider-valueLabelOpen": {
                  backgroundColor: "#EBECF3",
                },
                "& .MuiSlider-valueLabel": {
                  color: "#000",
                },
              }}
              disabled={salaryObj.step == 0}
              name="salary"
              getAriaLabel={() => "Temperature range"}
              value={rangeValue}
              // step={basicData.employment_type == "freelance" && 1}
              onChange={
                basicData.employment_type == "freelance"
                  ? handleRangeSlider2
                  : handleRangeSlider
              }
              color="redButton100"
              valueLabelDisplay="on"
              valueLabelFormat={
                basicData.employment_type == "freelance"
                  ? rangeValueHandler2
                  : rangeValueHandler
              }
              getAriaValueText={
                basicData.employment_type == "freelance"
                  ? rangeValueHandler2
                  : rangeValueHandler
              }
              marks={
                basicData.employment_type == "freelance"
                  ? rangeMarks2
                  : rangeMarks
              }
            />
            {errors?.find((error) => error.key == "salary") && (
              <Typography color={"red !important"}>
                {`*${errors?.find((error) => error.key == "salary").message}`}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pt: 5,
        }}
      >
        <Button
          onClick={() => {
            handleSaveButton();
            // handlesaveAndExitDialog();
          }}
          sx={{
            boxShadow: 0,
            padding: "0px",
            fontSize: "14px",
            width: "231px",
            height: "57px",
            borderRadius: "26px 0px 0px 0px",
            // background: "lightGray",
            color: "black",
          }}
          variant="contained"
          color="grayButton100"
        >
          {"save & exit"}
        </Button>
        <Button
          onClick={() => {
            handleSaveButton();
            // handlesaveAndExitDialog();
          }}
          sx={{
            padding: "0px",
            boxShadow: 0,
            fontSize: "14px",
            width: "231px",
            height: "57px",
            borderRadius: "0px 26px 0px 0px",
          }}
          variant="contained"
          color="redButton100"
        >
          {"next step"}
        </Button>
      </Box>
      <CompleteCV
        handleOpen={handlesaveAndExitDialog}
        show={saveAndExitDialog}
        setNextDialog={setNextDialog}
        setsaveAndExitDialog={setsaveAndExitDialog}
      />
      <NextDialog
        handleOpen={handleOpenNext}
        show={nextDialog}
        changeStep={changeStep}
        handleComplete={handleComplete}
      />
    </Box>
  );
}
