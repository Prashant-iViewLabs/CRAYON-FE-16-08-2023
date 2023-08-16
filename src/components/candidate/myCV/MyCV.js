import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import locale from "../../../i18n/locale";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import TheBasics from "./TheBasics";
import WorkLife from "./WorkLife";
import StudyLife from "./StudyLife";
import CandidateCVPage from "../cvPage/CandidateCVPage";
import jwt_decode from "jwt-decode";
import { ALERT_TYPE } from "../../../utils/Constants";
import { setAlert } from "../../../redux/configSlice";
import { useDispatch } from "react-redux";

const i18n = locale.en;
const StyledButtonLeft = styled(Button)(({ theme }) => ({
  marginRight: "24px",
  fontSize: "14px",
  width: "140px",
  border: `2px solid ${theme.palette.redButton100.main}`,
  "& .MuiSvgIcon-root": {
    fontSize: "16px",
  },
  borderRadius: "10px",
}));

export default function MyCV() {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();

  const token = localStorage?.getItem("token");
  let decodedToken;
  if (token) {
    decodedToken = jwt_decode(token);
  }

  console.log(decodedToken?.data?.profile_percent_complete);

  const handleLeftButtonClick = (param) => {
    if (param === 4 && decodedToken?.data?.profile_percent_complete === null) {
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: "Complete your profile first",
        })
      );
    } else {
      setStep(param);
    }
  };

  const handleChangeStep = (value) => {
    setStep(value);
  };

  return (
    <>
      <Grid
        container
        spacing={0}
        sx={{ pb: 3 }}
        flexDirection={{ xs: "column", sm: "row" }}
      >
        <Grid
          container
          spacing={0}
          sx={{ pb: 3 }}
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          width={"auto"}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <StyledButtonLeft
              onClick={() => handleLeftButtonClick(1)}
              variant={step === 1 ? "contained" : "outlined"}
              color="redButton100"
              sx={{ mb: 2, borderRadius: "0 5px 5px 0" }}
            >
              {i18n["myCV.basic"]}
            </StyledButtonLeft>
            <StyledButtonLeft
              onClick={() => handleLeftButtonClick(2)}
              variant={step === 2 ? "contained" : "outlined"}
              color="redButton100"
              sx={{ mb: 2, borderRadius: "0 5px 5px 0" }}
            >
              {i18n["myCV.workLife"]}
            </StyledButtonLeft>
            <StyledButtonLeft
              onClick={() => handleLeftButtonClick(3)}
              variant={step === 3 ? "contained" : "outlined"}
              color="redButton100"
              sx={{ mb: 2, borderRadius: "0 5px 5px 0" }}
            >
              {i18n["myCV.studyLife"]}
            </StyledButtonLeft>
            <StyledButtonLeft
              onClick={() => handleLeftButtonClick(4)}
              variant={step === 4 ? "contained" : "outlined"}
              color="redButton100"
              sx={{ mb: 2, borderRadius: "0 5px 5px 0" }}
            >
              {i18n["myCV.preview"]}
            </StyledButtonLeft>
          </Box>
        </Grid>
        <Grid xs={12} sm={6} md={8} lg={9} xl={10}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography
              sx={{
                fontSize: "36px",
                fontWeight: 700,
                display: "flex",
                justifyContent: "center",
                paddingBottom: "6px",
              }}
            >
              {i18n["myCV.crayonVitae"]}
            </Typography>
          </Box>
          <Box
            sx={{
              boxShadow: 4,
              px: 3,
              py: 2,
              minHeight: "748px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              {step === 1 && <TheBasics changeStep={handleChangeStep} />}
              {step === 2 && <WorkLife changeStep={handleChangeStep} />}
              {step === 3 && <StudyLife changeStep={handleChangeStep} />}
              {step === 4 &&
                decodedToken?.data?.profile_percent_complete !== null && (
                  <CandidateCVPage changeStep={handleChangeStep} />
                )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
