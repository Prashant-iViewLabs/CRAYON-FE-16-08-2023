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
  addSchool,
  approveSchool,
  editSchool,
  getAllSchools,
  removeSchool,
} from "../../../redux/admin/maintenance";
import { dateConverterMonth } from "../../../utils/DateTime";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { setAlert, setLoading } from "../../../redux/configSlice";
import { ALERT_TYPE, ERROR_MSG } from "../../../utils/Constants";
import AddNew from "./Dialogbox/AddNew";
import Delete from "./Dialogbox/Delete";
import Edit from "./Dialogbox/Edit";
import Approve from "./Dialogbox/Approve";
import { getSchool } from "../../../redux/candidate/myCvSlice";
import { useSelector } from "react-redux";

export default function Schools() {
  const dispatch = useDispatch();
  const [lastKey, setLastKey] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [schoolCount, setschoolCount] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [openApprove, setOpenApprove] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [deleteSchool, setDeleteSchool] = useState();
  const [newSchoolTitle, setNewSchoolTitle] = useState("");
  const [schoolID, setschoolID] = useState();
  const [approveEvent, setApproveEvent] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editableSchool, setEditableSchool] = useState();
  const [schoolName, setschoolName] = useState("");
  const [existingSchool, setExistingSchool] = useState();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { school } = useSelector((state) => state.myCv);

  const getAllData = async () => {
    try {
      dispatch(setLoading(true));
      await dispatch(getSchool());
      dispatch(setLoading(false));
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

  const getSchools = async (lastkeyy) => {
    try {
      const { payload } = await dispatch(getAllSchools({ lastKey: lastkeyy }));
      if (payload.status === "success") {
        setschoolCount(payload.count);
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

  const removeSchools = async () => {
    try {
      const data = {
        school_id: deleteSchool,
      };
      const { payload } = await dispatch(removeSchool(data));
      if (payload.status === "success") {
        setOpenDelete(false);
        setTableData([]);
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "School removed successfully",
          })
        );
        setConfirmDelete(false);
        await getSchools(0);
        await getAllData();
      }
    } catch (error) {}
  };

  const handleAddNewSchool = async () => {
    try {
      if (newSchoolTitle.trim().length !== 0) {
        const data = {
          title: newSchoolTitle,
        };
        const { payload } = await dispatch(addSchool(data));
        if (payload.status === "success") {
          setTableData([]);
          setNewSchoolTitle("");
          setOpenAdd(false);
          dispatch(
            setAlert({
              show: true,
              type: ALERT_TYPE.SUCCESS,
              msg: "School added successfully",
            })
          );
          await getSchools(0);
          await getAllData();
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

  const handleEditCompany = async () => {
    try {
      const data = {
        new_school_id: existingSchool !== undefined ? existingSchool : null,
        current_school_id: editableSchool,
        title: schoolName !== "" ? schoolName : "",
      };
      const { payload } = await dispatch(editSchool(data));
      if (payload.status === "success") {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "School edited successfully",
          })
        );
        setOpenEdit(false);
        await getSchools(0);
        await getAllData();
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

  const handleOpenDelete = (jobId) => {
    setOpenDelete((prevState) => !prevState);
    setDeleteSchool(jobId);
  };

  const handleCancelDelete = () => {
    setOpenDelete((prevState) => !prevState);
    setConfirmDelete(false);
  };

  const handleOpenApprove = (event, jobId) => {
    setOpenApprove((prevState) => !prevState);
    setApproveEvent(event);
    setschoolID(jobId);
  };

  const handleOpenAdd = () => {
    setOpenAdd((prevState) => !prevState);
  };

  const handleOpenEdit = (currCompID, compName) => {
    setOpenEdit((prevState) => !prevState);
    setEditableSchool(currCompID);
    setschoolName(compName);
    setExistingSchool("");
  };

  const handleCancel = () => {
    setOpenApprove(false);
  };

  const handleEdit = (event) => {
    if (event.target.id === "edit_input") {
      setExistingSchool(null);
      setschoolName(event.target.value);
    } else if (event.target.id.includes("existing_name")) {
      let com = school?.find(
        (title) => title.name === event.target.textContent
      );
      console.log(com);
      setschoolName("");
      setExistingSchool(com.school_id);
    }
  };

  const getSchoolApproved = async (event, jobID) => {
    let approvedInstitute = {
      school_id: jobID,
      flag: event.target.checked ? 0 : 1,
    };
    try {
      const { payload } = await dispatch(approveSchool(approvedInstitute));
      if (payload?.status === "success") {
        event.target.checked &&
          dispatch(
            setAlert({
              show: true,
              type: ALERT_TYPE.SUCCESS,
              msg: "School approved successfully!",
            })
          );
        setOpenApprove(false);
        await getSchools(0);
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
    setNewSchoolTitle(event.target.value);
  };

  useEffect(() => {
    getSchools(0);
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
        Schools ({schoolCount})
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
          next={() => getSchools(lastKey)}
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
                      <TableCell>{row?.school_id}</TableCell>
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
                                handleOpenApprove(event, row?.school_id)
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
                                  handleOpenEdit(row?.school_id, row?.name)
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
                                onClick={() => handleOpenDelete(row?.school_id)}
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
        handleDelete={removeSchools}
        dialogText={"school"}
        handleCancel={handleCancelDelete}
        confirmDelete={confirmDelete}
        setConfirmDelete={setConfirmDelete}
      />
      <AddNew
        show={openAdd}
        handleOpen={handleOpenAdd}
        handleAdd={handleAddNewSchool}
        handleNewJob={handleNewJob}
        newTitle={newSchoolTitle}
        dialogText={"school"}
      />
      <Edit
        show={openEdit}
        handleOpen={handleOpenEdit}
        handleEdit={handleEditCompany}
        handleEditJob={handleEdit}
        inputName={schoolName}
        existingCompany={existingSchool}
        data={school}
        dialogText={"school"}
      />
      <Approve
        dialogText={"school"}
        show={openApprove}
        handleOpen={handleOpenApprove}
        handleCancel={handleCancel}
        handleApprove={getSchoolApproved}
        approveEvent={approveEvent}
        jobID={schoolID}
      />
    </Box>
  );
}
