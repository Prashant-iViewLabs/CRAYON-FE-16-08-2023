import { useTheme } from "@emotion/react";
import { Box, Button } from "@mui/material";
import React from "react";

const TrackButtonLayout = ({ colorPattern, job }) => {
  const theme = useTheme();
  console.log(job);
  return (
    <Box
      sx={{
        display: "flex",
        paddingTop: 1,
        gap: 0.2,
      }}
    >
      <Button
        variant="contained"
        color={"lightGreenButton300"}
        sx={{
          height: "6px",
          minWidth: 10,
          padding: "0px",
          borderRadius: "5px 0 0 5px",
        }}
      ></Button>
      <Button
        variant="contained"
        color={job?.profileCompleted ? "lightGreenButton300" : "grayButton400"}
        sx={{
          height: "6px",
          minWidth: 10,
          padding: "0px",
          borderRadius: 0,
        }}
      ></Button>
      <Button
        variant="contained"
        color={job?.cvCompleted ? "lightGreenButton300" : "grayButton400"}
        sx={{
          height: "6px",
          minWidth: 10,
          borderRadius: 0,
          padding: "0px",
        }}
      ></Button>
      <Button
        variant="contained"
        color={"grayButton400"}
        sx={{
          height: "6px",
          minWidth: 10,
          padding: "0px",
          borderRadius: "0 5px 5px 0",
        }}
      ></Button>
    </Box>
  );
};

export default TrackButtonLayout;
