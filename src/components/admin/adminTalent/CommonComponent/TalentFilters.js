import React, { useEffect, useState } from "react";
import { Box, InputBase, Paper, Typography, useTheme } from "@mui/material";
import SmallButtonTalent from "../../../common/SmallButtonTalent";

import activeDownClose from "../../../../assets/Black_Down_Open - Copy.svg";
import SelectMenu from "../../../common/SelectMenu";
import SelectMenuWithScroll from "../../../common/SelectMenuWithScroll";
import { useDispatch } from "react-redux";
import { setAlert } from "../../../../redux/configSlice";
import { ALERT_TYPE } from "../../../../utils/Constants";
import {
  getAdminTalentJobList,
  getTalentPool,
} from "../../../../redux/admin/jobsSlice";
import jwt_decode from "jwt-decode";

const TalentFilters = ({
  title,
  totlaCount,
  handleJobRoleChange,
  stageArray,
  handleInputSearch,
  handleJobStatus,
  handleAssociatedJob,
  handleTalentPool,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [associatedJobs, setAssociatedJobs] = useState([]);
  const [poolData, setPoolData] = useState([]);
  const [lastKey, setLastKey] = useState(0);
  const [loading, setLoading] = useState(false);

  const token = localStorage?.getItem("token");
  let decodedToken;
  if (token) {
    decodedToken = jwt_decode(token);
  }

  const getPool = async (lastkeyy) => {
    try {
      const { payload } = await dispatch(getTalentPool({ lastKey: lastkeyy }));
      if (payload.status === "success") {
        if (lastkeyy === 0) {
          setPoolData(payload.data);
          setLastKey(payload.pageNumber + 1);
        } else {
          setLastKey(payload.pageNumber + 1);
          setPoolData((prevState) => [...prevState, ...payload.data]);
        }
      }
    } catch (error) {}
  };

  const getAssociatedJobs = async (lastkeyy) => {
    try {
      const { payload } = await dispatch(getAdminTalentJobList(lastkeyy));
      if (payload?.status == "success") {
        if (payload.pageNumber === 0) {
          setLastKey(payload.pageNumber + 1);
          setAssociatedJobs(payload?.data);
        } else {
          setAssociatedJobs((prevState) => [...prevState, payload.data]);
          setLastKey(payload.pageNumber + 1);
        }
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

  return (
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
          {title}
        </Typography>
        <SmallButtonTalent
          fontWeight={900}
          textColor={"#000"}
          color="grayButton200"
          label={totlaCount}
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
            onChange={(event) => {
              handleInputSearch(event);
            }}
            placeholder={"Enter quick search term..."}
            sx={{ ml: 2, mr: 2, width: "100%" }}
          />
        </Paper>
        <Box sx={{ width: "50%" }}>
          <SelectMenu
            name="stage"
            clear={true}
            //   value={value}
            onHandleChange={handleJobRoleChange}
            options={stageArray}
            placeholder={"Stage"}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex" }} gap={3} mt={2}>
        <Box sx={{ width: "50%" }}>
          <SelectMenu
            name="status"
            //   value={value}
            onHandleChange={handleJobStatus}
            // options={stageArray}
            placeholder={"Status"}
          />
        </Box>
        <Box sx={{ width: "50%" }}>
          <SelectMenuWithScroll
            name="associated_jobs"
            //   value={value}
            onHandleChange={handleAssociatedJob}
            onOpen={() => getAssociatedJobs("")}
            options={associatedJobs}
            placeholder={decodedToken?.data?.role_id ? "Select job" : "Associated Jobs"}
            // handleScroll={handleScroll}
            // loading={loading}
          />
        </Box>
      </Box>
      <Box
        sx={
          decodedToken.data.role_id === 1
            ? { display: "flex", flexDirection: "row-reverse" }
            : { display: "flex" }
        }
        gap={3}
        mt={2}
      >
        <Box sx={{ width: "50%" }}>
          <SelectMenuWithScroll
            name="talent_pool"
            //   value={value}
            onHandleChange={handleTalentPool}
            options={poolData}
            onOpen={() => getPool(0)}
            placeholder={"Talent pools"}
          />
        </Box>
        <Box sx={{ width: "50%" }}>
          {decodedToken.data.role_id === 1 && (
            <SelectMenu
              name="databases"
              //   value={value}
              onHandleChange={handleJobRoleChange}
              // options={stageArray}
              placeholder={"Databases"}
            />
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default TalentFilters;
