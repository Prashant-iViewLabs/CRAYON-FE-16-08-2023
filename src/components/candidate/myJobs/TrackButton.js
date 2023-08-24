import React, { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Menu from "@mui/material/Menu";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import done from "../../../assets/relocate.svg";
import Box from "@mui/material/Box";
import SmallButton from "../../common/SmallButton";
import { Link } from "react-router-dom";
import { Avatar, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import redTriangleSmile from "../../../assets/Characters/Red_Triangle_Smiling.svg";
import editIcon from "../../../assets/Padding Included/Black_Edit.svg";
import { CheckCircle, HourglassEmpty } from "@mui/icons-material";


const TrackButton = ({ job, closeFunc }) => {
  const theme = useTheme();
  console.log(job);
  return (
    <Box>
      <Box
        sx={{
          padding: "10px 16px",
          height: "388px"
        }}
      >
        <Box mb={2}>
          <strong>Application Stage:</strong>
          <SmallButton
            color= {job?.job_users[0]?.job_user_status?.name === "incomplete" ? "grayButton200" : "lightGreenButton300"} 
            ml={1}
            label={job?.job_users[0]?.job_user_status?.name}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: "0.8rem",
              textAlign: "justify",
              color: "gray",
              fontWeight: 700,
            }}
          >
            A valid appliction requires, at a minimum, that your Profile and
            'the basics' section of your Crayon Vitae be completed.
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box
              component={"img"}
              src={redTriangleSmile}
              sx={{ width: 36, height: 36, margin: "auto" }}
            />
            <Typography
              sx={{
                fontSize: "0.8rem",
                textAlign: "left",
                color: "gray",
                fontWeight: 700,
              }}
            >
              <strong>Remember,</strong> the more you complete, the stronger you
              can compete!
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              paddingBottom: 2,
            }}
          >
            {/* {job?.profileCompleted ? (
              <Button
                variant={job?.profileCompleted ? "contained" : "outlined"}
                sx={{
                  borderRadius: "10px",
                }}
                color={job?. ? "lightGreenButton300" : ""}
                endIcon={job?.profileCompleted ? <CheckIcon /> : ""}
              >
                {" "}
                My Profile
              </Button>
            ) : ( */}
            <Link
              to={"/candidate/my-profile"}
              style={{
                textDecoration: "none",
                color: theme.palette.black,
              }}
            >
              <Button
                variant="contained"
                color="grayButton200"
                sx={{
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  padding: 1
                }}
              >
                <Box sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1
                }}>{job?.profileCompleted ? <CheckCircle sx={{
                  fontSize: 35
                }} color="lightGreenButton300" /> : <HourglassEmpty sx={{
                  background: "#D9D9D9",
                  color: "#707070",
                  padding: 1,
                  fontSize: 18,
                  borderRadius: "50%",
                }} />} <span> My Profile</span></Box>
                <Box sx={{
                  display: "flex",
                  alignItems: "center"
                }}>
                  Edit
                  <Box
                    component={"img"}
                    src={editIcon}
                    sx={{ width: 20, height: 20 }}
                  />
                </Box>
              </Button>
            </Link>
            {/* )} */}
            {/* {job?.cvCompleted ? (
              <Button
                variant={job?.cvCompleted ? "contained" : "outlined"}
                sx={{
                  borderRadius: "10px",
                }}
                color={job?.cvCompleted ? "lightGreenButton300" : ""}
                endIcon={job?.cvCompleted ? <CheckIcon /> : ""}
              >
                {" "}
                Crayon vitae
              </Button>
            ) : ( */}
            <Link
              to={"/candidate/my-cv"}
              style={{
                textDecoration: "none",
                color: theme.palette.black,
              }}
            >
              {/* <Button
                  variant="outlined"
                  sx={{
                    borderRadius: "10px",
                  }}
                >
                  {" "}
                  Crayon vitae
                </Button> */}
              <Button
                variant="contained"
                color="grayButton200"
                sx={{
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  padding: 1
                }}
              >
                <Box sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1
                }}>{job?.cvCompleted ? <CheckCircle sx={{
                  fontSize: 35
                }} color="lightGreenButton300" /> : <HourglassEmpty sx={{
                  background: "#D9D9D9",
                  color: "#707070",
                  padding: 1,
                  fontSize: 18,
                  borderRadius: "50%",
                }} />} <span>Crayon vitae</span></Box>
                <Box sx={{
                  display: "flex",
                  alignItems: "center"
                }}>
                  Edit
                  <Box
                    component={"img"}
                    src={editIcon}
                    sx={{ width: 20, height: 20 }}
                  />
                </Box>
              </Button>
            </Link>
            {/* )} */}
            {/* <Button
              variant="contained"
              sx={{
                borderRadius: "10px",
              }}
              color={"lightGreenButton300"}
              endIcon={<CheckIcon />}
            >
              {" "}
              Q&A
            </Button> */}
            <Button
              variant="contained"
              color="grayButton200"
              sx={{
                borderRadius: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                padding: 1
              }}
            >
              <Box sx={{
                display: "flex",
                alignItems: "center",
                gap: 1
              }}>{true ? <CheckCircle sx={{
                fontSize: 35
              }} color="lightGreenButton300" /> : <HourglassEmpty sx={{
                background: "#D9D9D9",
                color: "#707070",
                padding: 1,
                fontSize: 18,
                borderRadius: "50%",
              }} />} <span>Q&A</span></Box>
              <Box sx={{
                display: "flex",
                alignItems: "center"
              }}>
                Edit
                <Box
                  component={"img"}
                  src={editIcon}
                  sx={{ width: 20, height: 20 }}
                />
              </Box>
            </Button>

            {/* <Button
              variant="outlined"
              sx={{
                borderRadius: "10px",
              }}
            >
              {" "}
              Application video
            </Button> */}
            <Button
                variant="contained"
                color="grayButton200"
                sx={{
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  padding: 1
                }}
              >
                <Box sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1
                }}>{false ? <CheckCircle sx={{
                  fontSize: 35
                }} color="lightGreenButton300" /> : <HourglassEmpty sx={{
                  background: "#D9D9D9",
                  color: "#707070",
                  padding: 1,
                  fontSize: 18,
                  borderRadius: "50%",
                }} />} <span>Video application </span></Box>
                <Box sx={{
                  display: "flex",
                  alignItems: "center"
                }}>
                  Edit
                  <Box
                    component={"img"}
                    src={editIcon}
                    sx={{ width: 20, height: 20 }}
                  />
                </Box>
              </Button>
          </Box>
        </Box>
      </Box>
      <Button
        variant="contained"
        color="redButton100"
        sx={{
          width: "100%",
          paddingY: "25px",
          borderRadius: "0 0 25px 25px",
        }}
        onClick={() => closeFunc(false)}
      >
        close
      </Button>
    </Box>
  );
};

export default TrackButton;
