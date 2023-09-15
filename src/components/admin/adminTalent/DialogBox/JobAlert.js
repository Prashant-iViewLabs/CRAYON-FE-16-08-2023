import { Box, Button, Grid, Slider, Switch, Typography } from "@mui/material";
import React, { useState } from "react";
import TalentSVGButton from "../../../common/TalentSVGButton";
import alert from "../../../../assets/Padding Excluded/Black_Alert_Red.svg";
import styled from "@emotion/styled";
import { alpha } from "@material-ui/core";
import SmallButton from "../../../common/SmallButton";
import locale from "../../../../i18n/locale";
import Slider2 from "../../../common/Slider2";
import { useTheme } from "@emotion/react";

const BlueSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: theme.palette.blueButton700.main,
    "&:hover": {
      backgroundColor: alpha(
        theme.palette.blueButton700.main,
        theme.palette.action.hoverOpacity
      ),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: theme.palette.blueButton700.main,
  },
  "& .MuiSwitch-track": {
    margin: "auto",
    height: "60% !important",
  },
  "& .MuiSwitch-thumb": {
    borderRadius: "15% !important",
  },
  "& .MuiButtonBase-root-MuiSwitch-switchBase": {
    borderRadius: "15% !important",
  },
  "& .MuiButtonBase-root": {
    padding: "9px !important",
  },
}));

const rangeMarks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 20,
    label: "20k",
  },
  {
    value: 40,
    label: "40k",
  },
  {
    value: 60,
    label: "60k",
  },
  {
    value: 80,
    label: "80k",
  },
  {
    value: 100,
    label: "100k+",
  },
];

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 20,
    label: "2",
  },
  {
    value: 40,
    label: "4",
  },
  {
    value: 60,
    label: "6",
  },
  {
    value: 80,
    label: "8",
  },
  {
    value: 100,
    label: "10",
  },
  // {
  //   value: 150,
  //   label: "15",
  // },
  // {
  //   value: 200,
  //   label: "20+",
  // },
];

function rangeValueExperience(value) {
  return `${value / 10} years`;
}

const formatNumber = (num) => {
  if (num < 1000) {
    return num.toString();
  } else if (num < 1000000) {
    return (num / 1000).toFixed(0) + "k";
  } else {
    return (num / 1000000).toFixed(0) + "M";
  }
};

function rangeValueHandler(value) {
  return formatNumber(value * 1000);
}

