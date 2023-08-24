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
  addInstitute,
  approveInstitute,
  editInstitute,
  getAllInstitute,
  removeInstitute,
} from "../../../redux/admin/maintenance";
import { dateConverterMonth } from "../../../utils/DateTime";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { setAlert, setLoading } from "../../../redux/configSlice";
import { ALERT_TYPE, ERROR_MSG } from "../../../utils/Constants";
import CustomDialog from "../../common/CustomDialog";
import { useTheme } from "@emotion/react";
import AddNew from "./Dialogbox/AddNew";
import Delete from "./Dialogbox/Delete";
import Edit from "./Dialogbox/Edit";
import Approve from "./Dialogbox/Approve";
import { getInstitute } from "../../../redux/candidate/myCvSlice";
import { useSelector } from "react-redux";
export default function Institution() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [lastKey, setLastKey] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [institutionCount, setinstitutionCount] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [openApprove, setOpenApprove] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [deleteInstitution, setDeleteInstitution] = useState();
  const [newInstitutionTitle, setNewInstitutionTitle] = useState("");
  const [institutionID, setinstitutionID] = useState();
  const [approveEvent, setApproveEvent] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editableInstitution, setEditableInstitution] = useState();
  const [institutionName, setinstitutionName] = useState("");
  const [existingInstitution, setExistingInstitution] = useState();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { institution } = useSelector((state) => state.myCv);

  const getAllData = async () => {
    try {
      dispatch(setLoading(true));
      await dispatch(getInstitute());
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

  const getInstituion = async (lastkeyy) => {
    try {
      const { payload } = await dispatch(
        getAllInstitute({ lastKey: lastkeyy })
      );
      if (payload.status === "success") {
        setinstitutionCount(payload.count);
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

  const removeInstitution = async () => {
    try {
      const data = {
        institution_id: deleteInstitution,
      };
      const { payload } = await dispatch(removeInstitute(data));
      if (payload.status === "success") {
        setOpenDelete(false);
        setTableData([]);
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Institution removed successfully",
          })
        );
        await getInstituion(0);
      }
    } catch (error) {}
  };

  const handleAddNewInstitution = async () => {
    try {
      if (newInstitutionTitle !== "") {
        const data = {
          title: newInstitutionTitle,
        };
        const { payload } = await dispatch(addInstitute(data));
        if (payload.status === "success") {
          setTableData([]);
          setNewInstitutionTitle("");
          setOpenAdd(false);
          dispatch(
            setAlert({
              show: true,
              type: ALERT_TYPE.SUCCESS,
              msg: "Institution added successfully",
            })
          );
          await getInstituion(0);
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

  const handleEditInstitution = async () => {
    try {
      const data = {
        new_institution_id:
          existingInstitution !== undefined ? existingInstitution : null,
        current_institution_id: editableInstitution,
        title: institutionName !== "" ? institutionName : "",
      };
      const { payload } = await dispatch(editInstitute(data));
      if (payload.status === "success") {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Institution edited successfully",
          })
        );
        setOpenEdit(false);
        await getInstituion(0);
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
    setDeleteInstitution(jobId);
  };

  const handleCancelDelete = () => {
    setOpenDelete((prevState) => !prevState);
    setConfirmDelete(false);
  };

  const handleOpenApprove = (event, jobId) => {
    setOpenApprove((prevState) => !prevState);
    setApproveEvent(event);
    setinstitutionID(jobId);
  };

  const handleOpenAdd = () => {
    setOpenAdd((prevState) => !prevState);
  };

  const handleOpenEdit = (currCompID, compName) => {
    setOpenEdit((prevState) => !prevState);
    setEditableInstitution(currCompID);
    setinstitutionName(compName);
    setExistingInstitution("");
  };

  const handleCancel = () => {
    setOpenApprove(false);
  };

  const handleEdit = (event) => {
    if (event.target.id === "edit_input") {
      setExistingInstitution(null);
      setinstitutionName(event.target.value);
    } else if (event.target.id.includes("existing_name")) {
      let com = institution?.find(
        (title) => title.name === event.target.textContent
      );
      console.log(com);
      setinstitutionName("");
      setExistingInstitution(com.job_title_id);
    }
  };

  const getInstitutionApproved = async (event, jobID) => {
    let approvedInstitute = {
      institution_id: jobID,
      flag: event.target.checked ? 0 : 1,
    };
    try {
      const { payload } = await dispatch(approveInstitute(approvedInstitute));
      if (payload?.status == "success") {
        event.target.checked &&
          dispatch(
            setAlert({
              show: true,
              type: ALERT_TYPE.SUCCESS,
              msg: "Institution approved successfully!",
            })
          );
        setOpenApprove(false);
        await getInstituion(0);
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
    setNewInstitutionTitle(event.target.value);
  };

  useEffect(() => {
    getInstituion(0);
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
        Instituiton ({institutionCount})
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
          next={() => getInstituion(lastKey)}
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
                      <TableCell>{row?.institution_id}</TableCell>
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
                                handleOpenApprove(event, row?.institution_id)
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
                                  handleOpenEdit(row?.institution_id, row?.name)
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
                                  handleOpenDelete(row?.institution_id)
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
        handleDelete={removeInstitution}
        dialogText={"instituiton"}
        handleCancel={handleCancelDelete}
        confirmDelete={confirmDelete}
        setConfirmDelete={setConfirmDelete}
      />
      <AddNew
        show={openAdd}
        handleOpen={handleOpenAdd}
        handleAdd={handleAddNewInstitution}
        handleNewJob={handleNewJob}
        newTitle={newInstitutionTitle}
        dialogText={"instituiton"}
      />
      <Edit
        show={openEdit}
        handleOpen={handleOpenEdit}
        handleEdit={handleEditInstitution}
        handleEditJob={handleEdit}
        inputName={institutionName}
        existingCompany={existingInstitution}
        data={institution}
        dialogText={"institution"}
      />
      <Approve
        dialogText={"institution"}
        show={openApprove}
        handleOpen={handleOpenApprove}
        handleCancel={handleCancel}
        handleApprove={getInstitutionApproved}
        approveEvent={approveEvent}
        jobID={institutionID}
      />
    </Box>
  );
}
