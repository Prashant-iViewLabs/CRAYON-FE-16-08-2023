import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Draggable } from "react-beautiful-dnd";
import { styled } from "@mui/material/styles";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Popover,
  Tooltip,
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import profile from "../../../assets/profile.png";
import drag_dots from "../../../assets/drag_dots.svg";
import eye from "../../../assets/Black_View.svg";
import leftArrow from "../../../assets/Crayon_User_Lite.svg";
import rightArrow from "../../../assets/Crayon_User_Lite.svg";
import loveThis from "../../../assets/Black_I_Love_This.svg";
import likethis from "../../../assets/Black_Like.svg";
import pending from "../../../assets/Black_Pending.svg";
import reject from "../../../assets/Black_Reject.svg";
import downArrow from "../../../assets/Black_Down_Open.svg";
import rejectCharacter from "../../../assets/Characters/Red_Triangle_Blank.svg";
import upArrow from "../../../assets/Black_Up_Close.svg";
import close from "../../../assets/Black_Close.svg";
import QA from "../../../assets/Black_Q_A.svg";
import quicklinks from "../../../assets/Black_Quicklinks.svg";
import maleIcon from "../../../assets/Blue_Male.svg";
import salary from "../../../assets/Blue_Salary.svg";
import experience from "../../../assets/Yellow_Experience_Title_Job.svg";
import companyDetail from "../../../assets/Green_Company_Details.svg";
import location from "../../../assets/Red_Location.svg";
import experienceLogo from "../../../assets/Yellow_Pending.svg";
import education from "../../../assets/Red_Education.svg";
import noticePeriod from "../../../assets/Green_Notice_Period.svg";
import femaleIcon from "../../../assets/Blue_Female.svg";
import play from "../../../assets/play.svg";
import history from "../../../assets/history.svg";
import linkedin from "../../../assets/linkedin.svg";
import chat from "../../../assets/chat.svg";
import search from "../../../assets/search2.svg";
import info from "../../../assets/info.svg";
import thumbs_down from "../../../assets/thumbs_down.svg";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import ManIcon from "@mui/icons-material/Man";
import locale from "../../../i18n/locale";
import { ALERT_TYPE, ERROR_MSG } from "../../../utils/Constants";
import SmallButton from "../../common/SmallButton";
import SingleRadialChart from "../../common/SingleRadialChart";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { convertDOB } from "../../../utils/DateTime";
import { setAlert } from "../../../redux/configSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getQandA } from "../../../redux/employer/myJobsSlice";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ExpandBottomButtons from "./DraggableCardComponents/ExpandBottomButtons";
import CandidateFlipInfo from "./DraggableCardComponents/CandidateFlipInfo";
import BasicInfo from "./DraggableCardComponents/BasicInfo";
import { formatCurrencyWithCommas } from "../../../utils/Currency";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Check, CheckCircle } from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";
import CandidateFlipCircles from "./DraggableCardComponents/CandidateFlipCircles";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 5,
  marginBottom: "8px",
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.chart.green200,
  },
}));

const StyledHR = styled(Box)(({ theme }) => ({
  borderRight: "1px solid rgba(0, 0, 0, 0.3)",
  width: "0px",
  height: "10px",
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginTop: 15,
  background: `${theme.palette.white} !important`,
  borderRadius: "10px !important",
  width: "325px",
  height: "auto !important",
  position: "unset",
  boxShadow:
    "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)",
  "& .MuiAccordionSummary-root": {
    alignItems: "start",
    padding: 0,
    marginTop: 15,
  },
  "& .MuiAccordionSummary-content": {
    margin: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    ".summaryBox1": {
      margin: "8px 0",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    ".summaryBox2": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 8,
    },
    ".dragDots": {
      height: 24,
      width: 24,
      maxHeight: { xs: 24 },
      maxWidth: { xs: 24 },
    },
    ".profileAvatar": {
      height: 30,
      width: 30,
      maxHeight: { xs: 30 },
      maxWidth: { xs: 30 },
      borderRadius: 6,
    },
    ".dotIcon": {
      position: "absolute",
      right: "30px",
      top: "-2px",
      width: "12px",
    },
    ".thumbs": {
      position: "absolute",
      right: "1px",
      top: "9px",
      width: "16px",
    },
    ".arrowFont": {
      fontSize: "1.1rem",
    },
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    color: theme.palette.redButton.main,
    position: "absolute",
    right: "30px",
    bottom: "2px",
    "& .MuiSvgIcon-root": {
      fontSize: "2rem",
    },
  },
  "& .MuiCollapse-root": {
    "& .MuiAccordionDetails-root": {
      display: "flex",
      padding: 0,
      marginTop: "-10px",
      ".contentBox1": {
        display: "flex",
        justifyContent: "space-between",
        padding: "0 8px",
      },
      ".contentBox2": {
        display: "flex",
        justifyContent: "space-between",
      },
      ".contentBox3": {
        display: "flex",
        justifyContent: "space-around",
        padding: "0 8px",
        marginTop: "-12px",
      },
      ".contentBox4": {
        display: "flex",
        justifyContent: "center",
        padding: "0 8px",
        margin: "8px 0",
      },
    },
  },
}));

