import React, { useRef, useState } from 'react'
import { Box, Button, Dialog, DialogTitle, IconButton, Typography } from '@mui/material';

import blueHalfSmile from "../../../../assets/Characters/Blue_Half_Circle_Smile.svg";
import yellowStar from "../../../../assets/Characters/Yellow_Star.svg";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  uploadSpecData,
} from "../../../../redux/employer/postJobSlice";

import { setAlert } from "../../../../redux/configSlice";
import { ALERT_TYPE } from "../../../../utils/Constants";

const JobPostingDialog = ({ show, saveFunc, handleOpen }) => {
  const [openFinalStep, setOpenFinalStep] = useState(false)
  const [specName, setspecName] = useState("No file chosen");

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { jobId } = useParams();
  const hiddenFileInput = useRef(null);

  const fileAccept = "application/pdf, application/doc, application/docx";

  const handleFileChange = async (event) => {
    const formData = new FormData();
    formData.append("jobspec", event.target.files[0]);
    formData.append("job_id", jobId);
    try {
      const { payload } = await dispatch(uploadSpecData(formData));
      if (payload?.status === "success") {
        setspecName(event.target.files[0].name);
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Spec uploaded Successfully!",
          })
        );
        handleNoThanks()
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

  const handleFinalStepDialog = () => {
    setOpenFinalStep(prevState => !prevState)
  }

  const handleNoThanks = () => {
    handleOpen()
    handleFinalStepDialog()
  }
  const handleFileClick = () => {
    hiddenFileInput.current.click();
  };

  return (
    <>
      <Dialog open={show} hideButton={false} maxWidth="xs" showFooter={false}>

        <DialogTitle onClose={handleOpen}>
          <IconButton
            aria-label="close"
            onClick={() => {
              handleOpen();
            }}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Box
              sx={{
                width: "20px",
                height: "20px",
                color: "#000000",
                border: 2,
                fontSize: "18px",
                borderRadius: "5px",
              }}
            >
              X
            </Box>
          </IconButton>
        </DialogTitle>

        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Box
            component={"img"}
            src={blueHalfSmile}
            sx={{ width: 170, height: 100, paddingTop: 3, margin: "auto" }}
          />
          <Typography
            sx={{
              fontSize: "25px",
              fontWeight: 700,
              paddingX: 3,
            }}
          >
            R-E-SPEC-T… find out what <br />this means to me!
          </Typography>
          <Typography
            sx={{
              fontSize: "17px",
              fontWeight: 700,
              paddingX: 3,
            }}
          >
            Would you like to attach your original job spec in case there is any additional info or requirements we should be aware of?
          </Typography>
          <Box>
            <Button
              variant="contained"
              color="grayButton100"
              sx={{
                borderRadius: 0,
                width: "50%",
                height: "57px",
              }}
              onClick={handleNoThanks}
            >
              No thanks
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
              sx={{
                borderRadius: 0,
                width: "50%",
                height: "57px",
              }}
              color="redButton"
              onClick={handleFileClick}
            // onClick={() => navigate("/candidate/my-cv")}
            >
              {/* {i18n["topBar.join"]} */}
              upload spec
            </Button>
          </Box>
        </Box>
      </Dialog>
      <Dialog open={openFinalStep} maxWidth="xs" showFooter={false}>
        <DialogTitle onClose={handleOpen}>
          <IconButton
            aria-label="close"
            onClick={() => {
              handleFinalStepDialog();
            }}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Box
              sx={{
                width: "20px",
                height: "20px",
                color: "#000000",
                border: 2,
                fontSize: "18px",
                borderRadius: "5px",
              }}
            >
              X
            </Box>
          </IconButton>
        </DialogTitle>
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Box
            component={"img"}
            src={yellowStar}
            sx={{ width: 170, height: 100, paddingTop: 3, margin: "auto" }}
          />
          <Typography
            sx={{
              fontSize: "25px",
              fontWeight: 700,
              paddingX: 3,
            }}
          >Let the magic begin!
          </Typography>
          <Typography
            sx={{
              fontSize: "17px",
              fontWeight: 700,
              paddingX: 2,
            }}
          >
            Your job has been posted!<br /> The Crayon team will review and activate it shortly.
          </Typography>
          <Box>
            <Button
              variant="contained"
              color="grayButton100"
              sx={{
                borderRadius: 0,
                width: "50%",
                height: "57px",
              }}
              onClick={() => saveFunc("/employer/my-jobs")}
            >
              Preview Job
            </Button>

            <Button
              variant="contained"
              sx={{
                borderRadius: 0,
                width: "50%",
                height: "57px",
              }}
              color="redButton"

            onClick={() => saveFunc(`/employer/manage-talent/${jobId}`)} 
            >
              {/* {i18n["topBar.join"]} */}
              go to my jobs
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>

  )
}

export default JobPostingDialog