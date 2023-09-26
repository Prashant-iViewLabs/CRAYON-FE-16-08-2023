import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import job_logo from "../../../assets/job_logo.svg";
import job_volume from "../../../assets/job_volume.svg";
import education_type from "../../../assets/Padding Included/Crayon Icon_Education Type.svg";
import own_equipment from "../../../assets/Padding Included/Crayon Icon_Own Equipment.svg";
import own_vehicle from "../../../assets/Padding Included/Crayon Icon_Own Vehicle.svg";
import dollar_sign from "../../../assets/dollar-sign.svg";
import start_date from "../../../assets/Padding Included/Crayon Icon_Start Date.svg";
import own_internet from "../../../assets/Padding Included/Crayon Icon_Own Internet.svg";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

import job_exp from "../../../assets/job_exp.png";
import profile_challenger from "../../../assets/Profile Icons_Challenger.svg";
import profile_character from "../../../assets/Profile Icons_Charater.svg";
import profile_collaborator from "../../../assets/Profile Icons_Collaborator.svg";
import profile_contemplator from "../../../assets/Profile Icons_Contemplator.svg";
import SmallButton from "../../common/SmallButton";
import { useTheme } from "@emotion/react";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import PlaceIcon from "@mui/icons-material/Place";
import SingleRadialChart from "../../common/SingleRadialChart";
import locale from "../../../i18n/locale";
import Button from "@mui/material/Button";
import VerticalStepper from "./VerticalStepper";
import { useDispatch } from "react-redux";
import {
  getAllQuestions,
  getAllQuestionsWithoutLogin,
} from "../../../redux/guest/getQuestions";
import { getAllIndustries, setAlert } from "../../../redux/configSlice";
import {
  ALERT_TYPE,
  AUTHORIZED_TAB_ITEMS_CANDIDATE,
  AUTHORIZED_TAB_ITEMS_EMPLOYER,
  ERROR_MSG,
  JOBS_RIGHT_COMPANIES_BUTTON,
  JOBS_RIGHT_STAGES_BUTTON_GROUP,
} from "../../../utils/Constants";
import CustomDialog from "../../common/CustomDialog";
import ApplyJobs from "./ApplyJobs";
import Login from "../../login/login";
import { login } from "../../../redux/login/loginSlice";
import { getLocalStorage, setLocalStorage } from "../../../utils/Common";
import { getJobDetail } from "../../../redux/guest/jobsSlice";
import DOMPurify from "dompurify";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {
  convertDatetimeAgo,
  dateConverterMonth,
} from "../../../utils/DateTime";
import { formatCurrencyWithCommas } from "../../../utils/Currency";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import JobDescripiton from "../../common/JobDescripiton";
import LeftArrow from "../../common/LeftArrow";
import RightArrow from "../../common/RightArrow";
import { useSelector } from "react-redux";
import ButtonPanel from "../../common/ButtonPanel";
import { getAllTypes } from "../../../redux/allTypes";
import { getAllJobRoleType } from "../../../redux/jobRole";
import { getAllStages } from "../../../redux/stages";

import MUIRadialChart from "../../common/MUIRadialChart";
import QuestionStepper from "./QuestionStepper"

import matchMeIcon from "../../../assets/Padding Excluded/Black_Match_me.svg";
import applyIcon from "../../../assets/Padding Excluded/Black_Follower.svg";
import CompanyLogo from "../../../assets/Padding Excluded/Blue_Following_Company-.svg";
import LocationIcon from "../../../assets/Red_Location.svg";
import CalendarIcon from "../../../assets/Padding Included/Yellow_Calendar.svg"
import viewjobsIcon from "../../../assets/Padding Excluded/Black_Linked_User_Databases.svg"
import followIcon from "../../../assets/Padding Excluded/Black_World_Website.svg"

import Slider2 from "../../common/Slider2";
import { truncate } from "lodash";
import SearchBar from "../../common/SearchBar";

