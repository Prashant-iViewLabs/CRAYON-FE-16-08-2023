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
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  approveCompany,
  editCompany,
  getAllCompanies,
} from "../../../redux/admin/maintenance";
import { dateConverterMonth } from "../../../utils/DateTime";
import { setAlert, setLoading } from "../../../redux/configSlice";
import { ALERT_TYPE, ERROR_MSG } from "../../../utils/Constants";
import Delete from "./Dialogbox/Delete";
import AddNew from "./Dialogbox/AddNew";
import Approve from "./Dialogbox/Approve";
import Edit from "./Dialogbox/Edit";
import { getCompanies } from "../../../redux/employer/empProfileSlice";
import { useSelector } from "react-redux";

export default function Company() {
  const dispatch = useDispatch();
  const [lastKey, setLastKey] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [companyCount, setCompanyCount] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [openApprove, setOpenApprove] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [deleteAssociation, setDeleteAssociation] = useState();
  const [companyName, setcompanyName] = useState("");
  const [existingCompany, setExistingCompany] = useState();
  const [associationID, setassociationID] = useState();
  const [approveEvent, setApproveEvent] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editableCompany, setEditableCompany] = useState();
  const { companies } = useSelector((state) => state.myProfile);

  const getAllData = async () => {
    try {
      dispatch(setLoading(true));
      await dispatch(getCompanies());
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

  const getCompany = async (lastkeyy) => {
    try {
      const { payload } = await dispatch(
        getAllCompanies({ lastKey: lastkeyy })
      );
      if (payload.status === "success") {
        setCompanyCount(payload.count);
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

  const getCompanyApproved = async (event, companyId) => {
    try {
      const data = {
        company_id: companyId,
        flag: event.target.checked ? 1 : 0,
      };
      const { payload } = await dispatch(approveCompany(data));
      if (payload.status === "success") {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Company Approved Successfully",
          })
        );
        setOpenApprove(false);
      }
    } catch (error) {}
  };

  const handleEditCompany = async () => {
    try {
      const data = {
        new_company_id: existingCompany !== undefined ? existingCompany : null,
        current_company_id: editableCompany,
        name: companyName !== "" ? companyName : "",
      };
      const { payload } = await dispatch(editCompany(data));
      if (payload.status === "success") {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Company edited Successfully",
          })
        );
        setOpenEdit(false);
        await getCompany(0);
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

  const handleOpenEdit = (currCompID, compName) => {
    setOpenEdit((prevState) => !prevState);
    setEditableCompany(currCompID);
    setcompanyName(compName);
  };

  const handleCancel = () => {
    setOpenApprove(false);
  };

  const handleEdit = (event) => {
    if (event.target.id === "edit_input") {
      setExistingCompany(null);
      setcompanyName(event.target.value);
    } else if (event.target.id.includes("existing_name")) {
      let com = companies?.find(
        (title) => title.name === event.target.textContent
      );
      setcompanyName("");
      setExistingCompany(com.company_id);
    }
  };

  useEffect(() => {
    getCompany(0);
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
        Company ({companyCount})
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
          next={() => getCompany(lastKey)}
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
                        Owner
                      </Typography>
                    </TableCell>
                    {/*<TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Followers
                      </Typography>
                    </TableCell>*/}
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Created At
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Action
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
                      <TableCell>
                        {`${row?.user?.first_name} ${row?.user?.last_name}`}
                      </TableCell>
                      {/*<TableCell >
                        {row.followers}
                      </TableCell>*/}
                      <TableCell>
                        {dateConverterMonth(row.created_at)}
                      </TableCell>
                      <TableCell>
                        <Tooltip title="approve" placement="top-end">
                          <Checkbox
                            defaultChecked={row.enabled}
                            onClick={(event) =>
                              handleOpenApprove(event, row?.company_id)
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
                                handleOpenEdit(row?.company_id, row?.name)
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
                              onClick={() => handleOpenDelete(row?.company_id)}
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
        dialogText={"company"}
        // handleDelete={removeAssociations}
      />
      {/*<AddNew
        show={openAdd}
        handleOpen={handleOpenAdd}
        // handleAdd={handleEditCompany}
        handleNewJob={handleNewJob}
        newTitle={newTitle}
      />*/}
      <Edit
        show={openEdit}
        handleOpen={handleOpenEdit}
        handleEdit={handleEditCompany}
        handleEditJob={handleEdit}
        companyName={companyName}
        existingCompany={existingCompany}
        data={companies}
      />
      <Approve
      dialogText={"company"}
        
        show={openApprove}
        handleOpen={handleOpenApprove}
        handleCancel={handleCancel}
        handleApprove={getCompanyApproved}
        approveEvent={approveEvent}
        jobID={associationID}
      />
    </Box>
  );
}
