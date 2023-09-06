import React from "react";
import { Box, Button, Typography } from "@mui/material";
import SingleRadialChart from "../../common/SingleRadialChart";

const TrackButton = ({ theme, closeFunc }) => {
  const getColor = (value) => {
    if (value < 5) {
      return theme.palette.chart.red
    }else 
    if (value < 20) {
      return theme.palette.chart.yellow
    }
    else{
      return theme.palette.chart.green200
    }
  }
  return (
    <Box
      sx={{
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          padding: 2,
          paddingBottom: 0,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          height: "372px",
        }}
      >
        <Typography
          sx={{
            fontSize: "0.8rem",
            textAlign: "justify",
            color: "gray",
            fontWeight: 700,
          }}
        >
          Each new job is
          <span style={{ color: theme.palette.chart.red }}>
            {" "}
            valid for 30 days.
          </span>{" "}
          At the end of the 30-day period, you'll need to extend the job at the
          cost of
          <span style={{ color: theme.palette.chart.yellow }}> 1 credit</span>.
        </Typography>
        <Box>
          <Typography
            sx={{
              fontWeight: 600,
            }}
          >
            total days remaining
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <SingleRadialChart
              labelsData={"days left"}
              series={[6]}
              width={140}
              color={getColor(6)}
              // index={index}
              isHovered={true}
            />
          </Box>
        </Box>
        <Box>
          <Typography
            sx={{
              fontWeight: 600,
            }}
          >
            total credit remaining
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <SingleRadialChart
              labelsData={"credits left"}
              series={[35]}
              width={140}
              color={theme.palette.chart.green200}
              isHovered={true}
            />
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: "flex", width: "100%" }}>
        <Button
          variant="contained"
          color="grayButton200"
          sx={{
            borderRadius: "0 0 0 20px",
            width: "33.33%",
            paddingY: "25px",
            fontSize: "10px"
          }}
          onClick={() => closeFunc(false)}
        >
          back
        </Button>
        <Button
          variant="contained"
          color="yellowButton200"
          sx={{
            borderRadius: 0,
            width: "33.33%",
            paddingY: "25px",
            fontSize: "10px"
          }}
          onClick={() => closeFunc(false)}
        >
          buy credits
        </Button>
        <Button
          variant="contained"
          color="redButton100"
          sx={{
            borderRadius: "0 0 20px 0",
            width: "33.33%",
            paddingY: "25px",
            fontSize: "10px",
            overflow: "hidden",
          }}
          onClick={() => closeFunc(false)}
        >
          Extend job
        </Button>
      </Box>
    </Box>
  );
};

export default TrackButton;
