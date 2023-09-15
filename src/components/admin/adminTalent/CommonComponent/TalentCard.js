import { useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import locale from "../../../../i18n/locale";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import SmallButton from "../../../common/SmallButton";
import profile from "../../../../assets/profile.png";
import linkedin from "../../../../assets/linkedin.svg";

import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";

import link from "../../../../assets/Padding Excluded/Black_Documents.svg";
import chatHistory from "../../../../assets/Padding Excluded/Black_Chat History_1.svg";
import chat from "../../../../assets/Padding Excluded/Black_Chat.svg";
import CV from "../../../../assets/Padding Excluded/Black_CV.svg";
import talent from "../../../../assets/Padding Excluded/Black_Talent.svg";

import { formatCurrencyWithCommas } from "../../../../utils/Currency";
import { Grid, MenuItem, Paper, Popover, Tooltip } from "@mui/material";
import { ALERT_TYPE, ERROR_MSG } from "../../../../utils/Constants";
import SingleRadialChart from "../../../common/SingleRadialChart";
import {
  convertDOB,
  convertDatetimeWithoutAgo,
  dateConverterMonth,
  monthYear,
} from "../../../../utils/DateTime";

import { useDispatch } from "react-redux";
import {
  addTalentPool,
  addTalentToJob,
  getAdminTalentJobList,
  getTalentFullDetails,
  getTalentPool,
} from "../../../../redux/admin/jobsSlice";
import { setAlert, setLoading } from "../../../../redux/configSlice";
import { Link, useLocation } from "react-router-dom";
import DOWN from "../../../../assets/Padding Excluded/Black_Down_Open.svg";
import contact from "../../../../assets/Padding Excluded/Black_Contact_Yellow.svg";
import email from "../../../../assets/Padding Excluded/Black_Email_Red.svg";
import referrals from "../../../../assets/Padding Excluded/Black_Referals_Yellow.svg";
import userProfile from "../../../../assets/Padding Excluded/Black_User_Profile - Copy.svg";
import locationIcon from "../../../../assets/Padding Excluded/Black_Location.svg";
import pending from "../../../../assets/Padding Excluded/Black_Pending.svg";
import salary from "../../../../assets/Padding Excluded/Black_Salary.svg";
import notice from "../../../../assets/Padding Excluded/Black_Notice_Period.svg";
import experience from "../../../../assets/Padding Excluded/Black_Experience_Title_Job.svg";
import humanMale from "../../../../assets/Padding Excluded/Black_Male.svg";
import upClose from "../../../../assets/Padding Included/Black_Up_Close.svg";
import downClose from "../../../../assets/Padding Included/Black_Down_Open.svg";
import deleteIcon from "../../../../assets/Padding Excluded/Black_Trash_Delete_1 - Copy.svg";
import activeDownClose from "../../../../assets/Black_Down_Open - Copy.svg";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import { Grid, Typography, useTheme } from '@mui/material'

import edit from "../../../../assets/Padding Excluded/Black_Edit.svg";

import references from "../../../../assets/Padding Excluded/Black_Referals_Blue.svg";
import contactReference from "../../../../assets/Padding Excluded/Black_Contact_Blue.svg";
import emailReference from "../../../../assets/Padding Excluded/Black_Email_Blue.svg";
import profile_challenger from "../../../../assets/Profile Icons_Challenger.svg";
import profile_character from "../../../../assets/Profile Icons_Charater.svg";
import profile_collaborator from "../../../../assets/Profile Icons_Collaborator.svg";
import profile_contemplator from "../../../../assets/Profile Icons_Contemplator.svg";
import TalentSVGButton from '../../../common/TalentSVGButton';
import PoolJob from '../DialogBox/PoolJob';
import JobAlert from '../DialogBox/JobAlert';
import CommentBox from '../DialogBox/CommentBox';

import {
  getPersonalities,
  getTraits,
} from "../../../../redux/employer/postJobSlice";
import { Circle } from "@mui/icons-material";
import SVGButton from "../../../common/SVGButton";
import { truncate } from "lodash";
import EditPersonality from "../DialogBox/EditPersonality";
import Databases from "../DialogBox/Databases";
import Refferals from "../DialogBox/Refferals";
import VideoDialog from "../DialogBox/VideoDialog";
import Document from "../DialogBox/Document";
import CopyToClipboard from "react-copy-to-clipboard";

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginTop: "4px",
  borderRadius: "20px 20px !important",
  position: "unset",
  overflow: "hidden",
  "& .MuiAccordionSummary-root": {
    flexDirection: "row-reverse",
    padding: "0px 0px 0px 0px",
    minHeight: "0px !important",
  },
  "& .MuiAccordionSummary-content.Mui-expanded": {
    margin: "0 0 8px 0",
  },
  // "& .MuiGrid-root": {
  //   justifyContent: "space-between",
  // },
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
    height: 49,
    // borderRadius: 25,
    overflow: "hidden",
    borderRadius: "15px 0 0 15px",
    marginLeft: "-15px",
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
      padding: "8px 42px 0px",
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
        width: "50%",
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

  "& .MuiButton-startIcon": {
    display: "flex !important",
    margin: "0px !important",
  },
}));

