import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import locale from "../../../i18n/locale";
import { ALERT_TYPE, ERROR_MSG } from "../../../utils/Constants";
import activeDownClose from "../../../assets/Black_Down_Open - Copy.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllTalentJobs, getJobCount } from "../../../redux/admin/jobsSlice";
import { setAlert } from "../../../redux/configSlice";
import { getTraits } from "../../../redux/employer/postJobSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import AllTalentNewCard from "./AllTalentNewCard";
import { InputBase, Paper } from "@mui/material";
import SmallButtonTalent from "../../common/SmallButtonTalent";
import TalentsCommonComponent from "./CommonComponent/TalentsCommonComponent";

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

  const { traits } = useSelector((state) => state.postJobs);

  const onHandleManageTalent = (activeJobId) => {
    navigate(`${pathname}/${activeJobId}`);
  };

  const pendingJobCount = async () => {
    // const response = await dispatch(getJobCount(1));
  };

  const getAllData = async () => {
    try {
      // dispatch(setLoading(true));
      await dispatch(getTraits());
      // dispatch(setLoading(false));
    } catch (error) {
      // dispatch(setLoading(false));
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: ERROR_MSG,
        })
      );
    }
  };

  useEffect(() => {
    // getAllData();
  }, []);


  return (
    // <Box sx={{ ml: 0 }}>
    //   <Paper sx={{ p: 3, borderRadius: "20px", mt: 3 }}>
    //     <Box
    //       sx={{
    //         display: "flex",
    //         alignItems: "center",
    //         width: "19%",
    //         justifyContent: "space-between",
    //       }}
    //     >
    //       <Typography
    //         sx={{
    //           fontSize: "24px",
    //           fontWeight: 700,
    //           // ml: 6
    //         }}
    //       >
    //         {i18n["allTalent.title"]}
    //       </Typography>
    //       <SmallButtonTalent
    //         fontWeight={900}
    //         textColor={"#000"}
    //         color="grayButton200"
    //         label={totalJob}
    //         mr={1}
    //         alignItems={"flex-end"}
    //       />
    //     </Box>

    //     <Box sx={{ display: "flex" }} gap={3} mt={2}>
    //       <Paper
    //         sx={{
    //           display: "flex",
    //           justifyContent: "center",
    //           alignItems: "center",
    //           height: "40px",
    //           borderRadius: "25px",
    //           boxShadow: "none",
    //           border: `1px solid ${theme.palette.grayBorder}`,
    //           width: "50%",
    //         }}
    //       >
    //         <InputBase
    //           id="keyword"
    //           // value={title}
    //           // onChange={handleInputSearch}
    //           placeholder={"Enter quick search term..."}
    //           sx={{ ml: 2, mr: 2, width: "100%" }}
    //         />
    //       </Paper>

    //       <Paper
    //         sx={{
    //           display: "flex",
    //           justifyContent: "center",
    //           alignItems: "center",
    //           height: "40px",
    //           borderRadius: "25px",
    //           boxShadow: "none",
    //           border: `1px solid ${theme.palette.grayBorder}`,
    //           width: "50%",
    //         }}
    //       >
    //         <InputBase
    //           id="job_stage"
    //           // value={title}
    //           // onChange={handleInputSearch}
    //           placeholder={"Stage"}
    //           sx={{ ml: 2, mr: 2, width: "100%" }}
    //         />
    //         <Box
    //           component="img"
    //           className="eye"
    //           alt="eye logo"
    //           src={activeDownClose}
    //           sx={{
    //             height: 25,
    //             width: 25,
    //             mr: 1,
    //           }}
    //         />
    //       </Paper>
    //     </Box>
    //     <Box sx={{ display: "flex" }} gap={3} mt={2}>
    //       <Paper
    //         sx={{
    //           display: "flex",
    //           justifyContent: "center",
    //           alignItems: "center",
    //           height: "40px",
    //           borderRadius: "25px",
    //           boxShadow: "none",
    //           border: `1px solid ${theme.palette.grayBorder}`,
    //           width: "50%",
    //         }}
    //       >
    //         <InputBase
    //           id="keyword"
    //           // value={title}
    //           // onChange={handleInputSearch}
    //           placeholder={"Status"}
    //           sx={{ ml: 2, mr: 2, width: "100%" }}
    //         />
    //         <Box
    //           component="img"
    //           className="eye"
    //           alt="eye logo"
    //           src={activeDownClose}
    //           sx={{
    //             height: 25,
    //             width: 25,
    //             mr: 1,
    //           }}
    //         />
    //       </Paper>

    //       <Paper
    //         sx={{
    //           display: "flex",
    //           justifyContent: "center",
    //           alignItems: "center",
    //           height: "40px",
    //           borderRadius: "25px",
    //           boxShadow: "none",
    //           border: `1px solid ${theme.palette.grayBorder}`,
    //           width: "50%",
    //         }}
    //       >
    //         <InputBase
    //           id="job_stage"
    //           // value={title}
    //           // onChange={handleInputSearch}
    //           placeholder={"Associated jobs"}
    //           sx={{ ml: 2, mr: 2, width: "100%" }}
    //         />
    //         <Box
    //           component="img"
    //           className="eye"
    //           alt="eye logo"
    //           src={activeDownClose}
    //           sx={{
    //             height: 25,
    //             width: 25,
    //             mr: 1,
    //           }}
    //         />
    //       </Paper>
    //     </Box>
    //     <Box sx={{ display: "flex" }} gap={3} mt={2}>
    //       <Paper
    //         sx={{
    //           display: "flex",
    //           justifyContent: "center",
    //           alignItems: "center",
    //           height: "40px",
    //           borderRadius: "25px",
    //           boxShadow: "none",
    //           border: `1px solid ${theme.palette.grayBorder}`,
    //           width: "50%",
    //         }}
    //       >
    //         <InputBase
    //           id="keyword"
    //           // value={title}
    //           // onChange={handleInputSearch}
    //           placeholder={"Talent Pools"}
    //           sx={{ ml: 2, mr: 2, width: "100%" }}
    //         />
    //         <Box
    //           component="img"
    //           className="eye"
    //           alt="eye logo"
    //           src={activeDownClose}
    //           sx={{
    //             height: 25,
    //             width: 25,
    //             mr: 1,
    //           }}
    //         />
    //       </Paper>
    //       <Paper
    //         sx={{
    //           display: "flex",
    //           justifyContent: "center",
    //           alignItems: "center",
    //           height: "40px",
    //           borderRadius: "25px",
    //           boxShadow: "none",
    //           border: `1px solid ${theme.palette.grayBorder}`,
    //           width: "50%",
    //           opacity: 0,
    //         }}
    //       >
    //         <InputBase
    //           id="keyword"
    //           // value={title}
    //           // onChange={handleInputSearch}
    //           placeholder={"Job status"}
    //           sx={{ ml: 2, mr: 2, width: "100%" }}
    //           disabled
    //         />
    //         <Box
    //           component="img"
    //           className="eye"
    //           alt="eye logo"
    //           src={activeDownClose}
    //           sx={{
    //             height: 25,
    //             width: 25,
    //             mr: 1,
    //           }}
    //         />
    //       </Paper>
    //     </Box>
    //   </Paper>
    //   <InfiniteScroll
    //     style={{ overflow: "hidden" }}
    //     dataLength={allJobs.length}
    //     next={() => getJobList(lastKey)}
    //     scrollThreshold={"100px"}
    //     hasMore={true}
    //     endMessage={
    //       <p style={{ textAlign: "center" }}>
    //         <b>Yay! You have seen it all</b>
    //       </p>
    //     }
    //   >
    //     <Box
    //       sx={{
    //         mt: 2,
    //       }}
    //     >
    //       {allJobs?.map((job, index) => (
    //         <AllTalentNewCard
    //           key={index}
    //           talentContent={job}
              // setPersonalityAdded={setPersonalityAdded}
              // traits={traits}
    //         />
    //       ))}
    //     </Box>
    //   </InfiniteScroll>
    // </Box>
    <TalentsCommonComponent listName="AllTalents"/>
  );
}
