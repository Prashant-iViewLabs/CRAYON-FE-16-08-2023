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
import TheBasicsNew from "./TheBasicsNew";
import StudyLifeNew from "./StudyLifeNew";
import { useNavigate } from "react-router-dom";
import {
  LinearProgress,
  Step,
  StepButton,
  Stepper,
  linearProgressClasses,
} from "@mui/material";
import ProfileProgressButtonLayout from "../../common/ProfileProgressButtonLayout";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import WorkLifeNew from "./WorkLifeNew";
import References from "./References";

const i18n = locale.en;
const StyledButtonLeft = styled(Button)(({ theme }) => ({
  marginRight: "24px",
  fontSize: "14px",
  width: "140px",
  //   border: `2px solid ${theme.palette.redButton100.main}`,
  "& .MuiSvgIcon-root": {
    fontSize: "16px",
  },
  borderRadius: "10px",
}));

const BorderLinearProgress = styled(LinearProgress)(({ theme, value }) => ({
  height: "5px",
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grayBorder,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor:
      value == 100
        ? theme.palette.lightGreenButton300.main
        : theme.palette.redButton100.main,
  },
}));

const steps = [
  {
    label: "The Basics",
  },
  {
    label: "Work Life",
  },
  {
    label: "Study Life",
  },
  {
    label: "References",
  },
  {
    label: "View CV",
  },
];

