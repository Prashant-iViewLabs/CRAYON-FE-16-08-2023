import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import yellowStar from "../../../../assets/Characters/Yellow_Star.svg";
import { useNavigate } from "react-router-dom";

export default function SaveAndExit({ show, handleOpen, changeStep }) {
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
          src={yellowStar}
          sx={{ width: 170, height: 100, paddingTop: 3, margin: "auto" }}
        />
        <Typography
          sx={{
            fontSize: "25px",
            fontWeight: 700,
            paddingX: 3,
          }}
        >
          You're a rockstar!
        </Typography>
        <Typography
          sx={{
            fontSize: "17px",
            fontWeight: 700,
            paddingX: 3,
          }}
        >
          Check out your Crayon Vitae and choose your <br /> favourite template
          to export!
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
            onClick={() => changeStep(4)}
          >
            view my CV
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
