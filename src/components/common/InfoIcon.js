import { Typography } from "@mui/material";
import React from "react";

export default function InfoIcon() {
  return (
    <Typography
      sx={{
        padding: "5px",
        height: "8px",
        width: "8px",
        borderRadius: "5px",
        fontSize: "15px",
        /* text-align: center; */
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 900,
        border: 1,
        mr: 1,
      }}
    >
      i
    </Typography>
  );
}
