import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import blueHalfSmile from "../../../../assets/Characters/Blue_Half_Circle_Smile.svg";
import { useNavigate } from "react-router-dom";

export default function CompleteCV({
  show,
  handleOpen,
  setNextDialog,
  setsaveAndExitDialog,
}) {
  const navigate = useNavigate();
  return (
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
          We need more information please
        </Typography>
        <Typography
          sx={{
            fontSize: "17px",
            fontWeight: 700,
            paddingX: 3,
          }}
        >
          If you save and exit now we won’t have<br></br> enough information to
          to find you a job.
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
            onClick={() => navigate("/jobs")}
          >
            Search Jobs
          </Button>
          <Button
            variant="contained"
            sx={{
              borderRadius: 0,
              width: "50%",
              height: "57px",
            }}
            color="redButton"
            onClick={() => {
              setsaveAndExitDialog(false);
              setNextDialog(true);
            }}
          >
            {/* {i18n["topBar.join"]} */}
            Go to CV
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
