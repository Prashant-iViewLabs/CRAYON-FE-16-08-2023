import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Button,
  InputBase,
  InputLabel,
  Paper,
  Slider,
} from "@mui/material";
import React, { useState } from "react";
import theme from "../../utils/Theme";
import GreenEducation from "../../assets/Padding Included/GreenEducation.svg";
import BlueFlag from "../../assets/Padding Included/Blue_Flag.svg";
import BlueSkills from "../../assets/Padding Included/Blue_Filter_Stats.svg";
import RedLocation from "../../assets/Padding Included/Red_Location.svg";
import YellowTool from "../../assets/Padding Included/Yellow_Own_Equipment.svg";
import GreenCountry from "../../assets/Padding Included/Green_Country.svg";
import GreenTitle from "../../assets/Padding Included/Green_Experience_Title_Job.svg";
import BlueCompany from "../../assets/Padding Excluded/Blue_Following_Company-.svg";
import AdvanceSectionAutoComplete from "./AdvanceSectionAutoComplete";
import { useSelector } from "react-redux";
import filter from "../../assets/Padding Included/White_Filter_Stats.svg";
import closeIcon from "../../assets/Black_Up_Close - Copy.svg";
import {
  getCountry,
  getCurrency,
  getRequiredQualification,
  getSkills,
  getTools,
  getTown,
} from "../../redux/employer/postJobSlice";
import { setAlert, setLoading } from "../../redux/configSlice";
import { ALERT_TYPE, ERROR_MSG } from "../../utils/Constants";
import { useDispatch } from "react-redux";
import { getCompanies } from "../../redux/employer/empProfileSlice";
import { useLocation } from "react-router-dom";
import TalentSVGButton from "./TalentSVGButton";

const rangeMarks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 5,
    label: "10,000",
  },
  {
    value: 10,
    label: "20,000",
  },
  {
    value: 15,
    label: "30,000",
  },
  {
    value: 20,
    label: "40,000",
  },
  {
    value: 25,
    label: "50,000",
  },
  {
    value: 30,
    label: "60,000",
  },
  {
    value: 35,
    label: "70,000",
  },
  {
    value: 40,
    label: "80,000",
  },
  {
    value: 45,
    label: "90,000",
  },
  {
    value: 50,
    label: "100,000",
  },
  {
    value: 55,
    label: "110,000",
  },
  {
    value: 60,
    label: "120,000",
  },
  {
    value: 65,
    label: "130,000",
  },
  {
    value: 70,
    label: "140,000",
  },
  {
    value: 75,
    label: "150,000",
  },
  {
    value: 80,
    label: "160,000",
  },
  {
    value: 85,
    label: "170,000",
  },
  {
    value: 90,
    label: "180,000",
  },
  {
    value: 95,
    label: "190,000",
  },
  {
    value: 100,
    label: "200000+",
  },
];
const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 5,
    label: "1 ",
  },
  {
    value: 10,
    label: "2 ",
  },
  {
    value: 15,
    label: "3 ",
  },
  {
    value: 20,
    label: "4 ",
  },
  {
    value: 25,
    label: "5",
  },
  {
    value: 30,
    label: "6",
  },
  {
    value: 35,
    label: "7",
  },
  {
    value: 40,
    label: "8",
  },
  {
    value: 45,
    label: "9",
  },
  {
    value: 50,
    label: "10",
  },
  {
    value: 55,
    label: "11",
  },
  {
    value: 60,
    label: "12 ",
  },
  {
    value: 65,
    label: "13 ",
  },
  {
    value: 70,
    label: "14 ",
  },
  {
    value: 75,
    label: "15",
  },
  {
    value: 80,
    label: "16",
  },
  {
    value: 85,
    label: "17",
  },
  {
    value: 90,
    label: "18",
  },
  {
    value: 95,
    label: "19",
  },
  {
    value: 100,
    label: "20+",
  },
];
function textValue(value) {
  return value / 10;
}
const formatNumber = (num) => {
  if (num < 1000) {
    return num.toString();
  } else if (num < 1000000) {
    return (num / 1000).toFixed(0) + "k";
  } else {
    return (num / 1000000).toFixed(0) + "M";
  }
};

