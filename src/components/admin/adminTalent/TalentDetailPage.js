import { Box } from "@mui/material";
import React from "react";
import LeftDrawer from "../LeftDrawer";
import { getCandidateCV } from "../../../redux/employer/myJobsSlice";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
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
import chat from "../../../assets/chat.svg";
import match from "../../../assets/match.svg";
import eye from "../../../assets/eye.svg";
import send from "../../../assets/send.svg";
import linkedin from "../../../assets/linkedin.svg";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { formatCurrencyWithCommas } from "../../../utils/Currency";
import {
  Checkbox,
  FormControl,
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
  dateConverter,
  dateConverterMonth,
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
import { Link, useLocation, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  getPersonalities,
  getTraits,
} from "../../../redux/employer/postJobSlice";

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

export default function TalentDetailPage() {
  const i18n = locale.en;
  const theme = useTheme();
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();

  const prevLocation = location.pathname;
  const hasTalentPool = location.pathname.includes("talent-pool");

  const [anchorEl, setAnchorEl] = useState(null);
  const [jobClick, setJobClick] = useState(null);
  const [anchorElPersonality, setAnchorElPersonality] = useState(null);
  const [value, setValue] = useState([20, 37]);
  const [tableData, setTableData] = useState([]);
  const [talentJobs, setTalentJobs] = useState([]);
  const [lastKey, setLastKey] = useState(0);
  const [talentContent, setTalentContent] = useState([]);
  const [personalityAdded, setPersonalityAdded] = useState();
  const [personalitiesData, setPersonalitiesData] = useState({
    ...PERSONALITY,
  });
  const { personalities, traits } = useSelector((state) => state.postJobs);

  // console.log(location);
  console.log(hasTalentPool);

  const open = Boolean(anchorEl);
  const openPersonality = Boolean(anchorElPersonality);

  const handleCandidateCV = async () => {
    try {
      const { payload } = await dispatch(getCandidateCV({ user_id: id }));

      if (payload?.status == "success") {
        setTalentContent(payload.data);
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
    handleCandidateCV();
  }, []);

  const handleClick = async (event) => {
    setAnchorEl(event.currentTarget);
    await getTalent();
  };

  const handleAddJobClick = async (event) => {
    setJobClick(event.currentTarget);
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
    <Box sx={{ display: "flex" }}>
      <Box sx={{ width: "16%" }}>
        <LeftDrawer />
      </Box>
      <StyledAccordion
        expanded={true}
        sx={{ margin: "2rem !important", width: "100%" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box className="summaryBox" sx={{ mb: "-8px" }}>
            <Box className="summaryBoxContent">
              <SmallButton
                color="orangeButton"
                borderRadius="5px"
                label={talentContent?.user_id}
                mr={1}
                fontSize={10}
                fontWeight={700}
                alignItems="end"
              ></SmallButton>
              {talentContent?.profile_url != "No URL" ? (
                <Box
                  component="img"
                  className="profileAvatar"
                  alt="crayon logo"
                  src={talentContent?.profile_url}
                  sx={{
                    mr: 1,
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
                  }}
                />
              )}
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
                    fontSize: "20px",
                    fontWeight: 700,
                    mr: 1,
                  }}
                >
                  {talentContent?.first_name}
                </Typography>
              </Link>
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 400,
                }}
              >
                {""}
              </Typography>
              <IconButton sx={{ paddingRight: "0 !important" }}>
                <ManIcon color="blueButton400"></ManIcon>
              </IconButton>
              {talentContent?.candidate_profile?.dob != null && (
                <SmallButton
                  color="black100"
                  borderRadius="5px"
                  label={`${convertDOB(
                    talentContent?.candidate_profile?.dob
                  )} yrs`}
                  opacity="0.75"
                  fontSize={10}
                  height={18}
                  padding="0 4px"
                  alignItems="end"
                ></SmallButton>
              )}
            </Box>

            <Box className="summaryBoxContent">
              <SmallButton
                color="black100"
                borderRadius="5px"
                label={dateConverterMonth(talentContent?.created_at)}
                mr="8px"
                height={18}
                opacity="0.5"
              ></SmallButton>
              <SmallButton
                color="black100"
                borderRadius="5px"
                label={convertDatetimeAgo(talentContent?.created_at)}
                mr="8px"
                height={18}
                opacity="0.5"
              ></SmallButton>
              {/*
              {chips?.map((chip, index) => (
              <SmallButton
                color={chip.color}
                key={index}
                label={chip.label}
                mr="8px"
              ></SmallButton>
            ))}
            */}
              <IconButton
                aria-label="edit"
                color="blueButton400"
                sx={{
                  padding: "0 !important",
                  minWidth: "18px !important",
                  "& .MuiSvgIcon-root": {
                    width: "18px",
                  },
                }}
              >
                <EditIcon />
              </IconButton>
            </Box>
          </Box>
          <Box className="summaryBox">
            <Box className="summaryBoxContent">
              <IconButton
                color="redButton"
                aria-label="search job"
                component="button"
                sx={{
                  padding: "0 !important",
                  minWidth: "10px !important",
                  marginRight: "8px",
                  ".MuiSvgIcon-root": {
                    width: "15px",
                    height: "15px",
                  },
                }}
              >
                <PlaceIcon />
              </IconButton>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 500,
                  mr: 1,
                }}
              >
                {talentContent?.candidate_profile?.town?.name},{" "}
                {talentContent?.candidate_profile?.town?.region?.name}
              </Typography>
              <StyledHR></StyledHR>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 500,
                  mr: 1,
                }}
              >
                R
                {formatCurrencyWithCommas(
                  talentContent?.candidate_profile?.candidate_info?.salary?.max
                )}
                pm
              </Typography>
              <StyledHR></StyledHR>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 500,
                  mr: 1,
                }}
              >
                {
                  talentContent?.candidate_profile?.candidate_info?.experience
                    ?.year
                }{" "}
                years
              </Typography>
              <StyledHR></StyledHR>
              {talentContent?.candidate_profile?.candidate_info
                ?.employment_type != null && (
                <SmallButton
                  color="blueButton700"
                  label={
                    talentContent?.candidate_profile?.candidate_info
                      ?.employment_type
                  }
                  mr="4px"
                  fontSize="12px"
                ></SmallButton>
              )}

              {talentContent?.candidate_profile?.candidate_info?.work_setup !=
                null && (
                <SmallButton
                  color="blueButton700"
                  label={
                    talentContent?.candidate_profile?.candidate_info?.work_setup
                  }
                  mr="8px"
                  fontSize="12px"
                ></SmallButton>
              )}
            </Box>

            <Box className="summaryBoxContent">
              <SmallButton
                color="redButton"
                startIcon={
                  <Box
                    component="img"
                    className="eye"
                    alt="eye logo"
                    src={eye}
                  />
                }
                startIconMargin="4px"
                height={24}
                fontWeight={700}
                label={i18n["allTalent.cv"]}
                mr="8px"
                borderRadius="25px"
              ></SmallButton>
              <SmallButton
                color="redButton"
                startIcon={
                  <Box
                    component="img"
                    className="eye"
                    alt="eye logo"
                    src={eye}
                  />
                }
                startIconMargin="4px"
                height={24}
                fontWeight={700}
                label={i18n["allTalent.resume"]}
                mr="8px"
                borderRadius="25px"
              ></SmallButton>
              <SmallButton
                color="redButton"
                startIcon={
                  <Box
                    component="img"
                    className="eye"
                    alt="eye logo"
                    src={eye}
                  />
                }
                startIconMargin="4px"
                height={24}
                fontWeight={700}
                label={i18n["allTalent.portfolio"]}
                borderRadius="25px"
              ></SmallButton>
              <IconButton>
                <PlayCircleFilledIcon color="redButton" />
              </IconButton>
              <SmallButton
                color="lightGreenButton300"
                endIcon={<KeyboardArrowDownIcon />}
                height={24}
                fontWeight={700}
                label={i18n["allTalent.active"]}
                borderRadius="25px"
                mr="8px"
              ></SmallButton>

              <IconButton
                aria-label="edit"
                color="grayButton"
                sx={{
                  padding: "0 !important",
                  minWidth: "18px !important",
                  "& .MuiSvgIcon-root": {
                    width: "18px",
                  },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </AccordionSummary>

        <AccordionDetails
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconButton
                aria-label="edit"
                color="grayButton"
                sx={{
                  mr: "4px",
                  padding: "0 !important",
                  minWidth: "18px !important",
                  "& .MuiSvgIcon-root": {
                    width: "18px",
                  },
                }}
              >
                <EmailIcon />
              </IconButton>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 500,
                  mr: 1,
                  opacity: 0.75,
                  letterSpacing: "0.75px",
                }}
              >
                {talentContent?.email}
              </Typography>
              <StyledHR></StyledHR>
              <IconButton
                aria-label="edit"
                color="grayButton"
                sx={{
                  mr: "4px",
                  padding: "0 !important",
                  minWidth: "18px !important",
                  "& .MuiSvgIcon-root": {
                    width: "18px",
                  },
                }}
              >
                <CallIcon />
              </IconButton>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 500,
                  mr: 1,
                  opacity: 0.75,
                  letterSpacing: "0.75px",
                }}
              >
                {talentContent?.candidate_profile?.contact_no}
              </Typography>
              <StyledHR></StyledHR>
              <Box
                component="img"
                className="profileAvatar"
                alt="crayon logo"
                src={linkedin}
                sx={{
                  mr: 1,
                  width: "20px",
                  height: "20px",
                }}
              />
              <StyledHR></StyledHR>
              <SmallButton
                color="grayButton300"
                textColor={theme.palette.black100.main}
                fontWeight={400}
                letterSpacing="-0.02em"
                borderRadius="5px"
                label="referred by: n/a"
                height={18}
                padding="0 4px"
                mr={1}
              ></SmallButton>
              <StyledHR></StyledHR>
              <SmallButton
                color="grayButton300"
                textColor={theme.palette.black100.main}
                fontWeight={400}
                letterSpacing="-0.02em"
                borderRadius="5px"
                label="referrals: 0"
                height={18}
                padding="0 4px"
              ></SmallButton>
            </Box>

            {/* <Box> */}
            <SmallButton
              color="orangeButton"
              borderRadius="5px"
              label="database(s)"
            ></SmallButton>
            {/* </Box> */}
          </Box>

          <Box sx={{ display: "flex" }}>
            <Box className="contentBoxLeft">
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 400,
                  mr: 1,
                }}
              >
                {talentContent?.candidate_profile?.my_bio}
              </Typography>
              <Box sx={{ mt: 1, mb: 2 }}>
                {/*<SmallButton
                color="orangeButton"
                letterSpacing="-0.02em"
                borderRadius="5px"
                label="graphic design"
                mr="8px"
              ></SmallButton>
              <SmallButton
                color="orangeButton"
                letterSpacing="-0.02em"
                borderRadius="5px"
                label="Adobe Illustrator"
                mr="8px"
              ></SmallButton>
              <SmallButton
                color="orangeButton"
                letterSpacing="-0.02em"
                borderRadius="5px"
                label="animation"
                mr="8px"
              ></SmallButton>
              <SmallButton
                color="orangeButton"
                letterSpacing="-0.02em"
                borderRadius="5px"
                label="motion graphics"
                mr="8px"
              ></SmallButton>
              <SmallButton
                color="orangeButton"
                letterSpacing="-0.02em"
                borderRadius="5px"
                label="sketching"
                mr="8px"
              ></SmallButton>*/}
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
              <Box sx={{ mt: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: 400,
                      mr: 1,
                    }}
                  >
                    {i18n["allTalent.tags"]}:
                  </Typography>
                  <SmallButton
                    minWidth="10px"
                    height={18}
                    color="grayButton"
                    borderRadius="5px"
                    label="#socialmedia"
                    mr="4px"
                  ></SmallButton>
                  <SmallButton
                    minWidth="10px"
                    height={18}
                    color="grayButton"
                    borderRadius="5px"
                    label="#content"
                    mr="4px"
                  ></SmallButton>
                  <SmallButton
                    minWidth="10px"
                    height={18}
                    color="grayButton"
                    borderRadius="5px"
                    label="#design"
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
                    color="grayButton"
                    borderRadius="5px"
                    label="Adobe"
                    mr="4px"
                  ></SmallButton>
                  <SmallButton
                    minWidth="10px"
                    height={18}
                    color="grayButton"
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
                    {i18n["allTalent.qualifications"]}:
                  </Typography>
                  {talentContent?.candidate_profile?.qualification_users.map(
                    (item) => {
                      return (
                        <SmallButton
                          justifyContent={"flex-start"}
                          height={18}
                          color="grayButton"
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
                    {i18n["allTalent.institutions"]}:
                  </Typography>
                  {talentContent?.candidate_profile?.qualification_users.map(
                    (item) => {
                      return (
                        <SmallButton
                          minWidth="10px"
                          height={18}
                          color="grayButton"
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
                    {i18n["allTalent.associations"]}:
                  </Typography>
                  {talentContent?.candidate_profile?.qualification_users.map(
                    (item) => {
                      return (
                        <SmallButton
                          minWidth="10px"
                          height={18}
                          color="grayButton"
                          borderRadius="5px"
                          label={item?.association?.name}
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
                          color="grayButton"
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
                    {i18n["allTalent.nationality"]}:
                  </Typography>
                  {talentContent?.candidate_profile?.candidate_nationalities.map(
                    (item) => {
                      return (
                        <SmallButton
                          minWidth="10px"
                          height={18}
                          color="grayButton"
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
                    {i18n["allTalent.school"]}:
                  </Typography>
                  {talentContent?.candidate_profile?.qualification_users.map(
                    (item) => {
                      return (
                        <SmallButton
                          minWidth="10px"
                          height={18}
                          color="grayButton"
                          borderRadius="5px"
                          label={item?.school?.name}
                          mr="4px"
                        ></SmallButton>
                      );
                    }
                  )}
                </Box>
              </Box>
              <Box sx={{ mt: 1 }}>
                <Box sx={{ display: "flex" }}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 700,
                      mr: 1,
                    }}
                  >
                    {i18n["allTalent.personality"]}
                  </Typography>

                  <Tooltip title={"edit personality"} placement="right-start">
                    <IconButton
                      aria-label="edit"
                      color="blueButton400"
                      onClick={handlePersonality}
                      sx={{
                        padding: "0 !important",
                        minWidth: "18px !important",
                        "& .MuiSvgIcon-root": {
                          width: "18px",
                        },
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Popover
                  id="dropdown-menu"
                  open={openPersonality}
                  anchorEl={anchorElPersonality}
                  onClose={handlePopoverClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  sx={{
                    "& .css-ll95b0-MuiPaper-root-MuiPopover-paper": {
                      padding: "16px !important",
                      minWidth: "50% !important",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 3,
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <InputLabel
                        htmlFor="tags"
                        sx={{
                          color: "black",
                          paddingLeft: "10px",
                          paddingBottom: "2px",
                          fontSize: "14px",
                          fontWeight: 500,
                        }}
                      >
                        {i18n["postAJob.primaryLabel"]}
                      </InputLabel>
                      <SelectMenu
                        name="primary_personality"
                        value={personalitiesData?.primary_personality}
                        onHandleChange={handleChange}
                        options={personalities}
                        sx={{ width: "95%" }}
                        placeholder={
                          i18n["postAJob.preferredDominantPersonality"]
                        }
                      />
                    </Box>
                    <Box sx={{ width: "100%" }}>
                      <InputLabel
                        htmlFor="tags"
                        sx={{
                          color: "black",
                          paddingLeft: "10px",
                          paddingBottom: "2px",
                          fontSize: "14px",
                          fontWeight: 500,
                        }}
                      >
                        {i18n["postAJob.shadowLabel"]}
                      </InputLabel>

                      <SelectMenu
                        name="shadow_personality"
                        value={personalitiesData?.shadow_personality}
                        onHandleChange={handleChange}
                        options={personalities}
                        sx={{ width: "95%" }}
                        placeholder={
                          i18n["postAJob.preferredShadowPersonality"]
                        }
                      />
                    </Box>
                  </Box>

                  <Box sx={{ width: "100%", mb: 3 }}>
                    <InputLabel
                      htmlFor="tags"
                      sx={{
                        color: "black",
                        paddingLeft: "10px",
                        paddingBottom: "2px",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      {i18n["postAJob.traitsLabel"]}
                    </InputLabel>

                    <AutoComplete
                      multiple={true}
                      id="traits"
                      name="traits"
                      value={getTraitsValue()}
                      onChange={handleMultipleAutoComplete}
                      sx={{ width: "97%", display: "inline-table" }}
                      placeholder={i18n["postAJob.preferredShadowPersonality"]}
                      data={traits}
                      limitTags={5}
                    ></AutoComplete>
                  </Box>

                  <Box sx={{ width: "100%" }}>
                    <InputLabel
                      htmlFor="tags"
                      sx={{
                        color: "black",
                        paddingLeft: "10px",
                        paddingBottom: "2px",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      {i18n["postAJob.gritScoreLabel"]}
                    </InputLabel>

                    <Slider
                      name="grit_score"
                      aria-label="Custom marks"
                      color="redButton100"
                      value={personalitiesData?.grit_score}
                      getAriaValueText={textValue}
                      step={1}
                      onChange={(event) => rangeHandler(event)}
                      valueLabelDisplay="auto"
                      valueLabelFormat={textValue}
                      marks={marks}
                      sx={{ width: "95%", ml: 2 }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "table",
                      margin: "auto",
                    }}
                  >
                    <StyledButton
                      sx={{ mr: 0 }}
                      variant="contained"
                      color="redButton100"
                      onClick={addPersonality}
                    >
                      {i18n["allTalent.addPersonality"]}
                    </StyledButton>
                  </Box>
                </Popover>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ marginLeft: "-16px" }}>
                    <SingleRadialChart
                      hollow="55%"
                      labelsData={label}
                      series={
                        talentContent?.candidate_profile?.candidate_info
                          ?.grit_score != null && [
                          talentContent?.candidate_profile?.candidate_info
                            ?.grit_score,
                        ]
                      }
                      width={86}
                      nameSize="9px"
                      valueSize="14px"
                      nameOffsetY="11"
                      valueOffsetY="-17"
                      color={theme.palette.lightGreenButton300.main}
                      index={1}
                      // isHovered={isHovered}
                    />
                  </Box>
                  <Box>
                    <Box
                      sx={{
                        mb: 1,
                      }}
                    >
                      {talentContent?.candidate_profile?.candidate_info?.primary
                        ?.name != null && (
                        <SmallButton
                          fontWeight={500}
                          minWidth="10px"
                          height={25}
                          color="purpleButton"
                          borderRadius="5px"
                          label={
                            talentContent?.candidate_profile?.candidate_info
                              ?.primary?.name
                          }
                          mr="4px"
                        ></SmallButton>
                      )}

                      {talentContent?.candidate_profile?.candidate_info?.shadow
                        ?.name != null && (
                        <SmallButton
                          fontWeight={500}
                          minWidth="10px"
                          height={25}
                          color="brownButton"
                          borderRadius="5px"
                          label={
                            talentContent?.candidate_profile?.candidate_info
                              ?.shadow?.name
                          }
                          mr="4px"
                        ></SmallButton>
                      )}
                    </Box>
                    <Box>
                      {talentContent?.candidate_profile?.candidate_traits
                        ?.length > 0 &&
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
                  </Box>
                </Box>
              </Box>
              <Box sx={{ mt: 1 }}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 700,
                    mr: 1,
                    mb: 1,
                  }}
                >
                  {i18n["allTalent.workHistory"]}
                </Typography>
                {talentContent?.candidate_profile?.employer_histories.map(
                  (item) => {
                    return (
                      <>
                        <Box sx={{ display: "flex", width: "90%" }}>
                          <Typography
                            sx={{
                              fontSize: "12px",
                              fontWeight: 700,
                              mr: "4px",
                              marginBottom: "4px",
                              minWidth: "fit-content",
                            }}
                          >
                            Feb 2020 - Dec 2022
                          </Typography>
                          <Box
                            sx={{
                              borderBottom: `1px solid ${theme.palette.grayButton200.main}`,
                              width: "inherit",
                              marginBottom: "9px",
                            }}
                          ></Box>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                          <Typography
                            sx={{
                              fontSize: "12px",
                              fontWeight: 700,
                              mr: 1,
                            }}
                          >
                            {item.name},{" "}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "12px",
                              fontWeight: 400,
                              mr: 1,
                            }}
                          >
                            {item.title}
                          </Typography>
                          {/* <SmallButton minWidth='10px' height='20px' color="blueButton400" borderRadius="5px" label='Feb 2020 - Dec 2022' mr="8px"></SmallButton> */}
                        </Box>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            fontWeight: 400,
                            mr: 1,
                            fontStyle: "italic",
                            mb: 1,
                          }}
                        >
                          {item.clients_worked_on_awards}
                        </Typography>
                      </>
                    );
                  }
                )}
              </Box>
              <Box sx={{ mt: 1, width: "60%" }}>
                <Box sx={{ display: "flex" }}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 700,
                    }}
                  >
                    {i18n["allTalent.alerts"]}
                  </Typography>
                  <BlueSwitch defaultChecked />
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", mt: "-10px" }}
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: 400,
                      mr: 1,
                    }}
                  >
                    {i18n["allTalent.type"]}:
                  </Typography>
                  <SmallButton
                    minWidth="10px"
                    height={18}
                    color="blueButton700"
                    borderRadius="5px"
                    label={
                      talentContent?.candidate_profile?.candidate_info
                        ?.employment_type
                    }
                    mr="8px"
                  ></SmallButton>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "6px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: 400,
                      mr: 1,
                    }}
                  >
                    {i18n["allTalent.region"]}:
                  </Typography>
                  <SmallButton
                    minWidth="10px"
                    height={18}
                    color="grayButton"
                    borderRadius="5px"
                    label={talentContent?.candidate_profile?.town?.region?.name}
                    mr="8px"
                  ></SmallButton>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "6px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: 400,
                      mr: 1,
                    }}
                  >
                    {i18n["allTalent.currency"]}:
                  </Typography>
                  <SmallButton
                    minWidth="10px"
                    height={18}
                    color="grayButton"
                    borderRadius="5px"
                    label="ZAR"
                    mr="8px"
                  ></SmallButton>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "6px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: 400,
                      mr: 1,
                    }}
                  >
                    {i18n["allTalent.industry"]}:
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
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "6px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: 400,
                      mr: 1,
                    }}
                  >
                    {i18n["allTalent.salary"]}:
                  </Typography>
                  <SmallButton
                    minWidth="10px"
                    height={18}
                    color="grayButton"
                    borderRadius="5px"
                    label={`>${formatCurrencyWithCommas(
                      talentContent?.candidate_profile?.candidate_info?.salary
                        ?.min
                    )} < ${formatCurrencyWithCommas(
                      talentContent?.candidate_profile?.candidate_info?.salary
                        ?.max
                    )}`}
                    mr="8px"
                  ></SmallButton>
                  {/* <Slider
                                    getAriaLabel={() => 'Temperature range'}
                                    value={value}
                                    onChange={handleChange}
                                    valueLabelDisplay="auto"
                                    getAriaValueText={valuetext}
                                    color="blueButton500"
                                    sx={{
                                        width: '60%',
                                        p: 0
                                    }}
                                /> */}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "6px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: 400,
                      mr: 1,
                    }}
                  >
                    {i18n["allTalent.experience"]}:
                  </Typography>
                  <SmallButton
                    minWidth="10px"
                    height={18}
                    color="grayButton"
                    borderRadius="5px"
                    label={
                      talentContent?.candidate_profile?.candidate_info
                        ?.experience?.year
                    }
                    mr="8px"
                  ></SmallButton>

                  {/* <Slider
                                    getAriaLabel={() => 'Temperature range'}
                                    value={value}
                                    onChange={handleChange}
                                    valueLabelDisplay="auto"
                                    getAriaValueText={valuetext}
                                    color="blueButton500"
                                    sx={{
                                        width: '60%',
                                        p: 0
                                    }}
                                /> */}
                </Box>
              </Box>
            </Box>
            <Box className="contentBoxRight">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {/* <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} > */}
                <Box>
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ marginRight: "-45px" }}>
                      <SingleRadialChart
                        hollow="65%"
                        labelsData={labelExp}
                        series={
                          talentContent?.candidate_profile?.candidate_info
                            ?.experience?.year != undefined &&
                          talentContent?.candidate_profile?.candidate_info
                            ?.experience?.year
                        }
                        width={170}
                        nameSize="14px"
                        valueSize="20px"
                        nameOffsetY="16"
                        valueOffsetY="-20"
                        color={theme.palette.redButton.main}
                        index={1}
                        // isHovered={isHovered}
                      />
                    </Box>
                    <Box sx={{}}>
                      <SingleRadialChart
                        hollow="65%"
                        labelsData={labelHon}
                        series={[
                          talentContent?.candidate_profile?.candidate_info
                            ?.qualification_level,
                        ]}
                        width={170}
                        nameSize="14px"
                        valueSize="20px"
                        nameOffsetY="16"
                        valueOffsetY="-20"
                        color={theme.palette.redButton.main}
                        index={1}
                        // isHovered={isHovered}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", marginTop: "-15px" }}>
                    <Box sx={{ marginRight: "-45px" }}>
                      <SingleRadialChart
                        hollow="65%"
                        labelsData={labelSal}
                        series={
                          talentContent?.candidate_profile?.candidate_info
                            ?.salary?.max != undefined &&
                          toString(
                            talentContent?.candidate_profile?.candidate_info
                              ?.salary?.max
                          )
                        }
                        width={170}
                        nameSize="14px"
                        valueSize="18px"
                        nameOffsetY="16"
                        valueOffsetY="-20"
                        color={theme.palette.redButton.main}
                        index={1}
                        // isHovered={isHovered}
                      />
                    </Box>

                    <Box>
                      <SingleRadialChart
                        hollow="65%"
                        labelsData={labelNoti}
                        series={
                          talentContent?.candidate_profile?.candidate_info
                            ?.notice_period?.description != null && [
                            weekConvert(
                              talentContent?.candidate_profile?.candidate_info
                                ?.notice_period?.description
                            ),
                          ]
                        }
                        width={170}
                        nameSize="14px"
                        valueSize="18px"
                        nameOffsetY="16"
                        valueOffsetY="-20"
                        color={theme.palette.redButton.main}
                        index={1}
                        // isHovered={isHovered}
                      />
                    </Box>
                  </Box>
                </Box>

                {!hasTalentPool && (
                  <Box
                    sx={{
                      mt: 2,
                    }}
                  >
                    <div
                      style={{ display: "inline-block", position: "relative" }}
                    >
                      <Button
                        id="broad"
                        aria-controls={anchorEl ? "broad-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={anchorEl ? "true" : undefined}
                        variant="contained"
                        disableElevation
                        onClick={handleClick}
                        endIcon={<KeyboardArrowDownIcon />}
                        color="base"
                        sx={{
                          mr: 1,
                          padding: "16px 24px !important",
                          color: theme.palette.redButton.main,
                          border: `solid ${theme.palette.redButton.main} 2px`,
                        }}
                      >
                        {i18n["allTalent.addToPool"]}
                      </Button>
                      <Menu
                        id="broad-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        PaperProps={{
                          style: {
                            width: "160px",
                          },
                        }}
                      >
                        <Box
                          id="talentList"
                          sx={{ overflow: "hidden", height: "100px" }}
                        >
                          <InfiniteScroll
                            style={{
                              height: "100%",
                              overflowX: "hidden",
                              scrollbarWidth: "thin",
                            }}
                            dataLength={tableData?.length}
                            // next={() => getJobList(lastKey)}
                            hasMore={true}
                            scrollableTarget="talentList"
                            endMessage={
                              <p style={{ textAlign: "center" }}>
                                <b>Yay! You have seen it all</b>
                              </p>
                            }
                          >
                            {tableData.map((option, index) => (
                              <MenuItem
                                key={index}
                                onClick={() =>
                                  addToPool(
                                    talentContent?.user_id,
                                    option?.pool_id
                                  )
                                }
                              >
                                <ListItemText primary={option.title} />
                              </MenuItem>
                            ))}
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
                      </Menu>
                    </div>
                    <div
                      style={{ display: "inline-block", position: "relative" }}
                    >
                      <Button
                        id="broad"
                        aria-controls={jobClick ? "broad-menu-job" : undefined}
                        aria-haspopup="true"
                        aria-expanded={jobClick ? "true" : undefined}
                        variant="contained"
                        disableElevation
                        onClick={handleAddJobClick}
                        endIcon={<KeyboardArrowDownIcon />}
                        color="redButton"
                        sx={{ mr: 1, padding: "16px 24px !important" }}
                      >
                        {i18n["allTalent.addToJob"]}
                      </Button>
                      <Menu
                        id="broad-menu-job"
                        anchorEl={jobClick}
                        open={Boolean(jobClick)}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        PaperProps={{
                          style: {
                            width: "150px",
                          },
                        }}
                      >
                        <Box
                          id="talentList"
                          sx={{ overflow: "hidden", height: "100px" }}
                        >
                          <InfiniteScroll
                            style={{
                              height: "100%",
                              overflowX: "hidden",
                              scrollbarWidth: "thin",
                            }}
                            dataLength={talentJobs?.length}
                            // next={() => getJobList(lastKey)}
                            hasMore={true}
                            scrollableTarget="talentList"
                            endMessage={
                              <p style={{ textAlign: "center" }}>
                                <b>Yay! You have seen it all</b>
                              </p>
                            }
                          >
                            {talentJobs.map((option, index) => (
                              <MenuItem
                                key={index}
                                onClick={(event) =>
                                  addToJob(event, talentContent?.user_id)
                                }
                              >
                                <Tooltip
                                  title={option?.title}
                                  placement="top-end"
                                >
                                  <ListItemText
                                    sx={{
                                      width: "120px",
                                      whiteSpace: "nowrap", // Prevents text from wrapping
                                      overflow: "hidden", // Hides any overflowing content
                                      textOverflow: "ellipsis",
                                    }}
                                    primary={option?.title}
                                  />
                                </Tooltip>
                              </MenuItem>
                            ))}
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
                      </Menu>
                    </div>
                  </Box>
                )}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    padding: "0 24px",
                    mt: 2,
                  }}
                >
                  <Box
                    component="img"
                    className="profileAvatar"
                    alt="crayon logo"
                    src={history}
                    sx={{
                      mr: 1,
                      width: 43,
                      height: 43,
                    }}
                  />
                  <Box
                    component="img"
                    className="profileAvatar"
                    alt="crayon logo"
                    src={chat}
                    sx={{
                      mr: 1,
                      width: 43,
                      height: 43,
                    }}
                  />
                  <Box
                    component="img"
                    className="profileAvatar"
                    alt="crayon logo"
                    src={match}
                    sx={{
                      mr: 1,
                      width: 43,
                      height: 43,
                    }}
                  />
                </Box>
              </Box>
              <Box sx={{ mt: 4 }}>
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
                  {/* <StyledTextField placeholder="type your comment here..." id="comment" size="small" /> */}
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
                        {/* <IconButton
                                                aria-label="toggle password visibility"
                                                edge="end"
                                                color='redButton'
                                            >
                                                <PlaceIcon />
                                            </IconButton> */}
                      </InputAdornment>
                    }
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </AccordionDetails>
      </StyledAccordion>
    </Box>
  );
}