const StyledBox = styled("img")(() => ({
  cursor: "pointer",
  height: 40,
  top: 10,
  width: 47,
  position: "absolute",
}));

const label = "match";

export default function DraggableCardNew({
  item,
  index,
  droppableId,
  onDragEnd,
  jobId,
  talentStatus,
}) {
  const prevLocation = location.pathname;

  const theme = useTheme();
  const dispatch = useDispatch();
  const i18n = locale.en;
  const [chartData, setChartData] = useState([88]);
  const [openInfoDialog, setOpenInfoDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElQandA, setAnchorElQandA] = useState(null);
  const [openQandADialog, setOpenQandADialog] = useState(false);
  const [questionAnswer, setQuestionAnswer] = useState([]);
  const [expand, setExpand] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showDetailInfo, setShowDetailInfo] = useState(false);
  const [rejectCandidate, setRejectCandidate] = useState(false);
  const [showSummaryInfo, setShowSummaryInfo] = useState(true);
  const [showQuickLink, setShowQuickLink] = useState(false);
  const [flip, setFlip] = useState(false);
  const [changeViewColor, setChangeViewColor] = useState(false);

  const onHandleClose = () => {
    setOpenInfoDialog(false);
    setAnchorEl(null);
  };

  const handleInfoDialog = (event) => {
    setOpenInfoDialog(true);
    !openInfoDialog && setAnchorEl(event.target);
  };

  const onHandleCloseQandA = () => {
    setOpenQandADialog(false);
    setAnchorElQandA(null);
  };

  const handleQandADialog = async (event) => {
    try {
      const data = {
        job_id: jobId,
        user_id: item?.user_id,
      };
      setShowQuestion((prev) => !prev);
      setShowSummaryInfo((prev) => !prev);

      if (expand) {
        setExpand(false);
        setShowInfo(false);
        setShowDetailInfo(false);
      }
      if (rejectCandidate || showQuickLink) {
        setShowSummaryInfo(false);
        setRejectCandidate(false);
        setShowQuickLink(false);
      }

      const { payload } = await dispatch(getQandA(data));
      if (payload?.status === "success") {
        setQuestionAnswer(payload?.data);
      } else {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.ERROR,
            msg: payload?.error,
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

    setOpenQandADialog(true);
    !openQandADialog && setAnchorElQandA(event.target);
  };

  const handleReject = () => {
    const result = {
      destination: {
        droppableId: 9,
      },
      draggableId: item.user_id,
      source: {
        droppableId: droppableId,
      },
    };
    onDragEnd(result);
  };

  const handleMoveApplicant = (moveColumnID) => {
    const result = {
      destination: {
        droppableId: moveColumnID,
      },
      draggableId: item.user_id,
      source: {
        droppableId: droppableId,
      },
    };

    onDragEnd(result);
  };

  const toggleAcordion = () => {
    if (showQuestion || showQuickLink) {
      setShowSummaryInfo(true);
      setShowQuestion(false);
      setShowQuickLink(false);
    } else {
      console.log(showQuestion, showQuickLink);
      console.log(showInfo, showDetailInfo);
      console.log(expand);
      setExpand((prev) => !prev);
      setShowQuestion(false);
      setShowDetailInfo(true);
      setShowInfo(false);
    }
  };

  const handleFlip = () => {
    setFlip((prev) => !prev);
    if (showQuestion || showQuickLink) {
      console.log(showQuestion, showQuickLink);
      setShowInfo(true);
      setShowSummaryInfo(true);
      setExpand(true);
      setShowQuestion(false);
      setShowQuickLink(false);
    } else {
      console.log(showQuestion, showQuickLink);
      console.log(showInfo, showDetailInfo);
      setShowInfo((prev) => !prev);
      setShowDetailInfo((prev) => !prev);
    }
  };

  const handleRejectDialog = () => {
    setRejectCandidate((prev) => !prev);
    if (showQuestion || showQuickLink) {
      setShowSummaryInfo(false);
      setShowQuestion(false);
      setShowQuickLink(false);
    } else {
      setShowDetailInfo(false);
      setShowInfo(false);
      setShowQuestion(false);
      setShowSummaryInfo((prev) => !prev);
      setExpand(false);
    }
  };

  const handleQuickLink = () => {
    setShowQuickLink((prev) => !prev);
    setShowSummaryInfo((prev) => !prev);
    if (expand) {
      setExpand(false);
      setShowInfo(false);
      setShowDetailInfo(false);
    }
    if (rejectCandidate || showQuestion) {
      setShowSummaryInfo(false);
      setRejectCandidate(false);
      setShowQuestion(false);
    }
  };

  const handleDownloadClick = (cvLink) => {
    const pdfData = cvLink;

    // Create a Blob object from the PDF data
    const blob = new Blob([pdfData], { type: "application/pdf" });

    // Create a URL for the Blob
    const blobUrl = URL.createObjectURL(blob);

    const filename = pdfData.split("/").pop();
    // Create a link element
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;

    // Append the link to the document and trigger a click event
    document.body.appendChild(link);
    link.click();

    // Clean up by revoking the Blob URL after the download
    URL.revokeObjectURL(blobUrl);
  };

  return (
    <Draggable
      key={item?.user_id}
      draggableId={item?.user_id?.toString()}
      index={index}
    >
      {(provided) => (
        <StyledAccordion
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          disableGutters
          expanded={expand}
        >
          <AccordionSummary aria-controls="panel1a-content">
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#f2f4fb",
                    borderRadius: "10px 0 0 10px",
                  }}
                >
                  <Box
                    component="img"
                    className="dragDots"
                    alt="drag dots"
                    src={drag_dots}
                    sx={{
                      width: "20px !important",
                      height: "20px !important",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    borderRight: `solid 0.5px ${theme.palette.grayBorder}`,
                    opacity: "0.3",
                  }}
                ></Box>
              </Box>
              {rejectCandidate && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    flexDirection: "column",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <StyledBox
                    className="homeImages"
                    component="img"
                    alt="Reject"
                    src={rejectCharacter}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      flexDirection: "column",
                      width: "100%",
                      alignItems: "center",
                      marginBottom: "16px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontWeight: 700,
                      }}
                    >
                      Are you sure you want to
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontWeight: 700,
                      }}
                    >
                      reject the candidate?
                    </Typography>
                  </Box>
                  <Box>
                    <Button
                      sx={{
                        boxShadow: 0,
                        padding: "0px",
                        fontSize: "14px",
                        width: "103px",
                        height: "30px",
                        borderRadius: "7px 0px 0px 0px",
                        // background: "lightGray",
                        color: "black",
                      }}
                      variant="contained"
                      color="grayButton100"
                      onClick={handleRejectDialog}
                    >
                      whoops, no
                    </Button>
                    <Button
                      sx={{
                        padding: "0px",
                        boxShadow: 0,
                        fontSize: "14px",
                        width: "103px",
                        borderRadius: "0px 7px 0px 0px",
                        height: "30px",
                      }}
                      variant="contained"
                      color="redButton100"
                      onClick={handleReject}
                    >
                      yes
                    </Button>
                  </Box>
                </Box>
              )}
              {showQuestion && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 700,
                        marginLeft: "13px",
                        mt: 1,
                      }}
                    >
                      Question & Answers:
                    </Typography>
                    <Box sx={{ width: "90%", margin: "auto" }}>
                      {questionAnswer.map((questions, index) => {
                        return (
                          <>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontWeight: 700,
                                mr: 1,
                                mt: 1,
                              }}
                            >
                              Q{index + 1}: {questions?.question}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontWeight: 400,
                                mr: 1,
                              }}
                            >
                              A{index + 1}: {questions?.answer}
                            </Typography>
                          </>
                        );
                      })}
                    </Box>
                  </Box>
                  <Box sx={{ margin: "auto", mb: 0 }}>
                    <SmallButton
                      color="redButton"
                      startIcon={
                        <Box
                          component="img"
                          sx={{
                            height: 30,
                            width: 30,
                          }}
                          alt="Down arrow"
                          src={upArrow}
                        />
                      }
                      onClick={toggleAcordion}
                      startIconMargin="4px"
                      marginTop="5px"
                      height={19}
                      width={60}
                      fontWeight={700}
                      borderRadius="7px 7px 0px 0px"
                    />
                  </Box>
                </Box>
              )}
              {showQuickLink && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 700,
                        marginLeft: "13px",
                        mt: 1,
                      }}
                    >
                      Quick-move this applicant to
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 700,
                        marginLeft: "13px",
                      }}
                    >
                      one of the stage:
                    </Typography>
                    <Box sx={{ width: "90%", margin: "auto" }}>
                      {talentStatus.map((talent, index) => {
                        return (
                          <>
                            <Typography
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                fontSize: "14px",
                                fontWeight: 700,
                                mr: 1,
                                mt: 1,
                              }}
                              onClick={() => handleMoveApplicant(talent.id)}
                            >
                              {talent.status}
                              {talent.id === droppableId && (
                                <CheckCircle color="eyeview" />
                              )}
                            </Typography>
                          </>
                        );
                      })}
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center !important",
                    }}
                  >
                    <SmallButton
                      color="redButton"
                      startIcon={
                        <Box
                          component="img"
                          sx={{
                            height: 30,
                            width: 30,
                          }}
                          alt="Down arrow"
                          src={upArrow}
                        />
                      }
                      onClick={toggleAcordion}
                      startIconMargin="4px"
                      marginTop="5px"
                      height={19}
                      width={60}
                      fontWeight={700}
                      borderRadius="7px 7px 0px 0px"
                    />
                  </Box>
                </Box>
              )}
              {showSummaryInfo && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      // flexDirection: "column",
                      justifyContent: "space-between",
                      marginTop: "5px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        width: "65px",
                        // gap: "1px",
                      }}
                    >
                      <Box
                        component="img"
                        className="profileAvatar"
                        alt="crayon logo"
                        src={
                          item?.profile_url !== "No URL"
                            ? item?.profile_url
                            : profile
                        }
                        sx={{
                          borderRadius: "10px !important",
                          border: `1px solid ${theme.manageTalent.profileBorder.main}`,
                          height: "48px !important",
                          width: "48px !important",
                        }}
                      />
                      <Box sx={{ margin: "0 -8px 0 -8px" }}>
                        <SingleRadialChart
                          hollow="55%"
                          nameSize="9px"
                          valueSize="14px"
                          nameOffsetY="11"
                          valueOffsetY="-17"
                          labelsData={label}
                          series={chartData}
                          width={70}
                          height={70}
                          color={theme.manageTalent.manageMatched.main}
                          index={item.user_id}
                          isHovered={false}
                          name={"match"}
                        />
                      </Box>
                      {showInfo && expand && (
                        <CandidateFlipCircles
                          shadow={
                            item?.candidate_profile?.candidate_info?.shadow
                              ?.name
                          }
                          gritScore={
                            item?.candidate_profile?.candidate_info?.grit_score
                              ? item?.candidate_profile?.candidate_info
                                  ?.grit_score
                              : null
                          }
                          primary={
                            item?.candidate_profile?.candidate_info?.primary
                              ?.name
                          }
                          index={item?.user_id}
                        />
                      )}
                    </Box>

                    <Box>
                      <Box
                        sx={{
                          width: "100%",
                          height: "fit-content",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          component="img"
                          sx={{
                            width: 25,
                          }}
                          alt="maleIcon"
                          src={maleIcon}
                        />
                        <Tooltip
                          title={item?.first_name + " " + item?.last_name}
                          placement="top"
                        >
                          <Link
                            to={`/admin/admin-talent/all-talent/candidate-cv/${item?.user_id}`}
                            target="_blank"
                            style={{
                              textDecoration: "none",
                              color: theme.palette.black,
                            }}
                          >
                            <Typography
                              sx={{
                                fontWeight: 700,
                                fontSize: "14px",
                                width: "170px",
                                minHeight: "21px",
                                whiteSpace: "nowrap", // Prevents text from wrapping
                                overflow: "hidden", // Hides any overflowing content
                                textOverflow: "ellipsis", // Adds dots at the end of overflowing text
                              }}
                            >
                              {item?.first_name + " " + item?.last_name}
                            </Typography>
                          </Link>
                        </Tooltip>
                      </Box>
                      <Box
                        sx={{
                          width: "100%",
                          height: "fit-content",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "flex-start",
                        }}
                      >
                        <Box
                          component="img"
                          sx={{
                            width: 25,
                          }}
                          alt="experience"
                          src={experience}
                        />
                        <Tooltip
                          title={
                            item?.candidate_profile?.candidate_info?.job_title
                              ?.title
                          }
                          placement="top"
                        >
                          <Typography
                            sx={{
                              fontWeight: 700,
                              fontSize: "12px",
                              marginTop: "5px",
                              width: "170px",
                              minHeight: "21px",
                              whiteSpace: "nowrap", // Prevents text from wrapping
                              overflow: "hidden", // Hides any overflowing content
                              textOverflow: "ellipsis", // Adds dots at the end of overflowing text
                            }}
                          >
                            {item?.candidate_profile?.candidate_info?.job_title
                              ?.title
                              ? item?.candidate_profile?.candidate_info
                                  ?.job_title?.title
                              : "-"}
                          </Typography>
                        </Tooltip>
                      </Box>
                      <Box
                        sx={{
                          width: "100%",
                          height: "fit-content",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          component="img"
                          sx={{
                            width: 25,
                          }}
                          alt="companyDetail"
                          src={companyDetail}
                        />
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: 13,
                            letterSpacing: "0.25px",
                            width: "150px",
                            minHeight: "21px",
                            whiteSpace: "nowrap", // Prevents text from wrapping
                            overflow: "hidden", // Hides any overflowing content
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item?.candidate_profile?.employer_histories[0]?.name}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          width: "100%",
                          height: "fit-content",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          component="img"
                          sx={{
                            width: 25,
                          }}
                          alt="salary"
                          src={salary}
                        />
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: 13,
                            letterSpacing: "0.25px",
                            width: "150px",
                            minHeight: "21px",
                            whiteSpace: "nowrap", // Prevents text from wrapping
                            overflow: "hidden", // Hides any overflowing content
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item?.Currency}
                          {formatCurrencyWithCommas(item?.Salary)} per month
                        </Typography>
                      </Box>

                      {showDetailInfo && expand && (
                        <BasicInfo
                          town={item?.candidate_profile?.town?.name}
                          region={item?.candidate_profile?.town?.region?.name}
                          experience={
                            item?.candidate_profile?.candidate_info?.experience
                              ?.year
                          }
                          educationInfo={
                            item?.candidate_profile?.candidate_info
                              ?.highest_qualification?.descript
                          }
                          notice={
                            item?.candidate_profile?.candidate_info
                              ?.notice_period?.description
                          }
                        />
                      )}
                      {showInfo && expand && (
                        <CandidateFlipInfo
                          traits={item?.candidate_profile?.candidate_traits}
                          skills={item?.candidate_profile?.tag_users}
                          tools={item?.candidate_profile?.tool_users}
                        />
                      )}
                    </Box>
                  </Box>

                  {expand && (
                    <ExpandBottomButtons
                      cvLink={item?.cv_url}
                      userID={item?.user_id}
                      phoneNo={item?.candidate_profile?.contact_no}
                      emailAddress={item?.email}
                      linkedinAddress={
                        item?.candidate_profile?.linkedin_profile_link
                      }
                    />
                  )}
                  <Box sx={{ margin: "auto", mb: 0 }}>
                    <SmallButton
                      color="redButton"
                      startIcon={
                        <Box
                          component="img"
                          sx={{
                            height: 30,
                            width: 30,
                          }}
                          alt="Down arrow"
                          src={expand ? upArrow : downArrow}
                        />
                      }
                      onClick={toggleAcordion}
                      startIconMargin="0px !important"
                      marginTop="0px !important"
                      padding="0px !important"
                      height={19}
                      width={60}
                      fontWeight={700}
                      borderRadius="7px 7px 0px 0px"
                    />
                  </Box>
                  {/* {!showQuestion && (
                    <Box sx={{ margin: "auto" }}>
                      <SmallButton
                        color="redButton"
                        startIcon={
                          <Box
                            component="img"
                            sx={{
                              height: 30,
                              width: 30,
                            }}
                            alt="Down arrow"
                            src={expand ? upArrow : downArrow}
                          />
                        }
                        onClick={toggleAcordion}
                        startIconMargin="4px"
                        marginTop="5px"
                        height={19}
                        width={60}
                        fontWeight={700}
                        borderRadius="7px 7px 0px 0px"
                      />
                    </Box>
                  )} */}
                </Box>
              )}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  // marginLeft: "auto",
                }}
              >
                <SmallButton
                  color={
                    item?.job_users[0]?.candidate_job_status?.name === "pending"
                      ? "yellowButton100"
                      : item?.job_users[0]?.candidate_job_status?.name ===
                        "not for me"
                      ? "redButton"
                      : item?.job_users[0]?.candidate_job_status?.name ===
                        "i like this"
                      ? "quicklinks"
                      : "purpleButton300"
                  }
                  startIcon={
                    <Box
                      component="img"
                      className="eye"
                      alt="eye logo"
                      src={
                        item?.job_users[0]?.candidate_job_status?.name ===
                        "pending"
                          ? pending
                          : item?.job_users[0]?.candidate_job_status?.name ===
                            "not for me"
                          ? reject
                          : item?.job_users[0]?.candidate_job_status?.name ===
                            "i like this"
                          ? likethis
                          : loveThis
                      }
                      sx={{
                        height: 26,
                        width: 25,
                      }}
                    />
                  }
                  padding={0}
                  startIconMargin="4px"
                  // margin="auto"
                  height={30}
                  width={30}
                  fontWeight={700}
                  borderRadius="0px 10px 0px 0px"
                />
                <SmallButton
                  color="QandA"
                  startIcon={
                    <Box
                      component="img"
                      className="eye"
                      alt="eye logo"
                      src={QA}
                      sx={{
                        height: 30,
                        width: 30,
                      }}
                    />
                  }
                  padding={0}
                  startIconMargin="0px"
                  height={30}
                  width={30}
                  fontWeight={700}
                  borderRadius="0"
                  onClick={(event) => handleQandADialog(event)}
                />
                <SmallButton
                  color="redButton"
                  startIcon={
                    <Box
                      component="img"
                      className="eye"
                      alt="eye logo"
                      src={close}
                      sx={{
                        height: 32,
                        width: 30,
                      }}
                    />
                  }
                  padding={0}
                  startIconMargin="0px"
                  height={30}
                  width={30}
                  fontWeight={700}
                  borderRadius="0"
                  onClick={handleRejectDialog}
                />
                <SmallButton
                  color="yellowButton100"
                  startIcon={
                    <Box
                      component="img"
                      className="eye"
                      alt="eye logo"
                      src={quicklinks}
                      sx={{
                        height: 23,
                        width: 30,
                      }}
                    />
                  }
                  padding={0}
                  startIconMargin="0px"
                  height={30}
                  width={30}
                  fontWeight={700}
                  borderRadius="0"
                  onClick={handleQuickLink}
                />
                <SmallButton
                  color={changeViewColor ? "eyeview" : "eyeview100"}
                  startIcon={
                    <Box
                      component="img"
                      className="eye"
                      alt="eye logo"
                      src={eye}
                      sx={{
                        height: 26,
                        width: 26,
                      }}
                    />
                  }
                  onClick={() => setChangeViewColor(true)}
                  padding={0}
                  startIconMargin="0px"
                  height={30}
                  width={30}
                  fontWeight={700}
                  borderRadius={
                    expand || showQuestion || showQuickLink
                      ? "0"
                      : "0px 0px 10px 0px"
                  }
                />
                {(expand || showQuestion || showQuickLink) && (
                  <SmallButton
                    color="redButton"
                    startIcon={
                      <Box
                        component="img"
                        className="eye"
                        alt="eye logo"
                        src={flip ? leftArrow : rightArrow}
                        sx={{
                          height: 22,
                          width: 22,
                        }}
                      />
                    }
                    padding={0}
                    startIconMargin="0px !important"
                    height={30}
                    width={30}
                    fontWeight={700}
                    borderRadius="0px 0px 0px 10px"
                    onClick={handleFlip}
                  />
                )}
              </Box>
            </Grid>
          </AccordionSummary>

          <AccordionDetails>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "-80px",
                width: "100%",
              }}
            ></Box>
          </AccordionDetails>
        </StyledAccordion>
      )}
    </Draggable>
  );
}
