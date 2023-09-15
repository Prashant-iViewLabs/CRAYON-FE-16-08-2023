import { useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled, alpha } from "@mui/material/styles";
import locale from "../../../i18n/locale";
import TextField from "@mui/material/TextField";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Switch from "@mui/material/Switch";
import { Paper, Popover } from "@mui/material";
import {
  ADMIN_SEARCH_FILTER,
  ALERT_TYPE,
  BUILD_SEARCH,
  ERROR_MSG,
} from "../../../utils/Constants";
import Slider from "@mui/material/Slider";
import ButtonMenu from "../../common/ButtonMenu";
import {
  getQualification,
  getSkills,
  getTitles,
  getTools,
  getTown,
  getTraits,
} from "../../../redux/employer/postJobSlice";
import { setAlert, setLoading } from "../../../redux/configSlice";
import { useDispatch } from "react-redux";
import {
  getAssociation,
  getInstitute,
  getLanguage,
  getNationality,
  getSchool,
  getWorkExperience,
} from "../../../redux/candidate/myCvSlice";

import AutoComplete from "../../common/AutoComplete";
import { useSelector } from "react-redux";
import { TrainSharp } from "@mui/icons-material";
import { getSearchResult } from "../../../redux/admin/jobsSlice";
import TalentSVGButton from "../../common/TalentSVGButton";
import link from "../../../assets/CircularIcon/Red/Circular Icons__Red_Title_Job_Experience.svg";
import skill from "../../../assets/CircularIcon/Red/Circular Icons__Red_Filter_Stats.svg";
import tool from "../../../assets/CircularIcon/Red/Circular Icons__Red_Own_Equipment.svg";
import instituteSvg from "../../../assets/CircularIcon/Red/Circular Icons__Red_Instructions.svg";
import associationSvg from "../../../assets/CircularIcon/Red/Circular Icons__Red_Network.svg";
import townsSvg from "../../../assets/CircularIcon/Red/Circular Icons__Red_Location.svg";
import nationalitySvg from "../../../assets/CircularIcon/Red/Circular Icons__Red_Flag.svg";
import experienceSvg from "../../../assets/CircularIcon/Red/Circular Icons__Red_Duration.svg";
import salarySvg from "../../../assets/CircularIcon/Red/Circular Icons__Red_Salary.svg";
import { getIndustries } from "../../../redux/candidate/myCvSlice";

import diamond from "../../../assets/Characters/Red_Diamond.svg";
import { getCompanies } from "../../../redux/employer/empProfileSlice";
import { buildSearch } from "../../../redux/admin/searchSlice";
import SmallButtonTalent from "../../common/SmallButtonTalent";
import AllTalentNewCard from "../adminTalent/AllTalentNewCard";
import FilterDrawer from "./dialogBox/FilterDrawer";
import leftArrow from "../../../assets/Black_Left_Previous.svg";
import rightArrow from "../../../assets/Black_Right_Next.svg";

const YellowSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: theme.palette.yellowButton100.main,
    "&:hover": {
      backgroundColor: alpha(
        theme.palette.yellowButton100.main,
        theme.palette.action.hoverOpacity
      ),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: theme.palette.yellowButton100.main,
  },
  "& .MuiSwitch-track": {
    margin: "auto",
    height: "50% !important",
    width: "90% !important",
    padding: "0px !important",
    backgroundColor: theme.palette.yellowButton100.main,
  },
  ".MuiButtonBase-root.MuiSwitch-switchBase": {
    borderRadius: "15% !important",
    padding: "11px !important",
  },
  "& .MuiSwitch-thumb": {
    borderRadius: "15% !important",
    height: "15px !important",
    width: "15px !important",
    backgroundColor: theme.palette.yellowButton100.main,
  },
  "& .MuiButtonBase-root-MuiSwitch-switchBase": {
    borderRadius: "15% !important",
    padding: "11px !important",
  },
}));
const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: theme.palette.lightGreenButton300.main,
    "&:hover": {
      backgroundColor: alpha(
        theme.palette.lightGreenButton300.main,
        theme.palette.action.hoverOpacity
      ),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: theme.palette.lightGreenButton300.main,
  },
  "& .MuiSwitch-track": {
    margin: "auto",
    height: "50% !important",
    width: "90% !important",
    padding: "0px !important",
    backgroundColor: theme.palette.lightGreenButton300.main,
  },
  ".MuiButtonBase-root.MuiSwitch-switchBase": {
    borderRadius: "15% !important",
    padding: "11px !important",
  },
  "& .MuiSwitch-thumb": {
    borderRadius: "15% !important",
    height: "15px !important",
    width: "15px !important",
    backgroundColor: theme.palette.lightGreenButton300.main,
  },
  "& .MuiButtonBase-root-MuiSwitch-switchBase": {
    borderRadius: "15% !important",
    padding: "11px !important",
  },
}));

