import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getFollowers } from "../../../redux/admin/jobsSlice";
import { useDispatch } from "react-redux";
import { setAlert } from "../../../redux/configSlice";
import { ALERT_TYPE } from "../../../utils/Constants";
import InfiniteScroll from "react-infinite-scroll-component";
import ApplicantCard from "./ApplicantCard";
import AllTalentNewCard from "../adminTalent/AllTalentNewCard";

export default function Followers() {
  const dispatch = useDispatch();
  const [personalityAdded, setPersonalityAdded] = useState();

  const [lastKey, setLastKey] = useState();
  const [allFollowers, setAllFollowers] = useState([]);
  const getFollowedCompany = async () => {
    const { payload } = await dispatch(getFollowers(""));
    console.log(payload);
    if (payload.status === "success") {
      console.log(payload);
      setAllFollowers(payload.data);
    }
  };

  useEffect(() => {
    getFollowedCompany();
  }, [personalityAdded]);
  return (
    <Box sx={{ ml: 0 }}>
      <Typography
        sx={{
          fontSize: "36px",
          fontWeight: 700,
          // ml: 6
        }}
      >
        Followers ({}){console.log()}
      </Typography>
      <InfiniteScroll
        style={{ overflow: "hidden" }}
        dataLength={allFollowers.length}
        next={() => getFollowedCompany(lastKey)}
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
          {allFollowers?.map((job, index) => (
            <AllTalentNewCard
              key={index}
              talentContent={job}
              setPersonalityAdded={setPersonalityAdded}
            />
          ))}
        </Box>
      </InfiniteScroll>
    </Box>
  );
}
