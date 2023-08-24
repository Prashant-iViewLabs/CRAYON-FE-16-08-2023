import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import SearchBar from "../components/common/SearchBar";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import locale from "../i18n/locale";
import Button from "@mui/material/Button";
import PlaceIcon from "@mui/icons-material/Place";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import InputBox from "../components/common/InputBox";
import SwipeableButton from "../components/common/SwipeableButton";
import { USER_TYPES } from "../utils/Constants";
import Signup from "../components/login/signup";
import { getAllIndustries } from "../redux/configSlice";
import { handleSignState } from "../redux/signUp/action";

import greenTriangle from "../assets/Characters/Green_Triangle_Happy.svg";
import redSkateboard from "../assets/Characters/Red_Skateboarder.svg";
import yellowStar from "../assets/Characters/Yellow_Star.svg";
import greenChilled from "../assets/Characters/Green_Chilled.svg";
import blueHalf from "../assets/Characters/Blue_Half_Circle_Smile.svg";
import redTriangle from "../assets/Characters/Red_Triangle_Shocked.svg";
import redDiamond from "../assets/Characters/Red_Diamond.svg";
import blueEllipse from "../assets/Characters/Blue_Ellipse_Head.svg";

import currencySearch from "../assets/Padding Included/Currency_Search.svg";
import talentSearch from "../assets/Padding Included/Search_Talent.svg";
import { Link } from "react-router-dom";

import { BackHand } from "@mui/icons-material";
import AdvanceSection from "./AdvanceSection";
import theme from "../utils/Theme";
const StyledGrid = styled(Grid)(({ theme }) => ({
  "& .MuiTypography-root": {
    ".talent": {
      color: theme.palette.redButton.main,
    },
    ".fast": {
      color: theme.palette.blueButton400.main,
    },
  },
}));
const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  margin: "8px 0",
  "& .MuiOutlinedInput-notchedOutline": {
    // borderColor: theme.palette.black,
    borderRadius: "20px",
  },
}));

const StyledBox = styled("img")(() => ({
  cursor: "pointer",
  height: 170,
  width: 170,
  position: "absolute",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: "100%",
}));

