import { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import locale from "../../../i18n/locale";
import { uploadProfilePic } from "../../../redux/candidate/myProfileSlice";
import { setAlert } from "../../../redux/configSlice";
import { ALERT_TYPE } from "../../../utils/Constants";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import companyLogo from "../../../assets/company_logo.svg";
import { useTheme } from "@emotion/react";
import getCroppedImg from "../../../utils/cropImage";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TheBasics from "./TheBasics";
import CustomDialog from "../../common/CustomDialog";
import uploadProfile from "../../../assets/uploadProfile.svg";
import ZoomOutIcon from "@mui/icons-material/Remove";
import ZoomInIcon from "@mui/icons-material/Add";
import Slider from "@mui/material/Slider";
import Cropper from "react-easy-crop";
import {
  createProfile,
  getProfile,
} from "../../../redux/candidate/myProfileSlice";
import { useNavigate } from "react-router-dom";
// import FollowCompany from "./FollowCompany";
import { Grid } from "@mui/material";
import SingleRadialChart from "../../common/SingleRadialChart";


import profile_challenger from "../../../assets/Profile Icons_Challenger.svg";
import profile_character from "../../../assets/Profile Icons_Charater.svg";
import profile_collaborator from "../../../assets/Profile Icons_Collaborator.svg";
import profile_contemplator from "../../../assets/Profile Icons_Contemplator.svg";
import { AddCircleOutline, ExpandLess, ExpandMore } from "@mui/icons-material";
import AddNewCompany from "./dialog/AddNewCompany";
import DisplayFollowedCompanies from "./dialog/DisplayFollowedCompanies";

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginTop: "4px",
  borderRadius: "17px",
  position: "unset",
  boxShadow: "none",
  height: "75vh",
  width: "100%",
  overflow: "scroll",
  overflowX: "hidden",
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

// const StyledButtonSave = styled(Button)(({ theme }) => ({
//   marginRight: "24px",
//   fontSize: "14px",
//   width: "150px",
//   border: `2px solid ${theme.palette.redButton100.main}`,
//   "& .MuiSvgIcon-root": {
//     fontSize: "16px",
//   },
// }));

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

const COMP_INFO = {
  name: "",
  website: "",
  description: "",
  industry_ids: [],
};

const PROFILE = {
  name: "",
  surname: "",
  email: "",
  contact_no: "",
  gender: "",
  dob: "",
  my_bio: "",
  relocate: 0,
  town_id: 3,
  nationality_ids: [],
  language_ids: [1],
  skinz: 1,
  seeking_job: 1,
  hide_age: 0,
  hide_profile: 0,
  hide_video: 0,
  linkedin_profile_link: "",
  country_id: 0,
  profile_percent_complete: 0,
};

export default function ProfileCard() {
  const i18n = locale.en;
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hiddenFileInput = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [image, setImage] = useState([]);
  const [imageName, setImageName] = useState("My pic");
  const [profile, setProfile] = useState(PROFILE);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [openEditImage, setOpenEditImage] = useState(false);
  const [imagePreview, setImagePreview] = useState([]);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [errors, setErrors] = useState([]);
  const [openAddCompanyDialog, setOpenCompanyDialog] = useState(false);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

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
  // const calProfileCompletion = (uploadedImage = []) => {
  //   const totalFields = Object.keys(profile).length;

  //   const completedFields = Object.keys(
  //     Object.entries(profile).reduce(
  //       (a, [k, v]) => (v ? ((a[k] = v), a) : a),
  //       {}
  //       )
  //       ).length;
  //   const percentage = (completedFields * 100) / totalFields;

  //   setProfileCompletion(percentage);
  // };

  const handleImageChange = async (event) => {
    setZoom(1);
    setImageName(event.target.files[0].name);
    const imageData = window.URL.createObjectURL(
      new Blob(event.target.files, { type: "application/*" })
    );
    setImagePreview(imageData);
    setOpenEditImage(true);
  };

  const handleImageClick = () => {
    setImagePreview(null);
    hiddenFileInput.current.click();
  };

  const renderFooter = <></>;

  const handleAccordion = () => {
    setExpanded(!expanded);
  };

  const handleUpdateProfile = () => {
    setExpanded(true);
  };
  const handleCancelProfile = () => {
    setExpanded(false);
  };

  const getAllData = async () => {
    try {
      const { payload } = await dispatch(getProfile());
      if (payload?.status == "success") {
        if (typeof payload.data == "string") {
          setProfile({});
        } else {
          setProfile(payload.data);
          setImage(payload.data.profile_url);
          setProfileCompletion(payload.data.profile_percent_complete);
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
    getAllData();
  }, []);

  window.onclick = (e) => {
    if (
      e.target.className !== "candidate-profile-viewer-dropdown" &&
      e.target.id !== "candidate-profile-viewer-btn"
    ) {
      setDisplayD("none");
    }
  };
  // useEffect(()=>{
  //   calProfileCompletion()
  // },[profile])

  const onSaveProfile = async () => {
    try {
      let data = profile;
      if (profile.relocate === null) {
        data = {
          ...profile,
          relocate: 0,
        };
      }
      console.log(data);
      const { payload } = await dispatch(createProfile(data));
      if (payload?.data?.status == "success") {
        // calProfileCompletion();
        await dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Profile created successfully!",
          })
        );
        setErrors([]);
        getAllData();
        navigate("/candidate/my-cv");
      } else if (payload?.data?.status == "error") {
        setErrors(payload?.data?.message);
      } else {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.ERROR,
            msg: payload?.data?.message[0].message,
          })
        );
      }
    } catch (error) {
      dispatch(setAlert({ show: true }));
    }
  };

  const getProfileData = (profileData) => {
    setProfile(profileData);
  };
  const [displayD, setDisplayD] = useState("none");
  const handleProfilePop = () => {
    if (displayD == "none") {
      setDisplayD("block");
    } else {
      setDisplayD("none");
    }
  };
  const handlePageChange = (test) => {
    if (test == "a") {
      navigate("/candidate/my-profile");
      setDisplayD("none");
      setExpanded(true);
    } else if (test == "b") {
      navigate("/candidate/my-cv");
      setExpanded(true);
    } else if (test == "c") {
    } else if (test == "d") {
      navigate("candidate/my-cam");
    }
  };

  const handleOpenCompanyDialog = () => {
    setOpenCompanyDialog((prevState) => !prevState);
  };
  return (
    <Box>
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
        >
          {displayD === "none" ? (
            <ArrowDownwardIcon
              onClick={handleProfilePop}
              sx={{ "&:hover": { cursor: "pointer" } }}
              id="candidate-profile-viewer-btn"
            />
          ) : (
            <ArrowUpwardIcon
              onClick={handleProfilePop}
              sx={{ "&:hover": { cursor: "pointer" } }}
              id="candidate-profile-viewer-btn"
            />
          )}
        </Box>
        <Box sx={{ marginBottom: "-22px" }}>
          <Box
            sx={{
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
              className="candidate-profile-viewer-dropdown"
            >
              <Typography sx={{ fontWeight: "bold" }}>
                Profile Completion Guidance:
              </Typography>
              <Button
                variant="outlined"
                sx={{ mt: 2, borderRadius: 2 }}
                onClick={() => handlePageChange("a")}
              >
                Profile{" "}
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
                Crayon vitae{" "}
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
                Personality Assessment{" "}
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
                Crayon cam{" "}
                {profileCompletion >= 100 && (
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
          </Box>*}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    component="img"
                    alt="upload profile"
                    src={
                      image?.length > 0
                        ? image || profile?.profile_url
                        : companyLogo
                    }
                    // src={
                    //   profile?.profile_url !== "No URL"
                    //     ? profile?.profile_url
                    //     : companyLogo
                    // }
                    sx={{
                      height: "96px",
                      width: "96px",
                      borderRadius: "49px",
                    }}
                  />
                  <Box sx={{ ml: 2 }}>
                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontWeight: 600,
                      }}
                    >
                      {profile.name} {profile.surname}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 400,
                        color: theme.palette.lightText,
                      }}
                    >
                      Date Joined: {profile.created_at?.substring(0, 10)}
                    </Typography>

                    <input
                      ref={hiddenFileInput}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                    {/* <Box sx={{ pt: 1 }}>
                  <StyledButton
                    color="base"
                    variant="contained"
                    onClick={handleImageClick}
                    sx={{ mr: 1 }}
                  >
                    {i18n["myProfile.uploadPhoto"]}
                  </StyledButton>
                  <StyledButton variant="contained" disabled>
                    {i18n["myProfile.take"]}
                  </StyledButton>
                </Box> 
                  </Box>
                </Box>
                <Box>
                  <Box sx={{ pt: 1 }}>
                    <StyledButton
                      // color="base"
                      variant="contained"
                      onClick={handleImageClick}
                      sx={{
                        mr: 1,
                        padding: "17px",
                        backgroundColor: "#367BF5",
                      }}
                    >
                      {i18n["myProfile.uploadPhoto"]}
                    </StyledButton>
                    <StyledButton
                      variant="contained"
                      disabled
                      sx={{ padding: "17px" }}
                    >
                      {i18n["myProfile.take"]}
                    </StyledButton>
                  </Box>
                </Box>
              </Box>
            </Box>
            < sx={{ width: "39%", mt: 2 }}>
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
              {/* <StyledButton
              disabled={expanded}
              variant="contained"
              color="redButton100"
              onClick={handleUpdateProfile}
              sx={{padding:"17px"}}
            >
              {i18n["empMyProfile.updateProfile"]}
            </StyledButton> 
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
            </Box>
          </Box>
        </Box> */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  component="img"
                  alt="upload profile"
                  src={
                    image?.length > 0
                      ? image || profile?.profile_url
                      : companyLogo
                  }
                  // src={
                  //   profile?.profile_url !== "No URL"
                  //     ? profile?.profile_url
                  //     : companyLogo
                  // }
                  sx={{
                    height: "96px",
                    width: "96px",
                    borderRadius: "49px",
                  }}
                />
                <Box sx={{ ml: 2 }}>
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: 600,
                    }}
                  >
                    {profile.name} {profile.surname}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 400,
                      color: theme.palette.lightText,
                    }}
                  >
                    Date Joined: {profile.created_at?.substring(0, 10)}
                  </Typography>
                </Box>
              </Box>
              <input
                ref={hiddenFileInput}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <Box
                sx={{
                  display: "flex",
                  marginTop: "10px",
                }}
              >
                <StyledButton
                  color="blueButton700"
                  variant="contained"
                  onClick={handleImageClick}
                  sx={{ mr: 1 }}
                >
                  {i18n["myProfile.uploadPhoto"]}
                </StyledButton>
                <StyledButton variant="outlined" color="blueButton700">
                  {i18n["myProfile.take"]}
                </StyledButton>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexGrow: 0.9,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                {/* { */}
                {/*  job?.primary?.name && ( */}
                <Box
                  component="img"
                  height={80}
                  alt="Primary personality"
                  src={
                    profile_challenger
                    // (job?.primary?.name === "collaborator" && profile_collaborator)
                    //   (job?.primary?.name === "challenger" && profile_challenger) ||
                    //   (job?.primary?.name === "character" && profile_character) ||
                    //   (job?.primary?.name === "contemplator" && profile_contemplator)
                  }
                />
                {/*  ) */}
                {/* } */}
                {/* </Box> */}
                {/* { */}
                {/* job?.shadow?.name && ( */}
                <Box
                  component="img"
                  height={80}
                  alt="Shadow personality"
                  src={
                    profile_collaborator
                    // (job?.shadow?.name === "collaborator" && profile_collaborator) ||
                    // (job?.shadow?.name === "challenger" && profile_challenger) ||
                    // (job?.shadow?.name === "character" && profile_character) ||
                    // (job?.shadow?.name === "contemplator" && profile_contemplator)
                  }
                />
                {/* ) */}
                {/* } */}
                <Box sx={{ margin: "0 -22px 0 -22px" }}>
                  <SingleRadialChart
                    max={1000}
                    labelsData={"grit score"}
                    series={[80]}
                    width={120}
                    color={theme.palette.chart.red}
                    isHovered={true}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box sx={{ margin: "0 -22px 0 -22px" }}>
                  <SingleRadialChart
                    max={1000}
                    labelsData={"grit score"}
                    series={[80]}
                    width={120}
                    color={theme.palette.chart.red}
                    isHovered={true}
                  />
                </Box>
                <Box sx={{ margin: "0 -22px 0 -22px" }}>
                  <SingleRadialChart
                    max={1000}
                    labelsData={"grit score"}
                    series={[80]}
                    width={120}
                    color={theme.palette.chart.red}
                    isHovered={true}
                  />
                </Box>
                <Box sx={{ margin: "0 -22px 0 -22px" }}>
                  <SingleRadialChart
                    max={1000}
                    labelsData={"grit score"}
                    series={[80]}
                    width={120}
                    color={theme.palette.chart.red}
                    isHovered={true}
                  />
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    zIndex:10
                  }}
                >
                  <Button
                    variant="contained"
                    color="grayButton100"
                    sx={{
                      borderRadius: "20px 0 0 0",
                    }}
                    onClick={handleOpenCompanyDialog}
                  >
                    <AddCircleOutline />
                  </Button>
                  <DisplayFollowedCompanies />
                </Box>
              </Box>
            </Box>
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
              onClick={() => {
                setExpanded((prevState) => !prevState);
              }}
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
            pb:0,
            mb: 6
          }}
        >
          {/* <Box sx={{ mt: 3 }}>
            <FollowCompany />
          </Box> */}

          <Box sx={{ mt: 3 }}>
            {/* <SomeComponent handleInfoData={getInfoData} handleCompanyInfoData={getCompanyInfoData} /> */}
            <TheBasics
              profile={profile}
              handleProfileData={getProfileData}
              errors={errors}
              setErrors={setErrors}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                onClick={onSaveProfile}
                variant="contained"
                color="grayButton200"
                sx={{
                  width: "225px",
                  height: "57px",
                  borderRadius: "26px 0 0 0"
                }}
              >
                {/* {i18n["myProfile.save"]} */}
                save & exit
              </Button>
              <Button
                onClick={onSaveProfile}
                variant="contained"
                color="redButton100"
                sx={{
                  width: "225px",
                  height: "57px",
                  borderRadius: "0 26px 0 0 "
                }}
              >
                {/* {i18n["myProfile.save"]} */}
                go to CV
              </Button>
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
          title={i18n["myProfile.moveAndScale"]}
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
              // height: "20%",
              display: "flex",
              paddingTop: 2,
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingTop: 2,
            }}
          >
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
              {i18n["myProfile.cancel"]}
            </Button>
            <Button
              onClick={handleImageEdit}
              disableElevation
              variant="contained"
              color="redButton"
              sx={{ width: "130px" }}
            >
              {i18n["myProfile.upload"]}
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
      <AddNewCompany show={openAddCompanyDialog} handleOpen={handleOpenCompanyDialog}/>
    </Box>
  );
}
