import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import locale from "../../../i18n/locale";
import { Box, InputLabel, TextField, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { setAlert, setLoading } from "../../../redux/configSlice";
import {
  addDetailData,
  getDetailData,
  uploadSpecData,
} from "../../../redux/employer/postJobSlice";
import { ALERT_TYPE, ERROR_MSG } from "../../../utils/Constants";
import Typography from "@mui/material/Typography";
import { POST_JOB_STEPS } from "../../../utils/Constants";
import TextEditor from "./TextEditor";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useParams } from "react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs from "dayjs";
import "dayjs/locale/en-gb";
dayjs.locale("en-gb");


const StyledButton = styled(Button)(({ theme }) => ({
  marginRight: "24px",
  fontSize: "14px",
  width: "150px",
  border: `2px solid ${theme.palette.redButton100.main}`,
  "& .MuiSvgIcon-root": {
    fontSize: "16px",
  },
}));

const DETAIL = {
  role_summary: "",
  role_responsibilty: "",
  role_requirements: "",
  job_start_date: null
};

const i18n = locale.en;
export default function TheDetails({ changeStep, handleComplete, handleOpenSaveAndExitDialog }) {
  const fileAccept = "application/pdf, application/doc, application/docx";
  const theme = useTheme()
  const currentDate = new Date();

  const dispatch = useDispatch();
  const { jobId } = useParams();
  const hiddenFileInput = useRef(null);

  const [detailData, setDetailData] = useState({ ...DETAIL, job_id: jobId });
  const [errors, setErrors] = useState([]);
  const [specName, setspecName] = useState("No file chosen");

  const getAllTheDetails = async () => {
    // const { payload } = await dispatch();
    try {
      dispatch(setLoading(true));
      const { payload } = await dispatch(getDetailData(jobId));
      if (payload?.status == "success") {
        const detail = payload?.data;
        setDetailData({ ...detail, job_id: jobId });
        setErrors([]);
      } else if (payload?.status == "error") {
        payload?.message?.length > 0 && setErrors(payload?.message);
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

  const saveDetail = async () => {
    try {
      console.log(detailData);
      const { payload } = await dispatch(addDetailData(detailData));
      if (payload?.status == "success") {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Details Data added successfully!",
          })
        );
        changeStep(3);
        handleComplete(2)
        setErrors([]);
      } else if (payload?.status == "error") {
        setErrors(payload?.errors);
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

  useEffect(() => {
    jobId != undefined && getAllTheDetails();
  }, [jobId]);

  const handleInputChange = (inputText, type) => {
    const newDetailData = {
      ...detailData,
      [type]: inputText,
    };
    setDetailData(newDetailData);
  };

  const handleDateChange = (newValue) => {
    console.log(newValue);
    const newDetailData = {
      ...detailData,
      job_start_date: dayjs(newValue).format("DD-MM-YYYY"),
    };
    const filteredErrors = errors?.filter((item) => item.key != "job_start_date");
    setErrors(filteredErrors);
    setDetailData(newDetailData);
  };
  const handleFileClick = () => {
    hiddenFileInput.current.click();
  };

  const handleFileChange = async (event) => {
    const formData = new FormData();
    formData.append("jobspec", event.target.files[0]);
    formData.append("job_id", jobId);
    try {
      const { payload } = await dispatch(uploadSpecData(formData));
      if (payload?.status == "success") {
        setspecName(event.target.files[0].name);
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Spec uploaded Successfully!",
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

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      gap: 3
    }}>
      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        {/* <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <input
            accept={fileAccept}
            ref={hiddenFileInput}
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <StyledButton
              variant="outlined"
              color="redButton100"
              onClick={handleFileClick}
            >
              {i18n["postAJob.uploadSpec"]}
            </StyledButton>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 400,
                ml: 1,
                mt: "4px",
              }}
            >
              {specName}
            </Typography>
          </Box>
          <StyledButton
            sx={{ opacity: 0.5 }}
            variant="contained"
            color="redButton100"
          >
            {i18n["postAJob.scrapeSpec"]}
          </StyledButton>
        </Box> */}
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 700,
            ml: 1,
            mb: 1,
          }}
        >
          {POST_JOB_STEPS[1]}
        </Typography>
        <Box>
          <InputLabel
            htmlFor="roleSummary"
            sx={{
              color: "black",
              paddingLeft: "10px",
              paddingBottom: "2px",
              fontSize: "15px",
              fontWeight: 500,
            }}
          >
            {i18n["postAJob.howTheyWillRole"]}
          </InputLabel>
          <TextEditor
            value={detailData?.role_summary}
            // title=
            type="role_summary"
            onInputCHange={handleInputChange}
          />
          {detailData?.role_summary == null &&
            errors.find((error) => error.key == "role_summary") && (
              <Typography color={"red"}>
                {`*${errors.find((error) => error.key == "role_summary").message
                  }`}
              </Typography>
            )}
        </Box>
        <Box sx={{ mt: 3 }}>
          <InputLabel
            htmlFor="roleResponsibility"
            sx={{
              color: "black",
              paddingLeft: "10px",
              paddingBottom: "2px",
              fontSize: "15px",
              fontWeight: 500,
            }}
          >
            {i18n["postAJob.whatTheyWillDo"]}
          </InputLabel>
          <TextEditor
            value={detailData?.role_responsibilty}
            // title=
            type="role_responsibilty"
            onInputCHange={handleInputChange}
          />
          {detailData?.role_responsibilty == null &&
            errors.find((error) => error.key == "role_responsibilty") && (
              <Typography color={"red"}>
                {`*${errors.find((error) => error.key == "role_responsibilty")
                  .message
                  }`}
              </Typography>
            )}
        </Box>
        <Box sx={{ mt: 3 }}>

          <InputLabel
            htmlFor="roleRequirement"
            sx={{
              color: "black",
              paddingLeft: "10px",
              paddingBottom: "2px",
              fontSize: "15px",
              fontWeight: 500,
            }}
          >
            {i18n["postAJob.whatTheyWillNeed"]}
          </InputLabel>
          <TextEditor
            value={detailData.role_requirements}
            // title=
            type="role_requirements"
            onInputCHange={handleInputChange}
          />
          {detailData.role_requirements == null &&
            errors.find((error) => error.key == "role_requirements") && (
              <Typography color={"red"}>
                {`*${errors.find((error) => error.key == "role_requirements")
                  .message
                  }`}
              </Typography>
            )}
        </Box>
        <Box sx={{ width: "50%", mt: 3 }}>
          <InputLabel
            htmlFor="beginDate"
            sx={{
              color: "black",
              paddingLeft: "10px",
              paddingBottom: "2px",
              fontSize: "15px",
              fontWeight: 500,
            }}
          >
            {i18n["postAJob.whenTheyWillBegin"]}
          </InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs} locale="en-gb">
            <DatePicker
              name="job_start_date"
              // value={detailData.job_start_date}
              onChange={handleDateChange}
              minDate={currentDate}
              renderInput={(params) => (
                <TextField
                  {...params}
                  value={detailData.job_start_date}

                  inputProps={{
                    placeholder: "dd/mm/yyyy",
                  }}
                  sx={{
                    width: "95%",
                    "& .MuiInputBase-root": {
                      height: "40px",
                      width: "100%",
                      borderRadius: "40px",
                      // border: 1
                    },
                    '& .MuiIconButton-root': {
                      color: theme.palette.yellowColor, // Change this to the desired color
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>

          {errors?.find((error) => error.key == "job_start_date") && (
            <Typography color={"red !important"}>
              {`*${errors?.find((error) => error.key == "job_start_date").message}`}
            </Typography>
          )}
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
        // onClick={handle }
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
          onClick={saveDetail}
        >
          {i18n["postAJob.theCulture"]}
        </Button>
      </Box>
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 16,
        }}
      >
        <StyledButton
          startIcon={<ArrowBackIosIcon />}
          variant="outlined"
          sx={{ border: "none" }}
          color="redButton100"
          onClick={() => {
            changeStep(1);
          }}
        >
          {POST_JOB_STEPS[0]}
        </StyledButton>
        <StyledButton
          onClick={saveDetail}
          // onClick={handleNext}
          variant="outlined"
          color="redButton100"
        >
          {i18n["postAJob.theCulture"]}
        </StyledButton>
      </Box> */}
    </Box>
  );
}
