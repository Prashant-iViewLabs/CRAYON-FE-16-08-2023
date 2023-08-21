import * as React from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

export default function MyTalents() {
  return (
    <Box>
      <Outlet />
    </Box>
  );
}
