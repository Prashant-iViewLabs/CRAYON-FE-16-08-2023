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
  addAssociation,
  addTown,
  approveAssociation,
  editTown,
  getAllAssociations,
  getAllTowns,
  removeAssociation,
  removeTown,
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
import { getCountry } from "../../../redux/employer/postJobSlice";
import EditTown from "./Dialogbox/EditTown";
export default function Towns() {
  const dispatch = useDispatch();
  const [lastKey, setLastKey] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [townsCount, settownsCount] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [deleteTowns, setDeleteTowns] = useState();
  const [newTownTitle, setNewTownTitle] = useState("");
  const [countryValue, setCountryValue] = useState(0);
  const [openEdit, setOpenEdit] = useState(false);
  const [currQualification, setCurrQualification] = useState("");
  const [currQualificationType, setCurrQualificationType] = useState(0);
  const [currQualificationID, setCurrQualificationID] = useState(0);

  const getTowns = async (lastkeyy) => {
    try {
      const { payload } = await dispatch(getAllTowns({ lastKey: lastkeyy }));
      if (payload.status === "success") {
        settownsCount(payload.count);
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

  const removeTowns = async () => {
    try {
      const data = {
        town_id: deleteTowns,
      };
      const { payload } = await dispatch(removeTown(data));
      if (payload.status === "success") {
        setOpenDelete(false);
        setTableData([]);
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Town removed successfully",
          })
        );
        await getTowns(0);
      }
    } catch (error) {}
  };

  const handleAddNewTowns = async (regionID) => {
    try {
      if (newTownTitle !== "") {
        const data = {
          title: newTownTitle,
          region_id: regionID,
        };
        const { payload } = await dispatch(addTown(data));
        if (payload.status === "success") {
          setTableData([]);
          setNewTownTitle("");
          setOpenAdd(false);
          dispatch(
            setAlert({
              show: true,
              type: ALERT_TYPE.SUCCESS,
              msg: "Town added successfully",
            })
          );
          await getTowns(0);
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
      console.log(
        currQualification,
        currQualificationID,
        currQualificationType
      );
      const data = {
        town_id: currQualificationID,
        title: currQualification !== "" ? currQualification : "",
        region_id: currQualificationType,
      };
      const { payload } = await dispatch(editTown(data));
      if (payload.status === "success") {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Town edited successfully",
          })
        );
        setOpenEdit(false);
        await getTowns(0);
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

  const handleEditQual = (event) => {
    console.log(event);
    if (event.target.id === "current_town") {
      setCurrQualification(event.target.value);
    } else if (event.target.name === "required_region_id") {
      setCurrQualificationType(event.target.value);
    }
  };

  const handleOpenDelete = (jobId) => {
    setOpenDelete((prevState) => !prevState);
    setDeleteTowns(jobId);
  };

  const handleOpenAdd = () => {
    setOpenAdd((prevState) => !prevState);
    setCountryValue(0);
  };

  const handleNewJob = (event) => {
    setNewTownTitle(event.target.value);
  };

  const handleOpenEdit = (qualID, qualName, qualType) => {
    setOpenEdit((prevState) => !prevState);
    setCurrQualificationID(qualID);
    setCurrQualification(qualName);
    setCurrQualificationType(qualType);
  };

  const getAllData = async () => {
    try {
      dispatch(setLoading(true));
      await dispatch(getCountry());
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

  useEffect(() => {
    getTowns(0);
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
        Towns ({townsCount})
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
          next={() => getTowns(lastKey)}
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
                        Country
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
                      <TableCell>{row?.name}</TableCell>
                      <TableCell>{row?.region?.name}</TableCell>
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
                                    row?.town_id,
                                    row?.name,
                                    row?.region_id
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
                                onClick={() => handleOpenDelete(row?.town_id)}
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
        handleDelete={removeTowns}
        dialogText={"town"}
      />
      <AddNew
        show={openAdd}
        handleOpen={handleOpenAdd}
        handleAdd={handleAddNewTowns}
        handleNewJob={handleNewJob}
        newTitle={newTownTitle}
        name={"town"}
        setValue={setCountryValue}
        value={countryValue}
        dialogText={"town"}
      />
      <EditTown
        show={openEdit}
        handleOpen={handleOpenEdit}
        currQualification={currQualification}
        currQualificationType={currQualificationType}
        handleEditQual={handleEditQual}
        handleEdit={handleEdit}
      />
    </Box>
  );
}
