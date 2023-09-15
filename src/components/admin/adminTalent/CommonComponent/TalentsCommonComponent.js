import { useState, useEffect } from "react";
import TalentFilters from "./TalentFilters";
import { useDispatch } from "react-redux";
import { getAllTalentJobs } from "../../../../redux/admin/jobsSlice";
import { setAlert } from "../../../../redux/configSlice";
import { ALERT_TYPE } from "../../../../utils/Constants";
import { Box } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import TalentCard from "./TalentCard";

const BASIC = {
    lastKey: "",
    status_id: "",
    job_stage: "",
    job_title: "",
    job_type: "",
};
const TalentsCommonComponent = ({ listName }) => {
    const [totalTalents, setTotalTalents] = useState(0);
    const [allTalents, setAllTalent] = useState([]);
    const [lastKey, setLastKey] = useState("");

    const [basicData, setBasicData] = useState(BASIC);
    const [searchTitle, setSearchTitle] = useState("")
    const [personalityAdded, setPersonalityAdded] = useState(false);
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
    const dispatch = useDispatch()

    const getJobList = async (lastkeyy) => {
        const fetchDataInfo = {
            lastKey: lastkeyy,
            title: searchTitle,
            followerpool: listName === "Followers"? "true": "false",
            applicantpool: listName === "Applicants"? "true": "false",
            pool_id: 0
        }
        const { payload } = await dispatch(getAllTalentJobs(fetchDataInfo));
        if (payload.status === "success") {
            if (lastkeyy === 0) {
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
            job_title: event.target.value,
        };
        console.log(newBasicData);
        setBasicData(newBasicData);
        setSearchTitle(event.target.value)
        setAllTalent([]);
        await jobFIlters("", newBasicData);
    };
    const handleJobRoleChange = async (event) => {
        const {
            target: { value },
            target: { name },
            target: { id },
        } = event;
        console.log(value, name);
        const temp = stageArray.find((item) => item.id === value);
        console.log(value, name, id);
        console.log(temp.name);
        let newBasicData = {
            ...basicData,
            job_stage: temp.name,
        };
        console.log(newBasicData);
        setBasicData(newBasicData);
        setAllTalent([]);
        // await jobFIlters("", newBasicData);
    };
    useEffect(() => {
        getJobList(0);
        // pendingJobCount();
    }, [personalityAdded]);

    return (
        <>
            <TalentFilters
                title={listName}
                totlaCount={totalTalents}
                handleJobRoleChange={handleJobRoleChange}
                handleInputSearch={handleInputSearch}
                stageArray={stageArray}
            />
            <InfiniteScroll
                style={{ overflow: "hidden" }}
                dataLength={allTalents.length}
                next={() => getJobList(lastKey)}
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
                </Box >
            </InfiniteScroll>
        </>
    )
}

export default TalentsCommonComponent