export default function JobAlert({ talentContent }) {
  const i18n = locale.en;
  const theme = useTheme();
  const [rangeValue, setRangeValue] = useState([
    talentContent?.salaryMin / 1000,
    talentContent?.salaryMax / 1000,
  ]);
  const [expRange, setExpRange] = useState([
    talentContent?.experienceYearStart * 10,
    talentContent?.experienceYearEnd * 10,
  ]);
  const industryUsers = talentContent?.candidate_profile?.industry_users.map(
    (item) => item?.industry?.name
  );
  console.log(industryUsers);
  const handleRangeSliderChange = (event, newValue) => {
    setRangeValue(newValue);
  };

  const expHandleChange = (event, newValue) => {
    setExpRange(newValue);
  };

  return (
    <Grid
      sx={{
        border: "2px solid lightgray",
        borderRadius: "20px",
        overflow: "hidden",
        width: "90%",
        mt: 4,
        pt: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 16px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TalentSVGButton
            color={"white"}
            source={alert}
            height={24}
            width={18}
            padding={"0 8px 0 0 !important"}
          />
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 700,
              // mb: "2px",
            }}
          >
            {"Alerts"}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "16px",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 700,
              minWidth: "fit-content",
            }}
          >
            {"Toggle all alerts"}
          </Typography>
          <BlueSwitch id="alert_switch" />
        </Box>
      </Box>

      <Box sx={{ display: "flex", mt: 1, padding: "0 16px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            height: "160px",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 700,
              mr: 1,
            }}
          >
            {i18n["allTalent.type"]}:
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 700,
              mr: 1,
            }}
          >
            {i18n["allTalent.region"]}:
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 700,
              mr: 1,
            }}
          >
            {i18n["allTalent.currency"]}:
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 700,
              mr: 1,
            }}
          >
            {i18n["allTalent.industry"]}:
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 700,
              mr: 1,
              width: "75px",
            }}
          >
            {"Highest Qualification"}:
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          <SmallButton
            minWidth="10px"
            height={25}
            color="blueButton600"
            borderRadius="5px"
            label={
              talentContent?.candidate_profile?.candidate_info?.employment_type
            }
            mr="8px"
            mb="5px"
          ></SmallButton>
          <SmallButton
            minWidth="10px"
            height={25}
            color="grayButton200"
            fontWeight="700"
            borderRadius="5px"
            label={talentContent?.region_name}
            mr="8px"
            mb="5px"
          ></SmallButton>
          <SmallButton
            minWidth="10px"
            height={25}
            color="grayButton200"
            fontWeight="700"
            borderRadius="5px"
            label={talentContent.currencyname}
            mr="8px"
            mb="5px"
          ></SmallButton>
          <Box mb={"16px"}>
            {/* {talentContent?.candidate_profile?.industry_users.map((item) => {
              return (
                <SmallButton
                  minWidth="10px"
                  height={25}
                  color="blueButton600"
                  borderRadius="5px"
                  label={item?.industry?.name}
                  mr="4px"
                ></SmallButton>
              );
            })} */}
            <Slider2
              color={"blueButton600"}
              items={industryUsers}
              hideTagsAfter={2}
            />
          </Box>
          {talentContent?.HighestQual !== null && (
            <SmallButton
              minWidth="10px"
              height={25}
              color="blueButton600"
              borderRadius="5px"
              label={talentContent?.HighestQual}
              mr="4px"
            ></SmallButton>
          )}
        </Box>
      </Box>

      <Box sx={{ mt: 2, padding: "0 16px" }}>
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: 700,
            mr: 1,
          }}
        >
          {"Monthly salary range"}:
        </Typography>
        <Slider
          disableSwap
          valueLabelDisplay="on"
          // disabled={!basicData.currency_id}
          name="salary"
          getAriaLabel={() => "Temperature range"}
          value={rangeValue}
          onChange={handleRangeSliderChange}
          color="redButton100"
          valueLabelFormat={rangeValueHandler}
          getAriaValueText={rangeValueHandler}
          marks={rangeMarks}
          sx={{
            marginTop: 4,
            width: "90%",
            ml: 3,
            "& .MuiSlider-rail": {
              backgroundColor: theme.palette.eyeview100.main,
              height: "10px",
            },
            "& .MuiSlider-track": {
              height: "10px",
            },
            "& .MuiSlider-thumb": {
              borderRadius: "15%",
              background: "white",
            },
            "& .MuiSlider-valueLabel": {
              fontSize: 12,
              fontWeight: "700",
              top: -6,
              backgroundColor: theme.palette.grayBackground,
              borderRadius: 1,
              color: theme.palette.text.primary,
              "&:before": {
                display: "none",
              },
              "& *": {
                background: "transparent",
                color: theme.palette.mode === "dark" ? "#fff" : "#000",
              },
            },
          }}
        />
      </Box>

      <Box sx={{ mt: 2, padding: "0 16px" }}>
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: 700,
            mr: 1,
          }}
        >
          {"Year of experience"}:
        </Typography>
        <Slider
          disableSwap
          valueLabelDisplay="on"
          sx={{
            marginTop: 4,
            width: "90%",
            ml: 3,
            "& .MuiSlider-rail": {
              backgroundColor: theme.palette.eyeview100.main,
              height: "10px",
            },
            "& .MuiSlider-track": {
              height: "10px",
            },
            "& .MuiSlider-thumb": {
              borderRadius: "15%",
              background: "white",
            },
            "& .MuiSlider-valueLabel": {
              fontSize: 12,
              fontWeight: "normal",
              top: -6,
              backgroundColor: theme.palette.grayBackground,
              borderRadius: 1,
              color: theme.palette.text.primary,
              "&:before": {
                display: "none",
              },
              "& *": {
                background: "transparent",
                color: theme.palette.mode === "dark" ? "#fff" : "#000",
              },
            },
          }}
          // disabled={salaryObj.step == 0}
          name="experience"
          getAriaLabel={() => "Temperature range"}
          value={expRange}
          // step={basicData.employment_type == "freelance" && 1}
          onChange={expHandleChange}
          color="blueButton800"
          // valueLabelDisplay="auto"
          valueLabelFormat={rangeValueExperience}
          getAriaValueText={rangeValueExperience}
          step={5}
          marks={marks}
        />
      </Box>

      <Grid
        container
        // padding="0 8px 8px 8px"
        alignItems="center"
        overflow={"hidden"}
        sx={{
          width: "100%",
          height: 51,
          mt: 2,
        }}
      >
        <Button
          variant="contained"
          id="broad"
          sx={{
            borderRadius: 0,
            width: "100%",
            height: "100%",
            fontSize: "14px",
          }}
          color="grayButton200"
        >
          Update
        </Button>
      </Grid>
    </Grid>
  );
}
