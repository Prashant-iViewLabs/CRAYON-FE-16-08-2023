import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import locale from "../../../i18n/locale";
import { useDispatch } from "react-redux";
import { setAlert, setLoading } from "../../../redux/configSlice";
import { useEffect, useState } from "react";
import {
  addBasicData,
  getBasicData,
} from "../../../redux/employer/postJobSlice";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Radio,
  Typography,
  useTheme,
  Input,
  InputBase,
  Paper,
  Switch,
  alpha,
} from "@mui/material";
import { CV_STEPS } from "../../../utils/Constants";
import Slider from "@mui/material/Slider";
import SelectMenu from "../../common/SelectMenu";
import ToggleSwitch from "../../common/ToggleSwitch";
import AutoComplete from "../../common/AutoComplete";
import { InputLabel } from "@mui/material";
import { ALERT_TYPE, ERROR_MSG, ROLE_TYPE } from "../../../utils/Constants";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  getTitles,
  getSkills,
  getWorkExperience,
  getQualification,
  getRequiredQualification,
  getCurrency,
  getSalary,
  getCountry,
  getRoleTypes,
  getWorkSetup,
  getTown,
  getTools,
} from "../../../redux/employer/postJobSlice";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ResetTvRounded } from "@mui/icons-material";
import { getIndustries } from "../../../redux/candidate/myCvSlice";

const BlueSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: theme.palette.blueButton700.main,
    "&:hover": {
      backgroundColor: alpha(
        theme.palette.blueButton700.main,
        theme.palette.action.hoverOpacity
      ),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: theme.palette.blueButton700.main,
  },
  "& .MuiSwitch-track": {
    margin: "auto",
    height: "60% !important",
  },
  "& .css-jsexje-MuiSwitch-thumb": {
    borderRadius: "15% !important",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginRight: "24px",
  fontSize: "14px",
  width: "150px",
  border: `2px solid ${theme.palette.redButton100.main}`,
  "& .MuiSvgIcon-root": {
    fontSize: "16px",
  },
}));

const BASIC = {
  job_id: null,
  job_title_id: "",
  job_role_type: "",
  job_type: "",
  contract_duration: 0,
  industry_id: [],
  currency_id: "",
  salary: [],
  hide_salary: 1,
  salary_negotiate: true,
  work_setup: "",
  country_id: "",
  town_id: "",
  skills: [],
  tools: [],
  own_transport: false,
  own_equipment: false,
  internet_access: false,
  experience_id: "",
  required_qualification_id: "",
  preferred_qualification_ids: [],

};

const SALARY_OBJ = {
  min: 0,
  max: 0,
  step: 0,
};
const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 20,
    label: "2",
  },
  {
    value: 40,
    label: "4",
  },
  {
    value: 60,
    label: "6",
  },
  {
    value: 80,
    label: "8",
  },
  {
    value: 100,
    label: "10",
  },
  // {
  //   value: 150,
  //   label: "15",
  // },
  // {
  //   value: 200,
  //   label: "20+",
  // },
];

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

function rangeValueHandler2(value) {
  return value * 5;
}

function rangeValueHandler(value) {
  return value * 1000;
}

function textValue(value) {
  return value / 10;
}

function rangeValueExperience(value) {
  return value / 10;
}

