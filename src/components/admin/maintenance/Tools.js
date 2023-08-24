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
  addNewTool,
  approveTool,
  editTool,
  getAllTools,
  removeTools,
} from "../../../redux/admin/maintenance";
import { dateConverterMonth } from "../../../utils/DateTime";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { setAlert, setLoading } from "../../../redux/configSlice";
import { ALERT_TYPE, ERROR_MSG } from "../../../utils/Constants";
import CustomDialog from "../../common/CustomDialog";
import { useTheme } from "@emotion/react";
import Delete from "./Dialogbox/Delete";
import AddNew from "./Dialogbox/AddNew";
import Edit from "./Dialogbox/Edit";
import Approve from "./Dialogbox/Approve";
import { getTools } from "../../../redux/employer/postJobSlice";
import { useSelector } from "react-redux";
export default function Tools() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [lastKey, setLastKey] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [toolsCount, setToolsCount] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteTool, setDeleteTool] = useState();
  const [openAdd, setOpenAdd] = useState(false);
  const [newTool, setNewTool] = useState("");
  const [jobID, setJobID] = useState();
  const [approveEvent, setApproveEvent] = useState(false);
  const [openApprove, setOpenApprove] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editableTool, setEditableTool] = useState();
  const [toolName, settoolName] = useState("");
  const [existingTool, setExistingTool] = useState();

  const { tools } = useSelector((state) => state.postJobs);

  const getAllData = async () => {
    try {
      dispatch(setLoading(true));
      await dispatch(getTools());
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
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

  const getTool = async (lastkeyy) => {
    try {
      const { payload } = await dispatch(getAllTools({ lastKey: lastkeyy }));
      if (payload.status === "success") {
        setToolsCount(payload.count);
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

  const removeTool = async () => {
    try {
      const data = {
        tool_id: deleteTool,
      };
      const { payload } = await dispatch(removeTools(data));
      if (payload.status === "success") {
        setOpenDelete(false);
        setTableData([]);
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Tool removed successfully",
          })
        );
        setOpenDelete(false);
        await getTool(0);
      }
    } catch (error) {}
  };

  const handleAddNewTool = async () => {
    try {
      if (newTool !== "") {
        const data = {
          title: newTool,
        };
        const { payload } = await dispatch(addNewTool(data));
        if (payload.status === "success") {
          setNewTool("");
          setTableData([]);
          dispatch(
            setAlert({
              show: true,
              type: ALERT_TYPE.SUCCESS,
              msg: "New tool added successfully",
            })
          );
          setOpenAdd(false);
          await getTool(0);
        } else {
          console.log(payload);
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

  const handleEditTool = async () => {
    try {
      const data = {
        new_tool_id: existingTool !== undefined ? existingTool : null,
        current_tool_id: editableTool,
        title: toolName !== "" ? toolName : "",
      };
      const { payload } = await dispatch(editTool(data));
      if (payload.status === "success") {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Job title edited successfully",
          })
        );
        setOpenEdit(false);
        await getTool(0);
      } else {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.ERROR,
            msg: payload.message.message,
          })
        );
      }
    } catch (error) {}
  };

  const handleOpenDelete = (toolId) => {
    setOpenDelete((prevState) => !prevState);
    setDeleteTool(toolId);
  };

  const getToolApproved = async (event, toolID) => {
    let approvedJobTitle = {
      tool_id: toolID,
      flag: event.target.checked ? 0 : 1,
    };
    try {
      const { payload } = await dispatch(approveTool(approvedJobTitle));
      if (payload?.status == "success") {
        event.target.checked &&
          dispatch(
            setAlert({
              show: true,
              type: ALERT_TYPE.SUCCESS,
              msg: "Tool approved successfully!",
            })
          );
        setOpenApprove(false);
        await getTool(0);
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
    setNewTool(event.target.value);
  };

  const handleOpenAdd = () => {
    setOpenAdd((prevState) => !prevState);
  };

  const handleCancel = () => {
    setOpenApprove(false);
  };

  const handleOpenApprove = (event, jobId) => {
    setOpenApprove((prevState) => !prevState);
    setApproveEvent(event);
    setJobID(jobId);
  };

  const handleEdit = (event) => {
    if (event.target.id === "edit_input") {
      setExistingTool(null);
      settoolName(event.target.value);
    } else if (event.target.id.includes("existing_name")) {
      let com = tools?.find((title) => title.name === event.target.textContent);
      console.log(com);
      settoolName("");
      setExistingTool(com.tool_id);
    }
  };

  const handleOpenEdit = (currCompID, compName) => {
    setOpenEdit((prevState) => !prevState);
    setEditableTool(currCompID);
    settoolName(compName);
    setExistingTool("");
  };
  useEffect(() => {
    getTool(0);
    getAllData();
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
        Tools ({toolsCount})
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
          next={() => getTool(lastKey)}
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
                        Name
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
                      <TableCell>{row?.tool_id}</TableCell>
                      <TableCell>{row?.name}</TableCell>
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
                              checked={row.approved}
                              onClick={(event) =>
                                handleOpenApprove(event, row?.tool_id)
                              }
                            />
                          </Tooltip>
                          <Tooltip title="edit" placement="top-end">
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
                              <EditIcon
                                onClick={() =>
                                  handleOpenEdit(row?.tool_id, row?.name)
                                }
                                sx={{ cursor: "pointer" }}
                              />
                            </IconButton>
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
                                onClick={() => handleOpenDelete(row?.tool_id)}
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
        dialogText={"tool"}
        show={openDelete}
        handleOpen={handleOpenDelete}
        handleDelete={removeTool}
      />
      <AddNew
        show={openAdd}
        handleOpen={handleOpenAdd}
        handleAdd={handleAddNewTool}
        handleNewJob={handleNewJob}
        newTitle={newTool}
        dialogText={"tool"}
      />
      <Edit
        show={openEdit}
        handleOpen={handleOpenEdit}
        handleEdit={handleEditTool}
        handleEditJob={handleEdit}
        inputName={toolName}
        existingCompany={existingTool}
        data={tools}
        dialogText={"tool"}
      />
      <Approve
        show={openApprove}
        dialogText={"tool"}
        handleOpen={handleOpenApprove}
        handleCancel={handleCancel}
        handleApprove={getToolApproved}
        approveEvent={approveEvent}
        jobID={jobID}
      />
    </Box>
  );
}
