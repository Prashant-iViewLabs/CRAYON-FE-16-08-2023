import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCardNew";
import {
  changeJobApplicationStatus,
  getTalentJobStatusApplications,
  getTalentJobStatusCount,
} from "../../../redux/employer/myJobsSlice";
import { useDispatch } from "react-redux";
import {
  setAlert,
  setLoading,
} from "../../../redux/employer/employerJobsConfigSlice";
import { ALERT_TYPE, ERROR_MSG } from "../../../utils/Constants";
import InfiniteScroll from "react-infinite-scroll-component";
import SortButton from "./SortButton";
import { useParams } from "react-router-dom";
import { Button, Grid, Paper, Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import {
  TALENT_LEFT_JOB_APPLICATION_BUTTON_GROUP,
  TALENT_RIGHT_JOB_INFO_BUTTON_GROUP,
  TALENT_RIGHT_JOB_ACTIVITY_BUTTON_GROUP,
  JOBS_LEFT_TYPES_BUTTON_GROUP,
} from "../../../utils/Constants";
import ButtonPanel from "../../common/ButtonPanel";
import SmallButton from "../../common/SmallButton";
import BasicInfo from "./DraggableCardComponents/BasicInfo";
import CardsTopBar from "./DraggableCardComponents/CardsTopBar";
import LeftArrow from "../../common/LeftArrow";
import RightArrow from "../../common/RightArrow";
import LeftMenu from "./DraggableCardComponents/LeftMenu";
import EmployerButtonPanel from "../../common/EmployerButtonPanel";

const StyledBox = (props) => {
  const { children, color } = props;
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: 37,
        backgroundColor: theme.manageTalent[color]?.main,
        borderRadius: "0 0 20px 20px",
        color: theme.palette.white,
        justifyContent: "space-between",
        display: "flex",
        alignItems: "center",
        fontWeight: 500,
        cursor: "pointer",
        padding: "0 20px",
      }}
    >
      {children}
    </Box>
  );
};
export const data = [
  {
    id: "1",
    Task: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent.",
    Due_Date: "25-May-2020",
  },
  {
    id: "2",
    Task: "Fix Styling",
    Due_Date: "26-May-2020",
  },
  {
    id: "3",
    Task: "Handle Door Specs",
    Due_Date: "27-May-2020",
  },
  {
    id: "4",
    Task: "morbi",
    Due_Date: "23-Aug-2020",
  },
  {
    id: "5",
    Task: "proin",
    Due_Date: "05-Jan-2021",
  },
];

export const columnsFromBackend = {
  23223: {
    title: "matched",
    items: data,
    color: "orangeButton",
  },
  24312: {
    title: "applications",
    items: [],
    color: "yellowButton100",
  },
  33123: {
    title: "considering",
    items: [],
    color: "blueButton400",
  },
  34123: {
    title: "shortlist",
    items: [],
    color: "blueButton100",
  },
  35223: {
    title: "interview",
    items: [],
    color: "purpleButton200",
  },
  36312: {
    title: "assessment",
    items: [],
    color: "brownButton",
  },
  37123: {
    title: "hired",
    items: [],
    color: "lightGreenButton100",
  },
  38123: {
    title: "rejected",
    items: [],
    color: "redButton",
  },
};

const BASIC = {
  sortType: null,
  jobtype_id: "",
  genderType: "",
  salary: [],
  personalitytype_id: "",
  qualification_id: "",
  skin_id: "",
  experience: [],
};

