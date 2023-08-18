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
  editIndustry,
  getAllIndustry,
  removeIndustry,
} from "../../../redux/admin/maintenance";
import { dateConverterMonth } from "../../../utils/DateTime";
import DeleteIcon from "@mui/icons-material/Delete";
import { setAlert } from "../../../redux/configSlice";
import { ALERT_TYPE } from "../../../utils/Constants";
import Delete from "./Dialogbox/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Edit from "./Dialogbox/Edit";

export default function Industries() {
  const dispatch = useDispatch();
  const [lastKey, setLastKey] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [industryCount, setindustryCount] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteJob, setDeleteJob] = useState();
  const [openEdit, setOpenEdit] = useState(false);
  const [editableIndustry, setEditableIndustry] = useState();
  const [industryName, setindustryName] = useState("");

  const getindustry = async (lastkeyy) => {
    try {
      const { payload } = await dispatch(getAllIndustry({ lastKey: lastkeyy }));
      if (payload.status === "success") {
        setindustryCount(payload.count);
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

  const removeindustry = async () => {
    try {
      const data = {
        job_title_id: deleteJob,
      };
      const { payload } = await dispatch(removeIndustry(data));
      if (payload.status === "success") {
        setOpenDelete(false);
        setTableData([]);
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Industry removed successfully",
          })
        );
        await getindustry(0);
      }
    } catch (error) {}
  };

  const handleEditIndustry = async () => {
    try {
      const data = {
        industry_id: editableIndustry,
        title: industryName,
      };
      const { payload } = await dispatch(editIndustry(data));
      if (payload.status === "success") {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Nationality edited successfully",
          })
        );
        setOpenEdit(false);
        await getindustry(0);
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

  const handleEdit = (event) => {
    setindustryName(event.target.value);
  };

  const handleOpenDelete = (jobId) => {
    setOpenDelete((prevState) => !prevState);
    setDeleteJob(jobId);
  };

  const handleOpenEdit = (currCompID, compName) => {
    setOpenEdit((prevState) => !prevState);
    setEditableIndustry(currCompID);
    setindustryName(compName);
  };

  useEffect(() => {
    getindustry(0);
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
        Industries ({industryCount})
      </Typography>

      {/*<Box sx={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <Button variant="contained" color="redButton" onClick={handleOpenAdd}>
          Add
        </Button>
        <Button variant="contained" color="redButton" onClick={handleOpenAdd}>
          Edit
        </Button>
      </Box>*/}

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
          next={() => getindustry(lastKey)}
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
                      <TableCell>{row?.industry_id}</TableCell>
                      <TableCell>{row?.name}</TableCell>
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
                                handleOpenEdit(row?.industry_id, row?.name)
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
        handleDelete={removeindustry}
        dialogText={"industry"}
      />

      <Edit
        show={openEdit}
        handleOpen={handleOpenEdit}
        handleEdit={handleEditIndustry}
        handleEditJob={handleEdit}
        inputName={industryName}
        dialogText={"industry"}
        singleInput={true}
      />
    </Box>
  );
}
