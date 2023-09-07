import { Box, Button, Paper, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import greenDiamond from "../../../../assets/Characters/Green_Diamond.svg";
import { RadioButtonChecked } from "@mui/icons-material";

const RecordingInProgress = ({ nextStep }) => {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        width: "100%",
        padding: 3,
        paddingBottom: 0,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        height: "35rem",
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
        <RadioButtonChecked />
        <Box
          component={"img"}
          src={greenDiamond}
          sx={{ width: 180, height: 180, paddingTop: 3, margin: "auto" }}
        />
      </Box>
      <Box>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "20px",
            fontWeight: 700,
          }}
        >
          Recording in Progress
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "14px",
            fontWeight: 700,
            marginBottom: 3,
          }}
        >
          Click Stop to complete Recording
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
          color="redButton100"
          sx={{
            borderRadius: 0,
            width: "100%",
            height: "47px",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}
          startIcon={
            <Box
              sx={{
                background: "white",
                height: 15,
                width: 15,
                borderRadius: 1,
              }}
            />
          }
          onClick={() => nextStep(4)}
        >
          Stop Recording
        </Button>
      </Box>
    </Paper>
  );
};

export default RecordingInProgress;
