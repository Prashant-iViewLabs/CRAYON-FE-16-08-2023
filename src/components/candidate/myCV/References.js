import { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  InputLabel,
  Paper,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import locale from "../../../i18n/locale";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import InputBox from "../../common/InputBox";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ALERT_TYPE, CV_STEPS, ERROR_MSG } from "../../../utils/Constants";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { getCVWorkLife } from "../../../redux/candidate/myCVNew";
import { setAlert, setLoading } from "../../../redux/configSlice";
import {
  addReferenceData,
  addWorkData,
  getReferenceData,
} from "../../../redux/candidate/myCvSlice";
import { useSelector } from "react-redux";
import { getTitles } from "../../../redux/employer/postJobSlice";
import { getCompanies } from "../../../redux/employer/empProfileSlice";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import StyledButton from "../../common/StyledButton";
import AutoComplete from "../../common/AutoComplete";
import { useTheme } from "@emotion/react";
import SaveAndExit from "./dialogBox/SaveAndExit";

const i18n = locale.en;

const BlueSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: theme.palette.blueButton400.main,
    "&:hover": {
      backgroundColor: alpha(
        theme.palette.blueButton400.main,
        theme.palette.action.hoverOpacity
      ),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: theme.palette.blueButton400.main,
  },
  "& .MuiSwitch-track": {
    // marginTop: '-9px'
  },
}));

const REFERENCE = {
  reference_id: null,
  name: "",
  company_name: "",
  title: "",
  contact: 0,
  email: "",
};

