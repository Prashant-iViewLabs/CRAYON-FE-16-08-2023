import { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import locale from "../../../i18n/locale";
import { uploadProfilePic } from "../../../redux/candidate/myProfileSlice";
import { setAlert, setLoading } from "../../../redux/configSlice";
import {
  ALERT_TYPE,
  EMP_PROFILE_STEPS,
  ERROR_MSG,
} from "../../../utils/Constants";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";
import { useTheme } from "@emotion/react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import getCroppedImg from "../../../utils/cropImage";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import companyLogo from "../../../assets/company_logo.svg";
import { getLocalStorage } from "../../../utils/Common";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Info from "./Info";
import CompanyInfo from "./CompanyInfo";
import ZoomOutIcon from "@mui/icons-material/Remove";
import ZoomInIcon from "@mui/icons-material/Add";
import Slider from "@mui/material/Slider";
import {
  createInfo,
  createCompInfo,
  getEmpProfile,
  getIndustries,
  getCompanies,
} from "../../../redux/employer/empProfileSlice";
import CustomDialog from "../../common/CustomDialog";
import Cropper from "react-easy-crop";
import { Grid } from "@mui/material";
import ProfileProgressButtonLayout from "../../common/ProfileProgressButtonLayout";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import SingleRadialChart from "../../common/SingleRadialChart";

// 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)
const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginTop: "4px",
  borderRadius: "17px",
  position: "unset",
  boxShadow: "none",
  // height: "69vh",
  width: "100%",
  // overflow: "scroll",
  // overflowX: "hidden",
  backgroundColor: "transparent",
  "& .MuiAccordionSummary-root": {
    padding: "16px 32px",
    cursor: "auto !important",
    boxShadow: "-1px 3px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "17px",
    marginBottom: "16px",
    position: "relative",
    background: "#ffff",
  },
  "& .MuiAccordionSummary-content.Mui-expanded": {
    margin: "0 0 8px 0",
  },
  "& .MuiAccordionSummary-content": {
    flexDirection: "column",
    margin: 0,
    ".companyLogo": {
      height: 73,
      width: 73,
      marginRight: "16px",
    },
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    position: "absolute",
    right: "24px",
    top: "24px",
    color: theme.palette.white,
    background: theme.palette.lightText,
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    "& .MuiSvgIcon-root": {
      fontSize: "1.5rem",
    },
  },
  "& .MuiCollapse-root": {
    "& .MuiAccordionDetails-root": {
      display: "flex",
      paddingTop: 0,
      boxShadow: "-1px 3px 8px rgba(0, 0, 0, 0.1)",
      borderRadius: "17px",
      background: "#ffff",
      "& .MuiTypography-root": {
        fontSize: "14px",
        fontWeight: 500,
        color: theme.palette.black,
        opacity: 0.87,
      },
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 25,
  boxShadow: "-1px 3px 8px rgba(0, 0, 0, 0.1)",
  height: "32px",
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
      value === 100
        ? theme.palette.lightGreenButton300.main
        : theme.palette.redButton100.main,
  },
}));

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ mb: 3 }}>
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

const componentNames = {
  info: Info,
  companyInfo: CompanyInfo,
};

const COMP_INFO = {
  company_name: "",
  hyperlink: "",
  notes: "",
  industry_ids: [],
};
const INFO = {
  first_name: "",
  surname: "",
  email: "",
  contact_no: "",
  region_id: "",
  gender: "",
  town_id: "",
  skinz: "",
};

