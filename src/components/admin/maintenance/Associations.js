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
  approveAssociation,
  getAllAssociations,
  removeAssociation,
} from "../../../redux/admin/maintenance";
import { dateConverterMonth } from "../../../utils/DateTime";
import DeleteIcon from "@mui/icons-material/Delete";
import { setAlert } from "../../../redux/configSlice";
import { ALERT_TYPE } from "../../../utils/Constants";
import AddNew from "./Dialogbox/AddNew";
import Delete from "./Dialogbox/Delete";
import Edit from "./Dialogbox/Edit";
import Approve from "./Dialogbox/Approve";

export default function Associations() {
  const dispatch = useDispatch();
  const [lastKey, setLastKey] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [associationCount, setassociationCount] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [openApprove, setOpenApprove] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [deleteAssociation, setDeleteAssociation] = useState();
  const [newAssociationTitle, setNewAssociationTitle] = useState("");
  const [associationID, setassociationID] = useState();
  const [approveEvent, setApproveEvent] = useState(false);

  const getAssociations = async (lastkeyy) => {
    try {
      const { payload } = await dispatch(
        getAllAssociations({ lastKey: lastkeyy })
      );
      if (payload.status === "success") {
        setassociationCount(payload.count);
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

  const removeAssociations = async () => {
    try {
      const data = {
        association_id: deleteAssociation,
      };
      const { payload } = await dispatch(removeAssociation(data));
      if (payload.status === "success") {
        setOpenDelete(false);
        setTableData([]);
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Association removed successfully",
          })
        );
        await getAssociations(0);
      }
    } catch (error) {}
  };

  const handleAddNewAssociation = async () => {
    try {
      if (newAssociationTitle !== "") {
        const data = {
          title: newAssociationTitle,
        };
        const { payload } = await dispatch(addAssociation(data));
        if (payload.status === "success") {
          setTableData([]);
          setNewAssociationTitle("");
          setOpenAdd(false);
          dispatch(
            setAlert({
              show: true,
              type: ALERT_TYPE.SUCCESS,
              msg: "Association added successfully",
            })
          );
          await getAssociations(0);
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
    setDeleteAssociation(jobId);
  };
  const handleOpenApprove = (event, jobId) => {
    setOpenApprove((prevState) => !prevState);
    setApproveEvent(event);
    setassociationID(jobId);
  };

  const handleOpenAdd = () => {
    setOpenAdd((prevState) => !prevState);
  };

  const handleCancel = () => {
    setOpenApprove(false);
  };

  const getAssociationApproved = async (event, jobID) => {
    let approvedJobTitle = {
      association_id: jobID,
      flag: event.target.checked ? 1 : 0,
    };
    try {
      const { payload } = await dispatch(approveAssociation(approvedJobTitle));
      if (payload?.status === "success") {
        event.target.checked &&
          dispatch(
            setAlert({
              show: true,
              type: ALERT_TYPE.SUCCESS,
              msg: "Association approved successfully!",
            })
          );
        setOpenApprove(false);
        await getAssociations(0);
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
    setNewAssociationTitle(event.target.value);
  };

  useEffect(() => {
    getAssociations(0);
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
        Associations ({associationCount})
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <Button variant="contained" color="redButton" onClick={handleOpenAdd}>
          Add
        </Button>
        {/*<Button variant="contained" color="redButton" onClick={handleOpenAdd}>
          Edit
        </Button>*/}
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
          next={() => getAssociations(lastKey)}
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
                      <TableCell>{row?.association_id}</TableCell>
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
                              defaultChecked={row.approved}
                              onClick={(event) =>
                                handleOpenApprove(event, row?.association_id)
                              }
                            />
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
                                  handleOpenDelete(row?.association_id)
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
        handleDelete={removeAssociations}
        dialogText={'association'}
      />
      <AddNew
        show={openAdd}
        handleOpen={handleOpenAdd}
        handleAdd={handleAddNewAssociation}
        handleNewJob={handleNewJob}
        newTitle={newAssociationTitle}
        dialogText={'association'}
      />
      {/*<Edit
          show={openAdd}
          handleOpen={handleOpenAdd}
          handleEdit={handleAddNewAssociation}
          handleEditJob={handleNewJob}
          editJobTitle={newAssociationTitle}
        />*/}
      <Approve
      dialogText={"association"}
        show={openApprove}
        handleOpen={handleOpenApprove}
        handleCancel={handleCancel}
        handleApprove={getAssociationApproved}
        approveEvent={approveEvent}
        jobID={associationID}
      />
    </Box>
  );
}
