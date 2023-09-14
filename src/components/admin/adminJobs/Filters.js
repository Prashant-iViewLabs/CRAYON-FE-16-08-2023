import { Box, InputBase, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import SmallButtonTalent from "../../common/SmallButtonTalent";
import activeDownClose from "../../../assets/Black_Down_Open - Copy.svg";
import { useTheme } from "@emotion/react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import SelectMenu from "../../common/SelectMenu";
import { getTeamMembers } from "../../../redux/admin/jobsSlice";
import { useDispatch } from "react-redux";
import { setAlert } from "../../../redux/configSlice";
import { ALERT_TYPE } from "../../../utils/Constants";

export default function Filters({
  total,
  title,
  handleJobRoleChange,
  value,
  handleJobType,
  handleJobStatus,
  stageArray,
  jobTypeArray,
  handleInputSearch,
  handleTeamMember,
}) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [teammember, setTeammember] = useState([]);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const getTeamMembers = async (lastkeyy) => {
    try {
      const { payload } = await dispatch(getTeamMembers(lastkeyy));
      if (payload?.status == "success") {
        setTeammember(payload?.data);
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

  const handleInput = () => {};

  //   const [jobStatusArray, setJobStatusArray] = ([
  //     {
  //         id:1,
  //         name:"pending"
  //     },
  //     {
  //         id:2,
  //         name:"contract",
  //     },
  //     {
  //         id:3,
  //         name:"freelance",
  //     }
  //   ])

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
          label={total}
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
            name="job_role_type"
            //   value={value}
            onHandleChange={handleJobRoleChange}
            options={stageArray}
            placeholder={"Job stage"}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex" }} gap={3} mt={2}>
        <Box sx={{ width: "50%" }}>
          <SelectMenu
            name="job_type"
            //   value={value}
            onHandleChange={handleJobType}
            options={jobTypeArray}
            placeholder={"Job type"}
          />
        </Box>
        <Box sx={{ width: "50%" }}>
          <SelectMenu
            name="team_member"
            //   value={value}
            onHandleChange={handleTeamMember}
            options={teammember}
            placeholder={"Team members"}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex" }} gap={3} mt={2}>
        <Box sx={{ width: "50%" }}>
          <SelectMenu
            name="job_status"
            value={value}
            onHandleChange={handleJobStatus}
            // options={stageArray}
            placeholder={"Job status"}
            disabled
          />
        </Box>
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
  );
}
