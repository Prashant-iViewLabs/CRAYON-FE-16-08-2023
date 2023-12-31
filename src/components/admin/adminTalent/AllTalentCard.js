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
import { Link, useLocation } from "react-router-dom";
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

export default function AllTalentCard({ talentContent, setPersonalityAdded }) {
  const i18n = locale.en;
  const theme = useTheme();
  const dispatch = useDispatch();
  const location = useLocation();

  const prevLocation = location.pathname;
  const hasTalentPool = location.pathname.includes("talent-pool");

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
    <StyledAccordion>
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
                <Box component="img" className="eye" alt="eye logo" src={eye} />
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
                <Box component="img" className="eye" alt="eye logo" src={eye} />
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
                <Box component="img" className="eye" alt="eye logo" src={eye} />
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
                      placeholder={i18n["postAJob.preferredShadowPersonality"]}
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
              <Box sx={{ display: "flex", alignItems: "center", mt: "-10px" }}>
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
                sx={{ display: "flex", alignItems: "center", marginTop: "6px" }}
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
                sx={{ display: "flex", alignItems: "center", marginTop: "6px" }}
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
                sx={{ display: "flex", alignItems: "center", marginTop: "6px" }}
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
                sx={{ display: "flex", alignItems: "center", marginTop: "6px" }}
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
                sx={{ display: "flex", alignItems: "center", marginTop: "6px" }}
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
                    talentContent?.candidate_profile?.candidate_info?.experience
                      ?.year
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
                        talentContent?.candidate_profile?.candidate_info?.salary
                          ?.max != undefined &&
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
                    Currently on R25,000pm, looking to change industries in the
                    fintech space.
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
                    Currently on R25,000pm, looking to change industries in the
                    fintech space.
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
  );
}
