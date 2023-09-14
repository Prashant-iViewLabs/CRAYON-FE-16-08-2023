import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Button,
  InputBase,
  InputLabel,
  Paper,
  Slider,
} from "@mui/material";
import React, { useState } from "react";
import theme from "../../utils/Theme";
import GreenEducation from "../../assets/Padding Included/GreenEducation.svg";
import BlueFlag from "../../assets/Padding Included/Blue_Flag.svg";
import BlueSkills from "../../assets/Padding Included/Blue_Filter_Stats.svg";
import RedLocation from "../../assets/Padding Included/Red_Location.svg";
import YellowTool from "../../assets/Padding Included/Yellow_Own_Equipment.svg";
import GreenCountry from "../../assets/Padding Included/Green_Country.svg";
import GreenTitle from "../../assets/Padding Included/Green_Experience_Title_Job.svg";

const rangeMarks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 20,
    label: "20,000",
  },
  {
    value: 40,
    label: "40,000",
  },
  {
    value: 60,
    label: "60,000",
  },
  {
    value: 80,
    label: "80,000",
  },
  {
    value: 100,
    label: "100000+",
  },
];
const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 20,
    label: "2 yrs",
  },
  {
    value: 40,
    label: "4 yrs",
  },
  {
    value: 60,
    label: "6yrs",
  },
  {
    value: 80,
    label: "8yrs",
  },
  {
    value: 100,
    label: "10yrs",
  },
];
function textValue(value) {
  return value / 10;
}
const AdvanceSection = () => {
  const [openAdvanceSearch, setAdvanceSearch] = useState(false);

  const [rangeValue, setRangeValue] = useState([0, 20]);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "auto",
        flexDirection: "column",
      }}
    >
      {openAdvanceSearch && (
        <Box
          sx={{
            width: "95%",
            background: "#f4f5f7",
            padding: 4,
            paddingY: 2,
            gap: 1,
            display: "flex",
            boxShadow: 1,
            flexDirection: "column",
            borderRadius: "0 0 10px 10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 4,
              width: "100%",
            }}
          >
            <Box sx={{ width: "50%" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  component={"img"}
                  src={GreenTitle}
                  sx={{
                    height: 30,
                    width: 30,
                  }}
                />
                <InputLabel
                  sx={{
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  Job Titles
                </InputLabel>
              </Box>
              <Paper
                elevation={0}
                component="form"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  borderRadius: 5,
                  background: "white",
                }}
              >
                <InputBase
                  sx={{
                    ml: 1,
                    width: 1,
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                  placeholder="Select a job title"
                />
              </Paper>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  component={"img"}
                  src={BlueFlag}
                  sx={{
                    height: 30,
                    width: 30,
                  }}
                />
                <InputLabel
                  sx={{
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  Regions
                </InputLabel>
              </Box>
              <Paper
                elevation={0}
                component="form"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  borderRadius: 5,
                }}
              >
                <InputBase
                  sx={{
                    ml: 1,
                    width: 1,
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                  placeholder="Select the country you are in"
                />
              </Paper>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 4,
              width: "100%",
            }}
          >
            <Box sx={{ width: "50%" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  component={"img"}
                  src={BlueSkills}
                  sx={{
                    height: 30,
                    width: 30,
                  }}
                />
                <InputLabel
                  sx={{
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  Skills
                </InputLabel>
              </Box>
              <Paper
                elevation={0}
                component="form"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  borderRadius: 5,
                }}
              >
                <InputBase
                  sx={{
                    ml: 1,
                    width: 1,
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                  placeholder="Select the skills you are proficient in"
                />
              </Paper>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  component={"img"}
                  src={RedLocation}
                  sx={{
                    height: 30,
                    width: 30,
                  }}
                />
                <InputLabel
                  sx={{
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  Location
                </InputLabel>
              </Box>
              <Paper
                elevation={0}
                component="form"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  borderRadius: 5,
                }}
              >
                <InputBase
                  sx={{
                    ml: 1,
                    width: 1,
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                  placeholder="Select a job title"
                />
              </Paper>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 4,
              width: "100%",
            }}
          >
            <Box sx={{ width: "50%" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  component={"img"}
                  src={YellowTool}
                  sx={{
                    height: 30,
                    width: 30,
                  }}
                />
                <InputLabel
                  sx={{
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  Tools
                </InputLabel>
              </Box>
              <Paper
                elevation={0}
                component="form"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  borderRadius: 5,
                }}
              >
                <InputBase
                  sx={{
                    ml: 1,
                    width: 1,
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                  placeholder="Select the tools you are proficient in"
                />
              </Paper>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  component={"img"}
                  src={GreenEducation}
                  sx={{
                    height: 30,
                    width: 30,
                  }}
                />
                <InputLabel
                  sx={{
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  Companies
                </InputLabel>
              </Box>
              <Paper
                elevation={0}
                component="form"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  borderRadius: 5,
                }}
              >
                <InputBase
                  sx={{
                    ml: 1,
                    width: 1,
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                  placeholder="Select your preferred next company"
                />
              </Paper>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 4,
              width: "100%",
            }}
          >
            <Box sx={{ width: "50%" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  component={"img"}
                  src={GreenCountry}
                  sx={{
                    height: 30,
                    width: 30,
                  }}
                />
                <InputLabel
                  sx={{
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  Currency
                </InputLabel>
              </Box>
              <Paper
                elevation={0}
                component="form"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  borderRadius: 5,
                }}
              >
                <InputBase
                  sx={{
                    ml: 1,
                    width: 1,
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                  placeholder="Indicate your preferred currency"
                />
              </Paper>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  component={"img"}
                  src={GreenEducation}
                  sx={{
                    height: 30,
                    width: 30,
                  }}
                />
                <InputLabel
                  sx={{
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  Highest Qualification
                </InputLabel>
              </Box>
              <Paper
                elevation={0}
                component="form"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  borderRadius: 5,
                }}
              >
                <InputBase
                  sx={{
                    ml: 1,
                    width: 1,
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                  placeholder="Select your highest qualification"
                />
              </Paper>
            </Box>
          </Box>
          <Box
            sx={{
              width: "50%",
            }}
          >
            <InputLabel
              sx={{
                fontSize: "14px",
                fontWeight: 700,
                mb: 4,
              }}
            >
              Salary
            </InputLabel>
            <Slider
              disableSwap
              sx={{
                width: "89%",
                ml: 1,
                "& .MuiSlider-rail": {
                  backgroundColor: "#ebecf3",
                  height: "10px",
                },
                "& .MuiSlider-track": {
                  height: "10px",
                  background: theme.palette.redButton.main,
                },
                "& .MuiSlider-thumb": {
                  borderRadius: "15%",
                  background: "white",
                },
                "& .MuiSlider-valueLabel.MuiSlider-valueLabelOpen": {
                  backgroundColor: "#EBECF3",
                },
                "& .MuiSlider-valueLabel": {
                  color: "#000",
                },
              }}
              name="salary"
              getAriaLabel={() => "Temperature range"}
              value={rangeValue}
              valueLabelDisplay="on"
              // step={basicData.employment_type == "freelance" && 1}
              // onChange={
              //   basicData.employment_type == "freelance"
              //     ? handleRangeSlider2
              //     : handleRangeSlider
              // }
              // color="redButton100"
              // valueLabelDisplay="on"
              // valueLabelFormat={
              //   basicData.employment_type == "freelance"
              //     ? rangeValueHandler2
              //     : rangeValueHandler
              // }
              // getAriaValueText={
              //   basicData.employment_type == "freelance"
              //     ? rangeValueHandler2
              //     : rangeValueHandler
              // }
              marks={rangeMarks}
            />
          </Box>
          <Box sx={{ width: "50%" }}>
            <InputLabel
              sx={{
                fontSize: "14px",
                fontWeight: 700,
                mb: 4,
              }}
            >
              Experience
            </InputLabel>
            <Slider
              disableSwap
              sx={{
                width: "89%",
                ml: 1,
                "& .MuiSlider-rail": {
                  backgroundColor: theme.palette.grayBackground,
                  height: "10px",
                },
                "& .MuiSlider-track": {
                  height: "10px",
                  background: theme.palette.blueButton700.main,
                },
                "& .MuiSlider-thumb": {
                  borderRadius: "15%",
                  background: "white",
                },
                "& .MuiSlider-valueLabel.MuiSlider-valueLabelOpen": {
                  backgroundColor: "#EBECF3",
                },
                "& .MuiSlider-valueLabel": {
                  color: "#000",
                },
              }}
              name="experience"
              getAriaLabel={() => "Temperature range"}
              value={rangeValue}
              valueLabelDisplay="on"
              // step={basicData.employment_type == "freelance" && 1}
              // onChange={
              //   basicData.employment_type == "freelance"
              //     ? handleRangeSlider2
              //     : handleRangeSlider
              // }
              // color="redButton100"
              // valueLabelDisplay="on"
              // valueLabelFormat={
              //   basicData.employment_type == "freelance"
              //     ? rangeValueHandler2
              //     : rangeValueHandler
              // }
              // getAriaValueText={
              //   basicData.employment_type == "freelance"
              //     ? rangeValueHandler2
              //     : rangeValueHandler
              // }
              marks={marks}
            />
          </Box>
        </Box>
      )}
      <Button
        sx={{
          padding: "4px 20px",
          height: 20,
          borderRadius: "0 0 15px 15px",
          boxShadow: 3,
        }}
        size="small"
        variant="contained"
        color={"lightGreenButton300"}
        endIcon={openAdvanceSearch ? <ExpandLess /> : <ExpandMore />}
        onClick={() => {
          setAdvanceSearch((prevState) => !prevState);
        }}
      >
        {openAdvanceSearch ? "close" : "Advance"}
      </Button>
    </Box>
  );
};

export default AdvanceSection;
