import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Select from "@mui/material/Select";
import locale from "../../../i18n/locale";
import activeDownClose from "../../../assets/Black_Down_Open - Copy.svg";
import { useDispatch } from "react-redux";
import {
  adminJobsFilter,
  getAllComments,
  getAllJobs,
  getJobCount,
} from "../../../redux/admin/jobsSlice";
import { setAlert } from "../../../redux/configSlice";
import { ALERT_TYPE } from "../../../utils/Constants";
import { Grid, InputBase, Paper } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import JobCard from "./JobCardNew";
import SmallButtonTalent from "../../common/SmallButtonTalent";
import SelectMenu from "../../common/SelectMenu";
import Filters from "./Filters";
import { data } from "../../employer/myJobs/ManageJob";

const BASIC = {
  lastKey: "",
  status_id: "",
  job_stage: "",
  job_title: "",
  job_type: "",
  team_member_user_id: "",
};

const JOBPAGE = [
  {
    urlname: "pending-jobs",
    status_id: 1,
    filters: {
      title: "Pending Jobs",
      value: "pending",
    },
  },
  {
    urlname: "active-jobs",
    status_id: 2,
    filters: {
      title: "Active Jobs",
      value: "active",
    },
  },
  {
    urlname: "paused-jobs",
    status_id: 3,
    filters: {
      title: "Paused Jobs",
      value: "paused",
    },
  },
  {
    urlname: "closed-jobs",
    status_id: 4,
    filters: {
      title: "Closed Jobs",
      value: "closed",
    },
  },
];

// const JOBPAGE = {
//   jobs: ["pending", "active", "paused", "closed"],
//   status: [1, 2, 3, 4],
//   filterTitle: ["Pending Jobs", "Active Jobs", "Paused Jobs", "Closed Jobs"],
//   filterValue: ["pending", "active", "paused", "closed"],
// };