// import { useEffect, useRef, useState } from "react";
// import { useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import { styled, alpha } from "@mui/material/styles";
// import locale from "../../../i18n/locale";
// import Accordion from "@mui/material/Accordion";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import IconButton from "@mui/material/IconButton";
// import SmallButton from "../../common/SmallButton";
// import profile from "../../../assets/profile.png";
// import history from "../../../assets/history.svg";
// import match from "../../../assets/match.svg";
// import eye from "../../../assets/eye.svg";
// import send from "../../../assets/send.svg";
// import linkedin from "../../../assets/linkedin.svg";
// import chatComment from "../../../assets/Padding Excluded/Black_Chat_Green.svg";

// import ClickAwayListener from "@mui/material/ClickAwayListener";
// import Grow from "@mui/material/Grow";
// import Popper from "@mui/material/Popper";
// import MenuList from "@mui/material/MenuList";
// import Stack from "@mui/material/Stack";

// import link from "../../../assets/Padding Excluded/Black_Documents.svg";
// import chatHistory from "../../../assets/Padding Excluded/Black_Chat History_1.svg";
// import chat from "../../../assets/Padding Excluded/Black_Chat.svg";
// import CV from "../../../assets/Padding Excluded/Black_CV.svg";
// import talent from "../../../assets/Padding Excluded/Black_Talent.svg";

// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import { formatCurrencyWithCommas } from "../../../utils/Currency";
// import {
//   Checkbox,
//   FormControl,
//   Grid,
//   InputLabel,
//   ListItemText,
//   Menu,
//   MenuItem,
//   Paper,
//   Popover,
//   Tooltip,
// } from "@mui/material";
// import RadialChart from "../../common/RadialChart";
// import {
//   ALERT_TYPE,
//   CARD_RIGHT_BUTTON_GROUP,
//   ERROR_MSG,
// } from "../../../utils/Constants";
// import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
// import ManIcon from "@mui/icons-material/Man";
// import Switch from "@mui/material/Switch";
// import Slider from "@mui/material/Slider";
// import PlaceIcon from "@mui/icons-material/Place";
// import EmailIcon from "@mui/icons-material/Email";
// import CallIcon from "@mui/icons-material/Call";
// import SingleRadialChart from "../../common/SingleRadialChart";
// import TextField from "@mui/material/TextField";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import InputAdornment from "@mui/material/InputAdornment";
// import {
//   convertDOB,
//   convertDatetimeAgo,
//   convertDatetimeWithoutAgo,
//   dateConverter,
//   dateConverterMonth,
//   monthYear,
//   weekConvert,
// } from "../../../utils/DateTime";
// import SelectMenu from "../../common/SelectMenu";
// import { useSelector } from "react-redux";

// import { useDispatch } from "react-redux";
// import AutoComplete from "../../common/AutoComplete";
// import StyledButton from "../../common/StyledButton";
// import {
//   addTalentPool,
//   addTalentToJob,
//   getAdminTalentJobList,
//   getAllJobs,
//   getTalentPool,
//   talentPersonality,
// } from "../../../redux/admin/jobsSlice";
// import LeftDrawer from "../LeftDrawer";

