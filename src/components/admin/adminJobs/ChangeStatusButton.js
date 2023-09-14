import React, { useRef, useState } from "react";
import SmallButton from "../../common/SmallButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import activeDownClose from "../../../assets/Black_Down_Open - Copy.svg";
import { useDispatch } from "react-redux";
import { statusChange } from "../../../redux/employer/myJobsSlice";
import { setAlert } from "../../../redux/configSlice";
import { ALERT_TYPE } from "../../../utils/Constants";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { approveJob } from "../../../redux/admin/jobsSlice";
import { Circle } from "@mui/icons-material";
import {
  Box,
  ClickAwayListener,
  Grow,
  MenuList,
  Paper,
  Stack,
} from "@mui/material";
import Button from "@mui/material/Button";
import Popper from "@mui/material/Popper";
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
  const anchorRef = useRef(null);
  const [openActive, setOpenActive] = useState(false);
  const open = Boolean(anchorEl);
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenActive(false);
    } else if (event.key === "Escape") {
      setOpenActive(false);
    }
  }
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleToggle = () => {
    setOpenActive((prevOpen) => !prevOpen);
  };
  const handleCloseActive = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpenActive(false);
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
      <Button
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        variant="contained"
        color="base"
        endIcon={
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
        }
        sx={{
          fontSize: "12px",
          fontWeight: 700,
          color: "#000",
          padding: "8px 10px",
          borderRadius: "0px !important",
          borderRight: "1px solid #EBECF3",
          borderBottom: "1px solid #EBECF3",
          height: "30px !important",
        }}
      >
        {status}
        <Circle
          fontSize="string"
          color={"lightGreenButton300"}
          sx={{ marginLeft: "10px" }}
        />
      </Button>
      <Stack direction="row" spacing={2} sx={{ zIndex: "1000" }}>
        <Box>
          <Popper
            open={openActive}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            // disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom-start" ? "left top" : "left bottom",
                }}
              >
                <Paper
                  sx={{
                    width: "116px !important",
                    borderRadius: "0px !important",
                  }}
                >
                  <ClickAwayListener onClickAway={handleCloseActive}>
                    <MenuList
                      autoFocusItem={openActive}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      {status === "pending" && [
                        <MenuItem
                          key="active"
                          onClick={() => handleStatusChange("active")}
                          sx={{ fontSize: "12px", fontWeight: 700 }}
                        >
                          Active{" "}
                          <Circle
                            fontSize="string"
                            color={"yellowButton100"}
                            sx={{ marginLeft: "10px" }}
                          />
                        </MenuItem>,
                      ]}
                      {status === "active" && [
                        <>
                          <MenuItem
                            key="paused"
                            onClick={() => handleStatusChange("paused")}
                            sx={{ fontSize: "12px", fontWeight: 700 }}
                          >
                            Pause{" "}
                            <Circle
                              fontSize="string"
                              color={"yellowButton100"}
                              sx={{ marginLeft: "10px" }}
                            />
                          </MenuItem>
                          <MenuItem
                            key="closed"
                            onClick={() => handleStatusChange("closed")}
                            sx={{ fontSize: "12px", fontWeight: 700 }}
                          >
                            Close
                            <Circle
                              fontSize="string"
                              color={"redButton100"}
                              sx={{ marginLeft: "10px" }}
                            />
                          </MenuItem>
                        </>,
                      ]}
                      {(status === "paused" || status === "closed") && (
                        <MenuItem
                          onClick={() => handleStatusChange("reactive")}
                          sx={{ fontSize: "12px", fontWeight: 700 }}
                        >
                          Reactive
                          <Circle
                            fontSize="string"
                            color={"#000"}
                            sx={{ marginLeft: "10px" }}
                          />
                        </MenuItem>
                      )}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Box>
      </Stack>
    </>
  );
};
export default ChangeStatusButton;