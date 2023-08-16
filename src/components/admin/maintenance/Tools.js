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
  getAllTools,
  removeTools,
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

  const getTools = async (lastkeyy) => {
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
        await getTools(0);
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
          await getTools(0);
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

  const handleOpenDelete = (toolId) => {
    setOpenDelete((prevState) => !prevState);
    setDeleteTool(toolId);
  };

  const getToolApproved = async (event, toolID) => {
    let approvedJobTitle = {
      tool_id: toolID,
      flag: event.target.checked ? 1 : 0,
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
  useEffect(() => {
    getTools(0);
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
          next={() => getTools(lastKey)}
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
                              defaultChecked={row.approved}
                              onClick={(event) =>
                                handleOpenApprove(event, row?.tool_id)
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
      {/*<Edit
        show={openAdd}
        handleOpen={handleOpenAdd}
        handleEdit={handleAddNewJob}
        handleEditJob={handleNewJob}
        editJobTitle={newJobTitle}
      />*/}
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