// import { setAlert, setLoading } from "../../../redux/configSlice";
// import { Link, useLocation, useParams } from "react-router-dom";
// import InfiniteScroll from "react-infinite-scroll-component";
// import UP from "../../../assets/Padding Excluded/Black_Up_Close.svg";
// import DOWN from "../../../assets/Padding Excluded/Black_Down_Open.svg";
// import edit from "../../../assets/Padding Excluded/Black_Edit.svg";
// import references from "../../../assets/Padding Excluded/Black_Referals_Blue.svg";
// import contactReference from "../../../assets/Padding Excluded/Black_Contact_Blue.svg";
// import emailReference from "../../../assets/Padding Excluded/Black_Email_Blue.svg";
// import contact from "../../../assets/Padding Excluded/Black_Contact_Yellow.svg";
// import email from "../../../assets/Padding Excluded/Black_Email_Red.svg";
// import referrals from "../../../assets/Padding Excluded/Black_Referals_Yellow.svg";
// import userProfile from "../../../assets/Padding Excluded/Black_User_Profile - Copy.svg";
// import locationIcon from "../../../assets/Padding Excluded/Black_Location.svg";
// import pending from "../../../assets/Padding Excluded/Black_Pending.svg";
// import salary from "../../../assets/Padding Excluded/Black_Salary.svg";
// import notice from "../../../assets/Padding Excluded/Black_Notice_Period.svg";
// import experience from "../../../assets/Padding Excluded/Black_Experience_Title_Job.svg";
// import humanMale from "../../../assets/Padding Excluded/Black_Male.svg";
// import upClose from "../../../assets/Padding Included/Black_Up_Close.svg";
// import downClose from "../../../assets/Padding Included/Black_Down_Open.svg";
// import deleteIcon from "../../../assets/Padding Excluded/Black_Trash_Delete_1 - Copy.svg";
// import activeUpClose from "../../../assets/Black_Up_Close - Copy.svg";
// import activeDownClose from "../../../assets/Black_Down_Open - Copy.svg";
// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import { getCandidateCV } from "../../../redux/employer/myJobsSlice";

// import profile_challenger from "../../../assets/Profile Icons_Challenger.svg";
// import profile_character from "../../../assets/Profile Icons_Charater.svg";
// import profile_collaborator from "../../../assets/Profile Icons_Collaborator.svg";
// import profile_contemplator from "../../../assets/Profile Icons_Contemplator.svg";

// import {
//   getPersonalities,
//   getTraits,
// } from "../../../redux/employer/postJobSlice";
// import { Circle } from "@mui/icons-material";
// import SVGButton from "../../common/SVGButton";
// import TalentSVGButton from "../../common/TalentSVGButton";
// import PoolJob from "./DialogBox/PoolJob";
// import { truncate } from "lodash";
// import JobAlert from "./DialogBox/JobAlert";
// import CommentBox from "./DialogBox/CommentBox";
// import EditPersonality from "./DialogBox/EditPersonality";
// import Databases from "./DialogBox/Databases";
// import Refferals from "./DialogBox/Refferals";
// import VideoDialog from "./DialogBox/VideoDialog";
// import Document from "./DialogBox/Document";
// import CopyToClipboard from "react-copy-to-clipboard";
// const label = "grit score";
// const labelExp = "experience";
// const labelHon = "honours";
// const labelSal = "salary";
// const labelNoti = "notice";

// const StyledHR = styled(Box)(({ theme }) => ({
//   borderRight: "1px solid rgba(0, 0, 0, 0.3)",
//   width: "0px",
//   height: "10px",
//   marginRight: "8px",
// }));
// const StyledAccordion = styled(Accordion)(({ theme }) => ({
//   marginTop: "4px",
//   borderRadius: "10px",
//   position: "unset",
//   "& .MuiAccordionSummary-root": {
//     // alignItems: 'start'
//     flexDirection: "row-reverse",
//     // marginBottom: '4px'
//   },
//   "& .MuiAccordionSummary-content.Mui-expanded": {
//     margin: "0 0 8px 0",
//   },
//   "& .MuiAccordionSummary-content": {
//     flexDirection: "column",
//     margin: 0,
//     ".summaryBox": {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       // marginRight: '8px',
//       "& .MuiButtonBase-root": {
//         letterSpacing: "-0.02em",
//         // fontSize: 10,
//         // fontWeight: 700,
//         // minWidth: 28,
//         // padding: '2px 8px',
//         // borderRadius: 3,
//         // height: '20px',
//         // boxShadow: 'none'
//       },
//     },
//     ".summaryBoxContent": {
//       display: "flex",
//       alignItems: "center",
//     },
//     ".profileAvatar": {
//       height: 20,
//       width: 20,
//       borderRadius: 6,
//     },

//     "& .MuiTypography-root": {
//       // fontWeight: 700,
//       // fontSize: '20px',
//     },
//     "& .MuiButtonBase-root": {
//       // padding: '2px 8px',
//       // fontSize: 10,
//       // fontWeight: 700,
//       // minWidth: 30,
//       // boxShadow: 'none',
//       // borderRadius: 2
//     },
//   },
//   "& .MuiAccordionSummary-expandIconWrapper": {
//     color: theme.palette.white,
//     background: theme.palette.redButton.main,
//     width: 23.42,
//     height: 23.71,
//     borderRadius: 25,
//     marginLeft: "-5px",
//     marginRight: "20px",
//     justifyContent: "center",
//     alignItems: "center",

//     // marginRight: '32px',
//     // position: 'absolute',
//     // right: '40px',
//     // top: '12px',
//     "& .MuiSvgIcon-root": {
//       fontSize: "1.4rem",
//     },
//   },
//   "& .MuiCollapse-root": {
//     "& .MuiAccordionDetails-root": {
//       display: "flex",
//       paddingTop: 0,
//       // padding: 0,
//       "& .MuiButtonBase-root": {
//         // padding: '0 8px',
//         // fontSize: 10,
//         // fontWeight: 700,
//         // minWidth: 30,
//         // padding: '1px 4px',
//         // borderRadius: 3
//       },
//       ".contentBoxLeft": {
//         width: "60%",
//         // display: 'flex',
//         // justifyContent: 'space-between',
//         "& .MuiButtonBase-root": {
//           padding: "0 8px",
//           // fontSize: 10,
//           // fontWeight: 700,
//           // minWidth: 10,
//           // padding: '1px 4px',
//           // borderRadius: 3
//         },
//         // '& .MuiSvgIcon-root': {
//         //     width: '20px'
//         // }
//       },
//       ".contentBoxRight": {
//         width: "37%",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         "& .MuiButtonBase-root": {
//           padding: "0 8px",
//           // fontSize: 10,
//           // fontWeight: 700,
//           // minWidth: 10,
//           // padding: '1px 4px',
//           // borderRadius: 3
//         },
//         ".title": {
//           fontSize: "12px",
//           fontWeight: 700,
//         },
//         ".subTitle": {
//           fontSize: "12px",
//           fontWeight: 400,
//         },
//       },
//     },
//   },
//   "& .MuiButtonBase-root": {
//     // boxShadow: 'none',
//     // padding: '0 16px'
//   },
// }));

// const BlueSwitch = styled(Switch)(({ theme }) => ({
//   "& .MuiSwitch-switchBase.Mui-checked": {
//     color: theme.palette.blueButton400.main,
//     "&:hover": {
//       backgroundColor: alpha(
//         theme.palette.blueButton400.main,
//         theme.palette.action.hoverOpacity
//       ),
//     },
//   },
//   "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
//     backgroundColor: theme.palette.blueButton400.main,
//   },
//   "& .MuiSwitch-track": {
//     marginTop: "-9px",
//   },
// }));
// const StyledTextField = styled(OutlinedInput)(({ theme }) => ({
//   width: "100%",
//   margin: "8px 0",
//   paddingRight: "8px",
//   // paddingLeft: '16px',
//   // '& .MuiInputLabel-outlined': {
//   // marginLeft: '4px',
//   // color: theme.palette.placeholder
//   // opacity: 0.75
//   // },
//   "& .MuiOutlinedInput-notchedOutline": {
//     // background: theme.palette.white,
//     borderColor: theme.palette.grayBorder,
//     borderRadius: "10px",
//   },
// }));
// function valuetext(value) {
//   return `${value}°C`;
// }
// const labels = ["Salary", "Experience", "Q Level"];

// const PERSONALITY = {
//   primary_personality: "",
//   shadow_personality: "",
//   grit_score: "",
//   traits: [],
// };

// const marks = [
//   {
//     value: 0,
//     label: "00",
//   },
//   {
//     value: 25,
//     label: "25",
//   },
//   {
//     value: 50,
//     label: "50",
//   },
//   {
//     value: 75,
//     label: "75",
//   },
//   {
//     value: 100,
//     label: "100",
//   },
// ];

// const textValue = (value) => {
//   return value;
// };

// export default function TalentDetailPage() {
//   const i18n = locale.en;
//   const theme = useTheme();
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const { id } = useParams();

//   const prevLocation = location.pathname;
//   const hasTalentPool = location.pathname.includes("talent-pool");

//   const [anchorEl, setAnchorEl] = useState(null);
//   const [jobClick, setJobClick] = useState(null);
//   const [anchorElPersonality, setAnchorElPersonality] = useState(null);
//   const [value, setValue] = useState([20, 37]);
//   const [tableData, setTableData] = useState([]);
//   const [talentJobs, setTalentJobs] = useState([]);
//   const [lastKey, setLastKey] = useState(0);
//   const [talentContent, setTalentContent] = useState([]);
//   const [personalityAdded, setPersonalityAdded] = useState();
//   const [anchorElReferral, setAnchorElReferral] = useState(null);
//   const [openActive, setOpenActive] = useState(false);
//   const [editPersonality, seteditPersonality] = useState(false);
//   const [openVideo, setOpenVideo] = useState(null);
//   const [openDocument, setOpenDocument] = useState(null);

//   const [personalitiesData, setPersonalitiesData] = useState({
//     ...PERSONALITY,
//   });
//   const [flip, setFlip] = useState(false);

//   const { personalities, traits } = useSelector((state) => state.postJobs);

//   // console.log(location);
//   console.log(hasTalentPool);

//   const open = Boolean(anchorEl);
//   const anchorRef = useRef(null);
//   const openPersonality = Boolean(anchorElPersonality);
//   const openReferral = Boolean(anchorElReferral);
//   const openDialog = Boolean(openVideo);
//   const openDocumentDialog = Boolean(openDocument);

//   function handleListKeyDown(event) {
//     if (event.key === "Tab") {
//       event.preventDefault();
//       setOpenActive(false);
//     } else if (event.key === "Escape") {
//       setOpenActive(false);
//     }
//   }

//   const handleCandidateCV = async () => {
//     try {
//       const { payload } = await dispatch(getCandidateCV({ user_id: id }));

//       if (payload?.status == "success") {
//         setTalentContent(payload.data);
//       }
//     } catch (error) {
//       dispatch(
//         setAlert({
//           show: true,
//           type: ALERT_TYPE.ERROR,
//           msg: ERROR_MSG,
//         })
//       );
//     }
//   };

//   useEffect(() => {
//     handleCandidateCV();
//   }, []);

//   const handleClick = async (event) => {
//     setAnchorEl(event.currentTarget);
//     await getTalent();
//   };

//   const handleAddJobClick = async (event) => {
//     setJobClick(event.currentTarget);
//   };

//   const getTalent = async (lastkeyy) => {
//     try {
//       const { payload } = await dispatch(getTalentPool({ lastKey: lastkeyy }));
//       if (payload.status === "success") {
//         if (lastkeyy === 0) {
//           setTableData(payload.data);
//           setLastKey(payload.pageNumber + 1);
//         } else {
//           setLastKey(payload.pageNumber + 1);
//           setTableData((prevState) => [...prevState, ...payload.data]);
//         }
//       }
//     } catch (error) {}
//   };

