import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Select from "@mui/material/Select";
import locale from "../../../../i18n/locale";
import activeDownClose from "../../../../assets/Black_Down_Open - Copy.svg";
import { useDispatch } from "react-redux";
import {
  adminJobsFilter,
  getAllComments,
  getAllJobs,
  getJobCount,
} from "../../../../redux/admin/jobsSlice";
import { setAlert } from "../../../../redux/configSlice";
import { ALERT_TYPE } from "../../../../utils/Constants";
import { Grid, InputBase, Paper } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import JobCard from "../JobCardNew";
import SmallButtonTalent from "../../../common/SmallButtonTalent";
import Filters from "../Filters";
import AllJobs from "../AllJobs";

const BASIC = {
  lastKey: "",
  status_id: "",
  job_stage: "",
  job_title: "",
  job_type: "",
};

export default function ClosedJobs() {
  return <AllJobs page={"closed"}/>;
}
