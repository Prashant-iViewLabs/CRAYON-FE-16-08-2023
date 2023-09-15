import { Box, Popover, Switch, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import TalentSVGButton from "../../common/TalentSVGButton";
import AutoComplete from "../../common/AutoComplete";
import {
  getQualification,
  getSkills,
  getTitles,
  getTools,
  getTown,
} from "../../../redux/employer/postJobSlice";
import {
  getAssociation,
  getInstitute,
  getLanguage,
  getNationality,
  getSchool,
  getIndustries,
} from "../../../redux/candidate/myCvSlice";
import { getCompanies } from "../../../redux/employer/empProfileSlice";

import { setAlert, setLoading } from "../../../redux/configSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ALERT_TYPE, ERROR_MSG } from "../../../utils/Constants";
import styled from "@emotion/styled";
import { alpha } from "@material-ui/core";
import link from "../../../assets/CircularIcon/Red/Circular Icons__Red_Title_Job_Experience.svg";

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

const DATA = [
  {
    id: 0,
    titleName: "Job Title (s)",
    placeholder: "Search or add job title",
    option: [],
    titleData: "title",
  },
];

export default function SearchBox() {
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
  const dispatch = useDispatch();

  const [switchArray, setSwitchArray] = useState(BASICSEARCH);
  const [basicData, setBasicData] = useState(BASIC);
  const [anchorElInfo, setAnchorElInfo] = useState(null);

  const [data, setData] = useState(DATA);

  const autocompleteInputRef = useRef(null);
  const openInfo = Boolean(anchorElInfo);

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
    if (event.target.checked) {
      // Clear the autocomplete field by resetting its input value
      autocompleteInputRef.current.value = "";
    }

    let newBasicData = {
      ...basicData,
      [value]: [],
    };
    console.log(newBasicData);
    setSwitchArray(newBasicData);
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

  const getAllData = async (para) => {
    try {
      dispatch(setLoading(true));
      switch (para) {
        case "title":
          await dispatch(getTitles());
          handleOptionData("title");
          dispatch(setLoading(false));
          return;
        case "industry":
          await dispatch(getIndustries());
          dispatch(setLoading(false));
          return;
        case "company":
          await dispatch(getCompanies());
          dispatch(setLoading(false));
          return;
        case "skills":
          await dispatch(getSkills());
          dispatch(setLoading(false));
          return;
        case "tools":
          await dispatch(getTools());
          dispatch(setLoading(false));
          return;
        case "qualification":
          await dispatch(getQualification());
          dispatch(setLoading(false));
          return;
        case "institution":
          await dispatch(getInstitute());
          dispatch(setLoading(false));
          return;
        case "association":
          await dispatch(getAssociation());
          dispatch(setLoading(false));
          return;
        case "school":
          await dispatch(getSchool());
          dispatch(setLoading(false));
          return;
        case "towns":
          await dispatch(getTown());
          dispatch(setLoading(false));
          return;
        case "nationality":
          await dispatch(getNationality());
          dispatch(setLoading(false));
          return;
        case "language":
          await dispatch(getLanguage());
          dispatch(setLoading(false));
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

  const handlePopoverCloseInfo = () => {
    setAnchorElInfo(null);
  };

  const handleOptionData = (value) => {
    const temp = data.find((item) => item.titleData === value);
    temp.option = titles

    // switch (value) {
    //   case "title":
    //     setData(...data, );
    //     return;
    //   default:
    //     break;
    // }
    console.log(temp);
  };

  return (
    <>
      {data.map((item) => {
        return (
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
              {console.log(data)}
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
                  item, please use the <br /> individual search pages available.
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
                {item.titleName}
              </Typography>
            </Box>

            <AutoComplete
              multiple={true}
              id="current_job_title_id"
              onChange={handleMultipleAutoComplete}
              sx={{ width: "50%", display: "inline-table" }}
              placeholder={"Search or add job title"}
              data={item.option}
              onFocus={() => getAllData(item.titleData)}
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
        );
      })}
    </>
  );
}
