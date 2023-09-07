import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled, alpha } from "@mui/material/styles";
import locale from "../../../i18n/locale";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import SmallButton from "../../common/SmallButton";
import profile from "../../../assets/profile.png";
import history from "../../../assets/history.svg";
import match from "../../../assets/match.svg";
import eye from "../../../assets/eye.svg";
import send from "../../../assets/send.svg";
import linkedin from "../../../assets/linkedin.svg";
import chatComment from "../../../assets/Padding Excluded/Black_Chat_Green.svg";

import link from "../../../assets/Padding Excluded/Black_Documents.svg";
import chatHistory from "../../../assets/Padding Excluded/Black_Chat History_1.svg";
import chat from "../../../assets/Padding Excluded/Black_Chat.svg";
import CV from "../../../assets/Padding Excluded/Black_CV.svg";
import talent from "../../../assets/Padding Excluded/Black_Talent.svg";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { formatCurrencyWithCommas } from "../../../utils/Currency";
import {
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Popover,
  Tooltip,
} from "@mui/material";
import RadialChart from "../../common/RadialChart";
import {
  ALERT_TYPE,
  CARD_RIGHT_BUTTON_GROUP,
  ERROR_MSG,
} from "../../../utils/Constants";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import ManIcon from "@mui/icons-material/Man";
import Switch from "@mui/material/Switch";
import Slider from "@mui/material/Slider";
import PlaceIcon from "@mui/icons-material/Place";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import SingleRadialChart from "../../common/SingleRadialChart";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import {
  convertDOB,
  convertDatetimeAgo,
  convertDatetimeWithoutAgo,
  dateConverter,
  dateConverterMonth,
  monthYear,
  weekConvert,
} from "../../../utils/DateTime";
import SelectMenu from "../../common/SelectMenu";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import AutoComplete from "../../common/AutoComplete";
import StyledButton from "../../common/StyledButton";
import {
  addTalentPool,
  addTalentToJob,
  getAdminTalentJobList,
  getAllJobs,
  getTalentPool,
  talentPersonality,
} from "../../../redux/admin/jobsSlice";
import { setAlert, setLoading } from "../../../redux/configSlice";
import { Link, useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import UP from "../../../assets/Padding Excluded/Black_Up_Close.svg";
import DOWN from "../../../assets/Padding Excluded/Black_Down_Open.svg";
import edit from "../../../assets/Padding Excluded/Black_Edit.svg";
import references from "../../../assets/Padding Excluded/Black_Referals_Blue.svg";
import contactReference from "../../../assets/Padding Excluded/Black_Contact_Blue.svg";
import emailReference from "../../../assets/Padding Excluded/Black_Email_Blue.svg";
import contact from "../../../assets/Padding Excluded/Black_Contact_Yellow.svg";
import email from "../../../assets/Padding Excluded/Black_Email_Red.svg";
import referrals from "../../../assets/Padding Excluded/Black_Referals_Yellow.svg";
import userProfile from "../../../assets/Padding Excluded/Black_User_Profile - Copy.svg";
import locationIcon from "../../../assets/Padding Excluded/Black_Location.svg";
import pending from "../../../assets/Padding Excluded/Black_Pending.svg";
import salary from "../../../assets/Padding Excluded/Black_Salary.svg";
import notice from "../../../assets/Padding Excluded/Black_Notice_Period.svg";
import experience from "../../../assets/Padding Excluded/Black_Experience_Title_Job.svg";
import humanMale from "../../../assets/Padding Excluded/Black_Male.svg";
import upClose from "../../../assets/Padding Included/Black_Up_Close.svg";
import downClose from "../../../assets/Padding Included/Black_Down_Open.svg";
import deleteIcon from "../../../assets/Padding Excluded/Black_Trash_Delete_1 - Copy.svg";
import activeUpClose from "../../../assets/Black_Up_Close - Copy.svg";
import activeDownClose from "../../../assets/Black_Down_Open - Copy.svg";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import profile_challenger from "../../../assets/Profile Icons_Challenger.svg";
import profile_character from "../../../assets/Profile Icons_Charater.svg";
import profile_collaborator from "../../../assets/Profile Icons_Collaborator.svg";
import profile_contemplator from "../../../assets/Profile Icons_Contemplator.svg";

import {
  getPersonalities,
  getTraits,
} from "../../../redux/employer/postJobSlice";
import { Circle } from "@mui/icons-material";
import SVGButton from "../../common/SVGButton";
import TalentSVGButton from "../../common/TalentSVGButton";
import PoolJob from "./DialogBox/PoolJob";

const label = "grit score";
const labelExp = "experience";
const labelHon = "honours";
const labelSal = "salary";
const labelNoti = "notice";

const StyledHR = styled(Box)(({ theme }) => ({
  borderRight: "1px solid rgba(0, 0, 0, 0.3)",
  width: "0px",
  height: "10px",
  marginRight: "8px",
}));
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
    marginTop: "-9px",
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
    borderRadius: "10px",
  },
}));
function valuetext(value) {
  return `${value}°C`;
}
const labels = ["Salary", "Experience", "Q Level"];

