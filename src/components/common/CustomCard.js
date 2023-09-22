import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import locale from "../../i18n/locale";

const sxPaper = {
  mb: 2,
  border: "1px solid rgba(224, 224, 224, 0.75)",
  boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.03)",
  borderRadius: "25px",
  // padding: '10px 0',
  "&:hover": {
    cursor: "pointer",
    // boxShadow: 15, //'rgb(0 0 0 / 24%) 0px 12px 24px',
    transition: "1s ease",
  },
  height: "530px",
  overflow: "hidden",
  width: "100%",
  display:"flex",
  flexDirection: "column"
};
export default function CustomCard({
  children,
  handleMouseEnter,
  handleMouseLeave,
}) {
  const i18n = locale.en;
  const theme = useTheme();

  return (
    <Paper
      sx={sxPaper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Paper>
  );
}
