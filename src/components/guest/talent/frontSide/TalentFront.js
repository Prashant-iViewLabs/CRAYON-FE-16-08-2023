import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import profile from "../../../../assets/profile.png";
import flip from "../../../../assets/Crayon_User_Lite.svg";
import job_exp from "../../../../assets/Padding Included/Green_Duration.svg";
import BlueCurrency from "../../../../assets/Blue_Salary.svg";
import redLocation from "../../../../assets/Red_Location.svg";
import calendar from "../../../../assets/Padding Included/Yellow_Calendar.svg";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SingleRadialChart from "../../../common/SingleRadialChart";
import SmallButton from "../../../common/SmallButton";
import CustomCard from "../../../common/CustomCard";
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

import matchMeIcon from "../../../../assets/Padding Excluded/Black_Match_me.svg";
import viewCVIcon from "../../../../assets/Padding Excluded/Black_Lock.svg";
import applyIcon from "../../../../assets/Padding Excluded/Black_Follower.svg";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import Slider2 from "../../../common/Slider2";
import { setAlert } from "../../../../redux/configSlice";
import { ALERT_TYPE } from "../../../../utils/Constants";
import locale from "../../../../i18n/locale";
import job_volume from "../../../../assets/Padding Excluded/Crayon Icon_Promote.svg";
import { truncate } from "lodash";

import MUIRadialChart from "../../../common/MUIRadialChart";


const label1 = "applications";
const label2 = "shortlisting";
const label3 = "interviews";
export default function TalentCard({ index, job, setisFlipped }) {
  const i18n = locale.en;
  const dispatch = useDispatch();
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isStar, setIsStarSelected] = useState(job?.favourite);

  // const [arrSlider, setArrSlider] = useState(
  //   job?.candidate_profile?.industry_users
  // );
  const jobIndustries = job?.UserIndustries?.split(",");

  // const [personalityArrSlider, setPersonalityArrSlider] = useState([
  //   job?.candidate_profile?.candidate_info?.employment_type,
  //   job?.candidate_profile?.candidate_info?.work_setup,
  // ]);

  // const [arrSlider2, setArrSlider2] = useState([
  //   job?.candidate_profile?.candidate_info?.primary?.name,
  //   job?.candidate_profile?.candidate_info?.shadow?.name,
  //   ...(job?.candidate_profile?.candidate_traits || []),
  // ]);

  const token = localStorage?.getItem("token");
  let decodedToken;
  if (token) {
    decodedToken = jwt_decode(token);
  }

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
                // color={"redButton"}
                variant="contained"
                sx={{
                  height: "auto",
                  minWidth: "60px",
                  minHeight: "45px",
                  borderRadius: "0 0 0 10px",
                  padding: 0,
                  fontSize: 12,
                  fontWeight: "normal",
                  background: theme.manageTalent.manageMatched.main,

                  color: theme.jobCard.jobType.recruit.contrastText,
                  ":hover": {
                    background: theme.manageTalent.manageMatched.main,
                  },
                }}
              >
                recent
              </Button>
              <Button
                sx={{
                  height: "auto",
                  minWidth: "60px",
                  minHeight: "45px",
                  borderRadius: 0,
                  padding: 0,
                  fontSize: 12,
                  fontWeight: "normal",
                  background: theme.palette.yellowButton100.main,
                  color: "white",
                  ":hover": {
                    background: theme.palette.yellowButton100.main,
                  },
                }}
              >
                in demand
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
                  borderRadius: "0 25px 0 0",
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
              paddingTop: "8px"
            }}
          >
            joined {convertDatetimeAgo(job?.user_updated_at)}
          </Typography>
        </Box>
      </Grid>
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
            }}
          >
            <Box>
              {job?.employment_type && (
                <SmallButton
                  color={"blueButton900"}
                  height={25}
                  value={job?.type}
                  label={truncate(job?.employment_type, { length: 12 })}
                  mr="4px"
                />
              )}
              {job?.work_setup && (
                <SmallButton
                  color={"blueButton900"}
                  height={25}
                  value={job?.work_setup}
                  label={truncate(job?.work_setup, { length: 12 })}
                  mr="4px"
                />
              )}
            </Box>
            <Slider2
              items={jobIndustries || []}
              // job?.UserIndustries
              color={"blueButton1000"}
              hideTagsAfter={2}
            />
          </Box>

          <TextWrapper
            color={theme.palette.black100}
            letterSpacing="0.25px"
            height="60px"
          >
            {job?.my_bio}
            {/* job?.my_bio */}
          </TextWrapper>
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
            onClick={() => setisFlipped(true)}
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
      >
        {/* <Box sx={{ margin: "0 -22px 0 -22px" }}>
          <SingleRadialChart
            labelsData={label1}
            name={"applied"}
            series={[job?.TotalUserCount]}
            width={120}
            color={theme.palette.chart.red}
            index={index}
            isHovered={isHovered}
          />
        </Box>
        <Box sx={{ margin: "0 -22px 0 -22px" }}>
          <SingleRadialChart
            labelsData={label2}
            name={"shortlisted"}
            series={[job?.totalusershorlisted]}
            // job?.totalusershorlisted
            width={120}
            color={theme.palette.chart.green}
            index={index}
            isHovered={isHovered}
          />
        </Box>
        <Box sx={{ margin: "0 -22px 0 -22px" }}>
          <SingleRadialChart
            labelsData={label3}
            series={[job?.totaluserinterviewed]}
            // job?.totaluserinterviewed
            width={120}
            name={"interviewed"}
            color={theme.palette.chart.yellow}
            index={index}
            isHovered={isHovered}
          />
        </Box> */}
        <MUIRadialChart value={job?.TotalUserCount} chartName={label1} max={500} size={100} countFontSize={16} labelFontSize={12} color={"Applied"} />
        <MUIRadialChart value={job?.totalusershorlisted} chartName={label2} max={100} size={100} countFontSize={16} labelFontSize={12} color={"Shortlisted"} />
        <MUIRadialChart value={job?.totaluserinterviewed} chartName={label3} max={50} size={100} countFontSize={16} labelFontSize={12} color={"Interviewed"} />

      </Grid>
      <Grid
        container
        // padding="0 8px 8px 8px"
        alignItems="center"
        overflow={"hidden"}
        sx={{
          borderRadius: "0 0 25px 25px",
          flexWrap:"nowrap",
          height: 60,
        }}
      >
        <Button
          variant="contained"
          sx={{
            borderRadius: 0,
            width: "120px",
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
            width: "120px",
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
            borderRadius: "0 0 25px 0",
            width: "120px",
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
