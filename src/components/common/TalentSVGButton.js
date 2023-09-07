import React from "react";
import SmallButton from "./SmallButton";
import { Box } from "@mui/material";

export default function TalentSVGButton({
  color,
  source,
  onClick,
  height,
  width,
  padding,
}) {
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
            height: height,
            width: width,
          }}
        />
      }
      padding={padding}
      justifyContent={"center"}
      borderRadius={50}
      //   startIconMargin="4px"
      // margin="auto"
      height={31}
      width={33}
      fontWeight={700}
    />
  );
}
