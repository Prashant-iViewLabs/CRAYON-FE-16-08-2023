import { Box, Button, Paper, Typography, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import YellowStar from "../../../../assets/Characters/Yellow_Star.svg";
import Delete from "./Delete";
import { uploadMyCamVideo } from "../../../../redux/candidate/candidateJobs";
import { setAlert } from "../../../../redux/configSlice";
import { ALERT_TYPE } from "../../../../utils/Constants";
import { useDispatch } from "react-redux";

const PublishVideo = ({ videoData, nextStep }) => {
  const theme = useTheme();
  const dispatch = useDispatch()
  const VideoRef = useRef(null)
  const [reviewVideo, setReviewVideo] = useState(false)

  const [openDelete, setOpenDelete] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [videoLink, setVideoLink] = useState("")
  useEffect(() => {
    if (videoData) {
      const link = URL.createObjectURL(videoData);
      setVideoLink(link);
    }
  }, [videoData]);
  console.log(videoData)
  const handleOpenDelete = () => {
    setOpenDelete((prevState) => !prevState);
    setConfirmDelete(false);
  };
  const handleCancelDelete = () => {
    setOpenDelete((prevState) => !prevState);
    setConfirmDelete(false);
  }

  const handleDeleteVideo = () => {
    nextStep(1)
    handleCancelDelete()

  }
  const handleReview = () => {
    setReviewVideo(true)
  }

  const uploadVideo = async () => {
    const myFile = new File([videoData], 'videoFile.webm', {
      type: videoData.type,
    });
    console.log(myFile)
    const formData = new FormData();
    formData.append("cam", myFile);
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
        nextStep(1)
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
  }
  return (
    <>
      <Paper
        sx={{
          width: "100%",
          padding: 3,
          paddingBottom: 0,
          display: "flex",
          flexDirection: "column",
          height: "30rem",
          gap: 3,
        }}
      >
        <Box
          sx={{
            background: theme.palette.mainBackground,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "15px",
            marginBottom: 2,
            gap: 2,
            flexGrow: 1,
          }}
        >
          {reviewVideo ? (
            <video
              ref={VideoRef}
              autoPlay={false}
              poster=""
              style={{
                width: "60%",
                height: "auto",
              }}
              src={videoLink}
              type="video/mp4"
              controls
            >
            </video>)
            :
            (
              <Box
                component={"img"}
                src={YellowStar}
                sx={{ width: 200, height: 200, paddingTop: 3, margin: "auto" }}
              />
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
            A star performance!
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "14px",
              fontWeight: 700,
              marginBottom: 3,
            }}
          >
            Review, delete or publish your video now.
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
            color="grayButton200"
            sx={{
              borderRadius: 0,
              width: "33.33%",
              height: "47px",
              borderTopLeftRadius: 25,
            }}
            onClick={handleReview}
          >
            review
          </Button>
          <Button
            variant="contained"
            color="redButton100"
            sx={{
              borderRadius: 0,
              width: "33.33%",
              height: "47px",
            }}
            onClick={handleOpenDelete}
          >
            delete
          </Button>
          <Button
            variant="contained"
            color="greenButton200"
            sx={{
              borderRadius: 0,
              width: "33.33%",
              height: "47px",
              borderTopRightRadius: 25,
            }}
            onClick={uploadVideo}
          >
            publish
          </Button>
        </Box>
      </Paper>
      <Delete
        show={openDelete}
        handleOpen={handleOpenDelete}
        handleCancel={handleCancelDelete}
        handleDelete={handleDeleteVideo}
        confirmDelete={confirmDelete}
        setConfirmDelete={setConfirmDelete}
      />
    </>
  );
};

export default PublishVideo;