function rangeValueHandler(value) {
  return formatNumber(value * 2000);
}

function rangeValueExperience(value) {
  return `${value / 5} years`;
}

const BASIC = {
  job_title: "",
  region_id: [],
  tag_id: [],
  town_id: [],
  tool_id: [],
  salary: [],
  experience: [],
  company_id: [],
  currency_id: [],
  highest_qualification_id: [],
};

const AdvanceSection = ({
  setBasicData,
  basicData,
  setAdvanceSearch,
  openAdvanceSearch,
  handleJobSearch,
}) => {
  const [rangeValue, setRangeValue] = useState([0, 20]);
  const [expRange, setExpRange] = useState([0, 20]);
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();
  const params = useLocation();

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

  const { companies } = useSelector((state) => state.myProfile);

  const getAllData = async (para) => {
    try {
      switch (para) {
        case "country":
          await dispatch(getCountry());
          return;
        case "skills":
          await dispatch(getSkills());
          return;
        case "town":
          await dispatch(getTown());
          return;
        case "tools":
          await dispatch(getTools());
          return;
        case "companies":
          await dispatch(getCompanies());
          return;
        case "currency":
          await dispatch(getCurrency());
          return;
        case "requiredQua":
          await dispatch(getRequiredQualification());
          return;
        default:
          return;
      }
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

  const handleMultipleAutoComplete = (event, newValue, id) => {
    let temp = [...newValue.map((val) => val?.inputValue || val?.id || val)];
    let newCultureData = {
      ...basicData,
      [id]: temp,
    };
    console.log(newCultureData);
    setBasicData(newCultureData);
  };

  const handleChange = (event) => {
    let newBasicData = {};
    setTitle(event.target.value);
    if (params.pathname.includes("talent")) {
      newBasicData = {
        ...basicData,
        talent_title: event.target.value,
      };
    } else {
      newBasicData = {
        ...basicData,
        job_title: event.target.value,
      };
    }

    setBasicData(newBasicData);
  };

  const handleRangeSliderChange = (event, newValue) => {
    setRangeValue(newValue);
    console.log(newValue);
    let newArr = newValue.map((val) => val * 2000);
    console.log(newArr);
    const newBasicData = {
      ...basicData,
      [event.target.name]: newArr,
    };
    setBasicData(newBasicData);
  };

  const expHandleChange = (event, newValue) => {
    console.log(event, newValue, event.target.name);
    setExpRange(newValue);
    console.log(newValue);
    let newArr = newValue?.map((val) => Math.floor(val / 5));
    console.log(newArr);
    const newBasicData = {
      ...basicData,
      [event.target.name]: newArr,
    };
    setBasicData(newBasicData);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "auto",
        flexDirection: "column",
      }}
    >
      {openAdvanceSearch && (
        <Box
          sx={{
            width: "96%",
            background: "#f4f5f7",
            padding: 4,
            pb: 0,
            pt: 2,
            gap: 1,
            display: "flex",
            boxShadow: 1,
            flexDirection: "column",
            borderRadius: "0 0 20px 20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 4,
              width: "100%",
            }}
          >
            <Box sx={{ width: "50%" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  component={"img"}
                  src={GreenTitle}
                  sx={{
                    height: 30,
                    width: 30,
                  }}
                />
                <InputLabel
                  sx={{
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  Job Titles
                </InputLabel>
              </Box>
              <Paper
                elevation={0}
                component="form"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  borderRadius: 5,
                  padding: "5px",
                }}
              >
                <InputBase
                  sx={{
                    ml: 1,
                    width: 1,
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                  value={title}
                  placeholder="Select a job title"
                  onChange={handleChange}
                />
              </Paper>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  component={"img"}
                  src={BlueFlag}
                  sx={{
                    height: 30,
                    width: 30,
                  }}
                />
                <InputLabel
                  sx={{
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  Regions
                </InputLabel>
              </Box>
              <AdvanceSectionAutoComplete
                multiple={true}
                id="region_id"
                onFocus={() => {
                  if (country.length === 0) {
                    getAllData("country");
                  }
                }}
                onChange={handleMultipleAutoComplete}
                placeholder={"Select the region you are in"}
                data={country}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 4,
              width: "100%",
            }}
          >
            <Box sx={{ width: "50%" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  component={"img"}
                  src={BlueSkills}
                  sx={{
                    height: 30,
                    width: 30,
                  }}
                />
                <InputLabel
                  sx={{
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  Skills
                </InputLabel>
              </Box>
              <AdvanceSectionAutoComplete
                multiple={true}
                id="tag_id"
                onFocus={() => {
                  if (skills.length === 0) {
                    getAllData("skills");
                  }
                }}
                onChange={handleMultipleAutoComplete}
                placeholder={"Select the skills you are proficient in "}
                data={skills}
              />
            </Box>
            <Box sx={{ width: "50%" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  component={"img"}
                  src={RedLocation}
                  sx={{
                    height: 30,
                    width: 30,
                  }}
                />
                <InputLabel
                  sx={{
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  Location
                </InputLabel>
              </Box>
              <AdvanceSectionAutoComplete
                multiple={true}
                id="town_id"
                onFocus={() => {
                  if (town.length === 0) {
                    getAllData("town");
                  }
                }}
                onChange={handleMultipleAutoComplete}
                placeholder={"Select your town or city"}
                data={town}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 4,
              width: "100%",
            }}
          >
            <Box sx={{ width: "50%" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  component={"img"}
                  src={YellowTool}
                  sx={{
                    height: 30,
                    width: 30,
                  }}
                />
                <InputLabel
                  sx={{
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  Tools
                </InputLabel>
              </Box>
              <AdvanceSectionAutoComplete
                multiple={true}
                id="tool_id"
                onFocus={() => {
                  if (tools.length === 0) {
                    getAllData("tools");
                  }
                }}
                onChange={handleMultipleAutoComplete}
                placeholder={"Select the the tools you are proficient in "}
                data={tools}
              />
            </Box>
            <Box sx={{ width: "50%" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  component={"img"}
                  src={BlueCompany}
                  sx={{
                    height: 20,
                    width: 20,
                  }}
                />
                <InputLabel
                  sx={{
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  Companies
                </InputLabel>
              </Box>
              <AdvanceSectionAutoComplete
                multiple={true}
                id="company_id"
                onFocus={() => {
                  if (companies.length === 0) {
                    getAllData("companies");
                  }
                }}
                onChange={handleMultipleAutoComplete}
                placeholder={"Select your preferred next company"}
                data={companies}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 4,
              width: "100%",
            }}
          >
            <Box sx={{ width: "50%" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  component={"img"}
                  src={GreenCountry}
                  sx={{
                    height: 30,
                    width: 30,
                  }}
                />
                <InputLabel
                  sx={{
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  Currency
                </InputLabel>
              </Box>
              <AdvanceSectionAutoComplete
                multiple={true}
                id="currency_id"
                onFocus={() => {
                  if (currency.length === 0) {
                    getAllData("currency");
                  }
                }}
                onChange={handleMultipleAutoComplete}
                placeholder={"Indicate your preferred currency"}
                data={currency}
              />
            </Box>
            <Box sx={{ width: "50%" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  component={"img"}
                  src={GreenEducation}
                  sx={{
                    height: 30,
                    width: 30,
                  }}
                />
                <InputLabel
                  sx={{
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  Highest Qualification
                </InputLabel>
              </Box>
              <AdvanceSectionAutoComplete
                multiple={true}
                id="highest_qualification_id"
                onFocus={() => {
                  if (requiredQua.length === 0) {
                    getAllData("requiredQua");
                  }
                }}
                onChange={handleMultipleAutoComplete}
                placeholder={"Select your highest qualification"}
                data={requiredQua}
              />
            </Box>
          </Box>
          <Box>
            <InputLabel
              sx={{
                fontSize: "14px",
                fontWeight: 700,
                mb: 4,
              }}
            >
              Salary
            </InputLabel>
            <Slider
              disableSwap
              sx={{
                width: "95%",
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
                  background: "white",
                },
                "& .MuiSlider-valueLabel": {
                  fontSize: 12,
                  fontWeight: "normal",
                  top: -6,
                  backgroundColor: theme.palette.grayBackground,
                  borderRadius: 1,
                  color: theme.palette.text.primary,
                  "&:before": {
                    display: "none",
                  },
                  "& *": {
                    background: "transparent",
                    color: theme.palette.mode === "dark" ? "#fff" : "#000",
                  },
                },
              }}
              name="salary"
              getAriaLabel={() => "Temperature range"}
              value={rangeValue}
              valueLabelDisplay="on"
              marks={rangeMarks}
              onChange={handleRangeSliderChange}
              color="redButton100"
              // step={basicData.job_role_type == "freelance" && 1}
              valueLabelFormat={rangeValueHandler}
              getAriaValueText={rangeValueHandler}
            />
          </Box>
          <Box>
            <InputLabel
              sx={{
                fontSize: "14px",
                fontWeight: 700,
                mb: 4,
              }}
            >
              Experience
            </InputLabel>
            <Slider
              disableSwap
              sx={{
                width: "95%",
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
                  background: "white",
                },
                "& .MuiSlider-valueLabel": {
                  fontSize: 12,
                  fontWeight: "normal",
                  top: -6,
                  backgroundColor: theme.palette.grayBackground,
                  borderRadius: 1,
                  color: theme.palette.text.primary,
                  "&:before": {
                    display: "none",
                  },
                  "& *": {
                    background: "transparent",
                    color: theme.palette.mode === "dark" ? "#fff" : "#000",
                  },
                },
              }}
              name="experience"
              getAriaLabel={() => "Temperature range"}
              value={expRange}
              valueLabelDisplay="on"
              onChange={expHandleChange}
              color="blueButton800"
              valueLabelFormat={rangeValueExperience}
              getAriaValueText={rangeValueExperience}
              step={5}
              marks={marks}
            />
          </Box>
          <Box
            sx={{
              margin: "auto",
              paddingTop: 2,
            }}
          >
            <Button
              variant="contained"
              color="grayButton200"
              onClick={() => {
                setAdvanceSearch((prevState) => !prevState);
              }}
              sx={{
                borderRadius: "15px 0 0 0",
                width: "150px",
                height: "60px",
                fontSize: 15,
                fontWeight: "bold",
              }}
              endIcon={
                <Box component={"img"} src={closeIcon} height={35} width={35} />
              }
            >
              close
            </Button>
            <Button
              variant="contained"
              color="redButton200"
              sx={{
                borderRadius: "0 15px 0 0",
                width: "150px",
                height: "60px",
                fontSize: 15,
                fontWeight: "bold",
              }}
              onClick={handleJobSearch}
            >
              let's go!
            </Button>
          </Box>
        </Box>
      )}
      {!openAdvanceSearch && (
        <Button
          sx={{
            padding: "4px 20px",
            height: 45,
            width: 150,
            borderRadius: "0 0 15px 15px",
            boxShadow: 3,
          }}
          size="small"
          variant="contained"
          endIcon={
            <Box
              component="img"
              className="eye"
              alt="eye logo"
              src={filter}
              sx={{
                height: 35,
                width: 35,
                mr: 1,
              }}
            />
          }
          color={"tealColor"}
          onClick={() => {
            setAdvanceSearch((prevState) => !prevState);
            setBasicData(BASIC);
          }}
        ></Button>
      )}
    </Box>
  );
};

export default AdvanceSection;