//   const addToPool = async (canID, poolID) => {
//     try {
//       const data = {
//         candidate_id: canID,
//         pool_id: poolID,
//       };
//       const { payload } = await dispatch(addTalentPool(data));
//       if (payload.status === "success") {
//         dispatch(
//           setAlert({
//             show: true,
//             type: ALERT_TYPE.SUCCESS,
//             msg: "Talent added to pool successfully",
//           })
//         );
//         setAnchorEl(null);
//       } else {
//         dispatch(
//           setAlert({
//             show: true,
//             type: ALERT_TYPE.ERROR,
//             msg: payload?.message?.message,
//           })
//         );
//       }
//     } catch (error) {}
//   };
//   const addToJob = async (event, canId) => {
//     try {
//       const job = talentJobs.find(
//         (item) => item.title === event.target.textContent
//       );
//       const data = {
//         candidate_id: canId,
//         job_id: job.job_id,
//       };
//       const { payload } = await dispatch(addTalentToJob(data));
//       if (payload.status === "success") {
//         dispatch(
//           setAlert({
//             show: true,
//             type: ALERT_TYPE.SUCCESS,
//             msg: "Talent added to job successfully",
//           })
//         );
//         setJobClick(null);
//       } else {
//         dispatch(
//           setAlert({
//             show: true,
//             type: ALERT_TYPE.ERROR,
//             msg: payload?.message?.message,
//           })
//         );
//       }
//     } catch (error) {}
//   };

//   const getAllData = async () => {
//     try {
//       // dispatch(setLoading(true));
//       await Promise.all([dispatch(getPersonalities()), dispatch(getTraits())]);
//       // dispatch(setLoading(false));
//     } catch (error) {
//       // dispatch(setLoading(false));
//       dispatch(
//         setAlert({
//           show: true,
//           type: ALERT_TYPE.ERROR,
//           msg: ERROR_MSG,
//         })
//       );
//     }
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//     setJobClick(null);
//   };

//   const handlePopoverClose = () => {
//     setAnchorElPersonality(null);
//   };

//   const handlePersonality = async (event, newTab) => {
//     !openPersonality && setAnchorElPersonality(event.target);
//     await getAllData();
//   };

//   const handlePopoverCloseReferral = () => {
//     setAnchorElReferral(null);
//   };

//   const handleChange = (event) => {
//     const {
//       target: { value },
//       target: { name },
//     } = event;
//     if (
//       personalitiesData.primary_personality == value ||
//       personalitiesData.shadow_personality == value
//     ) {
//       dispatch(
//         setAlert({
//           show: true,
//           type: ALERT_TYPE.ERROR,
//           msg: "Primary and Shadow Personality should not be similar",
//         })
//       );
//       return;
//     }

//     const newPersonalitiesData = {
//       ...personalitiesData,
//       [name]: value,
//     };
//     console.log("NEW PERSONALITY", newPersonalitiesData);
//     setPersonalitiesData(newPersonalitiesData);
//   };

//   const handleMultipleAutoComplete = (event, newValue, id) => {
//     if (newValue.length <= 5) {
//       let newPersonalitiesData = {
//         ...personalitiesData,
//         [id]: newValue.map((val) => val?.inputValue || val?.trait_id || val),
//       };
//       console.log(newPersonalitiesData);
//       setPersonalitiesData(newPersonalitiesData);
//     } else {
//       newValue.splice(5, 1);
//       dispatch(
//         setAlert({
//           show: true,
//           type: ALERT_TYPE.ERROR,
//           msg: "You can't add more than 5 traits!!",
//         })
//       );
//     }
//   };

//   const getTraitsValue = () => {
//     if (personalitiesData.traits?.length == 0) {
//       return [];
//     }

//     return personalitiesData.traits?.map(
//       (id) => traits?.find((trait) => trait.id == id) || id
//     );
//   };

//   const rangeHandler = (event) => {
//     const {
//       target: { value },
//       target: { name },
//       target: { id },
//     } = event;

//     const newPersonalitiesData = {
//       ...personalitiesData,
//       [name]: value,
//     };
//     console.log(newPersonalitiesData);
//     setPersonalitiesData(newPersonalitiesData);
//   };

//   const addPersonality = async () => {
//     const data = {
//       ...personalitiesData,
//       user_id: talentContent.user_id,
//     };
//     console.log(data);
//     const { payload } = await dispatch(talentPersonality(data));
//     if (payload?.status == "success") {
//       dispatch(
//         setAlert({
//           show: true,
//           type: ALERT_TYPE.SUCCESS,
//           msg: "Personality Added Successfully",
//         })
//       );
//       setPersonalityAdded(true);
//       setAnchorElPersonality(null);
//     } else {
//       dispatch(
//         setAlert({
//           show: true,
//           type: ALERT_TYPE.ERROR,
//           msg: "Something went wrong! please relaod the window",
//         })
//       );
//     }
//   };

//   const handleToggle = () => {
//     setOpenActive((prevOpen) => !prevOpen);
//   };

//   const removeWord = (value) => {
//     return value?.replace("calendar", "");
//   };

//   const handlePopoverCloseVideo = () => {
//     setOpenVideo(null);
//   };

//   const handlePopoverCloseDocument = () => {
//     setOpenDocument(null);
//   };

//   const handleEdit = () => {
//     seteditPersonality((prev) => !prev);
//   };

//   const handleCloseActive = (event) => {
//     if (anchorRef.current && anchorRef.current.contains(event.target)) {
//       return;
//     }

//     setOpenActive(false);
//   };

//   return (
//     <Box sx={{ display: "flex" }}>
//       <Box sx={{ width: "16%" }}>
//         <LeftDrawer />
//       </Box>
//       <StyledAccordion
//         expanded={true}
//         sx={{ margin: "2rem !important", width: "100%" }}
//       >
//         <AccordionSummary
//           // expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel1a-content"
//           id="panel1a-header"
//         >
//           <Grid
//             container
//             spacing={2}
//             justifyContent={"space-between"}
//             flexWrap={"nowrap"}
//           >
//             <Grid item paddingLeft={16}>
//               <SmallButton
//                 color="redButton"
//                 startIcon={
//                   <Box
//                     component="img"
//                     className="eye"
//                     alt="eye logo"
//                     src={flip ? upClose : downClose}
//                     sx={{
//                       height: 16,
//                       width: 16,
//                     }}
//                   />
//                 }
//                 padding={0}
//                 // startIconMargin="4px"
//                 height={"97px"}
//                 width={25}
//                 fontWeight={700}
//                 borderRadius={flip ? "20px 0px 20px 0px" : "20px 0px 0px 20px"}
//                 onClick={() => setFlip((prev) => !prev)}
//               />
//             </Grid>

//             <Grid
//               item
//               // xs={1}
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 margin: "12px 0",
//                 paddingLeft: "0px !important",
//               }}
//             >
//               {talentContent?.profile_url != "No URL" ? (
//                 <Box
//                   component="img"
//                   className="profileAvatar"
//                   alt="crayon logo"
//                   src={talentContent?.profile_url}
//                   sx={{
//                     mr: 1,
//                     height: "55px !important",
//                     width: "55px !important",
//                   }}
//                 />
//               ) : (
//                 <Box
//                   component="img"
//                   className="profileAvatar"
//                   alt="crayon logo"
//                   src={profile}
//                   sx={{
//                     mr: 1,
//                     height: "55px !important",
//                     width: "55px !important",
//                   }}
//                 />
//               )}
//               <SmallButton
//                 color="userID"
//                 // borderRadius="5px"
//                 label={talentContent?.user_id}
//                 mr={1}
//                 fontSize={10}
//                 fontWeight={700}
//                 alignItems="end"
//                 textColor="#000"
//                 borderRadius="0px 0px 6px 6px"
//                 marginTop="-2px"
//                 width="fit-content"
//               ></SmallButton>
//             </Grid>

//             <Grid
//               item
//               //  xs={5.5}
//               paddingLeft="0px !important"
//             >
//               <Box display={"flex"} alignItems={"center"}>
//                 <TalentSVGButton
//                   color={"white"}
//                   source={humanMale}
//                   height={24}
//                   width={18}
//                   padding={"0px !important"}
//                 />
//                 <Link
//                   to={`${prevLocation}/candidate-cv/${talentContent?.user_id}`}
//                   target="_blank"
//                   style={{
//                     textDecoration: "none",
//                     color: theme.palette.black,
//                   }}
//                 >
//                   <Typography
//                     sx={{
//                       fontSize: "16px",
//                       fontWeight: 700,
//                       mr: 1,
//                       ml: "4px",
//                     }}
//                   >
//                     {talentContent?.first_name}
//                   </Typography>
//                 </Link>
//               </Box>
//               <Box display={"flex"} alignItems={"center"}>
//                 <TalentSVGButton
//                   padding={"0px  !important"}
//                   color={"white"}
//                   source={experience}
//                   height={18}
//                   width={18}
//                 />
//                 {talentContent?.candidate_profile?.candidate_info?.job_title !==
//                 null ? (
//                   <Typography
//                     sx={{
//                       fontSize: "14px",
//                       fontWeight: 700,
//                       mr: 1,
//                       ml: "4px",
//                     }}
//                   >
//                     {
//                       talentContent?.candidate_profile?.candidate_info
//                         ?.job_title?.title
//                     }
//                   </Typography>
//                 ) : (
//                   "-"
//                 )}
//               </Box>
//               <Box display={"flex"} alignItems={"center"}>
//                 <Box
//                   sx={{ display: "flex", width: "80px", alignItems: "center" }}
//                 >
//                   <TalentSVGButton
//                     padding={"0px !important"}
//                     color={"white"}
//                     source={userProfile}
//                     height={28}
//                     width={24}
//                   />
//                   {talentContent?.candidate_profile?.dob != null ? (
//                     <Typography
//                       sx={{
//                         fontSize: "12px",
//                         fontWeight: 600,
//                         // mb: "2px",
//                       }}
//                     >
//                       {`${convertDOB(
//                         talentContent?.candidate_profile?.dob
//                       )} years`}
//                     </Typography>
//                   ) : (
//                     "-"
//                   )}
//                 </Box>
//                 <Box
//                   sx={{ display: "flex", width: "180px", alignItems: "center" }}
//                 >
//                   <TalentSVGButton
//                     padding={"0px !important"}
//                     color={"white"}
//                     source={locationIcon}
//                     height={28}
//                     width={23}
//                   />
//                   {talentContent?.candidate_profile?.town !== null ? (
//                     <Tooltip
//                       title={`${talentContent?.candidate_profile?.town?.name},{" "}
//                 ${talentContent?.candidate_profile?.town?.region?.name}`}
//                       placement="top-end"
//                     >
//                       <Typography
//                         sx={{
//                           fontSize: "12px",
//                           fontWeight: 600,
//                           // mb: "2px",
//                           width: "180px",
//                           whiteSpace: "nowrap", // Prevents text from wrapping
//                           overflow: "hidden", // Hides any overflowing content
//                           textOverflow: "ellipsis", // Adds dots at the end of overflowing text
//                         }}
//                       >
//                         {talentContent?.candidate_profile?.town?.name},{" "}
//                         {talentContent?.candidate_profile?.town?.region?.name}
//                       </Typography>
//                     </Tooltip>
//                   ) : (
//                     "-"
//                   )}
//                 </Box>
//                 <Box
//                   sx={{ display: "flex", width: "100px", alignItems: "center" }}
//                 >
//                   <TalentSVGButton
//                     color={"white"}
//                     source={salary}
//                     height={20}
//                     width={18}
//                   />
//                   <Typography
//                     sx={{
//                       fontSize: "12px",
//                       fontWeight: 600,
//                       // mb: "2px",
//                     }}
//                   >
//                     {
//                       talentContent?.candidate_profile?.candidate_info?.salary
//                         ?.currency?.symbol
//                     }
//                     {formatCurrencyWithCommas(
//                       talentContent?.candidate_profile?.candidate_info?.salary
//                         ?.max
//                     )}
//                     pm
//                   </Typography>
//                 </Box>
//                 <Box
//                   sx={{ display: "flex", width: "75px", alignItems: "center" }}
//                 >
//                   <TalentSVGButton
//                     color={"white"}
//                     source={pending}
//                     height={20}
//                     width={18}
//                   />
//                   {talentContent?.candidate_profile?.candidate_info
//                     ?.experience !== null ? (
//                     <Typography
//                       sx={{
//                         fontSize: "12px",
//                         fontWeight: 600,
//                         // mb: "2px",
//                       }}
//                     >
//                       {
//                         talentContent?.candidate_profile?.candidate_info
//                           ?.experience?.year
//                       }{" "}
//                       years
//                     </Typography>
//                   ) : (
//                     "-"
//                   )}
//                 </Box>
//                 <Box
//                   sx={{ display: "flex", width: "100px", alignItems: "center" }}
//                 >
//                   <TalentSVGButton
//                     color={"white"}
//                     source={notice}
//                     height={20}
//                     width={18}
//                   />
//                   {talentContent?.candidate_profile?.candidate_info
//                     ?.notice_period !== null ? (
//                     <Typography
//                       sx={{
//                         fontSize: "12px",
//                         fontWeight: 600,
//                         // mb: "2px",
//                       }}
//                     >
//                       {removeWord(
//                         talentContent?.candidate_profile?.candidate_info
//                           ?.notice_period?.description
//                       )}
//                     </Typography>
//                   ) : (
//                     "-"
//                   )}
//                 </Box>
//               </Box>

