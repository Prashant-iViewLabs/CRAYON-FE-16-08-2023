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
  addNewQualification,
  approveQualification,
  editQualification,
  getAllQualification,
  removeQualification,
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
import { getRequiredQualification } from "../../../redux/employer/postJobSlice";
import {
  getQualification,
  getTypeQualificationValue,
} from "../../../redux/candidate/myCvSlice";
import EditNewQualification from "./Dialogbox/EditNewQualification";
import { useSelector } from "react-redux";
export default function Qualification() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [lastKey, setLastKey] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [qualCount, setQualCount] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteJob, setDeleteJob] = useState();
  const [qualifications, setQualifications] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [newQualification, setNewQualification] = useState("");
  const [openApprove, setOpenApprove] = useState(false);
  const [jobID, setJobID] = useState();
  const [approveEvent, setApproveEvent] = useState(false);
  const [qualificationValue, setQualificationValue] = useState(0);
  const [openEdit, setOpenEdit] = useState(false);
  const [currQualification, setCurrQualification] = useState("");
  const [currQualificationType, setCurrQualificationType] = useState(0);
  const [currQualificationID, setCurrQualificationID] = useState(0);
  const [existingQualification, setExistingQualification] = useState();
  const [existingQualificationType, setExistingQualificationType] = useState(0);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { qualification } = useSelector((state) => state.myCv);

  const getQualifications = async (lastkeyy) => {
    try {
      const { payload } = await dispatch(
        getAllQualification({ lastKey: lastkeyy })
      );
      if (payload.status === "success") {
        setQualCount(payload.count);
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

  const removeQual = async () => {
    try {
      const data = {
        qualification_id: deleteJob,
      };
      const { payload } = await dispatch(removeQualification(data));
      if (payload.status === "success") {
        setTableData([]);
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Qualification removed successfully",
          })
        );
        setOpenDelete(false);
        setConfirmDelete(false);
        await getQualifications(0);
        await getAllData();
      }
    } catch (error) {}
  };

  const handleAddNewQual = async (qualId) => {
    try {
      if (qualifications.trim().length !== 0) {
        const data = {
          title: qualifications,
          qualification_type_id: qualId,
        };
        const { payload } = await dispatch(addNewQualification(data));
        if (payload.status === "success") {
          setQualifications("");
          setTableData([]);
          dispatch(
            setAlert({
              show: true,
              type: ALERT_TYPE.SUCCESS,
              msg: "Qualification added successfully",
            })
          );
          setOpenAdd(false);
          await getQualifications(0);
          await getAllData();
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

  const handleEdit = async () => {
    try {
      console.log(
        currQualification,
        currQualificationID,
        currQualificationType,
        existingQualification,
        existingQualificationType
      );
      const data = {
        new_qualification_id:
          existingQualification !== null ? existingQualification : null,
        current_qualification_id: currQualificationID,
        title: currQualification !== "" ? currQualification : "",
        qualification_type_id:
          currQualificationType !== undefined
            ? currQualificationType
            : existingQualificationType,
      };
      const { payload } = await dispatch(editQualification(data));
      if (payload.status === "success") {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Qualification edited successfully",
          })
        );
        setOpenEdit(false);
        await getQualifications(0);
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
    setDeleteJob(jobId);
  };

  const handleCancelDelete = () => {
    setOpenDelete((prevState) => !prevState);
    setConfirmDelete(false);
  };

  const handleOpenEdit = (qualID, qualName, qualType) => {
    setOpenEdit((prevState) => !prevState);
    setCurrQualificationID(qualID);
    setCurrQualification(qualName);
    setCurrQualificationType(qualType);
    setQualificationValue(0);
    setExistingQualification("");
  };

  const handleEditQual = (event) => {
    console.log(event);
    if (event.target.id === "current_qualification") {
      setExistingQualification(null);
      setExistingQualificationType();
      setCurrQualification(event.target.value);
    } else if (event.target.name === "required_qualification_id") {
      setExistingQualification(null);
      setExistingQualificationType();
      setCurrQualificationType(event.target.value);
    } else if (event.target.name === "existing_required_qualification_id") {
      setCurrQualification("");
      setCurrQualificationType();
      setExistingQualificationType(event.target.value);
    } else if (event.target.id.includes("qualification_id")) {
      let com = qualification?.find(
        (title) => title.name === event.target.textContent
      );
      console.log(com);
      setCurrQualification("");
      setCurrQualificationType();
      setExistingQualification(com.qualification_id);
    }
  };

  const getQualificaitonApproved = async (event, jobID) => {
    let approvedJobTitle = {
      qualification_id: jobID,
      flag: event.target.checked ? 0 : 1,
    };
    try {
      const { payload } = await dispatch(
        approveQualification(approvedJobTitle)
      );
      if (payload?.status == "success") {
        event.target.checked &&
          dispatch(
            setAlert({
              show: true,
              type: ALERT_TYPE.SUCCESS,
              msg: "Qualification approved successfully!",
            })
          );
        setOpenApprove(false);
        await getQualifications(0);
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

  const handleNewQual = (event) => {
    setQualifications(event.target.value);
  };

  const handleOpenAdd = () => {
    setOpenAdd((prevState) => !prevState);
    setQualificationValue(0);
  };

  const handleOpenApprove = (event, jobId) => {
    console.log(event, jobId);
    setOpenApprove((prevState) => !prevState);
    setApproveEvent(event);
    setJobID(jobId);
  };

  const getAllData = async () => {
    try {
      dispatch(setLoading(true));
      await Promise.all([
        dispatch(getQualification()),
        dispatch(getTypeQualificationValue()),
      ]);
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

  const handleCancel = () => {
    setOpenApprove(false);
  };

  useEffect(() => {
    getQualifications(0);
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
        Qualification ({qualCount})
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
          next={() => getQualifications(lastKey)}
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
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Qualification Type
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
                      <TableCell>{row?.qualification_id}</TableCell>
                      <TableCell>{row?.name}</TableCell>
                      <TableCell>{row?.qualification_type?.name}</TableCell>
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
                                handleOpenApprove(event, row?.qualification_id)
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
                                  handleOpenEdit(
                                    row?.qualification_id,
                                    row?.name,
                                    row?.qualification_type_id
                                  )
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
                                  handleOpenDelete(row?.qualification_id)
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
        handleDelete={removeQual}
        dialogText={"qualification"}
        handleCancel={handleCancelDelete}
        confirmDelete={confirmDelete}
        setConfirmDelete={setConfirmDelete}
      />
      <AddNew
        show={openAdd}
        handleOpen={handleOpenAdd}
        handleAdd={handleAddNewQual}
        handleNewJob={handleNewQual}
        newTitle={qualifications}
        name={"qualification"}
        setValue={setQualificationValue}
        value={qualificationValue}
        dialogText={"qualification"}
      />
      <EditNewQualification
        show={openEdit}
        handleOpen={handleOpenEdit}
        currQualification={currQualification}
        currQualificationType={currQualificationType}
        handleEditQual={handleEditQual}
        handleEdit={handleEdit}
        existingQualification={existingQualification}
        existingQualificationType={existingQualificationType}
      />
      <Approve
        dialogText={"qualification"}
        show={openApprove}
        handleOpen={handleOpenApprove}
        handleCancel={handleCancel}
        handleApprove={getQualificaitonApproved}
        approveEvent={approveEvent}
        jobID={jobID}
      />
    </Box>
  );
}