const i18n = locale.en;
const scrollToTop = () => {
  // Scroll to the top of the page with smooth behavior
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
export default function TheBasics({ changeStep, handleComplete, handleJobType, selectedJobType, handleOpenSaveAndExitDialog }) {
  const dispatch = useDispatch();
  const theme = useTheme()
  const [basicData, setBasicData] = useState(BASIC);
  const [selectedValue, setSelectedValue] = useState("crayon recruit");
  const [salary, setSalary] = useState([]);
  const [salaryObj, setSalaryObj] = useState(SALARY_OBJ);
  const [townsMain, setTownsMain] = useState([]);
  const [rangeValue, setRangeValue] = useState([0, 20]);
  const [expRange, setExpRange] = useState([0, 5]);
  const [errors, setErrors] = useState([]);
  const history = useNavigate();
  const {
    titles,
    skills,
    tools,
    workExperience,
    qualifications,
    requiredQua,
    currency,
    country,
    town,
    roleTypes,
    workSetup,
  } = useSelector((state) => state.postJobs);
  const {
    industries,
  } = useSelector((state) => state.myCv);

  const { jobId, duplicate } = useParams();

  console.log(basicData)
  const getAllTheBasics = async () => {
    try {
      dispatch(setLoading(true));
      const { payload } = await dispatch(getBasicData(jobId)); //basicData.job_id
      if (payload?.status == "success") {
        const basic = payload?.data;
        console.clear()
        console.log(payload?.data)
        if (basic.job_type) {
          handleJobType(basic.job_type)
        }
        const salary = basic.salary.map((item) => {
          return basic.job_role_type != "freelance" ? item / 1000 : item / 5;
        });
        const experience = basic.experience.map((item) => {
          return item * 10;
        });
        if (basic?.country_id != null) {
          let temp = town.filter((val) => {
            return val.region_id == basic?.country_id;
          });
          setTownsMain(temp);
        }
        setExpRange(experience);
        setRangeValue(salary);
        setBasicData(basic);
      } else {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.ERROR,
            msg: payload?.message,
          })
        );
      }
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

  const getAllData = async () => {
    try {
      dispatch(setLoading(true));
      await Promise.all([
        dispatch(getTitles()),
        dispatch(getSkills()),
        dispatch(getIndustries()),
        dispatch(getTools()),
        dispatch(getWorkExperience()),
        dispatch(getQualification()),
        dispatch(getRequiredQualification()),
        dispatch(getCurrency()),
        dispatch(getCountry()),
        dispatch(getTown()),
        dispatch(getRoleTypes()),
        dispatch(getWorkSetup()),
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

  const getSalaryData = async () => {
    try {
      dispatch(setLoading(true));
      const {
        payload: { data },
      } = await dispatch(getSalary(basicData?.currency_id));
      setSalary(data);
      setSalaryObj({
        min: data[0].max,
        max: data[data.length - 1].max,
        step: data[1].max - data[0].max,
      });
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
  const saveBasic = async () => {
    try {
      const newBasicData = {
        ...basicData,
        // [name || id]: slider ? sliderValue : value,
        job_type: selectedJobType,
      };
      console.log(newBasicData)
      const { payload } = await dispatch(addBasicData(newBasicData));
      if (payload?.status == "success") {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Basic data created successfully!",
          })
        );
        history(`/employer/post-a-job/${payload?.data?.job_id}`);
        handleComplete(1)
        changeStep(2)
        setErrors([]);
      } else if (payload?.status === "error") {
        console.log(payload?.errors)
        console.log(errors?.find((error) => error.key === "job_type"))
        if (payload?.errors?.find((error) => error.key === "job_type")) {
          dispatch(
            setAlert({
              show: true,
              type: ALERT_TYPE.ERROR,
              msg: "Please Select Job Type First",
            })
          );
        }
        else {
          setErrors(payload?.errors);
        }
        scrollToTop()

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

  // const handleRadioChange = (event) => {
  //   setSelectedValue(event.target.value);
  //   const newBasicData = {
  //     ...basicData,
  //     // [name || id]: slider ? sliderValue : value,
  //     job_type: event.target.value,
  //   };

  //   setBasicData(newBasicData);
  // };

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

  const handleContractDurationChange = (event) => {
    const newBasicData = {
      ...basicData,
      contract_duration: event.target.value
    }
    setBasicData(newBasicData)
  }

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
    if (name == "country_id") {
      let temp = town.filter((val) => {
        return val.region_id == value;
      });
      setTownsMain(temp);
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

  const handleRangeSliderChange = (event, newValue) => {
    setRangeValue(newValue);
    let newArr = newValue.map((val) => val * 1000);
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

  const handleRangeSliderChange2 = (event, newValue) => {
    setRangeValue(newValue);
    let newArr = newValue.map((val) => val * 5);
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

  const getQuaValue = () => {
    if (basicData.preferred_qualification_ids?.length == 0) {
      return [];
    }
    return basicData.preferred_qualification_ids?.map(
      (id) => qualifications?.find((qua) => qua.id == id) || id
    );
  };
  const getSkillValue = () => {
    if (basicData.skills?.length == 0) {
      return [];
    }
    return basicData.skills?.map(
      (id) => skills?.find((skill) => skill.id == id) || id
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
  const getIndustriesValue = () => {

    if (basicData.industry_id?.length === 0) {
      // console.log(basicData.industries)
      return []
    }
    // return [1, 4]
    return basicData.industry_id.map(id => industries?.find(industry => industry.industry_id === id) || id)
  }

  const handleRequiredQualificationLevel = (event) => {
    const {
      target: { value },
      target: { name },
      target: { id },
    } = event;
    const newBasicData = {
      ...basicData,
      [name || id]: requiredQua.find((work) => work?.id == value)?.id,
    };
    setBasicData(newBasicData);
  };

  const handleMultipleAutoComplete = (event, newValue, id) => {
    console.log(newValue, id);
    let newBasicData = {
      ...basicData,
      [id]: newValue.map((val) => val?.inputValue || val?.id || val),
    };
    if (newBasicData.tools.length == 6) {
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: "Maximum limit is 5",
        })
      );
      return;
    }
    setBasicData(newBasicData);
  };
  const handleSwitch = (event) => {
    console.clear()
    console.log(event.target.checked)
    const newBasicData = {
      ...basicData,
      [event.target.id]: Number(event.target.checked),
    };
    setBasicData(newBasicData);
  };

  const expHandleChange = (event, newValue) => {
    console.log(event, newValue, event.target.name);
    setExpRange(newValue);
    let newArr = newValue?.map((val) => Math.floor(val / 10));
    console.log(newArr);
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

  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    jobId != undefined && getAllTheBasics();
  }, [jobId]);

  useEffect(() => {
    basicData.currency_id != "" && getSalaryData();
  }, [basicData.currency_id]);

  return (
    <Box>

      <Box>
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 700,
            ml: 1,
            mb: 2,
          }}
        >
          {CV_STEPS[0]}
        </Typography>
        {/* Job Title, Role Type, Contract Duration */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3, gap: 8 }}>
          <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
            <InputLabel
              htmlFor="job_title_id"
              sx={{
                color: "black",
                paddingLeft: "10px",
                paddingBottom: "2px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {i18n["postAJob.jobTitleLabel"]}
            </InputLabel>
            <AutoComplete
              showAddOption={true}
              allowCustomInput={true}
              id="job_title_id"
              value={
                titles?.find(
                  (title) => title.job_title_id == basicData.job_title_id
                ) || basicData.job_title_id
              }
              onChange={handleAutoComplete}
              placeholder={i18n["postAJob.jobTitle"]}
              data={titles}
            ></AutoComplete>
            {!titles?.find((title) => title.id == basicData.job_title_id) &&
              !basicData.job_title_id &&
              errors?.find((error) => error.key == "job_title_id") && (
                <Typography color={"red"}>
                  {`*${errors?.find((error) => error.key == "job_title_id").message
                    }`}
                </Typography>
              )}
          </Box>
          <Box sx={{ display: "flex", gap: 4, width: "50%" }}>
            <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
              <InputLabel
                htmlFor="job_role_type"
                sx={{
                  color: "black",
                  paddingLeft: "10px",
                  paddingBottom: "2px",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                {i18n["postAJob.roleTypeLabel"]}
              </InputLabel>
              <SelectMenu
                name="job_role_type"
                value={basicData.job_role_type}
                onHandleChange={handleJobRoleChange}
                options={roleTypes}
                placeholder={i18n["postAJob.roleType"]}
              />
              {!basicData.job_role_type &&
                errors?.find((error) => error.key == "job_role_type") && (
                  <Typography color={"red"}>
                    {`*${errors?.find((error) => error.key == "job_role_type")
                      .message
                      }`}
                  </Typography>
                )}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
              <InputLabel
                htmlFor="Contract_Duration"
                sx={{
                  color: "black",
                  paddingLeft: "10px",
                  paddingBottom: "2px",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                {i18n["postAJob.contemplatorsact_DurationLabel"]}
              </InputLabel>
              <Paper
                elevation={3}
                sx={{
                  display: "flex",
                  borderRadius: "25px",
                  height: "40px",
                  boxShadow: "none",
                  border: `1px solid ${theme.palette.grayBorder}`,
                }}>

                <InputBase
                  sx={{ ml: 2, mr: 2, width: "100%" }}
                  id="contract_duration"
                  value={basicData.contract_duration}
                  onChange={handleContractDurationChange}
                  // onBlur={formik.handleBlur}
                  // type={inputType}
                  placeholder={"Proposed contract duration?"}
                />
              </Paper>

              {/* <Input var></Input> */}
              {/* <SelectMenu
              name="job_role_type"
              value={basicData.job_role_type}
              onHandleChange={handleJobRoleChange}
              options={roleTypes}
              sx={{ width: "96%" }}
              placeholder={"Proposed contract duration?"}
            />
            {!basicData.job_role_type &&
              errors?.find((error) => error.key == "job_role_type") && (
                <Typography color={"red"}>
                  {`*${errors?.find((error) => error.key == "job_role_type")
                    .message
                    }`}
                </Typography>
              )} */}
            </Box>
          </Box>

        </Box>
        {/* Associated Industries */}
        <Box
          sx={{
            display: "flex", flexDirection: "column", mb: 3
          }}
        >

          <InputLabel
            htmlFor="associated_industries"
            sx={{
              color: "black",
              paddingLeft: "10px",
              paddingBottom: "2px",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            {i18n["postAJob.associated_industriesLabel"]}

          </InputLabel>
          <AutoComplete
            multiple={true}
            // showAddOption={true}
            // allowCustomInput={true}
            id="industry_id"
            disableCloseOnSelect={true}
            value={getIndustriesValue()}
            onChange={handleMultipleAutoComplete}

            sx={{ display: "inline-table" }}
            placeholder={"Enter any industry(ies) relevant to the role"}
            data={industries}
          ></AutoComplete>
        </Box>
        {/* Region, Town */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3, gap: 8 }}>
          <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
            <InputLabel
              htmlFor="country_id"
              sx={{
                color: "black",
                paddingLeft: "10px",
                paddingBottom: "2px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {/* {i18n["postAJob.countryIdLabel"]} */}
              Region
            </InputLabel>

            <SelectMenu
              name="country_id"
              value={basicData.country_id}
              onHandleChange={handleChange}
              options={country}
              placeholder={i18n["postAJob.countryPlaceHolder"]}
            />
            {!basicData.country_id &&
              errors?.find((error) => error.key == "job_role_type") && (
                <Typography color={"red"}>
                  {`*${errors?.find((error) => error.key == "job_role_type")
                    .message
                    }`}
                </Typography>
              )}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
            <InputLabel
              htmlFor="town_id"
              sx={{
                color: "black",
                paddingLeft: "10px",
                paddingBottom: "2px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {i18n["postAJob.townIdLabel"]}
            </InputLabel>

            <SelectMenu
              name="town_id"
              disabled={!basicData.country_id}
              value={
                town?.find((val) => val.town_id == basicData.town_id)?.name ||
                ""
              }
              onHandleChange={handleChange}
              options={townsMain}
              placeholder={i18n["postAJob.townPlaceHolder"]}
            />
            {!town?.find((val) => val.town_id == basicData.town_id)?.name &&
              errors?.find((error) => error.key == "town_id") && (
                <Typography color={"red"}>
                  {`*${errors?.find((error) => error.key == "town_id").message
                    }`}
                </Typography>
              )}
          </Box>
        </Box>
        {/* Work setup,  language */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3, gap: 8 }}>
          <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
            <InputLabel
              htmlFor="work_setup"
              sx={{
                color: "black",
                paddingLeft: "10px",
                paddingBottom: "2px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {i18n["postAJob.workSetupLable"]}
            </InputLabel>
            <SelectMenu
              name="work_setup"
              value={basicData.work_setup}
              onHandleChange={handleWorkSetup}
              options={workSetup}
              placeholder={i18n["postAJob.workSetupPlaceholder"]}
            />
            {!basicData.work_setup &&
              errors?.find((error) => error.key == "work_setup") && (
                <Typography color={"red"}>
                  {`*${errors?.find((error) => error.key == "work_setup").message
                    }`}
                </Typography>
              )}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
            <InputLabel
              htmlFor="languages"
              sx={{
                color: "black",
                paddingLeft: "10px",
                paddingBottom: "2px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {i18n["postAJob.languagesLabel"]}
            </InputLabel>
            {/* <SelectMenu
              name="work_setup"
              value={basicData.languages}
              onHandleChange={handlelanguage}
              options={languages}
              placeholder={i18n["postAJob.languagesPlaceholder"]}
            /> */}
            {/* {!basicData.work_setup &&
              errors?.find((error) => error.key === "languages") && (
                <Typography color={"red"}>
                  {`*${errors?.find((error) => error.key == "languages").message
                    }`}
                </Typography>
              )} */}
          </Box>
        </Box>
        {/* skills */}
        <Box sx={{ display: "flex", flexDirection: "column", mb: 3 }}>
          <InputLabel
            htmlFor="skills"
            sx={{
              color: "black",
              paddingLeft: "10px",
              paddingBottom: "2px",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            {i18n["postAJob.skillsLabel"]}
          </InputLabel>
          <AutoComplete
            multiple={true}
            id="skills"
            disableCloseOnSelect={true}
            value={getSkillValue()}
            onChange={handleMultipleAutoComplete}
            sx={{ display: "inline-table" }}
            placeholder={i18n["postAJob.skills"]}
            data={skills}
          ></AutoComplete>
          {getSkillValue() == "" &&
            errors?.find((error) => error.key == "skills") && (
              <Typography color={"red"}>
                {`*${errors?.find((error) => error.key == "skills").message}`}
              </Typography>
            )}
        </Box>
        {/* Tools */}
        <Box sx={{ display: "flex", flexDirection: "column", mb: 3 }}>
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
            sx={{ display: "inline-table" }}
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
        {/* Required Qualification, currency */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3, gap: 8 }}>
          <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
            <InputLabel
              htmlFor="required_qualification_id"
              sx={{
                color: "black",
                paddingLeft: "10px",
                paddingBottom: "2px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {i18n["postAJob.requiredQualificationLable"]}
            </InputLabel>
            <SelectMenu
              name="required_qualification_id"
              value={basicData.required_qualification_id}
              onHandleChange={handleRequiredQualificationLevel}
              options={requiredQua}
              placeholder={i18n["postAJob.requiredQualificationLevel"]}
            />
            {!basicData.required_qualification_id &&
              errors?.find(
                (error) => error.key == "required_qualification_id"
              ) && (
                <Typography color={"red"}>
                  {`*${errors?.find(
                    (error) => error.key == "required_qualification_id"
                  ).message
                    }`}
                </Typography>
              )}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
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
              {i18n["postAJob.currencyIdLabel"]}
            </InputLabel>
            <SelectMenu
              name="currency_id"
              value={basicData.currency_id}
              onHandleChange={handleChange}
              options={currency}
              placeholder={i18n["postAJob.preferredCurrency"]}
            />
            {!basicData.currency_id &&
              errors?.find((error) => error.key == "currency_id") && (
                <Typography color={"red"}>
                  {`*${errors?.find((error) => error.key == "currency_id").message
                    }`}
                </Typography>
              )}
          </Box>


        </Box>
        {/* work experience , salary */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 3,
            gap: 8
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
              paddingLeft: "10px",
              paddingRight: "10px",
            }}
          >
            <InputLabel
              htmlFor="experience_id"
              sx={{
                color: "black",
                paddingBottom: "2px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {i18n["postAJob.yearsWorkExperienceLabel"]}
            </InputLabel>
            <Slider
              disableSwap
              sx={{
                width: "80%",
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
              }}
              // disabled={salaryObj.step == 0}
              name="experience"
              getAriaLabel={() => "Temperature range"}
              value={expRange}
              // step={basicData.employment_type == "freelance" && 1}
              onChange={expHandleChange}
              color="redButton100"
              valueLabelDisplay="auto"
              valueLabelFormat={rangeValueExperience}
              getAriaValueText={rangeValueExperience}
              step={5}
              marks={marks}
            />
            {errors?.find((error) => error.key === "experience") && (
              <Typography color={"red"}>
                {`*${errors?.find((error) => error.key === "experience").message
                  }`}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
              paddingLeft: "10px",
              paddingRight: "10px",
            }}
          >
            <InputLabel
              htmlFor="salary_id"
              sx={{
                color: "black",
                paddingLeft: "10px",
                paddingBottom: "2px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {basicData.job_role_type == "freelance"
                ? i18n["postAJob.salaryRangeLable2"]
                : i18n["postAJob.salaryRangeLable"]}
            </InputLabel>
            {console.log(rangeValue)}
            <Slider
              disableSwap
              // sx={{  }}
              disabled={!basicData.currency_id}
              name="salary"
              getAriaLabel={() => "Temperature range"}
              value={rangeValue}
              onChange={
                basicData.job_role_type == "freelance"
                  ? handleRangeSliderChange2
                  : handleRangeSliderChange
              }
              color="redButton100"
              valueLabelDisplay="auto"
              // step={basicData.job_role_type == "freelance" && 1}
              valueLabelFormat={
                basicData.job_role_type == "freelance"
                  ? rangeValueHandler2
                  : rangeValueHandler
              }
              getAriaValueText={
                basicData.job_role_type == "freelance"
                  ? rangeValueHandler2
                  : rangeValueHandler
              }
              marks={
                basicData.job_role_type == "freelance"
                  ? rangeMarks2
                  : rangeMarks
              }
              sx={{
                width: "80%", ml: 1,
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
              }}
            />

            {errors?.find((error) => error.key == "salary") && (
              <Typography color={"red"}>
                {`*${errors?.find((error) => error.key == "salary").message}`}
              </Typography>
            )}
          </Box>
        </Box>
        {/* preferred Qualification */}
        <Box sx={{ display: "flex", flexDirection: "column", mb: 3 }}>
          <InputLabel
            htmlFor="preferred_qualification_ids"
            sx={{
              color: "black",
              paddingLeft: "10px",
              paddingBottom: "2px",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            {i18n["postAJob.preferredQualificationLabel"]}
          </InputLabel>
          <AutoComplete
            multiple={true}
            id="preferred_qualification_ids"
            value={getQuaValue()}
            onChange={handleMultipleAutoComplete}
            placeholder={i18n["postAJob.preferredQualification"]}
            data={qualifications}
            height={"auto"}
          ></AutoComplete>
          {errors?.find(
            (error) => error.key == "preferred_qualification_ids"
          ) && (
              <Typography color={"red"}>
                {`*${errors?.find(
                  (error) => error.key == "preferred_qualification_ids"
                ).message
                  }`}
              </Typography>
            )}
        </Box>
        {/* Preferred Associations */}
        <Box sx={{ display: "flex", flexDirection: "column", mb: 3 }}>
          <InputLabel
            htmlFor="preferred_associations"
            sx={{
              color: "black",
              paddingLeft: "10px",
              paddingBottom: "2px",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            {i18n["postAJob.preferredAssociationsLabel"]}
          </InputLabel>
          {/* <AutoComplete
            multiple={true}
            id="preferred_associatons_ids"
            value={getQuaValue()}
            onChange={handleMultipleAutoComplete}
            placeholder={i18n["postAJob.preferredQualification"]}
            data={qualifications}
            height={"auto"}
          ></AutoComplete> */}
          {/* {errors?.find(
            (error) => error.key === "preferred_assocaitions_ids"
          ) && (
              <Typography color={"red"}>
                {`*${errors?.find(
                  (error) => error.key === "preferred_associations_ids"
                ).message
                  }`}
              </Typography>
            )} */}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          minWidth: "28%",
          marginBottom: 3,
          gap: 3,
          flexWrap: "wrap"
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1
          }}
        >
          <Typography
            sx={{

              minWidth: "fit-content",
            }}
          >
            {i18n["postAJob.displaySalary"]}
          </Typography>
          <Typography
                sx={{
                  padding: "5px",
                  height: "8px",
                  width: "8px",
                  borderRadius: "5px",
                  fontSize: "15px",
                  /* text-align: center; */
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  border: 1,
                }}
              >
                i
              </Typography>
          {/* <ToggleSwitch
            id="hide_salary"
            checked={!!basicData.hide_salary}
            onChange={handleSwitch}
          /> */}
          <BlueSwitch
            id="hide_salary"
            checked={!!basicData.hide_salary}
            onChange={handleSwitch}
            />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{

              minWidth: "fit-content",
            }}
          >
            {i18n["postAJob.salaryNegotiable"]}
          </Typography>
          {/* <ToggleSwitch
            id="salary_negotiate"
            checked={!!basicData.salary_negotiate}
            onChange={handleSwitch}
          /> */}
          <BlueSwitch
            id="salary_negotiate"
            checked={!!basicData.salary_negotiate}
            onChange={handleSwitch}
            />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",

          }}
        >
          <Typography
            sx={{

              minWidth: "fit-content",
            }}
          >
            {/* {i18n["postAJob.salaryNegotiable"]} */}
            Own Transport
          </Typography>
          {/* <ToggleSwitch
            id="own_transport"
            checked={!!basicData.own_transport}
            onChange={handleSwitch}
          /> */}
          <BlueSwitch
            id="own_transport"
            checked={!!basicData.own_transport}
            onChange={handleSwitch}
            />

        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{

              minWidth: "fit-content",
            }}
          >
            {/* {i18n["postAJob.salaryNegotiable"]} */}
            Own Equipment
          </Typography>
          {/* <ToggleSwitch
            id="own_equipment"
            checked={!!basicData.own_equipment}
            onChange={handleSwitch}
          /> */}
          <BlueSwitch
            id="own_equipment"
            checked={!!basicData.own_equipment}
            onChange={handleSwitch}
            />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{

              minWidth: "fit-content",
            }}
          >
            {/* {i18n["postAJob.salaryNegotiable"]} */}
            Internet Access
          </Typography>
          {/* <ToggleSwitch
            id="internet_access"
            checked={!!basicData.internet_access}
            onChange={handleSwitch}
          /> */}
          <BlueSwitch
            id="internet_access"
            checked={!!basicData.internet_access}
            onChange={handleSwitch}
            />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          color="grayButton200"
          sx={{
            width: "229px",
            height: "57px",
            fontSize: "15px",
            borderRadius: "26px 0 0 0",
          }}
          onClick={handleOpenSaveAndExitDialog}
        >
          Save and Exit
        </Button>
        <Button
          variant="contained"
          color="redButton"
          sx={{

            width: "229px",
            height: "57px",
            fontSize: "15px",
            borderRadius: "0 26px 0 0 ",
          }}
          onClick={saveBasic}
        >
          the details
        </Button>
      </Box>
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <StyledButton
          onClick={saveBasic}
          // onClick={handleNext}
          variant="contained"
          color="redButton100"
        >
          {i18n["postAJob.theDetails"]}
        </StyledButton>
      </Box> */}

    </Box>
  );
}