export default function References({ changeStep, handleComplete }) {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [noReference, setNoReference] = useState(false);
  const [referenceData, setReferenceData] = useState([REFERENCE]);
  const [saveAndExit, setSaveAndExit] = useState(false);
  const [errors, setErrors] = useState([]);
  const [referenceID, setReferenceID] = useState([]);

  const { companies, titles } = useSelector((state) => state.myProfile);

  const getAllData = async () => {
    try {
      dispatch(setLoading(true));
      await Promise.all([dispatch(getCompanies()), dispatch(getTitles())]);
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

  const saveReferenceInfo = async () => {
    try {
      const { payload } = await dispatch(
        addReferenceData(noReference ? [] : { data: referenceData })
      );

      if (payload?.status == "success") {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Reference added successfully!",
          })
        );
        handleOpenNext();
        handleComplete();
        setErrors([]);
      } else if (payload?.status == "error") {
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

  const getReferenceInfo = async () => {
    const { payload } = await dispatch(getReferenceData());

    if (payload?.status == "success") {
      // console.log("PAYLOAD", payload?.data);
      payload?.data.length && setReferenceData(payload?.data);

      setReferenceID(payload?.data?.map((data) => data.reference_id));
    } else if (payload?.status == "error") {
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: "Fill the work life details",
        })
      );
    } else {
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: payload?.data,
        })
      );
    }
    dispatch(setLoading(false));
  };

  const handleNoReference = (event) => {
    const isChecked = event.target.checked;
    setNoReference(isChecked);
  };

  const handleCompVal = (event, newValue, id, index) => {
    const updatedReferenceData = [...referenceData];

    updatedReferenceData[index] = {
      ...updatedReferenceData[index],
      [id]: newValue?.inputValue || newValue?.name || "",
    };

    console.log(updatedReferenceData);
    setReferenceData(updatedReferenceData);
  };

  const handleTitleVal = (event, newValue, id, index) => {
    const updatedReferenceData = [...referenceData];

    updatedReferenceData[index] = {
      ...updatedReferenceData[index],
      [id]: newValue?.name || "",
    };

    console.log(updatedReferenceData);
    setReferenceData(updatedReferenceData);
  };

  const addReference = () => {
    setReferenceData((prevState) => [...prevState, REFERENCE]);
  };

  const removeReference = (event, index) => {
    if (referenceData.length > 1) {
      const newWorkData = referenceData.filter((data, i) => i + 1 != index);
      setReferenceData(newWorkData);
    }
  };

  const handleOpenNext = () => {
    setSaveAndExit((prevState) => !prevState);
  };

  const handleInputValue = (event, index) => {
    console.log(event);
    console.log(event.target.value);
    console.log(event.target.id);
    const updatedReferenceData = [...referenceData];
    let contactNumber;

    if (event.target.id === "contact") {
      contactNumber = Number(event.target.value);
    }
    console.log(typeof contactNumber);
    updatedReferenceData[index] = {
      ...updatedReferenceData[index],
      [event.target.id]:
        event.target.id === "contact"
          ? Number(event.target.value)
          : event.target.value || "",
    };

    console.log(updatedReferenceData);
    setReferenceData(updatedReferenceData);
  };

  const getPostFix = (index) => {
    if (index === 0) {
      return "st";
    } else if (index === 1) {
      return "nd";
    } else if (index === 2) {
      return "rd";
    } else {
      return "th";
    }
  };

  useEffect(() => {
    getReferenceInfo();
    getAllData();
  }, []);

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 700,
            ml: 1,
            mb: 2,
          }}
        >
          {CV_STEPS[3]}
        </Typography>
        <Divider
          component="hr"
          sx={{
            borderBottomWidth: 2,
            flex: "auto",
            m: 0,
            mr: 3.5,
            marginLeft: "20px",
          }}
        />
      </Box>
      {referenceData.length >= 0 &&
        referenceData.map((work, index) => (
          <Box key={index}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {index != 0 && (
                  <IconButton
                    aria-label="edit"
                    color="redButton"
                    sx={{
                      padding: "0 !important",
                      marginRight: "4px",
                    }}
                    onClick={(event) => removeReference(event, index + 1)}
                  >
                    <RemoveCircleIcon />
                  </IconButton>
                )}
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: 700,
                    flex: 1,
                    ml: 1,
                  }}
                >
                  {`${index + 1}` + getPostFix(index) + ` Reference`}
                </Typography>
              </Box>

              <Divider
                component="hr"
                sx={{
                  borderBottomWidth: 2,
                  flex: "auto",
                  m: 0,
                  mr: 3.5,
                  marginLeft: "20px",
                }}
              />
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
              <Box sx={{ width: "48%" }}>
                <InputLabel
                  htmlFor="company_name"
                  sx={{
                    color: "black",
                    paddingLeft: "10px",
                    paddingBottom: "2px",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  {"Reference Person Name and Surname"}
                </InputLabel>
                <InputBox
                  value={work?.name}
                  id="name"
                  placeholder={"Enter person name"}
                  onChange={(event) => handleInputValue(event, index)}
                />
              </Box>

              <Box sx={{ width: "50%" }}>
                <InputLabel
                  htmlFor="company_name"
                  sx={{
                    color: "black",
                    paddingLeft: "10px",
                    paddingBottom: "2px",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  {i18n["myCV.companyNameLabel"]}
                </InputLabel>

                <AutoComplete
                  showAddOption={true}
                  allowCustomInput={true}
                  disabled={noReference}
                  id="company_name"
                  //   sx={{ width: "94%" }}
                  // value={getCompValue()}
                  value={
                    companies?.find(
                      (title) => title.name == work?.company_name
                    ) || work?.company_name
                  }
                  index={index}
                  onChange={handleCompVal}
                  placeholder={"Enter company name"}
                  data={companies}
                ></AutoComplete>
              </Box>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
              <Box sx={{ width: "48%" }}>
                <InputLabel
                  htmlFor="title"
                  sx={{
                    color: "black",
                    paddingLeft: "10px",
                    paddingBottom: "2px",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  {i18n["myCV.jobTitleLable"]}
                </InputLabel>

                <AutoComplete
                  showAddOption={true}
                  allowCustomInput={true}
                  disabled={noReference}
                  id="title"
                  //   sx={{ width: "94%" }}
                  // value={getCompValue()}
                  value={
                    titles?.find((item) => item.name == work?.title) ||
                    work?.title
                  }
                  index={index}
                  onChange={handleTitleVal}
                  placeholder={"Enter job title"}
                  data={titles}
                ></AutoComplete>
              </Box>
              <Box sx={{ width: "50%" }}>
                <InputLabel
                  htmlFor="contact_number"
                  sx={{
                    color: "black",
                    paddingLeft: "10px",
                    paddingBottom: "2px",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  {"Contact Number"}
                </InputLabel>
                <InputBox
                  value={work?.contact}
                  id="contact"
                  type="number"
                  placeholder={"Enter your contact number"}
                  onChange={(event) => handleInputValue(event, index)}
                />
              </Box>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
              <Box sx={{ width: "48%" }}>
                <InputLabel
                  htmlFor="contact_number"
                  sx={{
                    color: "black",
                    paddingLeft: "10px",
                    paddingBottom: "2px",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  {"Email"}
                </InputLabel>
                <InputBox
                  value={work?.email}
                  id="email"
                  type="email"
                  placeholder={"Enter your email"}
                  onChange={(event) => handleInputValue(event, index)}
                />
              </Box>
            </Box>
          </Box>
        ))}
      <StyledButton
        disabled={noReference}
        variant="outlined"
        color="redButton100"
        onClick={addReference}
      >
        {"+ Add Reference"}
      </StyledButton>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pt: 5,
        }}
      >
        <Button
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
          onClick={() => {
            saveReferenceInfo();
          }}
        >
          {"save and exit"}
        </Button>
        <Button
          onClick={() => {
            changeStep(4);
            saveReferenceInfo();
            handleComplete();
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
          {"complete my CV"}
        </Button>
      </Box>
      <SaveAndExit
        handleOpen={handleOpenNext}
        show={saveAndExit}
        changeStep={changeStep}
      />
    </Box>
  );
}
