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
import SmallButton from "../../common/SmallButton";
import profile from "../../../assets/profile.png";
import { InputBase, Paper, Popover } from "@mui/material";
import { styled } from "@mui/material/styles";

import PlaceIcon from "@mui/icons-material/Place";
import SingleRadialChart from "../../common/SingleRadialChart";
import OutlinedInput from "@mui/material/OutlinedInput";
import JobDescripiton from "../../common/JobDescripiton";
import InputAdornment from "@mui/material/InputAdornment";
import DOMPurify from "dompurify";
import upClose from "../../../assets/Padding Included/Black_Up_Close.svg";
import downClose from "../../../assets/Padding Included/Black_Down_Open.svg";
import JobExp from "../../../assets/Padding Excluded/Black_Experience_Title_Job.svg";
import calendar from "../../../assets/Padding Excluded/Black_Notice_Period.svg";

import YellowLink from "../../../assets/CircularIcon/Red/Circular Icons__Yellow_Move.svg";
import RedView from "../../../assets/CircularIcon/Red/Circular Icons__Red_View.svg";
import BlueFolder from "../../../assets/CircularIcon/Red/Circular Icons__Blue_Title_Job_Experience.svg";
import GreenPlay from "../../../assets/CircularIcon/Red/Circular Icons__Green_Play.svg";
import YellowChatHistory from "../../../assets/CircularIcon/Red/Circular Icons__Yellow_Chat History_2.svg";
import talentIcon from "../../../assets/CircularIcon/Red/Circular Icons__Red_Direxct.svg";

import deleteIcon from "../../../assets/Padding Excluded/Black_Trash_Delete_1 - Copy.svg";
import activeDownClose from "../../../assets/Black_Down_Open - Copy.svg";

import profile_challenger from "../../../assets/Profile Icons_Challenger.svg";
import profile_character from "../../../assets/Profile Icons_Charater.svg";
import profile_collaborator from "../../../assets/Profile Icons_Collaborator.svg";
import profile_contemplator from "../../../assets/Profile Icons_Contemplator.svg";

