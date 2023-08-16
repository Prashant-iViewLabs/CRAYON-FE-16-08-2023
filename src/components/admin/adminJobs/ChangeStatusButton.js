import React, { useState } from "react";
import SmallButton from "../../common/SmallButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { useDispatch } from "react-redux";
import { statusChange } from "../../../redux/employer/myJobsSlice";
import { setAlert } from "../../../redux/configSlice";
import { ALERT_TYPE } from "../../../utils/Constants";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { approveJob } from "../../../redux/admin/jobsSlice";

const ChangeStatusButton = ({
  loggedInUser,
  jobId,
  jobStatus,
  employerIndustry,
  getJobList,
}) => {
  const [status, setStatus] = useState(jobStatus);
  console.log(jobId);
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const pauseJobData = {
    job_id: jobId,
    status: "paused",
  };
  const closeJobData = {
    job_id: jobId,
    status: "closed",
  };

  const reactivateJobData = {
    job_id: jobId,
    status: "reactivate",
  };

  const pauseJob = async () => {
    try {
      const { payload } = await dispatch(statusChange(pauseJobData));
      if (payload?.status == "success") {
        setStatus(status);
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Job Paused successfully!",
          })
        );
        await getJobList("");
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
      dispatch(setAlert({ show: true }));
    }
  };

  const closeJob = async () => {
    try {
      const { payload } = await dispatch(statusChange(closeJobData));
      if (payload?.status == "success") {
        setStatus(status);
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Job Closed successfully!",
          })
        );
        await getJobList("");
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
      dispatch(setAlert({ show: true }));
    }
  };

  const reactivateJob = async () => {
    try {
      const { payload } = await dispatch(statusChange(reactivateJobData));
      if (payload?.status == "success") {
        setStatus(status);
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Job Reactivated successfully!",
          })
        );
        await getJobList("");
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
      dispatch(setAlert({ show: true }));
    }
  };

  const handleApprove = async () => {
    let industry = employerIndustry?.map((val) => val?.industry_id);
    let approvedJob = {
      job_id: jobId,
      industry_id: industry,
    };
    try {
      if (industry.length > 0) {
        const { payload } = await dispatch(approveJob(approvedJob));
        if (payload?.status == "success") {
          dispatch(
            setAlert({
              show: true,
              type: ALERT_TYPE.SUCCESS,
              msg: "Job Activated Successfully!",
            })
          );
          await getJobList("");
        } else {
          dispatch(
            setAlert({
              show: true,
              type: ALERT_TYPE.ERROR,
              msg: payload?.message,
            })
          );
        }
      } else {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.ERROR,
            msg: "Without the Industries you can't make this Job active.",
          })
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: "Without the Industries you can't make this Job active.",
        })
      );
    }
  };

  const isDisabled = loggedInUser === 4 && status === "pending";
  const handleStatusChange = (status) => {
    if (status === "paused") {
      pauseJob();
    } else if (status === "closed") {
      closeJob();
    } else if (status === "reactive") {
      reactivateJob();
    } else if (status === "active") {
      handleApprove();
    }
    handleClose();
  };
  return (
    <>
      <SmallButton
        id="fade-button"
        color={
          (status === "paused" && "redButton") ||
          (status === "closed" && "redButton") ||
          (status === "pending" && "orangeButton") ||
          (status === "active" && "lightGreenButton300")
        }
        endIcon={loggedInUser === 4 ? "" : <KeyboardArrowDownIcon />}
        height={24}
        fontWeight={700}
        label={status}
        borderRadius="25px"
        mr="8px"
        onClick={handleClick}
        disabled={isDisabled}
      ></SmallButton>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {status === "pending" && [
          <MenuItem key="active" onClick={() => handleStatusChange("active")}>
            Active
          </MenuItem>,
        ]}
        {status === "active" && [
          <MenuItem key="paused" onClick={() => handleStatusChange("paused")}>
            Pause
          </MenuItem>,
          <MenuItem key="closed" onClick={() => handleStatusChange("closed")}>
            Close
          </MenuItem>,
        ]}
        {(status === "paused" || status === "closed") && (
          <MenuItem onClick={() => handleStatusChange("reactive")}>
            Reactivate
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default ChangeStatusButton;
