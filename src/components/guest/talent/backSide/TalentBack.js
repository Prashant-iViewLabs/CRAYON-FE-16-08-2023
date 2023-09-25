import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import job_logo from "../../../../assets/job_logo.svg";
import profile from "../../../../assets/profile.png";
import job_volume from "../../../../assets/Padding Excluded/Crayon Icon_Promote.svg";
import job_star from "../../../../assets/job_star.svg";
import job_star_selected from "../../../../assets/job_star_selected.svg";
import flip from "../../../../assets/Crayon_User_Lite.svg";

import job_exp from "../../../../assets/Padding Included/Green_Duration.svg";

import BlueCurrency from "../../../../assets/Blue_Salary.svg";
import redLocation from "../../../../assets/Red_Location.svg";
import calendar from "../../../../assets/Padding Included/Yellow_Calendar.svg";

import matchMeIcon from "../../../../assets/Padding Excluded/Black_Match_me.svg";
import viewCVIcon from "../../../../assets/Padding Excluded/Black_Lock.svg";
import applyIcon from "../../../../assets/Padding Excluded/Black_Follower.svg";

import job_apply from "../../../../assets/job_apply.svg";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StarIcon from "@mui/icons-material/Star";
import Typography from "@mui/material/Typography";
import locale from "../../../../i18n/locale";
import {
  ALERT_TYPE,
  CARD_RIGHT_BUTTON_GROUP,
} from "../../../../utils/Constants";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import SingleRadialChart from "../../../common/SingleRadialChart";
import SmallButton from "../../../common/SmallButton";
import CustomCard from "../../../common/CustomCard";
import PlaceIcon from "@mui/icons-material/Place";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import TextWrapper from "../../../common/TextWrapper";
import {
  convertDatetimeAgo,
  dateConverterMonth,
} from "../../../../utils/DateTime";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { favouriteJob } from "../../../../redux/guest/talentSlice";
import { Link } from "react-router-dom";
import { formatCurrencyWithCommas } from "../../../../utils/Currency";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import profile_challenger from "../../../../assets/Profile Icons_Challenger.svg";
import profile_character from "../../../../assets/Profile Icons_Charater.svg";
import profile_collaborator from "../../../../assets/Profile Icons_Collaborator.svg";
import profile_contemplator from "../../../../assets/Profile Icons_Contemplator.svg";
import Slider2 from "../../../common/Slider2";
import Slider from "../../../common/Slider";
import { setAlert } from "../../../../redux/configSlice";
import MUIRadialChart from "../../../common/MUIRadialChart";

