import { Box, Tooltip, Typography } from "@mui/material";
import React from "react";
import location from "../../../../assets/Red_Location.svg";
import salary from "../../../../assets/Blue_Salary.svg";
import date from "../../../../assets/Green_Notice_Period.svg";
import pending from "../../../../assets/Yellow_Pending.svg";
import SmallButton from "../../../common/SmallButton";
import { formatCurrencyWithCommas } from "../../../../utils/Currency";
import { dateConverterFullMonth } from "../../../../utils/DateTime";
import { useTheme } from "@emotion/react";

export default function CardsTopBar({ jobDetail }) {
  const theme = useTheme();

  const renderColor = (column) => {
    console.log(column);
    switch (column) {
      case "incomplete":
        return "manageIncomplete";
      case "matched":
        return "manageMatched";
      case "considering":
        return "manageConsidering";
      case "shortlist":
        return "manageShortlist";
      case "interview":
        return "manageInterview";
      case "assessment":
        return "manageAssesment";
      case "hired":
        return "manageHired";
      case "rejected":
        return "manageRejected";
      case "review":
        return "manageReview";
      case "offer":
        return "manageOffer";
      default:
        return "orangeButton";
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "325px",
          marginLeft: "8px",
          justifyContent: "space-between",
          marginTop: "15px",
        }}
      >
        <Tooltip arrow title={jobDetail?.title} placement="top">
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
            {jobDetail?.title}
          </Typography>
        </Tooltip>
        <SmallButton
          backgroundColor={
            theme.manageTalent[renderColor(jobDetail?.stage?.name)]?.main
          }
          label={jobDetail?.stage?.name}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "fit-content",
          gap: "30px",
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
              marginLeft: "6px",
              fontSize: 13,
              letterSpacing: "0.25px",
            }}
          >
            {jobDetail?.salary?.currency?.symbol}
            {formatCurrencyWithCommas(jobDetail?.salary?.max)} per month
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
              marginLeft: "6px",
              fontSize: 13,
              letterSpacing: "0.25px",
            }}
          >
            {jobDetail?.experience?.year_start} to{" "}
            {jobDetail?.experience?.year_end} years
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
              marginLeft: "6px",
              fontSize: 13,
              letterSpacing: "0.25px",
            }}
          >
            {jobDetail?.town?.name}, {jobDetail?.town?.region?.name}
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
              marginLeft: "6px",
              fontSize: 13,
              letterSpacing: "0.25px",
            }}
          >
            {dateConverterFullMonth(jobDetail?.created_at)}
          </Typography>
        </Box>
      </Box>
    </>
  );
}
