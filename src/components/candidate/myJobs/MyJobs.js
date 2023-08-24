import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import TalentCard from "../../guest/talent/TalentCard";
import MyJobsCard from "./MyJobsCardNew";
import { useTheme } from "@mui/material/styles";
import SearchBar from "../../common/SearchBar";
import SwipeableViews from "react-swipeable-views";
import ButtonPanel from "../../common/ButtonPanel";
import {
  ALERT_TYPE,
  EMPLOYER_MY_JOBS_LEFT,
  EMPLOYER_MY_JOBS_RIGHT,
  JOBS_LEFT_INDUSTRIES_BUTTON_GROUP,
  JOBS_LEFT_TYPES_BUTTON_GROUP,
  JOBS_RIGHT_JOB_TYPES_BUTTON_GROUP,
  JOBS_RIGHT_POSTS_BUTTON_GROUP,
  JOBS_RIGHT_STAGES_BUTTON_GROUP,
} from "../../../utils/Constants";
import locale from "../../../i18n/locale";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllIndustries, setAlert } from "../../../redux/configSlice";
import {
  getCandidateFilteredJob,
  getCandidateJobs,
} from "../../../redux/candidate/candidateJobs";
import { getJobStatus } from "../../../redux/status";
import { useSelector } from "react-redux";
import { getMyStatusFilter } from "../../../redux/candidate/myStatusFilter";
import { Paper } from "@mui/material";
export default function Talent() {
  const i18n = locale.en;
  const theme = useTheme();
  const dispatch = useDispatch();
  const jobStatus = useSelector((state) => state.configjobstatus.status);
  const myStatus = useSelector((state) => state.configMyStatus.mystatusfilter);
  const [candidateJobs, setCandidateJobs] = useState([]);
  const [myStatusFilter, setMyStatusFilter] = useState([myStatus[0]?.id]);
  const [jobStatusFilter, setJobStatusFilter] = useState([jobStatus[0]?.id]);

  const getStatus = async () => {
    await dispatch(getJobStatus());
  };

  const getmyStatus = async () => {
    await dispatch(getMyStatusFilter());
  };

  const getJobs = async (
    filterMyStatus = myStatusFilter,
    filterJobStatus = jobStatusFilter
  ) => {
    if (
      filterMyStatus.length == 1 &&
      filterMyStatus[0] == 1111 &&
      filterJobStatus == 1 &&
      filterJobStatus == 1111
    ) {
      const { payload } = await dispatch(getCandidateJobs());
      if (payload?.status == "success") {
        setCandidateJobs((prevState) => [...prevState, ...payload.data]);
      } else {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.ERROR,
            msg: payload?.message,
          })
        );
      }
    } else {
      const data = {
        filterMyStatus: filterMyStatus.toString(),
        filterJobStatus: filterJobStatus.toString(),
      };
      const { payload } = await dispatch(getCandidateFilteredJob(data));

      if (payload?.status == "success") {
        // setCandidateJobs((prevState) => [...prevState, ...payload.data]);
        setCandidateJobs(payload.data);
      } else {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.ERROR,
            msg: payload?.message,
          })
        );
      }
    }
  };

  useEffect(() => {
    getJobs();
    getStatus();
    getmyStatus();
  }, []);

  const leftStatusFilter = (selectedFilter) => {
    setCandidateJobs([]);
    setMyStatusFilter(selectedFilter);
    console.log("LEFT STATUS FILTER", selectedFilter);
    getJobs(selectedFilter, jobStatusFilter);
  };

  const rightStatusFilter = (selectedFilter) => {
    setCandidateJobs([]);
    setJobStatusFilter(selectedFilter);
    getJobs(myStatusFilter, selectedFilter);
  };

  return (
    <Grid
      container
      spacing={0}
      flexDirection={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
    >
      <Grid
        item
        md={2}
        lg={1}
        xl={1}
        className="filterSec"
        sx={{
          height: "88vh",
          overflowY: "scroll",
        }}
      >
        <Paper
          sx={{
            background: "transparent",
            marginRight: "1px",
          }}
        >
          <ButtonPanel
            panelData={myStatus}
            side="left"
            onChangeFilter={leftStatusFilter}
          />
        </Paper>
        <style>
          {`.filterSec::-webkit-scrollbar {
                      width: 5px !important;
                      background-color: #EFEEEE; /* Set the background color of the scrollbar */
                    }
                    .filterSec::-webkit-scrollbar-thumb {
                      background-color: white;
                      width: 5px;
                      box-shadow: 0px 3px 3px #00000029;
                      border-radius: 3px;
                    }`}
        </style>
      </Grid>
      <Grid
        xs={12}
        sm={6}
        md={8}
        lg={9}
        xl={10}
        sx={{
          px: 2,
          display: "flex",
          flexDirection: "column",
        }}
        gap={1}
        flexGrow="1 !important"
      >
        <SearchBar placeholder={i18n["jobs.searchPlaceholder"]} />
        <InfiniteScroll
          key={`${jobStatusFilter}, ${myStatusFilter}`}
          // style={{ overflow: "hidden" }}
          height="80vh"
          scrollThreshold={"100px"}
          dataLength={candidateJobs.length}
            // next={getJobs}
          hasMore={true}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <Grid
            container
            spacing={2}
            flexDirection={{ sx: "column", md: "row" }}
            sx={{
              display: { xs: "none", md: "flex" },
            }}
            width={"99.5%"}
          >
            {candidateJobs.length > 0 ? (
              candidateJobs?.map((talent) => (
                <Grid xl={3} lg={4} md={6} xs={12} key={talent}>
                  <MyJobsCard index={talent} job={talent} getJobs={getJobs} />
                </Grid>
              ))
            ) : (
              <Box
                sx={{
                  width: "100%",
                  textAlign: "center",
                  mt: 4,
                  color: theme.palette.placeholder,
                }}
              >
                {i18n["jobs.noData"]}
              </Box>
            )}
          </Grid>
          <style>
            {`.infinite-scroll-component::-webkit-scrollbar {
                      width: 5px !important;
                      background-color: #EFEEEE; /* Set the background color of the scrollbar */
                    }
                    .infinite-scroll-component__outerdiv {
                      height:100%
                    }
                    .infinite-scroll-component::-webkit-scrollbar-thumb {
                      background-color: white;
                      width: 5px;
                      box-shadow: 0px 3px 3px #00000029;
                      border-radius: 3px;/* Set the color of the scrollbar thumb */
                    }`}
          </style>
        </InfiniteScroll>
        {/*
      <Grid container spacing={2} sx={{ my: 2, display: { md: "none" } }}>
          <SwipeableViews enableMouseEvents onTouchStart={isolateTouch}>
            <Grid xl={3} lg={4} md={6} xs={12} sx={{ px: 3 }}>
              <MyJobsCard index="11" />
            </Grid>
            <Grid xl={3} lg={4} md={6} xs={12} sx={{ px: 3 }}>
              <MyJobsCard index="12" />
            </Grid>
            <Grid xl={3} lg={4} md={6} xs={12} sx={{ px: 3 }}>
              <MyJobsCard index="13" />
            </Grid>
            <Grid xl={3} lg={4} md={6} xs={12} sx={{ px: 3 }}>
              <MyJobsCard index="14" />
            </Grid>
            <Grid xl={3} lg={4} md={6} xs={12} sx={{ px: 3 }}>
              <MyJobsCard index="15" />
            </Grid>
            <Grid xl={3} lg={4} md={6} xs={12} sx={{ px: 3 }}>
              <MyJobsCard index="16" />
            </Grid>
          </SwipeableViews>
        </Grid>
      */}
      </Grid>
      <Grid
        item
        md={2}
        lg={1}
        xl={1}
        className="rightfilterSec"
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "88vh",
          overflowY: "scroll",
          direction: "rtl",
        }}
      >
        <style>
          {`.rightfilterSec::-webkit-scrollbar {
                       width: 5px !important;
                       background-color: #EFEEEE; /* Set the background color of the scrollbar */
                    }
                    .rightfilterSec::-webkit-scrollbar-thumb {
                      background-color: white;
                      width: 5px;
                      box-shadow: 0px 3px 3px #00000029;
                      border-radius: 3px;
                    }`}
        </style>
        <Paper
          sx={{
            background: "transparent",
            marginLeft: "1px",
          }}
        >
          <ButtonPanel
            panelData={jobStatus}
            side="right"
            onChangeFilter={rightStatusFilter}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