export default function Home() {
  const i18n = locale.en;
  const dispatch = useDispatch();
  const [locationInput, setLocationInput] = useState(false);
  // const signUpHandle =(role_id)=>{
  //   console.log("home..............................................")
  //   //const role_id = localStorage.getItem("rolID")
  //   let tabs;
  //   if (role_id == 4) {
  //     tabs = AUTHORIZED_TAB_ITEMS_EMPLOYER;
  //     navigate("employer/my-profile", { replace: true });
  //     setActiveTab("employer/my_profile");
  //   } else {
  //     tabs = AUTHORIZED_TAB_ITEMS_CANDIDATE;
  //     navigate("candidate/my-profile", { replace: true });
  //     setActiveTab("candidate/my_profile");
  //   }
  //   setcurrentTabs(tabs);
  //  }
  const showLocationInput = () => {
    setLocationInput((prevState) => !prevState);
  };

  return (
    <Grid container spacing={0} flexDirection={{ xs: "column", sm: "row" }}>
      <Grid item xs={12} sx={{ mt: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              display: "flex",
              m: 1,
              alignItems: "center",
              borderRadius: "15px",
              width: "100%",
              height: "45px",
              maxWidth: { xs: "90%", sm: "70%" },
            }}
          >
            <IconButton
              aria-label="search job"
              component="button"
              sx={{
                ml: 3,
                height: "30px",
                width: "30px",
                color: "white",
                background: theme.palette.greenButton.main,
                "&:hover": {
                  background: theme.palette.greenButton.main, // Set the same background color for hover
                },
              }}
            >
              <SearchIcon fontSize="small" />
            </IconButton>
            <Paper
              elevation={0}
              component="form"
              sx={{
                // p: "2px 4px",
                mx: 2,
                display: "flex",
                alignItems: "center",
                borderRadius: "25px",
                width: 1,
              }}
            >
              <InputBase
                sx={{ width: 1, fontSize: "14px", fontWeight: 700 }}
                inputProps={{ "aria-label": "search google maps" }}
                placeholder="Begin your search here..."
              />
            </Paper>
            <IconButton
              color="redButton"
              aria-label="search Location"
              component="button"
              sx={{
                mr: 1,
                height: "30px",
                width: "30px",
                color: "white",
                background: theme.palette.redButton.main,
                "&:hover": {
                  background: theme.palette.redButton.main, // Set the same background color for hover
                },
              }}
              onClick={showLocationInput}
            >
              <PlaceIcon fontSize="small" />
            </IconButton>
            <Paper
              elevation={0}
              component="form"
              sx={{
                // p: "2px 4px",
                mx: 2,
                display: locationInput ? "flex" : "none",
                alignItems: "center",
                borderRadius: "25px",
                width: 0.5,
              }}
            >
              <InputBase
                sx={{ width: 1, fontSize: "14px", fontWeight: 700 }}
                inputProps={{ "aria-label": "search google maps" }}
                placeholder="Add location"
              />
            </Paper>
            <Box
              sx={{
                display: "flex",
                borderRadius: "15px",
                overflow: "hidden",
                minWidth: 235.5,
              }}
            >
              <Link
                to={"jobs"}
                sx={{
                  width: "50%",
                }}
              >
                <Button
                  sx={{
                    borderRadius: 0,
                    justifyContent: "space-between",
                    fontSize: "11.5px",
                    height: "45px",
                    boxShadow: 0,
                    lineHeight: { sm: "15px", xs: "15px" },
                  }}
                  variant="contained"
                  color="yellowButton100"
                >
                  <Box
                    component="img"
                    sx={{
                      height: 25,
                      cursor: "pointer",
                    }}
                    alt="crayon logo"
                    src={currencySearch}
                  />
                  {i18n["login.findWork"]}
                </Button>
              </Link>
              <Link
                to={"talent"}
                sx={{
                  width: "50%",
                }}
              >
                <Button
                  sx={{
                    borderRadius: 0,
                    justifyContent: "space-between",
                    fontSize: "11.5px",
                    height: "45px",
                    boxShadow: 0,
                    lineHeight: { sm: "15px", xs: "15px" },
                  }}
                  variant="contained"
                  color="lightGreenButton300"
                >
                  <Box
                    component="img"
                    sx={{
                      height: 25,
                      cursor: "pointer",
                    }}
                    alt="crayon logo"
                    src={talentSearch}
                  />
                  {i18n["login.findTalent"]}
                </Button>
              </Link>
            </Box>
          </Paper>
          <Box
            sx={{
              position: "absolute",
              // left: 0,
              // right: 0,
              top: 54,
              width: "70%",
              margin: "0 auto",
              zIndex: 10,
            }}
          >
            <AdvanceSection />
          </Box>
        </Box>
        <StyledGrid
          container
          spacing={0}
          mt={5}
          flexDirection={{ xs: "column" }}
          alignItems={"center"}
          paddingBottom={1}
        >
          <Box
            sx={{
              pt: 2,
              width: "70%",
              marginBottom: 5,
            }}
          >
            <Typography
              sx={{
                //   fontSize: { xs: "32px", sm: "35px", lg:"50px"},
                fontSize: { xs: "22px", sm: "25px", lg: "35px" },
                fontWeight: 700,
                mr: 1,
              }}
            >
              {i18n["login.talent"]}
              <span>{i18n["login.title1"]}</span>
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "22px", sm: "25px", lg: "35px" },
                //   fontSize: { xs: "32px", sm: "35px", lg:"50px" },
                fontWeight: 700,
                mr: 1,
              }}
            >
              for all shapes and sizes
              {/* <span>{i18n["login.done"]}</span>
                <span className="fast">{i18n["login.fast"]}</span>
                <span>{i18n["login.title2"]}</span> */}
            </Typography>
            <Button
              sx={{ width: 150, mt: 3 }}
              variant="contained"
              color="redButton"
            >
              {/* {i18n["login.viewPlans"]} */}
              learn more
            </Button>
          </Box>
          <Box
            sx={{
              margin: "auto",
              position: "relative",
              display: "flex",
              flexWrap: "nowrap",
              marginTop: 6,
            }}
          >
            <StyledBox
              className="homeImages"
              alt="Home Image"
              sx={{
                left: "-35rem",
              }}
              src={greenTriangle}
            />

            <StyledBox
              className="homeImages"
              component="img"
              sx={{
                zIndex: 2,
                top: 10,
                left: "-27rem",
                cursor: "pointer",
              }}
              alt="Home Image"
              src={redSkateboard}
            />
            <StyledBox
              className="homeImages"
              component="img"
              sx={{
                left: "-20rem",
                zIndex: 1,
                cursor: "pointer",
              }}
              alt="Home Image"
              src={yellowStar}
            />
            <StyledBox
              className="homeImages"
              component="img"
              sx={{
                left: "-11rem",
                top: "-1.5rem",
                height: 190,
                width: 190,
                zIndex: 0,
                cursor: "pointer",
              }}
              alt="Home Image"
              src={greenChilled}
            />
            <StyledBox
              className="homeImages"
              component="img"
              sx={{
                top: "3rem",
                left: "-4rem",
                cursor: "pointer",
                zIndex: 1,
              }}
              alt="Home Image"
              src={blueHalf}
            />
            <StyledBox
              className="homeImages"
              component="img"
              sx={{
                zIndex: 0,
                left: "5rem",
                cursor: "pointer",
              }}
              alt="Home Image"
              src={redTriangle}
            />
            <StyledBox
              className="homeImages"
              component="img"
              sx={{
                left: "13rem",
                cursor: "pointer",
              }}
              alt="Home Image"
              src={yellowStar}
            />
            <StyledBox
              className="homeImages"
              component="img"
              sx={{
                zIndex: 0,
                left: "22rem",
                cursor: "pointer",
              }}
              alt="Home Image"
              src={redDiamond}
            />
            <StyledBox
              className="homeImages"
              component="img"
              sx={{
                left: "30rem",
                cursor: "pointer",
              }}
              alt="Home Image"
              src={blueEllipse}
            />
          </Box>
        </StyledGrid>
      </Grid>
    </Grid>
  );
}