//               {flip && (
//                 <>
//                   <Box display={"flex"} alignItems={"center"}>
//                     <TalentSVGButton
//                       color={"white"}
//                       source={email}
//                       height={28}
//                       width={18}
//                       padding={"0 8px 0 0 !important"}
//                     />
//                     {talentContent?.email !== null ? (
//                       <Typography
//                         sx={{
//                           fontSize: "12px",
//                           fontWeight: 500,
//                           // mb: "2px",
//                         }}
//                       >
//                         {talentContent?.email}
//                       </Typography>
//                     ) : (
//                       "-"
//                     )}

//                     <TalentSVGButton
//                       color={"white"}
//                       source={contact}
//                       height={16}
//                       width={18}
//                     />
//                     {talentContent?.candidate_profile?.contact_no !== null ? (
//                       <Typography
//                         sx={{
//                           fontSize: "12px",
//                           fontWeight: 500,
//                           // mb: "2px",
//                         }}
//                       >
//                         {talentContent?.candidate_profile?.contact_no}
//                       </Typography>
//                     ) : (
//                       "-"
//                     )}

//                     <Box
//                       component="img"
//                       className="profileAvatar"
//                       alt="crayon logo"
//                       src={linkedin}
//                       sx={{
//                         mr: 1,
//                         ml: 1,
//                         width: "20px",
//                         height: "20px",
//                       }}
//                     />
//                     {talentContent?.candidate_profile?.linkedin_profile_link !==
//                     null ? (
//                       <Typography
//                         sx={{
//                           fontSize: "12px",
//                           fontWeight: 500,
//                           // mb: "2px",
//                           width: "200px",
//                           whiteSpace: "nowrap", // Prevents text from wrapping
//                           overflow: "hidden", // Hides any overflowing content
//                           textOverflow: "ellipsis", // Adds dots at the end of overflowing text
//                         }}
//                       >
//                         {
//                           talentContent?.candidate_profile
//                             ?.linkedin_profile_link
//                         }
//                       </Typography>
//                     ) : (
//                       "-"
//                     )}
//                   </Box>

//                   <Box display={"flex"} alignItems={"center"}>
//                     <TalentSVGButton
//                       color={"white"}
//                       source={referrals}
//                       height={28}
//                       width={18}
//                       padding={"0 8px 0 0 !important"}
//                     />

//                     <Typography
//                       sx={{
//                         fontSize: "14px",
//                         fontWeight: 700,
//                         width: "150px",
//                         // mb: "2px",
//                       }}
//                       onClick={(event) => {
//                         setAnchorElReferral(event.target);
//                       }}
//                     >
//                       {`Referrals (231)`}{" "}
//                       <TalentSVGButton
//                         color={"white"}
//                         source={DOWN}
//                         height={7}
//                         width={18}
//                       />
//                     </Typography>

//                     <Typography
//                       sx={{
//                         fontSize: "14px",
//                         fontWeight: 700,
//                         // mb: "2px",
//                       }}
//                     >
//                       Referred by:{" "}
//                       <SmallButton
//                         color="blueButton700"
//                         label={"Daffy Duck"}
//                         mr="8px"
//                         fontSize="12px"
//                       ></SmallButton>
//                     </Typography>
//                     <Popover
//                       id="dropdown"
//                       open={openReferral}
//                       anchorEl={anchorElReferral}
//                       onClose={handlePopoverCloseReferral}
//                       anchorOrigin={{
//                         vertical: "bottom",
//                         horizontal: "center",
//                       }}
//                       transformOrigin={{
//                         vertical: "top",
//                         horizontal: "center",
//                       }}
//                       sx={{
//                         "& .MuiPaper-root-MuiPopover-paper": {
//                           // padding: "16px !important",
//                           minWidth: "18% !important",
//                           borderRadius: "20px !important",
//                           mt: 1,
//                         },
//                       }}
//                     >
//                       <Refferals />
//                     </Popover>
//                   </Box>
//                 </>
//               )}
//             </Grid>

//             <Grid
//               item
//               paddingLeft="0px !important"
//               sx={{
//                 display: "flex",
//                 alignItems: "flex-start",
//                 justifyContent: "space-between",
//                 width: "185px",
//               }}
//             >
//               <Box sx={{ margin: "0 -22px 0 -22px" }}>
//                 <SingleRadialChart
//                   hollow="55%"
//                   nameSize="9px"
//                   valueSize="14px"
//                   nameOffsetY="11"
//                   valueOffsetY="-17"
//                   labelsData={"applications"}
//                   max={1000}
//                   series={[34]}
//                   width={100}
//                   color={theme.palette.lightGreenButton300.main}
//                 />
//               </Box>
//               <Box sx={{ margin: "0 -22px 0 -22px" }}>
//                 <SingleRadialChart
//                   hollow="55%"
//                   nameSize="9px"
//                   valueSize="14px"
//                   nameOffsetY="11"
//                   valueOffsetY="-17"
//                   labelsData={"shortlisted"}
//                   series={[10]}
//                   width={100}
//                   color={theme.palette.lightGreenButton300.main}
//                 />
//               </Box>
//               <Box sx={{ margin: "0 -22px 0 -22px" }}>
//                 <SingleRadialChart
//                   hollow="55%"
//                   nameSize="9px"
//                   valueSize="14px"
//                   nameOffsetY="11"
//                   valueOffsetY="-17"
//                   labelsData={"interviews"}
//                   series={[3]}
//                   width={100}
//                   color={theme.palette.lightGreenButton300.main}
//                 />
//               </Box>
//             </Grid>

//             <Grid item paddingLeft="0px !important">
//               <Box
//                 sx={{
//                   display: "flex",
//                   // alignItems: "flex-start",
//                   justifyContent: "space-evenly",
//                 }}
//               >
//                 <TalentSVGButton
//                   color={"white"}
//                   source={deleteIcon}
//                   height={24}
//                   width={18}
//                   // padding={"0 0 0 16px !important"}
//                 />
//                 <Box sx={{ display: "flex", paddingLeft: "10px" }}>
//                   <Button
//                     variant="contained"
//                     color="lightGreenButton300"
//                     sx={{
//                       fontSize: "12px",
//                       fontWeight: 500,
//                       color: "white",
//                       padding: "8px 10px",
//                       borderRadius: "0 0 0 10px",
//                       height: "30px !important",
//                     }}
//                   >
//                     {"interview"}
//                   </Button>
//                   <Button
//                     variant="contained"
//                     color="dateButton"
//                     sx={{
//                       fontSize: "12px",
//                       fontWeight: 700,
//                       color: "#000",
//                       padding: "8px 10px",
//                       borderRadius: "0px !important",
//                       borderRight: "1px solid #EBECF3",
//                       borderBottom: "1px solid #EBECF3",
//                       height: "30px !important",
//                       width: "110px !important",
//                     }}
//                   >
//                     {dateConverterMonth(talentContent?.created_at)}
//                   </Button>
//                   <Button
//                     variant="contained"
//                     color="dateButton"
//                     sx={{
//                       fontSize: "12px",
//                       fontWeight: 700,
//                       color: "#000",
//                       padding: "8px 10px",
//                       borderRadius: "0px !important",
//                       borderRight: "1px solid #EBECF3",
//                       borderBottom: "1px solid #EBECF3",
//                       height: "30px !important",
//                       width: "max-content",
//                     }}
//                   >
//                     {convertDatetimeWithoutAgo(talentContent?.created_at)}
//                   </Button>
//                   <Button
//                     ref={anchorRef}
//                     id="composition-button"
//                     aria-controls={open ? "composition-menu" : undefined}
//                     aria-expanded={open ? "true" : undefined}
//                     aria-haspopup="true"
//                     onClick={handleToggle}
//                     variant="contained"
//                     color="base"
//                     endIcon={
//                       <Box
//                         component="img"
//                         className="eye"
//                         alt="eye logo"
//                         src={activeDownClose}
//                         sx={{
//                           height: 25,
//                           width: 25,
//                           mr: 1,
//                         }}
//                       />
//                     }
//                     sx={{
//                       fontSize: "12px",
//                       fontWeight: 700,
//                       color: "#000",
//                       padding: "8px 10px",
//                       borderRadius: "0px !important",
//                       borderRight: "1px solid #EBECF3",
//                       borderBottom: "1px solid #EBECF3",
//                       height: "30px !important",
//                     }}
//                   >
//                     {"Active"}
//                     <Circle
//                       fontSize="string"
//                       color={"lightGreenButton300"}
//                       sx={{ marginLeft: "10px" }}
//                     />
//                   </Button>
//                   <Stack direction="row" spacing={2} sx={{ zIndex: "1000" }}>
//                     <Box>
//                       <Popper
//                         open={openActive}
//                         anchorEl={anchorRef.current}
//                         role={undefined}
//                         placement="bottom-start"
//                         transition
//                         // disablePortal
//                       >
//                         {({ TransitionProps, placement }) => (
//                           <Grow
//                             {...TransitionProps}
//                             style={{
//                               transformOrigin:
//                                 placement === "bottom-start"
//                                   ? "left top"
//                                   : "left bottom",
//                             }}
//                           >
//                             <Paper
//                               sx={{
//                                 width: "105px !important",
//                                 borderRadius: "0px !important",
//                               }}
//                             >
//                               <ClickAwayListener
//                                 onClickAway={handleCloseActive}
//                               >
//                                 <MenuList
//                                   autoFocusItem={openActive}
//                                   id="composition-menu"
//                                   aria-labelledby="composition-button"
//                                   onKeyDown={handleListKeyDown}
//                                 >
//                                   <MenuItem
//                                     onClick={handleCloseActive}
//                                     sx={{ fontSize: "12px", fontWeight: 700 }}
//                                   >
//                                     Hide{" "}
//                                     <Circle
//                                       fontSize="string"
//                                       color={"yellowButton100"}
//                                       sx={{ marginLeft: "10px" }}
//                                     />
//                                   </MenuItem>
//                                   <MenuItem
//                                     onClick={handleCloseActive}
//                                     sx={{ fontSize: "12px", fontWeight: 700 }}
//                                   >
//                                     Suspend
//                                     <Circle
//                                       fontSize="string"
//                                       color={"redButton100"}
//                                       sx={{ marginLeft: "10px" }}
//                                     />
//                                   </MenuItem>
//                                   <MenuItem
//                                     onClick={handleCloseActive}
//                                     sx={{ fontSize: "12px", fontWeight: 700 }}
//                                   >
//                                     Blacklist
//                                     <Circle
//                                       fontSize="string"
//                                       color={"#000"}
//                                       sx={{ marginLeft: "10px" }}
//                                     />
//                                   </MenuItem>
//                                 </MenuList>
//                               </ClickAwayListener>
//                             </Paper>
//                           </Grow>
//                         )}
//                       </Popper>
//                     </Box>
//                   </Stack>
//                 </Box>
//               </Box>

