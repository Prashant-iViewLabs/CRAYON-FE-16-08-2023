import { useState, useEffect } from "react";
import TalentFilters from "./TalentFilters";
import { useDispatch } from "react-redux";
import { getAllTalentJobs } from "../../../../redux/admin/jobsSlice";
import { setAlert } from "../../../../redux/configSlice";
import { ALERT_TYPE, ERROR_MSG } from "../../../../utils/Constants";
import { Box } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import TalentCard from "./TalentCard";
import { getTraits } from "../../../../redux/employer/postJobSlice";
import { useSelector } from "react-redux";

const BASIC = {
  lastKey: 0,
  title: "",
  applicantpool: false,
  followerpool: false,
  pool_id: "",
  job_id: "",
  stage: "",
};
const TalentsCommonComponent = ({ listName }) => {
  const [totalTalents, setTotalTalents] = useState(0);
  const [allTalents, setAllTalent] = useState([]);
  const [lastKey, setLastKey] = useState(0);

  const [basicData, setBasicData] = useState(BASIC);
  const [searchTitle, setSearchTitle] = useState("");
  const [stageArray, setStageArray] = useState([
    {
      id: 1,
      name: "incomplete",
    },
    {
      id: 2,
      name: "matched",
    },
    {
      id: 3,
      name: "review",
    },
    {
      id: 4,
      name: "considering",
    },
    {
      id: 5,
      name: "shortlist",
    },
    {
      id: 6,
      name: "interview",
    },
    {
      id: 7,
      name: "assessment",
    },
    {
      id: 8,
      name: "offer",
    },
    {
      id: 9,
      name: "hired",
    },
    {
      id: 10,
      name: "rejected",
    },
  ]);
  const dispatch = useDispatch();

  const getJobList = async (lastkeyy, newBasicData) => {
    console.log(newBasicData);
    const fetchDataInfo = {
      ...newBasicData,
      followerpool: listName === "Followers" ? "true" : "false",
      applicantpool: listName === "Applicants" ? "true" : "false",
    };
    console.log(fetchDataInfo);
    const { payload } = await dispatch(getAllTalentJobs(fetchDataInfo));
    if (payload.status === "success") {
      if (payload.pageNumber === 0) {
        setAllTalent(payload.data);
        setLastKey(payload.offset + 1);
        setTotalTalents(payload?.talentCount);
      } else {
        setLastKey(payload.offset + 1);
        setAllTalent((prevState) => [...prevState, ...payload.data]);
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
  const jobFIlters = async (lastkeyy, newBasicData) => {
    const data = {
      ...newBasicData,
      lastKey: lastkeyy,
      status_id: 1,
    };
    // const { payload } = await dispatch(adminJobsFilter(data));
    // if (payload?.status === "success") {
    //     console.log(payload.data);
    //     if (lastkeyy === "") {
    //         setAllTalent(payload.data);
    //         setLastKey(payload.data[payload.data.length - 1]?.job_id);
    //     } else {
    //         setAllTalent((prevState) => [...prevState, ...payload.data]);
    //     }
    // } else {
    //     dispatch(
    //         setAlert({
    //             show: true,
    //             type: ALERT_TYPE.ERROR,
    //             msg: "Something went wrong! please relaod the window",
    //         })
    //     );
    // }
  };

  const handleInputSearch = async (event) => {
    let newBasicData = {
      ...basicData,
      title: event.target.value,
    };
    console.log(newBasicData);
    setBasicData(newBasicData);
    setSearchTitle(event.target.value);
    setAllTalent([]);
    await getJobList("", newBasicData);
  };
  const handleJobRoleChange = async (event) => {
    const {
      target: { value },
      target: { name },
      target: { id },
    } = event;
    const temp = stageArray.find((item) => item.id === value);

    let newBasicData = {
      ...basicData,
      stage: temp?.name || "",
    };
    console.log(newBasicData);
    setBasicData(newBasicData);
    setAllTalent([]);
    await getJobList("", newBasicData);
  };

  const handleAssociatedJob = async (event) => {
    const {
      target: { value },
      target: { name },
      target: { id },
    } = event;

    console.log(value, name, id);
    let newBasicData = {
      ...basicData,
      job_id: event.target.value,
    };
    console.log(newBasicData);
    setBasicData(newBasicData);
    setAllTalent([]);
    await getJobList("", newBasicData);
  };
  const handleTalentPool = async (event) => {
    const {
      target: { value },
      target: { name },
      target: { id },
    } = event;

    console.log(value, name, id);
    let newBasicData = {
      ...basicData,
      pool_id: event.target.value,
    };
    console.log(newBasicData);
    setBasicData(newBasicData);
    setAllTalent([]);
    await getJobList("", newBasicData);
  };

  useEffect(() => {
    getJobList(0, basicData);
  }, []);

  return (
    <>
      <TalentFilters
        title={listName}
        totlaCount={totalTalents}
        handleJobRoleChange={handleJobRoleChange}
        handleInputSearch={handleInputSearch}
        stageArray={stageArray}
        handleAssociatedJob={handleAssociatedJob}
        handleTalentPool={handleTalentPool}
      />
      <InfiniteScroll
        style={{ overflow: "hidden" }}
        dataLength={allTalents.length}
        next={() => getJobList(lastKey, basicData)}
        scrollThreshold={"100px"}
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
          {allTalents?.map((job, index) => (
            <TalentCard key={job.job_id} talentContent={job} />
          ))}
        </Box>
      </InfiniteScroll>
    </>
  );
};

export default TalentsCommonComponent;
