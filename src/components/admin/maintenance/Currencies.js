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
  addCurrencies,
  editCurrency,
  getAllCurrencies,
  removeCurrencies,
} from "../../../redux/admin/maintenance";
import { dateConverterMonth } from "../../../utils/DateTime";
import DeleteIcon from "@mui/icons-material/Delete";
import { setAlert } from "../../../redux/configSlice";
import { ALERT_TYPE } from "../../../utils/Constants";
import AddNew from "./Dialogbox/AddNew";
import Delete from "./Dialogbox/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddNewCurrency from "./Dialogbox/AddNewCurrency";
import EditCurrency from "./Dialogbox/EditCurrency";

export default function Currencies() {
  const dispatch = useDispatch();
  const [lastKey, setLastKey] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [jobTitleCount, setJobTitleCount] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [deleteJob, setDeleteJob] = useState();
  const [currencyTitle, setcurrencyTitle] = useState("");
  const [currencyName, setCurrencyName] = useState("");
  const [minSalary, setMinSalary] = useState();
  const [maxSalary, setMaxSalary] = useState();
  const [minRate, setMinRate] = useState();
  const [maxRate, setMaxRate] = useState();
  const [currencyID, setCurrencyID] = useState();
  const [openEdit, setOpenEdit] = useState(false);

  const getTitles = async (lastkeyy) => {
    try {
      const { payload } = await dispatch(
        getAllCurrencies({ lastKey: lastkeyy })
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
        currency_id: deleteJob,
      };
      const { payload } = await dispatch(removeCurrencies(data));
      if (payload.status === "success") {
        setOpenDelete(false);
        setTableData([]);
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Currency removed successfully",
          })
        );
        await getTitles(0);
      }
    } catch (error) {}
  };

  const handleAddNewJob = async () => {
    try {
      if (currencyTitle !== "") {
        const data = {
          title: currencyTitle,
          min_salary: minSalary,
          max_salary: maxSalary,
          min_rate: minRate,
          max_rate: maxRate,
          currency: currencyName,
          symbol: "$",
        };
        const { payload } = await dispatch(addCurrencies(data));
        if (payload.status === "success") {
          setTableData([]);
          setcurrencyTitle("");
          setCurrencyName("");
          setMinSalary();
          setMaxSalary();
          setMinRate();
          setMaxRate();
          setOpenAdd(false);
          dispatch(
            setAlert({
              show: true,
              type: ALERT_TYPE.SUCCESS,
              msg: "Currency added successfully",
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

  const handleEditCurrency = async () => {
    try {
      if (currencyTitle !== "") {
        const data = {
          currency_id: currencyID,
          title: currencyTitle,
          min_salary: minSalary,
          max_salary: maxSalary,
          min_rate: minRate,
          max_rate: maxRate,
          currency: currencyName,
          symbol: "$",
        };
        const { payload } = await dispatch(editCurrency(data));
        if (payload.status === "success") {
          dispatch(
            setAlert({
              show: true,
              type: ALERT_TYPE.SUCCESS,
              msg: "Currency added successfully",
            })
          );
          setOpenEdit(false);
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

  const handleOpenDelete = (jobId) => {
    setOpenDelete((prevState) => !prevState);
    setDeleteJob(jobId);
  };

  const handleOpenAdd = () => {
    setOpenAdd((prevState) => !prevState);
    setcurrencyTitle("");
    setCurrencyName("");
    setMinSalary("");
    setMaxSalary("");
    setMinRate("");
    setMaxRate("");
  };

  const handleOpenEdit = (currID, currency, title, minSalary, minRate) => {
    setOpenEdit((prevState) => !prevState);
    setCurrencyID(currID);
    setcurrencyTitle(title);
    setCurrencyName(currency);
    setMinSalary(minSalary);
    setMinRate(minRate);
  };

  const handleNewJob = (event) => {
    if (event.target.id === "currencyTitle") {
      setcurrencyTitle(event.target.value);
    } else if (event.target.id === "currencyName") {
      setCurrencyName(event.target.value);
    } else if (event.target.id === "minSalary") {
      setMinSalary(event.target.value);
    } else if (event.target.id === "maxSalary") {
      setMaxSalary(event.target.value);
    } else if (event.target.id === "minRate") {
      setMinRate(event.target.value);
    } else if (event.target.id === "maxRate") {
      setMaxRate(event.target.value);
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
        Currencies ({jobTitleCount})
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
                        Symbol
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Name
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Title
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Min Salary
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Min Rate
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
                      <TableCell>{row?.currency_id}</TableCell>
                      <TableCell>{row?.symbol}</TableCell>
                      <TableCell>{row?.currency}</TableCell>
                      <TableCell>{row?.title}</TableCell>
                      <TableCell>{row?.min_salary}</TableCell>
                      <TableCell>{row?.min_rate}</TableCell>
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
                                  row?.currency_id,
                                  row?.currency,
                                  row?.title,
                                  row?.min_salary,
                                  row?.min_rate
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
                              onClick={() => handleOpenDelete(row?.currency_id)}
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
        handleDelete={removeTitle}
        dialogText={"currency"}
      />
      <AddNewCurrency
        show={openAdd}
        handleOpen={handleOpenAdd}
        handleAdd={handleAddNewJob}
        handleNewJob={handleNewJob}
        newTitle={currencyTitle}
        currencyName={currencyName}
        minSalary={minSalary}
        maxSalary={maxSalary}
        minRate={minRate}
        maxRate={maxRate}
        dialogText={"currency"}
      />

      <EditCurrency
        show={openEdit}
        handleOpen={handleOpenEdit}
        handleAdd={handleEditCurrency}
        handleNewJob={handleNewJob}
        newTitle={currencyTitle}
        currencyName={currencyName}
        minSalary={minSalary}
        maxSalary={maxSalary}
        minRate={minRate}
        maxRate={maxRate}
        dialogText={"currency"}
      />
    </Box>
  );
}
