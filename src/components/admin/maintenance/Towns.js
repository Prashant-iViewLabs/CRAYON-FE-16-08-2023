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
  getAllAssociations,
  getAllTowns,
  removeAssociation,
  removeTown,
} from "../../../redux/admin/maintenance";
import { dateConverterMonth } from "../../../utils/DateTime";
import DeleteIcon from "@mui/icons-material/Delete";
import { setAlert, setLoading } from "../../../redux/configSlice";
import { ALERT_TYPE, ERROR_MSG } from "../../../utils/Constants";
import AddNew from "./Dialogbox/AddNew";
import Delete from "./Dialogbox/Delete";
import Edit from "./Dialogbox/Edit";
import Approve from "./Dialogbox/Approve";
import { getCountry } from "../../../redux/employer/postJobSlice";
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
      {/*<Edit
            show={openAdd}
            handleOpen={handleOpenAdd}
            handleEdit={handleAddNewTowns}
            handleEditJob={handleNewJob}
            editJobTitle={newTownTitle}
          />*/}
    </Box>
  );
}
