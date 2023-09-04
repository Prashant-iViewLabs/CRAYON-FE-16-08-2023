import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import locale from "../../../i18n/locale";
import InputBox from "../../common/InputBox";
import { getIndustries } from "../../../redux/employer/empProfileSlice";
import { getCompanies } from "../../../redux/employer/empProfileSlice";
import { setAlert } from "../../../redux/configSlice";
import { ALERT_TYPE, ERROR_MSG } from "../../../utils/Constants";
import { useTheme } from "@emotion/react";
import AutoComplete from "../../common/AutoComplete";
import { setLoading } from "../../../redux/configSlice";
import { addId } from "../../../utils/Common";
import { isEmpty } from "lodash";
import { Button, Slider } from "@mui/material";
import CustomDialog from "../../common/CustomDialog";
import Cropper from "react-easy-crop";
import ZoomOutIcon from "@mui/icons-material/Remove";
import ZoomInIcon from "@mui/icons-material/Add";
import { uploadCompanyLogo } from "../../../redux/candidate/myProfileSlice";
import getCroppedImg from "../../../utils/cropImage";

const PROFILE = {
  name: "",
  website: "",
  description: "",
  industry_ids: [],
};

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 25,
  boxShadow: "-1px 3px 8px rgba(0, 0, 0, 0.1)",
  height: "32px",
}));
// const WORD_LIMIT = 30;

