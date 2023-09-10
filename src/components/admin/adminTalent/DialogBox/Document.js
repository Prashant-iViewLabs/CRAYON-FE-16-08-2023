import { useTheme } from "@emotion/react";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import SVGButton from "../../../common/SVGButton";
import cv from "../../../../assets/Black_CV.svg";
import user from "../../../../assets/Black_User_Profile.svg";

export default function Document({ userID, cvLink, handleOpen }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        padding: "16px !important",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "14px",
          }}
        >
          Documents:
        </Typography>
        <IconButton
          aria-label="close"
          onClick={() => {
            handleOpen();
          }}
          sx={{
            position: "relative",
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Box
            sx={{
              width: "5px",
              height: "5px",
              color: "#000000",
              fontSize: "10px",
            }}
          >
            X
          </Box>
        </IconButton>
      </Box>
      <Link
        to={`/candidate-cv/${userID}`}
        target="_blank"
        style={{
          textDecoration: "none",
          color: theme.palette.black,
          cursor: "pointer",
        }}
      >
        <Box sx={{ display: "flex", pt: 1 }}>
          <SVGButton color={"redButton"} source={user} />
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "14px",
              marginLeft: "16px !important",
              margin: "auto",
            }}
          >
            Crayon Vitae
          </Typography>
        </Box>
      </Link>
      <Link
        // to={`${cvLink}`}
        target="_blank"
        style={{
          textDecoration: "none",
          color: theme.palette.black,
          cursor: "pointer",
        }}
      >
        <Box sx={{ display: "flex", pt: 1 }}>
          <SVGButton color={"redButton"} source={cv} />
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "14px",
              marginLeft: "16px !important",
              margin: "auto",
            }}
            // onClick={() => handleDownloadClick(cvLink)}
          >
            Original CV
          </Typography>
        </Box>
      </Link>
      <Box sx={{ display: "flex", pt: 1 }}>
        <SVGButton color={"redButton"} source={user} />
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "14px",
            marginLeft: "16px !important",
            margin: "auto",
          }}
        >
          Portfolio
        </Typography>
      </Box>
    </Box>
  );
}
