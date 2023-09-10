import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled, alpha } from "@mui/material/styles";
import locale from "../../../i18n/locale";
import TextField from "@mui/material/TextField";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Switch from "@mui/material/Switch";
import { Paper } from "@mui/material";
import { ALERT_TYPE, BUILD_SEARCH, ERROR_MSG } from "../../../utils/Constants";
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
} from "../../../redux/candidate/myCvSlice";

import AutoComplete from "../../common/AutoComplete";
import { useSelector } from "react-redux";
import { TrainSharp } from "@mui/icons-material";
import { getSearchResult } from "../../../redux/admin/jobsSlice";
import TalentSVGButton from "../../common/TalentSVGButton";
import link from "../../../assets/Padding Excluded/Black_Documents.svg";
import diamond from "../../../assets/Characters/Red_Diamond.svg";

const BlueSwitch = styled(Switch)(({ theme }) => ({
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
    height: "60% !important",
  },
  "& .css-jsexje-MuiSwitch-thumb": {
    borderRadius: "15% !important",
  },
  "& .css-5ryogn-MuiButtonBase-root-MuiSwitch-switchBase": {
    borderRadius: "15% !important",
  },
  "& .MuiSwitch-thumb": {
    borderRadius: "15% !important",
  },
}));

const BASIC = {
  town_id: [],
  nationality_id: [],
  current_job_title_id: [],
  tag_id: [],
  qualification_id: [],
  institution_id: [],
  school_id: [],
  association_id: [],
  language_id: [],
};

const StyledBox = styled("img")(() => ({
  cursor: "pointer",
  height: 60,
  width: 60,
  textAlign: "center",
}));

export default function BuildSearchNew() {
  const i18n = locale.en;
  const theme = useTheme();

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [value, setValue] = useState([20, 37]);
  const [basicData, setBasicData] = useState(BASIC);

  const { nationality, language, institution, school, association } =
    useSelector((state) => state.myCv);

  const { titles, skills, tools, qualifications, town, traits } = useSelector(
    (state) => state.postJobs
  );

  const getAllData = async () => {
    try {
      dispatch(setLoading(true));
      await Promise.all([
        dispatch(getTitles()),
        dispatch(getTraits()),
        dispatch(getQualification()),
        dispatch(getInstitute()),
        dispatch(getAssociation()),
        dispatch(getSkills()),
        dispatch(getTools()),
        dispatch(getSchool()),
        dispatch(getTown()),
        dispatch(getNationality()),
        dispatch(getLanguage()),
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

  const handleMultipleAutoComplete = (event, newValue, id) => {
    let newCultureData = {
      ...basicData,
      [id]: newValue.map((val) => val?.inputValue || val?.id || val),
    };

    console.log(newCultureData);
    setBasicData(newCultureData);
  };

  const handleSearch = async () => {
    console.log(basicData);
    const { payload } = await dispatch(getSearchResult(basicData));
    if (payload?.status == "success") {
      console.log(payload.data);
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

  useEffect(() => {
    getAllData();
  }, []);
  return (
    <Box>
      <Typography
        sx={{
          fontSize: "36px",
          fontWeight: 700,
          ml: 6,
        }}
      >
        {i18n["buildSearch.title"]}
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
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
            <StyledBox className="homeImages" alt="Home Image" src={diamond} />

            <Typography sx={{ fontSize: "12px", fontWeight: 900 }}>
              Select or add the information you want to search for below
            </Typography>
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
          <TalentSVGButton
            color={"redButton"}
            source={link}
            height={16}
            width={18}
            startIconMargin={"0px !important"}
          />

          <Typography sx={{ fontSize: "12px", fontWeight: 700 }}>
            Job Title(s)
          </Typography>

          <AutoComplete
            multiple={true}
            id="current_job_title_id"
            onChange={handleMultipleAutoComplete}
            sx={{ width: "50%", display: "inline-table" }}
            placeholder={"job titles"}
            data={titles}
          ></AutoComplete>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: "12px" }}>broad</Typography>
            <BlueSwitch defaultChecked />
            <Typography sx={{ fontSize: "12px" }}>narrow</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: "12px" }}>on</Typography>
            <BlueSwitch defaultChecked />
            <Typography sx={{ fontSize: "12px" }}>off</Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
