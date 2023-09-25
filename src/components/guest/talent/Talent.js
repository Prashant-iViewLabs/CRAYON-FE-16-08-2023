import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import TalentCard from "./TalentCardNew";
import { useTheme } from "@mui/material/styles";
import SearchBar from "../../common/SearchBar";
import SwipeableViews from "react-swipeable-views";
import ButtonPanel from "../../common/ButtonPanel";
import {
  ALERT_TYPE,
  JOBS_LEFT_INDUSTRIES_BUTTON_GROUP,
  JOBS_LEFT_TYPES_BUTTON_GROUP,
  JOBS_RIGHT_JOB_TYPES_BUTTON_GROUP,
  JOBS_RIGHT_POSTS_BUTTON_GROUP,
  JOBS_RIGHT_STAGES_BUTTON_GROUP,
  TALENT_RIGHT_JOB_ACTIVITY_BUTTON_GROUP,
  TALENT_RIGHT_JOB_TYPES_BUTTON_GROUP,
} from "../../../utils/Constants";
import locale from "../../../i18n/locale";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getFilteredTalent,
  getTalentList,
} from "../../../redux/guest/talentSlice";
import { useSelector } from "react-redux";
import { getAllIndustries, setAlert } from "../../../redux/configSlice";
import { getAllJobs, getFilteredJobs } from "../../../redux/guest/jobsSlice";
import { getAllJobRoleType } from "../../../redux/jobRole";
import { getAllStages } from "../../../redux/stages";
import { get } from "lodash";
import jwt_decode from "jwt-decode";
import { getAllTypes } from "../../../redux/allTypes";
import { getAllTalentType } from "../../../redux/guest/talentTypes";
import { Button, Paper } from "@mui/material";
import { nanoid } from "@reduxjs/toolkit";
import LeftArrow from "../../common/LeftArrow";
import RightArrow from "../../common/RightArrow";

const BASIC = {
  talent_title: "",
  region_id: [],
  tag_id: [],
  town_id: [],
  tool_id: [],
  salary: [],
  experience: [],
  company_id: [],
  currency_id: [],
  highest_qualification_id: [],
};

