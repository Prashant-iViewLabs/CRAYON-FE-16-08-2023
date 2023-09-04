import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import ButtonPanel from "../../common/ButtonPanel";
import { EMPLOYER_JOB_POSTING_SPEC_LEFT } from "../../../utils/Constants";
import locale from "../../../i18n/locale";
import { useState } from "react";
import {
  Step,
  StepButton,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import TheBasicsNew from "./TheBasics";
import TheDetailsNew from "./TheDetails";
import CultureAddNew from "./CultureAdd";
import JobType from "./JobType";
import { useParams } from "react-router-dom";
import SavaAndExit from "./dialog/SavaAndExit";

const i18n = locale.en;

const steps = [
  {
    label: "Job Type",
  },
  {
    label: "the basics",
  },
  {
    label: "the details",
  },
  {
    label: "culture add",
  },
];
const StyledButtonLeft = styled(Button)(({ theme }) => ({
  // marginRight: "24px",
  fontSize: "14px",
  width: "140px",
  border: `1px solid ${theme.palette.redButton100.main}`,
  "& .MuiSvgIcon-root": {
    fontSize: "16px",
  },
  borderRadius: "2px",
}));

export default function MyCV() {
  const [step, setStep] = useState(1);

  const [activeStep, setActiveStep] = useState(0);

  const [completed, setCompleted] = useState({});
  const [jobType, setJobType] = useState("");
  const { jobId } = useParams();

  const [openSaveAndExitDialog, setOpenSaveAndExitDialog] = useState(false);

  console.log(jobId);

  const handleRightButtonClick = (param) => {
    setStep(param);
  };

  const handleChangeStep = (value) => {
    setStep(value);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const scrollToTop = () => {
    // Scroll to the top of the page with smooth behavior
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleStep = (step) => {
    setActiveStep(step);
    scrollToTop();
  };
  const handleComplete = (step) => {
    const newCompleted = completed;
    newCompleted[step || activeStep] = true;
    setCompleted(newCompleted);
    console.log(activeStep);
    // handleNext();
    scrollToTop();
  };
  const handleOpenSaveAndExitDialog = () => {
    setOpenSaveAndExitDialog((prevState) => !prevState);
  };

  return (
    <>
      <Grid
        container
        spacing={0}
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
      >
        <Grid item md={2} lg={1} xl={1} className="filterSec">
          <Box>
            <ButtonPanel
              panelData={EMPLOYER_JOB_POSTING_SPEC_LEFT}
              side="left"
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={8}
          lg={9}
          xl={10}
          sx={{
            px: 2,
            display: "flex",
            flexDirection: "column",
            paddingBottom: 6,
          }}
          gap={1}
          flexGrow="1 !important"
        >
          <Typography
            sx={{
              fontSize: "36px",
              mb: 3,
              fontWeight: 700,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {i18n["postAJob.title"]}
          </Typography>
          <Box
            sx={{
              boxShadow: "0px 3px 6px #00000029",
              p: 3,
              // minHeight: "748px",
              borderRadius: "17px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              background: "#FFFFFF",
              paddingBottom: 0,
            }}
          >
            <Box>
              {activeStep === 0 && (
                <JobType
                  changeStep={handleStep}
                  handleComplete={handleComplete}
                  handleJobType={setJobType}
                  selectedJobType={jobType}
                  jobId={jobId}
                />
              )}
              {activeStep === 1 && (
                <TheBasicsNew
                  changeStep={handleStep}
                  handleComplete={handleComplete}
                  handleJobType={setJobType}
                  selectedJobType={jobType}
                  handleOpenSaveAndExitDialog={handleOpenSaveAndExitDialog}
                />
              )}
              {activeStep === 2 && (
                <TheDetailsNew
                  changeStep={handleStep}
                  handleComplete={handleComplete}
                  handleOpenSaveAndExitDialog={handleOpenSaveAndExitDialog}
                />
              )}
              {activeStep === 3 && (
                <CultureAddNew
                  changeStep={handleStep}
                  handleOpenSaveAndExitDialog={handleOpenSaveAndExitDialog}
                />
              )}
            </Box>
          </Box>
          <style>
            {`.postAJobComponent::-webkit-scrollbar {
                      width: 5px !important;
                      background-color: #FFFFFF; /* Set the background color of the scrollbar */
                    }
                    .postAJobComponent::-webkit-scrollbar-thumb {
                      background-color: #EFEEEE;
                      width: 5px;
                      box-shadow: 0px 3px 3px #00000029;
                      border-radius: 3px;/* Set the color of the scrollbar thumb */
                    }`}
          </style>
        </Grid>
        <Grid
          item
          md={2}
          lg={1}
          xl={1}
          className="rightfilterSec"
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "88vh",
            // overflowY: "scroll",
            // // direction: "rtl",
          }}
        >
          {/* <StyledButtonLeft
          onClick={() => handleRightButtonClick(1)}
          variant={step === 1 ? "contained" : "outlined"}
          color="redButton100"
          sx={{ mb: 2 }}
        >
          Job Type */}
          {/* {i18n["postAJob.theBasics"]} */}
          {/* </StyledButtonLeft>
        <StyledButtonLeft
          onClick={() => handleRightButtonClick(2)}
          variant={step === 2 ? "contained" : "outlined"}
          color="redButton100"
          sx={{ mb: 2 }}
        >
          {i18n["postAJob.theBasics"]}
        </StyledButtonLeft>
        <StyledButtonLeft
          onClick={() => handleRightButtonClick(3)}
          // disabled={!jobId}
          variant={step === 3 ? "contained" : "outlined"}
          color="redButton100"
          sx={{ mb: 2 }}
        >
          {i18n["postAJob.theDetails"]}
        </StyledButtonLeft>
        <StyledButtonLeft
          onClick={() => handleRightButtonClick(4)}
          variant={step === 4 ? "contained" : "outlined"}
          color="redButton100"
        // disabled={!jobId}
        >
          {i18n["postAJob.theCulture"]}
        </StyledButtonLeft> */}
          <Stepper nonLinear activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label} completed={completed[index]}>
                <StepLabel
                  color="inherit"
                  onClick={() => handleStep(index)}
                  style={{
                    // Customize styles here
                    backgroundColor: step.backgroundColor,
                    color: "green",
                    border: `2px solid ${step.borderColor}`,
                    borderRadius: "8px",
                    cursor: "pointer",
                    paddingRight: 0,
                  }}
                >
                  {step.label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>

        {/* <ButtonPanel panelData={CANDIDATE_MY_CV_RIGHT} side='right' /> */}
      </Grid>
      <SavaAndExit
        show={openSaveAndExitDialog}
        handleOpen={handleOpenSaveAndExitDialog}
      />
    </>
  );
}
