import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Box,
  Grid,
  IconButton,
  Button,
  Switch,
  InputBase,
  Tooltip,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
import {
  addJobTitle,
  addNewSkill,
  approveJobTitle,
  approveSkill,
  getAllJobTitles,
  getAllSkills,
  removeJobTitle,
  removeSkill,
} from "../../../redux/admin/maintenance";
import { dateConverterMonth } from "../../../utils/DateTime";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { setAlert } from "../../../redux/configSlice";
import { ALERT_TYPE } from "../../../utils/Constants";
import CustomDialog from "../../common/CustomDialog";
import { useTheme } from "@emotion/react";
import Delete from "./Dialogbox/Delete";
import AddNew from "./Dialogbox/AddNew";
import Edit from "./Dialogbox/Edit";
import Approve from "./Dialogbox/Approve";

export default function Skills() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [lastKey, setLastKey] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [tagsCount, setTagsCount] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteJob, setDeleteJob] = useState();
  // const [deleted, setDeleted] = useState(0);
  const [newTagTitle, setNewTagTitle] = useState("");
  const [openApprove, setOpenApprove] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [jobID, setJobID] = useState();
  const [approveEvent, setApproveEvent] = useState(false);

  const getSkiils = async (lastkeyy) => {
    try {
      const { payload } = await dispatch(getAllSkills({ lastKey: lastkeyy }));
      if (payload.status === "success") {
        setTagsCount(payload.count);
        if (lastkeyy === 0) {
          setTableData(payload.data);
          setLastKey(payload.pageNumber + 1);
        } else {
          setLastKey(payload.pageNumber + 1);
          setTableData((prevState) => [...prevState, ...payload.data]);
        }
      }
    } catch (error) {}
  };

  const removeTitle = async () => {
    try {
      const data = {
        tag_id: deleteJob,
      };
      const { payload } = await dispatch(removeSkill(data));
      if (payload.status === "success") {
        setOpenDelete(false);
        setTableData([]);
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Skill removed successfully",
          })
        );
        await getSkiils(0);
      }
    } catch (error) {}
  };

  const handleAddNewJob = async () => {
    try {
      if (newTagTitle !== "") {
        const data = {
          title: newTagTitle,
        };
        const { payload } = await dispatch(addNewSkill(data));
        if (payload.status === "success") {
          setNewTagTitle("");
          setTableData([]);
          setOpenAdd(false);
          dispatch(
            setAlert({
              show: true,
              type: ALERT_TYPE.SUCCESS,
              msg: "New skill added successfully",
            })
          );
          await getSkiils(0);
        } else {
          dispatch(
            setAlert({
              show: true,
              type: ALERT_TYPE.ERROR,
              msg: payload?.message?.message,
            })
          );
        }
      } else {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.ERROR,
            msg: "Field is blank",
          })
        );
      }
    } catch (error) {}
  };

  const getJobApproved = async (event, jobID) => {
    let approvedJobTitle = {
      tag_id: jobID,
      flag: event.target.checked ? 1 : 0,
    };
    try {
      const { payload } = await dispatch(approveSkill(approvedJobTitle));
      if (payload?.status == "success") {
        event.target.checked &&
          dispatch(
            setAlert({
              show: true,
              type: ALERT_TYPE.SUCCESS,
              msg: "Skill approved successfully!",
            })
          );
        setOpenApprove(false);
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

  const handleNewJob = (event) => {
    setNewTagTitle(event.target.value);
  };

  const handleOpenDelete = (jobId) => {
    setOpenDelete((prevState) => !prevState);
    setDeleteJob(jobId);
  };

  const handleOpenApprove = (event, jobId) => {
    setOpenApprove((prevState) => !prevState);
    setApproveEvent(event);
    setJobID(jobId);
  };

  const handleOpenAdd = () => {
    setOpenAdd((prevState) => !prevState);
  };

  const handleCancel = () => {
    setOpenApprove(false);
  };

  useEffect(() => {
    getSkiils(0);
  }, []);
  return (
    <Box sx={{ ml: 6 }}>
      <Typography
        sx={{
          fontSize: "36px",
          fontWeight: 700,
          // ml: 6
        }}
      >
        Skills ({tagsCount})
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <Button variant="contained" color="redButton" onClick={handleOpenAdd}>
          Add
        </Button>
      </Box>
      <Grid
        container
        spacing={2}
        flexDirection={"column"}
        sx={{
          display: { xs: "none", md: "flex" },
          marginTop: "30px",
        }}
      >
        <InfiniteScroll
          style={{ overflow: "hidden" }}
          dataLength={tableData.length}
          next={() => getSkiils(lastKey)}
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
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Id
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Tag
                      </Typography>
                    </TableCell>
                    {/*<TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Users
                  </Typography>
                </TableCell>*/}
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Created At
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Updated At
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Actions
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row) => (
                    <TableRow
                      key={row.id}
                      style={{
                        "& .css-12zgwp-MuiTableCell-root": {
                          padding: "0 16px !important",
                        },
                      }}
                    >
                      <TableCell>{row?.tag_id}</TableCell>
                      <TableCell>{row?.tag}</TableCell>
                      <TableCell>
                        {dateConverterMonth(row.created_at)}
                      </TableCell>
                      <TableCell>
                        {dateConverterMonth(row.updated_at)}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", gap: "8px" }}>
                          <Tooltip title="approve" placement="top-end">
                            <Checkbox
                              defaultChecked={row.approved}
                              onClick={(event) =>
                                handleOpenApprove(event, row?.tag_id)
                              }
                            />
                          </Tooltip>
                          <Tooltip title="delete" placement="top-end">
                            <IconButton
                              aria-label="edit"
                              color="blueButton400"
                              sx={{
                                padding: "0 !important",
                                minWidth: "18px !important",
                                "& .MuiSvgIcon-root": {
                                  width: "18px",
                                },
                              }}
                            >
                              <DeleteIcon
                                onClick={() => handleOpenDelete(row?.tag_id)}
                                sx={{ cursor: "pointer" }}
                              />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </InfiniteScroll>
      </Grid>
      <Delete
        show={openDelete}
        handleOpen={handleOpenDelete}
        handleDelete={removeTitle}
      />
      <AddNew
        show={openAdd}
        handleOpen={handleOpenAdd}
        handleAdd={handleAddNewJob}
        handleNewJob={handleNewJob}
        newTitle={newTagTitle}
        dialogText={"skill"}
      />
      {/*<Edit
        show={openAdd}
        handleOpen={handleOpenAdd}
        handleEdit={handleAddNewJob}
        handleEditJob={handleNewJob}
        editJobTitle={newJobTitle}
      />*/}
      <Approve
        show={openApprove}
        dialogText={"skill"}
        handleOpen={handleOpenApprove}
        handleCancel={handleCancel}
        handleApprove={getJobApproved}
        approveEvent={approveEvent}
        jobID={jobID}
      />
    </Box>
  );
}
