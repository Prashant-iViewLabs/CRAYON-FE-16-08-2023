import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import MyJobsCard from "./MyJobsCardNew";
import ButtonPanel from "../../common/ButtonPanel";
import { ALERT_TYPE } from "../../../utils/Constants";
import SearchBar from "../../common/SearchBar";
import locale from "../../../i18n/locale";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import {
  getAllEmployerJobs,
  setAlert,
} from "../../../redux/employer/employerJobsConfigSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  getAllJobsListing,
  getFilteredJobsListing,
} from "../../../redux/employer/empJobListing";
import { getAllStages } from "../../../redux/stages";
import { getJobStatus } from "../../../redux/status";
import { Paper } from "@mui/material";

export default function MyJobs() {
  const i18n = locale.en;
  const dispatch = useDispatch();
  const [openManageJobDialog, setOpenManageJobDialog] = useState(false);
  const allStages = useSelector((state) => state.configstages.stages);
  const jobStatus = useSelector((state) => state.configjobstatus.status);
  const [allJobs, setAllJobs] = useState([]);
  const [jobListFilter, setJobListFilter] = useState([allStages[0]?.id]);
  const [jobStatusFilter, setJobStatusFilter] = useState([jobStatus[0]?.id]);
  const [talents, setTalents] = useState([]);
  const [jobTypeID, setjobTypeID] = useState();

  const allJobsFilter = async () => {
    await dispatch(getAllEmployerJobs());
  };

  const getStages = async () => {
    await dispatch(getAllStages());
  };
  const getStatus = async () => {
    await dispatch(getJobStatus());
  };

  const getJobList = async (
    selectedFilters = jobListFilter,
    selectedStatusFilter = jobStatusFilter
  ) => {
    // console.log(jobTypeID)
    if (selectedFilters.length == 0) {
      setAllJobs([]);
    } else if (
      selectedFilters.length == 1 &&
      selectedFilters[0] == 1111 &&
      selectedStatusFilter.length == 1 &&
      selectedStatusFilter[0] == 1111
    ) {
      const { payload } = await dispatch(getAllJobsListing());
      if (payload?.status == "success") {
        // setjobTypeID(payload.data[payload.data.length - 1]?.job_id);
        setAllJobs((prevState) => [...prevState, ...payload.data]);
      } else {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.ERROR,
            msg: "Something went wrong! please relaod the window",
          })
        );
      }
    } else {
      const data = {
        selectedFilters: selectedFilters.toString(),
        selectedStatusFilter: selectedStatusFilter.toString(),
      };
      const { payload } = await dispatch(getFilteredJobsListing(data));
      if (payload?.status === "success") {
        // setjobTypeID(payload.data[payload.data.length - 1]?.job_id);
        setAllJobs((prevState) => [...prevState, ...payload.data]);
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

  const jobsFilter = (selectedFilter) => {
    setAllJobs([]);
    setJobListFilter(selectedFilter);
    getJobList(selectedFilter, jobStatusFilter);
  };
  const jobsFilterLeft = (selectedFilter) => {
    setAllJobs([]);
    setJobStatusFilter(selectedFilter);
    getJobList(jobListFilter, selectedFilter);
  };

  useEffect(() => {
    allJobsFilter();
    getStages();
    getStatus();
  }, []);
  useEffect(() => {
    if (allStages?.length > 0) {
      setJobListFilter([allStages[0]?.id]);
    }
    setAllJobs([]);
    getJobList([allStages[0]?.id], [jobStatus[0]?.id]);
    setTalents([]);
  }, [openManageJobDialog]);

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
            panelData={jobStatus}
            side="left"
            onChangeFilter={jobsFilterLeft}
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
        item
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
        <SearchBar placeholder={i18n["myJobs.searchPlaceholder"]} />
        <InfiniteScroll
          key={`${jobListFilter}, ${jobStatusFilter}`}
          height="80vh"
          dataLength={allJobs.length}
          scrollThreshold={"100px"}
          // next={() => getJobList(jobListFilter, )}
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
            {console.log(allJobs)}
            {allJobs?.length > 0 ? (
              allJobs.map((job) => (
                <Grid xl={3} lg={4} md={6} xs={12} key={job.job_id}>
                  <MyJobsCard index={job.job_id} job={job} />
                </Grid>
              ))
            ) : (
              <Box
                sx={{
                  width: "100%",
                  textAlign: "center",
                  fontWeight: "bold",
                  mt: 8,
                  color: "black",
                }}
              >
                {""}
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
        {/* <Grid container spacing={2} sx={{ my: 2, display: { md: "none" } }}>
          <SwipeableViews enableMouseEvents>
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
        </Grid> */}
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
            panelData={allStages}
            side="right"
            onChangeFilter={jobsFilter}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
