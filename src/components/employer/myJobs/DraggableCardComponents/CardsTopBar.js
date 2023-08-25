import { Box, Tooltip, Typography } from "@mui/material";
import React from "react";
import location from "../../../../assets/Red_Location.svg";
import salary from "../../../../assets/Blue_Salary.svg";
import date from "../../../../assets/Green_Notice_Period.svg";
import pending from "../../../../assets/Yellow_Pending.svg";
import SmallButton from "../../../common/SmallButton";

export default function CardsTopBar() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "325px",
          marginLeft: "8px",
          justifyContent: "space-between",
        }}
      >
        <Tooltip arrow title={"Lead Developer Online"} placement="top">
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
            }}
          >
            {"Lead Developer Online"}
          </Typography>
        </Tooltip>
        <SmallButton color="lightGreenButton300" label={"review"} />
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "800px",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            width: "fit-content",
            height: "fit-content",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginLeft: "4px",
          }}
        >
          <Box
            component="img"
            sx={{
              width: 25,
            }}
            alt="salary"
            src={salary}
          />
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.25px",
            }}
          >
            {"R"}
            {"75,000"} per month
          </Typography>
        </Box>
        <Box
          sx={{
            width: "fit-content",
            height: "fit-content",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            // marginLeft: "8px",
          }}
        >
          <Box
            component="img"
            sx={{
              width: 25,
            }}
            alt="experience"
            src={pending}
          />
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.25px",
            }}
          >
            {"3 to 5 year"}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "fit-content",
            height: "fit-content",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            // marginLeft: "8px",
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
            {"Cape Town"},{"South Africa"}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "fit-content",
            height: "fit-content",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            // marginLeft: "8px",
          }}
        >
          <Box
            component="img"
            sx={{
              width: 25,
            }}
            alt="date"
            src={date}
          />
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.25px",
            }}
          >
            {"1 September 2023"}
          </Typography>
        </Box>
      </Box>
    </>
  );
}
