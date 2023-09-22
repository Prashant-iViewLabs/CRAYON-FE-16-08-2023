import { useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import locale from "../../../i18n/locale";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import SmallButton from "../../common/SmallButton";
import profile from "../../../assets/profile.png";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LanguageIcon from "@mui/icons-material/Language";
import { Grid, InputBase, Paper, Popover } from "@mui/material";
import { styled } from "@mui/material/styles";
import eye from "../../../assets/eye.svg";
import send from "../../../assets/send.svg";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PlaceIcon from "@mui/icons-material/Place";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import SingleRadialChart from "../../common/SingleRadialChart";
import OutlinedInput from "@mui/material/OutlinedInput";
import JobDescripiton from "../../common/JobDescripiton";
import InputAdornment from "@mui/material/InputAdornment";
import JobExp from "../../../assets/Padding Excluded/Black_Experience_Title_Job.svg";

import DOWN from "../../../assets/Padding Excluded/Black_Down_Open.svg";
import contact from "../../../assets/Padding Excluded/Black_Contact_Yellow.svg";
import email from "../../../assets/Padding Excluded/Black_Email_Red.svg";
import referrals from "../../../assets/Padding Excluded/Black_Referals_Yellow.svg";
import linkedin from "../../../assets/linkedin.svg";

import locationIcon from "../../../assets/Padding Excluded/Black_Location.svg";
import pending from "../../../assets/Padding Excluded/Black_Pending.svg";
import salary from "../../../assets/Padding Excluded/Black_Salary.svg";
import notice from "../../../assets/Padding Excluded/Black_Notice_Period.svg";
import deleteIcon from "../../../assets/Padding Excluded/Black_Trash_Delete_1 - Copy.svg";
import activeDownClose from "../../../assets/Black_Down_Open - Copy.svg";

import YellowLink from "../../../assets/CircularIcon/Yellow/Circular Icons__Yellow_Move.svg";
import RedView from "../../../assets/CircularIcon/Red/Circular Icons__Red_View.svg";
import BlueFolder from "../../../assets/CircularIcon/Blue/Circular Icons__Blue_Title_Job_Experience.svg";
import GreenPlay from "../../../assets/CircularIcon/Green/Circular Icons__Green_Play.svg";
import YellowChatHistory from "../../../assets/CircularIcon/Yellow/Circular Icons__Yellow_Chat History_2.svg";
import talentIcon from "../../../assets/CircularIcon/Red/Circular Icons__Red_Direxct.svg";

import profile_challenger from "../../../assets/Profile Icons_Challenger.svg";
import profile_character from "../../../assets/Profile Icons_Charater.svg";
import profile_collaborator from "../../../assets/Profile Icons_Collaborator.svg";
import profile_contemplator from "../../../assets/Profile Icons_Contemplator.svg";

import downClose from "../../../assets/Padding Included/Black_Down_Open.svg";
import DOMPurify from "dompurify";
import {
  addJobComment,
  addTalentPool,
  approveJob,
  getAllComments,
  getTalentPool,
} from "../../../redux/admin/jobsSlice";
import { useDispatch } from "react-redux";
import { setAlert } from "../../../redux/configSlice";
import { ALERT_TYPE, ERROR_MSG } from "../../../utils/Constants";
import {
  convertDatetimeAgo,
  convertDatetimeWithoutAgo,
  dateConverter,
  dateConverterMonth,
} from "../../../utils/DateTime";
import { Link, useLocation, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { formatCurrencyWithCommas } from "../../../utils/Currency";
import ChangeStatusButton from "./ChangeStatusButton";
import InfiniteScroll from "react-infinite-scroll-component";
import { uploadSpecData } from "../../../redux/employer/postJobSlice";
import { getJobDetail } from "../../../redux/guest/jobsSlice";
import LeftDrawer from "../LeftDrawer";
import TalentSVGButton from "../../common/TalentSVGButton";
import CopyToClipboard from "react-copy-to-clipboard";
import Refferals from "../adminTalent/DialogBox/Refferals";
import { truncate } from "lodash";
import AddToPool from "../adminTalent/DialogBox/AddToPool";
import JobAlert from "./JobAlertDetails";

const label = "grit score";
const label1 = "applied";
const label2 = "shortlisted";
const label3 = "interviewed";

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginTop: "4px",
  borderRadius: "10px",
  position: "unset",
  "& .MuiAccordionSummary-root": {
    // alignItems: 'start'
    flexDirection: "row-reverse",
    // marginBottom: '4px'
  },
  "& .MuiAccordionSummary-content.Mui-expanded": {
    margin: "0 0 8px 0",
  },
  "& .MuiAccordionSummary-content": {
    flexDirection: "column",
    margin: 0,
    ".summaryBox": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      // marginRight: '8px',
      "& .MuiButtonBase-root": {
        letterSpacing: "-0.02em",
        // fontSize: 10,
        // fontWeight: 700,
        // minWidth: 28,
        // padding: '2px 8px',
        // borderRadius: 3,
        // height: '20px',
        // boxShadow: 'none'
      },
    },
    ".summaryBoxContent": {
      display: "flex",
      alignItems: "center",
    },
    ".profileAvatar": {
      height: 20,
      width: 20,
      borderRadius: 6,
    },

    "& .MuiTypography-root": {
      // fontWeight: 700,
      // fontSize: '20px',
    },
    "& .MuiButtonBase-root": {
      // padding: '2px 8px',
      // fontSize: 10,
      // fontWeight: 700,
      // minWidth: 30,
      // boxShadow: 'none',
      // borderRadius: 2
    },
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    color: theme.palette.white,
    background: theme.palette.redButton.main,
    width: 23.42,
    height: 23.71,
    borderRadius: 25,
    marginLeft: "-5px",
    marginRight: "20px",
    justifyContent: "center",
    alignItems: "center",

    // marginRight: '32px',
    // position: 'absolute',
    // right: '40px',
    // top: '12px',
    "& .MuiSvgIcon-root": {
      fontSize: "1.4rem",
    },
  },
  "& .MuiCollapse-root": {
    "& .MuiAccordionDetails-root": {
      display: "flex",
      paddingTop: 0,
      // padding: 0,
      "& .MuiButtonBase-root": {
        // padding: '0 8px',
        // fontSize: 10,
        // fontWeight: 700,
        // minWidth: 30,
        // padding: '1px 4px',
        // borderRadius: 3
      },
      ".contentBoxLeft": {
        width: "60%",
        // display: 'flex',
        // justifyContent: 'space-between',
        "& .MuiButtonBase-root": {
          padding: "0 8px",
          // fontSize: 10,
          // fontWeight: 700,
          // minWidth: 10,
          // padding: '1px 4px',
          // borderRadius: 3
        },
        // '& .MuiSvgIcon-root': {
        //     width: '20px'
        // }
      },
      ".contentBoxRight": {
        width: "37%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& .MuiButtonBase-root": {
          padding: "0 8px",
          // fontSize: 10,
          // fontWeight: 700,
          // minWidth: 10,
          // padding: '1px 4px',
          // borderRadius: 3
        },
        ".title": {
          fontSize: "12px",
          fontWeight: 700,
        },
        ".subTitle": {
          fontSize: "12px",
          fontWeight: 400,
        },
      },
    },
  },
  "& .MuiButtonBase-root": {
    // boxShadow: 'none',
    // padding: '0 16px'
  },
}));

