import { Box, Typography } from "@mui/material";
import React from "react";
import AllTalentNewCard from "../../adminTalent/AllTalentNewCard";
import InfiniteScroll from "react-infinite-scroll-component";

export default function AccordionDetail({
  candidateList,
  getCandidateData,
  totalData,
  traits,
  tempObj,
  lastKeyy,
  setPersonalityAdded,
}) {
  return (
    <Box id="candidate_list" sx={{
        height:"200px"
    }}>
      <InfiniteScroll
        scrollableTarget="candidate_list"
        dataLength={candidateList.length}
        next={() => getCandidateData(tempObj.item, lastKeyy)}
        hasMore={candidateList.length < totalData} // You may need to update this based on your actual data
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>No more candidate data to load.</b>
          </p>
        }
      >
        {candidateList.length <= 0 ? (
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 900,
              textAlign: "center",
            }}
          >
            No candidate
          </Typography>
        ) : (
          candidateList.map((candidate) => {
            return (
              <AllTalentNewCard
                key={candidate.user_id}
                traits={traits}
                talentContent={candidate}
                setPersonalityAdded={setPersonalityAdded}
              />
            );
          })
        )}
      </InfiniteScroll>
    </Box>
  );
}
