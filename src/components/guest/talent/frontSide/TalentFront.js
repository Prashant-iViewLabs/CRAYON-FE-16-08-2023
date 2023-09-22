import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import profile from "../../../../assets/profile.png";
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

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import Slider2 from "../../../common/Slider2";
import { setAlert } from "../../../../redux/configSlice";
import { ALERT_TYPE } from "../../../../utils/Constants";
import locale from "../../../../i18n/locale";

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
        overflow={"hidden"}
        sx={{
          borderRadius: "25px 25px 0 0",
          // gap: 3,
        }}
      >
        {job?.profile_url ? (
          // job?.profile_pic
          <Box
            component="img"
            sx={{
              height: 40,
              width: 40,
              maxHeight: { xs: 40 },
              maxWidth: { xs: 40 },
              ml: 2,
              mt: 1,
              p: 1,
              borderRadius: "50%",
            }}
            alt="profile"
            src={job?.profile_url}
          />
        ) : (
          <Box
            component="img"
            sx={{
              height: 40,
              width: 40,
              maxHeight: { xs: 40 },
              maxWidth: { xs: 40 },
              ml: 2,
              mt: 1,
              p: 1,
            }}
            alt="profile"
            src={profile}
          />
        )}
        <Box
          sx={{
            flexGrow: 1,
          }}
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
                  // job?.firstactivity
                  mr={1}
                />
              )}
              {job?.secondactivity && (
                <SmallButton
                  color="lightGreenButton300"
                  label={job?.secondactivity}
                  // job?.secondactivity
                />
              )}
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
              <Button
                color="grayButton100"
                onClick={handleStar}
                sx={{
                  // height: "auto",
                  minWidth: 50,
                  height: 43,
                  background: theme.palette.grayBackground,
                  borderRadius: "0 0 0 8px",
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
              marginBottom: "8px",
            }}
          >
            joined {convertDatetimeAgo(job?.user_updated_at)}
            {/* job?.user_updated_at */}
          </Typography>
        </Box>
      </Grid>

      <Box
        sx={{
          display: "flex",
          width: "100%",
          // height: "287px",
          flexGrow: 1,
        }}
      >
        <Grid
          marginLeft={1}
          marginRight={1}
          sx={{
            flexGrow: 1,
          }}
          paddingTop={0}
        >
          <Link
            to={`/candidate-cv/${job?.user_id}`}
            target="_blank"
            style={{
              textDecoration: "none",
              color: theme.palette.black,
            }}
          >
            <TextWrapper line={1} weight={700} size={20} gutterBottom={false}>
              {job?.first_name}
            </TextWrapper>
          </Link>
          <TextWrapper
            line={1}
            weight={700}
            size={20}
            gutterBottom={true}
            minHeight={"30px"}
          >
            {job?.jobTitle}
            {/* {job?.candidate_profile?.candidate_info?.job_title?.title} */}
            {/* job?.jobTitle */}
          </TextWrapper>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "12px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* <IconButton
              sx={{ padding: 0, marginLeft: "-5px", marginRight: "4px", marginBottom: "2px" }}
              color="redButton100"
              aria-label="search job"
              component="button"
            > */}

              <Box
                component="img"
                sx={{
                  height: 18,
                  width: 18,
                  maxHeight: { xs: 18 },
                  maxWidth: { xs: 18 },
                }}
                alt="currency"
                src={BlueCurrency}
              />
              {/* </IconButton> */}
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: "0.25px",
                }}
              >
                {job?.currencySymbol}
                {/* job?.currencySymbol */}
                {formatCurrencyWithCommas(job?.salaryMax)}
                {/* job?.salaryMax */}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                component="img"
                sx={{
                  height: 18,
                  width: 18,
                  maxHeight: { xs: 18 },
                  maxWidth: { xs: 18 },
                }}
                alt="location"
                src={redLocation}
              />
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: "0.25px",
                }}
              >
                {job?.town_name}, {/* job?.town_name */}
                {job?.region_name}
                {/* job?.region_name */}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                component="img"
                sx={{
                  height: 16,
                  width: 16,
                  maxHeight: { xs: 15 },
                  maxWidth: { xs: 15 },
                  mr: 1,
                }}
                alt="job_exp"
                src={job_exp}
              />
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: "0.25px",
                }}
              >
                {job?.experienceYear} years
                {/* job?.experienceYear */}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                component="img"
                sx={{
                  height: 16,
                  width: 16,
                  maxHeight: { xs: 15 },
                  maxWidth: { xs: 15 },
                  padding: 0,
                }}
                alt="calendar"
                src={calendar}
              />
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: "0.25px",
                }}
              >
                {dateConverterMonth(job?.candidateProfile_created_at)}
                {/* job?.candidateProfile_created_at */}
              </Typography>
            </Box>
          </Box>

          {/*<Box sx={{ display: "flex", marginTop: "-5px" }}>
          <SmallButton
            color="blueButton600"
            height={25}
            label={i18n["talentCard.tech"]}
            mr="4px"
          />
          <SmallButton
            color="blueButton700"
            height={25}
            label={i18n["talentCard.fullTime"]}
            mr="4px"
          />
          <SmallButton
            color="blueButton700"
            height={25}
            label={i18n["talentCard.remote"]}
            mr="4px"
          />
          <SmallButton
            color="blueButton700"
            height={25}
            label="crayon recruit"
            mr="4px"
          />
          {/* <SmallButton color='blueButton700' height={25} minWidth={60} p={0} label={i18n['talentCard.fullTime']} mr='4px' />
                    <SmallButton color='blueButton700' height={25} minWidth={50} p={0} label={i18n['talentCard.remote']} mr='4px' /> */}
          {/* <Typography sx={{
                        fontWeight: 600,
                        fontSize: 12,
                        marginTop: '6px',
                        // lineHeight: '15px',
                        opacity: 0.75,
                    }} >
                        ..3more
                    </Typography> 
        </Box>*/}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {/* {personalityArrSlider.map((item, index) => {
              if (item != "") {
                return (
                  <SmallButton
                    color={"blueButton700"}
                    height={25}
                    // label={item?.industry ? item?.industry?.name : item}
                    value={item}
                    label={item}
                    mr="4px"
                  />
                );
              }
            })} */}

            <Slider2
              items={[job.employment_type, job.work_setup]}
              // job.employment_type, job.work_setup
              color={"blueButton700"}
              hideTagsAfter={2}
            />
            <Slider2
              items={jobIndustries || []}
              // job?.UserIndustries
              color={"blueButton600"}
              hideTagsAfter={2}
            />
          </Box>

          {/* <Box
            sx={
              job?.candidate_profile?.industry_users.length <= 1
                ? {
                  width: "100%",
                  display: "flex",
                  overflow: "hidden",
                }
                : {
                  width: "100%",
                  display: "flex",
                  overflow: "hidden",
                }
            }
          >
            {arrSlider
              .filter((item) => item != null || item?.industry?.name != null)
              .map((item, index) => {
                if (item != "" && index < 2) {
                  return (
                    <SmallButton
                      color={
                        item?.industry?.name ? "blueButton600" : item === ""
                      }
                      height={25}
                      // label={item?.industry ? item?.industry?.name : item}
                      value={item?.industry?.name}
                      label={
                        item?.industry
                          ? item?.industry?.name?.split(/\s|\/+/)[0]
                          : item
                      }
                      mr="4px"
                    />
                  );
                }
              })}
          </Box> */}

          <TextWrapper
            mt="12px"
            mb={1}
            color={theme.palette.black100}
            letterSpacing="0.25px"
          >
            {job?.my_bio}
            {/* job?.my_bio */}
          </TextWrapper>
        </Grid>
        <Box sx={{ display: "flex", alignItems: "end", marginBottom: "12px" }}>
          <Button
            variant="contained"
            color="redButton"
            sx={{
              width: "100%",
              height: 150,
              padding: 0,
              minWidth: "15px",
              marginBottom: 2,
              fontSize: "20px",
              borderRadius: "5px 0 0 5px",
            }}
            onClick={() => setisFlipped(true)}
          >
            <NavigateNextIcon
              sx={{
                margin: 0,
                padding: 0,
              }}
              fontSize="string"
            />
            {/* &#62; */}
          </Button>
        </Box>
      </Box>

      <Grid
        container
        spacing={2}
        padding="0 16px 8px 16px"
        justifyContent="space-around"
      >
        <Box sx={{ margin: "0 -22px 0 -22px" }}>
          <SingleRadialChart
            labelsData={label1}
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
            color={theme.palette.chart.yellow}
            index={index}
            isHovered={isHovered}
          />
        </Box>
      </Grid>
      <Grid
        container
        // padding="0 8px 8px 8px"
        alignItems="center"
        overflow={"hidden"}
        sx={{
          width: "100%",
          borderRadius: "0 0 25px 25px",
          height: 51,
        }}
      >
        <Button
          variant="contained"
          sx={{
            borderRadius: 0,
            width: "33.33%",
            height: "100%",
            fontSize: "10px",
          }}
          color="blueButton200"
        >
          Match me
        </Button>
        <Button
          variant="contained"
          sx={{
            borderRadius: 0,
            width: "33.33%",
            height: "100%",
            fontSize: "10px",
          }}
          color="grayButton200"
        >
          View More
        </Button>
        <Button
          variant="contained"
          sx={{
            borderRadius: 0,
            width: "33.33%",
            height: "100%",
            fontSize: "10px",
          }}
          color="redButton"
          // onClick={handleClick}
        >
          {i18n["talentCard.shortlist"]}
        </Button>
        {/* <Box
          sx={{
            height: 43,
            width: 43,
            maxHeight: { xs: 43 },
            maxWidth: { xs: 43 },
            borderRadius: "6px",
            background: theme.palette.chart.yellow,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
            alt="job_apply"
            src={job_apply}
          />
        </Box>
        <Grid sx={{ width: "75%", padding: 0, ml: 1 }}>
          <Button
            sx={{
              boxShadow: 0,
              fontSize: "12px",
              width: "100%",
              height: "43px",
            }}
            variant="contained"
            color="redButton100"
          >
            {i18n["talentCard.shortlist"]}
          </Button>
        </Grid> */}
      </Grid>
    </CustomCard>
  );
}
