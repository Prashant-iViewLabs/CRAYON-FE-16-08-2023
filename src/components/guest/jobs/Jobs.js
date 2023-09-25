import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { useTheme } from "@mui/material/styles";
import JobCard from "./JobCardNew";
import SearchBar from "../../common/SearchBar";
import ButtonPanel from "../../common/ButtonPanel";
import {
  JOBS_RIGHT_STAGES_BUTTON_GROUP,
  ALERT_TYPE,
  JOBS_RIGHT_COMPANIES_BUTTON,
} from "../../../utils/Constants";
import locale from "../../../i18n/locale";
import { getFilteredJobs } from "../../../redux/guest/jobsSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import { getAllIndustries } from "../../../redux/configSlice";
import { setAlert } from "../../../redux/configSlice";
import { getAllJobRoleType } from "../../../redux/jobRole";
import { getAllStages } from "../../../redux/stages";
import { getAllTypes } from "../../../redux/allTypes";
import jwt_decode from "jwt-decode";
import CustomDialog from "../../common/CustomDialog";
import ApplyJobs from "./ApplyJobs";
import { Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import leftArrow from "../../../assets/Black_Right_Next.svg";
import LeftArrow from "../../common/LeftArrow";
import RightArrow from "../../common/RightArrow";

const BASIC = {
  job_title: "",
  region_id: [],
  tag_id: [],
  town_id: [],
  tool_id: [],
  salary: [],
  experience: [],
  company_id: [],
  currency_id: [],
  highest_qualification_id: [],
};

export default function Jobs() {
  const i18n = locale.en;
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const allIndustries = useSelector((state) => state.config.industries);
  const allJobTypes = useSelector((state) => state.jobtype.jobRoleType);
  const allStages = useSelector((state) => state.configstages.stages);
  const allTypes = useSelector((state) => state.configAllTypes?.types);
  const [allJobs, setAllJobs] = useState([]);
  const [filters, setFilters] = useState([allIndustries[0]?.id]);
  const [filtersJobType, setFiltersJobType] = useState([allJobTypes[0]?.id]);
  const [filtersJobStage, setFiltersJobStage] = useState([allStages[0]?.id]);
  const [filtersType, setFiltersType] = useState([allTypes[0]?.id]);
  const [favourite, setFavourite] = useState(false);
  const [lastKey, setLastKey] = useState("");
  const [searchedJobs, setSearchedJobs] = useState("");
  const [questions, setQuestions] = useState([]);
  const [openApplyJobDialog, setopenApplyJobDialog] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [expandedItemId, setExpandedItemId] = useState(null);
  const [basicData, setBasicData] = useState(BASIC);
  const [rightExpand, setRightExpand] = useState(true);
  const [leftExpanded, setLeftExpand] = useState(true);

  const token = localStorage?.getItem("token");
  let decodedToken;
  if (token) {
    decodedToken = jwt_decode(token);
  }

  const onHandleClose = () => {
    setopenApplyJobDialog(false);
  };

  const handleFilterSelection = (paramType, filterName) => {
    // Toggle filter selection
    // if (paramType === "filter") {
    const updatedFilters = selectedFilters.includes(filterName)
      ? selectedFilters.filter((filter) => filter !== filterName)
      : [filterName];
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set(paramType, updatedFilters.join(","));
    navigate(`${window.location.pathname}?${queryParams.toString()}`);
    setSelectedFilters(updatedFilters);
  };

  const getTypes = async () => {
    dispatch(getAllTypes());
  };
  const getIndustries = async () => {
    dispatch(getAllIndustries());
  };
  const getJobTypes = async () => {
    dispatch(getAllJobRoleType());
  };
  const getStages = async () => {
    dispatch(getAllStages());
  };

  const getJobList = async (
    selectedFilters = [],
    jobtype = [],
    jobstage = [],
    personalityType = [],
    lastkeyy,
    job_title = "",
    filteralltype = {}
  ) => {
    let data = {
      selectedFilters:
        selectedFilters[0] !== 1111 ? selectedFilters.toString() : "",
      lastKey: lastkeyy?.toString(),
      jobtype: jobtype[0] !== 1111 ? jobtype.toString() : "",
      jobstage: jobstage[0] !== 1111 ? jobstage.toString() : "",
      personalityType:
        personalityType[0] !== 1111 ? personalityType.toString() : "",
      job_title: job_title,
      user_id: token ? decodedToken?.data?.user_id : "",
      favourites: filteralltype.favourite || "",
      recentjob: filteralltype.recent || "",
      appliedjob: filteralltype.appliedJobs || "",
      ...basicData,
    };

    const { payload } = await dispatch(getFilteredJobs(data));

    if (payload?.status === "success") {
      setLastKey(payload.pageNumber + 1);
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
  };

  useEffect(() => {
    getJobList();
    getIndustries();
    getJobTypes();
    getStages();
    getTypes();
  }, []);
  // useEffect(() => {
  //   setAllJobs([]);
  //   setFilters([allIndustries[0]?.id]);
  //   setFiltersJobType([allJobTypes[0]?.id]);
  //   setFiltersJobStage([allStages[0]?.id]);
  //   setFiltersType([allTypes[0]?.id]);
  //   setSearchedJobs("");
  // }, []);
  const onChangeFilter = (selectedFilter) => {
    let industry = [];
    selectedFilter.map((type) => {
      let selectedJobType = allIndustries.find(
        (jobtype) => jobtype.id === type
      );
      industry.push(selectedJobType.name);
    });
    handleFilterSelection("filter", industry);
    setAllJobs([]);
    setLastKey("");
    setFilters(selectedFilter);
    getJobList(
      selectedFilter,
      filtersJobType,
      filtersJobStage,
      filtersType,
      "",
      searchedJobs,
      favourite
    );
  };
  const onChangeFilterJobType = (selectedFilter) => {
    let jobs = [];
    selectedFilter.map((type) => {
      let selectedJobType = allJobTypes.find((jobtype) => jobtype.id === type);
      jobs.push(selectedJobType.name);
    });
    setAllJobs([]);
    setLastKey("");
    setFiltersJobType(jobs);
    handleFilterSelection("jobType", jobs);
    getJobList(
      filters,
      jobs,
      filtersJobStage,
      filtersType,
      "",
      searchedJobs,
      favourite
    );
  };
  const onChangeFilterJobStage = (selectedFilter) => {
    let stage = [];
    selectedFilter.map((type) => {
      let selectedJobType = allStages.find(
        (stagetype) => stagetype.id === type
      );
      stage.push(selectedJobType.name);
    });
    handleFilterSelection("stage", stage);
    setAllJobs([]);
    setLastKey("");
    setFiltersJobStage(selectedFilter);
    getJobList(
      filters,
      filtersJobType,
      selectedFilter,
      filtersType,
      "",
      searchedJobs,
      favourite
    );
  };
  const onChangeFilterType = (selectedFilter) => {
    let selectedtypes = [];
    selectedFilter.map((types) => {
      let selectedJobType = allTypes.find((type) => type.id === types);
      selectedtypes.push(selectedJobType.name);
    });
    handleFilterSelection("Type", selectedtypes);
    setAllJobs([]);
    setLastKey("");
    setFiltersType(selectedFilter);
    getJobList(
      filters,
      filtersJobType,
      filtersJobStage,
      selectedFilter,
      "",
      searchedJobs,
      favourite
    );
  };

  const onChangefavourite = (selectedFilter) => {
    let posts = [];
    selectedFilter.map((types) => {
      let selectedJobType = JOBS_RIGHT_STAGES_BUTTON_GROUP.find(
        (type) => type.id === types
      );
      posts.push(selectedJobType.name);
    });
    handleFilterSelection("Posts", posts);
    setAllJobs([]);
    setLastKey("");
    const allTypeFilter = {
      recent: selectedFilter.includes(2) ? true : "",
      favourite: selectedFilter.includes(3) ? true : "",
      appliedJobs: selectedFilter.includes(4) ? true : "",
    };
    getJobList(
      filters,
      filtersJobType,
      filtersJobStage,
      filtersType,
      "",
      searchedJobs,
      allTypeFilter
    );
  };

  return (
    <Grid
      container
      spacing={0}
      flexDirection={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      flexWrap={"nowrap"}
    >
      <Grid
        item
        // md={2}
        // lg={1}
        // xl={1}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: leftExpanded ? "150px" : "40px",
          // marginRight: "30px",
        }}
      >
        <Button
          variant="contained"
          sx={{
            position: "static",
            borderRadius: "0 10px 10px 0",
            minWidth: "40px",
            width: "40px",
            height: "45px",
          }}
          color="redButton200"
          onClick={() => {
            setLeftExpand((prevState) => !prevState);
          }}
        >
          {leftExpanded ? <LeftArrow /> : <RightArrow />}
        </Button>
        {leftExpanded && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              height: "95vh",
              overflowY: leftExpanded ? "scroll" : "unset",
            }}
            className="filterSec"
          >
            <Paper
              sx={{
                background: "transparent",
                marginRight: "1px",
                boxShadow: 0,
              }}
            >
              <ButtonPanel
                panelData={allIndustries}
                side="left"
                onChangeFilter={onChangeFilter}
              />
            </Paper>

            <Button
              variant="contained"
              sx={{
                position: "static",
                borderRadius: "0 10px 10px 0",
                minWidth: "40px",
                width: "40px",
                height: "45px",
              }}
              color="redButton200"
              onClick={() => {
                setLeftExpand((prevState) => !prevState);
              }}
            >
              {leftExpanded ? <LeftArrow /> : <RightArrow />}
            </Button>
            <style>
              {`.filterSec::-webkit-scrollbar {
                      width: 0px !important;
                      background-color: #EFEEEE; /* Set the background color of the scrollbar */
                    }
                    .filterSec::-webkit-scrollbar-thumb {
                      background-color: white;
                      width: 0px;
                      box-shadow: 0px 3px 3px #00000029;
                      border-radius: 0px;
                    }`}
            </style>
          </Box>
        )}
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={8}
        lg={9}
        xl={10}
        sx={{
          paddingX: "30px",
          display: "flex",
          flexDirection: "column",
        }}
        gap={"54px"}
        flexGrow="1 !important"
      >
        <SearchBar
          placeholder={i18n["jobs.searchPlaceholder"]}
          setAllJobs={setAllJobs}
          setLastKey={setLastKey}
          setBasicData={setBasicData}
          basicData={basicData}
        />

        <InfiniteScroll
          height="95vh"
          key={`${filters} + ${filtersJobType} + ${filtersJobStage} + ${filtersType}+${searchedJobs} +${favourite}`}
          dataLength={allJobs.length} //This is important field to render the next data
          next={() =>
            getJobList(
              filters,
              filtersJobType,
              filtersJobStage,
              filtersType,
              lastKey,
              searchedJobs,
              favourite
            )
          }
          scrollThreshold={"1px"}
          hasMore={true}
          // style={{
          //   height: "none !important",
          //   overflow: "unset !important",
          // }}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <Grid
            container
            gap={"40px"}
            flexDirection={{ sx: "column", md: "row" }}
            sx={{
              display: { xs: "none", md: "flex" },
              margin: "0px !important",
              justifyContent: "center",
              // paddingTop: "0px !important",
            }}
            width={"100%"}
          >
            {allJobs.length > 0
              ? allJobs?.map((job) => (
                  // <Grid xl={3} lg={4} md={6} xs={12} key={job.job_id}>
                  <Grid
                    sx={{
                      width: "360px",
                      height: "530px",
                      marginBottom: 0,
                    }}
                    key={job.job_id}
                  >
                    <JobCard
                      job={job}
                      setQuestions={setQuestions}
                      onHandleClose={onHandleClose}
                      setopenApplyJobDialog={setopenApplyJobDialog}
                    />
                  </Grid>
                ))
              : (allJobs.length = 0 ? (
                  <Box
                    sx={{
                      width: "100%",
                      textAlign: "center",
                      mt: 4,
                      color: theme.palette.placeholder,
                    }}
                  >
                    {""}
                  </Box>
                ) : null)}
          </Grid>
          <style>
            {`.infinite-scroll-component::-webkit-scrollbar {
                      width: 0px !important;
                      background-color: #EFEEEE; /* Set the background color of the scrollbar */
                    }
                    .infinite-scroll-component__outerdiv {
                      height:100%
                    }
                    .infinite-scroll-component::-webkit-scrollbar-thumb {
                      background-color: white;
                      width: 0px;
                      box-shadow: 0px 3px 3px #00000029;
                      border-radius: 3px;/* Set the color of the scrollbar thumb */
                    }`}
          </style>
        </InfiniteScroll>
      </Grid>
      <Grid
        item
        // md={2}
        // lg={1}
        // xl={1}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          direction: "rtl",
          width: rightExpand ? "150px" : "40px",
          // marginLeft: "30px",
        }}
      >
        <Button
          variant="contained"
          sx={{
            position: "sticky",
            top: 0,
            borderRadius: "10px 0 0 10px",
            minWidth: "40px",
            width: "40px",
            height: "45px",
          }}
          color="redButton200"
          onClick={() => {
            setRightExpand((prevState) => !prevState);
          }}
        >
          {rightExpand ? <RightArrow /> : <LeftArrow />}
        </Button>
        {rightExpand && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              height: "95vh",
              overflowY: rightExpand ? "scroll" : "unset",
            }}
            className="rightfilterSec"
          >
            <style>
              {`.rightfilterSec::-webkit-scrollbar {
                       width: 0px !important;
                       background-color: #EFEEEE; /* Set the background color of the scrollbar */
                    }
                    .rightfilterSec::-webkit-scrollbar-thumb {
                      background-color: white;
                      width: 0px;
                      box-shadow: 0px 3px 3px #00000029;
                      border-radius: 3px;
                    }`}
            </style>
            <Paper
              sx={{
                background: "transparent",
                boxShadow: 0,
                gap: "10px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <ButtonPanel
                topMargin={true}
                panelData={allJobTypes}
                side="right"
                onChangeFilter={onChangeFilterJobType}
              />
              <ButtonPanel
                panelData={JOBS_RIGHT_COMPANIES_BUTTON}
                side="right"
              />
              <ButtonPanel
                panelData={allStages}
                side="right"
                onChangeFilter={onChangeFilterJobStage}
              />
              <ButtonPanel
                panelData={JOBS_RIGHT_STAGES_BUTTON_GROUP}
                onChangeFilter={onChangefavourite}
                side="right"
              />
              <ButtonPanel
                panelData={allTypes}
                side="right"
                onChangeFilter={onChangeFilterType}
              />
            </Paper>
            <Button
              variant="contained"
              sx={{
                position: "sticky",
                top: 0,
                borderRadius: "10px 0 0 10px",
                minWidth: "40px",
                width: "40px",
                height: "45px",
              }}
              color="redButton200"
              onClick={() => {
                setRightExpand((prevState) => !prevState);
              }}
            >
              {rightExpand ? <RightArrow /> : <LeftArrow />}
            </Button>
          </Box>
        )}
      </Grid>

      <CustomDialog
        show={openApplyJobDialog}
        hideButton={false}
        onDialogClose={onHandleClose}
        dialogWidth="xs"
        padding={0}
        showFooter={false}
        isApplyJob
      >
        <ApplyJobs
          questions={questions}
          setopenApplyJobDialog={setopenApplyJobDialog}
        />
      </CustomDialog>
    </Grid>
  );
}
