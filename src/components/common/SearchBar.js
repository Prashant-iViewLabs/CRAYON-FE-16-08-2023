import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import locale from "../../i18n/locale";
import PlaceIcon from "@mui/icons-material/Place";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Grid from "@mui/material/Unstable_Grid2";
import { styled, alpha } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import LanguageIcon from "@mui/icons-material/Language";
import ButtonMenu from "./ButtonMenu";
import { useTheme } from "@mui/material/styles";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAlert, setLoading } from "../../redux/configSlice";
import { getApi } from "../../utils/Apis";
import { useDispatch } from "react-redux";
import { ALERT_TYPE } from "../../utils/Constants";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";

import GreenSearch from "../../assets/CircularIcon/Red/Circular Icons__Green_Search.svg";
import { InputLabel } from "@mui/material";
import AdvanceSection from "./AdvanceSection";
import { getFilteredJobs } from "../../redux/guest/jobsSlice";
import { useLocation, useParams } from "react-router-dom";
import { getFilteredTalent } from "../../redux/guest/talentSlice";

const StyledBox = styled(Box)(({ theme }) => ({
  height: 40,
  border: `solid ${theme.palette.redButton.main} 1px`,
  borderRadius: 25,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));
const RedSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: theme.palette.redButton.main,
    "&:hover": {
      backgroundColor: alpha(
        theme.palette.redButton.main,
        theme.palette.action.hoverOpacity
      ),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: theme.palette.redButton.main,
  },
}));
function valuetext(value) {
  return `${value}°C`;
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

export default function SearchBar({
  placeholder,
  setAllJobs,
  setLastKey,
  setBasicData,
  basicData,
}) {
  const i18n = locale.en;
  const theme = useTheme();
  const params = useLocation();
  const dispatch = useDispatch();
  const [searchFilter, setSearchFilter] = useState(false);
  const [value1, setValue1] = useState([20, 37]);
  const [value2, setValue2] = useState([20, 37]);
  const [isOpen, setIsOpen] = useState(null);
  const [jobSearch, setJobSearch] = useState("");
  const [openAdvanceSearch, setAdvanceSearch] = useState(false);

  const token = localStorage?.getItem("token");
  let decodedToken;
  if (token) {
    decodedToken = jwt_decode(token);
  }
  console.log(params.pathname.includes("talent"));
  const handleSearch = (event) => {
    setJobSearch(event.target.value);
  };

  const handleJobSearch = async () => {
    let data = {};
    params.pathname.includes("talent")
      ? (data = {
          selectedFilters: "",
          lastKey: "",
          personalityType: "",
          user_id: token ? decodedToken?.data?.user_id : "",
          jobtype: "",
          ...basicData,
        })
      : (data = {
          selectedFilters: "",
          lastKey: "",
          jobtype: "",
          jobstage: "",
          personalityType: "",
          user_id: token ? decodedToken?.data?.user_id : "",
          favourites: "",
          recentjob: "",
          appliedjob: "",
          ...basicData,
        });
    console.log(basicData);
    const { payload } = await dispatch(
      params.pathname.includes("talent")
        ? getFilteredTalent(data)
        : getFilteredJobs(data)
    );
    if (payload?.status == "success") {
      setAllJobs([]);
      setLastKey(payload.pageNumber + 1);
      setAllJobs((prevState) => [...prevState, ...payload.data]);
      setAdvanceSearch(false);
    } else {
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: payload?.message,
        })
      );
    }
  };
  // useEffect(() => {
  //   if (jobSearch.length == 0) {
  //     handleJobSearch();
  //     console.log("REMOVED");
  //   }
  // }, [jobSearch]);
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          display: { xs: "none", md: "flex" },
          m: { xs: 2, md: 0 },
          alignItems: "center",
          border: "1px solid rgba(224, 224, 224, 0.5)",
          position: "sticky",
          borderRadius: {
            xl: searchFilter ? "0" : "0 0 20px 20px",
          },
          zIndex: "1111",
          overflow: "hidden",
        }}
      >
        <IconButton
          color="black100"
          aria-label="search job"
          component="button"
          sx={{
            borderRadius: 0,
            background: theme.palette.lightGreenButton300.main,
            color: "white",
          }}
        >
          <SearchIcon color="white" />
        </IconButton>
        <Paper
          elevation={0}
          component="form"
          sx={{ display: "flex", alignItems: "center", width: 1 }}
        >
          <InputBase
            sx={{
              ml: 1,
              width: 1,
              fontSize: "14px",
              fontWeight: 700,
            }}
            placeholder={placeholder}
            inputProps={{ "aria-label": "search google maps" }}
            value={jobSearch}
            onChange={handleSearch}
          />
        </Paper>
        <IconButton
          color="redButton"
          aria-label="search job"
          component="button"
        >
          <PlaceIcon />
        </IconButton>
        {/* )} */}
        <Button
          sx={{
            width: 140,
            boxShadow: 0,
            borderRadius: 0,
            height: "auto",
          }}
          variant="contained"
          color="lightGreenButton300"
          onClick={handleJobSearch}
        >
          {i18n["searchBar.letsGo"]}
        </Button>
      </Paper>
      <Box
        sx={{
          position: "absolute",
          // left: 0,
          // right: 0,
          top: 45,
          width: "100%",
          margin: "0 auto",
          zIndex: 10,
        }}
      >
        <AdvanceSection
          setBasicData={setBasicData}
          basicData={basicData}
          setAdvanceSearch={setAdvanceSearch}
          openAdvanceSearch={openAdvanceSearch}
        />
      </Box>
    </Box>
  );
}
