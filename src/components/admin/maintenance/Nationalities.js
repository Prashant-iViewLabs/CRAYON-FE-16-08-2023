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
  addNationality,
  approveNationality,
  editNationality,
  getAllNationality,
  removeNationalities,
} from "../../../redux/admin/maintenance";
import { dateConverterMonth } from "../../../utils/DateTime";
import DeleteIcon from "@mui/icons-material/Delete";
import { setAlert } from "../../../redux/configSlice";
import { ALERT_TYPE } from "../../../utils/Constants";
import AddNew from "./Dialogbox/AddNew";
import Delete from "./Dialogbox/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Edit from "./Dialogbox/Edit";
import Approve from "./Dialogbox/Approve";

export default function Nationalities() {
  const dispatch = useDispatch();
  const [lastKey, setLastKey] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [nationalityCount, setnationalityCount] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [deleteNationality, setDeleteNationality] = useState();
  const [newNationalityTitle, setNewNationalityTitle] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [editableNationality, setEditableNationality] = useState();
  const [nationalityName, setnationalityName] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const getNationalities = async (lastkeyy) => {
    try {
      const { payload } = await dispatch(
        getAllNationality({ lastKey: lastkeyy })
      );
      if (payload.status === "success") {
        setnationalityCount(payload.count);
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

  const removeNationality = async () => {
    try {
      const data = {
        nationality_id: deleteNationality,
      };
      const { payload } = await dispatch(removeNationalities(data));
      if (payload.status === "success") {
        setOpenDelete(false);
        setTableData([]);
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Nationality removed successfully",
          })
        );
        await getNationalities(0);
      }
    } catch (error) {}
  };

  const handleAddNewNationality = async () => {
    try {
      if (newNationalityTitle !== "") {
        const data = {
          title: newNationalityTitle,
        };
        const { payload } = await dispatch(addNationality(data));
        if (payload.status === "success") {
          setTableData([]);
          setNewNationalityTitle("");
          setOpenAdd(false);
          dispatch(
            setAlert({
              show: true,
              type: ALERT_TYPE.SUCCESS,
              msg: "Nationality added successfully",
            })
          );
          await getNationalities(0);
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
        nationality_id: editableNationality,
        title: nationalityName,
      };
      const { payload } = await dispatch(editNationality(data));
      if (payload.status === "success") {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Nationality edited successfully",
          })
        );
        setOpenEdit(false);
        await getNationalities(0);
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
    setDeleteNationality(jobId);
  };

  const handleCancelDelete = () => {
    setOpenDelete((prevState) => !prevState);
    setConfirmDelete(false);
  };

  const handleOpenAdd = () => {
    setOpenAdd((prevState) => !prevState);
  };

  const handleNewJob = (event) => {
    setNewNationalityTitle(event.target.value);
  };

  const handleOpenEdit = (currCompID, compName) => {
    setOpenEdit((prevState) => !prevState);
    setEditableNationality(currCompID);
    setnationalityName(compName);
  };

  const handleEdit = (event) => {
    setnationalityName(event.target.value);
  };

  useEffect(() => {
    getNationalities(0);
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
        Nationality ({nationalityCount})
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
          next={() => getNationalities(lastKey)}
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
                      <TableCell>{row?.nationality_id}</TableCell>
                      <TableCell>{row?.nationality}</TableCell>
                      <TableCell>
                        {dateConverterMonth(row.created_at)}
                      </TableCell>
                      <TableCell>
                        {dateConverterMonth(row.updated_at)}
                      </TableCell>
                      <TableCell>
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
                                  row?.nationality_id,
                                  row?.nationality
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
                                handleOpenDelete(row?.nationality_id)
                              }
                              sx={{ cursor: "pointer" }}
                            />
                          </IconButton>
                        </Tooltip>
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
        handleDelete={removeNationality}
        dialogText={"nationality"}
        handleCancel={handleCancelDelete}
        confirmDelete={confirmDelete}
        setConfirmDelete={setConfirmDelete}
      />
      <AddNew
        show={openAdd}
        handleOpen={handleOpenAdd}
        handleAdd={handleAddNewNationality}
        handleNewJob={handleNewJob}
        newTitle={newNationalityTitle}
        dialogText={"nationality"}
      />
      <Edit
        show={openEdit}
        handleOpen={handleOpenEdit}
        handleEdit={handleEditCompany}
        handleEditJob={handleEdit}
        inputName={nationalityName}
        dialogText={"nationality"}
        singleInput={true}
      />
    </Box>
  );
}