const StyledButtonLeft = styled(Button)(({ theme }) => ({
  // marginRight: "24px",
  fontSize: "14px",
  width: "140px",
  border: `1px solid ${theme.palette.redButton100.main}`,
  "& .MuiSvgIcon-root": {
    fontSize: "16px",
  },
  borderRadius: "5px",
}));
export default function ProfileCard() {
  const i18n = locale.en;
  const theme = useTheme();
  const dispatch = useDispatch();
  const hiddenFileInput = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [currentCompIndex, setCurrentCompIndex] = useState(0);
  const [currentComp, setCurrentComp] = useState("info");
  const SomeComponent = componentNames[currentComp];
  const [image, setImage] = useState([]);
  const [imageName, setImageName] = useState("My pic");
  const [info, setInfo] = useState(INFO);
  const [compInfo, setCompInfo] = useState(COMP_INFO);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [companyName, setCompanyName] = useState("");

  const [openEditImage, setOpenEditImage] = useState(false);
  const [imagePreview, setImagePreview] = useState([]);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [color, setColor] = useState("");
  const [displayD, setDisplayD] = useState("none");
  const [errors, setErrors] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [progressButton, setProgressButton] = useState(false);

  const handleZoom = (direction) => {
    const step = 0.5;
    let newZoom = zoom;

    if (direction === "+") {
      newZoom = Math.min(zoom + step, 3); // Limit zoom to maximum 3x
    } else if (direction === "-") {
      newZoom = Math.max(zoom - step, 1); // Limit zoom to minimum 1x
    }

    setZoom(newZoom);
  };

  const getAllData = async () => {
    try {
      dispatch(setLoading(true));
      const industry = await dispatch(getIndustries());
      setIndustries(industry.payload.data);
      const company = await dispatch(getCompanies());
      setCompanies(company.payload.data);
      // setIndustries(addId(industry.payload.data, 'industry_id', 'name'))
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
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
    getAllData();
  }, []);

  const handleImageClick = (e) => {
    setImagePreview(null);
    hiddenFileInput.current.click();
  };

  const handleImageChange = async (event) => {
    setZoom(1);
    setImageName(event.target.files[0].name);
    const imageData = window.URL.createObjectURL(
      new Blob(event.target.files, { type: "application/*" })
    );
    setImagePreview(imageData);
    setOpenEditImage(true);
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // const calProfileCompletion = (uploadedImage = []) => {
  //     const infokeys = Object.keys(info)
  //     const compInfoKeys = Object.keys(compInfo)
  //     const totalFields = Object.keys(info).length + Object.keys(compInfo).length + 1;
  //      console.log(totalFields)
  //     const completedInfo = infokeys.filter(item => info[item] != '').length
  //     const completedCompInfo = compInfoKeys.filter(item => compInfo[item] != '').length
  //     const imageUploaded = uploadedImage.length > 0 ? 1 : 0

  //     const completedFields = completedInfo + completedCompInfo + imageUploaded

  //     const percentage = (completedFields * 100) / totalFields
  //     setProfileCompletion(percentage)
  // }
  const handleImageEdit = useCallback(
    async (event) => {
      const croppedImage = await getCroppedImg(
        imagePreview,
        croppedAreaPixels,
        0
      );
      const formData = new FormData();
      const blobTofile = new File([croppedImage], imageName, {
        type: "image/jpeg",
      });

      formData.append("profile-pic", blobTofile);

      try {
        const { payload } = await dispatch(uploadProfilePic(formData));
        if (payload?.status === "success") {
          setImage(URL.createObjectURL(croppedImage));
          setOpenEditImage(false);
          dispatch(
            setAlert({
              show: true,
              type: ALERT_TYPE.SUCCESS,
              msg: "Profile pic uploaded Successfully!",
            })
          );
          // calProfileCompletion(croppedImage)
        } else {
          setImageName("My pic");
          dispatch(
            setAlert({
              show: true,
              type: ALERT_TYPE.ERROR,
              msg: payload?.message,
            })
          );
        }
      } catch (error) {
        setImageName("My pic");
        dispatch(setAlert({ show: true }));
      }
    },
    [croppedAreaPixels]
  );

  const getInfoData = (infoData) => {
    setInfo(infoData);
  };
  const getCompanyInfoData = (compInfoData) => {
    setCompInfo(compInfoData);
  };
  const getAllEmpData = async () => {
    try {
      const { payload } = await dispatch(getEmpProfile());
      if (payload?.status === "success") {
        if (typeof payload.data === "string") {
          setCompInfo({});
          setInfo({});
        } else {
          setCompanyName(payload?.data?.company_name);
          setImage(payload?.data.profile_url);
          setCompInfo(payload?.data);
          setInfo(payload?.data);
          setProfileCompletion(payload.data?.profile_completion_percentage);
        }
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

  useEffect(() => {
    getAllEmpData();
  }, []);

  const saveInfo = async () => {
    // calProfileCompletion()
    try {
      const { payload } = await dispatch(createInfo(info));
      if (payload?.status === "success") {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Profile updated successfully!",
          })
        );
        await getAllEmpData();
        setErrors([]);
        setCurrentComp("companyInfo");
        setColor("2");
        setCurrentCompIndex(currentCompIndex + 1);
      } else if (payload?.status === "error") {
        // console.log("PAYLOAD", payload);
        // payload?.message.map((message, index) => {
        //   dispatch(
        //     setAlert({
        //       show: true,
        //       type: ALERT_TYPE.ERROR,
        //       msg: message,
        //     })
        //   );
        // });
        setErrors(payload?.message);
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
      dispatch(setAlert({ show: true, type: ALERT_TYPE.ERROR, msg: error }));
    }
  };
  const saveCompInfo = async () => {
    // calProfileCompletion()
    try {
      console.log(compInfo);
      console.log(companyName);
      let data = compInfo;
      if (
        compInfo.company_name !== null &&
        compInfo.company_name === companyName
      ) {
        data = {
          ...compInfo,
          company_name: companies.find((item) => item.name === companyName)
            .company_id,
        };
      }
      const { payload } = await dispatch(createCompInfo(data));
      if (payload?.status === "success") {
        const company = payload.data[0].company_name;
        setCompanyName(company);
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Profile updated successfully!",
          })
        );
        await getAllEmpData();
        setErrors([]);
      } else if (payload?.status === "error") {
        setErrors(payload?.message);
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
      console.log(error);
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: "Error",
        })
      );
    }
  };
  const handlePrev = () => {
    if (currentCompIndex === 1) {
      setCurrentComp("info");
      setColor("1");
    } else {
      setCurrentComp("companyInfo");
      setColor("2");
    }
    setCurrentCompIndex(currentCompIndex - 1);
  };
  const handleNext = () => {
    if (currentCompIndex === 0) {
      setCurrentComp("companyInfo");
      setColor("2");
    } else {
      setCurrentComp("info");
      setColor("1");
    }
    setCurrentCompIndex(currentCompIndex + 1);
  };

  const renderFooter = (
    <Box>
      <Button
        onClick={() => {
          setImageName("My pic");
          setOpenEditImage(false);
        }}
        disableElevation
        variant="outlined"
        color="redButton"
        sx={{ width: "130px", mr: 2 }}
      >
        {i18n["empMyProfile.cancel"]}
      </Button>
      <Button
        onClick={handleImageEdit}
        disableElevation
        variant="contained"
        color="redButton"
        sx={{ width: "130px" }}
      >
        {i18n["empMyProfile.upload"]}
      </Button>
    </Box>
  );

  const handleAccordion = () => {
    setExpanded((prevState) => !prevState);
  };

  const handleUpdateProfile = () => {
    if (currentCompIndex === 0) {
      setColor("1");
    } else if (currentCompIndex === 1) {
      setColor("2");
    } else {
    }
    setExpanded(true);
  };

  const handleCancelProfile = () => {
    setExpanded(false);
    setCurrentCompIndex(null);
    setCurrentComp("info");
    setColor("");
  };
  const handleOpenClose = () => {
    if (expanded) {
      handleCancelProfile();
    } else {
      handleUpdateProfile();
    }
  };

  // useEffect(() => {
  //     calProfileCompletion()
  // }, [info,compInfo])

  const handleProfilePop = () => {
    if (displayD === "none") {
      // setExpanded(true)
      setDisplayD("block");
    } else {
      // setExpanded(false)
      setDisplayD("none");
    }
  };
  const handlePageChange = (test) => {
    if (test === "a") {
      setCurrentComp("info");
      setExpanded(true);
      setColor("1");
      setDisplayD("none");
      setCurrentCompIndex(0);
    } else if (test === "b") {
      setCurrentComp("companyInfo");
      setColor("2");
      setDisplayD("none");
      setCurrentCompIndex(1);
      setExpanded(true);
    } else if (test === "c") {
    } else if (test === "d") {
    }
    // setCurrentCompIndex(currentCompIndex + 1);
  };
  const func = (prop) => {
    if (prop === 1) {
      setCurrentComp("info");
      setExpanded(true);
      setColor("1");
      setDisplayD("none");
      setCurrentCompIndex(currentCompIndex - 1);
    } else if (prop === 2) {
      setCurrentComp("companyInfo");
      setColor("2");
      setDisplayD("none");
      setCurrentCompIndex(currentCompIndex + 1);
      setExpanded(true);
    }
  };
  const boxRef = useRef();
  const handleClickOutside = (event) => {
    if (boxRef.current && !boxRef.current.contains(event.target)) {
      setProgressButton(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box sx={{ display: "flex", width: "100%", my: 3 }}>
      <Box sx={{ display: "flex", flexDirection: "column", minWidth: "12%" }}>
        <StyledButtonLeft
          onClick={() => func(1)}
          variant={color === "1" ? "contained" : "text"}
          color="redButton100"
          sx={{ mb: 2 }}
        >
          {i18n["myProfile.myInfo"]}
        </StyledButtonLeft>
        <StyledButtonLeft
          onClick={() => func(2)}
          variant={color === "2" ? "contained" : "text"}
          color="redButton100"
          sx={{ mb: 2 }}
        >
          {i18n["myProfile.companyInfo"]}
        </StyledButtonLeft>
        <StyledButtonLeft
          //  onClick={()=>func("3")}
          variant={color === "3" ? "contained" : "outlined"}
          color="redButton100"
          disabled
        >
          {i18n["myProfile.myPlan"]}
        </StyledButtonLeft>
        <StyledButtonLeft
          //  onClick={()=>func("3")}
          variant={color === "4" ? "contained" : "outlined"}
          color="redButton100"
          sx={{ mt: 2 }}
          disabled
        >
          {i18n["myProfile.billing"]}
        </StyledButtonLeft>
      </Box>
      {/* <Box sx={{ display: "flex", flexDirection: "column", width: "75%" }}> */}
      <Grid
        container
        spacing={0}
        sx={{ pb: 3 }}
        flexDirection={{ xs: "column", sm: "row" }}
        width="75%"
        justifyContent="center"
        gap={2}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <Typography
            sx={{
              width: "60%",
              fontSize: "36px",
              fontWeight: 700,
              display: "flex",
              justifyContent: "end",
            }}
          >
            {i18n["myProfile.title"]}
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
                <ProfileProgressButtonLayout />
                {!progressButton ? <ExpandMore /> : <ExpandLess />}
              </Button>
            </Box>
            <Box
              sx={{
                paddingRight: "32px",
              }}
            >
              <LinearProgressWithLabel value={profileCompletion} />
            </Box>

            {/* <StyledButton
              disabled={expanded}
              variant="contained"
              color="redButton100"
              onClick={handleUpdateProfile}
              sx={{padding:"17px"}}
            >
              {i18n["empMyProfile.updateProfile"]}
            </StyledButton> */}
            {/* {!expanded ? (
            <StyledButton
              // disabled={expanded}
              variant="contained"
              color="redButton100"
              onClick={handleUpdateProfile}
            >
              {i18n["empMyProfile.updateProfile"]}
            </StyledButton>
          ) : (
            <StyledButton
              // disabled={expanded}
              variant="outlined"
              color="redButton100"
              onClick={handleCancelProfile}
            >
              {i18n["empMyProfile.cancelProfile"]}
            </StyledButton>
          )} */}
            {progressButton && (
              <Box
                ref={boxRef}
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
                  className="employer-profile-viewer-dropdown"
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
                      // onClick={() => handlePageChange("a")}
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
                      My info
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
                          profileCompletion >= 25
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
                      {profileCompletion >= 25 ? "25%" : "0%"}
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
                      // onClick={() => handlePageChange("b")}
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
                      Company Info
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
                          profileCompletion >= 50
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
                      {profileCompletion >= 50 ? "25%" : "0%"}
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
                      // onClick={() => handlePageChange("b")}
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
                      My Plan
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
                      // onClick={() => handlePageChange("b")}
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
                      Billing
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
                </Box>
              </Box>
            )}
          </Box>
        </Box>

        <StyledAccordion expanded={expanded} className="accordianSection">
          <AccordionSummary
            // expandIcon={<ExpandMoreIcon onClick={handleProfilePop} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            {/* <Box
              sx={{
                position: "absolute",
                right: "30px",
                border: "1px solid black",
                borderRadius: "5px",
                color: "white",
                backgroundColor: "#3b3636",
                paddingLeft: 0.4,
                paddingRight: 0.4,
              }}
              id="profile-viewer-btn"
            >
              {displayD === "none" ? (
                <ArrowDownwardIcon
                  onClick={handleProfilePop}
                  sx={{ "&:hover": { cursor: "pointer" } }}
                  id="profile-viewer-btn"
                />
              ) : (
                <ArrowUpwardIcon
                  onClick={handleProfilePop}
                  sx={{ "&:hover": { cursor: "pointer" } }}
                  id="profile-viewer-btn"
                />
              )}
            </Box>
            <Box
              sx={{
                ref: { boxRef },
                backgroundColor: "white",
                position: "absolute",
                display: displayD,
                right: 0,
                top: 59,
                width: "auto",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                zIndex: 9999,
              }}
            >
              <Box
                sx={{ display: "flex", flexDirection: "column", p: 2 }}
                className="profile-viewer-dropdown"
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  Profile Completion Guidance:
                </Typography>
                <Button
                  variant="outlined"
                  sx={{ mt: 2, borderRadius: 2 }}
                  onClick={() => handlePageChange("a")}
                >
                  My info{" "}
                  {profileCompletion >= 25 && (
                    <CheckSharpIcon
                      sx={{
                        position: "absolute",
                        right: 2,
                        color: "green",
                        fontSize: "25px",
                      }}
                    />
                  )}
                </Button>
                <Button
                  variant="outlined"
                  sx={{ mt: 2, borderRadius: 2 }}
                  onClick={() => handlePageChange("b")}
                >
                  Company info{" "}
                  {profileCompletion >= 50 && (
                    <CheckSharpIcon
                      sx={{
                        position: "absolute",
                        right: 2,
                        color: "green",
                        fontSize: "25px",
                      }}
                    />
                  )}
                </Button>
                <Button
                  variant="outlined"
                  sx={{ mt: 2, borderRadius: 2 }}
                  onClick={() => handlePageChange("c")}
                  disabled
                >
                  My plan{" "}
                  {profileCompletion >= 75 && (
                    <CheckSharpIcon
                      sx={{
                        position: "absolute",
                        right: 2,
                        color: "green",
                        fontSize: "25px",
                      }}
                    />
                  )}
                </Button>
                <Button
                  variant="outlined"
                  sx={{ mt: 2, borderRadius: 2 }}
                  onClick={() => handlePageChange("d")}
                  disabled
                >
                  Billing{" "}
                  {profileCompletion === 100 && (
                    <CheckSharpIcon
                      sx={{
                        position: "absolute",
                        right: 2,
                        color: "green",
                        fontSize: "25px",
                      }}
                    />
                  )}
                </Button>
              </Box>
            </Box> */}
            {/* <AccordionSummary
                expandIcon={<ExpandMoreIcon onClick={handleAccordion} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
            </AccordionSummary> */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    component="img"
                    className="companyLogo"
                    alt="crayon logo"
                    src={
                      image?.length > 0
                        ? image || compInfo?.profile_url
                        : companyLogo
                    }
                    sx={{
                      height: "73px",
                      width: "73px",
                      borderRadius: "49px",
                    }}
                  />
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontWeight: 700,
                        mr: 1,
                      }}
                    >
                      {companies?.find(
                        (title) => title.company_id === compInfo?.company_name
                      )?.name || compInfo?.company_name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 500,
                        mr: 1,
                      }}
                    >
                      {info?.first_name} {info?.surname}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 400,
                        mr: 1,
                      }}
                    >
                      {i18n["empMyProfile.dateJoined"]}:{" "}
                      {info?.created_at?.substring(0, 10)}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <input
                    ref={hiddenFileInput}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  <StyledButton
                    variant="contained"
                    color="blueButton400"
                    onClick={handleImageClick}
                    sx={{ mr: 1 }}
                  >
                    {i18n["empMyProfile.uploadAlogo"]}
                  </StyledButton>
                  <StyledButton variant="outlined" color="blueButton700">
                    {i18n["myProfile.take"]}
                  </StyledButton>
                </Box>
              </Box>
              <Box sx={{ display: "flex", gap: 3 }}>
                {!expanded && (
                  <>
                    <Box sx={{ margin: "0 -22px 0 -22px" }}>
                      <SingleRadialChart
                        max={10000}
                        labelsData={"applications"}
                        series={[4000]}
                        width={120}
                        color={theme.palette.chart.green200}
                        isHovered={true}
                      />
                    </Box>
                    <Box sx={{ margin: "0 -22px 0 -22px" }}>
                      <SingleRadialChart
                        max={1000}
                        labelsData={"shortlistings"}
                        series={[123]}
                        width={120}
                        color={theme.palette.chart.green200}
                        isHovered={true}
                      />
                    </Box>
                    <Box sx={{ margin: "0 -22px 0 -22px" }}>
                      <SingleRadialChart
                        max={1000}
                        labelsData={"interviews"}
                        series={[3]}
                        width={120}
                        color={theme.palette.chart.green200}
                        isHovered={true}
                      />
                    </Box>
                  </>
                )}
              </Box>

              {/* <Box sx={{ width: "39%", mt: 2 }}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 600,
                    mr: 1,
                  }}
                >
                  {i18n["empMyProfile.profileCompletion"]}
                </Typography>
                <LinearProgressWithLabel value={profileCompletion} />
                {!expanded ? (
                  <StyledButton
                    // disabled={expanded}
                    variant="contained"
                    color="redButton100"
                    onClick={handleUpdateProfile}
                  >
                    {i18n["empMyProfile.updateProfile"]}
                  </StyledButton>
                ) : (
                  <StyledButton
                    // disabled={expanded}
                    variant="outlined"
                    color="redButton100"
                    onClick={handleCancelProfile}
                  >
                    {i18n["empMyProfile.cancelProfile"]}
                  </StyledButton>
                )}
              </Box> */}
            </Box>
            <Box
              sx={{
                position: "absolute",
                left: 0,
                // right: 0,
                bottom: expanded ? 0 : -20,
                width: "100%",
                margin: "0 auto",
                zIndex: 5,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                sx={{
                  padding: "4px 20px",
                  height: 20,
                  borderRadius: expanded ? "15px 15px 0 0" : "0 0 15px 15px",
                  boxShadow: 3,
                }}
                size="small"
                variant="contained"
                color="redButton"
                endIcon={expanded ? <ExpandLess /> : <ExpandMore />}
                onClick={handleOpenClose}
              >
                {expanded ? "looks good" : "my info"}
              </Button>
            </Box>
          </AccordionSummary>

          <AccordionDetails
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 4,
              pb: 0,
              mb: 6,
            }}
          >
            <Box sx={{ mt: 3 }}>
              <SomeComponent
                handleInfoData={getInfoData}
                profile={info}
                profile2={compInfo}
                handleCompanyInfoData={getCompanyInfoData}
                errors={errors}
                setErrors={setErrors}
                companies={companies}
                industries={industries}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 8,
                }}
              >
                {currentCompIndex === 0 ? (
                  <Box>
                    <StyledButton
                      onClick={saveInfo}
                      variant="contained"
                      color="grayButton200"
                      sx={{
                        width: "200px",
                        height: "50px",
                        borderRadius: "26px 0 0 0",
                      }}
                    >
                      {i18n["empMyProfile.save"]}
                    </StyledButton>
                    <StyledButton
                      endIcon={<ArrowForwardIosIcon />}
                      variant="contained"
                      color="redButton100"
                      sx={{
                        width: "200px",
                        height: "50px",
                        borderRadius: "0 26px 0 0 ",
                      }}
                      onClick={handleNext}
                    >
                      {EMP_PROFILE_STEPS[currentCompIndex + 1]}
                    </StyledButton>
                  </Box>
                ) : (
                  <Box>
                    <StyledButton
                      startIcon={<ArrowBackIosIcon />}
                      variant="contained"
                      color="grayButton200"
                      sx={{
                        width: "200px",
                        height: "50px",
                        borderRadius: "26px 0 0 0",
                      }}
                      onClick={handlePrev}
                    >
                      {EMP_PROFILE_STEPS[currentCompIndex - 1]}
                    </StyledButton>
                    <StyledButton
                      variant="contained"
                      color="redButton100"
                      sx={{
                        width: "200px",
                        height: "50px",
                        borderRadius: "0 26px 0 0 ",
                      }}
                      onClick={saveCompInfo}
                    >
                      {i18n["empMyProfile.save"]}
                    </StyledButton>
                  </Box>
                )}
              </Box>
            </Box>
          </AccordionDetails>
          <CustomDialog
            dialogWidth="md"
            show={openEditImage}
            onDialogClose={() => {
              setImageName("My pic");
              setOpenEditImage(false);
            }}
            footer={renderFooter}
            isProfile
          >
            <Box
              sx={{
                position: "relative",
                height: "80%",
              }}
            >
              <Cropper
                image={imagePreview}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={true}
                onCropChange={setCrop}
                // onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </Box>
            <Box
              sx={{
                position: "relative",
                height: "20%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button variant="text" onClick={() => handleZoom("-")}>
                <ZoomOutIcon />
              </Button>
              <Box
                className="controls"
                sx={{
                  width: 200,
                  mx: 3,
                }}
              >
                <Slider
                  defaultValue={0}
                  size="small"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.5}
                  aria-labelledby="Zoom"
                  onChange={(e) => {
                    setZoom(e.target.value);
                  }}
                  className="zoom-range"
                />
              </Box>
              <Button variant="text" onClick={() => handleZoom("+")}>
                <ZoomInIcon />
              </Button>
              <Button variant="text" onClick={() => setZoom(1)}>
                Reset
              </Button>
            </Box>
          </CustomDialog>
          <style>
            {`.accordianSection::-webkit-scrollbar {
                      margin-left: 2px;
                      width: 5px !important;
                      background-color: transparent; /* Set the background color of the scrollbar */
                    }
                    .accordianSection::-webkit-scrollbar-thumb {
                      background-color: #EEEEEE;
                      width: 5px;
                      box-shadow: 0px 3px 3px #00000029;
                      border-radius: 3px;
                    }`}
          </style>
        </StyledAccordion>
      </Grid>
    </Box>
  );
}