function textValue(value) {
  return value / 10;
}

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

const BASIC = {
  town_id: [0],
  nationality_id: [0],
  current_job_title_id: [0],
  tag_id: [0],
  qualification_id: [0],
  institution_id: [0],
  school_id: [0],
  association_id: [0],
  language_id: [0],
  industry_id: [0],
  company_name: [0],
  tool_id: [0],
  salary: [0],
  experience: [0],
};
const BASICSEARCH = [
  { town_id: false },
  { nationality_id: false },
  { current_job_title_id: false },
  { tag_id: false },
  { qualification_id: false },
  { institution_id: false },
  { school_id: false },
  { association_id: false },
  { language_id: false },
  { industry_id: false },
  { company_name: false },
  { tool_id: false },
  { salary: false },
  { experience: false },
];

const rangeMarks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 20,
    label: "20k",
  },
  {
    value: 40,
    label: "40k",
  },
  {
    value: 60,
    label: "60k",
  },
  {
    value: 80,
    label: "80k",
  },
  {
    value: 100,
    label: "100k+",
  },
];

const StyledBox = styled("img")(() => ({
  cursor: "pointer",
  height: 60,
  width: 60,
  textAlign: "center",
}));

const formatNumber = (num) => {
  if (num < 1000) {
    return num.toString();
  } else if (num < 1000000) {
    return (num / 1000).toFixed(0) + "k";
  } else {
    return (num / 1000000).toFixed(0) + "M";
  }
};

function rangeValueExperience(value) {
  return `${value / 10} years`;
}

function rangeValueHandler(value) {
  return formatNumber(value * 1000);
}

