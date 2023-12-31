import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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
  addQualificationType,
  editQualificationType,
  getAllQualificationType,
  removeQualificationType,
} from "../../../redux/admin/maintenance";
import { dateConverterMonth } from "../../../utils/DateTime";
import DeleteIcon from "@mui/icons-material/Delete";
import { setAlert } from "../../../redux/configSlice";
import { ALERT_TYPE } from "../../../utils/Constants";
import AddNew from "./Dialogbox/AddNew";
import Delete from "./Dialogbox/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddNewQualification from "./Dialogbox/AddNewQualification";
import EditQualificationType from "./Dialogbox/EditQualificationType";

export default function QualificationTypes() {
  const dispatch = useDispatch();

  const [lastKey, setLastKey] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [jobTitleCount, setJobTitleCount] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [deleteJob, setDeleteJob] = useState();
  const [newJobTitle, setNewJobTitle] = useState("");
  const [reference, setReference] = useState("");
  const [level, setLevel] = useState();
  const [openEdit, setOpenEdit] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [qualifiationTypeId, setQualifiationTypeId] = useState();

  const getTitles = async (lastkeyy) => {
    try {
      const { payload } = await dispatch(
        getAllQualificationType({ lastKey: lastkeyy })
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
        id: deleteJob,
      };
      const { payload } = await dispatch(removeQualificationType(data));
      if (payload.status === "success") {
        setOpenDelete(false);
        setTableData([]);
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Qualification type removed successfully",
          })
        );
        setConfirmDelete(false);
        await getTitles(0);
      }
    } catch (error) {}
  };

  const handleAddNewJob = async () => {
    try {
      if (newJobTitle.trim().length !== 0) {
        const data = {
          title: newJobTitle,
          level: level,
          reference: reference,
        };
        const { payload } = await dispatch(addQualificationType(data));
        if (payload.status === "success") {
          setTableData([]);
          setNewJobTitle("");
          setReference("");
          setLevel();
          setOpenAdd(false);
          dispatch(
            setAlert({
              show: true,
              type: ALERT_TYPE.SUCCESS,
              msg: "Qualification type added successfully",
            })
          );
          await getTitles(0);
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

  const handleEdit = async () => {
    try {
      const data = {
        reference: reference,
        title: newJobTitle,
        level: level,
        id: qualifiationTypeId,
      };
      const { payload } = await dispatch(editQualificationType(data));
      if (payload.status === "success") {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Qualification type edited successfully",
          })
        );
        setOpenEdit(false);
        await getTitles(0);
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

  const handleOpenAdd = () => {
    setOpenAdd((prevState) => !prevState);
    setNewJobTitle("");
    setReference("");
    setLevel("");
  };

  const handleOpenEdit = (id, name, reference, level) => {
    setOpenEdit((prevState) => !prevState);
    setQualifiationTypeId(id);
    setNewJobTitle(name);
    setReference(reference);
    setLevel(level);
  };

  const handleNewJob = (event) => {
    console.log(event.target.id);
    if (event.target.id === "typename") {
      setNewJobTitle(event.target.value);
    } else if (event.target.id === "reference") {
      setReference(event.target.value);
    } else if (event.target.id === "level") {
      setLevel(event.target.value);
    }
  };

  useEffect(() => {
    getTitles(0);
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
        Qualification Types ({jobTitleCount})
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
          next={() => getTitles(lastKey)}
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
                        Name
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Reference
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Level
                      </Typography>
                    </TableCell>
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
                      <TableCell>{row?.name}</TableCell>
                      <TableCell>{row?.reference}</TableCell>
                      <TableCell>{row?.level}</TableCell>
                      <TableCell>
                        {dateConverterMonth(row.created_at)}
                      </TableCell>
                      <TableCell>
                        {dateConverterMonth(row.updated_at)}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", gap: "8px" }}>
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
                                    row?.id,
                                    row?.name,
                                    row?.reference,
                                    row?.level
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
                                onClick={() => handleOpenDelete(row?.id)}
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
        dialogText={"qualification type"}
        handleCancel={handleCancelDelete}
        confirmDelete={confirmDelete}
        setConfirmDelete={setConfirmDelete}
      />
      <AddNewQualification
        show={openAdd}
        handleOpen={handleOpenAdd}
        handleAdd={handleAddNewJob}
        handleNewJob={handleNewJob}
        newTitle={newJobTitle}
        reference={reference}
        level={level}
        dialogText={"qualification type"}
      />
      <EditQualificationType
        show={openEdit}
        handleOpen={handleOpenEdit}
        handleAdd={handleEdit}
        handleNewJob={handleNewJob}
        newTitle={newJobTitle}
        reference={reference}
        level={level}
        dialogText={"qualification type"}
      />
    </Box>
  );
}
