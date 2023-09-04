import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import locale from "../../../i18n/locale";
import Accordion from "@mui/material/Accordion";
import TextField from "@mui/material/TextField";
import AllTalentCard from "../adminTalent/AllTalentCard";
import {
  ADMIN_TALENT_JOBS,
  ALERT_TYPE,
  ERROR_MSG,
} from "../../../utils/Constants";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import search from "../../../assets/search.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getAllJobs,
  getAllPendingJobs,
  getAllTalentJobs,
  getJobCount,
  getTalentPool,
} from "../../../redux/admin/jobsSlice";
import { setAlert, setLoading } from "../../../redux/configSlice";
import {
  getPersonalities,
  getTraits,
} from "../../../redux/employer/postJobSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";

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

export default function AllTalent() {
  const i18n = locale.en;
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [allJobs, setAllJobs] = useState([]);
  const [talentJobs, setTalentJobs] = useState([]);
  const dispatch = useDispatch();
  const [lastKey, setLastKey] = useState("");
  const [totalJob, setTotalJob] = useState(0);
  const [personalityAdded, setPersonalityAdded] = useState(false);
  const [tableData, setTableData] = useState([]);

  const { personalities, traits } = useSelector((state) => state.postJobs);

  const onHandleManageTalent = (activeJobId) => {
    navigate(`${pathname}/${activeJobId}`);
  };

  const getJobList = async (lastkeyy) => {
    const { payload } = await dispatch(getAllTalentJobs(lastkeyy));
    if (payload.status === "success") {
      if (lastkeyy === 0) {
        setAllJobs(payload.data);
        setLastKey(payload.offset + 1);
      } else {
        setLastKey(payload.offset + 1);
        setAllJobs((prevState) => [...prevState, ...payload.data]);
      }
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

  const pendingJobCount = async () => {
    const response = await dispatch(getJobCount(1));
    setTotalJob(response.payload.count);
  };

  useEffect(() => {
    // getAllData();
    // getTalent();
    // getTalentJobList("");
  }, []);

  useEffect(() => {
    getJobList(0);
    pendingJobCount();
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
        {i18n["allTalent.title"]}({})
      </Typography>
      {/* <StyledTextField placeholder='quick search' id="search" size="small" /> */}
      <StyledTextField
        id="outlined-adornment-search"
        type="text"
        size="small"
        placeholder="quick search"
        endAdornment={
          <InputAdornment position="end">
            <Box
              component="img"
              className="profileAvatar"
              alt="crayon logo"
              src={search}
              sx={{
                width: "30px",
              }}
            />
          </InputAdornment>
        }
      />
      <InfiniteScroll
        style={{ overflow: "hidden" }}
        dataLength={allJobs.length}
        next={() => getJobList(lastKey)}
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
          {console.log("ALL JOBS", allJobs)}
          {allJobs?.map((job, index) => (
            <AllTalentCard
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
