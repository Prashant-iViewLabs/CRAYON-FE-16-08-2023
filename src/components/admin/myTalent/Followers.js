import { Box, InputBase, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getFollowers } from "../../../redux/admin/jobsSlice";
import { useDispatch } from "react-redux";
import { setAlert } from "../../../redux/configSlice";
import { ALERT_TYPE } from "../../../utils/Constants";
import InfiniteScroll from "react-infinite-scroll-component";
import ApplicantCard from "./ApplicantCard";
import AllTalentNewCard from "../adminTalent/AllTalentNewCard";
import SmallButtonTalent from "../../common/SmallButtonTalent";
import { useTheme } from "@emotion/react";
import activeDownClose from "../../../assets/Black_Down_Open - Copy.svg";

export default function Followers() {
  const dispatch = useDispatch();
  const theme = useTheme();
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
      <Paper sx={{ p: 3, borderRadius: "20px", mt: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "19%",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: 700,
              // ml: 6
            }}
          >
            Followers
          </Typography>
          <SmallButtonTalent
            fontWeight={900}
            textColor={"#000"}
            color="grayButton200"
            label={""}
            mr={1}
            alignItems={"flex-end"}
          />
        </Box>

        <Box sx={{ display: "flex" }} gap={3} mt={2}>
          <Paper
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "40px",
              borderRadius: "25px",
              boxShadow: "none",
              border: `1px solid ${theme.palette.grayBorder}`,
              width: "50%",
            }}
          >
            <InputBase
              id="keyword"
              // value={title}
              // onChange={handleInputSearch}
              placeholder={"Enter quick search term..."}
              sx={{ ml: 2, mr: 2, width: "100%" }}
            />
          </Paper>

          <Paper
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "40px",
              borderRadius: "25px",
              boxShadow: "none",
              border: `1px solid ${theme.palette.grayBorder}`,
              width: "50%",
            }}
          >
            <InputBase
              id="job_stage"
              // value={title}
              // onChange={handleInputSearch}
              placeholder={"Job stage"}
              sx={{ ml: 2, mr: 2, width: "100%" }}
            />
            <Box
              component="img"
              className="eye"
              alt="eye logo"
              src={activeDownClose}
              sx={{
                height: 25,
                width: 25,
                mr: 1,
              }}
            />
          </Paper>
        </Box>
        <Box sx={{ display: "flex" }} gap={3} mt={2}>
          <Paper
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "40px",
              borderRadius: "25px",
              boxShadow: "none",
              border: `1px solid ${theme.palette.grayBorder}`,
              width: "50%",
            }}
          >
            <InputBase
              id="keyword"
              // value={title}
              // onChange={handleInputSearch}
              placeholder={"Job type"}
              sx={{ ml: 2, mr: 2, width: "100%" }}
            />
            <Box
              component="img"
              className="eye"
              alt="eye logo"
              src={activeDownClose}
              sx={{
                height: 25,
                width: 25,
                mr: 1,
              }}
            />
          </Paper>

          <Paper
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "40px",
              borderRadius: "25px",
              boxShadow: "none",
              border: `1px solid ${theme.palette.grayBorder}`,
              width: "50%",
            }}
          >
            <InputBase
              id="job_stage"
              // value={title}
              // onChange={handleInputSearch}
              placeholder={"Posted by"}
              sx={{ ml: 2, mr: 2, width: "100%" }}
            />
            <Box
              component="img"
              className="eye"
              alt="eye logo"
              src={activeDownClose}
              sx={{
                height: 25,
                width: 25,
                mr: 1,
              }}
            />
          </Paper>
        </Box>
        <Box sx={{ display: "flex" }} gap={3} mt={2}>
          <Paper
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "40px",
              borderRadius: "25px",
              boxShadow: "none",
              border: `1px solid ${theme.palette.grayBorder}`,
              width: "50%",
            }}
          >
            <InputBase
              id="keyword"
              // value={title}
              // onChange={handleInputSearch}
              placeholder={"Job status"}
              sx={{ ml: 2, mr: 2, width: "100%" }}
            />
            <Box
              component="img"
              className="eye"
              alt="eye logo"
              src={activeDownClose}
              sx={{
                height: 25,
                width: 25,
                mr: 1,
              }}
            />
          </Paper>
          <Paper
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "40px",
              borderRadius: "25px",
              boxShadow: "none",
              border: `1px solid ${theme.palette.grayBorder}`,
              width: "50%",
              opacity: 0,
            }}
          >
            <InputBase
              id="keyword"
              // value={title}
              // onChange={handleInputSearch}
              placeholder={"Job status"}
              sx={{ ml: 2, mr: 2, width: "100%" }}
              disabled
            />
            <Box
              component="img"
              className="eye"
              alt="eye logo"
              src={activeDownClose}
              sx={{
                height: 25,
                width: 25,
                mr: 1,
              }}
            />
          </Paper>
        </Box>
      </Paper>

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
