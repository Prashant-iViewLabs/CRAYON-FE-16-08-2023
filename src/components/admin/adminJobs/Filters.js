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
import jwt_decode from "jwt-decode";
import { getCompanies } from "../../../redux/employer/empProfileSlice";
import SelectMenuWithScroll from "../../common/SelectMenuWithScroll";

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
  jobStatus,
  handleCompany,
  companylist,
  handleRecruiter,
  recruiter,
}) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [teammember, setTeammember] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const open = Boolean(anchorEl);
  const initialOptionsCount = 12; // Initial number of options to display
  const optionsToLoadOnScroll = 12;

  const token = localStorage?.getItem("token");
  let decodedToken;
  if (token) {
    decodedToken = jwt_decode(token);
  }

  console.log(decodedToken.data);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const getTeamMember = async (lastkeyy) => {
    try {
      const { payload } = await dispatch(getTeamMembers(""));
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
  const getCompany = async (lastkeyy) => {
    try {
      const { payload } = await dispatch(getCompanies());
      if (payload?.status == "success") {
        setCompanyList(payload?.data);
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

  const handleScroll = (event) => {
    const target = event.target;
    console.log(target);
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      console.log("hihihi");
      // User has scrolled to the bottom, load more options
      const remainingOptions = teammember.slice(
        teammember.length,
        teammember.length + optionsToLoadOnScroll
      );
      setTeammember([...teammember, ...remainingOptions]);
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
            clear={true}
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
            clear={true}
            name="job_type"
            //   value={value}
            onHandleChange={handleJobType}
            options={jobTypeArray}
            placeholder={"Job type"}
          />
        </Box>
        <Box sx={{ width: "50%" }}>
          {decodedToken.data.role_id === 1 ? (
            <SelectMenuWithScroll
              clear={true}
              name="company"
              //   value={value}
              onHandleChange={handleCompany}
              options={companyList.length > 0 && companyList}
              placeholder={"Company"}
              onOpen={() => getCompany("")}
            />
          ) : (
            <SelectMenu
              clear={true}
              name="team_member"
              //   value={value}
              onHandleChange={handleTeamMember}
              options={teammember.length > 0 && teammember}
              placeholder={"Team members"}
              onOpen={() => getTeamMember("")}
              handleScroll={(event) => handleScroll(event)}
            />
          )}
        </Box>
      </Box>
      <Box sx={{ display: "flex" }} gap={3} mt={2}>
        <Box sx={{ width: "50%" }}>
          <SelectMenu
            clear={true}
            name="job_status"
            defaultValue={value}
            onHandleChange={handleJobStatus}
            options={jobStatus}
            placeholder={"Job status"}
            disabled={value === "" ? false : true}
          />
        </Box>
        <Box sx={{ width: "50%" }}>
          {decodedToken.data.role_id === 1 && (
            <SelectMenu
              clear={true}
              name="recruiter"
              onHandleChange={handleRecruiter}
              // options={recruiter.length > 0 && recruiter}
              placeholder={"Recruiter"}
              // onOpen={()=>getTeamMember("")}
            />
          )}
        </Box>
      </Box>
    </Paper>
  );
}
