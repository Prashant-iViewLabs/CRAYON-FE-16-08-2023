import { Box } from "@mui/material";
import React from "react";

import profile_challenger from "../../../../assets/Profile Icons_Challenger.svg";
import profile_character from "../../../../assets/Profile Icons_Charater.svg";
import profile_collaborator from "../../../../assets/Profile Icons_Collaborator.svg";
import profile_contemplator from "../../../../assets/Profile Icons_Contemplator.svg";
import SingleRadialChart from "../../../common/SingleRadialChart";
import { useTheme } from "@emotion/react";

export default function CandidateFlipCircles(
  shadow,
  primary,
  gritScore,
  index
) {
  const theme = useTheme();
  console.log(index);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "fit-content",
        //   marginLeft: "10px",
      }}
    >
      {console.log(primary)}
      {console.log(shadow.shadow)}
      {console.log(shadow.primary)}
      {console.log(shadow.gritScore)}
      {shadow.primary !== undefined ? (
        <Box
          sx={{ margin: "0 -8px 8px -8px" }}
          component="img"
          height={55}
          alt="Primary personality"
          src={
            (shadow.primary === "collaborator" && profile_collaborator) ||
            (shadow.primary === "challenger" && profile_challenger) ||
            (shadow.primary === "character" && profile_character) ||
            (shadow.primary === "contemplator" && profile_contemplator)
          }
        />
      ) : (
        <Box sx={{ margin: "0 -8px 8px -8px" }} height={55} />
      )}
      {/* </Box> */}
      {shadow.shadow !== undefined ? (
        <Box
          sx={{ margin: "0 -8px 8px -8px" }}
          component="img"
          height={55}
          alt="Shadow personality"
          src={
            (shadow.shadow === "collaborator" && profile_collaborator) ||
            (shadow.shadow === "challenger" && profile_challenger) ||
            (shadow.shadow === "character" && profile_character) ||
            (shadow.shadow === "contemplator" && profile_contemplator)
          }
        />
      ) : (
        <Box sx={{ margin: "0 -8px 8px -8px" }} height={55} />
      )}
      <Box sx={{ margin: "-8px" }}>
        <SingleRadialChart
          hollow="55%"
          nameSize="9px"
          valueSize="14px"
          nameOffsetY="11"
          valueOffsetY="-17"
          labelsData={"grit score"}
          series={[shadow.gritScore]}
          width={80}
          height={80}
          color={theme.palette.traitsButton.main}
          index={shadow.index}
          isHovered={false}
          name={"gritScore"}
        />
      </Box>
    </Box>
  );
}