const label1 = "applied";
const label2 = "shortlisted";
const label3 = "interviewed";
const label4 = "grit score";
const label5 = "months";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export default function JobsDetailPage() {
  const theme = useTheme();
  const i18n = locale.en;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [isStar, setIsStarSelected] = useState(false);

  const allIndustries = useSelector((state) => state.config.industries);
  const allJobTypes = useSelector((state) => state.jobtype.jobRoleType);
  const allStages = useSelector((state) => state.configstages.stages);
  const allTypes = useSelector((state) => state.configAllTypes?.types);

  console.log(allIndustries)
  const [job, setJob] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [openApplyJobDialog, setopenApplyJobDialog] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(getLocalStorage("isLoggedIn"))
  );
  const jobIndustries = job?.employer_industries?.map(industry => industry?.industry?.name)


  const getTypes = async () => {
    dispatch(getAllTypes());
  };
  const getIndustries = async () => {
    dispatch(getAllIndustries());
  };
  const getJobTypes = async () => {
    dispatch(getAllJobRoleType());
  };
  const getStages = async () => {
    dispatch(getAllStages());
  };
  const [rightExpand, setRightExpand] = useState(true);
  const [leftExpanded, setLeftExpand] = useState(true);
  const { id } = useParams();

  const getquestions = async () => {
    const { payload } = await dispatch(getAllQuestions(job?.job_id));
    if (payload?.status == "success") {
      setQuestions(payload.data);
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

  // const handleClick = () => {
  //   setOpenLoginDialog(true);
  //   getquestions();
  // };

  const handleClick = () => {
    setopenApplyJobDialog(true);
    getquestionswithoutlogin();
  };
  const onHandleClose = () => {
    setOpenLoginDialog(false);
  };

  const onHandleLogin = async (loginData) => {
    try {
      const { payload } = await dispatch(login(loginData));
      if (payload?.status == "success" && payload?.token) {
        const user = payload.data.role_id;
        setLocalStorage("token", payload?.token);
        onHandleClose();
        const jwt = localStorage?.getItem("token");
        const parts = jwt?.split(".");
        if (parts?.length != 3) {
          throw new Error("Invalid JWT");
        }
        const encodedPayload = parts[1];
        const decodedPayload = atob(encodedPayload);
        const payloadData = JSON.parse(decodedPayload);
        const profileCompletion = payloadData.data?.profile_percent_complete;
        let tabs;
        if (user === 4) {
          if (profileCompletion === 100) {
            tabs = AUTHORIZED_TAB_ITEMS_EMPLOYER;
            navigate("/employer/my-jobs", { replace: true });
          } else {
            tabs = AUTHORIZED_TAB_ITEMS_EMPLOYER;
            navigate("/employer/my-profile", { replace: true });
          }
        } else {
          if (profileCompletion === 0) {
            tabs = AUTHORIZED_TAB_ITEMS_CANDIDATE;
            navigate("/candidate/my-jobs", { replace: true });
          } else {
            tabs = AUTHORIZED_TAB_ITEMS_CANDIDATE;
            navigate("/candidate/my-profile", { replace: true });
          }
        }
        setLocalStorage("isLoggedIn", true);
        setLocalStorage("userType", user);
        setIsLoggedIn(true);
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Successfully Login!",
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

  const handleCardClick = async () => {
    try {
      const { payload } = await dispatch(getJobDetail({ job_id: id }));
      if (payload?.status == "success") {
        setJob(payload?.data);
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


  const getquestionswithoutlogin = async () => {
    const { payload } = await dispatch(
      getAllQuestionsWithoutLogin(job?.job_id)
    );
    if (payload?.status === "success") {
      setQuestions(payload.data);
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

  const onApplyHandleClose = () => {
    setopenApplyJobDialog(false);
  };


  const getBackground = (stageName) => {
    switch (stageName) {
      case "review":
        return theme.jobCard.jobStatus.Review.main;
      case "considering":
        return theme.jobCard.jobStatus.Considering.main;
      case "shortlist":
        return theme.jobCard.jobStatus.Shortlist.main;
      case "interview":
        return theme.jobCard.jobStatus.Interview.main;
      case "assessment":
        return theme.jobCard.jobStatus.Assesment.main;
      case "offer":
        return theme.jobCard.jobStatus.Offer.main;
      case "hired":
        return theme.jobCard.jobStatus.Hired.main;
      case "incomplete":
        return theme.jobCard.jobStatus.Incomplete.main;
      case "matched":
        return theme.jobCard.jobStatus.Matched.main;
      case "rehjected":
        return theme.jobCard.jobStatus.Rejected.main;
      default:
        return "lightGray";
    }
  };

  useEffect(() => {
    handleCardClick();
    getIndustries()
    getJobTypes();
    getStages();
    getTypes();
  }, []);

  return (
    <Box sx={{
      display: "flex",
      flexWrap: "nowrap",
    }}>

      <Grid
        item
        // md={2}
        // lg={1}
        // xl={1}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: leftExpanded ? "150px" : "40px",
          // marginRight: "30px",
        }}
      >
        <Button
          variant="contained"
          sx={{
            position: "static",
            borderRadius: "0 10px 10px 0",
            minWidth: "40px",
            width: "40px",
            height: "45px",

          }}
          color="redButton200"
          onClick={() => {
            setLeftExpand((prevState) => !prevState);
          }}
        >
          {leftExpanded ? <LeftArrow /> : <RightArrow />}
        </Button>
        {leftExpanded && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              height: "95vh",
              overflowY: leftExpanded ? "scroll" : "unset",
            }}
            className="filterSec"
          >
            <ButtonPanel
              panelData={allIndustries}
              side="left"
            // onChangeFilter={onChangeFilter}
            />

            <Button
              variant="contained"
              sx={{
                position: "static",
                borderRadius: "0 10px 10px 0",
                minWidth: "40px",
                width: "40px",
                height: "45px",
              }}
              color="redButton200"
              onClick={() => {
                setLeftExpand((prevState) => !prevState);
              }}
            >
              {leftExpanded ? <LeftArrow /> : <RightArrow />}
            </Button>
            <style>
              {`.filterSec::-webkit-scrollbar {
                      width: 0px !important;
                      background-color: #EFEEEE; /* Set the background color of the scrollbar */
                    }
                    .filterSec::-webkit-scrollbar-thumb {
                      background-color: white;
                      width: 0px;
                      box-shadow: 0px 3px 3px #00000029;
                      border-radius: 0px;
                    }`}
            </style>
          </Box>
        )}
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={8}
        lg={9}
        xl={10}
        sx={{
          padding: "30px",
          paddingTop: 0,
          display: "flex",
          flexDirection: "column",
        }}
        gap={"54px"}
        flexGrow="1 !important"
      >
        <SearchBar />

        <Grid
          container
          sx={{
            borderRadius: "25px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            background: "white",
            margin: "auto",
            padding: "0",
            gap: "10px",
            width: "1560px",
            justifyContent: "space-between",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Header Section Starts */}
          <Box sx={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-end"
          }}>
            <Box
              sx={{
                display: "flex",

              }}
            >
              <Button
                // color={"redButton"}
                variant="contained"
                sx={{
                  height: "auto",
                  minWidth: "60px",
                  minHeight: "45px",
                  borderRadius: "0 0 0 10px",
                  padding: 0,
                  boxShadow: 0,
                  fontSize: 12,
                  fontWeight: "normal",
                  background:
                    job?.job_type?.split(" ")[1] === "recruit"
                      ? theme.jobCard.jobType.recruit.main
                      : theme.jobCard.jobType.direct.main,
                  color: theme.jobCard.jobType.recruit.contrastText,
                  ":hover": {
                    boxShadow: 0,
                    background:
                      job?.job_type?.split(" ")[1] === "recruit"
                        ? theme.jobCard.jobType.recruit.main
                        : theme.jobCard.jobType.direct.main,
                  },
                }}
              >
                {job?.job_type?.split(" ")[1]}
              </Button>
              <Button
                sx={{
                  height: "auto",
                  minWidth: "60px",
                  minHeight: "45px",
                  borderRadius: 0,
                  padding: 0,
                  fontSize: 12,
                  fontWeight: "normal",
                  background: getBackground(job?.stage_name),
                  color: "white",
                  ":hover": {
                    background: getBackground(job?.stage_name),
                  },
                }}
              >
                {job?.stage_name || "-"}
              </Button>
              <Box
                sx={{
                  height: "45px",
                  width: "60px",
                  maxHeight: { xs: "60px" },
                  maxWidth: { xs: "60px" },
                  borderRadius: 0,
                  background: theme.palette.purpleButton300.main,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  sx={{
                    height: 30,
                    width: 30,
                    maxHeight: { xs: 30 },
                    maxWidth: { xs: 30 },
                  }}
                  alt="job_volume"
                  src={job_volume}
                  onClick={handleClick}
                />
              </Box>
              <Button
                color="grayButton200"
                // onClick={() => handleStar(job?.job_id)}
                sx={{
                  height: "auto",
                  minWidth: "60px",
                  minHeight: "45px",
                  background: theme.palette.grayBackground,
                  borderRadius: 0,
                  borderTopRightRadius: "25px",
                  padding: 0,
                }}
              >
                <StarRoundedIcon
                  color={isStar ? "error" : "disabled"}
                  fontSize="large"
                />
              </Button>
            </Box>
          </Box>
          {/* Header Section Ends */}
          {/* left Body Starts */}
          <Grid
            item
            width={"800px"}
            marginLeft={"120px"}
            sx={{
              display: "flex",
              flexDirection: "column"
            }} gap={"15px"}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "end"
              }}
            >
              <Box
                component="img"
                sx={{
                  height: 100,
                  width: 100,
                  borderRadius: "10px",
                  border: 1,
                  borderColor: "lightgray"
                }}
                alt="job_logo"
                src={job?.profile_url != "No URL" ? job?.profile_url : job_logo}
              />
              <Box>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: 12,
                    letterSpacing: "0.75px",
                    opacity: 0.8,
                    marginBottom: "5px",
                  }}
                >
                  posted {convertDatetimeAgo(job?.updated_at)}
                </Typography>

                <Tooltip arrow title={job?.title} placement="top">
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 800,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 1,
                    }}
                  >
                    {job?.title}
                  </Typography>
                </Tooltip>
              </Box>
            </Box>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    gap: 0.5,
                  }}
                >
                  <AccountBalanceWalletIcon fontSize="string" color="primary" />
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: 12,
                      letterSpacing: "0.25px",
                    }}
                  >
                    {job?.salary?.currency?.symbol}
                    {formatCurrencyWithCommas(job?.salary?.max)} per month
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    gap: 0.5,
                  }}
                >
                  <PlaceIcon fontSize="string" color="error" />
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: 12,
                      letterSpacing: "0.25px",
                    }}
                  >
                    {job?.town?.name}, {job?.town?.region?.name}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    gap: 0.5,
                  }}
                >
                  <Box
                    component="img"
                    sx={{
                      height: 16,
                      width: 16,
                      maxHeight: { xs: 15 },
                      maxWidth: { xs: 15 },
                    }}
                    alt="job_exp"
                    src={job_exp}
                  />
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: 12,
                      letterSpacing: "0.25px",
                    }}
                  >
                    {job?.experience?.year} years
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    gap: 0.5,
                  }}
                >
                  <CalendarMonthIcon fontSize="string" color="warning" />

                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: 12,
                      letterSpacing: "0.25px",
                    }}
                  >
                    {dateConverterMonth(job?.created_at)}
                  </Typography>
                </Box>
              </Box>

            </Box>

            <Grid
              sx={{
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: 15,
                  fontWeight: 900,
                }}
              >
                Work Type
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                <SmallButton
                  color={"blueButton900"}
                  height={25}
                  value={job?.type}
                  label={job?.type?.split(" ")[0]}
                />
                <SmallButton
                  color={"blueButton900"}
                  height={25}
                  value={job?.work_setup}
                  label={job?.work_setup}
                />
              </Box>
            </Grid>
            <Grid
              sx={{
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: 15,
                  fontWeight: 900,
                }}
              >
                Industry
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                {job?.employer_industries?.map((item) => {
                  return (
                    <SmallButton
                      color={"blueButton1000"}
                      height={25}
                      value={item?.industry?.name}
                      label={item?.industry?.name?.split(" ")[0]}
                    />
                  );
                })}
              </Box>
            </Grid>
            <Grid
              sx={{

              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: 15,
                  fontWeight: 900,
                }}
              >
                Skills
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                {job?.job_tags?.map((item) => {
                  return (
                    <SmallButton
                      color={"skillsButton"}
                      height={25}
                      value={item?.tag?.tag}
                      label={item?.tag?.tag}
                    />
                  );
                })}
              </Box>
            </Grid>
            <Grid
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: 15,
                  fontWeight: 900,
                }}
              >
                Tools
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                {job?.job_tools?.map((item) => {
                  return (
                    <SmallButton
                      color={"toolsButton"}
                      height={25}
                      value={item?.tool?.name}
                      label={item?.tool?.name}
                    />
                  );
                })}
              </Box>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px"
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: 15,
                  fontWeight: 900,
                  mb: 0.5,
                }}
              >
                Personality
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                }}
              >
                {/* <Grid sx={{
                        display: "flex",
                    }}> */}

                {job?.primary?.name && (
                  <Box
                    sx={{
                      width: "16.6%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      component="img"
                      sx={{
                        height: 100,
                        width: 100,
                      }}
                      alt="job_exp"
                      src={
                        (job?.primary?.name == "collaborator" &&
                          profile_collaborator) ||
                        (job?.primary?.name == "challenger" &&
                          profile_challenger) ||
                        (job?.primary?.name == "character" && profile_character) ||
                        (job?.primary?.name == "contemplator" &&
                          profile_contemplator)
                      }
                    />
                  </Box>
                )}
                {job?.shadow?.name && (
                  <Box
                    sx={{
                      width: "16.6%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      component="img"
                      sx={{
                        height: 100,
                        width: 100,
                      }}
                      alt="job_exp"
                      src={
                        (job?.shadow?.name == "collaborator" &&
                          profile_collaborator) ||
                        (job?.shadow?.name == "challenger" && profile_challenger) ||
                        (job?.shadow?.name == "character" && profile_character) ||
                        (job?.shadow?.name == "contemplator" &&
                          profile_contemplator)
                      }
                    />
                  </Box>
                )}
                <Box
                  sx={{
                    width: "16.6%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {/* <SingleRadialChart
                    max={1000}
                    labelsData={label4}
                    series={[job?.grit_score]}
                    width={130}
                    color={theme.palette.chart.red}
                    // index={index}
                    isHovered={isHovered}
                  /> */}
                  {/* <MUIRadialChart
                    size={100}
                    value={job?.grit_score}
                    countFontSize={16}
                    labelFontSize={14}
                    chartName={label4}
                    color={"blue"}
                  /> */}

                  <MUIRadialChart size={100} chartName={label4} color={"blue"} value={Number(job?.grit_score)} countFontSize={14} labelFontSize={12} max={100} />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                {job?.job_traits?.map((item) => {
                  return (
                    <SmallButton
                      color={"traitsButton"}
                      height={25}
                      value={item?.trait?.name}
                      label={item?.trait?.name}
                    />
                  );
                })}
              </Box>

            </Grid>

            <Grid
              sx={{
                mb: 4,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 16,
                  letterSpacing: "0.75px",
                  //   opacity: 0.8,
                  marginBottom: "8px",
                }}
              >
                How you'll role
              </Typography>
              <JobDescripiton description={job?.description} />
            </Grid>

            <Grid
              sx={{
                mb: 4,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 16,
                  letterSpacing: "0.75px",
                  marginBottom: "8px",
                }}
              >
                What you'll do
              </Typography>
              <JobDescripiton description={job?.role_responsibilty} />
            </Grid>

            <Grid
              sx={{
                mb: 4,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 16,
                  letterSpacing: "0.75px",
                  marginBottom: "8px",
                }}
              >
                What you'll need
              </Typography>
              <JobDescripiton description={job?.role_requirements} />
            </Grid>
            <Grid
              sx={{
                mb: 4,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 16,
                  letterSpacing: "0.75px",
                  marginBottom: "8px",
                }}
              >
                Job Notes
              </Typography>
              50% Medical Aid Contribution (employer)<br />
              Annual leave: 25 days
            </Grid>

            <Grid
              sx={{
                borderRadius: "25px",
                border: 1,
                borderColor: "lightgray",

              }}
            >
              <Button
                variant="contained"
                color={"blueButton700"}
                sx={{
                  borderRadius: "25px 0 10px 0",
                  ":hover": {
                    boxShadow: 0
                  }
                }}
              >
                Job questions
              </Button>
              <QuestionStepper questionList={job?.job_questions} />
              {/* {job?.job_questions?.map((question, index) => {
                return (
                  <>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: 16,
                        letterSpacing: "0.75px",
                        marginBottom: "8px",
                      }}
                    >
                      Question {index + 1}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 400,
                        fontSize: 14,
                        letterSpacing: "0.75px",
                        marginBottom: "8px",
                      }}
                    >
                      {question.question}
                    </Typography>
                  </>
                );
              })} */}
            </Grid>
          </Grid>
          {/* left Body Ends */}
          {/* right body Starts */}
          <Grid
            item
            width={"400px"}
            marginRight={"120px"}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <Box
              sx={{
                borderRadius: "25px",
                border: 1,
                borderColor: "lightGray",
                background: "aliceblue"
              }}
            >
              <Button
                variant="contained"
                color={"blueButton700"}
                sx={{
                  borderRadius: "25px 0 10px 0",
                  ":hover": {
                    boxShadow: 0
                  }
                }}
              >
                Job Info
              </Button>

              <Grid width={"95%"} padding={"20px"}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2
                  }}
                >
                  <Box
                    width={"25%"}
                    display={"flex"}
                    alignItems={"center"}
                    flexDirection={"column"}
                  >
                    <Box
                      component="img"
                      sx={{
                        height: 50,
                        width: 50,
                      }}
                      alt="own_vehicle"
                      src={own_vehicle}
                    />
                    <Typography
                      sx={{
                        fontSize: 9,
                        fontWeight: "Bold",
                      }}
                      paragraph
                    >
                      Own Transport
                    </Typography>
                  </Box>
                  <Box
                    width={"25%"}
                    display={"flex"}
                    alignItems={"center"}
                    flexDirection={"column"}
                  >
                    <Box
                      component="img"
                      sx={{
                        height: 50,
                        width: 50,
                      }}
                      alt="own_vehicle"
                      src={own_equipment}
                    />
                    <Typography
                      sx={{
                        fontSize: 9,
                        fontWeight: "Bold",
                      }}
                      paragraph
                    >
                      own equipment
                    </Typography>
                  </Box>
                  <Box
                    width={"25%"}
                    display={"flex"}
                    alignItems={"center"}
                    flexDirection={"column"}
                  >
                    <Box
                      component="img"
                      sx={{
                        height: 50,
                        width: 50,
                      }}
                      alt="own_vehicle"
                      src={own_internet}
                    />
                    <Typography
                      sx={{
                        fontSize: 9,
                        fontWeight: "Bold",
                      }}
                      paragraph
                    >
                      Internet Access
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{
                  display: "flex",
                  gap: 2
                }}>

                  <Box
                    width={"25%"}
                    display={"flex"}
                    alignItems={"center"}
                    flexDirection={"column"}
                  >
                    <Box
                      width={"25%"}
                      display={"flex"}
                      flexDirection={"column"}
                      alignItems={"center"}
                    >
                      <Box
                        component="img"
                        sx={{
                          height: 50,
                          width: 50,
                        }}
                        alt="education_type"
                        src={education_type}
                      />
                      <Typography
                        sx={{
                          fontSize: 9,
                          fontWeight: "Bold",
                        }}
                        paragraph
                      >
                        National diploma
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      width: "25%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    {/* <SingleRadialChart
                      max={1000}
                      labelsData={label5}
                      series={"6"}
                      color={theme.palette.chart.red}
                      isHovered={isHovered}
                    /> */}
                    <MUIRadialChart size={70} chartName={label5} color={"black"} value={6} countFontSize={14} labelFontSize={12} max={100} />
                  </Box>
                  <Box
                    width={"25%"}
                    display={"flex"}
                    alignItems={"center"}
                    flexDirection={"column"}
                    justifyContent={"end"}
                    gap={1}
                  >
                    <Box
                      component="img"
                      sx={{
                        height: 30,
                        width: 30,
                      }}
                      alt="currency"
                      src={dollar_sign}
                    />
                    <Typography
                      sx={{
                        fontSize: 9,
                        fontWeight: "Bold",
                      }}
                      paragraph
                    >
                      currency
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Box>

            <Box
              sx={{
                borderRadius: "25px",
                border: 1,
                borderColor: "lightGray",
                overflow: "hidden"
              }}
            >
              <Button
                variant="contained"
                color={"blueButton700"}
                sx={{
                  borderRadius: "25px 0 10px 0",
                  gap: 1,
                  ":hover": {
                    boxShadow: 0
                  }
                }}
              >
                This is a Crayon job
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
              </Button>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 3,
                  py: 2
                }}
              >
                {/* <SingleRadialChart
                      max={1000}
                      labelsData={label1}
                      series={[job?.TotalUserCount]}
                      width={130}
                      color={theme.palette.chart.red}
                      // index={index}
                      isHovered={isHovered}
                    /> */}
                <MUIRadialChart size={100} chartName={label1} value={job?.TotalUserCount} max={1000} countFontSize={16} labelFontSize={14} />

                {/* <SingleRadialChart
                    labelsData={label2}
                    series={[job?.TotalUserShorlisted]}
                    width={130}
                    color={theme.palette.chart.green}
                    // index={index}
                    isHovered={isHovered}
                  /> */}
                <MUIRadialChart
                  size={100}
                  chartName={label2}
                  value={job?.TotalUserShorlisted}
                  max={100}
                  countFontSize={16}
                  labelFontSize={14}
                />

                {/* <SingleRadialChart
                    labelsData={label3}
                    series={[job?.TotalUserInterviewed]}
                    width={130}
                    color={theme.palette.chart.yellow}
                    // index={index}
                    isHovered={isHovered}
                  /> */}
                <MUIRadialChart
                  size={100}
                  chartName={label2}
                  value={job?.TotalUserInterviewed}
                  max={50}
                  countFontSize={16}
                  labelFontSize={14}
                />
              </Box>
              {/* <Typography
                sx={{
                  padding: "20px 20px 0 20px",
                }}
                textAlign={"center"}
                paragraph
              >
                <strong> Note:</strong> For{" "}
                <SmallButton
                  color="yellowButton100"
                  label={i18n["jobCard.recruit"]}
                  mr={1}
                />{" "}
                You'll be dealing via the Crayon team and not with the client
                directly until appropriate.
              </Typography>
              <Typography
                sx={{
                  padding: "0 20px ",
                }}
                textAlign={"center"}
                paragraph
              >
                For{" "}
                <SmallButton
                  color="orangeButton"
                  label={i18n["jobCard.lite"]}
                  mr={1}
                />{" "}
                you'll be dealing directly with the client and not via crayon
              </Typography> */}
              <Grid container display={"flex"} flexWrap={"nowrap"} height={"50px"}>
                <Grid sx={{ width: "50%", padding: 0 }}>
                  <Button
                    sx={{
                      boxShadow: 0,
                      fontSize: "15px",
                      width: "100%",
                      borderRadius: 0,
                      height: "50px",
                    }}
                    color="blueButton700"
                    variant="contained"
                    onClick={handleClick}
                    startIcon={
                      <Box
                        component={"img"}
                        sx={{
                          height: 20,
                          width: 20,
                        }}
                        src={matchMeIcon}
                      />
                    }
                  >
                    {i18n["jobCard.matchnow"]}
                  </Button>
                </Grid>
                <Grid sx={{ width: "50%", padding: 0 }}>
                  <Button
                    sx={{
                      boxShadow: 0,
                      fontSize: "15px",
                      width: "100%",
                      borderRadius: 0,
                      height: "50px",
                    }}
                    variant="contained"
                    color="redButton100"
                    onClick={handleClick}
                    startIcon={
                      <Box
                        component={"img"}
                        sx={{
                          height: 20,
                          width: 20,
                        }}
                        src={applyIcon}
                      />
                    }
                  >
                    {i18n["jobCard.apply"]}
                  </Button>
                </Grid>
                <CustomDialog
                  show={openLoginDialog}
                  hideButton={false}
                  onDialogClose={onHandleClose}
                  dialogWidth="sm"
                  showFooter={false}
                  title={isLoggedIn ? i18n["login.login"] : i18n["login.signUp"]}
                  isApplyJob
                >
                  <Typography
                    sx={{ fontSize: "19px", color: "red", mb: 3, ml: 12 }}
                  >
                    {localStorage.getItem("isLoggedIn")
                      ? ""
                      : "To proceed further You need to login first!"}
                  </Typography>
                  {isLoggedIn ? (
                    <ApplyJobs questions={questions} />
                  ) : (
                    <Login handleLogin={onHandleLogin} />
                  )}
                </CustomDialog>
              </Grid>
            </Box>

            <Grid
              sx={{

                background: "aliceblue",
                padding: 3,
                paddingBottom: 0,
                borderRadius: "25px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 2
                }}
              >
                <Box
                  component="img"
                  sx={{
                    height: 120,
                    width: 120,
                    borderRadius: "10px"
                  }}
                  alt="job_logo"
                  src={job?.profile_url !== "No URL" ? job?.profile_url : job_logo}
                />
                <Box sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px"
                }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "start",
                      height: "12px",
                      gap: 1
                    }}
                  >
                    <Box
                      component="img"
                      sx={{
                        height: 16,
                        width: 16,
                        maxHeight: { xs: 28 },
                        maxWidth: { xs: 28 },
                      }}
                      alt="company"
                      src={CompanyLogo}
                    />
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: 14,
                        letterSpacing: "0.75px",
                        //   opacity: 0.8,
                        mt: 0.5,
                      }}
                    >
                      {job?.employer_profile?.company_name}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "start",
                      height: "12px",
                      gap: 1
                    }}
                  >
                    <Box
                      component="img"
                      sx={{
                        height: 16,
                        width: 16,
                        maxHeight: { xs: 28 },
                        maxWidth: { xs: 28 },
                      }}
                      alt="calendar"
                      src={CalendarIcon}
                    />
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: 12,
                        letterSpacing: "0.75px",
                        //   opacity: 0.8,
                        mt: 0.5,
                      }}
                    >
                      Date joined:{dateConverterMonth(job?.created_at)}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "start",
                      height: "12px",
                      gap: 1
                    }}
                  >
                    <Box
                      component="img"
                      sx={{
                        height: 16,
                        width: 16,
                        maxHeight: { xs: 28 },
                        maxWidth: { xs: 28 },
                      }}
                      alt="company link"
                      src={followIcon}
                    />
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: 12,
                        letterSpacing: "0.75px",
                        //   opacity: 0.8,
                        mt: 0.5,
                      }}
                    >
                      <a style={{ textDecoration: "none" }} target="_blank" href={job?.employer_profile?.hyperlink}>
                        {job?.employer_profile?.hyperlink}
                      </a>
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "start",
                      height: "12px",
                      gap: 1
                    }}
                  >
                    <Box
                      component="img"
                      sx={{
                        height: 16,
                        width: 16,
                        maxHeight: { xs: 28 },
                        maxWidth: { xs: 28 },
                      }}
                      alt="location"
                      src={LocationIcon}
                    />
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: 12,
                        letterSpacing: "0.75px",
                        //   opacity: 0.8,
                        mt: 0.5,
                      }}
                    >
                      {job?.town_name || "-"}
                      {job?.region_name && `, ${job?.region_name} `}
                    </Typography>
                  </Box>
                  <Box sx={{
                    display: "flex",
                    gap: "5px"
                  }}>
                    {job?.type && (
                      <SmallButton
                        color={"blueButton900"}
                        height={25}
                        value={job?.type}
                        label={truncate(job?.type, { length: 12 })}
                      />
                    )}
                    {job?.work_setup && (
                      <SmallButton
                        color={"blueButton900"}
                        height={25}
                        value={job?.work_setup}
                        label={truncate(job?.work_setup, { length: 12 })}
                      />
                    )}
                  </Box>
                  <Slider2
                    items={jobIndustries || []}
                    color={"blueButton1000"}
                    hideTagsAfter={2}
                  />
                </Box>
              </Box>

              <Grid >
                <Typography
                  sx={{
                    fontWeight: "Bold",
                    fontSize: 14,
                    letterSpacing: "0.75px",
                  }}
                >
                  About
                </Typography>
                <Typography sx={{
                  fontSize: 14
                }}>{job?.employer_profile?.notes}</Typography>

                <Button
                  sx={{
                    color: "black",
                    padding: 0,
                  }}
                  startIcon={<ExpandMoreIcon />}
                >
                  more
                </Button>
              </Grid>
              <Box
                sx={{
                  width: "80%",
                  margin: "auto"
                }}
              >
                <Button
                  variant="contained"
                  color="yellowButton100"
                  sx={{
                    borderRadius: "10px 0 0 0",

                    width: "50%",
                    ":hover": {
                      boxShadow: 0
                    }
                  }}
                  startIcon={
                    <Box
                      component={"img"}
                      sx={{
                        height: 20,
                        width: 20,
                      }}
                      src={viewjobsIcon}
                    />
                  }
                >
                  view jobs
                </Button>
                <Button
                  variant="contained"
                  color="blueButton700"
                  sx={{
                    borderRadius: "0 10px 0 0 ",
                    width: "50%",
                    ":hover": {
                      boxShadow: 0
                    }
                  }}
                  // startIcon={
                    
                  // }
                >
                  follow
                </Button>
              </Box>
            </Grid>

            <Box
              sx={{
                borderRadius: "25px",
                border: 1,
                borderColor: "lightGray",
              }}
            >
              <Button
                variant="contained"
                color={"blueButton700"}
                sx={{
                  borderRadius: "25px 0 10px 0",
                  ":hover": {
                    boxShadow: 0
                  }

                }}
              >
                What to expect if you're interested:
              </Button>

              <VerticalStepper />

            </Box>
          </Grid>
          {/* right body Ends */}
          <CustomDialog
            show={openApplyJobDialog}
            hideButton={false}
            onDialogClose={onApplyHandleClose}
            dialogWidth="sm"
            showFooter={false}
            // title={isLoggedIn ? i18n["login.login"] : i18n["login.signUp"]}
            isApplyJob
          >
            <ApplyJobs
              questions={questions}
              setopenApplyJobDialog={setopenApplyJobDialog}
            />
          </CustomDialog>
          <Grid
            item
            xs={12}
            mt={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            justifyContent={"center"}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* <IconButton
                onClick={scrollToTop}
                sx={{
                  height: 40, // Adjust the height to make the button smaller
                  width: 40, // Adjust the width to make the button smaller
                  borderRadius: "50%",
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "red",
                  color: "wheat",
                }}
              >
                <ExpandLessIcon fontSize="large" sx={{ fontSize: 30 }} />
              </IconButton>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Back To Top
              </Typography> */}
              <Link
                to={`/jobs/`}
                style={{
                  textDecoration: "none",
                  color: theme.palette.black,
                }}
              >

                <Button
                  variant="contained"
                  color="redButton100"
                  sx={{
                    borderRadius: "15px 15px 0 0",
                    padding: "25px"
                  }}
                >
                  view all jobs
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>

      </Grid >
      <Grid
        item
        // md={2}
        // lg={1}
        // xl={1}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          direction: "rtl",
          width: rightExpand ? "150px" : "40px",
          // marginLeft: "30px",
        }}
      >
        <Button
          variant="contained"
          sx={{
            position: "sticky",
            top: 0,
            borderRadius: "10px 0 0 10px",
            minWidth: "40px",
            width: "40px",
            height: "45px",
          }}
          color="redButton200"
          onClick={() => {
            setRightExpand((prevState) => !prevState);
          }}
        >
          {rightExpand ? <RightArrow /> : <LeftArrow />}
        </Button>
        {rightExpand && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              height: "95vh",
              overflowY: rightExpand ? "scroll" : "unset",
            }}
            className="rightfilterSec"
          >
            <style>
              {`.rightfilterSec::-webkit-scrollbar {
                       width: 0px !important;
                       background-color: #EFEEEE; /* Set the background color of the scrollbar */
                    }
                    .rightfilterSec::-webkit-scrollbar-thumb {
                      background-color: white;
                      width: 0px;
                      box-shadow: 0px 3px 3px #00000029;
                      border-radius: 3px;
                    }`}
            </style>
            <ButtonPanel
              topMargin={true}
              panelData={allJobTypes}
              side="right"
            // onChangeFilter={onChangeFilterJobType}
            />
            <ButtonPanel
              panelData={JOBS_RIGHT_COMPANIES_BUTTON}
              side="right"
            />
            <ButtonPanel
              panelData={allStages}
              side="right"
            // onChangeFilter={onChangeFilterJobStage}
            />
            <ButtonPanel
              panelData={JOBS_RIGHT_STAGES_BUTTON_GROUP}
              // onChangeFilter={onChangefavourite}
              side="right"
            />
            <ButtonPanel
              panelData={allTypes}
              side="right"
            // onChangeFilter={onChangeFilterType}
            />
            <Button
              variant="contained"
              sx={{
                position: "sticky",
                top: 0,
                borderRadius: "10px 0 0 10px",
                minWidth: "40px",
                width: "40px",
                height: "45px",
              }}
              color="redButton200"
              onClick={() => {
                setRightExpand((prevState) => !prevState);
              }}
            >
              {rightExpand ? <RightArrow /> : <LeftArrow />}
            </Button>
          </Box>
        )}
      </Grid>
    </Box >
  );
}
