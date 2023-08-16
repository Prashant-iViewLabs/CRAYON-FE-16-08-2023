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

const TrackButton = ({ job, closeFunc }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log(job);
  return (
    <Box>
      <Box
        sx={{
          padding: 2,
        }}
      >
        <Box mb={2}>
          <strong>Application Stage:</strong>
          <SmallButton
            color="lightGreenButton300"
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
            <Avatar></Avatar>
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
            {job?.profileCompleted ? (
              <Button
                variant={job?.profileCompleted ? "contained" : "outlined"}
                sx={{
                  borderRadius: "10px",
                }}
                color={job?.profileCompleted ? "lightGreenButton300" : ""}
                endIcon={job?.profileCompleted ? <CheckIcon /> : ""}
              >
                {" "}
                My Profile
              </Button>
            ) : (
              <Link
                to={"/candidate/my-profile"}
                style={{
                  textDecoration: "none",
                  color: theme.palette.black,
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: "10px",
                  }}
                >
                  {" "}
                  My Profile
                </Button>
              </Link>
            )}
            {job?.cvCompleted ? (
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
            ) : (
              <Link
                to={"/candidate/my-cv"}
                style={{
                  textDecoration: "none",
                  color: theme.palette.black,
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: "10px",
                  }}
                >
                  {" "}
                  Crayon vitae
                </Button>
              </Link>
            )}
            <Button
              variant="contained"
              sx={{
                borderRadius: "10px",
              }}
              color={"lightGreenButton300"}
              endIcon={<CheckIcon />}
            >
              {" "}
              Q&A
            </Button>

            <Button
              variant="outlined"
              sx={{
                borderRadius: "10px",
              }}
            >
              {" "}
              Application video
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
        back
      </Button>
    </Box>
  );
};

export default TrackButton;
