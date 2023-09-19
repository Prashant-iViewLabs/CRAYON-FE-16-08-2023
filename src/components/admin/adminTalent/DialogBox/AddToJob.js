import { Box, Popover, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Ozow from "../../../../assets/Company Logos/Screenshot 2023-08-11 at 12.21.50.png";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  addTalentToJob,
  getAdminTalentJobList,
} from "../../../../redux/admin/jobsSlice";
import { useDispatch } from "react-redux";
import { setAlert } from "../../../../redux/configSlice";
import { ALERT_TYPE } from "../../../../utils/Constants";

export default function AddToJob({ talentContent, jobClick, setJobClick }) {
  const dispatch = useDispatch();

  const [lastKey, setLastKey] = useState(0);
  const [talentJobs, setTalentJobs] = useState([]);

  const getTalentJobList = async (lastkeyy) => {
    console.log("LAST KEY", lastkeyy);
    const { payload } = await dispatch(getAdminTalentJobList(lastkeyy));
    if (payload?.status == "success") {
      if (lastkeyy === "") {
        setTalentJobs(payload.data);
        setLastKey(payload.pageNumber + 1);
      } else {
        setTalentJobs((prevState) => [...prevState, ...payload.data]);
        setLastKey(payload.pageNumber + 1);
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

  const addToJob = async (event, canId) => {
    try {
      const job = talentJobs.find(
        (item) => item.title === event.target.textContent
      );
      const data = {
        candidate_id: canId,
        job_id: job.job_id,
      };
      const { payload } = await dispatch(addTalentToJob(data));
      if (payload.status === "success") {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Talent added to job successfully",
          })
        );
        setJobClick(null);
      } else {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.ERROR,
            msg: payload?.message?.message,
          })
        );
      }
    } catch (error) {}
  };

  useEffect(() => {
    jobClick && getTalentJobList("");
  }, [jobClick]);

  return (
    <Box
      sx={{
        padding: "16px !important",
      }}
    >
      <Typography
        sx={{
          fontSize: "12px",
          fontWeight: 700,
        }}
      >
        Add to Job
      </Typography>
      <Typography sx={{ fontSize: "11px", fontWeight: 700, mt: 1 }}>
        Select the talent you want to add to a existing job
      </Typography>

      <Box>
        <Box
          id="talentList"
          sx={{ overflow: "hidden", height: "380px", mt: 1 }}
        >
          <InfiniteScroll
            style={{
              height: "100%",
              overflowX: "hidden",
              scrollbarWidth: "thin",
            }}
            dataLength={talentJobs?.length}
            next={() => getTalentJobList(lastKey)}
            hasMore={true}
            // scrollThreshold={"90%"}
            scrollableTarget="talentList"
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {talentJobs.map((item, index) => {
              return (
                <Box sx={{ display: "flex", mt: 2 }}>
                  <Box
                    component="img"
                    className="profileAvatar"
                    alt="crayon logo"
                    src={Ozow}
                    sx={{
                      mr: 1,
                      height: "35px !important",
                      width: "35px !important",
                      borderRadius: "5px",
                    }}
                  />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                      key={index}
                      onClick={(event) =>
                        addToJob(event, talentContent?.user_id)
                      }
                    >
                      {item.title}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
            <style>
              {`.infinite-scroll-component::-webkit-scrollbar {
                      width: 7px !important;
                      background-color: #F5F5F5; /* Set the background color of the scrollbar */
                    }

                    .infinite-scroll-component__outerdiv {
                      height:100%
                    }

                    .infinite-scroll-component::-webkit-scrollbar-thumb {
                      background-color: #888c; /* Set the color of the scrollbar thumb */
                    }`}
            </style>
          </InfiniteScroll>
        </Box>
      </Box>
    </Box>
  );
}
