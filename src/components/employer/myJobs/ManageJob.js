import { useEffect, useState } from "react";
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

const StyledBox = (props) => {
  const { children, color } = props;
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: 37,
        backgroundColor: theme.palette[color].main,
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

export default function ManageJob() {
  const dispatch = useDispatch();
  const theme = useTheme();
  // const [isSort, setIsSort] = useState(false);
  const [talentStatus, setTalentStatus] = useState([]);
  const [jobDetail, setJobDetail] = useState([]);
  const { jobId } = useParams();

  const [talents, setTalents] = useState([]);

  const getTalentStatusApplications = async (
    jobId,
    jobStatusId,
    manageStatus
  ) => {
    try {
      const [manage] = await Promise.all([
        dispatch(
          getTalentJobStatusApplications({
            job_id: jobId,
            job_status_id: jobStatusId,
          })
        ),
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
        return "grayButton100";
      case "matched":
        return "QandA";
      case "considering":
        return "blueButton400";
      case "shortlist":
        return "blueButton100";
      case "interview":
        return "purpleButton200";
      case "assessment":
        return "brownButton";
      case "hired":
        return "lightGreenButton100";
      case "rejected":
        return "redButton";
      case "review":
        return "yellowButton100";
      default:
        return "orangeButton";
    }
  };

  useEffect(() => {
    getTalentMyJobStatusCount(jobId);
  }, []);

  const handleSortedValue = (columnName, value) => {
    console.log(columnName, value);
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
      console.log(updatedTalents);
      return [...updatedTalents];
    });
  };

  return (
    <Grid
      container
      spacing={0}
      flexDirection={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
    >
      <Grid
        item
        md={2}
        lg={1}
        xl={1}
        className="filterSec"
        sx={{
          height: "88vh",
          overflowY: "scroll",
        }}
      >
        <Paper
          sx={{
            background: "transparent",
            marginRight: "1px",
          }}
        >
          <ButtonPanel
            panelData={TALENT_LEFT_JOB_APPLICATION_BUTTON_GROUP}
            side="left"
            // onChangeFilter={jobsFilterLeft}
          />
        </Paper>
        <style>
          {`.filterSec::-webkit-scrollbar {
                  width: 5px !important;
                  background-color: #EFEEEE; /* Set the background color of the scrollbar */
                }
                .filterSec::-webkit-scrollbar-thumb {
                  background-color: white;
                  width: 5px;
                  box-shadow: 0px 3px 3px #00000029;
                  border-radius: 3px;
                }`}
        </style>
      </Grid>
      <Grid
        Grid
        xs={12}
        sm={6}
        md={8}
        lg={9}
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
                        margin: "8px",
                        minWidth: "325px",
                      }}
                    >
                      <StyledBox
                        color={renderColor(column)}
                        column={column}
                        jobId={jobId}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
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
                            color: theme.palette[renderColor(column)]?.main,
                            minWidth: "33px",
                            padding: "0 8px",
                          }}
                        >
                          {column?.count}
                        </Button>
                        <SortButton
                          jobId={jobId}
                          jobStatusId={column?.id}
                          handleSortedValue={handleSortedValue}
                        />
                      </StyledBox>
                      <Box id="talentList">
                        <InfiniteScroll
                          style={{
                            height: "600px",
                            overflowX: "hidden",
                            scrollbarWidth: "thin",
                          }}
                          key={column?.id}
                          dataLength={talents[index]?.items?.length}
                          next={() => console.log("HIHIHIHI")}
                          hasMore={true}
                          scrollableTarget="talentList"
                          scrollThreshold={"10px"}
                          endMessage={
                            <p style={{ textAlign: "center" }}>
                              <b>Yay! You have seen it all</b>
                            </p>
                          }
                        >
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
                          <style>
                            {`.infinite-scroll-component::-webkit-scrollbar {
                            width: 7px !important;
                            background-color: #EFEEEE; /* Set the background color of the scrollbar */
                          }

                          .infinite-scroll-component::-webkit-scrollbar-thumb {
                            background-color: white;
                            width: 5px;
                            // box-shadow: 0px 3px 3px #00000029;
                            border-radius: 3px;
                          }`}
                          </style>
                        </InfiniteScroll>
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
        md={2}
        lg={1}
        xl={1}
        className="rightfilterSec"
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "88vh",
          overflowY: "scroll",
          direction: "rtl",
        }}
      >
        <style>
          {`.rightfilterSec::-webkit-scrollbar {
                       width: 5px !important;
                       background-color: #EFEEEE; /* Set the background color of the scrollbar */
                    }
                    .rightfilterSec::-webkit-scrollbar-thumb {
                      background-color: white;
                      width: 5px;
                      box-shadow: 0px 3px 3px #00000029;
                      border-radius: 3px;
                    }`}
        </style>
        <Paper
          sx={{
            background: "transparent",
            marginLeft: "1px",
          }}
        >
          <ButtonPanel
            panelData={TALENT_RIGHT_JOB_INFO_BUTTON_GROUP}
            side="right"
            // onChangeFilter={jobsFilter}
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
      </Grid>
    </Grid>
  );
}