export default function TalentCard({
  talentContent,
  setPersonalityAdded,
  traits,
}) {
  console.clear()
  console.log(talentContent)
  const theme = useTheme();
  const dispatch = useDispatch();
  const location = useLocation();

  const prevLocation = location.pathname;
  const [flip, setFlip] = useState(false);
  const [anchorElPersonality, setAnchorElPersonality] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [talentJobs, setTalentJobs] = useState([]);
  const [lastKey, setLastKey] = useState(0);

  const [editPersonality, seteditPersonality] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const [jobClick, setJobClick] = useState(null);
  const [anchorElReferral, setAnchorElReferral] = useState(null);

  const [openVideo, setOpenVideo] = useState(null);
  const [openDocument, setOpenDocument] = useState(null);
  const [openActive, setOpenActive] = useState(false);
  const [talentDetails, setTalentDetails] = useState(null)

  const open = Boolean(anchorEl);
  const openPersonality = Boolean(anchorElPersonality);
  const openReferral = Boolean(anchorElReferral);
  const openDialog = Boolean(openVideo);
  const openDocumentDialog = Boolean(openDocument);
  const anchorRef = useRef(null);

  const i18n = locale.en;


  const handleClick = async (event) => {
    setAnchorEl(event.currentTarget);
    await getTalent();
  };
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenActive(false);
    } else if (event.key === "Escape") {
      setOpenActive(false);
    }
  }

  const handleEdit = () => {
    seteditPersonality((prev) => !prev);
  };


  const handleAddJobClick = async (event) => {
    setJobClick(event.currentTarget);
    await getTalentJobList("");
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
    } catch (error) { }
  };

  const getTalentJobList = async (lastkeyy) => {
    console.log("LAST KEY", lastkeyy);
    const { payload } = await dispatch(
      getAdminTalentJobList(lastkeyy + "&status_id=2")
    );
    if (payload?.status == "success") {
      if (lastkeyy === "") {
        setTalentJobs(payload.data);
        setLastKey(payload.data[payload.data.length - 1]?.job_id);
      } else {
        setTalentJobs((prevState) => [...prevState, ...payload.data]);
      }
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

  const getTalentDetails = async (job_id) => {
    console.log(job_id)
    const { payload } = await dispatch(getTalentFullDetails(job_id))
    setTalentDetails(payload.data)
    if (payload?.status === "success") {
      console.log(payload.data)
    } else {
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: "No data",
        })
      );
    }
  }
  const handleExpandAccordian = async (jobId) => {
    setFlip(prevState => !prevState)
    !flip && await getTalentDetails(jobId)
  }

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
    } catch (error) { }
  };
  const addToJob = async (event, canId) => {
    try {
      const job = talentJobs.find(
        (item) => item.title === event.target.textContent
      );
      const data = {
        candidate_id: canId,
        job_id: job.job_id,
      };
      const { payload } = await dispatch(addTalentToJob(data));
      if (payload.status === "success") {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Talent added to job successfully",
          })
        );
        setJobClick(null);
      } else {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.ERROR,
            msg: payload?.message?.message,
          })
        );
      }
    } catch (error) { }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setJobClick(null);
  };

  const handlePopoverClose = () => {
    setAnchorElPersonality(null);
  };

  const handlePopoverCloseVideo = () => {
    setOpenVideo(null);
  };

  const handlePopoverCloseReferral = () => {
    setAnchorElReferral(null);
  };

  const handlePopoverCloseDocument = () => {
    setOpenDocument(null);
  };

  const handleToggle = () => {
    setOpenActive((prevOpen) => !prevOpen);
  };

  const handleCloseActive = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenActive(false);
  };

  const removeWord = (value) => {
    return value?.replace("calendar", "");
  };

  return (
    <StyledAccordion expanded={flip}>
      <AccordionSummary
        // expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Grid
          container
          spacing={2}
          justifyContent={"space-between"}
          flexWrap={"nowrap"}
        >
          <Grid item paddingLeft={16}>
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
                    width: 16,
                  }}
                />
              }
              padding={0}
              // startIconMargin="4px"
              height={"97px"}
              width={25}
              fontWeight={700}
              borderRadius={flip ? "20px 0px 20px 0px" : "20px 0px 0px 20px"}
              onClick={() => handleExpandAccordian(talentContent?.user_id)}
            />
          </Grid>

          <Grid
            item
            // xs={1}
            sx={{
              display: "flex",
              flexDirection: "column",
              margin: "12px 0",
              paddingLeft: "0px !important",
            }}
          >
            {talentContent?.profile_url != "No URL" ? (
              <Box
                component="img"
                className="profileAvatar"
                alt="crayon logo"
                src={talentContent?.profile_url}
                sx={{
                  mr: 1,
                  height: "55px !important",
                  width: "55px !important",
                }}
              />
            ) : (
              <Box
                component="img"
                className="profileAvatar"
                alt="crayon logo"
                src={profile}
                sx={{
                  mr: 1,
                  height: "55px !important",
                  width: "55px !important",
                }}
              />
            )}
            <SmallButton
              color="userID"
              // borderRadius="5px"
              label={talentContent?.user_id}
              mr={1}
              fontSize={10}
              fontWeight={700}
              alignItems="end"
              textColor="#000"
              borderRadius="0px 0px 6px 6px"
              marginTop="-2px"
              width="fit-content"
            ></SmallButton>
          </Grid>

          <Grid
            item
            //  xs={5.5}
            paddingLeft="0px !important"
          >
            <Box display={"flex"} alignItems={"center"}>
              <TalentSVGButton
                color={"white"}
                source={humanMale}
                height={24}
                width={18}
                padding={"0px !important"}
              />
              <Link
                to={`${prevLocation}/candidate-cv/${talentContent?.user_id}`}
                target="_blank"
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
                    ml: "4px",
                  }}
                >
                  {talentContent?.first_name}
                </Typography>
              </Link>
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              <TalentSVGButton
                padding={"0px  !important"}
                color={"white"}
                source={experience}
                height={18}
                width={18}
              />
              {talentContent?.jobTitle !==
                null ? (
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 700,
                    mr: 1,
                    ml: "4px",
                  }}
                >
                  {
                    talentContent?.jobTitle
                  }
                </Typography>
              ) : (
                "-"
              )}
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              <Box
                sx={{ display: "flex", width: "70px", alignItems: "center" }}
              >
                <TalentSVGButton
                  padding={"0px !important"}
                  color={"white"}
                  source={userProfile}
                  height={28}
                  width={24}
                />
                {talentContent?.dob != null ? (
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: 600,
                      // mb: "2px",

                      width: "60px",
                      whiteSpace: "nowrap", // Prevents text from wrapping
                      overflow: "hidden", // Hides any overflowing content
                      textOverflow: "ellipsis", // Adds dots at the end of overflowing text
                    }}
                  >
                    {`${convertDOB(
                      talentContent?.dob
                    )} years`}
                  </Typography>
                ) : (
                  "-"
                )}
              </Box>
              <Box
                sx={{ display: "flex", width: "140px", alignItems: "center" }}
              >
                <TalentSVGButton
                  padding={"0px !important"}
                  color={"white"}
                  source={locationIcon}
                  height={28}
                  width={23}
                />
                {talentContent?.town_name !== null ? (
                  <Tooltip
                    title={`${talentContent?.town_name} ${talentContent?.region_name}`}
                    placement="top-end"
                  >
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 600,
                        // mb: "2px",
                        width: "180px",
                        whiteSpace: "nowrap", // Prevents text from wrapping
                        overflow: "hidden", // Hides any overflowing content
                        textOverflow: "ellipsis", // Adds dots at the end of overflowing text
                      }}
                    >
                      {talentContent?.town_name},{" "}
                      {talentContent?.region_name}
                    </Typography>
                  </Tooltip>
                ) : (
                  "-"
                )}
              </Box>
              <Box
                sx={{ display: "flex", width: "100px", alignItems: "center" }}
              >
                <TalentSVGButton
                  color={"white"}
                  source={salary}
                  height={20}
                  width={18}
                />
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 600,
                    // mb: "2px",
                    width: "180px",
                    whiteSpace: "nowrap", // Prevents text from wrapping
                    overflow: "hidden", // Hides any overflowing content
                    textOverflow: "ellipsis",
                  }}
                >
                  {
                    talentContent?.currencySymbol
                  }
                  {formatCurrencyWithCommas(
                    talentContent?.salaryMin
                  )}to
                  {formatCurrencyWithCommas(
                    talentContent?.salaryMax
                  )}
                  pm
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", width: "75px", alignItems: "center" }}
              >
                <TalentSVGButton
                  color={"white"}
                  source={pending}
                  height={20}
                  width={18}
                />
                {talentContent?.experienceYear !== null ? (
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: 600,
                      // mb: "2px",
                    }}
                  >
                    {
                      talentContent?.experienceYearEnd
                    }{" "}
                    years
                  </Typography>
                ) : (
                  "-"
                )}
              </Box>
              <Box
                sx={{ display: "flex", width: "100px", alignItems: "center" }}
              >
                <TalentSVGButton
                  color={"white"}
                  source={notice}
                  height={20}
                  width={18}
                />
                {talentContent?.notice_period_description !== null ? (
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: 600,
                      // mb: "2px",
                    }}
                  >
                    {removeWord(
                      talentContent?.notice_period_description
                    )}
                  </Typography>
                ) : (
                  "-"
                )}
              </Box>
            </Box>

            {flip && (
              <>
                {console.log(talentDetails)}
                <Box display={"flex"} alignItems={"center"}>
                  <TalentSVGButton
                    color={"white"}
                    source={email}
                    height={28}
                    width={18}
                    padding={"0 8px 0 0 !important"}
                  />
                  {talentContent?.email !== null ? (
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 500,
                        // mb: "2px",
                      }}
                    >
                      {talentContent?.email}
                    </Typography>
                  ) : (
                    "-"
                  )}

                  <TalentSVGButton
                    color={"white"}
                    source={contact}
                    height={16}
                    width={18}
                  />
                  {/* contact api data left */}
                  {talentDetails?.candidate_profile?.contact_no !== null ? (
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 500,
                        // mb: "2px",
                      }}
                    >
                      {talentDetails?.candidate_profile?.contact_no}
                    </Typography>
                  ) : (
                    "-"
                  )}

                  <Box
                    component="img"
                    className="profileAvatar"
                    alt="crayon logo"
                    src={linkedin}
                    sx={{
                      mr: 1,
                      ml: 1,
                      width: "20px",
                      height: "20px",
                    }}
                  />

                  {talentContent?.candidate_profile?.linkedin_profile_link !==
                    null ? (
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 500,
                        // mb: "2px",
                        width: "200px",
                        whiteSpace: "nowrap", // Prevents text from wrapping
                        overflow: "hidden", // Hides any overflowing content
                        textOverflow: "ellipsis", // Adds dots at the end of overflowing text
                      }}
                    >
                      {talentContent?.candidate_profile?.linkedin_profile_link}
                    </Typography>
                  ) : (
                    "-"
                  )}
                </Box>

                <Box display={"flex"} alignItems={"center"}>
                  <TalentSVGButton
                    color={"white"}
                    source={referrals}
                    height={28}
                    width={18}
                    padding={"0 8px 0 0 !important"}
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

                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 700,
                      // mb: "2px",
                    }}
                  >
                    Referred by:{" "}
                    <SmallButton
                      color="blueButton700"
                      label={"Daffy Duck"}
                      mr="8px"
                      fontSize="12px"
                    ></SmallButton>
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
          </Grid>
          <Grid
            item
            paddingLeft="0px !important"
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              width: "185px",
            }}
          >
            {!flip && (
              <>
                <Box sx={{ margin: "0 -22px 0 -22px" }}>
                  <SingleRadialChart
                    hollow="55%"
                    nameSize="9px"
                    valueSize="14px"
                    nameOffsetY="11"
                    valueOffsetY="-17"
                    labelsData={"applications"}
                    max={1000}
                    series={[talentContent?.TotalUserCount]}
                    width={100}
                    color={theme.palette.lightGreenButton300.main}
                  />
                </Box>
                <Box sx={{ margin: "0 -22px 0 -22px" }}>
                  <SingleRadialChart
                    hollow="55%"
                    nameSize="9px"
                    valueSize="14px"
                    nameOffsetY="11"
                    valueOffsetY="-17"
                    labelsData={"shortlisted"}
                    series={[talentContent?.totalusershorlisted]}
                    width={100}
                    color={theme.palette.lightGreenButton300.main}
                  />
                </Box>
                <Box sx={{ margin: "0 -22px 0 -22px" }}>
                  <SingleRadialChart
                    hollow="55%"
                    nameSize="9px"
                    valueSize="14px"
                    nameOffsetY="11"
                    valueOffsetY="-17"
                    labelsData={"interviews"}
                    series={[talentContent?.totaluserinterviewed]}
                    width={100}
                    color={theme.palette.lightGreenButton300.main}
                  />
                </Box>
              </>
            )}
          </Grid>
          <Grid item paddingLeft="0px !important">
            <Box
              sx={{
                display: "flex",
                // alignItems: "flex-start",
                justifyContent: "space-evenly",
              }}
            >
              <TalentSVGButton
                color={"white"}
                source={deleteIcon}
                height={24}
                width={18}
              // padding={"0 0 0 16px !important"}
              />
              <Box sx={{ display: "flex", paddingLeft: "10px" }}>
                <Button
                  variant="contained"
                  color="lightGreenButton300"
                  sx={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "white",
                    padding: "8px 10px",
                    borderRadius: "0 0 0 10px",
                    height: "30px !important",
                  }}
                >
                  {"interview"}
                </Button>
                <Button
                  variant="contained"
                  color="dateButton"
                  sx={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#000",
                    padding: "8px 10px",
                    borderRadius: "0px !important",
                    borderRight: "1px solid #EBECF3",
                    borderBottom: "1px solid #EBECF3",
                    height: "30px !important",
                    width: "110px !important",
                  }}
                >
                  {dateConverterMonth(talentContent?.created_at)}
                </Button>
                <Button
                  variant="contained"
                  color="dateButton"
                  sx={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#000",
                    padding: "8px 10px",
                    borderRadius: "0px !important",
                    borderRight: "1px solid #EBECF3",
                    borderBottom: "1px solid #EBECF3",
                    height: "30px !important",
                    width: "max-content",
                  }}
                >
                  {convertDatetimeWithoutAgo(talentContent?.created_at)}
                </Button>
                <Button
                  ref={anchorRef}
                  id="composition-button"
                  aria-controls={open ? "composition-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                  variant="contained"
                  color="base"
                  endIcon={
                    <Box
                      component="img"
                      className="eye"
                      alt="eye logo"
                      src={activeDownClose}
                      sx={{
                        height: 25,
                        width: 25,
                        mr: 1,
                      }}
                    />
                  }
                  sx={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#000",
                    padding: "8px 10px",
                    borderRadius: "0px !important",
                    borderRight: "1px solid #EBECF3",
                    borderBottom: "1px solid #EBECF3",
                    height: "30px !important",
                  }}
                >
                  {"Active"}
                  <Circle
                    fontSize="string"
                    color={"lightGreenButton300"}
                    sx={{ marginLeft: "10px" }}
                  />
                </Button>
                <Stack direction="row" spacing={2} sx={{ zIndex: "1000" }}>
                  <Box>
                    <Popper
                      open={openActive}
                      anchorEl={anchorRef.current}
                      role={undefined}
                      placement="bottom-start"
                      transition
                    // disablePortal
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={{
                            transformOrigin:
                              placement === "bottom-start"
                                ? "left top"
                                : "left bottom",
                          }}
                        >
                          <Paper
                            sx={{
                              width: "105px !important",
                              borderRadius: "0px !important",
                            }}
                          >
                            <ClickAwayListener onClickAway={handleCloseActive}>
                              <MenuList
                                autoFocusItem={openActive}
                                id="composition-menu"
                                aria-labelledby="composition-button"
                                onKeyDown={handleListKeyDown}
                              >
                                <MenuItem
                                  onClick={handleCloseActive}
                                  sx={{ fontSize: "12px", fontWeight: 700 }}
                                >
                                  Hide{" "}
                                  <Circle
                                    fontSize="string"
                                    color={"yellowButton100"}
                                    sx={{ marginLeft: "10px" }}
                                  />
                                </MenuItem>
                                <MenuItem
                                  onClick={handleCloseActive}
                                  sx={{ fontSize: "12px", fontWeight: 700 }}
                                >
                                  Suspend
                                  <Circle
                                    fontSize="string"
                                    color={"redButton100"}
                                    sx={{ marginLeft: "10px" }}
                                  />
                                </MenuItem>
                                <MenuItem
                                  onClick={handleCloseActive}
                                  sx={{ fontSize: "12px", fontWeight: 700 }}
                                >
                                  Blacklist
                                  <Circle
                                    fontSize="string"
                                    color={"#000"}
                                    sx={{ marginLeft: "10px" }}
                                  />
                                </MenuItem>
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </Box>
                </Stack>
              </Box>
            </Box>

            <Box
              sx={{
                // marginLeft: "-30px",
                // width: "370px",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                paddingTop: "12px",
              }}
            >
              <Box sx={{}}>
                {talentContent?.employment_type != null ? (
                  <SmallButton
                    color="blueButton700"
                    label={truncate(
                      talentContent?.employment_type,
                      { length: 12 }
                    )}
                    value={
                      talentContent?.employment_type
                    }
                    mr="4px"
                    fontSize="12px"
                  ></SmallButton>
                ) : null}

                {talentContent?.work_setup !=
                  null ? (
                  <SmallButton
                    color="blueButton700"
                    label={
                      talentContent?.work_setup
                    }
                    mr="8px"
                    fontSize="12px"
                  ></SmallButton>
                ) : null}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  width: "240px",
                  justifyContent: "space-between",
                  marginRight: "8px",
                }}
              >
                <CopyToClipboard
                  text={`${prevLocation}/candidate-cv/${talentContent?.user_id}`}
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
                  <TalentSVGButton
                    color={"yellowButton100"}
                    source={link}
                    height={20}
                    width={18}
                  />
                </CopyToClipboard>

                <TalentSVGButton
                  color={"quicklinks"}
                  source={talent}
                  height={28}
                  width={18}
                  onClick={(event) => {
                    setAnchorElPersonality(event.target);
                  }}
                />
                <Popover
                  id="dropdown-menu"
                  open={openPersonality}
                  anchorEl={anchorElPersonality}
                  onClose={handlePopoverClose}
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
                      mt: 1,
                    },
                  }}
                >
                  <Databases />
                </Popover>
                <SmallButton
                  color={"eyeview"}
                  startIcon={<PlayArrowIcon />}
                  padding={0}
                  justifyContent={"center"}
                  borderRadius={50}
                  height={31}
                  width={33}
                  fontWeight={700}
                  onClick={(event) => setOpenVideo(event.target)}
                />
                <Popover
                  id="dropdown-menu"
                  open={openDialog}
                  anchorEl={openVideo}
                  onClose={handlePopoverCloseVideo}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  sx={{
                    "& .css-ll95b0-MuiPaper-root-MuiPopover-paper": {
                      // padding: "16px !important",
                      minWidth: "10% !important",
                      borderRadius: "20px !important",
                      mt: 1,
                    },
                  }}
                >
                  <VideoDialog handleOpen={handlePopoverCloseVideo} />
                </Popover>
                <TalentSVGButton
                  color={"redButton"}
                  source={CV}
                  height={18}
                  width={18}
                  onClick={(event) => setOpenDocument(event.target)}
                />
                <Popover
                  id="dropdown-menu"
                  open={openDocumentDialog}
                  anchorEl={openDocument}
                  onClose={handlePopoverCloseDocument}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  sx={{
                    "& .css-ll95b0-MuiPaper-root-MuiPopover-paper": {
                      // padding: "16px !important",
                      minWidth: "12% !important",
                      borderRadius: "20px !important",
                      mt: 1,
                    },
                  }}
                >
                  <Document
                    handleOpen={handlePopoverCloseDocument}
                    cvLink={talentContent?.cv_link}
                    userID={talentContent?.user_id}
                  />
                </Popover>

                <TalentSVGButton
                  color={"yellowButton100"}
                  source={chatHistory}
                  height={26}
                  width={18}
                />

                <TalentSVGButton
                  color={"redButton"}
                  source={chat}
                  height={16}
                  width={18}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </AccordionSummary>

      <AccordionDetails
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {flip && talentDetails &&
          // <DetailsSection talentDetails={talentDetails}/>
          <Grid item>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box className="contentBoxLeft">
                <Box sx={{ mt: 1, mb: 2 }}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 700,
                      // mb: "2px",
                    }}
                  >
                    {"Skills"}
                  </Typography>
                  {talentDetails?.candidate_profile?.tag_users?.map((item) => {
                    return (
                      <SmallButton
                        color="orangeButton"
                        letterSpacing="-0.02em"
                        borderRadius="5px"
                        label={item?.tag?.tag}
                        mr="8px"
                      ></SmallButton>
                    );
                  })}
                </Box>
                <Box sx={{ mt: 1, mb: 2 }}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 700,
                      // mb: "2px",
                    }}
                  >
                    {"Summary"}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: 400,
                      mr: 1,
                    }}
                  >
                    {talentDetails?.candidate_profile?.my_bio}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: 700,
                      mr: 1,
                    }}
                  >
                    {i18n["allTalent.industries"]}:
                  </Typography>
                  {talentDetails?.candidate_profile?.industry_users.map(
                    (item) => {
                      return (
                        <SmallButton
                          minWidth="10px"
                          height={18}
                          color="blueButton600"
                          borderRadius="5px"
                          label={item?.industry?.name}
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
                      fontWeight: 700,
                      mr: 1,
                    }}
                  >
                    {i18n["allTalent.tools"]}:
                  </Typography>
                  <SmallButton
                    minWidth="10px"
                    height={18}
                    color="yellowButton100"
                    borderRadius="5px"
                    label="Adobe"
                    mr="4px"
                  ></SmallButton>
                  <SmallButton
                    minWidth="10px"
                    height={18}
                    color="yellowButton100"
                    borderRadius="5px"
                    label="Microsoft Word"
                    mr="4px"
                  ></SmallButton>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: 700,
                      mr: 1,
                    }}
                  >
                    {i18n["allTalent.nationality"]}:
                  </Typography>
                  {talentDetails?.candidate_profile?.candidate_nationalities.map(
                    (item) => {
                      return (
                        <SmallButton
                          minWidth="10px"
                          height={18}
                          color="grayButton200"
                          textColor={theme.palette.black100.main}
                          fontWeight="700"
                          borderRadius="5px"
                          label={item?.nationality?.nationali}
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
                      fontWeight: 700,
                      mr: 1,
                    }}
                  >
                    {i18n["allTalent.languages"]}:
                  </Typography>
                  {talentDetails?.candidate_profile?.candidate_languages.map(
                    (item) => {
                      return (
                        <SmallButton
                          minWidth="10px"
                          height={18}
                          color="grayButton200"
                          textColor={theme.palette.black100.main}
                          fontWeight="700"
                          borderRadius="5px"
                          label={item?.language?.language}
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
                      fontWeight: 700,
                      mr: 1,
                    }}
                  >
                    {i18n["allTalent.institutions"]}:
                  </Typography>
                  {talentDetails?.candidate_profile?.qualification_users.map(
                    (item) => {
                      return (
                        <SmallButton
                          minWidth="10px"
                          height={18}
                          color="grayButton200"
                          textColor={theme.palette.black100.main}
                          fontWeight="700"
                          borderRadius="5px"
                          label={item?.institution?.name}
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
                      fontWeight: 700,
                      mr: 1,
                    }}
                  >
                    {i18n["allTalent.qualifications"]}:
                  </Typography>
                  {talentDetails?.candidate_profile?.qualification_users.map(
                    (item) => {
                      return (
                        <SmallButton
                          justifyContent={"flex-start"}
                          height={18}
                          color="grayButton200"
                          textColor={theme.palette.black100.main}
                          fontWeight="700"
                          borderRadius="5px"
                          label={item?.qualification?.name}
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
                      fontWeight: 700,
                      mr: 1,
                    }}
                  >
                    {i18n["allTalent.associations"]}:
                  </Typography>
                  {talentDetails?.candidate_profile?.qualification_users.map(
                    (item, index) => {
                      return (
                        index === 0 && (
                          <SmallButton
                            minWidth="10px"
                            height={18}
                            color="grayButton200"
                            textColor={theme.palette.black100.main}
                            fontWeight="700"
                            borderRadius="5px"
                            label={item?.association?.name}
                            mr="4px"
                          ></SmallButton>
                        )
                      );
                    }
                  )}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: 700,
                      mr: 1,
                    }}
                  >
                    {i18n["allTalent.school"]}:
                  </Typography>
                  {talentDetails?.candidate_profile?.qualification_users.map(
                    (item, index) => {
                      return (
                        index === 0 && (
                          <SmallButton
                            minWidth="10px"
                            height={18}
                            color="grayButton200"
                            textColor={theme.palette.black100.main}
                            fontWeight="700"
                            borderRadius="5px"
                            label={item?.school?.name}
                            mr="4px"
                          ></SmallButton>
                        )
                      );
                    }
                  )}
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: 700,
                      mr: 1,
                    }}
                  >
                    {i18n["allTalent.personality"]}
                  </Typography>
                  <SmallButton
                    minWidth="10px"
                    height={18}
                    endIcon={
                      <Box
                        component="img"
                        className="eye"
                        alt="eye logo"
                        src={edit}
                        sx={{
                          height: 10,
                          width: 12,
                        }}
                      />
                    }
                    color="yellowButton100"
                    borderRadius="5px"
                    label="Edit"
                    mr="4px"
                    padding="10px !important"
                    onClick={handleEdit}
                  ></SmallButton>
                </Box>

                <Grid
                  container
                  spacing={0}
                  padding="0 16px 8px 70px"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      width: "270px",
                    }}
                  >
                    {talentDetails?.candidate_profile?.candidate_info?.primary
                      ?.name && (
                        <Box
                          component="img"
                          height={80}
                          alt="Primary personality"
                          src={
                            (talentDetails?.candidate_profile?.candidate_info
                              ?.primary?.name === "collaborator" &&
                              profile_collaborator) ||
                            (talentDetails?.candidate_profile?.candidate_info
                              ?.primary?.name === "challenger" &&
                              profile_challenger) ||
                            (talentDetails?.candidate_profile?.candidate_info
                              ?.primary?.name === "character" &&
                              profile_character) ||
                            (talentDetails?.candidate_profile?.candidate_info
                              ?.primary?.name === "contemplator" &&
                              profile_contemplator)
                          }
                        />
                      )}

                    {talentDetails?.candidate_profile?.candidate_info?.shadow
                      ?.name && (
                        <Box
                          component="img"
                          height={80}
                          alt="Shadow personality"
                          src={
                            (talentDetails?.candidate_profile?.candidate_info
                              ?.shadow?.name === "collaborator" &&
                              profile_collaborator) ||
                            (talentDetails?.candidate_profile?.candidate_info
                              ?.shadow?.name === "challenger" &&
                              profile_challenger) ||
                            (talentDetails?.candidate_profile?.candidate_info
                              ?.shadow?.name === "character" &&
                              profile_character) ||
                            (talentDetails?.candidate_profile?.candidate_info
                              ?.shadow?.name === "contemplator" &&
                              profile_contemplator)
                          }
                        />
                      )}

                    <Box sx={{ margin: "0 -22px 0 -22px" }}>
                      <SingleRadialChart
                        hollow="55%"
                        max={1000}
                        labelsData={"grit score"}
                        series={[
                          talentDetails?.candidate_profile?.candidate_info
                            ?.grit_score,
                        ]}
                        width={130}
                        nameSize="9px"
                        valueSize="14px"
                        nameOffsetY="11"
                        valueOffsetY="-17"
                        color={theme.palette.lightGreenButton300.main}
                      />
                    </Box>
                  </Box>
                  <Box>
                    {talentDetails?.candidate_profile?.candidate_traits?.length >
                      0 &&
                      talentDetails?.candidate_profile?.candidate_traits.map(
                        (item) => {
                          return (
                            <SmallButton
                              fontWeight={500}
                              minWidth="10px"
                              textColor={theme.palette.black100.main}
                              height={25}
                              color="grayButton200"
                              borderRadius="5px"
                              label={item?.trait?.name}
                              mr="4px"
                            ></SmallButton>
                          );
                        }
                      )}
                  </Box>
                </Grid>

                <Box sx={{ mt: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <TalentSVGButton
                      color={"white"}
                      source={experience}
                      height={20}
                      width={18}
                      padding="0 8px 0 0 !important"
                    />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 700,
                        // mb: "2px",
                      }}
                    >
                      {"Experience"}
                    </Typography>
                  </Box>
                  {talentDetails?.candidate_profile?.employer_histories.map(
                    (item) => {
                      return (
                        <Box mt={1}>
                          <Typography
                            sx={{
                              fontSize: "12px",
                              fontWeight: 700,
                            }}
                          >
                            {item?.name}, {item?.title}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "12px",
                              fontWeight: 700,
                            }}
                          >
                            {monthYear(item?.start_date)} -{" "}
                            {monthYear(item?.end_date)}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "12px",
                              fontWeight: 500,
                            }}
                          >
                            {item?.clients_worked_on_awards}
                          </Typography>
                        </Box>
                      );
                    }
                  )}
                </Box>

                <Box sx={{ mt: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <TalentSVGButton
                      color={"white"}
                      source={references}
                      height={20}
                      width={18}
                      padding="0 8px 0 0 !important"
                    />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 700,
                        // mb: "2px",
                      }}
                    >
                      {"References"}
                    </Typography>
                  </Box>
                  {talentDetails?.candidate_profile?.candidate_references?.map(
                    (item) => {
                      return (
                        <Box
                          sx={{
                            width: "200px",
                            display: "flex",
                            justifyContent: "space-between",
                            mt: 1,
                          }}
                        >
                          <Box>
                            <Typography
                              sx={{
                                fontSize: "12px",
                                fontWeight: 700,
                              }}
                            >
                              {item?.name}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "12px",
                                fontWeight: 500,
                              }}
                            >
                              {item?.company_name}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "12px",
                                fontWeight: 500,
                              }}
                            >
                              {item?.title}
                            </Typography>

                            <Box
                              sx={{
                                width: "100px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <TalentSVGButton
                                color={"white"}
                                source={contactReference}
                                height={16}
                                width={18}
                                padding="0 8px 0 0 !important"
                              />
                              <Typography
                                sx={{
                                  fontSize: "12px",
                                  fontWeight: 500,
                                  // mb: "2px",
                                }}
                              >
                                {item?.contact}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                width: "130px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <TalentSVGButton
                                color={"white"}
                                source={emailReference}
                                height={13}
                                width={18}
                                padding="0 8px 0 0 !important"
                              />
                              <Typography
                                sx={{
                                  fontSize: "12px",
                                  fontWeight: 500,
                                  // mb: "2px",
                                }}
                              >
                                {item?.email}
                              </Typography>
                            </Box>
                          </Box>
                          <Box>
                            <TalentSVGButton
                              color={"quicklinks"}
                              source={link}
                              height={20}
                              width={18}
                            />
                          </Box>
                        </Box>
                      );
                    }
                  )}
                </Box>
              </Box>

              <Box className="contentBoxRight">
                <PoolJob
                  handleClick={handleClick}
                  tableData={tableData}
                  handleClose={handleClose}
                  talentContent={{...talentContent,...talentDetails}}
                  addToPool={addToPool}
                  anchorEl={anchorEl}
                  jobClick={jobClick}
                  talentJobs={talentJobs}
                  addToJob={addToJob}
                  handleAddJobClick={handleAddJobClick}
                />
                <JobAlert talentContent={
                  {
                    ...talentContent,
                    ...talentDetails
                  }}
                />
                <CommentBox />
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
                    className="eye"
                    alt="eye logo"
                    src={upClose}
                    sx={{
                      height: 16,
                      width: 16,
                    }}
                  />
                }
                onClick={() => setFlip((prev) => !prev)}
                startIconMargin="4px"
                marginTop="5px"
                height={19}
                width={142}
                fontWeight={700}
                borderRadius="7px 7px 0px 0px"
              />
            </Box>
          </Grid>
        }
      </AccordionDetails>
      <EditPersonality
        talentContent={talentContent}
        show={editPersonality}
        handleOpen={handleEdit}
        seteditPersonality={seteditPersonality}
        setPersonalityAdded={setPersonalityAdded}
        traits={traits}
      />
    </StyledAccordion>
  );
}
