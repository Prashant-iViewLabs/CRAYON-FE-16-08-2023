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

import homePageGif from "../assets/Characters/Final-Gif_2.gif";
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
    <Grid
      container
      spacing={0}
      flexDirection={{ xs: "column", sm: "row" }}
      sx={{
        background: "#E3F1F9",
        background: "linear-gradient(to bottom, #ebecf3 75%, #FFFFFF 100%)",
        height:"88vh"
      }}
    >

   
      <Grid item xs={12} sx={{ mt: "2%" , display:"flex",flexDirection:"column", gap:5 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            gap: "2rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "end",
              gap: 1,
            }}
          >
            <Box
              component={"img"}
              src={homePageGif}
              height={140}
              width={170}
              paddingBottom={0.2}
            />
            <Typography
              sx={{
                //   fontSize: { xs: "32px", sm: "35px", lg:"50px"},
                display: "flex",
                alignItems: "baseline",
                fontSize: { xs: "32px", sm: "35px", lg: "45px" },
                fontWeight: 700,
                mr: 1,
              }}
            >
              <span> Talent. Differently.</span>
            </Typography>
          </Box>

          <Paper
            elevation={3}
            sx={{
              display: "flex",
              m: 1,
              alignItems: "center",
              borderRadius: "15px",
              width: "100%",
              height: "65px",
              maxWidth: { xs: "90%", sm: "70%" },
              overflow: "hidden",
            }}
          >
            <IconButton
              aria-label="search job"
              component="button"
              sx={{
                height: "100%",
                width: "6%",
                color: "white",
                borderRadius: 0,
                background: theme.palette.tealColor.main,
                "&:hover": {
                  background: theme.palette.tealColor.main, // Set the same background color for hover
                },
              }}
            >
              <SearchIcon fontSize="large" />
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
                height: "65px",
                color: theme.palette.redButton.main,
                width: "65px",
              }}
              onClick={showLocationInput}
            >
              <PlaceIcon fontSize="large" />
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
                justifyContent: "space-between",
                minWidth: 235.5,
              }}
            >
              <Box
                sx={{
                  width: "50%",
                }}
              >
                <Link to={"jobs"}>
                  <Button
                    sx={{
                      borderRadius: 0,
                      // justifyContent: "space-between",
                      flexDirection: "column",
                      fontSize: "11.5px",
                      height: "100%",
                      width: "100%",
                      boxShadow: 0,
                      lineHeight: { sm: "15px", xs: "15px" },
                    }}
                    variant="contained"
                    color="redButton"
                  >
                    <Box
                      component="img"
                      sx={{
                        height: "40%",
                        cursor: "pointer",
                      }}
                      alt="crayon logo"
                      src={currencySearch}
                    />
                    {i18n["login.findWork"]}
                  </Button>
                </Link>
              </Box>
              <Box
                sx={{
                  width: "50%",
                }}
              >
                <Link to={"talent"}>
                  <Button
                    sx={{
                      borderRadius: 0,
                      // justifyContent: "space-between",
                      flexDirection: "column",
                      fontSize: "11.5px",
                      height: "100%",
                      width: "100%",
                      boxShadow: 0,
                      lineHeight: { sm: "15px", xs: "15px" },
                    }}
                    variant="contained"
                    color="yellowButton100"
                  >
                    <Box
                      component="img"
                      sx={{
                        height: "40%",
                        cursor: "pointer",
                      }}
                      alt="crayon logo"
                      src={talentSearch}
                    />
                    {i18n["login.findTalent"]}
                  </Button>
                </Link>
              </Box>
            </Box>
          </Paper>
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
              margin: "auto",
              position: "relative",
              display: "flex",
              flexWrap: "nowrap",
              marginTop: 6,
              height:"30vh"
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
