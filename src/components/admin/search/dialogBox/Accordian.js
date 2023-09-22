import styled from "@emotion/styled";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import redTalent from "../../../../assets/Padding Excluded/Black_Talent_Red.svg";
import TalentSVGButton from "../../../common/TalentSVGButton";
import InfoIcon from "../../../common/InfoIcon";
import { getTitlesCandidateData } from "../../../../redux/admin/searchSlice";
import { useDispatch } from "react-redux";
import { setAlert } from "../../../../redux/configSlice";
import { ALERT_TYPE } from "../../../../utils/Constants";
import AllTalentNewCard from "../../adminTalent/AllTalentNewCard";
import InfiniteScroll from "react-infinite-scroll-component";
import SmallButtonTalent from "../../../common/SmallButtonTalent";

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  boxShadow: "none",
  "& .MuiAccordionSummary-root": {
    padding: "0px !important",
  },
  ".MuiPaper-root-MuiAccordion-root": {
    backgroundColor: "#E5E5E5 !important",
  },
}));

const CANDIDATE = {
  lastKey: "",
  keyword: "",
  job_title_id: null,
};

export default function Accordian({
  titlesList,
  traits,
  handleTitleScroll,
  basicData,
  titlesListKey,
}) {
  const dispatch = useDispatch();
  const scrollContainerRef = useRef(null);

  const [expanded, setExpanded] = useState(false);
  const [candidateList, setCandidateList] = useState([]);
  const [personalityAdded, setPersonalityAdded] = useState();
  const [lastKeyy, setLastKeyy] = useState(0);
  const [totalData, setTotalData] = useState(160);
  const [currentOpen, setCurrentOpen] = useState();
  const [tempObj, setTempObj] = useState({});
  const [loading, setLoading] = useState(false);

  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);

  const getCandidateData = async (data, lastkey) => {
    setLoading(true);
    const candidateData = {
      lastKey: lastkey,
      keyword: data?.title,
      job_title_id: data?.job_title_id,
    };
    const { payload } = await dispatch(getTitlesCandidateData(candidateData));
    if (payload?.status == "success") {
      setLastKeyy(payload.pageNumber + 1);
      setTotalData(payload.totalData);
      setCandidateList((prevState) => [...prevState, ...payload.data]);
      setLoading(false);
    } else {
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: "Something went wrong! please relaod the window",
        })
      );
    }
    console.log(tempObj);
  };

  const handleClick = async (item, lastkey) => {
    setTempObj({ item, lastkey });
    setCurrentOpen(item.job_title_id);
    setCandidateList([]);
    await getCandidateData(item, lastkey);
  };

  const handleScroll = () => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer && candidateList.length < totalData) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const scrollPosition = scrollTop + clientHeight;

      console.log(scrollPosition, scrollHeight);
      console.log(scrollPosition >= scrollHeight - 1);
      // Check if the user is near the end (within 50px) or at the end of the scrollable content
      if (
        scrollPosition >= scrollHeight - 1 &&
        candidateList.length < totalData
      ) {
        // Call getCandidateData when near the end and update the state
        getCandidateData(tempObj.item, lastKeyy);
      }
    }
  };

  return (
    <Grid xs={12} sm={6} md={8} lg={9} xl={10}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "130px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TalentSVGButton
            padding={"0px !important"}
            color={"white"}
            source={redTalent}
            height={28}
            width={23}
            startIconMargin={"0px !important"}
          />
          <Typography sx={{ fontSize: "12px", fontWeigh: 900 }}>
            Talent pools
          </Typography>
          <InfoIcon />
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100px",
            justifyContent: "space-evenly",
            alignItems: "center",
            mr: 2,
          }}
        >
          <Typography sx={{ fontSize: "10px" }}>global</Typography>
          <Typography sx={{ fontSize: "10px" }}>my talent</Typography>
        </Box>
      </Box>
      <InfiniteScroll
        // height="80vh"
        // loader={<h4>Loading more... </h4>}
        scrollThreshold={"100px"}
        dataLength={titlesList.length}
        next={() => handleTitleScroll(basicData?.keyword, titlesListKey)}
        hasMore={true}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {titlesList.map((item, index) => {
          return (
            <StyledAccordion
              expanded={item.job_title_id === currentOpen}
              key={index}
              onChange={(e, expanded) => {
                if (expanded) {
                  handleClick(item, 0);
                }
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                key={item.job_title_id}
              >
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontWeight: 900 }}>
                    {item?.title}
                  </Typography>

                  {/* <Box sx={{ display: "flex" }}>
                    <SmallButtonTalent
                      key={index}
                      fontWeight={900}
                      // textColor={"#000"}
                      color="blueButton700"
                      label={6}
                      mr={1}
                      alignItems={"flex-end"}
                    />
                    <SmallButtonTalent
                      key={index}
                      fontWeight={900}
                      textColor={"#000"}
                      color="grayButton200"
                      label={6}
                      mr={1}
                      alignItems={"flex-end"}
                    />
                  </Box> */}
                </Box>
              </AccordionSummary>
              <AccordionDetails
                key={item.job_title_id}
                style={{
                  maxHeight: "300px", // Set a maximum height for each Accordion Detail
                  overflowY: "auto", // Enable vertical scrolling if content exceeds maxHeight
                }}
                onScroll={handleScroll} // Attach the scroll event handler
                ref={scrollContainerRef} // Assign the ref to the scrollable container
              >
                {candidateList.length <= 0 && loading ? (
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress color="inherit" size={20} />
                  </Box>
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
              </AccordionDetails>
            </StyledAccordion>
          );
        })}
      </InfiniteScroll>
    </Grid>
  );
}
