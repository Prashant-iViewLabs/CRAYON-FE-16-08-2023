import { Box, Slider, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";

const rangeMarks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 20,
    label: "20k",
  },
  {
    value: 40,
    label: "40k",
  },
  {
    value: 60,
    label: "60k",
  },
  {
    value: 80,
    label: "80k",
  },
  {
    value: 100,
    label: "100k+",
  },
];

const formatNumber = (num) => {
  if (num < 1000) {
    return num.toString();
  } else if (num < 1000000) {
    return (num / 1000).toFixed(0) + "k";
  } else {
    return (num / 1000000).toFixed(0) + "M";
  }
};

function rangeValueHandler(value) {
  return formatNumber(value * 1000);
}

export default function SalaryBox() {
  const [rangeValue, setRangeValue] = useState([0, 20]);

  const handleRangeSliderChange = (event, newValue) => {
    setRangeValue(newValue);
    // let newArr = newValue.map((val) => val * 1000);
    // const newBasicData = {
    //   ...basicData,
    //   [event.target.name]: newArr,
    // };
    // setBasicData(newBasicData);
  };

  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "500px",
        // py: 2,
      }}
    >
      <Typography sx={{ fontWeight: 500 }}>Range/Rate</Typography>
      <Slider
        disableSwap
        valueLabelDisplay="on"
        // disabled={!basicData.currency_id}
        name="salary"
        getAriaLabel={() => "Temperature range"}
        value={rangeValue}
        onChange={handleRangeSliderChange}
        color="redButton100"
        // step={basicData.job_role_type == "freelance" && 1}
        valueLabelFormat={rangeValueHandler}
        getAriaValueText={rangeValueHandler}
        marks={rangeMarks}
        sx={{
          marginTop: 4,
          width: "90%",
          ml: 1,
          "& .MuiSlider-rail": {
            backgroundColor: theme.palette.eyeview100.main,
            height: "10px",
          },
          "& .MuiSlider-track": {
            height: "10px",
          },
          "& .MuiSlider-thumb": {
            borderRadius: "15%",
            background: "white",
          },
          "& .MuiSlider-valueLabel": {
            fontSize: 12,
            fontWeight: "normal",
            top: -6,
            backgroundColor: theme.palette.grayBackground,
            borderRadius: 1,
            color: theme.palette.text.primary,
            "&:before": {
              display: "none",
            },
            "& *": {
              background: "transparent",
              color: theme.palette.mode === "dark" ? "#fff" : "#000",
            },
          },
        }}
      />
    </Box>
  );
}