export default function TalentCard({ index, job, setisFlipped }) {
  const i18n = locale.en;
  const dispatch = useDispatch();
  const theme = useTheme();
  const [colorKey, setColorKey] = useState("color");
  const [chartData1, setChartData1] = useState([job?.TotalUserCount]);
  const [chartData2, setChartData2] = useState([job?.TotalUserShorlisted]);
  const [chartData3, setChartData3] = useState([job?.TotalUserInterviewed]);
  const [isHovered, setIsHovered] = useState(false);
  const [isStar, setIsStarSelected] = useState(job?.favourite);

  const [arrSlider, setArrSlider] = useState([
    job?.candidate_profile?.industry_users[0],
    job?.candidate_profile?.candidate_info?.employment_type,
    job?.candidate_profile?.candidate_info?.work_setup,
  ]);

  const [arrSlider2, setArrSlider2] = useState([
    ...(job?.candidate_profile?.candidate_traits || []),
  ]);
  // const jobTraits = job?.candidate_profile?.candidate_traits.map(trait => trait?.)

  // console.log(arrSlider2);

  const token = localStorage?.getItem("token");
  let decodedToken;
  if (token) {
    decodedToken = jwt_decode(token);
  }

  const handleHoverEnter = () => {
    setColorKey("hover");
  };
  const handleHoverLeave = () => {
    setColorKey("color");
  };
  const handleStar = async () => {
    setIsStarSelected(!isStar);
    if (decodedToken?.data?.role_id === 3) {
      await dispatch(favouriteJob({ reqid: job?.job_id }));
    } else {
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: "Login as employer to add this talent as favourite",
        })
      );
    }
  };
  return (
    <CustomCard
      handleMouseEnter={() => setIsHovered(true)}
      handleMouseLeave={() => setIsHovered(false)}
    >
      <Grid
        container
        // padding={1}
        justifyContent="space-between"
        alignItems="start"
        sx={{
          borderRadius: "25px 25px 0 0",
          // gap: 3,
        }}
      >
        {job?.profile_url ? (
          <Box
            component="img"
            sx={{
              height: 60,
              width: 60,
              ml: "15px",
              mt: "15px",
              borderRadius: "50%",
            }}
            alt="profile"
            src={job?.profile_url}
          />
        ) : (
          <Box
            component="img"
            sx={{
              height: 60,
              width: 60,
              ml: "15px",
              mt: "15px",
            }}
            alt="profile"
            src={profile}
          />
        )}
        <Box
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              {job?.firstactivity && (
                <SmallButton
                  color="yellowButton100"
                  label={job?.firstactivity}
                  mr={1}
                />
              )}
              {job?.secondactivity && (
                <SmallButton
                  color="lightGreenButton300"
                  label={job?.secondactivity}
                />
              )}
              <Button
                sx={{
                  height: "auto",
                  minWidth: "60px",
                  minHeight: "45px",
                  borderRadius: 0,
                  padding: 0,
                  fontSize: 12,
                  fontWeight: "normal",
                  background: theme.palette.lightGreenButton300.main,
                  color: "white",
                  ":hover": {
                    background: theme.palette.lightGreenButton300.main,
                  },
                }}
              >
                active
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
              }}
            >
              {/* <Box
              sx={{
                height: 43,
                width: 43,
                maxHeight: { xs: 43 },
                maxWidth: { xs: 43 },
                borderRadius: "6px",
                background: theme.palette.purpleButton300.main,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 8px",
              }}
            >
              <Box
                component="img"
                sx={{
                  height: 25,
                  width: 25,
                  maxHeight: { xs: 25 },
                  maxWidth: { xs: 25 },
                }}
                alt="job_volume"
                src={job_volume}
              />
            </Box> */}
              {/* {isStar ? (
              <Box
                component="img"
                sx={{
                  height: 43,
                  width: 43,
                  maxHeight: { xs: 43 },
                  maxWidth: { xs: 43 },
                  mr: 1,
                }}
                alt="job_star_selected"
                src={job_star_selected}
                onClick={handleStar}
              />
            ) : (
              <Box
                component="img"
                sx={{
                  height: 43,
                  width: 43,
                  maxHeight: { xs: 43 },
                  maxWidth: { xs: 43 },
                  mr: 1,
                }}
                alt="job_star"
                src={job_star}
                onClick={handleStar}
              />
            )} */}
              <Box
                sx={{
                  height: "45px",
                  width: "60px",
                  maxHeight: { xs: "60px" },
                  maxWidth: { xs: "60px" },
                  borderRadius: 0,
                  background: theme.palette.purpleButton300.main,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  sx={{
                    height: 30,
                    width: 30,
                    maxHeight: { xs: 30 },
                    maxWidth: { xs: 30 },
                  }}
                  alt="job_volume"
                  src={job_volume}
                // onClick={handleClick}
                />
              </Box>
              <Button
                color="grayButton300"
                onClick={handleStar}
                sx={{
                  // height: "auto",
                  minWidth: "60px",
                  width: "60px",
                  height: 45,
                  background: theme.palette.grayBackground,
                  borderRadius: 0,
                  padding: 0,
                }}
              >
                <StarRoundedIcon color={isStar ? "error" : "disabled"} />
              </Button>
            </Box>
          </Box>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: 12,
              letterSpacing: "0.75px",
              opacity: 0.8,
              paddingTop:"8px"
            }}
          >
            joined {convertDatetimeAgo(job?.user_updated_at)}
          </Typography>
        </Box>
      </Grid>

      {/* <Grid container padding={0} justifyContent="space-between" alignItems="center">
                <Box sx={{ margin: '-20px 0 -14px -16px', }}>
                    <RadialChart labelsData={labels} series={chartData} width={250} index={index} isHovered={isHovered} />
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginRight: '8px'
                }} onMouseEnter={handleHoverEnter}
                    onMouseLeave={handleHoverLeave}>
                    {CARD_RIGHT_BUTTON_GROUP.map((btn, index) => (
                        <SmallButton color={btn[colorKey]} key={index} label={btn.label} borderTopRightRadius={0}
                            borderBottomRightRadius={0} mb='4px' width={100} p={0} />
                    ))}
                </Box>
            </Grid> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          m: "15px"
        }}
      >
        <Link
          to={`/candidate-cv/${job?.user_id}`}
          target="_blank"
          style={{
            textDecoration: "none",
            color: theme.palette.black,
          }}
        >
          <TextWrapper line={1} weight={700} size={20} gutterBottom={false}
            fontWeight={900}
            fontSize={20}
            overflow={"hidden"}
            lineHeight={1}
          >
            {job?.first_name}
          </TextWrapper>
        </Link>
        <TextWrapper
          line={1}
          weight={700}
          size={20}
          margin={0}
          fontWeight={900}
          fontSize={20}
          overflow={"hidden"}
          lineHeight={1}
          
          height={"20px"}
        >
          {job?.jobTitle}
        </TextWrapper>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px"
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              height: "14px",
            }}
          >

            <Box
              component="img"
              sx={{
                height: 25,
                width: 25,
                maxHeight: { xs: 28 },
                maxWidth: { xs: 28 },
              }}
              alt="currency"
              src={BlueCurrency}
            />
            {/* </IconButton> */}
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: "0.25px",
                lineHeight: 1,
              }}
            >
              {job?.currencySymbol}
              {formatCurrencyWithCommas(job?.salaryMin)}{" "}
              to{" "}
              {job?.currencySymbol}
              {formatCurrencyWithCommas(job?.salaryMax)}
              {/* job?.salaryMax */}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              height: "14px",
            }}>
            <Box
              component="img"
              sx={{
                height: 20,
                width: 25,
                maxHeight: { xs: 28 },
                maxWidth: { xs: 28 },
              }}
              alt="location"
              src={redLocation}
            />
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: "0.25px",
                lineHeight: 1,
              }}
            >
              {job?.town_name}, {/* job?.town_name */}
              {job?.region_name}
              {/* job?.region_name */}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              height: "14px",
            }}>
            <Box
              component="img"
              sx={{
                height: 25,
                width: 25,
                maxHeight: { xs: 28 },
                maxWidth: { xs: 28 },
              }}
              alt="job_exp"
              src={job_exp}
            />
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: "0.25px",
                lineHeight: 1
              }}
            >
              {job?.experienceYear} years
              {/* job?.experienceYear */}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              height: "14px",
            }}
          >
            <Box
              component="img"
              sx={{
                height: 18,
                width: 18,
                maxHeight: { xs: 28 },
                maxWidth: { xs: 28 },
                ml: 0.5,
              }}
              alt="calendar"
              src={calendar}
            />
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: "0.25px",
                lineHeight: 1,
              }}
            >
              {job?.noticePeriod_description?.replace("calendar", "")}
              {/* job?.candidateProfile_created_at */}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
        }}
      >
        <Grid
          marginLeft={1}
          marginRight={1}
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column"
          }}
          paddingTop={0}
          gap={"15px"}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              height:"140px"
            }}

          >
            <Slider2
              items={job?.UserSkills?.split(",") || []}
              color={"skillsButton"}
              hideTagsAfter={2}
            />
            <Slider2
              items={job?.UserTools?.split(",") || []}
              color={"toolsButton"}
              hideTagsAfter={2}
            />
            <Slider
              items={job?.UserTraits?.split(",") || []}
              theme={theme}
              color={"traitsButton"}
            />
          </Box>
        </Grid>
        <Box sx={{ display: "flex" }}>
          <Button
            variant="contained"
            color="redButton"
            sx={{
              width: "100%",
              height: 60,
              padding: 0,
              minWidth: "20px",
              fontSize: "20px",
              borderRadius: "10px 0 0 10px",
            }}
            onClick={() => setisFlipped(false)}
          >
            <Box
              component={"img"}
              src={flip}
              sx={{
                height: "20px",
                width: "20px",
              }}
            />
            {/* &#62; */}
          </Button>
        </Box>
      </Box>

      <Grid
        container
        spacing={2}
        padding="15px 16px 15px 16px"
        justifyContent="space-around"
        alignItems="center"
      >
        {job?.primaryName && (
          <Box
            component="img"
            height={100}
            // sx={{ margin: "0 -22px 0 -22px" }}
            alt="Personality"
            src={
              (job?.primaryName === "collaborator" && profile_collaborator) ||
              (job?.primaryName === "challenger" && profile_challenger) ||
              (job?.primaryName === "character" && profile_character) ||
              (job?.primaryName === "contemplator" && profile_contemplator)
            }
          />
        )}
        {job?.shadowName && (
          // job?.shadowName
          <Box
            component="img"
            height={100}
            // sx={{ margin: "0 -22px 0 -22px" }}
            // alt="job_exp"
            alt="Personality"
            src={
              (job?.shadowName === "collaborator" && profile_collaborator) ||
              (job?.shadowName === "challenger" && profile_challenger) ||
              (job?.shadowName === "character" && profile_character) ||
              (job?.shadowName === "contemplator" && profile_contemplator)
            }
          />
        )}
        <MUIRadialChart value={job?.grit_score} chartName={"grit score"} max={100} size={100} countFontSize={16} labelFontSize={14} color={"blue"}/>
       
      </Grid>
      <Grid
        container
        // padding="0 8px 8px 8px"
        alignItems="center"
        overflow={"hidden"}
        sx={{
          width: "100%",
          borderRadius: "0 0 25px 25px",
          height: 60,
        }}
      >
        <Button
          variant="contained"
          sx={{
            borderRadius: 0,
            width: "33.33%",
            height: "100%",
            fontSize: "15px",
            fontWeight: "bold",
            ".MuiButton-startIcon": {
              marginRight: "0px !important",
              marginLeft: 0,
            },
            padding: "0px !important",
            gap: 1,
          }}
          color="blueButton200"
          startIcon={
            <Box
              component={"img"}
              sx={{
                height: 20,
                width: 20,
              }}
              src={matchMeIcon}
            />
          }
        >
          match
        </Button>
        <Button
          variant="contained"
          sx={{
            borderRadius: 0,
            fontSize: "15px",
            fontWeight: "bold",
            whiteSpace: "nowrap",
            width: "33.33%",
            height: "100%",
          }}
          color="yellowButton100"
          startIcon={
            <Box
              component={"img"}
              sx={{
                height: 20,
                width: 20,
              }}
              src={viewCVIcon}
            />
          }
        >
          view CV
        </Button>
        <Button
          variant="contained"
          sx={{
            borderRadius: 0,
            width: "33.33%",
            height: "100%",
            fontSize: "15px",
            fontWeight: "bold",
            ".MuiButton-startIcon": {
              marginRight: "0px !important",
              marginLeft: 0,
            },
            padding: "0px !important",
            gap: 1,

          }}
          startIcon={
            <Box
              component={"img"}
              sx={{
                height: 20,
                width: 20,
              }}
              src={applyIcon}
            />
          }
          color="redButton"
        // onClick={handleClick}
        >
          {i18n["talentCard.shortlist"]}
        </Button>

      </Grid>
    </CustomCard>
  );
}
