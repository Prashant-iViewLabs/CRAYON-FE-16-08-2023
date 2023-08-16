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
  addLanguages,
  addNationality,
  approveLanguages,
  approveNationality,
  getAllLanguages,
  getAllNationality,
  removeLanguages,
  removeNationalities,
} from "../../../redux/admin/maintenance";
import { dateConverterMonth } from "../../../utils/DateTime";
import DeleteIcon from "@mui/icons-material/Delete";
import { setAlert } from "../../../redux/configSlice";
import { ALERT_TYPE } from "../../../utils/Constants";
import AddNew from "./Dialogbox/AddNew";
import Delete from "./Dialogbox/Delete";
import Edit from "./Dialogbox/Edit";
import Approve from "./Dialogbox/Approve";

export default function Languages() {
  const dispatch = useDispatch();
  const [lastKey, setLastKey] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [languageCount, setlanguageCount] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [deleteLanguage, setDeleteLanguage] = useState();
  const [newLanguageTitle, setNewLanguageTitle] = useState("");

  const getLanguages = async (lastkeyy) => {
    try {
      const { payload } = await dispatch(
        getAllLanguages({ lastKey: lastkeyy })
      );
      if (payload.status === "success") {
        setlanguageCount(payload.count);
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

  const removeLanguage = async () => {
    try {
      const data = {
        language_id: deleteLanguage,
      };
      const { payload } = await dispatch(removeLanguages(data));
      if (payload.status === "success") {
        setOpenDelete(false);
        setTableData([]);
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Language removed successfully",
          })
        );
        await getLanguages(0);
      }
    } catch (error) {}
  };

  const handleAddNewLanguage = async () => {
    try {
      if (newLanguageTitle !== "") {
        const data = {
          title: newLanguageTitle,
        };
        const { payload } = await dispatch(addLanguages(data));
        if (payload.status === "success") {
          setTableData([]);
          setNewLanguageTitle("");
          setOpenAdd(false);
          dispatch(
            setAlert({
              show: true,
              type: ALERT_TYPE.SUCCESS,
              msg: "Language added successfully",
            })
          );
          await getLanguages(0);
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
    setDeleteLanguage(jobId);
  };

  const handleOpenAdd = () => {
    setOpenAdd((prevState) => !prevState);
    setNewLanguageTitle("");
  };

  const handleNewJob = (event) => {
    setNewLanguageTitle(event.target.value);
  };

  useEffect(() => {
    getLanguages(0);
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
        Languages ({languageCount})
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
          next={() => getLanguages(lastKey)}
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
                      <TableCell>{row?.language_id}</TableCell>
                      <TableCell>{row?.language}</TableCell>
                      <TableCell>
                        {dateConverterMonth(row.created_at)}
                      </TableCell>
                      <TableCell>
                        {dateConverterMonth(row.updated_at)}
                      </TableCell>
                      <TableCell>
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
                              onClick={() => handleOpenDelete(row?.language_id)}
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
        handleDelete={removeLanguage}
        dialogText={"language"}
      />
      <AddNew
        show={openAdd}
        handleOpen={handleOpenAdd}
        handleAdd={handleAddNewLanguage}
        handleNewJob={handleNewJob}
        newTitle={newLanguageTitle}
        dialogText={"language"}
      />
      {/*<Edit
              show={openAdd}
              handleOpen={handleOpenAdd}
              handleEdit={handleAddNewLanguage}
              handleEditJob={handleNewJob}
              editJobTitle={newLanguageTitle}
            />*/}
    </Box>
  );
}
