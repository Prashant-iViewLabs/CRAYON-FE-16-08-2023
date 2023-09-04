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

const BlueSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: theme.palette.blueButton500.main,
    "&:hover": {
      backgroundColor: alpha(
        theme.palette.blueButton400.main,
        theme.palette.action.hoverOpacity
      ),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: theme.palette.blueButton500.main,
  },
}));

function valuetext(value) {
  return `${value}°C`;
}

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "45%",
  marginRight: "8px",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.black,
    borderRadius: "20px",
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

const tempArray = [1, 2];

export default function BuildSearch() {
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
            justifyContent: "center",
            mb: 3,
          }}
        >
          <ButtonMenu />
          <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
            <AutoComplete
              multiple={true}
              id="current_job_title_id"
              onChange={handleMultipleAutoComplete}
              sx={{ width: "98%", display: "inline-table" }}
              placeholder={"job titles"}
              data={titles}
            ></AutoComplete>
          </Box>

          <BlueSwitch defaultChecked />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <ButtonMenu />
          <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
            <AutoComplete
              multiple={true}
              id="tag_id"
              //   value={getTraitsValue()}
              onChange={handleMultipleAutoComplete}
              sx={{ width: "98%", display: "inline-table" }}
              placeholder={"tags"}
              data={traits}
            ></AutoComplete>
          </Box>

          <BlueSwitch defaultChecked />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <ButtonMenu />
          <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
            <AutoComplete
              multiple={true}
              id="qualification_id"
              //   value={getTraitsValue()}
              onChange={handleMultipleAutoComplete}
              sx={{ width: "98%", display: "inline-table" }}
              placeholder={"qualifications"}
              data={qualifications}
            ></AutoComplete>
          </Box>

          <BlueSwitch defaultChecked />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <ButtonMenu />
          <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
            <AutoComplete
              multiple={true}
              id="institution_id"
              //   value={getTraitsValue()}
              onChange={handleMultipleAutoComplete}
              sx={{ width: "98%", display: "inline-table" }}
              placeholder={"institutions"}
              data={institution}
            ></AutoComplete>
          </Box>

          <BlueSwitch defaultChecked />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <ButtonMenu />
          <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
            <AutoComplete
              multiple={true}
              id="association_id"
              //   value={getTraitsValue()}
              onChange={handleMultipleAutoComplete}
              sx={{ width: "98%", display: "inline-table" }}
              placeholder={"associations"}
              data={association}
            ></AutoComplete>
          </Box>

          <BlueSwitch defaultChecked />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <ButtonMenu />
          <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
            <AutoComplete
              multiple={true}
              id="school_id"
              //   value={getTraitsValue()}
              onChange={handleMultipleAutoComplete}
              sx={{ width: "98%", display: "inline-table" }}
              placeholder={"schools"}
              data={school}
            ></AutoComplete>
          </Box>

          <BlueSwitch defaultChecked />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <ButtonMenu />
          <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
            <AutoComplete
              multiple={true}
              id="town_id"
              //   value={getTraitsValue()}
              onChange={handleMultipleAutoComplete}
              sx={{ width: "98%", display: "inline-table" }}
              placeholder={"towns"}
              data={town}
            ></AutoComplete>
          </Box>

          <BlueSwitch defaultChecked />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <ButtonMenu />
          <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
            <AutoComplete
              multiple={true}
              id="nationality_id"
              //   value={getTraitsValue()}
              onChange={handleMultipleAutoComplete}
              sx={{ width: "98%", display: "inline-table" }}
              placeholder={"nationalities"}
              data={nationality}
            ></AutoComplete>
          </Box>

          <BlueSwitch defaultChecked />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <ButtonMenu />
          <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
            <AutoComplete
              multiple={true}
              id="language_id"
              //   value={getTraitsValue()}
              onChange={handleMultipleAutoComplete}
              sx={{ width: "98%", display: "inline-table" }}
              placeholder={"languages"}
              data={language}
            ></AutoComplete>
          </Box>

          <BlueSwitch defaultChecked />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 1,
            mt: 5,
          }}
        >
          <Button
            variant="contained"
            color="redButton"
            sx={{ width: "18%", mr: 3 }}
            onClick={handleSearch}
          >
            {i18n["buildSearch.update"]}
          </Button>
          <Button variant="contained" color="redButton" sx={{ width: "18%" }}>
            {i18n["buildSearch.clearAll"]}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