const PERSONALITY = {
  primary_personality: "",
  shadow_personality: "",
  grit_score: "",
  traits: [],
};

const marks = [
  {
    value: 0,
    label: "00",
  },
  {
    value: 25,
    label: "25",
  },
  {
    value: 50,
    label: "50",
  },
  {
    value: 75,
    label: "75",
  },
  {
    value: 100,
    label: "100",
  },
];

const textValue = (value) => {
  return value;
};
export default function AllTalentNewCard({
  talentContent,
  setPersonalityAdded,
}) {
  const i18n = locale.en;
  const theme = useTheme();
  const dispatch = useDispatch();
  const location = useLocation();

  const prevLocation = location.pathname;
  const hasTalentPool = location.pathname.includes("talent-pool");
  const [flip, setFlip] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [jobClick, setJobClick] = useState(null);
  const [anchorElPersonality, setAnchorElPersonality] = useState(null);
  const [value, setValue] = useState([20, 37]);
  const [tableData, setTableData] = useState([]);
  const [talentJobs, setTalentJobs] = useState([]);
  const [lastKey, setLastKey] = useState(0);
  const [personalitiesData, setPersonalitiesData] = useState({
    ...PERSONALITY,
  });
  const { personalities, traits } = useSelector((state) => state.postJobs);

  // console.log(location);
  console.log(hasTalentPool);

  const open = Boolean(anchorEl);
  const openPersonality = Boolean(anchorElPersonality);

  const handleClick = async (event) => {
    setAnchorEl(event.currentTarget);
    await getTalent();
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
    } catch (error) {}
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
    } catch (error) {}
  };

  const getAllData = async () => {
    try {
      // dispatch(setLoading(true));
      await Promise.all([dispatch(getPersonalities()), dispatch(getTraits())]);
      // dispatch(setLoading(false));
    } catch (error) {
      // dispatch(setLoading(false));
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: ERROR_MSG,
        })
      );
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setJobClick(null);
  };

  const handlePopoverClose = () => {
    setAnchorElPersonality(null);
  };

  const handlePersonality = async (event, newTab) => {
    !openPersonality && setAnchorElPersonality(event.target);
    await getAllData();
  };

  const handleChange = (event) => {
    const {
      target: { value },
      target: { name },
    } = event;
    if (
      personalitiesData.primary_personality == value ||
      personalitiesData.shadow_personality == value
    ) {
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: "Primary and Shadow Personality should not be similar",
        })
      );
      return;
    }

    const newPersonalitiesData = {
      ...personalitiesData,
      [name]: value,
    };
    console.log("NEW PERSONALITY", newPersonalitiesData);
    setPersonalitiesData(newPersonalitiesData);
  };

  const handleMultipleAutoComplete = (event, newValue, id) => {
    if (newValue.length <= 5) {
      let newPersonalitiesData = {
        ...personalitiesData,
        [id]: newValue.map((val) => val?.inputValue || val?.trait_id || val),
      };
      console.log(newPersonalitiesData);
      setPersonalitiesData(newPersonalitiesData);
    } else {
      newValue.splice(5, 1);
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: "You can't add more than 5 traits!!",
        })
      );
    }
  };

  const getTraitsValue = () => {
    if (personalitiesData.traits?.length == 0) {
      return [];
    }

    return personalitiesData.traits?.map(
      (id) => traits?.find((trait) => trait.id == id) || id
    );
  };

  const rangeHandler = (event) => {
    const {
      target: { value },
      target: { name },
      target: { id },
    } = event;

    const newPersonalitiesData = {
      ...personalitiesData,
      [name]: value,
    };
    console.log(newPersonalitiesData);
    setPersonalitiesData(newPersonalitiesData);
  };

  const addPersonality = async () => {
    const data = {
      ...personalitiesData,
      user_id: talentContent.user_id,
    };
    console.log(data);
    const { payload } = await dispatch(talentPersonality(data));
    if (payload?.status == "success") {
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.SUCCESS,
          msg: "Personality Added Successfully",
        })
      );
      setPersonalityAdded(true);
      setAnchorElPersonality(null);
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

  return (
    <StyledAccordion expanded={flip}>
      <AccordionSummary
        // expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Grid container spacing={2}>
          <Grid item>
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
              onClick={() => setFlip((prev) => !prev)}
            />
          </Grid>

          <Grid
            item
            xs={1}
            sx={{
              display: "flex",
              flexDirection: "column",
              margin: "12px 0",
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

          <Grid item xs={5.5} paddingLeft="0px !important">
            <Box display={"flex"} alignItems={"baseline"}>
              <TalentSVGButton
                color={"white"}
                source={humanMale}
                height={24}
                width={18}
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
                  }}
                >
                  {talentContent?.first_name}
                </Typography>
              </Link>
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              <TalentSVGButton
                color={"white"}
                source={experience}
                height={20}
                width={18}
              />
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 700,
                  mr: 1,
                }}
              >
                {"Lead Engineer"}
              </Typography>
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              <TalentSVGButton
                color={"white"}
                source={userProfile}
                height={28}
                width={24}
              />
              {talentContent?.candidate_profile?.dob != null ? (
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 600,
                    // mb: "2px",
                  }}
                >
                  {`${convertDOB(talentContent?.candidate_profile?.dob)} yrs`}
                </Typography>
              ) : (
                "-"
              )}
              <TalentSVGButton
                color={"white"}
                source={locationIcon}
                height={28}
                width={24}
              />
              {talentContent?.candidate_profile?.town !== null ? (
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 600,
                    // mb: "2px",
                  }}
                >
                  {talentContent?.candidate_profile?.town?.name},{" "}
                  {talentContent?.candidate_profile?.town?.region?.name}
                </Typography>
              ) : (
                "-"
              )}
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
                }}
              >
                $
                {formatCurrencyWithCommas(
                  talentContent?.candidate_profile?.candidate_info?.salary?.max
                )}
                pm
              </Typography>
              <TalentSVGButton
                color={"white"}
                source={pending}
                height={20}
                width={18}
              />
              {talentContent?.candidate_profile?.candidate_info?.experience !==
              null ? (
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 600,
                    // mb: "2px",
                  }}
                >
                  {
                    talentContent?.candidate_profile?.candidate_info?.experience
                      ?.year
                  }{" "}
                  years
                </Typography>
              ) : (
                "-"
              )}
              <TalentSVGButton
                color={"white"}
                source={notice}
                height={20}
                width={18}
              />
              {talentContent?.candidate_profile?.candidate_info
                ?.notice_period !== null ? (
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 600,
                    // mb: "2px",
                  }}
                >
                  {
                    talentContent?.candidate_profile?.candidate_info
                      ?.notice_period?.description
                  }
                </Typography>
              ) : (
                "-"
              )}
            </Box>

            {flip && (
              <>
                <Box display={"flex"} alignItems={"center"}>
                  <TalentSVGButton
                    color={"white"}
                    source={email}
                    height={28}
                    width={18}
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
                  {talentContent?.candidate_profile?.contact_no !== null ? (
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 500,
                        // mb: "2px",
                      }}
                    >
                      {talentContent?.candidate_profile?.contact_no}
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
                  />
                  {talentContent?.email !== null ? (
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 700,
                        // mb: "2px",
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
                  ) : (
                    "-"
                  )}

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
                </Box>
              </>
            )}
          </Grid>

          <Grid
            item
            xs={2}
            paddingLeft="0px !important"
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginLeft: "-80px",
            }}
          >
            <Box sx={{ margin: "0 -22px 0 -22px" }}>
              <SingleRadialChart
                hollow="55%"
                nameSize="9px"
                valueSize="14px"
                nameOffsetY="11"
                valueOffsetY="-17"
                labelsData={"applications"}
                max={1000}
                series={[34]}
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
                series={[10]}
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
                series={[3]}
                width={100}
                color={theme.palette.lightGreenButton300.main}
              />
            </Box>
          </Grid>

          <Grid
            item
            xs={3}
            paddingLeft="0px !important"
            sx={{ marginLeft: "50px" }}
          >
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
                    fontWeight: 500,
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
                    fontWeight: 500,
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
                      }}
                    />
                  }
                  sx={{
                    fontSize: "12px",
                    fontWeight: 500,
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
              </Box>
            </Box>

            <Box
              sx={{
                marginLeft: "-30px",
                width: "370px",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                paddingTop: "12px",
              }}
            >
              <Box sx={{ width: "143px" }}>
                {talentContent?.candidate_profile?.candidate_info
                  ?.employment_type != null ? (
                  <SmallButton
                    color="blueButton700"
                    label={
                      talentContent?.candidate_profile?.candidate_info
                        ?.employment_type
                    }
                    mr="4px"
                    fontSize="12px"
                  ></SmallButton>
                ) : null}

                {talentContent?.candidate_profile?.candidate_info?.work_setup !=
                null ? (
                  <SmallButton
                    color="blueButton700"
                    label={
                      talentContent?.candidate_profile?.candidate_info
                        ?.work_setup
                    }
                    mr="8px"
                    fontSize="12px"
                  ></SmallButton>
                ) : null}
              </Box>

              <TalentSVGButton
                color={"yellowButton100"}
                source={link}
                height={20}
                width={18}
              />
              <TalentSVGButton
                color={"redButton"}
                source={chat}
                height={16}
                width={18}
              />
              <SmallButton
                color={"eyeview"}
                startIcon={<PlayArrowIcon />}
                padding={0}
                justifyContent={"center"}
                borderRadius={50}
                height={31}
                width={33}
                fontWeight={700}
              />
              <TalentSVGButton
                color={"yellowButton100"}
                source={chatHistory}
                height={26}
                width={18}
              />
              <TalentSVGButton
                color={"redButton"}
                source={CV}
                height={18}
                width={18}
              />
              <TalentSVGButton
                color={"quicklinks"}
                source={talent}
                height={28}
                width={18}
              />
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
                {talentContent?.candidate_profile?.tag_users.map((item) => {
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
                  {talentContent?.candidate_profile?.my_bio}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 400,
                    mr: 1,
                  }}
                >
                  {i18n["allTalent.industries"]}:
                </Typography>
                {talentContent?.candidate_profile?.industry_users.map(
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
                    fontWeight: 400,
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
                    fontWeight: 400,
                    mr: 1,
                  }}
                >
                  {i18n["allTalent.nationality"]}:
                </Typography>
                {talentContent?.candidate_profile?.candidate_nationalities.map(
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
                    fontWeight: 400,
                    mr: 1,
                  }}
                >
                  {i18n["allTalent.languages"]}:
                </Typography>
                {talentContent?.candidate_profile?.candidate_languages.map(
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
                    fontWeight: 400,
                    mr: 1,
                  }}
                >
                  {i18n["allTalent.institutions"]}:
                </Typography>
                {talentContent?.candidate_profile?.qualification_users.map(
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
                    fontWeight: 400,
                    mr: 1,
                  }}
                >
                  {i18n["allTalent.qualifications"]}:
                </Typography>
                {talentContent?.candidate_profile?.qualification_users.map(
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
                    fontWeight: 400,
                    mr: 1,
                  }}
                >
                  {i18n["allTalent.associations"]}:
                </Typography>
                {talentContent?.candidate_profile?.qualification_users.map(
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
                    fontWeight: 400,
                    mr: 1,
                  }}
                >
                  {i18n["allTalent.school"]}:
                </Typography>
                {talentContent?.candidate_profile?.qualification_users.map(
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
                    fontWeight: 400,
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
                  {talentContent?.candidate_profile?.candidate_info?.primary
                    ?.name && (
                    <Box
                      component="img"
                      height={80}
                      alt="Primary personality"
                      src={
                        (talentContent?.candidate_profile?.candidate_info
                          ?.primary?.name === "collaborator" &&
                          profile_collaborator) ||
                        (talentContent?.candidate_profile?.candidate_info
                          ?.primary?.name === "challenger" &&
                          profile_challenger) ||
                        (talentContent?.candidate_profile?.candidate_info
                          ?.primary?.name === "character" &&
                          profile_character) ||
                        (talentContent?.candidate_profile?.candidate_info
                          ?.primary?.name === "contemplator" &&
                          profile_contemplator)
                      }
                    />
                  )}

                  {talentContent?.candidate_profile?.candidate_info?.shadow
                    ?.name && (
                    <Box
                      component="img"
                      height={80}
                      alt="Shadow personality"
                      src={
                        (talentContent?.candidate_profile?.candidate_info
                          ?.shadow?.name === "collaborator" &&
                          profile_collaborator) ||
                        (talentContent?.candidate_profile?.candidate_info
                          ?.shadow?.name === "challenger" &&
                          profile_challenger) ||
                        (talentContent?.candidate_profile?.candidate_info
                          ?.shadow?.name === "character" &&
                          profile_character) ||
                        (talentContent?.candidate_profile?.candidate_info
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
                        talentContent?.candidate_profile?.candidate_info
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
                  {talentContent?.candidate_profile?.candidate_traits?.length >
                    0 &&
                    talentContent?.candidate_profile?.candidate_traits.map(
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
                {talentContent?.candidate_profile?.employer_histories.map(
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
                {talentContent?.candidate_profile?.candidate_references.map(
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
                talentContent={talentContent}
                addToPool={addToPool}
                anchorEl={anchorEl}
                jobClick={jobClick}
                talentJobs={talentJobs}
                addToJob={addToJob}
                handleAddJobClick={handleAddJobClick}
              />

              <Box sx={{ mt: 4 }}>
                <TalentSVGButton
                  color={"white"}
                  source={chatComment}
                  height={16}
                  width={18}
                />
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 700,
                    mr: 1,
                  }}
                >
                  {i18n["allTalent.comments"]} (2)
                </Typography>
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
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 600,
                        mr: 1,
                      }}
                    >
                      Name
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 400,
                        mr: 1,
                      }}
                    >
                      Currently on R25,000pm, looking to change industries in
                      the fintech space.
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
                      28 Nov 2022:
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", mt: 1 }}>
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
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 600,
                        mr: 1,
                      }}
                    >
                      Name
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 400,
                        mr: 1,
                      }}
                    >
                      Currently on R25,000pm, looking to change industries in
                      the fintech space.
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
                      28 Nov 2022:
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ mt: 4 }}>
                  <StyledTextField
                    id="outlined-adornment-password"
                    type="text"
                    size="small"
                    placeholder="type your comment here..."
                    endAdornment={
                      <InputAdornment position="end">
                        <Box
                          component="img"
                          className="profileAvatar"
                          alt="crayon logo"
                          src={send}
                          sx={{
                            width: "30px",
                            // mr: 1
                          }}
                        />
                      </InputAdornment>
                    }
                  />
                </Box>
              </Box>
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
      </AccordionDetails>
    </StyledAccordion>
  );
}
