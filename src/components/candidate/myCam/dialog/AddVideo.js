import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Paper, Typography, useTheme } from "@mui/material";
import greenDiamond from "../../../../assets/Characters/Green_Diamond.svg";
import UploadIcon from "../../../../assets/Padding Excluded/Black_Upload.svg";
import { Videocam } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import {
  getMyCamVideo,
  uploadMyCamVideo,
} from "../../../../redux/candidate/candidateJobs";
import { setAlert } from "../../../../redux/configSlice";
import { ALERT_TYPE } from "../../../../utils/Constants";

const AddVideo = ({ nextStep }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const hiddenFileInput = useRef(null);
  const fileAccept = "video/*";
  const [videoLink, setVideoLink] = useState(null);
  const VideoRef = useRef(null);

  const handleFileChange = async (event) => {
    console.log(event.target.files[0]);

    if (event.target.files[0].size > 100000000) {
      console.log("error");
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: "Video size should be less than 100MB",
        })
      );
      return;
    }
    const formData = new FormData();
    formData.append("cam", event.target.files[0]);
    console.log(formData);
    try {
      const { payload } = await dispatch(uploadMyCamVideo(formData));
      if (payload?.status === "success") {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Video uploaded Successfully!",
          })
        );
        // await getVideo()
        setVideoLink(URL.createObjectURL(event.target.files[0]));
        VideoRef.current.load();
      } else {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.ERROR,
            msg: "Failed to upload Video",
          })
        );
      }
    } catch (error) {
      dispatch(setAlert({ show: true }));
    }
  };
  const handleFileClick = () => {
    hiddenFileInput.current.click();
  };

  const getVideo = async () => {
    const { payload } = await dispatch(getMyCamVideo());
    console.log(payload);
    if (payload?.status === "success") {
      console.log(payload);
      setVideoLink(payload?.data?.cam_url);
    } else {
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: "No video",
        })
      );
    }
  };
  useEffect(() => {
    getVideo();
  }, []);

  return (
    <Paper
      sx={{
        padding: 3,
        paddingBottom: 0,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        justifyContent: "space-between",
        height: "30rem",
      }}
    >
      <Box
        sx={{
          background: theme.palette.mainBackground,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "15px",
          flexGrow: 1,
        }}
      >
        <Box
          component={"img"}
          src={greenDiamond}
          sx={{ width: 150, height: 100 }}
        />
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 700,
          }}
        >
          Add a new Crayon Cam video
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "14px",
            fontWeight: 700,
          }}
        >
          Record or upload a 1min video about who are and what makes you a<br />{" "}
          competitive candidate
        </Typography>
        {/* <VideoSection link={videoLink}/> */}
        {videoLink && (
          <video
            ref={VideoRef}
            autoPlay={false}
            muted
            poster=""
            style={{
              width: "40%",
              height: "auto",
            }}
            controls
          >
            <source src={videoLink} type="video/mp4" />
          </video>
        )}
      </Box>
      <Box>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "20px",
            fontWeight: 700,
          }}
        >
          Remember to just be you!
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "14px",
            fontWeight: 700,
          }}
        >
          Highlight ypur skills, the tools you use and what the next steps in
          your
          <br /> career would be
        </Typography>
      </Box>
      <Box
        sx={{
          margin: "auto",
          width: "80%",
        }}
      >
        <Button
          variant="contained"
          color="blueButton700"
          sx={{
            borderRadius: 0,
            width: "50%",
            height: "47px",
            borderTopLeftRadius: 25,
          }}
          startIcon={<Videocam />}
          onClick={() => nextStep(2)}
        >
          Record Video
        </Button>
        <input
          accept={fileAccept}
          ref={hiddenFileInput}
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <Button
          variant="contained"
          color="yellowButton100"
          sx={{
            borderRadius: 0,
            width: "50%",
            height: "47px",
            borderTopRightRadius: 25,
          }}
          startIcon={
            <Box component={"img"} src={UploadIcon} sx={{ height: 15 }} />
          }
          onClick={handleFileClick}
        >
          {/* {i18n["topBar.join"]} */}
          Upload Video
        </Button>
      </Box>
    </Paper>
  );
};

export default AddVideo;