export default function ManageJob() {
  const dispatch = useDispatch();
  const theme = useTheme();
  // const [isSort, setIsSort] = useState(false);
  const [talentStatus, setTalentStatus] = useState([]);
  const [jobDetail, setJobDetail] = useState([]);
  const { jobId } = useParams();
  const [leftExpanded, setLeftExpand] = useState(false);
  const [rightExpanded, setRightExpanded] = useState(false);
  const [leftMenu, setLeftMenu] = useState(false);
  const [basicData, setBasicData] = useState(BASIC);

  const [gender, setGender] = useState("");
  const [qualification, setQualification] = useState("");

  const [talents, setTalents] = useState([]);
  const basicDataRef = useRef(basicData);

  const getTalentStatusApplications = async (
    jobId,
    jobStatusId,
    manageStatus
  ) => {
    try {
      console.log(basicDataRef.current);
      const data = {
        job_id: jobId,
        job_status_id: jobStatusId,
        ...basicDataRef.current,
      };
      // console.log(jobId, jobStatusId, manageStatus);
      const [manage] = await Promise.all([
        dispatch(getTalentJobStatusApplications(data)),
      ]);
      // lastkey += 1;
      setTalents((prevTalents) => {
        const updatedTalents = manageStatus?.map((item) => {
          if (item.id === jobStatusId) {
            return {
              ...item,
              items: manage?.payload?.data,
            };
          } else {
            const existingItem = prevTalents.find(
              (prevItem) => prevItem.id === item.id
            );
            return { ...item, items: existingItem ? existingItem.items : [] };
          }
        });
        return [...updatedTalents];
      });
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: ERROR_MSG,
        })
      );
    }
  };

  const getTalentMyJobStatusCount = async (jobId) => {
    try {
      const [manage] = await Promise.all([
        dispatch(getTalentJobStatusCount({ job_id: jobId })),
      ]);
      setJobDetail(manage.payload.jobdetail);
      setTalentStatus(manage.payload.data);
      // console.log(jobId, item.id, manage.payload.data);
      manage.payload.data.map((item) => {
        item.count > 0
          ? getTalentStatusApplications(jobId, item.id, manage.payload.data)
          : setTalents((prevTalents) => {
              const updatedTalents = manage.payload.data?.map((item) => {
                const existingItem = prevTalents.find(
                  (prevItem) => prevItem.id === item.id
                );
                return {
                  ...item,
                  items: existingItem ? existingItem.items : [],
                };
              });
              return [...updatedTalents];
            });
      });
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: ERROR_MSG,
        })
      );
    }
  };

  const handleMoveJobApplicationStatus = async (
    jobId,
    destinationColumn,
    draggableColumn
  ) => {
    try {
      const [manage] = await Promise.all([
        dispatch(
          changeJobApplicationStatus({
            job_id: jobId,
            job_status_id: destinationColumn?.id,
            candidateuser_id: draggableColumn?.user_id,
          })
        ),
      ]);
      if (manage?.payload?.data?.at(0) == 1) {
      }
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: ERROR_MSG,
        })
      );
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;
    if (source.droppableId != destination.droppableId) {
      const sourceColumn = talents?.find(
        (item) => item?.id == source?.droppableId
      );
      const destinationColumn = talents?.find(
        (item) => item?.id == destination?.droppableId
      );
      const draggableColumn = talents
        ?.find((item) => item?.id == source?.droppableId)
        ?.items?.find((item) => item?.user_id == draggableId);

      setTalents(
        talents?.map((talent) => {
          if (talent?.id == sourceColumn?.id) {
            return {
              ...talent,
              items: talent?.items?.filter(
                (item) => item?.user_id != draggableColumn?.user_id
              ),
              count: talent?.count - 1,
            };
          }
          if (talent?.id == destinationColumn?.id) {
            return {
              ...talent,
              items: [...talent?.items, draggableColumn],
              count: talent?.count + 1,
            };
          }
          return talent;
        })
      );
      handleMoveJobApplicationStatus(jobId, destinationColumn, draggableColumn);
    }
  };

  const renderColor = (column) => {
    switch (column?.status) {
      case "incomplete":
        return "manageIncomplete";
      case "matched":
        return "manageMatched";
      case "considering":
        return "manageConsidering";
      case "shortlist":
        return "manageShortlist";
      case "interview":
        return "manageInterview";
      case "assessment":
        return "manageAssesment";
      case "hired":
        return "manageHired";
      case "rejected":
        return "manageRejected";
      case "review":
        return "manageReview";
      case "offer":
        return "manageOffer";
      default:
        return "orangeButton";
    }
  };

  const handleDropDownFilters = async () => {
    console.log(gender);
    console.log(qualification);

    setBasicData((prevBasicData) => ({
      ...prevBasicData,
      genderType: gender,
      qualification_id: qualification !== "" && qualification.toString(),
    }));
    await getTalentMyJobStatusCount(jobId);
  };

  useEffect(() => {
    getTalentMyJobStatusCount(jobId);
  }, []);
  useEffect(() => {
    console.log(qualification);
    if (gender || qualification) {
      handleDropDownFilters();
    }
  }, [gender, qualification]);

  useEffect(() => {
    // Update the ref whenever the state changes
    basicDataRef.current = basicData;
  }, [basicData]);

  const handleSortedValue = (columnName, value) => {
    setTalents((prevTalents) => {
      const updatedTalents = talentStatus?.map((item) => {
        if (item.id === columnName) {
          return {
            ...item,
            items: value,
          };
        } else {
          const existingItem = prevTalents.find(
            (prevItem) => prevItem.id === item.id
          );
          return { ...item, items: existingItem ? existingItem.items : [] };
        }
      });
      return [...updatedTalents];
    });
  };

  const talentRightFIlters = async (selectedFilter) => {
    let jobs = [];
    selectedFilter.map((type) => {
      let selectedJobType = TALENT_RIGHT_JOB_INFO_BUTTON_GROUP.find(
        (jobtype) => jobtype.id === type
      );
      jobs.push(selectedJobType.name);
    });
    console.log(jobs);
    setBasicData((prevBasicData) => ({
      ...prevBasicData,
      jobtype_id: jobs[0] === "all talent" ? "" : jobs.toString(),
    }));
    await getTalentMyJobStatusCount(jobId);
  };

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
        }}
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
          }}
        >
          <LeftMenu leftExpanded={leftMenu} />
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
            width: !leftExpanded ? "150px" : "",
            marginRight: "30px",
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
              backgroundColor: theme.manageTalent.leftArrowButton.main,
              ":hover": {
                backgroundColor: theme.manageTalent.leftArrowButton.main,
                boxShadow: "none",
              },
            }}
            onClick={() => {
              setLeftExpand((prevState) => !prevState);
            }}
          >
            {!leftExpanded ? <LeftArrow /> : <RightArrow />}
          </Button>
          {!leftExpanded && (
            <Box
              sx={
                {
                  // height: "82vh",
                  // overflowY: leftExpanded ? "scroll" : "unset",
                }
              }
              className="filterSec"
            >
              <Paper
                sx={{
                  background: "transparent",
                  marginRight: "1px",
                  boxShadow: "none",
                }}
              >
                <ButtonPanel
                  panelData={TALENT_LEFT_JOB_APPLICATION_BUTTON_GROUP}
                  side="left"
                  // onChangeFilter={jobsFilterLeft}
                />
              </Paper>
            </Box>
          )}
          <Button
            variant="contained"
            sx={{
              position: "static",
              borderRadius: "0 10px 10px 0",
              minWidth: "40px",
              width: "40px",
              height: "45px",
              backgroundColor: theme.palette.redButton100.main,
              ":hover": {
                backgroundColor: theme.palette.redButton100.main,
                boxShadow: "none",
              },
            }}
            onClick={() => {
              setLeftMenu((prevState) => !prevState);
            }}
          >
            {leftMenu ? <LeftArrow /> : <RightArrow />}
          </Button>
        </Grid>
      </Grid>

      <Grid
        Grid
        xs={12}
        sm={6}
        md={8}
        lg={10}
        xl={10}
        sx={{
          // display: "flex",
          overflowX: "scroll",
          overflowY: "hidden",
          // transform: "rotateX(180deg)",
        }}
        className="centerSection"
      >
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
          <CardsTopBar jobDetail={jobDetail} />
          <Box
            sx={{
              display: "flex",
              maxHeight: "100%",
              gap: "15px",
            }}
          >
            {Object.entries(talents).map(([columnId, column], index) => {
              return (
                <Droppable key={`${column?.id}`} droppableId={`${column?.id}`}>
                  {(provided) => (
                    <Box
                      xs={3}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      sx={{
                        flex: "1 1 0px",
                        minWidth: "325px",
                      }}
                    >
                      <StyledBox
                        color={renderColor(column)}
                        column={column}
                        jobId={jobId}
                      >
                        <Box sx={{ display: "flex" }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mr: "20px",
                            }}
                          >
                            {column?.status}
                          </Box>
                          <Button
                            variant="contained"
                            color="base"
                            label={column?.count}
                            padding="0 4px"
                            alignItems="end"
                            sx={{
                              fontSize: 14,
                              fontWeight: 700,
                              letterSpacing: "0.75px",
                              height: 25,
                              borderRadius: "6px",
                              boxShadow: 0,
                              color:
                                theme.manageTalent[renderColor(column)]?.main,
                              minWidth: "33px",
                              padding: "0 8px",
                            }}
                          >
                            {column?.count}
                          </Button>
                        </Box>
                        <SortButton
                          jobId={jobId}
                          jobStatusId={column?.id}
                          handleSortedValue={handleSortedValue}
                        />
                      </StyledBox>
                      <Box id="talentList">
                        {talents[index]?.items?.map((item, index) => (
                          <DraggableCard
                            key={item?.user_id}
                            item={item}
                            index={index}
                            droppableId={column?.id}
                            onDragEnd={onDragEnd}
                            jobId={jobId}
                            talentStatus={talentStatus}
                          />
                        ))}
                      </Box>
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              );
            })}
          </Box>
        </DragDropContext>
        <style>
          {`.centerSection::-webkit-scrollbar {
                    height: 5px !important;
                    background-color: "base"; /* Set the background color of the scrollbar */
                  }
                  .centerSection::-webkit-scrollbar-thumb {
                    background-color: "base";
                    height: 5px;
                    // box-shadow: 0px 3px 3px #00000029;
                    border-radius: 3px;/* Set the color of the scrollbar thumb */
                  }`}
        </style>
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
          width: !rightExpanded ? "150px" : "",
          marginLeft: "30px",
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
            backgroundColor: theme.manageTalent.leftArrowButton.main,
            ":hover": {
              backgroundColor: theme.manageTalent.leftArrowButton.main,
              boxShadow: "none",
            },
          }}
          onClick={() => {
            setRightExpanded((prevState) => !prevState);
          }}
        >
          {!rightExpanded ? <RightArrow /> : <LeftArrow />}
        </Button>
        {!rightExpanded && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "150px",
            }}
            // className="rightfilterSec"
          >
            <Paper
              sx={{
                background: "transparent",
                marginLeft: "1px",
                boxShadow: "none",
                gap: "10px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <EmployerButtonPanel
                panelData={TALENT_RIGHT_JOB_INFO_BUTTON_GROUP}
                side="right"
                onChangeFilter={talentRightFIlters}
                setGender={setGender}
                setQualification={setQualification}
              />
              <ButtonPanel
                panelData={TALENT_RIGHT_JOB_ACTIVITY_BUTTON_GROUP}
                side="right"
                // onChangeFilter={jobsFilter}
              />
              <ButtonPanel
                panelData={JOBS_LEFT_TYPES_BUTTON_GROUP}
                side="right"
                // onChangeFilter={jobsFilter}
              />
            </Paper>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}
