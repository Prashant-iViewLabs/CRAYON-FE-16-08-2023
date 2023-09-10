import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import SmallButton from "../../../common/SmallButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function VideoDialog({ handleOpen }) {
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
          Video:
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
      <Box sx={{ display: "flex", pt: 1 }}>
        <SmallButton
          color={"eyeview"}
          startIcon={<PlayArrowIcon />}
          padding={0}
          justifyContent={"flex-end"}
          borderRadius={50}
          // startIconMargin="4px"
          // margin="auto"
          height={31}
          width={33}
          fontWeight={700}
        />
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "14px",
            marginLeft: "16px !important",
            margin: "auto",
          }}
        >
          Crayon Cam
        </Typography>
      </Box>
      <Box sx={{ display: "flex", pt: 1 }}>
        <SmallButton
          color={"eyeview"}
          startIcon={<PlayArrowIcon />}
          padding={0}
          justifyContent={"flex-end"}
          borderRadius={50}
          // startIconMargin="4px"
          // margin="auto"
          height={31}
          width={33}
          fontWeight={700}
        />
        <Typography
          sx={{
            fontWeight: 700,
            marginLeft: "16px !important",
            margin: "auto",
            fontSize: "14px",
          }}
        >
          Application Video
        </Typography>
      </Box>
    </Box>
  );
}