export default function AllJobs({ page }) {
  const i18n = locale.en;
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [allJobs, setAllJobs] = useState([]);
  const dispatch = useDispatch();
  const [lastKey, setLastKey] = useState("");
  const [totalJob, setTotalJob] = useState(0);
  const [comments, setComments] = useState([]);
  const [basicData, setBasicData] = useState(BASIC);

  const temp = JOBPAGE.find((item) => item.filters.value === page);

  const [stageArray, setStageArray] = useState([
    {
      id: 1,
      name: "review",
    },
    {
      id: 2,
      name: "shortlist",
    },
    {
      id: 3,
      name: "interview",
    },
    {
      id: 4,
      name: "assessment",
    },
    {
      id: 5,
      name: "offer",
    },
  ]);

  const [jobTypeArray, setJobTypeArray] = useState([
    {
      id: 1,
      name: "crayon recruit",
    },
    {
      id: 2,
      name: "crayon lite",
    },
  ]);

  const [jobStatus, setJobStatus] = useState([
    {
      id: 1,
      name: "pending",
    },
    {
      id: 2,
      name: "active",
    },
    {
      id: 3,
      name: "paused",
    },
    {
      id: 4,
      name: "closed",
    },
  ]);

  const onHandleManageTalent = (activeJobId) => {
    navigate(`${pathname}/${activeJobId}`);
  };

  //   const getJobList = async (lastkeyy) => {
  //     const data = {
  //         ...newBasicData,
  //         lastKey: lastkeyy,
  //         status_id: 1,
  //       };
  //     const { payload } = await dispatch(getAllJobs(data));
  //     if (payload?.status === "success") {
  //       if (lastkeyy === "") {
  //         setAllJobs(payload.data);
  //         setLastKey(payload.data[payload.data.length - 1]?.job_id);
  //       } else {
  //         setAllJobs((prevState) => [...prevState, ...payload.data]);
  //       }
  //     } else {
  //       dispatch(
  //         setAlert({
  //           show: true,
  //           type: ALERT_TYPE.ERROR,
  //           msg: "Something went wrong! please relaod the window",
  //         })
  //       );
  //     }
  //   };

  const JobCount = async () => {
    const response = await dispatch(
      getJobCount(temp !== undefined ? temp.status_id : "")
    );
    setTotalJob(response.payload.count);
  };

  const getComments = async (jobid) => {
    try {
      const { payload } = await dispatch(getAllComments(jobid));
      if (payload?.status == "success") {
        setComments(payload?.data);
      } else {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.ERROR,
            msg: payload?.message,
          })
        );
      }
    } catch (error) {
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: error,
        })
      );
    }
  };

  const getJobList = async (lastkeyy, newBasicData) => {
    console.log(newBasicData.status_id);
    const data = {
      ...newBasicData,
      lastKey: lastkeyy,
      status_id: temp !== undefined ? temp.status_id : newBasicData?.status_id,
    };
    const { payload } = await dispatch(adminJobsFilter(data));
    if (payload?.status === "success") {
      console.log(payload.data);
      if (lastkeyy === "") {
        setLastKey(payload.pageNumber + 1);
        setAllJobs(payload.data);
      } else {
        setLastKey(payload.pageNumber + 1);
        setAllJobs((prevState) => [...prevState, ...payload.data]);
      }
    } else {
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: "Something went wrong! please relaod the window",
        })
      );
    }
  };

  const handleJobRoleChange = async (event) => {
    const {
      target: { value },
      target: { name },
      target: { id },
    } = event;

    const temp = stageArray.find((item) => item.id === value);
    console.log(value, name, id);
    console.log(temp.name);
    let newBasicData = {
      ...basicData,
      job_stage: temp.name,
    };
    console.log(newBasicData);
    setBasicData(newBasicData);
    setAllJobs([]);
    await getJobList("", newBasicData);
  };

  const handleJobType = async (event) => {
    const {
      target: { value },
      target: { name },
      target: { id },
    } = event;

    const temp = jobTypeArray.find((item) => item.id === value);
    console.log(value, name, id);
    console.log(temp.name);
    let newBasicData = {
      ...basicData,
      job_type: temp.name,
    };
    console.log(newBasicData);
    setBasicData(newBasicData);
    setAllJobs([]);
    await getJobList("", newBasicData);
  };

  const handleInputSearch = async (event) => {
    let newBasicData = {
      ...basicData,
      job_title: event.target.value,
    };
    console.log(newBasicData);
    setBasicData(newBasicData);
    setAllJobs([]);
    await getJobList("", newBasicData);
  };

  const handleTeamMember = async (event) => {
    const {
      target: { value },
      target: { name },
      target: { id },
    } = event;

    console.log(value, name, id);
    let newBasicData = {
      ...basicData,
      team_member_user_id: event.target.value,
    };
    console.log(newBasicData);
    setBasicData(newBasicData);
    setAllJobs([]);
    await getJobList("", newBasicData);
  };

  const handleJobStatus = async (event) => {
    let newBasicData = {
      ...basicData,
      status_id: event.target.value,
    };
    console.log(newBasicData);
    setBasicData(newBasicData);
    setAllJobs([]);
    await getJobList("", newBasicData);
  };

  useEffect(() => {
    getJobList(lastKey, basicData);
    JobCount();
  }, []);

  return (
    <Box sx={{ ml: 0 }}>
      <Filters
        title={temp !== undefined ? temp?.filters?.title : "All Jobs"}
        total={totalJob}
        handleJobRoleChange={handleJobRoleChange}
        value={temp !== undefined ? temp?.filters?.value : ""}
        handleJobType={handleJobType}
        stageArray={stageArray}
        jobTypeArray={jobTypeArray}
        handleInputSearch={handleInputSearch}
        handleTeamMember={handleTeamMember}
        jobStatus={jobStatus}
        handleJobStatus={handleJobStatus}
      />
      <Grid
        container
        spacing={2}
        flexDirection={"column"}
        sx={{
          display: { xs: "none", md: "flex" },
          marginTop: "30px",
        }}
      >
        <InfiniteScroll
          style={{ overflow: "hidden" }}
          dataLength={allJobs.length}
          next={() => getJobList(lastKey, basicData)}
          scrollThreshold={"10px"}
          hasMore={true}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <Box
            sx={{
              mt: 2,
            }}
          >
            {allJobs?.map((job, index) => (
              <JobCard
                key={index}
                index={job.job_id}
                jobContent={job}
                onManageTalent={onHandleManageTalent}
                getJobList={getJobList}
                comments={comments}
                setComments={setComments}
                getComments={getComments}
              />
            ))}
          </Box>
        </InfiniteScroll>
      </Grid>
    </Box>
  );
}