const StyledTextField = styled(OutlinedInput)(({ theme }) => ({
  width: "100%",
  margin: "8px 0",
  paddingRight: "8px",
  // paddingLeft: '16px',
  // '& .MuiInputLabel-outlined': {
  // marginLeft: '4px',
  // color: theme.palette.placeholder
  // opacity: 0.75
  // },
  "& .MuiOutlinedInput-notchedOutline": {
    // background: theme.palette.white,
    borderColor: theme.palette.grayBorder,
    borderRadius: "20px",
  },
}));

export default function AdminJobsDetailPage() {
  const i18n = locale.en;
  const { id } = useParams();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [jobContent, setJobContent] = useState([]);
  const [specName, setspecName] = useState("No file chosen");
  const [expand, setExpand] = useState(false);
  const [comments, setComments] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const fileAccept = "application/pdf, application/doc, application/docx";
  const hiddenFileInput = useRef(null);

  const location = useLocation();
  const prevLocation = location.pathname;
  const include = location.pathname.includes("pending-jobs");
  const [anchorElReferral, setAnchorElReferral] = useState(null);
  const openReferral = Boolean(anchorElReferral);
  const [anchorEl, setAnchorEl] = useState(null);

  const [lastKey, setLastKey] = useState(0);
  const [tableData, setTableData] = useState([]);

  const token = localStorage?.getItem("token");
  let decodedToken;
  if (token) {
    decodedToken = jwt_decode(token);
  }

  const toggleAcordion = () => {
    setExpand((prev) => !prev);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCardClick = async () => {
    try {
      const { payload } = await dispatch(getJobDetail({ job_id: id }));
      if (payload?.status == "success") {
        setJobContent(payload?.data);
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
  const getTalent = async (lastkeyy) => {
    try {
      const { payload } = await dispatch(getTalentPool({ lastKey: lastkeyy }));
      if (payload.status === "success") {
        if (lastkeyy === 0) {
          setTableData(payload.data);
          setLastKey(payload.pageNumber + 1);
        } else {
          setLastKey(payload.pageNumber + 1);
          setTableData((prevState) => [...prevState, ...payload.data]);
        }
      }
    } catch (error) {}
  };

  const getComments = async (jobid) => {
    try {
      const { payload } = await dispatch(getAllComments(jobid));
      if (payload?.status == "success") {
        setComments(payload?.data);
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
          msg: error,
        })
      );
    }
  };

  const sendComment = async () => {
    try {
      const latestComment = {
        comment: inputValue,
        created_at: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        user: {
          first_name: jobContent?.employer_profile?.user?.first_name,
          last_name: jobContent?.employer_profile?.user?.last_name,
        },
      };
      comments.push(latestComment);
      const comment = {
        job_id: jobContent?.job_id,
        comment: inputValue,
      };
      const { payload } = await dispatch(addJobComment(comment));

      if (payload?.status == "success") {
        setInputValue("");
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Comment Added Successfully!",
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
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: error,
        })
      );
    }
  };
  const handleClick = async (event) => {
    setAnchorEl(event.currentTarget);
    await getTalent("");
  };
  const handlePopoverCloseReferral = () => {
    setAnchorElReferral(null);
  };
  const handleFileClick = () => {
    hiddenFileInput.current.click();
  };

  const handleFileChange = async (event) => {
    const formData = new FormData();
    formData.append("jobspec", event.target.files[0]);
    formData.append("job_id", jobContent?.job_id);
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

  const addToPool = async (canID, poolID) => {
    try {
      const data = {
        candidate_id: canID,
        pool_id: poolID,
      };
      const { payload } = await dispatch(addTalentPool(data));
      if (payload.status === "success") {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Talent added to pool successfully",
          })
        );
        setAnchorEl(null);
      } else {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.ERROR,
            msg: payload?.message?.message,
          })
        );
      }
    } catch (error) {}
  };

  useEffect(() => {
    handleCardClick();
    getComments(id);
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ width: "16%" }}>
        <LeftDrawer />
      </Box>

      <StyledAccordion
        expanded={true}
        sx={{ width: "100%", margin: "2rem !important" }}
      >
        <AccordionSummary
          sx={{
            padding: 0,
            background: "white",
          }}
          // expandIcon={<ExpandMoreIcon sx={{height: "100%"}} onClick={toggleAcordion} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box
            sx={{
              display: "flex",
            }}
          >
            <SmallButton
              color="redButton"
              startIcon={
                <Box
                  component="img"
                  className="eye"
                  alt="eye logo"
                  src={downClose}
                  sx={{
                    height: 16,
                    width: 15,
                  }}
                />
              }
              padding={"0 0 0 3px"}
              // startIconMargin="4px"
              height={"90px"}
              width={20}
              fontWeight={700}
              borderRadius={"20px 0px 20px 0px"}
              // onClick={() => setFlip((prev) => !prev)}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingX: 1,
                MaxWidth: "10%",
              }}
            >
              {jobContent?.profile_url ? (
                <Box
                  component="img"
                  className="profileAvatar"
                  alt="crayon logo"
                  src={jobContent?.profile_url}
                  sx={{
                    height: "40px !important",
                    width: "40px !important",
                    border: 1,
                    borderColor: theme.palette.grayBorder,
                  }}
                />
              ) : (
                <Box
                  component="img"
                  className="profileAvatar"
                  alt="crayon logo"
                  src={profile}
                  sx={{
                    height: "40px !important",
                    width: "40px !important",
                    border: 1,
                    borderColor: theme.palette.grayBorder,
                  }}
                />
              )}
              <SmallButton
                color="userID"
                // borderRadius="5px"
                label={jobContent?.job_id}
                fontSize={10}
                fontWeight={700}
                alignItems="end"
                textColor="#000"
                paddingY={0}
                borderRadius="0px 0px 6px 6px"
                marginTop="-2px"
                width="100%"
              ></SmallButton>
            </Box>
            <Box
              sx={{
                MinWidth: "35%",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                paddingBottom: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "end",
                  gap: 1,
                }}
              >
                <Box
                  component={"img"}
                  src={JobExp}
                  sx={{
                    height: "20px",
                    width: "15px",
                  }}
                />
                <Tooltip title={jobContent?.title} placement="top-end">
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 700,
                      mr: 1,
                    }}
                  >
                    {jobContent?.title?.length >= 30
                      ? jobContent?.title?.slice(0, 30) + "..."
                      : jobContent?.title}
                  </Typography>
                </Tooltip>
                <Button
                  variant={"contained"}
                  color={"blueButton800"}
                  sx={{
                    borderRadius: "0 0 5px 5px",
                    fontSize: "12px",
                    paddingY: 1,
                    height: "30px",
                  }}
                >
                  {jobContent?.job_type?.split(" ")[1]}
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                <Box
                  component={"img"}
                  src={JobExp}
                  sx={{
                    height: "15px",
                    width: "15px",
                  }}
                />
                <Tooltip
                  title={jobContent?.employer_profile?.company_name}
                  placement="top-end"
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    {jobContent?.employer_profile?.company_name?.length >= 30
                      ? jobContent?.employer_profile?.company_name?.slice(
                          0,
                          30
                        ) + "..."
                      : jobContent?.employer_profile?.company_name}
                  </Typography>
                </Tooltip>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", width: "auto" }}
                >
                  <TalentSVGButton
                    padding={"0px !important"}
                    color={"white"}
                    source={locationIcon}
                    height={28}
                    width={23}
                  />
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: 12,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {jobContent?.town?.name || "-"}
                    {jobContent?.town?.name &&
                      `, ${jobContent?.town?.region?.name} `}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <TalentSVGButton
                    padding={"0px !important"}
                    color={"white"}
                    source={salary}
                    height={20}
                    width={18}
                  />
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: 12,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {jobContent?.salary?.currency?.symbol}{" "}
                    {formatCurrencyWithCommas(jobContent?.salary?.min)} to{" "}
                    {formatCurrencyWithCommas(jobContent?.salary?.max)} per
                    month
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <TalentSVGButton
                    padding={"0px !important"}
                    color={"white"}
                    source={pending}
                    height={20}
                    width={18}
                  />

                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: 12,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {jobContent?.experience?.year} years
                    {/* {jobContent?.experience_year_start
                      ? `${jobContent?.experience_year_start} to ${jobContent?.experience_year_end} years`
                      : `${jobContent?.experience_year} years`} */}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <TalentSVGButton
                    padding={"0px !important"}
                    color={"white"}
                    source={notice}
                    height={20}
                    width={18}
                  />
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: 12,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {dateConverterMonth(jobContent?.created_at)}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                flexGrow: 1,
              }}
            >
              <Box>
                <Box
                  sx={{
                    height: "30%",
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <TalentSVGButton
                    color={"white"}
                    source={deleteIcon}
                    height={20}
                    width={18}
                  />
                  <Button
                    variant="contained"
                    color="lightGreenButton300"
                    sx={{
                      fontSize: "10px",
                      fontWeight: 500,
                      color: "white",
                      padding: "8px 10px",
                      borderRadius: "0 0 0 10px",
                      height: "30px !important",
                    }}
                  >
                    {jobContent?.stage?.name || "-"}
                  </Button>
                  <Button
                    variant="contained"
                    color="dateButton"
                    sx={{
                      fontSize: "10px",
                      fontWeight: 500,
                      color: "#000",
                      padding: "8px 10px",
                      borderRadius: "0px !important",
                      borderRight: "1px solid #EBECF3",
                      borderBottom: "1px solid #EBECF3",
                      height: "30px !important",
                      // width: "110px !important",
                    }}
                  >
                    {dateConverterMonth(jobContent?.created_at)}
                  </Button>
                  <Button
                    variant="contained"
                    color="dateButton"
                    sx={{
                      fontSize: "10px",
                      fontWeight: 500,
                      color: "#000",
                      padding: "8px 10px",
                      borderRadius: "0px !important",
                      borderRight: "1px solid #EBECF3",
                      borderBottom: "1px solid #EBECF3",
                      height: "30px !important",
                      // width: "max-content",
                    }}
                  >
                    {convertDatetimeWithoutAgo(jobContent?.created_at)}
                  </Button>
                </Box>
                <Box
                  sx={{
                    height: "70%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                    gap: 1,
                    paddingX: 1,
                  }}
                >
                  <SmallButton label={jobContent?.type} />
                  <SmallButton label={jobContent?.work_setup} />
                  <CopyToClipboard
                    text={`${prevLocation}/job-detail/${`${
                      jobContent?.town_name + " " + jobContent?.region_name
                    }`}/${jobContent?.job_id}`}
                    onCopy={() => {
                      dispatch(
                        setAlert({
                          show: true,
                          type: ALERT_TYPE.SUCCESS,
                          msg: "Copied to clipboard",
                        })
                      );
                    }}
                  >
                    <Box
                      component={"img"}
                      src={YellowLink}
                      sx={{
                        height: 30,
                        width: 30,
                      }}
                    />
                  </CopyToClipboard>
                  <Box
                    component={"img"}
                    src={RedView}
                    sx={{
                      height: 30,
                      width: 30,
                    }}
                  />
                  <Box
                    component={"img"}
                    src={BlueFolder}
                    sx={{
                      height: 30,
                      width: 30,
                    }}
                  />
                  <Box
                    component={"img"}
                    src={GreenPlay}
                    sx={{
                      height: 30,
                      width: 30,
                    }}
                  />
                  <Box
                    component={"img"}
                    src={YellowChatHistory}
                    sx={{
                      height: 30,
                      width: 30,
                    }}
                  />
                </Box>
              </Box>
              <Box>
                <ChangeStatusButton
                  loggedInUser={decodedToken?.data?.role_id}
                  jobId={jobContent?.job_id}
                  jobStatus={jobContent?.job_status?.name}
                  employerIndustry={jobContent?.employer_industries}
                  // getJobList={getJobList}
                />
                {!include ? (
                  <Link
                    to={`/employer/manage-talent/${jobContent?.job_id}`}
                    target="_blank"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="redButton"
                      sx={{
                        width: "100%",
                        borderRadius: "0 0 20px 0",
                        padding: 0,
                        height: "70%",
                        maxHeight: 65,
                      }}
                      startIcon={
                        <Box
                          component={"img"}
                          src={talentIcon}
                          height={30}
                          width={30}
                        />
                      }
                    >
                      talent
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant="contained"
                    color="redButton"
                    sx={{
                      width: "100%",
                      borderRadius: "0 0 20px 0",
                      padding: 0,
                      height: "70%",
                      maxHeight: 65,
                    }}
                    startIcon={
                      <Box
                        component={"img"}
                        src={talentIcon}
                        height={30}
                        width={30}
                      />
                    }
                  >
                    talent
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              marginLeft: "83px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 0.3,
                alignItems: "center",
              }}
            >
              <TalentSVGButton
                color={"white"}
                source={email}
                height={28}
                width={18}
                padding={"0px !important"}
              />
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 12,
                }}
              >
                {jobContent?.employer_profile?.user?.email}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <TalentSVGButton
                color={"white"}
                source={contact}
                height={16}
                width={18}
                padding={"0px !important"}
              />
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 12,
                }}
              >
                {jobContent?.employer_profile?.contact_no}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                component="img"
                // className="profileAvatar"
                alt="crayon logo"
                src={linkedin}
                sx={{
                  mr: 1,
                  ml: 1,
                  width: "20px !important",
                  height: "20px !important",
                }}
              />
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 12,
                }}
              >
                Linkedin
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              marginLeft: "83px",
            }}
          >
            <TalentSVGButton
              color={"white"}
              source={referrals}
              height={28}
              width={18}
              padding={"0px !important"}
            />

            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 700,
                // mb: "2px",
                whiteSpace: "nowrap",
              }}
              onClick={(event) => {
                setAnchorElReferral(event.target);
              }}
            >
              {`Referrals (231)`}{" "}
              <TalentSVGButton
                color={"white"}
                source={DOWN}
                height={6}
                width={10}
              />
            </Typography>
            <Popover
              id="dropdown"
              open={openReferral}
              anchorEl={anchorElReferral}
              onClose={handlePopoverCloseReferral}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              sx={{
                "& .MuiPaper-root-MuiPopover-paper": {
                  // padding: "16px !important",
                  minWidth: "18% !important",
                  borderRadius: "20px !important",
                  mt: 1,
                },
              }}
            >
              <Refferals />
            </Popover>
          </Box>
        </AccordionSummary>

        <AccordionDetails
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingBottom: 0,
          }}
        >
          <>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box className="contentBoxLeft">
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: 14,
                    overflow: "hidden",
                  }}
                >
                  Skills
                </Typography>
                <Box sx={{ mb: 2 }}>
                  {jobContent?.job_tags?.map((val) => {
                    return (
                      <SmallButton
                        color="orangeButton"
                        letterSpacing="-0.02em"
                        borderRadius="5px"
                        label={val?.tag?.tag}
                        mr="8px"
                      ></SmallButton>
                    );
                  })}
                </Box>

                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: 14,
                  }}
                >
                  Job description
                </Typography>
                <JobDescripiton description={jobContent?.description} />

                <Box sx={{ mt: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 400,
                        mr: 1,
                        width: 100,
                      }}
                    >
                      {i18n["pendingJobs.industries"]}
                    </Typography>
                    {jobContent?.employer_industries?.map((industry, index) => {
                      return (
                        <SmallButton
                          color="blueButton600"
                          value={industry?.industry.name}
                          label={truncate(industry?.industry.name, {
                            length: 15,
                          })}
                          mr="8px"
                          fontSize="10px"
                        ></SmallButton>
                      );
                    })}
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 400,
                        mr: 1,
                        width: 100,
                      }}
                    >
                      {i18n["pendingJobs.tools"]}
                    </Typography>
                    {jobContent?.job_tools?.map((val) => {
                      return (
                        <SmallButton
                          minWidth="10px"
                          height={18}
                          color="yellowButton100"
                          borderRadius="5px"
                          label={val?.tool?.name}
                          mr="4px"
                        ></SmallButton>
                      );
                    })}
                  </Box>
                  {/* languages Remaining */}
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 400,
                        mr: 1,
                        width: 100,
                      }}
                    >
                      {i18n["pendingJobs.languages"]}
                    </Typography>
                    <SmallButton
                      minWidth="10px"
                      height={18}
                      color="grayButton100"
                      borderRadius="5px"
                      label="English"
                      mr="4px"
                    ></SmallButton>
                    <SmallButton
                      minWidth="10px"
                      height={18}
                      color="grayButton100"
                      borderRadius="5px"
                      label="Afrikaans"
                      mr="4px"
                    ></SmallButton>
                    <SmallButton
                      minWidth="10px"
                      height={18}
                      color="grayButton100"
                      borderRadius="5px"
                      label="Spanish"
                      mr="4px"
                    ></SmallButton>
                    {/* languages Remaining */}
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 400,
                        mr: 1,
                        width: 100,
                      }}
                    >
                      {i18n["pendingJobs.institutions"]}
                    </Typography>
                    <SmallButton
                      minWidth="10px"
                      height={18}
                      color="grayButton100"
                      borderRadius="5px"
                      label="English"
                      mr="4px"
                    ></SmallButton>
                    <SmallButton
                      minWidth="10px"
                      height={18}
                      color="grayButton100"
                      borderRadius="5px"
                      label="Afrikaans"
                      mr="4px"
                    ></SmallButton>
                    <SmallButton
                      minWidth="10px"
                      height={18}
                      color="grayButton100"
                      borderRadius="5px"
                      label="Spanish"
                      mr="4px"
                    ></SmallButton>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 400,
                        mr: 1,
                        width: 100,
                      }}
                    >
                      {i18n["pendingJobs.qualifications"]}
                    </Typography>

                    {jobContent?.job_qualifications?.map(
                      (qualifications, index) => {
                        return (
                          <SmallButton
                            minWidth="10px"
                            height={18}
                            color="grayButton100"
                            borderRadius="5px"
                            value={qualifications?.qualification?.name}
                            label={truncate(
                              qualifications?.qualification?.name,
                              { length: 15 }
                            )}
                            mr="4px"
                          ></SmallButton>
                        );
                      }
                    )}
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 400,
                        mr: 1,
                        width: 100,
                      }}
                    >
                      {i18n["pendingJobs.associations"]}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 400,
                        mr: 1,
                        width: 100,
                      }}
                    >
                      {i18n["pendingJobs.school"]}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "start", mt: 1 }}>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: 400,
                      mr: 1,
                      width: 100,
                    }}
                  >
                    {i18n["pendingJobs.personality"]}
                  </Typography>
                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {jobContent?.primary?.name && (
                        <Box
                          component="img"
                          height={60}
                          // sx={{ margin: "0 -22px 0 -22px" }}
                          alt="job_exp"
                          src={
                            (jobContent?.primary?.name === "collaborator" &&
                              profile_collaborator) ||
                            (jobContent?.primary?.name === "challenger" &&
                              profile_challenger) ||
                            (jobContent?.primary?.name === "character" &&
                              profile_character) ||
                            (jobContent?.primary?.name === "contemplator" &&
                              profile_contemplator)
                          }
                        />
                      )}
                      {/* </Box> */}
                      {jobContent?.shadow?.name && (
                        <Box
                          component="img"
                          height={60}
                          // sx={{ margin: "0 -22px 0 -22px" }}
                          alt="job_exp"
                          src={
                            (jobContent?.shadow?.name === "collaborator" &&
                              profile_collaborator) ||
                            (jobContent?.shadow?.name === "challenger" &&
                              profile_challenger) ||
                            (jobContent?.shadow?.name === "character" &&
                              profile_character) ||
                            (jobContent?.shadow?.name === "contemplator" &&
                              profile_contemplator)
                          }
                        />
                      )}
                      <Box sx={{ marginLeft: "-16px" }}>
                        <SingleRadialChart
                          hollow="55%"
                          labelsData={label}
                          series={
                            jobContent?.grit_score == null
                              ? [0]
                              : [jobContent?.grit_score]
                          }
                          width={90}
                          nameSize="9px"
                          valueSize="14px"
                          nameOffsetY="11"
                          valueOffsetY="-17"
                          color={theme.palette.lightGreenButton300.main}
                          index={1}
                          isHovered={true}
                        />
                      </Box>
                    </Box>
                    <Box>
                      {/* {jobContent?.JobTraits?.map((trait, index) => {
                    return (
                      <SmallButton
                        fontWeight={500}
                        minWidth="10px"
                        textColor={theme.palette.black100.main}
                        height={25}
                        color="grayButton200"
                        borderRadius="5px"
                        label={trait}
                        mr="4px"
                      ></SmallButton>
                    );
                  })} */}
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ mt: 1 }}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 700,
                      mr: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Box
                      component={"img"}
                      src={JobExp}
                      sx={{
                        height: "20px",
                        width: "20px",
                      }}
                    />
                    {i18n["pendingJobs.jobquestions"]}
                  </Typography>
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ width: "90%" }}>
                      {jobContent?.job_questions?.map((question, index) => {
                        return (
                          <>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontWeight: 400,
                                mr: 1,
                                mt: 1,
                              }}
                            >
                              <span
                                style={{
                                  fontWeight: 700,
                                }}
                              >
                                Question {index + 1}:
                              </span>{" "}
                              <br />
                              {question?.question}
                            </Typography>
                            <Paper
                              sx={{
                                display: "flex",
                                height: "40px",
                                borderRadius: "25px",
                                boxShadow: "none",
                                alignItems: "center",
                                paddingX: 0.8,
                                justifyContent: "space-between",
                                border: `1px solid ${theme.palette.grayBorder}`,
                              }}
                            >
                              <InputBase
                                sx={{ ml: 2, mr: 2 }}
                                id="password"
                                value={question?.answer}
                                type="text"
                                placeholder={i18n["pendingJobs.answer"]}
                              />
                              <Button
                                variant="contained"
                                color="lightGreenButton300"
                                sx={{
                                  height: 30,
                                }}
                              >
                                Save
                              </Button>
                            </Paper>
                          </>
                        );
                      })}
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box className="contentBoxRight">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    mt: 6,
                  }}
                >
                  {/* <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} > */}
                  <Box
                    sx={{
                      border: 1,
                      borderRadius: 5,
                      borderColor: theme.palette.grayBorder,
                      overflow: "hidden",
                      paddingTop: 2,
                    }}
                  >
                    <Box sx={{ display: "flex" }}>
                      <Box sx={{ margin: "0" }}>
                        <SingleRadialChart
                          max={1000}
                          labelsData={label1}
                          series={[jobContent?.TotalUserCount]}
                          width={140}
                          color={theme.palette.lightGreenButton300.main}
                          isHovered={true}
                        />
                      </Box>
                      <Box sx={{ margin: "0" }}>
                        <SingleRadialChart
                          labelsData={label2}
                          series={[jobContent?.totalusershorlisted]}
                          width={140}
                          color={theme.palette.lightGreenButton300.main}
                          isHovered={true}
                        />
                      </Box>
                      <Box sx={{ margin: "0" }}>
                        <SingleRadialChart
                          labelsData={label3}
                          series={[jobContent?.totaluserinterviewed]}
                          width={140}
                          color={theme.palette.lightGreenButton300.main}
                          isHovered={true}
                        />
                      </Box>
                    </Box>
                    <Button
                      sx={{
                        width: "50%",
                        borderRadius: 0,
                      }}
                      onClick={handleClick}
                      color="grayButton200"
                      variant="contained"
                      endIcon={
                        // {flip ? upClose : downClose}
                        <Box
                          component={"img"}
                          sx={{
                            height: 30,
                            width: 30,
                          }}
                          src={activeDownClose}
                        />
                      }
                    >
                      Link to pool
                    </Button>
                    <Popover
                      id="dropdown-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                      sx={{
                        "& .MuiPaper-root-MuiPopover-paper": {
                          minWidth: "18% !important",
                          borderRadius: "20px !important",
                          mt: 2,
                        },
                      }}
                    >
                      <AddToPool talentData={tableData} addToPool={addToPool} />
                    </Popover>
                    {!include ? (
                      <Link
                        to={`/employer/manage-talent/${jobContent?.job_id}`}
                        target="_blank"
                        style={{
                          textDecoration: "none",
                        }}
                      >
                        <Button
                          sx={{
                            width: "50%",
                            borderRadius: 0,
                          }}
                          color="redButton100"
                          variant="contained"
                          startIcon={
                            <Box
                              component={"img"}
                              src={talentIcon}
                              height={25}
                              width={25}
                            />
                          }
                        >
                          Talent
                        </Button>
                      </Link>
                    ) : (
                      <>
                        <Button
                          sx={{
                            width: "50%",
                            borderRadius: 0,
                          }}
                          color="redButton100"
                          variant="contained"
                          startIcon={
                            <Box
                              component={"img"}
                              src={talentIcon}
                              height={25}
                              width={25}
                            />
                          }
                        >
                          Talent
                        </Button>
                      </>
                    )}
                  </Box>
                </Box>
                <Box sx={{ mt: 4, width: "-webkit-fill-available" }}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 700,
                      mr: 1,
                    }}
                  >
                    {i18n["pendingJobs.comments"]}
                  </Typography>
                  <Box
                    id="talentList"
                    sx={{ overflow: "hidden", height: "160px" }}
                  >
                    <InfiniteScroll
                      style={{
                        height: "100%",
                        overflowX: "hidden",
                        scrollbarWidth: "thin",
                      }}
                      dataLength={comments !== undefined && comments?.length}
                      // next={() => getJobList(lastKey)}
                      hasMore={true}
                      scrollableTarget="talentList"
                      endMessage={
                        <p style={{ textAlign: "center" }}>
                          <b>Yay! You have seen it all</b>
                        </p>
                      }
                    >
                      {comments.length > 0 ? (
                        comments?.map((comment) => {
                          return (
                            <Box sx={{ display: "flex", mt: 2 }}>
                              <Box
                                component="img"
                                className="profileAvatar"
                                alt="crayon logo"
                                src={profile}
                                sx={{
                                  mr: 1,
                                  width: 20,
                                  height: 20,
                                }}
                              />
                              <Box
                                sx={{
                                  flexGrow: 1,
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    mr: 1,
                                  }}
                                >
                                  {`${comment?.user?.first_name} ${comment?.user?.last_name}`}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "14px",
                                    fontWeight: 400,
                                    mr: 1,
                                  }}
                                >
                                  {comment.comment}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "12px",
                                    fontWeight: 400,
                                    mr: 1,
                                    color: theme.palette.grayButton.main,
                                    textAlign: "end",
                                  }}
                                >
                                  {dateConverterMonth(comment.created_at)}
                                </Typography>
                              </Box>
                            </Box>
                          );
                        })
                      ) : (
                        <Box
                          sx={{
                            width: "100%",
                            textAlign: "center",
                            mt: 4,
                            color: theme.palette.placeholder,
                          }}
                        >
                          {i18n["pendingJobs.noData"]}
                        </Box>
                      )}

                      <style>
                        {`.infinite-scroll-component::-webkit-scrollbar {
                      width: 7px !important;
                      background-color: #F5F5F5; /* Set the background color of the scrollbar */
                    }

                    .infinite-scroll-component__outerdiv {
                      height:100%
                    }

                    .infinite-scroll-component::-webkit-scrollbar-thumb {
                      background-color: #888c; /* Set the color of the scrollbar thumb */
                    }`}
                      </style>
                    </InfiniteScroll>
                  </Box>
                  <Box sx={{ mt: 4 }}>
                    {/* <StyledTextField placeholder="type your comment here..." id="comment" size="small" /> */}
                    <StyledTextField
                      id="outlined-adornment-password"
                      type="text"
                      size="small"
                      placeholder="type your comment here..."
                      value={inputValue} // Set the value to the state variable
                      onChange={(e) => setInputValue(e.target.value)} // Update the state with the new input value
                      endAdornment={
                        <InputAdornment position="end">
                          {/* <Box
                        component="img"
                        className="profileAvatar"
                        alt="crayon logo"
                        src={send}
                        sx={{
                          width: "30px",
                          // mr: 1
                          cursor: "pointer",
                        }}
                        onClick={sendComment}
                      /> */}
                          <Button
                            variant="contained"
                            color="lightGreenButton300"
                            sx={{
                              height: 30,
                            }}
                            onClick={sendComment}
                          >
                            Post
                          </Button>
                        </InputAdornment>
                      }
                    />
                  </Box>
                  <JobAlert jobContent={jobContent} />
                </Box>
              </Box>
            </Box>
          </>
        </AccordionDetails>
      </StyledAccordion>
    </Box>
  );
}
