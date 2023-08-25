import { Box, Tooltip, Typography } from "@mui/material";
import React from "react";
import location from "../../../../assets/Red_Location.svg";
import experienceLogo from "../../../../assets/Yellow_Pending.svg";
import education from "../../../../assets/Red_Education.svg";
import noticePeriod from "../../../../assets/Green_Notice_Period.svg";

export default function BasicInfo({
  town,
  region,
  experience,
  educationInfo,
  notice,
}) {
  return (
    <>
      <Box sx={{ marginLeft: "54px" }}>
        <Box
          sx={{
            width: "100%",
            height: "fit-content",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            ml: 2,
          }}
        >
          <Box
            component="img"
            sx={{
              width: 25,
            }}
            alt="location"
            src={location}
          />
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.25px",
            }}
          >
            {town}, {region}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "fit-content",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            ml: 2,
          }}
        >
          <Box
            component="img"
            sx={{
              width: 25,
            }}
            alt="experience"
            src={experienceLogo}
          />
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.25px",
            }}
          >
            {experience} years
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            // minHeight: "40px",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            ml: 2,
          }}
        >
          <Box
            component="img"
            sx={{
              width: 25,
            }}
            alt="education"
            src={education}
          />
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.25px",
              width: "170px",
            }}
          >
            {educationInfo}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "fit-content",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            ml: 2,
          }}
        >
          <Box
            component="img"
            sx={{
              width: 25,
            }}
            alt="noticePeriod"
            src={noticePeriod}
          />
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.25px",
            }}
          >
            {notice}
          </Typography>
        </Box>
      </Box>
    </>
  );
}
