import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import job_logo from "../../../../assets/job_logo.svg";
import job_volume from "../../../../assets/Padding Excluded/Crayon Icon_Promote.svg";
import job_exp from "../../../../assets/Padding Included/Green_Duration.svg";
import BlueCurrency from "../../../../assets/Blue_Salary.svg";
import redLocation from "../../../../assets/Red_Location.svg";
import calendar from "../../../../assets/Padding Included/Yellow_Calendar.svg";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  getAllQuestions,
  getAllQuestionsWithoutLogin,
} from "../../../../redux/guest/getQuestions";
import { ALERT_TYPE } from "../../../../utils/Constants";
import Tooltip from "@mui/material/Tooltip";
import tooltipClasses from "@mui/material/Tooltip";
import SingleRadialChart from "../../../common/SingleRadialChart";
import SmallButton from "../../../common/SmallButton";
import CustomCard from "../../../common/CustomCard";
import PlaceIcon from "@mui/icons-material/Place";
import {
  convertDatetimeAgo,
  dateConverterMonth,
} from "../../../../utils/DateTime";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setAlert } from "../../../../redux/configSlice";
import { favouriteJob } from "../../../../redux/guest/talentSlice";
import jwt_decode from "jwt-decode";
import { formatCurrencyWithCommas } from "../../../../utils/Currency";

import matchMeIcon from '../../../../assets/Padding Excluded/Black_Match_me.svg'
import viewIcon from '../../../../assets/Padding Excluded/White_View.svg'
import applyIcon from '../../../../assets/Padding Excluded/Black_Follower.svg'

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Slider2 from "../../../common/Slider2";
import JobDescripiton from "../../../common/JobDescripiton";
import { truncate } from "lodash";
import LeftArrow from "../../../common/LeftArrow";

const label1 = "applied";
const label2 = "shortlisted";
const label3 = "interviewed";

