import React, { useEffect, useState } from "react";
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
  Tooltip,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
import {
  addJobTitle,
  approveJobTitle,
  editJobTitle,
  getAllJobTitles,
  removeJobTitle,
} from "../../../redux/admin/maintenance";
import { dateConverterMonth } from "../../../utils/DateTime";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { setAlert, setLoading } from "../../../redux/configSlice";
import { ALERT_TYPE, ERROR_MSG } from "../../../utils/Constants";
import { useTheme } from "@emotion/react";
import AddNew from "./Dialogbox/AddNew";
import Delete from "./Dialogbox/Delete";
import Edit from "./Dialogbox/Edit";
import Approve from "./Dialogbox/Approve";
import { useSelector } from "react-redux";
import { getTitles } from "../../../redux/candidate/myCvSlice";

export default function JobTitles() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [lastKey, setLastKey] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [jobTitleCount, setJobTitleCount] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [openApprove, setOpenApprove] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [deleteJob, setDeleteJob] = useState();
  const [newJobTitle, setNewJobTitle] = useState("");
  const [jobID, setJobID] = useState();
  const [approveEvent, setApproveEvent] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editableCompany, setEditableCompany] = useState();
  const [companyName, setcompanyName] = useState("");
  const [existingCompany, setExistingCompany] = useState();
  const { titles } = useSelector((state) => state.myCv);

  const getAllData = async () => {
    try {
      dispatch(setLoading(true));
      await dispatch(getTitles());
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

  const getTitle = async (lastkeyy) => {
    try {
      const { payload } = await dispatch(
        getAllJobTitles({ lastKey: lastkeyy })
      );
      if (payload.status === "success") {
        setJobTitleCount(payload.count);
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
        job_title_id: deleteJob,
      };
      const { payload } = await dispatch(removeJobTitle(data));
      if (payload.status === "success") {
        setOpenDelete(false);
        setTableData([]);
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Job title removed successfully",
          })
        );
        await getTitle(0);
      }
    } catch (error) {}
  };

  const handleEditCompany = async () => {
    try {
      const data = {
        new_title_id: existingCompany !== undefined ? existingCompany : null,
        current_title_id: editableCompany,
        title: companyName !== "" ? companyName : "",
      };
      const { payload } = await dispatch(editJobTitle(data));
      if (payload.status === "success") {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Job title edited successfully",
          })
        );
        setOpenEdit(false);
        await getTitle(0);
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

  const handleAddNewJob = async () => {
    try {
      if (newJobTitle !== "") {
        const data = {
          title: newJobTitle,
        };
        const { payload } = await dispatch(addJobTitle(data));
        if (payload.status === "success") {
          setTableData([]);
          setNewJobTitle("");
          setOpenAdd(false);
          dispatch(
            setAlert({
              show: true,
              type: ALERT_TYPE.SUCCESS,
              msg: "Job title added successfully",
            })
          );
          await getTitle(0);
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

  const handleOpenDelete = (jobId) => {
    setOpenDelete((prevState) => !prevState);
    setDeleteJob(jobId);
  };
  const handleOpenApprove = (event, jobId) => {
    setOpenApprove((prevState) => !prevState);
    setApproveEvent(event);
    setJobID(jobId);
  };

  const handleOpenEdit = (currCompID, compName) => {
    setOpenEdit((prevState) => !prevState);
    setEditableCompany(currCompID);
    setcompanyName(compName);
    setExistingCompany("");
  };

  const handleOpenAdd = () => {
    setOpenAdd((prevState) => !prevState);
  };

  const handleCancel = () => {
    setOpenApprove(false);
  };

  const handleEdit = (event) => {
    if (event.target.id === "edit_input") {
      setExistingCompany(null);
      setcompanyName(event.target.value);
    } else if (event.target.id.includes("existing_name")) {
      let com = titles?.find(
        (title) => title.name === event.target.textContent
      );
      console.log(com);
      setcompanyName("");
      setExistingCompany(com.job_title_id);
    }
  };

  const getJobApproved = async (event, jobID) => {
    let approvedJobTitle = {
      job_title_id: jobID,
      flag: event.target.checked ? 1 : 0,
    };
    try {
      const { payload } = await dispatch(approveJobTitle(approvedJobTitle));
      if (payload?.status == "success") {
        event.target.checked &&
          dispatch(
            setAlert({
              show: true,
              type: ALERT_TYPE.SUCCESS,
              msg: "Job approved successfully!",
            })
          );
        setOpenApprove(false);
        await getTitle(0);
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
    setNewJobTitle(event.target.value);
  };

  useEffect(() => {
    getTitle(0);
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
        Job Title ({jobTitleCount})
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
          next={() => getTitle(lastKey)}
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
                        Job Title
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
                      <TableCell>{row?.job_title_id}</TableCell>
                      <TableCell>{row?.title}</TableCell>
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
                                handleOpenApprove(event, row?.job_title_id)
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
                                  handleOpenEdit(row?.job_title_id, row?.title)
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
                                onClick={() =>
                                  handleOpenDelete(row?.job_title_id)
                                }
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
        dialogText={"job title"}
      />
      <AddNew
        show={openAdd}
        handleOpen={handleOpenAdd}
        handleAdd={handleAddNewJob}
        handleNewJob={handleNewJob}
        newTitle={newJobTitle}
        dialogText={"job title"}
      />
      <Edit
        show={openEdit}
        handleOpen={handleOpenEdit}
        handleEdit={handleEditCompany}
        handleEditJob={handleEdit}
        companyName={companyName}
        existingCompany={existingCompany}
        data={titles}
      />
      <Approve
        dialogText={"job title"}
        show={openApprove}
        handleOpen={handleOpenApprove}
        handleCancel={handleCancel}
        handleApprove={getJobApproved}
        approveEvent={approveEvent}
        jobID={jobID}
      />
    </Box>
  );
}
