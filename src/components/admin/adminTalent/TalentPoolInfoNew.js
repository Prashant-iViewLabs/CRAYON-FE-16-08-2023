import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import locale from "../../../i18n/locale";
import Accordion from "@mui/material/Accordion";
import TextField from "@mui/material/TextField";
import AllTalentCard from "./AllTalentCard";
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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getAllPendingJobs,
  getAllTalentJobs,
  getJobCount,
  getPoolUsers,
  getTalentPool,
} from "../../../redux/admin/jobsSlice";
import { setAlert, setLoading } from "../../../redux/configSlice";
import {
  getPersonalities,
  getTraits,
} from "../../../redux/employer/postJobSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { Button, Grid, InputBase, Paper } from "@mui/material";
import IconSection from "./IconSection";
import SmallButton from "../../common/SmallButton";

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginTop: "4px",
  borderRadius: "5px",
  position: "unset",
  "& .MuiAccordionSummary-root": {
    // alignItems: 'start'
  },
  "& .MuiAccordionSummary-content": {
    flexDirection: "column",
    // margin: 0,
    ".summaryBox": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      // marginRight: '8px',
      "& .MuiButtonBase-root": {
        fontSize: 10,
        fontWeight: 700,
        minWidth: 29,
        padding: "2px 8px",
        // borderRadius: 3,
        height: "20px",
        boxShadow: "none",
      },
    },
    ".summaryBoxContent": {
      display: "flex",
      alignItems: "center",
    },
    ".profileAvatar": {
      height: 20,
      width: 20,
      borderRadius: 6,
    },

    "& .MuiTypography-root": {
      // fontWeight: 700,
      // fontSize: '20px',
    },
    "& .MuiButtonBase-root": {
      // padding: '2px 8px',
      // fontSize: 10,
      // fontWeight: 700,
      // minWidth: 30,
      // boxShadow: 'none',
      // borderRadius: 2
    },
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    color: theme.palette.black,
    // marginRight: '32px',
    // position: 'absolute',
    // right: '40px',
    // top: '12px',
    "& .MuiSvgIcon-root": {
      fontSize: "1.8rem",
    },
  },
  "& .MuiCollapse-root": {
    "& .MuiAccordionDetails-root": {
      // padding: 0,
      "& .MuiButtonBase-root": {
        // fontSize: 10,
        // fontWeight: 700,
        // minWidth: 30,
        // padding: '1px 4px',
        // borderRadius: 3
      },
      ".contentBox": {
        // display: 'flex',
        // justifyContent: 'space-between',
      },
    },
  },
  "& .MuiButtonBase-root": {
    // boxShadow: 'none',
    padding: "0 16px",
  },
}));

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

export default function TalentPoolInfo() {
  const navigate = useNavigate();
  const theme = useTheme()
  const { pathname } = useLocation();
  const [allJobs, setAllJobs] = useState([]);
  const dispatch = useDispatch();
  const [lastKey, setLastKey] = useState(0);
  const [personalityAdded, setPersonalityAdded] = useState(false);
  const [tableData, setTableData] = useState([]);
  const { poolId } = useParams();
  const [linkJobButton, setLinkJobButton] = useState(false)
  const { personalities, traits } = useSelector((state) => state.postJobs);

  const onHandleManageTalent = (activeJobId) => {
    navigate(`${pathname}/${activeJobId}`);
  };

  const getJobList = async (lastkeyy) => {
    const data = {
      lastKey: lastkeyy,
      pool_id: poolId,
    };
    const { payload } = await dispatch(getPoolUsers(data));
    if (payload?.status === "success") {
      setLastKey(payload.data[payload.data.length - 1]?.user_id);
      setAllJobs((prevState) => [...prevState, ...payload.data]);
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
    getJobList(lastKey);
  }, []);

  return (
    <Box sx={{ ml: 6 }}>
      <Typography
        sx={{
          fontSize: "36px",
          fontWeight: 700,
          textAlign: "center"
          // ml: 6
        }}
      >
        Talent Pools
      </Typography>

      <Grid
        container
        spacing={2}
        flexDirection={"column"}
        sx={{
          display: { xs: "none", md: "flex" },
          marginTop: "30px",
          background: "white",
          borderRadius: "25px"
        }}
        boxShadow={1}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
          <Box sx={{ width: 160 }}></Box>
          <Box mt={2} sx={{
            
          }}>
            <IconSection />
            {linkJobButton && (
              <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                paddingY: 1,
              }}>
                <Typography sx={{
                  fontSize: 12,
                  fontWeight: 700,
                  textAlign: "center"
                }}>
                  View or add talent and a job to your pool.
                </Typography>
                <SmallButton
                  color="userID"
                  // borderRadius="5px"
                  label={"Nedbank Team (7)"}
                  paddingX={2}
                  fontSize={12}
                  fontWeight={700}
                  textColor="#000"
                  borderRadius="6px"
                  width="fit-content"
                ></SmallButton>
              </Box>
            )}

          </Box>

          <Box sx={{
            display: "flex",
            flexDirection: "column"
          }}>
            <Button
              variant="contained"
              color="blueButton800"
              sx={{
                borderRadius: "0 25px 0 0",
                justifyContent: "start"
              }}
            // onClick={handleOpenAdd}
            >
              add fresh talent
            </Button>
            <Button
              variant="contained"
              color="yellowButton100"
              sx={{
                borderRadius: 0,
                justifyContent: "start"
              }}
              onClick={() => setLinkJobButton(prevState => !prevState)}
            >
              link a job
            </Button>
            <Button
              variant="contained"
              color="greenButton200"
              sx={{
                borderRadius: "0 0 0 25px",
                justifyContent: "start"
              }}
            // onClick={handleOpenAdd}
            >
              linked jobs (count)
            </Button>
          </Box>
        </Box>
        {!linkJobButton && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              paddingX: 2,
              paddingY: 1,
              borderColor: theme.palette.grayBorder
            }}
          >
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography
                  sx={{
                    fontWeight: 700
                  }}
                >
                  "Talent Pools Name"
                </Typography>
              </Box>
              <Typography sx={{

                fontSize: '14px',
              }}>
                View talent within this pool, move talent to other pools and link pool to a job
              </Typography>
            </Box>
            <Box sx={{
              width: "42%"
            }}>
              <Paper
                elevation={3}
                sx={{
                  display: "flex",
                  borderRadius: "25px",
                  height: "40px",
                  boxShadow: "none",
                  border: `1px solid ${theme.palette.grayBorder}`,
                }}
              >
                <InputBase
                  sx={{ ml: 2, mr: 2, width: "100%" }}
                  id="Pool_name"
                  placeholder={"search for a pool"}
                />
              </Paper>
            </Box>

          </Box>
        )}


      </Grid>
      <InfiniteScroll
        style={{ overflow: "hidden" }}
        dataLength={allJobs.length}
        next={() => getJobList(lastKey)}
        hasMore={true}
        scrollThreshold={"10px"}
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
          {allJobs?.map((job, index) => (
            <AllTalentCard
              key={index}
              index={job.user_id}
              talentContent={job}
              onManageTalent={onHandleManageTalent}
              setPersonalityAdded={setPersonalityAdded}
              traits={traits}
              personalities={personalities}
              tableData={tableData}
            />
          ))}
        </Box>
      </InfiniteScroll>
    </Box>

  );
}