export default function MyCV() {
  const [step, setStep] = useState(0);
  const dispatch = useDispatch();
  const theme = useTheme();

  const navigate = useNavigate();

  const [progressButton, setProgressButton] = useState(false);
  const [displayD, setDisplayD] = useState("none");
  const [expanded, setExpanded] = useState(false);
  const [completed, setCompleted] = useState({});

  const [profileCompletion, setProfileCompletion] = useState({
    profileCompletion: 0,
    cvBasics: 0,
    workLife: 0,
    studyLife: 0,
    references: 0,
  });

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

  window.onclick = (e) => {
    if (
      e.target.className !== "candidate-profile-viewer-dropdown" &&
      e.target.id !== "candidate-profile-viewer-btn"
    ) {
      setDisplayD("none");
    }
  };

  function LinearProgressWithLabel(props) {
    return (
      <Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
        <Box sx={{ width: "100%", mr: 1 }}>
          <BorderLinearProgress variant="determinate" {...props} />
        </Box>
      </Box>
    );
  }

  const handlePageChange = (test) => {
    if (test === "a") {
      navigate("/candidate/my-profile");
      setDisplayD("none");
      setExpanded(true);
    } else if (test === "b") {
      navigate("/candidate/my-cv");
      setExpanded(true);
    } else if (test === "c") {
    } else if (test === "d") {
      navigate("candidate/my-cam");
    }
  };

  const scrollToTop = () => {
    // Scroll to the top of the page with smooth behavior
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleStep = (steps) => {
    scrollToTop();
    handleComplete();

    if (steps === 4 && decodedToken?.data?.profile_percent_complete === null) {
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: "Complete your profile first",
        })
      );
    } else {
      console.log(steps);
      setStep(steps);
    }
  };
  const handleComplete = (steps) => {
    const newCompleted = completed;
    newCompleted[steps || step] = true;
    setCompleted(newCompleted);
    // handleNext();
    scrollToTop();
  };

  return (
    <>
      <Grid
        container
        spacing={0}
        sx={{ pt: 3 }}
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
      >
        <Grid item md={2} lg={1} xl={1} className="filterSec">
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <StyledButtonLeft
              onClick={() => {
                handleStep(0);
              }}
              variant={"contained"}
              color={step !== 4 ? "redButton100" : "grayButton500"}
              sx={{
                mb: 1,
                borderRadius: "0 5px 5px 0",
                color: step !== 4 ? "" : theme.palette.buttonText?.main,
              }}
            >
              {"build my CV"}
            </StyledButtonLeft>
            <StyledButtonLeft
              onClick={() => handleStep(4)}
              variant={"contained"}
              color={step === 4 ? "redButton100" : "grayButton500"}
              sx={{
                mb: 1,
                borderRadius: "0 5px 5px 0",
                color: step === 4 ? "" : theme.palette.buttonText?.main,
              }}
            >
              {"view my CV"}
            </StyledButtonLeft>
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "36px",
                fontWeight: 700,
                display: "flex",
                justifyContent: "center",
                paddingBottom: "6px",
                textAlign: "center",
                width: "50%",
              }}
            >
              {"my Crayon Vitae"}
            </Typography>

            <Box
              sx={{
                width: "30%",
                background: "#ffff",
                borderRadius: "17px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                // zIndex: 100,
                position: "relative",
                padding: "0 0 16px 32px",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexGrow: 1,
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 600,
                      mr: 1,
                    }}
                  >
                    {i18n["empMyProfile.profileCompletion"]}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 600,
                      mr: 1,
                    }}
                  >
                    Progress
                  </Typography>
                </Box>

                <Button
                  sx={{
                    // position: "",
                    flexDirection: "column",
                    right: 0,
                    top: 0,
                    border: 1,
                    borderColor: theme.palette.grayBorder,
                    borderRadius: 0,
                    borderTopRightRadius: "17px",
                  }}
                  onClick={() => setProgressButton((prevState) => !prevState)}
                  variant="outlined"
                  color="grayButton"
                >
                  <ProfileProgressButtonLayout
                    profileCompletion={profileCompletion.profileCompletion}
                    cvBasics={profileCompletion.cvBasics}
                    workLife={profileCompletion.workLife}
                    studyLife={profileCompletion.studyLife}
                    references={profileCompletion.references}
                  />
                  {!progressButton ? <ExpandMore /> : <ExpandLess />}
                </Button>
              </Box>
              <Box
                sx={{
                  paddingRight: "32px",
                }}
              >
                <LinearProgressWithLabel
                  value={
                    profileCompletion.profileCompletion +
                    profileCompletion.cvBasics +
                    profileCompletion.workLife +
                    profileCompletion.studyLife +
                    profileCompletion.references
                  }
                />
                {console.log(profileCompletion)}
              </Box>

              {progressButton && (
                <Box
                  sx={{
                    backgroundColor: "white",
                    position: "absolute",
                    // display: displayD,
                    right: 0,
                    // bottom: 0,
                    width: "100%",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    zIndex: 999,
                    borderRadius: "17px",
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      p: 2,
                      gap: 2,
                    }}
                    className="candidate-profile-viewer-dropdown"
                  >
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        textAlign: "left",
                        color: "gray",
                        fontWeight: 700,
                      }}
                    >
                      <strong>Remember,</strong> the more you complete, the
                      stronger you can compete!
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Button
                        variant="contained"
                        color="redButton100"
                        sx={{
                          borderRadius: 2,
                          width: "70%",
                          display: "flex",
                          justifyContent: "start",
                          gap: 1,
                        }}
                        onClick={() => handlePageChange("a")}
                      >
                        <Box
                          sx={{
                            borderRadius: "50%",
                            background: "white",
                            width: 25,
                            height: 25,
                            color: "red",
                          }}
                        >
                          1
                        </Box>
                        Profile
                      </Button>
                      <Box
                        sx={{
                          flexGrow: 1,
                          display: "flex",
                          justifyContent: "end",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          variant="contained"
                          color={
                            profileCompletion.profileCompletion
                              ? "greenButton"
                              : "grayButton400"
                          }
                          sx={{
                            height: "6px",
                            minWidth: 10,
                            padding: "0px",
                            borderRadius: "5px",
                          }}
                        ></Button>
                      </Box>

                      <Typography sx={{ fontSize: "12px" }} color={"GrayText"}>
                        {profileCompletion.profileCompletion ? "25%" : "0%"}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Button
                        variant="contained"
                        color="grayButton100"
                        sx={{
                          borderRadius: 2,
                          width: "70%",
                          display: "flex",
                          justifyContent: "start",
                          gap: 1,
                        }}
                        onClick={() => handlePageChange("b")}
                      >
                        <Box
                          sx={{
                            borderRadius: "50%",
                            background: "lightGray",
                            width: 25,
                            height: 25,
                            color: "black",
                          }}
                        >
                          2
                        </Box>
                        Crayon vitae
                      </Button>
                      <Box
                        sx={{
                          flexGrow: 1,
                          display: "flex",
                          justifyContent: "end",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          variant="contained"
                          color={
                            profileCompletion.cvBasics
                              ? "greenButton"
                              : "grayButton400"
                          }
                          sx={{
                            height: "6px",
                            minWidth: 10,
                            padding: "0px",
                            borderRadius: "5px",
                          }}
                        ></Button>
                        <Button
                          variant="contained"
                          color={
                            profileCompletion.workLife
                              ? "greenButton"
                              : "grayButton400"
                          }
                          sx={{
                            height: "6px",
                            minWidth: 10,
                            padding: "0px",
                            borderRadius: "5px",
                          }}
                        ></Button>
                        <Button
                          variant="contained"
                          color={
                            profileCompletion.studyLife
                              ? "greenButton"
                              : "grayButton400"
                          }
                          sx={{
                            height: "6px",
                            minWidth: 10,
                            padding: "0px",
                            borderRadius: "5px",
                          }}
                        ></Button>
                        <Button
                          variant="contained"
                          color={
                            profileCompletion.references
                              ? "greenButton"
                              : "grayButton400"
                          }
                          sx={{
                            height: "6px",
                            minWidth: 10,
                            padding: "0px",
                            borderRadius: "5px",
                          }}
                        ></Button>
                      </Box>

                      <Typography sx={{ fontSize: "12px" }} color={"GrayText"}>
                        {profileCompletion.profileCompletion ? "25%" : "0%"}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Button
                        variant="contained"
                        color="grayButton100"
                        sx={{
                          borderRadius: 2,
                          width: "70%",
                          display: "flex",
                          justifyContent: "start",
                          gap: 1,
                        }}
                        // onClick={() => handlePageChange("a")}
                        disabled
                      >
                        <Box
                          sx={{
                            borderRadius: "50%",
                            background: "lightGray",
                            width: 25,
                            height: 25,
                            color: "black",
                          }}
                        >
                          3
                        </Box>
                        Personality Assessment
                      </Button>
                      <Box
                        sx={{
                          flexGrow: 1,
                          display: "flex",
                          justifyContent: "end",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          variant="contained"
                          color={
                            profileCompletion.personalAssessment
                              ? "greenButton"
                              : "grayButton400"
                          }
                          sx={{
                            height: "6px",
                            minWidth: 10,
                            padding: "0px",
                            borderRadius: "5px",
                          }}
                        ></Button>
                      </Box>

                      <Typography sx={{ fontSize: "12px" }} color={"GrayText"}>
                        {profileCompletion.personalAssessment ? "25%" : "0%"}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Button
                        variant="contained"
                        color="grayButton100"
                        sx={{
                          borderRadius: 2,
                          width: "70%",
                          display: "flex",
                          justifyContent: "start",
                          gap: 1,
                        }}
                        // onClick={() => handlePageChange("a")}
                        disabled
                      >
                        <Box
                          sx={{
                            borderRadius: "50%",
                            background: "lightGray",
                            width: 25,
                            height: 25,
                            color: "black",
                          }}
                        >
                          4
                        </Box>
                        Crayon cam
                      </Button>
                      <Box
                        sx={{
                          flexGrow: 1,
                          display: "flex",
                          justifyContent: "end",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          variant="contained"
                          color={
                            profileCompletion.crayonCam
                              ? "greenButton"
                              : "grayButton400"
                          }
                          sx={{
                            height: "6px",
                            minWidth: 10,
                            padding: "0px",
                            borderRadius: "5px",
                          }}
                        ></Button>
                      </Box>

                      <Typography sx={{ fontSize: "12px" }} color={"GrayText"}>
                        {profileCompletion.crayonCam ? "25%" : "0%"}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>

          <Box
            sx={{
              background: "#ffff",
              borderRadius: "17px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              // zIndex: 100,
              position: "relative",
              mt: 2,
              px: 3,
              pt: 2,
              mb: 3,
              // minHeight: "748px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              {step === 0 && (
                <TheBasicsNew
                  changeStep={handleChangeStep}
                  handleComplete={handleComplete}
                  setProfileCompletion={setProfileCompletion}
                />
              )}
              {step === 1 && (
                <WorkLifeNew
                  changeStep={handleChangeStep}
                  handleComplete={handleComplete}
                />
              )}
              {step === 2 && (
                <StudyLifeNew
                  changeStep={handleChangeStep}
                  handleComplete={handleComplete}
                />
              )}
              {step === 3 && (
                <References
                  changeStep={handleChangeStep}
                  handleComplete={handleComplete}
                />
              )}
              {console.log(decodedToken?.data, step)}
              {step === 4 && (
                <CandidateCVPage
                  changeStep={handleChangeStep}
                  handleComplete={handleComplete}
                />
              )}
            </Box>
          </Box>
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
          <Stepper nonLinear activeStep={step} orientation="vertical">
            {steps.map((steps, index) => (
              <Step
                key={steps.label}
                completed={completed[index]}
                sx={{
                  "& .MuiStep-root": {
                    backgroundColor: theme.palette.eyeview.main,
                  },
                  "& .Mui-active": {
                    color: step === index ? "#FAFAFA !important" : "#D9D9D9",
                  },
                  "& .MuiStep-root.Mui-completed": {
                    color:
                      step === index
                        ? "#FAFAFA !important"
                        : theme.palette.buttonText.main,
                  },
                  "& .MuiStepIcon-text": {
                    fill:
                      step === index
                        ? theme.palette.eyeview.main
                        : theme.palette.buttonText.main,
                    fontWeight: 900,
                  },
                  "& .MuiStepLabel-label": {
                    fill:
                      step === index
                        ? theme.palette.eyeview.main
                        : theme.palette.buttonText.main,
                    fontWeight: 900,
                  },
                  "& .MuiStepIcon-root.Mui-completed": {
                    color:
                      step === index
                        ? theme.palette.buttonText.main
                        : theme.palette.eyeview.main,
                  },
                }}
              >
                <StepButton
                  color="inherit"
                  onClick={() => handleStep(index)}
                  style={{
                    // Customize styles here
                    color: "green",
                    border: `2px solid ${steps.borderColor}`,
                    borderRadius: "8px",
                    cursor: "pointer",
                    paddingRight: 0,
                    backgroundColor:
                      step === index
                        ? theme.palette.eyeview.main
                        : theme.palette.grayButton500.main,
                  }}
                >
                  {steps.label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </Grid>
      </Grid>
    </>
  );
}