const JobCardFront = ({
  index,
  job,
  setQuestions,
  setopenApplyJobDialog,
  setisFlipped,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  // const [isHovered, setIsHovered] = useState(false);
  const [isStar, setIsStarSelected] = useState(job?.favourite);
  const jobIndustries = job?.JobIndustries?.split(",")

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
          msg: "Login as candidate to add this job as favourite",
        })
      );
    }
  };
  const getquestions = async () => {
    const { payload } = await dispatch(getAllQuestions(job?.job_id));
    if (payload?.status === "success") {
      setQuestions(payload.data);
    } else {
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: payload?.message,
        })
      );
    }
  };
  const getquestionswithoutlogin = async () => {
    const { payload } = await dispatch(
      getAllQuestionsWithoutLogin(job?.job_id)
    );
    if (payload?.status === "success") {
      setQuestions(payload.data);
    } else {
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: payload?.message,
        })
      );
    }
  };
  const handleClick = () => {
    if (decodedToken?.data?.role_id !== 4) {
      setopenApplyJobDialog(true);
      if (decodedToken?.data?.role_id === undefined) {
        getquestionswithoutlogin();
      } else {
        getquestions();
      }
    } else {
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: "Login as candidate to apply for this job",
        })
      );
    }
  };

  const getBackground = (stageName) => {
    switch (stageName) {
      case "review":
        return theme.jobCard.jobStatus.Review.main
      case "considering":
        return theme.jobCard.jobStatus.Considering.main
      case "shortlist":
        return theme.jobCard.jobStatus.Shortlist.main
      case "interview":
        return theme.jobCard.jobStatus.Interview.main
      case "assessment":
        return theme.jobCard.jobStatus.Assesment.main
      case "offer":
        return theme.jobCard.jobStatus.Offer.main
      case "hired":
        return theme.jobCard.jobStatus.Hired.main
      case "incomplete":
        return theme.jobCard.jobStatus.Incomplete.main
      case "matched":
        return theme.jobCard.jobStatus.Matched.main
      case "rehjected":
        return theme.jobCard.jobStatus.Rejected.main
      default:
        return "lightGray"
    }
  }

  return (
    <CustomCard
    >
      <Grid
        container
        justifyContent="space-between"
        alignItems="start"
        overflow={"hidden"}
        sx={{
          borderRadius: "25px 25px 0 0",
        }}
      >
        <Box
          component="img"
          sx={{
            height: "60px",
            width: "60px",
            maxHeight: { xs: "60px" },
            maxWidth: { xs: "60px" },
            ml: "15px",
            mt: "15px",
            p: 0.2,
            border: 1,
            borderColor: "lightgrey",
            borderRadius: 4,
          }}
          alt="job_logo"
          src={job?.profile_url !== "No URL" ? job?.profile_url : job_logo}
        />

        <Box sx={{
          height: "90px"
        }}>
          <Box
            sx={{
              display: "flex",
            }}
          >
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
                background: job?.job_type?.split(" ")[1] === "recruit" ? theme.jobCard.jobType.recruit.main : theme.jobCard.jobType.direct.main,
                color: theme.jobCard.jobType.recruit.contrastText,
                ":hover": {
                  background: job?.job_type?.split(" ")[1] === "recruit" ? theme.jobCard.jobType.recruit.main : theme.jobCard.jobType.direct.main,

                }
              }}
            >
              {job?.job_type?.split(" ")[1]}
            </Button>
            <Button
              sx={{
                height: "auto",
                minWidth: "60px",
                minHeight: "45px",
                borderRadius: 0,
                padding: 0,
                fontSize: 12,
                background: getBackground(job?.stage_name),
                color: "white",
                ":hover": {
                  background: getBackground(job?.stage_name)
                }
              }}
            >
              {job?.stage_name || "-"}
            </Button>
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
                onClick={handleClick}
              />
            </Box>
            <Button
              color="grayButton200"
              onClick={() =>
                decodedToken?.data?.role_id === "undefined"
                  ? handleClick
                  : handleStar(job?.job_id)
              }
              sx={{
                height: "auto",
                minWidth: "60px",
                minHeight: "45px",
                background: theme.palette.grayBackground,
                borderRadius: 0,
                padding: 0,
              }}
            >
              <StarRoundedIcon color={isStar ? "error" : "disabled"} />
            </Button>
          </Box>

          <Typography
            sx={{
              fontWeight: 400,
              fontSize: 12,
              letterSpacing: "0.75px",
              opacity: 0.8,
              paddingTop: "8px",
            }}
          >
            posted {convertDatetimeAgo(job?.updated_at)}
          </Typography>
        </Box>
      </Grid>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexGrow: 1
        }}
      >
        <Grid
          paddingTop={0}
          marginLeft={1}
          marginRight={1}
          sx={{
            flexGrow: 1,
          }}
        >
          <Tooltip
            arrow
            title={job?.title}
            placement="top"
          >
            <Link
              to={`/jobs/job-detail/${`${job?.town_name + " " + job?.town?.region_name
                }`}/${job?.job_id}`}
              target={"_blank"}
              style={{
                textDecoration: "none",
                color: theme.palette.black,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: 20,
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 1,
                }}
                gutterBottom
              >
                {job?.title || "-"}
              </Typography>
            </Link>
          </Tooltip>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "12px",
              // gap:"10px"
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                gap: 1,
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
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 14,
                  letterSpacing: "0.25px",
                }}
              >
                {job?.currency_symbol}{" "}
                {formatCurrencyWithCommas(job?.salary_min)} to{" "}
                {formatCurrencyWithCommas(job?.salary_max)} per month
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                gap: 1,
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
                alt="location"
                src={redLocation}
              />
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 14,
                  letterSpacing: "0.25px",
                }}
              >

                {job?.town_name || "-"}
                {job?.region_name && (`, ${job?.region_name} `)}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                gap: 1,
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
                alt="job_exp"
                src={job_exp}
              />
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 14,
                  letterSpacing: "0.25px",
                }}
              >
                {job?.experience_year_start} to {job?.experience_year_end}{" "}
                years
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                gap: 1.8,
              }}
            >
              <Box
                component="img"
                sx={{
                  height: 20,
                  width: 20,
                  maxHeight: { xs: 28 },
                  maxWidth: { xs: 28 },
                  padding: 0,
                }}
                alt="calendar"
                src={calendar}
              />
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 14,
                  letterSpacing: "0.25px",
                }}
              >
                {dateConverterMonth(job?.created_at)}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {/* <Slider2
              items={[job?.type, job?.work_setup]}
              color={"blueButton700"}
              hideTagsAfter={2}
            /> */}
            <Box>
              {job?.type && (
                <SmallButton
                  color={"blueButton900"}
                  height={25}
                  value={job?.type}
                  label={truncate(job?.type, { length: 12 })}
                  mr="4px"
                />)}
              {job?.work_setup && (
                <SmallButton
                  color={"blueButton900"}
                  height={25}
                  value={job?.work_setup}
                  label={truncate(job?.work_setup, { length: 12 })}
                  mr="4px"
                />)}
            </Box>
            <Slider2
              items={jobIndustries || []}
              color={"blueButton1000"}
              hideTagsAfter={2}
            />
          </Box>
          <JobDescripiton description={job?.description} />
        </Grid>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
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
            <LeftArrow />
            {/* &#62; */}
          </Button>
        </Box>
      </Box>
      <Grid
        Grid
        container
        spacing={2}
        padding="0 16px 8px 16px"
        justifyContent="space-around"
      >
        <Box sx={{ margin: "0 -22px 0 -22px" }}>
          <SingleRadialChart
            hollow="55%"
            nameSize="10px"
            valueSize="14px"
            nameOffsetY="11"
            valueOffsetY="-17"
            max={500}
            labelsData={label1}
            series={[200]}
            width={130}
            color={theme.palette.chart.Review}
            index={index}
            name={"applied"}
            // isHovered={isHovered}
          />
        </Box>
        <Box sx={{ margin: "0 -22px 0 -22px" }}>
          <SingleRadialChart
            hollow="55%"
            nameSize="10px"
            valueSize="14px"
            nameOffsetY="11"
            valueOffsetY="-17"
            labelsData={label2}
            series={[job?.totalusershorlisted]}
            width={130}
            color={theme.palette.chart.Shortlist}
            index={index}
            name={"shortlist"}
            // isHovered={isHovered}
          />
        </Box>
        <Box sx={{ margin: "0 -22px 0 -22px" }}>
          {/* {console.log(isHovered)} */}
          <SingleRadialChart
            hollow="55%"
            nameSize="10px"
            valueSize="14px"
            nameOffsetY="11"
            valueOffsetY="-17"
            labelsData={label3}
            series={[job?.totaluserinterviewed]}
            width={130}
            max={50}
            color={theme.palette.chart.Interview}
            index={index}
            name={"interviewed"}
            // isHovered={isHovered}
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
                <Grid sx={{ width: "33.33%", padding: 0, ml: 1 }}>
                    <Button
                        sx={{
                            boxShadow: 0,
                            fontSize: "10px",
                            width: "100%",
                            height: "43px",
                        }}
                        variant="contained"
                        color="redButton100"
                        onClick={handleClick}
                    >
                        {i18n["jobCard.apply"]}fontSize: "10px",
                    </Button>
                </Grid> */}
        <Button
          variant="contained"
          sx={{
            borderRadius: 0,
            width: "33.33%",
            height: "100%",
            fontSize: "12px",
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
          Match
        </Button>
        <Link
          to={`/jobs/job-detail/${`${job?.town_name + " " + job?.region_name
            }`}/${job?.job_id}`}
          target={"_blank"}
          style={{
            textDecoration: "none",
            color: theme.palette.black,
            width: "33.33%",
            height: "100%",
          }}
        >
          <Button
            variant="contained"
            sx={{
              borderRadius: 0,
              fontSize: "12px",
              whiteSpace: "nowrap",
              height: "100%",
              width: "100%",
            }}
            color="yellowButton100"
            startIcon={
              <Box
                component={"img"}
                sx={{
                  height: 40,
                  width: 40,
                  padding: 0,
                }}
                src={viewIcon}
              />
            }
          >
            View More
          </Button>
        </Link>

        <Button
          variant="contained"
          sx={{
            borderRadius: 0,
            width: "33.33%",
            height: "100%",
            fontSize: "12px",
          }}
          color="redButton"
          onClick={handleClick}
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
        >
          apply
        </Button>
      </Grid>
    </CustomCard>
  );
};

export default JobCardFront;
