import { Box, Button, Paper, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import greenDiamond from "../../../../assets/Characters/Green_Diamond.svg";
import CancelIcon from "../../../../assets/Padding Excluded/Black_Trash_Delete_2.svg";
import { Videocam } from "@mui/icons-material";

const CounterDialog = ({ nextStep }) => {
  const theme = useTheme();
  const [count, setCount] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      if (count > 1) {
        setCount(count - 1);
      } else {
        nextStep(3);
      }
    }, 1000); // Decrease count every 1000 milliseconds (1 second)

    return () => clearInterval(interval); // Cleanup when component unmounts
  }, [count]);
  const getColor = (number) => {
    switch (number) {
      case 1:
        return theme.palette.greenButton200.main;
      case 2:
        return theme.palette.redButton.main;
      case 3:
        return theme.palette.blueButton700.main;
      case 4:
        return theme.palette.yellowButton200.main;
      case 5:
        return theme.palette.greenButton200.main;

      default:
        return null;
    }
  };
  return (
    <Paper
      sx={{
        // width: "100%",
        padding: 3,
        paddingBottom: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
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
          justifyContent: "center",
          borderRadius: "15px",
          marginBottom: 2,
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
            fontSize: 100,
            fontWeight: "Bold",
            lineHeight: 1,
          }}
          color={getColor(count)}
        >
          {count}
        </Typography>
      </Box>
      <Box>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "20px",
            fontWeight: 700,
          }}
        >
          Getting Ready...
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "14px",
            fontWeight: 700,
            marginBottom: 3,
          }}
        >
          Recording Starts after the countdown!
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
            <Box component={"img"} src={CancelIcon} sx={{ height: 15 }} />
          }
          onClick={() => nextStep(1)}
        >
          Cancel
        </Button>
      </Box>
    </Paper>
  );
};

export default CounterDialog;