export default function Talent() {
  const i18n = locale.en;
  const theme = useTheme();
  const dispatch = useDispatch();
  const allIndustries = useSelector((state) => state.config.industries);
  const allTypes = useSelector((state) => state.configAllTypes?.types);
  // const allJobTypes = useSelector((state) => state.jobtype.jobRoleType);
  const allTalentTypes = useSelector((state) => state.talenttype.talentType);
  // const jobTypes = allJobTypes.filter((item) => !item.job_crayon_type_id);
  // const [allJobs, setAllJobs] = useState([]);
  const [filters, setFilters] = useState([allIndustries[0]?.id]);
  const [filtersType, setFiltersType] = useState([allTypes[0]?.id]);
  const [filtersJobType, setFiltersJobType] = useState([allTalentTypes[0]?.id]);
  const [basicData, setBasicData] = useState(BASIC);

  const [rightExpand, setRightExpand] = useState(true);
  const [leftExpanded, setLeftExpand] = useState(true);

  const [all_talent, setAll_talent] = useState([]);
  const [lastKey, setLastKey] = useState(0);

  const isolateTouch = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const token = localStorage?.getItem("token");
  let decodedToken;
  if (token) {
    decodedToken = jwt_decode(token);
  }

  const getTalent = async (
    selectedFilters = filters,
    personalityType = filtersType,
    jobtype = filtersJobType,
    lastkeyy
  ) => {
    if (selectedFilters.length == 0) {
      setAll_talent([]);
    } else if (
      selectedFilters.length == 1 &&
      selectedFilters[0] == 1111 &&
      jobtype.length == 1 &&
      jobtype[0] == 1111 &&
      personalityType.length == 1 &&
      personalityType[0] == 1111
    ) {
      // const lastKey = all_talent?.[all_talent.length - 1]?.user_id || "";
      const data = {
        lastKey: lastkeyy,
        user_id: token ? decodedToken?.data?.user_id : "",
      };
      const { payload } = await dispatch(getTalentList(data));
      if (payload?.status == "success") {
        console.log(payload.pageNumber);
        setLastKey(payload.pageNumber + 1);
        setAll_talent((prevState) => [...prevState, ...payload.data]);
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
      // const lastKey = all_talent?.[all_talent.length - 1]?.user_id || "";
      const data = {
        selectedFilters: selectedFilters.toString(),
        lastKey: lastkeyy?.toString(),
        personalityType: personalityType.toString(),
        user_id: token ? decodedToken?.data?.user_id : "",
        jobtype: jobtype.toString(),
        ...basicData,
      };
      const { payload } = await dispatch(getFilteredTalent(data));
      if (payload?.status == "success") {
        setLastKey(payload.pageNumber + 1);
        setAll_talent((prevState) => [...prevState, ...payload.data]);
      } else {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.ERROR,
            msg: payload?.message,
          })
        );
      }
    }
  };
  const getIndustries = async () => {
    await dispatch(getAllIndustries());
  };
  const getTypes = async () => {
    await dispatch(getAllTypes());
  };
  const getTalentTypes = async () => {
    await dispatch(getAllTalentType());
  };

  const onChangeFilter = (selectedFilter) => {
    setAll_talent([]);
    setLastKey(0);
    setFilters(selectedFilter);
    getTalent(selectedFilter, filtersType, filtersJobType, "");
  };

  const onChangeFilterType = (selectedFilter) => {
    setAll_talent([]);
    setLastKey(0);
    setFiltersType(selectedFilter);
    getTalent(filters, selectedFilter, filtersJobType, "");
  };

  const onChangeFilterJobType = (selectedFilter) => {
    let jobs = [];
    selectedFilter.map((type) => {
      let selectedJobType = allTalentTypes.find(
        (jobtype) => jobtype.id === type
      );
      jobs.push(selectedJobType.name);
    });
    setAll_talent([]);
    setLastKey(0);
    setFiltersJobType(jobs);
    getTalent(filters, filtersType, jobs, "");
  };

  useEffect(() => {
    getIndustries();
    getTypes();
    getTalentTypes();
    getTalent(
      [allIndustries[0]?.id],
      [allTypes[0]?.id],
      [allTalentTypes[0]?.id],
      ""
    );
  }, []);
  return (
    <Grid
      container
      spacing={0}
      flexDirection={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      flexWrap={"nowrap"}
    >
      <Grid
        item
        // md={2}
        // lg={1}
        // xl={1}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "150px",
        }}
      >
        <Button
          variant="contained"
          sx={{
            position: "static",
            borderRadius: "0 10px 10px 0",
            minWidth: "40px",
            width: "40px",
            height: "45px",
          }}
          color="redButton200"
          onClick={() => {
            setLeftExpand((prevState) => !prevState);
          }}
        >
          {leftExpanded ? <LeftArrow /> : <RightArrow />}
        </Button>
        {leftExpanded && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <ButtonPanel
              topMargin={true}
              panelData={allIndustries}
              side="left"
              onChangeFilter={onChangeFilter}
            />
            <ButtonPanel
              panelData={allTypes}
              side="left"
              onChangeFilter={onChangeFilterType}
            />
            <Button
              variant="contained"
              sx={{
                position: "static",
                borderRadius: "0 10px 10px 0",
                minWidth: "40px",
                width: "40px",
                height: "45px",
              }}
              color="redButton200"
              onClick={() => {
                setLeftExpand((prevState) => !prevState);
              }}
            >
              {leftExpanded ? <LeftArrow /> : <RightArrow />}
            </Button>
          </Box>
        )}
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={8}
        lg={9}
        xl={10}
        sx={{
          paddingX: "30px",
          display: "flex",
          flexDirection: "column",
        }}
        gap={"54px"}
        flexGrow="1 !important"
      >
        <SearchBar
          placeholder={"Begin your search for talent here..."}
          setAllJobs={setAll_talent}
          setLastKey={setLastKey}
          setBasicData={setBasicData}
          basicData={basicData}
        />
        <InfiniteScroll
          key={`${filters} + ${filtersType} + ${filtersJobType}`}
          scrollThreshold={"100px"}
          dataLength={all_talent.length}
          next={() => getTalent(filters, filtersType, filtersJobType, lastKey)}
          hasMore={true}
          style={{
            height: "none !important",
            overflow: "unset !important",
          }}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <Grid
            container
            gap={"40px"}
            flexDirection={{ sx: "column", md: "row" }}
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
            width={"100%"}
          >
            {all_talent.length > 0 ? (
              all_talent?.map((talent) => {
                return (
                  <Grid
                    sx={{
                      width: "360px",
                      height: "560px",

                      marginBottom: 0,
                    }}
                    key={talent}
                  >
                    <TalentCard index={nanoid()} job={talent} />
                  </Grid>
                );
              })
            ) : (
              <Box
                sx={{
                  width: "100%",
                  textAlign: "center",
                  mt: 4,
                  color: theme.palette.placeholder,
                }}
              >
                {""}
              </Box>
            )}
          </Grid>
        </InfiniteScroll>
        <Grid container spacing={2} sx={{ my: 2, display: { md: "none" } }}>
          {/* <SwipeableViews enableMouseEvents onTouchStart={isolateTouch}>
            <Grid xl={3} lg={4} md={6} xs={12} sx={{ px: 3 }}>
              <TalentCard index="11" />
            </Grid>
            <Grid xl={3} lg={4} md={6} xs={12} sx={{ px: 3 }}>
              <TalentCard index="12" />
            </Grid>
            <Grid xl={3} lg={4} md={6} xs={12} sx={{ px: 3 }}>
              <TalentCard index="13" />
            </Grid>
            <Grid xl={3} lg={4} md={6} xs={12} sx={{ px: 3 }}>
              <TalentCard index="14" />
            </Grid>
            <Grid xl={3} lg={4} md={6} xs={12} sx={{ px: 3 }}>
              <TalentCard index="15" />
            </Grid>
            <Grid xl={3} lg={4} md={6} xs={12} sx={{ px: 3 }}>
              <TalentCard index="16" />
            </Grid>
          </SwipeableViews> */}
        </Grid>
      </Grid>
      <Grid
        item
        // md={2}
        // lg={1}
        // xl={1}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          direction: "rtl",
          width: "150px",
        }}
      >
        <Button
          variant="contained"
          sx={{
            position: "sticky",
            top: 0,
            borderRadius: "10px 0 0 10px",
            minWidth: "40px",
            width: "40px",
            height: "45px",
          }}
          color="redButton200"
          onClick={() => {
            setRightExpand((prevState) => !prevState);
          }}
        >
          {rightExpand ? <RightArrow /> : <LeftArrow />}
        </Button>
        {rightExpand && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <ButtonPanel
              topMargin={true}
              panelData={allTalentTypes}
              side="right"
              onChangeFilter={onChangeFilterJobType}
            />
            <ButtonPanel
              panelData={TALENT_RIGHT_JOB_ACTIVITY_BUTTON_GROUP}
              side="right"
            />
          </Box>
        )}
      </Grid>
    </Grid>
  );
}