//               <Box
//                 sx={{
//                   // marginLeft: "-30px",
//                   // width: "370px",
//                   display: "flex",
//                   alignItems: "flex-end",
//                   justifyContent: "flex-end",
//                   paddingTop: "12px",
//                 }}
//               >
//                 <Box sx={{}}>
//                   {talentContent?.candidate_profile?.candidate_info
//                     ?.employment_type != null ? (
//                     <SmallButton
//                       color="blueButton700"
//                       label={truncate(
//                         talentContent?.candidate_profile?.candidate_info
//                           ?.employment_type,
//                         { length: 12 }
//                       )}
//                       value={
//                         talentContent?.candidate_profile?.candidate_info
//                           ?.employment_type
//                       }
//                       mr="4px"
//                       fontSize="12px"
//                     ></SmallButton>
//                   ) : null}

//                   {talentContent?.candidate_profile?.candidate_info
//                     ?.work_setup != null ? (
//                     <SmallButton
//                       color="blueButton700"
//                       label={
//                         talentContent?.candidate_profile?.candidate_info
//                           ?.work_setup
//                       }
//                       mr="8px"
//                       fontSize="12px"
//                     ></SmallButton>
//                   ) : null}
//                 </Box>

//                 <Box
//                   sx={{
//                     display: "flex",
//                     width: "240px",
//                     justifyContent: "space-between",
//                     marginRight: "8px",
//                   }}
//                 >
//                   <CopyToClipboard
//                     text={`${prevLocation}/candidate-cv/${talentContent?.user_id}`}
//                     onCopy={() => {
//                       dispatch(
//                         setAlert({
//                           show: true,
//                           type: ALERT_TYPE.SUCCESS,
//                           msg: "Copied to clipboard",
//                         })
//                       );
//                     }}
//                   >
//                     <TalentSVGButton
//                       color={"yellowButton100"}
//                       source={link}
//                       height={20}
//                       width={18}
//                     />
//                   </CopyToClipboard>

//                   <TalentSVGButton
//                     color={"quicklinks"}
//                     source={talent}
//                     height={28}
//                     width={18}
//                     onClick={(event) => {
//                       setAnchorElPersonality(event.target);
//                     }}
//                   />
//                   <Popover
//                     id="dropdown-menu"
//                     open={openPersonality}
//                     anchorEl={anchorElPersonality}
//                     onClose={handlePopoverClose}
//                     anchorOrigin={{
//                       vertical: "bottom",
//                       horizontal: "center",
//                     }}
//                     transformOrigin={{
//                       vertical: "top",
//                       horizontal: "center",
//                     }}
//                     sx={{
//                       "& .MuiPaper-root-MuiPopover-paper": {
//                         minWidth: "18% !important",
//                         borderRadius: "20px !important",
//                         mt: 1,
//                       },
//                     }}
//                   >
//                     <Databases />
//                   </Popover>
//                   <SmallButton
//                     color={"eyeview"}
//                     startIcon={<PlayArrowIcon />}
//                     padding={0}
//                     justifyContent={"center"}
//                     borderRadius={50}
//                     height={31}
//                     width={33}
//                     fontWeight={700}
//                     onClick={(event) => setOpenVideo(event.target)}
//                   />
//                   <Popover
//                     id="dropdown-menu"
//                     open={openDialog}
//                     anchorEl={openVideo}
//                     onClose={handlePopoverCloseVideo}
//                     anchorOrigin={{
//                       vertical: "bottom",
//                       horizontal: "center",
//                     }}
//                     transformOrigin={{
//                       vertical: "top",
//                       horizontal: "center",
//                     }}
//                     sx={{
//                       "& .css-ll95b0-MuiPaper-root-MuiPopover-paper": {
//                         // padding: "16px !important",
//                         minWidth: "10% !important",
//                         borderRadius: "20px !important",
//                         mt: 1,
//                       },
//                     }}
//                   >
//                     <VideoDialog handleOpen={handlePopoverCloseVideo} />
//                   </Popover>
//                   <TalentSVGButton
//                     color={"redButton"}
//                     source={CV}
//                     height={18}
//                     width={18}
//                     onClick={(event) => setOpenDocument(event.target)}
//                   />
//                   <Popover
//                     id="dropdown-menu"
//                     open={openDocumentDialog}
//                     anchorEl={openDocument}
//                     onClose={handlePopoverCloseDocument}
//                     anchorOrigin={{
//                       vertical: "bottom",
//                       horizontal: "center",
//                     }}
//                     transformOrigin={{
//                       vertical: "top",
//                       horizontal: "center",
//                     }}
//                     sx={{
//                       "& .css-ll95b0-MuiPaper-root-MuiPopover-paper": {
//                         // padding: "16px !important",
//                         minWidth: "12% !important",
//                         borderRadius: "20px !important",
//                         mt: 1,
//                       },
//                     }}
//                   >
//                     <Document
//                       handleOpen={handlePopoverCloseDocument}
//                       cvLink={talentContent?.cv_url}
//                       userID={talentContent?.user_id}
//                     />
//                   </Popover>

//                   <TalentSVGButton
//                     color={"yellowButton100"}
//                     source={chatHistory}
//                     height={26}
//                     width={18}
//                   />

//                   <TalentSVGButton
//                     color={"redButton"}
//                     source={chat}
//                     height={16}
//                     width={18}
//                     margin={"0 16px 0 0 !important"}
//                   />
//                 </Box>
//               </Box>
//             </Grid>
//           </Grid>
//         </AccordionSummary>

//         <AccordionDetails
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <Grid item>
//             <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//               <Box className="contentBoxLeft">
//                 <Box sx={{ mt: 1, mb: 2 }}>
//                   <Typography
//                     sx={{
//                       fontSize: "14px",
//                       fontWeight: 700,
//                       // mb: "2px",
//                     }}
//                   >
//                     {"Skills"}
//                   </Typography>
//                   {talentContent?.candidate_profile?.tag_users.map((item) => {
//                     return (
//                       <SmallButton
//                         color="orangeButton"
//                         letterSpacing="-0.02em"
//                         borderRadius="5px"
//                         label={item?.tag?.tag}
//                         mr="8px"
//                       ></SmallButton>
//                     );
//                   })}
//                 </Box>
//                 <Box sx={{ mt: 1, mb: 2 }}>
//                   <Typography
//                     sx={{
//                       fontSize: "14px",
//                       fontWeight: 700,
//                       // mb: "2px",
//                     }}
//                   >
//                     {"Summary"}
//                   </Typography>
//                   <Typography
//                     sx={{
//                       fontSize: "12px",
//                       fontWeight: 400,
//                       mr: 1,
//                     }}
//                   >
//                     {talentContent?.candidate_profile?.my_bio}
//                   </Typography>
//                 </Box>
//                 <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
//                   <Typography
//                     sx={{
//                       fontSize: "12px",
//                       fontWeight: 700,
//                       mr: 1,
//                     }}
//                   >
//                     {i18n["allTalent.industries"]}:
//                   </Typography>
//                   {talentContent?.candidate_profile?.industry_users.map(
//                     (item) => {
//                       return (
//                         <SmallButton
//                           minWidth="10px"
//                           height={18}
//                           color="blueButton600"
//                           borderRadius="5px"
//                           label={item?.industry?.name}
//                           mr="4px"
//                         ></SmallButton>
//                       );
//                     }
//                   )}
//                 </Box>
//                 <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
//                   <Typography
//                     sx={{
//                       fontSize: "12px",
//                       fontWeight: 700,
//                       mr: 1,
//                     }}
//                   >
//                     {i18n["allTalent.tools"]}:
//                   </Typography>
//                   <SmallButton
//                     minWidth="10px"
//                     height={18}
//                     color="yellowButton100"
//                     borderRadius="5px"
//                     label="Adobe"
//                     mr="4px"
//                   ></SmallButton>
//                   <SmallButton
//                     minWidth="10px"
//                     height={18}
//                     color="yellowButton100"
//                     borderRadius="5px"
//                     label="Microsoft Word"
//                     mr="4px"
//                   ></SmallButton>
//                 </Box>
//                 <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
//                   <Typography
//                     sx={{
//                       fontSize: "12px",
//                       fontWeight: 700,
//                       mr: 1,
//                     }}
//                   >
//                     {i18n["allTalent.nationality"]}:
//                   </Typography>
//                   {talentContent?.candidate_profile?.candidate_nationalities.map(
//                     (item) => {
//                       return (
//                         <SmallButton
//                           minWidth="10px"
//                           height={18}
//                           color="grayButton200"
//                           textColor={theme.palette.black100.main}
//                           fontWeight="700"
//                           borderRadius="5px"
//                           label={item?.nationality?.nationali}
//                           mr="4px"
//                         ></SmallButton>
//                       );
//                     }
//                   )}
//                 </Box>
//                 <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
//                   <Typography
//                     sx={{
//                       fontSize: "12px",
//                       fontWeight: 700,
//                       mr: 1,
//                     }}
//                   >
//                     {i18n["allTalent.languages"]}:
//                   </Typography>
//                   {talentContent?.candidate_profile?.candidate_languages.map(
//                     (item) => {
//                       return (
//                         <SmallButton
//                           minWidth="10px"
//                           height={18}
//                           color="grayButton200"
//                           textColor={theme.palette.black100.main}
//                           fontWeight="700"
//                           borderRadius="5px"
//                           label={item?.language?.language}
//                           mr="4px"
//                         ></SmallButton>
//                       );
//                     }
//                   )}
//                 </Box>
//                 <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
//                   <Typography
//                     sx={{
//                       fontSize: "12px",
//                       fontWeight: 700,
//                       mr: 1,
//                     }}
//                   >
//                     {i18n["allTalent.institutions"]}:
//                   </Typography>
//                   {talentContent?.candidate_profile?.qualification_users.map(
//                     (item) => {
//                       return (
//                         <SmallButton
//                           minWidth="10px"
//                           height={18}
//                           color="grayButton200"
//                           textColor={theme.palette.black100.main}
//                           fontWeight="700"
//                           borderRadius="5px"
//                           label={item?.institution?.name}
//                           mr="4px"
//                         ></SmallButton>
//                       );
//                     }
//                   )}
//                 </Box>
//                 <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
//                   <Typography
//                     sx={{
//                       fontSize: "12px",
//                       fontWeight: 700,
//                       mr: 1,
//                     }}
//                   >
//                     {i18n["allTalent.qualifications"]}:
//                   </Typography>
//                   {talentContent?.candidate_profile?.qualification_users.map(
//                     (item) => {
//                       return (
//                         <SmallButton
//                           justifyContent={"flex-start"}
//                           height={18}
//                           color="grayButton200"
//                           textColor={theme.palette.black100.main}
//                           fontWeight="700"
//                           borderRadius="5px"
//                           label={item?.qualification?.name}
//                           mr="4px"
//                         ></SmallButton>
//                       );
//                     }
//                   )}
//                 </Box>
//                 <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
//                   <Typography
//                     sx={{
//                       fontSize: "12px",
//                       fontWeight: 700,
//                       mr: 1,
//                     }}
//                   >
//                     {i18n["allTalent.associations"]}:
//                   </Typography>
//                   {talentContent?.candidate_profile?.qualification_users.map(
//                     (item, index) => {
//                       return (
//                         index === 0 && (
//                           <SmallButton
//                             minWidth="10px"
//                             height={18}
//                             color="grayButton200"
//                             textColor={theme.palette.black100.main}
//                             fontWeight="700"
//                             borderRadius="5px"
//                             label={item?.association?.name}
//                             mr="4px"
//                           ></SmallButton>
//                         )
//                       );
//                     }
//                   )}
//                 </Box>
//                 <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
//                   <Typography
//                     sx={{
//                       fontSize: "12px",
//                       fontWeight: 700,
//                       mr: 1,
//                     }}
//                   >
//                     {i18n["allTalent.school"]}:
//                   </Typography>
//                   {talentContent?.candidate_profile?.qualification_users.map(
//                     (item, index) => {
//                       return (
//                         index === 0 && (
//                           <SmallButton
//                             minWidth="10px"
//                             height={18}
//                             color="grayButton200"
//                             textColor={theme.palette.black100.main}
//                             fontWeight="700"
//                             borderRadius="5px"
//                             label={item?.school?.name}
//                             mr="4px"
//                           ></SmallButton>
//                         )
//                       );
//                     }
//                   )}
//                 </Box>

