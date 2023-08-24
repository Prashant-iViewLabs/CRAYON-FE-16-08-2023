import { Box, Grid } from "@mui/material";
import React from "react";
import { useTheme } from "@emotion/react";
import Slider from "../../../common/Slider";

import profile_challenger from "../../../../assets/Profile Icons_Challenger.svg";
import profile_character from "../../../../assets/Profile Icons_Charater.svg";
import profile_collaborator from "../../../../assets/Profile Icons_Collaborator.svg";
import profile_contemplator from "../../../../assets/Profile Icons_Contemplator.svg";
import SingleRadialChart from "../../../common/SingleRadialChart";

export default function CandidateFlipInfo({ primary, shadow, gritScore }) {
  const theme = useTheme();
  console.log(primary, shadow);
  return (
    <Grid sx={{ display: "flex" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "fit-content",
          //   marginLeft: "10px",
        }}
      >
        {primary !== undefined ? (
          <Box
            sx={{ margin: "0 -8px 8px -8px" }}
            component="img"
            height={55}
            alt="Primary personality"
            src={
              (primary === "collaborator" && profile_collaborator) ||
              (primary === "challenger" && profile_challenger) ||
              (primary === "character" && profile_character) ||
              (primary === "contemplator" && profile_contemplator)
            }
          />
        ) : null}
        {/* </Box> */}
        {shadow !== undefined ? (
          <Box
            sx={{ margin: "0 -8px 8px -8px" }}
            component="img"
            height={55}
            alt="Shadow personality"
            src={
              (shadow === "collaborator" && profile_collaborator) ||
              (shadow === "challenger" && profile_challenger) ||
              (shadow === "character" && profile_character) ||
              (shadow === "contemplator" && profile_contemplator)
            }
          />
        ) : null}
        <Box sx={{ margin: "-8px -8px 0 -8px" }}>
          <SingleRadialChart
            hollow="52%"
            nameSize="9px"
            valueSize="14px"
            nameOffsetY="11"
            valueOffsetY="-17"
            labelsData={"grit score"}
            series={[50]}
            width={86}
            color={theme.palette.chart.green200}
            index={1}
            isHovered={false}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Slider
          items={["full time", "accounts", "sales", "Numbers", "Credit"]}
          color={"yellowButton200"}
          theme={theme}
        />
        <Slider
          items={["xero", "excel", "SAP", "Pastel"]}
          theme={theme}
          color={"yellowButton100"}
        />
        <Slider
          items={[
            "organised",
            "detailed",
            "proactive",
            "thrives on stress",
            "adapatable",
          ]}
          theme={theme}
          color={"grayButton200"}
        />
      </Box>
    </Grid>
  );
}
