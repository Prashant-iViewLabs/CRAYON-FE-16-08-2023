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
import link from "../../../assets/CircularIcon/Red/Circular Icons__Red_Title_Job_Experience.svg";
import diamond from "../../../assets/Characters/Red_Diamond.svg";

const BlueSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: theme.palette.redButton100.main,
    "&:hover": {
      backgroundColor: alpha(
        theme.palette.redButton100.main,
        theme.palette.action.hoverOpacity
      ),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: theme.palette.redButton100.main,
  },
  "& .MuiSwitch-track": {
    margin: "auto",
    height: "50% !important",
    width: "90% !important",
    padding: "0px !important",
    backgroundColor: theme.palette.redButton100.main,
  },
  ".MuiButtonBase-root.MuiSwitch-switchBase": {
    borderRadius: "15% !important",
    padding: "11px !important",
  },
  "& .MuiSwitch-thumb": {
    borderRadius: "15% !important",
    height: "15px !important",
    width: "15px !important",
    backgroundColor: theme.palette.redButton100.main,
  },
  "& .MuiButtonBase-root-MuiSwitch-switchBase": {
    borderRadius: "15% !important",
    padding: "11px !important",
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
                textAlign: "end",
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
              <BlueSwitch defaultChecked />
              <Typography sx={{ fontSize: "12px" }}>narrow</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontSize: "12px" }}>on</Typography>
              <BlueSwitch defaultChecked />
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
                textAlign: "end",
              }}
            >
              Industry(ies)
            </Typography>
          </Box>

          <AutoComplete
            multiple={true}
            id="current_job_title_id"
            onChange={handleMultipleAutoComplete}
            sx={{ width: "50%", display: "inline-table" }}
            placeholder={"Search or add the preferred industry"}
            data={titles}
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
              <BlueSwitch defaultChecked />
              <Typography sx={{ fontSize: "12px" }}>narrow</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontSize: "12px" }}>on</Typography>
              <BlueSwitch defaultChecked />
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
                textAlign: "end",
              }}
            >
              Company(ies)
            </Typography>
          </Box>

          <AutoComplete
            multiple={true}
            id="current_job_title_id"
            onChange={handleMultipleAutoComplete}
            sx={{ width: "50%", display: "inline-table" }}
            placeholder={"Select or add the preferred company"}
            data={titles}
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
              <BlueSwitch defaultChecked />
              <Typography sx={{ fontSize: "12px" }}>narrow</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontSize: "12px" }}>on</Typography>
              <BlueSwitch defaultChecked />
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
                textAlign: "end",
              }}
            >
              Company(ies)
            </Typography>
          </Box>

          <AutoComplete
            multiple={true}
            id="current_job_title_id"
            onChange={handleMultipleAutoComplete}
            sx={{ width: "50%", display: "inline-table" }}
            placeholder={"Select or add the preferred company"}
            data={titles}
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
              <BlueSwitch defaultChecked />
              <Typography sx={{ fontSize: "12px" }}>narrow</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontSize: "12px" }}>on</Typography>
              <BlueSwitch defaultChecked />
              <Typography sx={{ fontSize: "12px" }}>off</Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