export default function Info({
  handleCompanyInfoData,
  profile2,
  errors,
  companies,
  industries,
}) {
  const i18n = locale.en;
  const theme = useTheme();
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState(profile2);
  const [image, setImage] = useState([]);
  const hiddenFileInput = useRef(null);
  const [openEditImage, setOpenEditImage] = useState(false);
  const [imagePreview, setImagePreview] = useState([]);
  const [imageName, setImageName] = useState("My pic");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // const [wordLimitExceed, setWordLimitExceed] = useState(false);

  useEffect(() => {
    handleCompanyInfoData(profile2);
  }, []);
  useEffect(() => {
    if (!isEmpty(profile2)) {
      setProfileData(profile2);
    }
  }, [profile2]);

  const getIndValue = () => {
    if (profileData.industry_ids?.length == 0) {
      return [];
    }
    return profileData.industry_ids?.map(
      (industry) => industries?.find((ind) => ind.id == industry) || industry
    );
  };
  const getCompValue = () => {
    if (!profileData.name) {
      return;
    }
    return profileData.name;
  };

  const handleInputChange = (event) => {
    const newProfileData = {
      ...profileData,
      [event.target.id]: event.target.value,
    };
    setProfileData(newProfileData);
    handleCompanyInfoData(newProfileData);
  };

  const handleMultipleAutoComplete = (event, newValue, id) => {
    let newProfileData = {};
    newProfileData = {
      ...profileData,
      [id]: newValue.map((val) => val?.inputValue || val?.id || val),
    };
    setProfileData(newProfileData);
    handleCompanyInfoData(newProfileData);
  };
  const handleCompVal = (event, newValue, id) => {
    let newProfileData = {};
    newProfileData = {
      ...profileData,
      [id]: newValue?.inputValue || newValue?.company_id,
    };
    setProfileData(newProfileData);
    handleCompanyInfoData(newProfileData);
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

  const handleImageClick = () => {
    setImagePreview(null);
    hiddenFileInput.current.click();
  };

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

  const handleCompanyLogo = useCallback(
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

      formData.append("company-logo", blobTofile);

      try {
        const { payload } = await dispatch(uploadCompanyLogo(formData));
        if (payload?.status === "success") {
          setImage(URL.createObjectURL(croppedImage));
          setOpenEditImage(false);

          dispatch(
            setAlert({
              show: true,
              type: ALERT_TYPE.SUCCESS,
              msg: "Company logo uploaded Successfully!",
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

  const renderFooter = <></>;

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ width: "47%", mb: 3 }}>
          <Typography sx={{ ml: 2, marginBottom: "4px" }}>
            {i18n["empMyProfile.companyName"]}
          </Typography>
          {/* <InputBox placeholder={i18n['empMyProfile.companyNamePlace']} value={profileData.name} id='name' onChange={handleInputChange} /> */}
          <AutoComplete
            showAddOption={true}
            allowCustomInput={true}
            id="company_name"
            // value={getCompValue()}
            value={
              companies?.find(
                (title) => title.company_id == profileData?.company_name
              ) || profileData?.company_name
            }
            onChange={handleCompVal}
            placeholder={i18n["empMyProfile.companyNamePlace"]}
            data={companies}
          ></AutoComplete>
          {!companies?.find(
            (title) => title.company_id == profileData?.company_name
          ) &&
            !profileData?.company_name &&
            errors?.find((error) => error.key == "company_name") && (
              <Typography color={"red !important"}>
                {`*${
                  errors?.find((error) => error.key == "company_name").message
                }`}
              </Typography>
            )}
        </Box>
        <Box sx={{ width: "47%" }}>
          <Typography sx={{ ml: 2, marginBottom: "4px" }}>
            {i18n["empMyProfile.companyWebsite"]}
          </Typography>
          <InputBox
            placeholder={i18n["empMyProfile.companyWebsitePlace"]}
            value={profileData.hyperlink}
            id="hyperlink"
            onChange={handleInputChange}
          />
          {(profileData.hyperlink === null ||
            profileData.hyperlink === "" ||
            (profileData.hyperlink &&
              !profileData.hyperlink.startsWith("http"))) &&
            errors?.find((error) => error.key == "hyperlink") && (
              <Typography color={"red !important"}>
                {`*${
                  errors?.find((error) => error.key == "hyperlink").message
                }`}
              </Typography>
            )}
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ width: "47%", mb: 3 }}>
          <Typography sx={{ ml: 2, marginBottom: "4px" }}>
            {i18n["empMyProfile.companyIndustry"]}
          </Typography>
          <AutoComplete
            multiple={true}
            id="industry_ids"
            value={getIndValue()}
            onChange={handleMultipleAutoComplete}
            sx={{ width: "100%", display: "inline-table" }}
            placeholder={i18n["myCV.preferredIndustries"]}
            data={industries}
            allowCustomInput={false}
          ></AutoComplete>
          {getIndValue() == "" &&
            errors?.find((error) => error.key == "industry_ids") && (
              <Typography color={"red !important"}>
                {`*${
                  errors?.find((error) => error.key == "industry_ids").message
                }`}
              </Typography>
            )}
        </Box>
        <Box sx={{ width: "47%", mb: 3 }}>
          <Typography sx={{ ml: 2, marginBottom: "4px" }}>
            {"Company Logo"}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <Box
              component="img"
              alt="upload profile"
              src={image?.length > 0 ? image : profileData?.company_logo_url}
              // src={
              //   profile?.profile_url !== "No URL"
              //     ? profile?.profile_url
              //     : companyLogo
              // }
              sx={{
                height: "96px",
                width: "96px",
                borderRadius: "10px",
              }}
            />
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
                flexDirection: "column",
                justifyContent: "space-between",
                marginTop: "10px",
                marginLeft: "24px",
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
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ width: "100%" }}>
          <Typography sx={{ ml: 2, marginBottom: "4px" }}>
            {i18n["empMyProfile.companyDescription"]}
          </Typography>
          <InputBox
            multiline={true}
            sx={{ height: "135px" }}
            placeholder={i18n["empMyProfile.companyDescriptionPlace"]}
            value={profileData.notes}
            id="notes"
            onChange={handleInputChange}
          />
          {(profileData.notes === "" || profileData.notes === null) &&
            errors?.find((error) => error.key == "notes") && (
              <Typography color={"red !important"}>
                {`*${errors?.find((error) => error.key == "notes").message}`}
              </Typography>
            )}
        </Box>
      </Box>

      <CustomDialog
        dialogWidth="md"
        show={openEditImage}
        onDialogClose={() => {
          setImageName("My pic");
          setOpenEditImage(false);
        }}
        // title={i18n["myProfile.moveAndScale"]}
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
            onClick={handleCompanyLogo}
            disableElevation
            variant="contained"
            color="redButton"
            sx={{ width: "130px" }}
          >
            {i18n["myProfile.upload"]}
          </Button>
        </Box>
      </CustomDialog>
    </Box>
  );
}