export default function BuildSearchNew() {
  const i18n = locale.en;
  const theme = useTheme();

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [value, setValue] = useState([20, 37]);
  const [rangeValue, setRangeValue] = useState([0, 20]);
  const [switchArray, setSwitchArray] = useState(BASICSEARCH);
  const [basicData, setBasicData] = useState(BASIC);
  const [totalJobs, setTotalJobs] = useState();
  const [personalityAdded, setPersonalityAdded] = useState();
  const [anchorElReferral, setAnchorElReferral] = useState(null);
  const [anchorElInfo, setAnchorElInfo] = useState(null);
  const autocompleteInputRef = useRef(null);

  const openReferral = Boolean(anchorElReferral);
  const openInfo = Boolean(anchorElInfo);

  const {
    industries,
    language,
    school,
    association,
    qualification,
    institution,
    nationality,
    experiences,
  } = useSelector((state) => state.myCv);

  const { titles, skills, tools, town, traits } = useSelector(
    (state) => state.postJobs
  );

  const [openSearch, setOpenSearch] = useState(false);

  const [expRange, setExpRange] = useState(30);

  const [searchResult, setSearchResult] = useState([]);

  const { companies } = useSelector((state) => state.myProfile);

  const resetSearch = () => {
    setOpenSearch(false);
    setBasicData(BASIC);
    setRangeValue([0, 20]);
    setExpRange(30);
  };

  const getAllData = async (para) => {
    try {
      switch (para) {
        case "title":
          await dispatch(getTitles());
          return;
        case "industry":
          await dispatch(getIndustries());
          return;
        case "company":
          await dispatch(getCompanies());
          return;
        case "skills":
          await dispatch(getSkills());
          return;
        case "tools":
          await dispatch(getTools());
          return;
        case "qualification":
          await dispatch(getQualification());
          return;
        case "institution":
          await dispatch(getInstitute());
          return;
        case "association":
          await dispatch(getAssociation());
          return;
        case "school":
          await dispatch(getSchool());
          return;
        case "towns":
          await dispatch(getTown());
          return;
        case "nationality":
          await dispatch(getNationality());
          return;
        case "language":
          await dispatch(getLanguage());
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

  const handleRangeSliderChange = (event, newValue) => {
    let newBasicData = {
      ...basicData,
      salary: [0, newValue[0] * 1000, newValue[1] * 1000],
    };
    console.log(newBasicData);
    setBasicData(newBasicData);
    setRangeValue(newValue);
  };

  const handlePopoverCloseReferral = () => {
    setAnchorElReferral(null);
  };

  const handlePopoverCloseInfo = () => {
    setAnchorElInfo(null);
  };

  const expHandleChange = (event, newValue) => {
    let newBasicData = {
      ...basicData,
      experience: [0, 0, newValue / 10],
    };
    setBasicData(newBasicData);
    setExpRange(newValue);
  };

  const handleSwitch = (event, value) => {
    let newBasicData = {
      ...basicData,
      [value]: basicData[value].map((item, index) => {
        if (index === 0) {
          return event.target.checked ? 1 : 0;
        } else {
          return item;
        }
      }),
    };
    console.log(newBasicData);
    setBasicData(newBasicData);
  };

  const handleGreenSwitch = (event, value) => {
    console.log(event.target.checked);
    if (event.target.checked) {
      // Clear the Autocomplete field using the ref
      autocompleteInputRef.current.querySelector("input").value = "";
    }
    let newBasicData = {
      ...basicData,
      [value]: [0],
    };
    console.log(newBasicData);
    setBasicData(newBasicData);
  };

  const handleMultipleAutoComplete = (event, newValue, id) => {
    let temp = [
      basicData[id].at(0),
      ...newValue.map((val) => val?.inputValue || val?.id || val),
    ];
    let newCultureData = {
      ...basicData,
      [id]: temp,
    };

    console.log(newCultureData);
    setBasicData(newCultureData);
  };

  const handleSearch = async () => {
    const { payload } = await dispatch(
      buildSearch({ lastKey: "", payload: basicData })
    );
    if (payload?.status == "success") {
      console.log(payload.data);
      setSearchResult(payload?.data);
      setTotalJobs(payload?.totalData);
    } else {
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: "Something went wrong! please relaod the window",
        })
      );
    }
  };

  return (
    <Box sx={{ pb: 3 }}>
      <Typography
        sx={{
          fontSize: "36px",
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        {i18n["buildSearch.title"]}
      </Typography>

      <Paper sx={{ pl: 3, pt: 0, borderRadius: "20px" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
            width={openSearch ? "59%" : "66%"}
          >
            <Box
              sx={{
                display: "flex",
                height: "100px",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <StyledBox
                className="homeImages"
                alt="Home Image"
                src={diamond}
              />

              {openSearch ? (
                <Box
                  sx={{
                    display: "flex",
                    width: "220px",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography sx={{ fontSize: "12px", fontWeight: 900 }}>
                    Result based on your search:
                  </Typography>
                  <SmallButtonTalent
                    fontWeight={900}
                    textColor={"#000"}
                    color="grayButton200"
                    label={totalJobs}
                    mr={1}
                  />
                </Box>
              ) : (
                <Typography sx={{ fontSize: "12px", fontWeight: 900 }}>
                  Select or add the information you want to search for below
                </Typography>
              )}
            </Box>
            {/* <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: "14px", fontWeight: 900 }}>
                Toggle all
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  width: "275px",
                  justifyContent: "space-evenly",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    sx={{
                      padding: "5px",
                      height: "8px",
                      width: "8px",
                      borderRadius: "5px",
                      fontSize: "15px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 900,
                      border: 1,
                      cursor: "pointer",
                    }}
                    // onClick={(event) => {
                    //   setAnchorElInfo(event.target);
                    // }}
                  >
                    i
                  </Typography>
                  <Typography sx={{ fontSize: "12px" }}>broad</Typography>
                  <YellowSwitch
                    onChange={(event) =>
                      handleSwitch(event, "current_job_title_id")
                    }
                  />
                  <Typography sx={{ fontSize: "12px" }}>narrow</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    sx={{
                      padding: "5px",
                      height: "8px",
                      width: "8px",
                      borderRadius: "5px",
                      fontSize: "15px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 900,
                      border: 1,
                      cursor: "pointer",
                    }}
                    // onClick={(event) => {
                    //   setAnchorElInfo(event.target);
                    // }}
                  >
                    i
                  </Typography>
                  <Typography sx={{ fontSize: "12px" }}>on</Typography>
                  <GreenSwitch
                    onChange={(event) =>
                      handleSwitch(event, "current_job_title_id")
                    }
                  />
                  <Typography sx={{ fontSize: "12px" }}>off</Typography>
                </Box>
              </Box>
            </Box> */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-end",
                height: "100px",
              }}
            >
              <Button
                sx={{
                  boxShadow: 0,
                  fontSize: "14px",
                  // width: "50%",
                  borderRadius: "0 20px 0 20px !important",
                  height: "43px",
                  padding: 3,
                }}
                variant="contained"
                color="yellowButton100"
                width="fit-content"
              >
                my searches
              </Button>
              <Button
                // onClick={(event) => {
                //   setAnchorElReferral(event.target);
                // }}
                sx={{
                  boxShadow: 0,
                  fontSize: "14px",
                  // width: "50%",
                  borderRadius: "10px 0 0 10px !important",
                  height: "43px",
                  minWidth: "40px !important",
                  padding: 0,
                  ".MuiButton-startIcon": {
                    margin: "0px !important",
                  },
                }}
                variant="contained"
                color="blueButton700"
                startIcon={
                  <Box
                    component="img"
                    className="eye"
                    alt="eye logo"
                    src={openReferral ? rightArrow : leftArrow}
                    sx={{
                      height: 26,
                      width: 26,
                    }}
                  />
                }
              />
              <Popover
                id="dropdown"
                open={openReferral}
                anchorEl={anchorElReferral}
                onClose={handlePopoverCloseReferral}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                PaperProps={{
                  sx: {
                    minWidth: "10% !important",
                    borderRadius: "20px !important",
                    marginTop: "140px !important",
                    backgroundColor: "transparent !important",
                  },
                }}
              >
                <FilterDrawer
                  panelData={ADMIN_SEARCH_FILTER}
                  // onChangeFilter={onChangefavourite}
                  side="right"
                />
              </Popover>
            </Box>
          </Box>
        </Box>
        {!openSearch && (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "170px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginLeft: "6px",
                }}
              >
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
                    cursor: "pointer",
                  }}
                  onClick={(event) => {
                    setAnchorElInfo(event.target);
                  }}
                >
                  i
                </Typography>

                <Popover
                  id="dropdown"
                  open={openInfo}
                  anchorEl={anchorElInfo}
                  onClose={handlePopoverCloseInfo}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  PaperProps={{
                    sx: {
                      minWidth: "13% !important",
                      borderRadius: "20px !important",
                      padding: "8px !important",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: 900,
                      textAlign: "left",
                    }}
                  >
                    The combined build a search <br /> function uses existing
                    databse <br /> items as the basis for the search. If <br />{" "}
                    you wish to do a text-based search <br /> on any particular
                    item, please use the <br /> individual search pages
                    available.
                  </Typography>
                </Popover>
                <TalentSVGButton
                  color={"white"}
                  source={link}
                  height={30}
                  width={30}
                  startIconMargin={"0px !important"}
                  padding={"0px !important"}
                />

                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 700,
                    width: "100px",
                    textAlign: "left",
                  }}
                >
                  Job Title(s)
                </Typography>
              </Box>

              <AutoComplete
                multiple={true}
                id="current_job_title_id"
                onChange={handleMultipleAutoComplete}
                sx={{ width: "50%", display: "inline-table" }}
                placeholder={"Search or add job title"}
                data={titles}
                onFocus={() => {
                  if (titles.length === 0) {
                    getAllData("title");
                  }
                }}
                autoCompleteRef={autocompleteInputRef}
              ></AutoComplete>

              <Box
                sx={{
                  display: "flex",
                  width: "275px",
                  justifyContent: "space-evenly",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "12px" }}>broad</Typography>
                  <YellowSwitch
                    onChange={(event) =>
                      handleSwitch(event, "current_job_title_id")
                    }
                  />
                  <Typography sx={{ fontSize: "12px" }}>narrow</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "12px" }}>on</Typography>
                  <GreenSwitch
                    onChange={(event) =>
                      handleGreenSwitch(event, "current_job_title_id")
                    }
                  />
                  <Typography sx={{ fontSize: "12px" }}>off</Typography>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "170px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginLeft: "6px",
                }}
              >
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
                    opacity: 0,
                  }}
                >
                  i
                </Typography>
                <TalentSVGButton
                  color={"white"}
                  source={link}
                  height={30}
                  width={30}
                  startIconMargin={"0px !important"}
                  padding={"0px !important"}
                />

                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 700,
                    width: "100px",
                    textAlign: "left",
                  }}
                >
                  Industry(ies)
                </Typography>
              </Box>

              <AutoComplete
                multiple={true}
                // showAddOption={true}
                // allowCustomInput={true}
                id="industry_id"
                disableCloseOnSelect={true}
                onChange={handleMultipleAutoComplete}
                sx={{ width: "50%", display: "inline-table" }}
                placeholder={"Enter any industry(ies) relevant to the role"}
                data={industries}
                onFocus={() => {
                  if (industries.length === 0) {
                    getAllData("industry");
                  }
                }}
              ></AutoComplete>

              <Box
                sx={{
                  display: "flex",
                  width: "275px",
                  justifyContent: "space-evenly",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "12px" }}>broad</Typography>
                  <YellowSwitch
                    onChange={(event) => handleSwitch(event, "industry_id")}
                  />
                  <Typography sx={{ fontSize: "12px" }}>narrow</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "12px" }}>on</Typography>
                  <GreenSwitch
                    onChange={(event) =>
                      handleGreenSwitch(event, "industry_id")
                    }
                  />
                  <Typography sx={{ fontSize: "12px" }}>off</Typography>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "170px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginLeft: "6px",
                }}
              >
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
                    opacity: 0,
                  }}
                >
                  i
                </Typography>
                <TalentSVGButton
                  color={"white"}
                  source={link}
                  height={30}
                  width={30}
                  startIconMargin={"0px !important"}
                  padding={"0px !important"}
                />

                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 700,
                    width: "100px",
                    textAlign: "left",
                  }}
                >
                  Company(ies)
                </Typography>
              </Box>

              <AutoComplete
                multiple={true}
                showAddOption={true}
                allowCustomInput={true}
                id="company_name"
                // value={getCompanyValue()}
                onChange={handleMultipleAutoComplete}
                sx={{ width: "50%", display: "inline-table" }}
                placeholder={i18n["empMyProfile.companyNamePlace"]}
                data={companies}
                onFocus={() => {
                  if (companies.length === 0) {
                    getAllData("company");
                  }
                }}
              ></AutoComplete>

              <Box
                sx={{
                  display: "flex",
                  width: "275px",
                  justifyContent: "space-evenly",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "12px" }}>broad</Typography>
                  <YellowSwitch
                    onChange={(event) => handleSwitch(event, "company_name")}
                  />
                  <Typography sx={{ fontSize: "12px" }}>narrow</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "12px" }}>on</Typography>
                  <GreenSwitch
                    onChange={(event) =>
                      handleGreenSwitch(event, "company_name")
                    }
                  />
                  <Typography sx={{ fontSize: "12px" }}>off</Typography>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "170px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginLeft: "6px",
                }}
              >
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
                    opacity: 0,
                  }}
                >
                  i
                </Typography>
                <TalentSVGButton
                  color={"white"}
                  source={skill}
                  height={30}
                  width={30}
                  startIconMargin={"0px !important"}
                  padding={"0px !important"}
                />

                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 700,
                    width: "100px",
                    textAlign: "left",
                  }}
                >
                  Skills
                </Typography>
              </Box>

              <AutoComplete
                multiple={true}
                id="tag_id"
                disableCloseOnSelect={true}
                // value={getSkillValue()}
                onChange={handleMultipleAutoComplete}
                sx={{ width: "50%", display: "inline-table" }}
                placeholder={i18n["postAJob.skills"]}
                data={skills}
                onFocus={() => {
                  if (skills.length === 0) {
                    getAllData("skills");
                  }
                }}
              ></AutoComplete>

              <Box
                sx={{
                  display: "flex",
                  width: "275px",
                  justifyContent: "space-evenly",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "12px" }}>broad</Typography>
                  <YellowSwitch
                    onChange={(event) => handleSwitch(event, "tag_id")}
                  />
                  <Typography sx={{ fontSize: "12px" }}>narrow</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "12px" }}>on</Typography>
                  <GreenSwitch
                    onChange={(event) => handleGreenSwitch(event, "tag_id")}
                  />
                  <Typography sx={{ fontSize: "12px" }}>off</Typography>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "170px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginLeft: "6px",
                }}
              >
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
                    opacity: 0,
                  }}
                >
                  i
                </Typography>
                <TalentSVGButton
                  color={"white"}
                  source={tool}
                  height={30}
                  width={30}
                  startIconMargin={"0px !important"}
                  padding={"0px !important"}
                />

                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 700,
                    width: "100px",
                    textAlign: "left",
                  }}
                >
                  Tools
                </Typography>
              </Box>

              <AutoComplete
                disableCloseOnSelect={true}
                // limitTags={5}
                multiple={true}
                id="tool_id"
                // value={getToolValue()}
                onChange={handleMultipleAutoComplete}
                sx={{ width: "50%", display: "inline-table" }}
                placeholder={"Select or add the required tools"}
                data={tools}
                onFocus={() => {
                  if (tools.length === 0) {
                    getAllData("tools");
                  }
                }}
              ></AutoComplete>

              <Box
                sx={{
                  display: "flex",
                  width: "275px",
                  justifyContent: "space-evenly",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "12px" }}>broad</Typography>
                  <YellowSwitch
                    onChange={(event) => handleSwitch(event, "tool_id")}
                  />
                  <Typography sx={{ fontSize: "12px" }}>narrow</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "12px" }}>on</Typography>
                  <GreenSwitch
                    onChange={(event) => handleGreenSwitch(event, "tool_id")}
                  />
                  <Typography sx={{ fontSize: "12px" }}>off</Typography>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "170px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginLeft: "6px",
                }}
              >
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
                    opacity: 0,
                  }}
                >
                  i
                </Typography>
                <TalentSVGButton
                  color={"white"}
                  source={tool}
                  height={30}
                  width={30}
                  startIconMargin={"0px !important"}
                  padding={"0px !important"}
                />

                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 700,
                    width: "100px",
                    textAlign: "left",
                  }}
                >
                  Qualifications
                </Typography>
              </Box>

              <AutoComplete
                multiple={true}
                id="qualification_id"
                // value={getQualValue()}
                onChange={handleMultipleAutoComplete}
                sx={{ width: "50%", display: "inline-table" }}
                placeholder={"Select or add the required qualification"}
                data={qualification}
                onFocus={() => {
                  if (qualification.length === 0) {
                    getAllData("qualification");
                  }
                }}
              ></AutoComplete>

              <Box
                sx={{
                  display: "flex",
                  width: "275px",
                  justifyContent: "space-evenly",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "12px" }}>broad</Typography>
                  <YellowSwitch
                    onChange={(event) =>
                      handleSwitch(event, "qualification_id")
                    }
                  />
                  <Typography sx={{ fontSize: "12px" }}>narrow</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "12px" }}>on</Typography>
                  <GreenSwitch
                    onChange={(event) =>
                      handleGreenSwitch(event, "qualification_id")
                    }
                  />
                  <Typography sx={{ fontSize: "12px" }}>off</Typography>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "170px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginLeft: "6px",
                }}
              >
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
                    opacity: 0,
                  }}
                >
                  i
                </Typography>
                <TalentSVGButton
                  color={"white"}
                  source={instituteSvg}
                  height={30}
                  width={30}
                  startIconMargin={"0px !important"}
                  padding={"0px !important"}
                />

                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 700,
                    width: "100px",
                    textAlign: "left",
                  }}
                >
                  Institutions
                </Typography>
              </Box>

              <AutoComplete
                multiple={true}
                id="institution_id"
                // value={getInstituteValue()}
                // onChange={handleAutoComplete}
                onChange={handleMultipleAutoComplete}
                sx={{ width: "50%", display: "inline-table" }}
                placeholder={"Select or add the required institutions"}
                data={institution}
                onFocus={() => {
                  if (institution.length === 0) {
                    getAllData("institution");
                  }
                }}
              ></AutoComplete>

              <Box
                sx={{
                  display: "flex",
                  width: "275px",
                  justifyContent: "space-evenly",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "12px" }}>broad</Typography>
                  <YellowSwitch
                    onChange={(event) => handleSwitch(event, "institution_id")}
                  />
                  <Typography sx={{ fontSize: "12px" }}>narrow</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "12px" }}>on</Typography>
                  <GreenSwitch
                    onChange={(event) =>
                      handleGreenSwitch(event, "institution_id")
                    }
                  />
                  <Typography sx={{ fontSize: "12px" }}>off</Typography>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "170px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginLeft: "6px",
                }}
              >
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
                    opacity: 0,
                  }}
                >
                  i
                </Typography>
                <TalentSVGButton
                  color={"white"}
                  source={associationSvg}
                  height={30}
                  width={30}
                  startIconMargin={"0px !important"}
                  padding={"0px !important"}
                />

                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 700,
                    width: "100px",
                    textAlign: "left",
                  }}
                >
                  Associations
                </Typography>
              </Box>

              <AutoComplete
                multiple={true}
                id="association_id"
                onChange={handleMultipleAutoComplete}
                sx={{ width: "50%", display: "inline-table" }}
                placeholder={"Select or add the required associations"}
                // value={getAssociationValue()}
                data={association}
                onFocus={() => {
                  if (association.length === 0) {
                    getAllData("association");
                  }
                }}
              ></AutoComplete>

              <Box
                sx={{
                  display: "flex",
                  width: "275px",
                  justifyContent: "space-evenly",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "12px" }}>broad</Typography>
                  <YellowSwitch
                    onChange={(event) => handleSwitch(event, "association_id")}
                  />
                  <Typography sx={{ fontSize: "12px" }}>narrow</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "12px" }}>on</Typography>
                  <GreenSwitch
                    onChange={(event) =>
                      handleGreenSwitch(event, "association_id")
                    }
                  />
                  <Typography sx={{ fontSize: "12px" }}>off</Typography>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "170px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginLeft: "6px",
                }}
              >
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
                    opacity: 0,
                  }}
                >
                  i
                </Typography>
                <TalentSVGButton
                  color={"white"}
                  source={tool}
                  height={30}
                  width={30}
                  startIconMargin={"0px !important"}
                  padding={"0px !important"}
                />

                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 700,
                    width: "100px",
                    textAlign: "left",
                  }}
                >
                  Schools
                </Typography>
              </Box>

              <AutoComplete
                multiple={true}
                id="school_id"
                onChange={handleMultipleAutoComplete}
                sx={{ width: "50%", display: "inline-table" }}
                placeholder={"Select or add the required school"}
                data={school}
                onFocus={() => {
                  if (school.length === 0) {
                    getAllData("school");
                  }
                }}
              ></AutoComplete>

              <Box
                sx={{
                  display: "flex",
                  width: "275px",
                  justifyContent: "space-evenly",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "12px" }}>broad</Typography>
                  <YellowSwitch
                    onChange={(event) => handleSwitch(event, "school_id")}
                  />
                  <Typography sx={{ fontSize: "12px" }}>narrow</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "12px" }}>on</Typography>
                  <GreenSwitch
                    onChange={(event) => handleGreenSwitch(event, "school_id")}
                  />
                  <Typography sx={{ fontSize: "12px" }}>off</Typography>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "170px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginLeft: "6px",
                }}
              >
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
                    opacity: 0,
                  }}
                >
                  i
                </Typography>
                <TalentSVGButton
                  color={"white"}
                  source={townsSvg}
                  height={30}
                  width={30}
                  startIconMargin={"0px !important"}
                  padding={"0px !important"}
                />

                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 700,
                    width: "100px",
                    textAlign: "left",
                  }}
                >
                  Towns
                </Typography>
              </Box>

              <AutoComplete
                multiple={true}
                id="town_id"
                onChange={handleMultipleAutoComplete}
                sx={{ width: "50%", display: "inline-table" }}
                placeholder={"Select or add the required towns"}
                data={town}
                onFocus={() => {
                  if (town.length === 0) {
                    getAllData("towns");
                  }
                }}
              ></AutoComplete>

              <Box
                sx={{
                  display: "flex",
                  width: "275px",
                  justifyContent: "space-evenly",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "12px" }}>broad</Typography>
                  <YellowSwitch
                    onChange={(event) => handleSwitch(event, "town_id")}
                  />
                  <Typography sx={{ fontSize: "12px" }}>narrow</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "12px" }}>on</Typography>
                  <GreenSwitch
                    onChange={(event) => handleGreenSwitch(event, "town_id")}
                  />
                  <Typography sx={{ fontSize: "12px" }}>off</Typography>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "170px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginLeft: "6px",
                }}
              >
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
                    opacity: 0,
                  }}
                >
                  i
                </Typography>
                <TalentSVGButton
                  color={"white"}
                  source={nationalitySvg}
                  height={30}
                  width={30}
                  startIconMargin={"0px !important"}
                  padding={"0px !important"}
                />

                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 700,
                    width: "100px",
                    textAlign: "left",
                  }}
                >
                  Nationality
                </Typography>
              </Box>

              <AutoComplete
                multiple={true}
                id="nationality_id"
                onChange={handleMultipleAutoComplete}
                sx={{ width: "50%", display: "inline-table" }}
                placeholder={"Select or add the required nationalities"}
                data={nationality}
                onFocus={() => {
                  if (nationality.length === 0) {
                    getAllData("nationality");
                  }
                }}
              ></AutoComplete>

              <Box
                sx={{
                  display: "flex",
                  width: "275px",
                  justifyContent: "space-evenly",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "12px" }}>broad</Typography>
                  <YellowSwitch
                    onChange={(event) => handleSwitch(event, "nationality_id")}
                  />
                  <Typography sx={{ fontSize: "12px" }}>narrow</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "12px" }}>on</Typography>
                  <GreenSwitch
                    onChange={(event) =>
                      handleGreenSwitch(event, "nationality_id")
                    }
                  />
                  <Typography sx={{ fontSize: "12px" }}>off</Typography>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "170px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginLeft: "6px",
                }}
              >
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
                    opacity: 0,
                  }}
                >
                  i
                </Typography>
                <TalentSVGButton
                  color={"white"}
                  source={link}
                  height={30}
                  width={30}
                  startIconMargin={"0px !important"}
                  padding={"0px !important"}
                />

                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 700,
                    width: "100px",
                    textAlign: "left",
                  }}
                >
                  Language
                </Typography>
              </Box>

              <AutoComplete
                multiple={true}
                onChange={handleMultipleAutoComplete}
                sx={{ width: "50%", display: "inline-table" }}
                placeholder={"Select or add the required languages"}
                id="language_id"
                // value={getLangValue()}
                data={language}
                disableCloseOnSelect={true}
                onFocus={() => {
                  if (language.length === 0) {
                    getAllData("language");
                  }
                }}
              ></AutoComplete>

              <Box
                sx={{
                  display: "flex",
                  width: "275px",
                  justifyContent: "space-evenly",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "12px" }}>broad</Typography>
                  <YellowSwitch
                    onChange={(event) => handleSwitch(event, "language_id")}
                  />
                  <Typography sx={{ fontSize: "12px" }}>narrow</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "12px" }}>on</Typography>
                  <GreenSwitch
                    onChange={(event) =>
                      handleGreenSwitch(event, "language_id")
                    }
                  />
                  <Typography sx={{ fontSize: "12px" }}>off</Typography>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "170px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginLeft: "6px",
                }}
              >
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
                    opacity: 0,
                  }}
                >
                  i
                </Typography>
                <TalentSVGButton
                  color={"white"}
                  source={experienceSvg}
                  height={30}
                  width={30}
                  startIconMargin={"0px !important"}
                  padding={"0px !important"}
                />

                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 700,
                    width: "100px",
                    textAlign: "left",
                  }}
                >
                  Experience
                </Typography>
              </Box>

              <Slider
                disableSwap
                valueLabelDisplay="on"
                sx={{
                  marginTop: 4,
                  width: "50%",
                  ml: 3,
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
                // disabled={salaryObj.step == 0}
                name="experience"
                getAriaLabel={() => "Temperature range"}
                value={expRange}
                // step={basicData.employment_type == "freelance" && 1}
                onChange={expHandleChange}
                color="blueButton800"
                // valueLabelDisplay="auto"
                valueLabelFormat={rangeValueExperience}
                getAriaValueText={rangeValueExperience}
                step={5}
                marks={marks}
              />

              <Box
                sx={{
                  display: "flex",
                  width: "275px",
                  justifyContent: "space-evenly",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "12px" }}>broad</Typography>
                  <YellowSwitch
                    onChange={(event) => handleSwitch(event, "experience")}
                  />
                  <Typography sx={{ fontSize: "12px" }}>narrow</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "12px" }}>on</Typography>
                  <GreenSwitch
                    onChange={(event) => handleGreenSwitch(event, "experience")}
                  />
                  <Typography sx={{ fontSize: "12px" }}>off</Typography>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "170px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginLeft: "6px",
                }}
              >
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
                    opacity: 0,
                  }}
                >
                  i
                </Typography>
                <TalentSVGButton
                  color={"white"}
                  source={salarySvg}
                  height={30}
                  width={30}
                  startIconMargin={"0px !important"}
                  padding={"0px !important"}
                />

                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 700,
                    width: "100px",
                    textAlign: "left",
                  }}
                >
                  Salary
                </Typography>
              </Box>

              <Slider
                disableSwap
                valueLabelDisplay="on"
                // disabled={!basicData.currency_id}
                name="salary"
                getAriaLabel={() => "Temperature range"}
                value={rangeValue}
                onChange={handleRangeSliderChange}
                color="redButton100"
                valueLabelFormat={rangeValueHandler}
                getAriaValueText={rangeValueHandler}
                marks={rangeMarks}
                sx={{
                  marginTop: 4,
                  width: "50%",
                  ml: 3,
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
                    fontWeight: "700",
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
              />

              <Box
                sx={{
                  display: "flex",
                  width: "275px",
                  justifyContent: "space-evenly",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "12px" }}>broad</Typography>
                  <YellowSwitch
                    onChange={(event) => handleSwitch(event, "salary")}
                  />
                  <Typography sx={{ fontSize: "12px" }}>narrow</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "12px" }}>on</Typography>
                  <GreenSwitch
                    onChange={(event) => handleGreenSwitch(event, "salary")}
                  />
                  <Typography sx={{ fontSize: "12px" }}>off</Typography>
                </Box>
              </Box>
            </Box>
          </>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 6,
          }}
        >
          <Button
            sx={{
              boxShadow: 0,
              fontSize: "14px",
              // width: "50%",
              borderRadius: "20px 0 0 0 !important",
              height: "43px",
              padding: 3,
              color: "#000",
            }}
            variant="contained"
            color="grayButton200"
            width="fit-content"
            onClick={resetSearch}
          >
            reset search
          </Button>
          <Button
            sx={{
              boxShadow: 0,
              fontSize: "14px",
              // width: "50%",
              borderRadius: "0px !important",
              height: "43px",
              padding: 3,
            }}
            variant="contained"
            color="yellowButton100"
            width="fit-content"
            onClick={() => {
              handleSearch();
              setOpenSearch(true);
            }}
          >
            save search
          </Button>
          <Button
            sx={{
              boxShadow: 0,
              fontSize: "14px",
              width: "130px !important",
              borderRadius: "0 20px 0 0 !important",
              height: "43px",
              padding: 3,
            }}
            variant="contained"
            color="redButton100"
          >
            let's go
          </Button>
        </Box>
      </Paper>

      {openSearch &&
        searchResult.map((result, index) => {
          return (
            <AllTalentNewCard
              key={index}
              traits={traits}
              talentContent={result}
              setPersonalityAdded={setPersonalityAdded}
            />
          );
        })}
    </Box>
  );
}