import {
  addJobComment,
  addTalentPool,
  getTalentPool,
} from "../../../redux/admin/jobsSlice";
import { useDispatch } from "react-redux";
import { setAlert } from "../../../redux/configSlice";
import { ALERT_TYPE } from "../../../utils/Constants";
import {
  convertDatetimeAgo,
  convertDatetimeWithoutAgo,
  dateConverter,
  dateConverterMonth,
} from "../../../utils/DateTime";
import { Link, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { formatCurrencyWithCommas } from "../../../utils/Currency";
import ChangeStatusButton from "./ChangeStatusButton";
import InfiniteScroll from "react-infinite-scroll-component";
import { uploadSpecData } from "../../../redux/employer/postJobSlice";
import { AccountBalanceWallet, Circle, PlayArrow } from "@mui/icons-material";

import job_exp from "../../../assets/Padding Included/Green_Duration.svg";
import TalentSVGButton from "../../common/TalentSVGButton";
import { truncate } from "lodash";
import JobAlert from "./JobAlert";
import Refferals from "../adminTalent/DialogBox/Refferals";
import DOWN from "../../../assets/Padding Excluded/Black_Down_Open.svg";
import contact from "../../../assets/Padding Excluded/Black_Contact_Yellow.svg";
import email from "../../../assets/Padding Excluded/Black_Email_Red.svg";
import referrals from "../../../assets/Padding Excluded/Black_Referals_Yellow.svg";
import linkedin from "../../../assets/linkedin.svg";
import locationIcon from "../../../assets/Padding Excluded/Black_Location.svg";
import pending from "../../../assets/Padding Excluded/Black_Pending.svg";
import salary from "../../../assets/Padding Excluded/Black_Salary.svg";
import notice from "../../../assets/Padding Excluded/Black_Notice_Period.svg";
import AddToPool from "../adminTalent/DialogBox/AddToPool";
import CopyToClipboard from "react-copy-to-clipboard";

const label = "grit score";
const label1 = "applied";
const label2 = "shortlisted";
const label3 = "interviewed";

const StyledHR = styled(Box)(({ theme }) => ({
  borderRight: "1px solid rgba(0, 0, 0, 0.3)",
  width: "0px",
  height: "10px",
  marginRight: "8px",
}));
const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginTop: "9px",
  borderRadius: "25px",
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
      height: 50,
      width: 50,
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
      background: "white",
      padding: "8px 42px 0px",
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

export default function JobCard({
  index,
  jobContent,
  getJobList,
  getComments,
  comments,
}) {
  const i18n = locale.en;
  const theme = useTheme();
  const dispatch = useDispatch();
  const fileAccept = "application/pdf, application/doc, application/docx";
  const hiddenFileInput = useRef(null);
  const [flip, setFlip] = useState(false);

  const [specName, setspecName] = useState("No file chosen");
  const [isHovered, setIsHovered] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [expand, setExpand] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [lastKey, setLastKey] = useState(0);
  const [tableData, setTableData] = useState([]);

  const location = useLocation();
  const prevLocation = location.pathname;
  const include = location.pathname.includes("pending-jobs");

  const [anchorElReferral, setAnchorElReferral] = useState(null);
  const openReferral = Boolean(anchorElReferral);

  const token = localStorage?.getItem("token");
  let decodedToken;
  if (token) {
    decodedToken = jwt_decode(token);
  }

  function createMarkup(html) {
    return {
      __html: DOMPurify.sanitize(html),
    };
  }

  const toggleAcordion = () => {
    setExpand((prev) => !prev);
    !expand && getComments(jobContent?.job_id);
  };

  const sendComment = async () => {
    try {
      console.log(inputValue);
      const comment = {
        job_id: jobContent?.job_id,
        comment: inputValue,
      };

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

      console.log(latestComment);
      comments.push(latestComment);

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

  const handlePopoverCloseReferral = () => {
    setAnchorElReferral(null);
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

  const handleClick = async (event) => {
    setAnchorEl(event.currentTarget);
    await getTalent("");
  };

  const handleClose = () => {
    setAnchorEl(null);
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

  return (
    <StyledAccordion
      expanded={flip}
      sx={{
        borderRadius: "25px",
        background: "transparent",
      }}
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
                src={flip ? upClose : downClose}
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
            borderRadius={flip ? "20px 0px 20px 0px" : "20px 0px 0px 20px"}
            onClick={() => setFlip((prev) => !prev)}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              paddingX: 1,
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
              width: "45%",
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
                <Link
                  to={`${prevLocation}/job-detail/${`${
                    jobContent?.town_name + " " + jobContent?.region_name
                  }`}/${jobContent?.job_id}`}
                  target={"_blank"}
                  style={{
                    textDecoration: "none",
                    color: theme.palette.black,
                  }}
                >
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
                </Link>
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
                {jobContent?.job_type.split(" ")[1]}
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
                title={jobContent?.employer_profile_company_name}
                placement="top-end"
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  {jobContent?.employer_profile_company_name?.length >= 30
                    ? jobContent?.employer_profile_company_name?.slice(0, 30) +
                      "..."
                    : jobContent?.employer_profile_company_name}
                </Typography>
              </Tooltip>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 0.8,
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TalentSVGButton
                  padding={"0px !important"}
                  color={"white"}
                  source={locationIcon}
                  height={28}
                  width={23}
                  minWidth={"25px"}
                />
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: 10,
                    width: "100%",
                    whiteSpace: "nowrap", // Prevents text from wrapping
                    overflow: "hidden", // Hides any overflowing content
                    textOverflow: "ellipsis",
                  }}
                >
                  {jobContent?.town_name || "-"}
                  {jobContent?.region_name && `, ${jobContent?.region_name} `}
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
                    fontSize: 10,
                    width: "100%",
                    whiteSpace: "nowrap", // Prevents text from wrapping
                    overflow: "hidden", // Hides any overflowing content
                    textOverflow: "ellipsis",
                  }}
                >
                  {jobContent?.currency_symbol}{" "}
                  {formatCurrencyWithCommas(jobContent?.salary_min)} to{" "}
                  {formatCurrencyWithCommas(jobContent?.salary_max)} per month
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
                    fontSize: 10,
                    width: "100%",
                    whiteSpace: "nowrap", // Prevents text from wrapping
                    overflow: "hidden", // Hides any overflowing content
                    textOverflow: "ellipsis",
                  }}
                >
                  {jobContent?.experience_year_start
                    ? `${jobContent?.experience_year_start} to ${jobContent?.experience_year_end} years`
                    : `${jobContent?.experience_year} years`}
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
                    fontSize: 10,
                    width: "100%",
                    whiteSpace: "nowrap", // Prevents text from wrapping
                    overflow: "hidden", // Hides any overflowing content
                    textOverflow: "ellipsis",
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
              gap: 1,
            }}
          >
            <Box sx={{ margin: "0 -18px 0 -18px" }}>
              <SingleRadialChart
                hollow="55%"
                nameSize="9px"
                valueSize="14px"
                nameOffsetY="11"
                valueOffsetY="-17"
                labelsData={"applications"}
                max={1000}
                series={[jobContent?.TotalUserCount]}
                width={100}
                color={theme.palette.lightGreenButton300.main}
              />
            </Box>
            <Box sx={{ margin: "0 -18px 0 -18px" }}>
              <SingleRadialChart
                hollow="55%"
                nameSize="9px"
                valueSize="14px"
                nameOffsetY="11"
                valueOffsetY="-17"
                labelsData={"shortlisted"}
                series={[jobContent?.totalusershorlisted]}
                width={100}
                color={theme.palette.lightGreenButton300.main}
              />
            </Box>
            <Box sx={{ margin: "0 -18px 0 -18px" }}>
              <SingleRadialChart
                hollow="55%"
                nameSize="9px"
                valueSize="14px"
                nameOffsetY="11"
                valueOffsetY="-17"
                labelsData={"interviews"}
                series={[jobContent?.totaluserinterviewed]}
                width={100}
                color={theme.palette.lightGreenButton300.main}
              />
            </Box>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
            }}
          >
            <Box
              sx={{
                width: "75%",
              }}
            >
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
                  {jobContent?.stage_name || "-"}
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
            <Box
              sx={{
                width: "25%",
              }}
            >
              <ChangeStatusButton
                loggedInUser={decodedToken?.data?.role_id}
                jobId={index}
                jobStatus={jobContent?.job_status_name}
                employerIndustry={jobContent?.employer_industries}
                getJobList={getJobList}
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
        {flip && (
          <>
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
                    fontSize: 10,
                  }}
                >
                  {jobContent?.email}
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
                    fontSize: 10,
                  }}
                >
                  {jobContent?.employer_profile_contact_no}
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
                    fontSize: 10,
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
                  fontSize: "14px",
                  fontWeight: 700,
                  width: "150px",
                  // mb: "2px",
                }}
                onClick={(event) => {
                  setAnchorElReferral(event.target);
                }}
              >
                {`Referrals (231)`}{" "}
                <TalentSVGButton
                  color={"white"}
                  source={DOWN}
                  height={7}
                  width={18}
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
          </>
        )}
      </AccordionSummary>

      <AccordionDetails
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingBottom: 0,
        }}
      >
        {flip && (
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
                  {console.log(jobContent?.JobSkills?.split(","))}
                  {jobContent?.JobSkills?.split(",").map((val) => {
                    return (
                      <SmallButton
                        color="orangeButton"
                        letterSpacing="-0.02em"
                        borderRadius="5px"
                        label={val}
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
                    {jobContent?.JobIndustries?.split(",").map(
                      (industry, index) => {
                        return (
                          <SmallButton
                            color="blueButton600"
                            value={industry}
                            label={truncate(industry, { length: 15 })}
                            mr="8px"
                            fontSize="10px"
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
                      {i18n["pendingJobs.tools"]}
                    </Typography>
                    {jobContent?.JobTools?.split(",").map((val) => {
                      return (
                        <SmallButton
                          minWidth="10px"
                          height={18}
                          color="yellowButton100"
                          borderRadius="5px"
                          label={val}
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

                    {jobContent?.JobQualifications?.split(",").map(
                      (qualifications, index) => {
                        return (
                          <SmallButton
                            minWidth="10px"
                            height={18}
                            color="grayButton100"
                            borderRadius="5px"
                            value={qualifications}
                            label={truncate(qualifications, { length: 15 })}
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
                      {jobContent?.primary_name && (
                        <Box
                          component="img"
                          height={60}
                          // sx={{ margin: "0 -22px 0 -22px" }}
                          alt="job_exp"
                          src={
                            (jobContent?.primary_name === "collaborator" &&
                              profile_collaborator) ||
                            (jobContent?.primary_name === "challenger" &&
                              profile_challenger) ||
                            (jobContent?.primary_name === "character" &&
                              profile_character) ||
                            (jobContent?.primary_name === "contemplator" &&
                              profile_contemplator)
                          }
                        />
                      )}
                      {/* </Box> */}
                      {jobContent?.shadow_name && (
                        <Box
                          component="img"
                          height={60}
                          // sx={{ margin: "0 -22px 0 -22px" }}
                          alt="job_exp"
                          src={
                            (jobContent?.shadow_name === "collaborator" &&
                              profile_collaborator) ||
                            (jobContent?.shadow_name === "challenger" &&
                              profile_challenger) ||
                            (jobContent?.shadow_name === "character" &&
                              profile_character) ||
                            (jobContent?.shadow_name === "contemplator" &&
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
                          isHovered={isHovered}
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
                      {jobContent?.job_question?.question
                        ?.split(",")
                        .map((questions, index) => {
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
                                {questions}
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
                                  value={questions?.answer}
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
                          index={index}
                          isHovered={isHovered}
                        />
                      </Box>
                      <Box sx={{ margin: "0" }}>
                        <SingleRadialChart
                          labelsData={label2}
                          series={[jobContent?.totalusershorlisted]}
                          width={140}
                          color={theme.palette.lightGreenButton300.main}
                          index={index}
                          isHovered={isHovered}
                        />
                      </Box>
                      <Box sx={{ margin: "0" }}>
                        <SingleRadialChart
                          labelsData={label3}
                          series={[jobContent?.totaluserinterviewed]}
                          width={140}
                          color={theme.palette.lightGreenButton300.main}
                          index={index}
                          isHovered={isHovered}
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
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                color="redButton"
                sx={{
                  borderRadius: "5px 5px 0 0 ",
                  width: 100,
                  height: 20,
                }}
                onClick={() => setFlip((prev) => !prev)}
              >
                <Box
                  component={"img"}
                  src={upClose}
                  sx={{
                    height: 10,
                    width: 10,
                  }}
                />
              </Button>
            </Box>
          </>
        )}
      </AccordionDetails>
    </StyledAccordion>
  );
}