//                 <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
//                   <Typography
//                     sx={{
//                       fontSize: "12px",
//                       fontWeight: 700,
//                       mr: 1,
//                     }}
//                   >
//                     {i18n["allTalent.personality"]}
//                   </Typography>
//                   <SmallButton
//                     minWidth="10px"
//                     height={18}
//                     endIcon={
//                       <Box
//                         component="img"
//                         className="eye"
//                         alt="eye logo"
//                         src={edit}
//                         sx={{
//                           height: 10,
//                           width: 12,
//                         }}
//                       />
//                     }
//                     color="yellowButton100"
//                     borderRadius="5px"
//                     label="Edit"
//                     mr="4px"
//                     padding="10px !important"
//                     onClick={handleEdit}
//                   ></SmallButton>
//                 </Box>

//                 <Grid
//                   container
//                   spacing={0}
//                   padding="0 16px 8px 70px"
//                   justifyContent="space-between"
//                   alignItems="center"
//                 >
//                   <Box
//                     sx={{
//                       display: "flex",
//                       justifyContent: "space-around",
//                       alignItems: "center",
//                       width: "270px",
//                     }}
//                   >
//                     {talentContent?.candidate_profile?.candidate_info?.primary
//                       ?.name && (
//                       <Box
//                         component="img"
//                         height={80}
//                         alt="Primary personality"
//                         src={
//                           (talentContent?.candidate_profile?.candidate_info
//                             ?.primary?.name === "collaborator" &&
//                             profile_collaborator) ||
//                           (talentContent?.candidate_profile?.candidate_info
//                             ?.primary?.name === "challenger" &&
//                             profile_challenger) ||
//                           (talentContent?.candidate_profile?.candidate_info
//                             ?.primary?.name === "character" &&
//                             profile_character) ||
//                           (talentContent?.candidate_profile?.candidate_info
//                             ?.primary?.name === "contemplator" &&
//                             profile_contemplator)
//                         }
//                       />
//                     )}

//                     {talentContent?.candidate_profile?.candidate_info?.shadow
//                       ?.name && (
//                       <Box
//                         component="img"
//                         height={80}
//                         alt="Shadow personality"
//                         src={
//                           (talentContent?.candidate_profile?.candidate_info
//                             ?.shadow?.name === "collaborator" &&
//                             profile_collaborator) ||
//                           (talentContent?.candidate_profile?.candidate_info
//                             ?.shadow?.name === "challenger" &&
//                             profile_challenger) ||
//                           (talentContent?.candidate_profile?.candidate_info
//                             ?.shadow?.name === "character" &&
//                             profile_character) ||
//                           (talentContent?.candidate_profile?.candidate_info
//                             ?.shadow?.name === "contemplator" &&
//                             profile_contemplator)
//                         }
//                       />
//                     )}

//                     <Box sx={{ margin: "0 -22px 0 -22px" }}>
//                       <SingleRadialChart
//                         hollow="55%"
//                         max={1000}
//                         labelsData={"grit score"}
//                         series={[
//                           talentContent?.candidate_profile?.candidate_info
//                             ?.grit_score,
//                         ]}
//                         width={130}
//                         nameSize="9px"
//                         valueSize="14px"
//                         nameOffsetY="11"
//                         valueOffsetY="-17"
//                         color={theme.palette.lightGreenButton300.main}
//                       />
//                     </Box>
//                   </Box>
//                   <Box>
//                     {talentContent?.candidate_profile?.candidate_traits
//                       ?.length > 0 &&
//                       talentContent?.candidate_profile?.candidate_traits.map(
//                         (item) => {
//                           return (
//                             <SmallButton
//                               fontWeight={500}
//                               minWidth="10px"
//                               textColor={theme.palette.black100.main}
//                               height={25}
//                               color="grayButton200"
//                               borderRadius="5px"
//                               label={item?.trait?.name}
//                               mr="4px"
//                             ></SmallButton>
//                           );
//                         }
//                       )}
//                   </Box>
//                 </Grid>

//                 <Box sx={{ mt: 1 }}>
//                   <Box sx={{ display: "flex", alignItems: "center" }}>
//                     <TalentSVGButton
//                       color={"white"}
//                       source={experience}
//                       height={20}
//                       width={18}
//                       padding="0 8px 0 0 !important"
//                     />
//                     <Typography
//                       sx={{
//                         fontSize: "14px",
//                         fontWeight: 700,
//                         // mb: "2px",
//                       }}
//                     >
//                       {"Experience"}
//                     </Typography>
//                   </Box>
//                   {talentContent?.candidate_profile?.employer_histories.map(
//                     (item) => {
//                       return (
//                         <Box mt={1}>
//                           <Typography
//                             sx={{
//                               fontSize: "12px",
//                               fontWeight: 700,
//                             }}
//                           >
//                             {item?.name}, {item?.title}
//                           </Typography>
//                           <Typography
//                             sx={{
//                               fontSize: "12px",
//                               fontWeight: 700,
//                             }}
//                           >
//                             {monthYear(item?.start_date)} -{" "}
//                             {monthYear(item?.end_date)}
//                           </Typography>
//                           <Typography
//                             sx={{
//                               fontSize: "12px",
//                               fontWeight: 500,
//                             }}
//                           >
//                             {item?.clients_worked_on_awards}
//                           </Typography>
//                         </Box>
//                       );
//                     }
//                   )}
//                 </Box>

//                 <Box sx={{ mt: 1 }}>
//                   <Box sx={{ display: "flex", alignItems: "center" }}>
//                     <TalentSVGButton
//                       color={"white"}
//                       source={references}
//                       height={20}
//                       width={18}
//                       padding="0 8px 0 0 !important"
//                     />
//                     <Typography
//                       sx={{
//                         fontSize: "14px",
//                         fontWeight: 700,
//                         // mb: "2px",
//                       }}
//                     >
//                       {"References"}
//                     </Typography>
//                   </Box>
//                   {talentContent?.candidate_profile?.candidate_references?.map(
//                     (item) => {
//                       return (
//                         <Box
//                           sx={{
//                             width: "200px",
//                             display: "flex",
//                             justifyContent: "space-between",
//                             mt: 1,
//                           }}
//                         >
//                           <Box>
//                             <Typography
//                               sx={{
//                                 fontSize: "12px",
//                                 fontWeight: 700,
//                               }}
//                             >
//                               {item?.name}
//                             </Typography>
//                             <Typography
//                               sx={{
//                                 fontSize: "12px",
//                                 fontWeight: 500,
//                               }}
//                             >
//                               {item?.company_name}
//                             </Typography>
//                             <Typography
//                               sx={{
//                                 fontSize: "12px",
//                                 fontWeight: 500,
//                               }}
//                             >
//                               {item?.title}
//                             </Typography>

//                             <Box
//                               sx={{
//                                 width: "100px",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "space-between",
//                               }}
//                             >
//                               <TalentSVGButton
//                                 color={"white"}
//                                 source={contactReference}
//                                 height={16}
//                                 width={18}
//                                 padding="0 8px 0 0 !important"
//                               />
//                               <Typography
//                                 sx={{
//                                   fontSize: "12px",
//                                   fontWeight: 500,
//                                   // mb: "2px",
//                                 }}
//                               >
//                                 {item?.contact}
//                               </Typography>
//                             </Box>
//                             <Box
//                               sx={{
//                                 width: "130px",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "space-between",
//                               }}
//                             >
//                               <TalentSVGButton
//                                 color={"white"}
//                                 source={emailReference}
//                                 height={13}
//                                 width={18}
//                                 padding="0 8px 0 0 !important"
//                               />
//                               <Typography
//                                 sx={{
//                                   fontSize: "12px",
//                                   fontWeight: 500,
//                                   // mb: "2px",
//                                 }}
//                               >
//                                 {item?.email}
//                               </Typography>
//                             </Box>
//                           </Box>
//                           <Box>
//                             <TalentSVGButton
//                               color={"quicklinks"}
//                               source={link}
//                               height={20}
//                               width={18}
//                             />
//                           </Box>
//                         </Box>
//                       );
//                     }
//                   )}
//                 </Box>
//               </Box>

//               <Box className="contentBoxRight">
//                 <PoolJob
//                   handleClick={handleClick}
//                   tableData={tableData}
//                   handleClose={handleClose}
//                   talentContent={talentContent}
//                   addToPool={addToPool}
//                   anchorEl={anchorEl}
//                   jobClick={jobClick}
//                   talentJobs={talentJobs}
//                   addToJob={addToJob}
//                   handleAddJobClick={handleAddJobClick}
//                 />
//                 <JobAlert talentContent={talentContent} />
//                 <CommentBox />
//               </Box>
//             </Box>
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "center !important",
//               }}
//             >
//               <SmallButton
//                 color="redButton"
//                 startIcon={
//                   <Box
//                     component="img"
//                     className="eye"
//                     alt="eye logo"
//                     src={upClose}
//                     sx={{
//                       height: 16,
//                       width: 16,
//                     }}
//                   />
//                 }
//                 onClick={() => setFlip((prev) => !prev)}
//                 startIconMargin="4px"
//                 marginTop="5px"
//                 height={19}
//                 width={142}
//                 fontWeight={700}
//                 borderRadius="7px 7px 0px 0px"
//               />
//             </Box>
//           </Grid>
//         </AccordionDetails>
//         <EditPersonality
//           talentContent={talentContent}
//           show={editPersonality}
//           handleOpen={handleEdit}
//           seteditPersonality={seteditPersonality}
//           setPersonalityAdded={setPersonalityAdded}
//         />
//       </StyledAccordion>
//     </Box>
//   );
// }
