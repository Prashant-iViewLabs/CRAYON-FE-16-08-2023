import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import locale from "../../../../i18n/locale";
import { useDispatch } from "react-redux";
import activeDownClose from "../../../../assets/Black_Down_Open - Copy.svg";
import {
  adminJobsFilter,
  getAllComments,
  getAllJobs,
  getJobCount,
} from "../../../../redux/admin/jobsSlice";
import JobCard from "../JobCardNew";
import { setAlert } from "../../../../redux/configSlice";
import { ALERT_TYPE } from "../../../../utils/Constants";
import { Grid, InputBase, Paper } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTheme } from "@emotion/react";
import SmallButtonTalent from "../../../common/SmallButtonTalent";
import Filters from "../Filters";

const BASIC = {
  lastKey: "",
  status_id: "",
  job_stage: "",
  job_title: "",
  job_type: "",
};

export default function ActiveJobs() {
  const i18n = locale.en;
  const theme = useTheme();
  const [allJobs, setAllJobs] = useState([]);
  const dispatch = useDispatch();
  const [lastKey, setLastKey] = useState("");
  const [totalJob, setTotalJob] = useState(0);
  const [comments, setComments] = useState([]);
  const [basicData, setBasicData] = useState(BASIC);

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
      name: "permanent",
    },
    {
      id: 2,
      name: "contract",
    },
    {
      id: 3,
      name: "freelance",
    },
  ]);

  const getJobList = async (lastkeyy) => {
    console.log("LAST KEY", lastkeyy);
    const { payload } = await dispatch(getAllJobs(lastkeyy + "&status_id=2"));
    if (payload?.status == "success") {
      if (lastkeyy === "") {
        setAllJobs(payload.data);
        setLastKey(payload.data[payload.data.length - 1]?.job_id);
      } else {
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

  const JobCount = async () => {
    const response = await dispatch(getJobCount(2));
    setTotalJob(response?.payload?.count);
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

  useEffect(() => {
    getJobList(lastKey);
    JobCount();
  }, []);

  const jobFIlters = async (lastkeyy, newBasicData) => {
    const data = {
      ...newBasicData,
      lastKey: lastkeyy,
      status_id: 2,
    };
    const { payload } = await dispatch(adminJobsFilter(data));
    if (payload?.status === "success") {
      if (lastkeyy === "") {
        setAllJobs(payload.data);
        setLastKey(payload.data[payload.data.length - 1]?.job_id);
      } else {
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
    await jobFIlters("", newBasicData);
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
    await jobFIlters("", newBasicData);
  };

  const handleInputSearch = async (event) => {
    let newBasicData = {
      ...basicData,
      job_title: event.target.value,
    };
    console.log(newBasicData);
    setBasicData(newBasicData);
    setAllJobs([]);
    await jobFIlters("", newBasicData);
  };

  return (
    <Box sx={{ ml: 0 }}>
      <Filters
        title={"Active Jobs"}
        total={totalJob}
        handleJobRoleChange={handleJobRoleChange}
        value={"active"}
        handleJobType={handleJobType}
        stageArray={stageArray}
        jobTypeArray={jobTypeArray}
        handleInputSearch={handleInputSearch}
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
          next={() => getJobList(lastKey)}
          hasMore={true}
          scrollThreshold={"10px"}
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
                comments={comments}
                setComments={setComments}
                getComments={getComments}
                getJobList={getJobList}
              />
            ))}
          </Box>
        </InfiniteScroll>
      </Grid>
    </Box>
  );
}
