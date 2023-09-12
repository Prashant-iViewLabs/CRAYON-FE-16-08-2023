import styled from "@emotion/styled";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import redTalent from "../../../../assets/Padding Excluded/Black_Talent_Red.svg";
import TalentSVGButton from "../../../common/TalentSVGButton";
import InfoIcon from "../../../common/InfoIcon";
import {
  getInstitutionCandidateData,
  getQualCandidateData,
  getTitlesCandidateData,
  getToolsCandidateData,
} from "../../../../redux/admin/searchSlice";
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
export default function InstitutionAccordian({
  titlesList,
  traits,
  handleTitleScroll,
  basicData,
  titlesListKey,
}) {
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(false);
  const [candidateList, setCandidateList] = useState([]);
  const [personalityAdded, setPersonalityAdded] = useState();
  const [lastKeyy, setLastKeyy] = useState(0);
  const [totalData, setTotalData] = useState(160);
  const [openAccordionIndex, setOpenAccordionIndex] = useState(-1);

  const getCandidateData = async (data, lastkey) => {
    const candidateData = {
      lastKey: lastkey,
      keyword: data?.name,
      institution_id: data?.institution_id,
    };
    console.log(candidateList);
    const { payload } = await dispatch(
      getInstitutionCandidateData(candidateData)
    );
    if (payload?.status == "success") {
      setLastKeyy(payload?.pageNumber + 1);
      setTotalData(payload?.totalData);
      setCandidateList((prevState) => [...prevState, ...payload.data]);
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

  const handleClick = async (item, lastkey, index) => {
    console.log(item, lastkey);
    if (openAccordionIndex === index) {
      // Clicking the same accordion again should close it
      setOpenAccordionIndex(-1);
    } else {
      setOpenAccordionIndex(index);
    }
    setCandidateList([]);
    await getCandidateData(item, lastkey);
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
      {console.log(basicData, titlesListKey)}
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
        {console.log(titlesList.titlesList)}
        {titlesList.map((item, index) => {
          return (
            <StyledAccordion
              key={index}
              onChange={(e, expanded) => {
                if (expanded) {
                  handleClick(item, 0, index);
                }
              }}
              expanded={openAccordionIndex === index}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                // onClick={() => handleClick(item, 0)}
                key={index}
              >
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontWeight: 900 }}>{item?.name}</Typography>

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
              <AccordionDetails key={index}>
                <Box
                  id={"candidate_list"}
                  sx={{ overflow: "hidden", height: "100%", mt: 1 }}
                >
                  <InfiniteScroll
                    style={{
                      height: "100%",
                      overflowX: "hidden",
                      scrollbarWidth: "thin",
                    }}
                    scrollableTarget={"candidate_list"}
                    dataLength={candidateList?.length}
                    next={() => getCandidateData(item, lastKeyy)}
                    // scrollThreshold={"10px"}
                    hasMore={true}
                    endMessage={
                      <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                      </p>
                    }
                  >
                    {console.log(candidateList)}

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
                            key={index}
                            traits={traits}
                            talentContent={candidate}
                            setPersonalityAdded={setPersonalityAdded}
                          />
                        );
                      })
                    )}

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
              </AccordionDetails>
            </StyledAccordion>
          );
        })}
      </InfiniteScroll>
    </Grid>
  );
}
