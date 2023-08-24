import React from "react";
import SmallButton from "./SmallButton";
import { Box } from "@mui/material";

export default function SVGButton({ color, source, onClick }) {
  return (
    <SmallButton
      onClick={onClick}
      color={color}
      startIcon={
        <Box
          component="img"
          className="eye"
          alt="logo"
          src={source}
          sx={{
            height: 26,
            width: 26,
          }}
        />
      }
      padding={0}
      justifyContent={"flex-end"}
      borderRadius={50}
      startIconMargin="4px"
      // margin="auto"
      height={31}
      width={33}
      fontWeight={700}
    />
  );
}
