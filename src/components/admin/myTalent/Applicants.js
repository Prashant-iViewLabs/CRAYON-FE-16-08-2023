import { Box, InputAdornment, OutlinedInput, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getApplicants } from "../../../redux/admin/jobsSlice";
import { setAlert } from "../../../redux/configSlice";
import { ALERT_TYPE, ERROR_MSG } from "../../../utils/Constants";
import styled from "@emotion/styled";
import search from "../../../assets/search.svg";
import InfiniteScroll from "react-infinite-scroll-component";
import ApplicantCard from "./ApplicantCard";
import {
  getPersonalities,
  getTraits,
} from "../../../redux/employer/postJobSlice";

const StyledTextField = styled(OutlinedInput)(({ theme }) => ({
  width: "100%",
  margin: "8px 0",
  background: theme.palette.white,
  borderRadius: "20px",
  paddingRight: "6px",
  // paddingLeft: '16px',
  // '& .MuiInputLabel-outlined': {
  //     marginLeft: '4px',
  //     color: theme.palette.placeholder
  // },
  "& .MuiOutlinedInput-notchedOutline": {
    // background: theme.palette.white,
    borderColor: theme.palette.grayBorder,
    borderRadius: "20px",
  },
}));

export default function Applicants() {
  const dispatch = useDispatch();

  const [allApplicants, setAllApplicants] = useState([]);
  const [lastKey, setLastKey] = useState("");

  const [personalityAdded, setPersonalityAdded] = useState();

  const getApplicantList = async (lastkeyy) => {
    const { payload } = await dispatch(getApplicants(lastkeyy));
    if (payload?.status == "success") {
      setLastKey(payload.data[payload.data.length - 1]?.user_id);
      setAllApplicants((prevState) => [...prevState, ...payload.data]);
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

  useEffect(() => {
    getApplicantList("");
  }, [personalityAdded]);

  return (
    <Box sx={{ ml: 6 }}>
      <Typography
        sx={{
          fontSize: "36px",
          fontWeight: 700,
          // ml: 6
        }}
      >
        Applicants ({})
      </Typography>
      <InfiniteScroll
        style={{ overflow: "hidden" }}
        dataLength={allApplicants.length}
        next={() => getApplicantList(lastKey)}
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
          {console.log("ALL JOBS", allApplicants)}
          {allApplicants?.map((job, index) => (
            <ApplicantCard
              key={index}
              index={job.user_id}
              talentContent={job}
              setPersonalityAdded={setPersonalityAdded}
            />
          ))}
        </Box>
      </InfiniteScroll>
    </Box>
  );
}
