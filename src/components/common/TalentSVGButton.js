import React from "react";
import SmallButton from "./SmallButton";
import { Box } from "@mui/material";
import SmallButtonTalent from "./SmallButtonTalent";

export default function TalentSVGButton({
  color,
  source,
  onClick,
  height,
  width,
  padding,
  margin,
  startIconMargin,
  minWidth,
}) {
  return (
    <SmallButtonTalent
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
      minWidth={minWidth}
      padding={padding}
      justifyContent={"center"}
      borderRadius={50}
      //   startIconMargin="4px"
      // margin="auto"
      height={31}
      width={20}
      fontWeight={700}
      margin={margin}
      startIconMargin={startIconMargin}
    />
  );
}
