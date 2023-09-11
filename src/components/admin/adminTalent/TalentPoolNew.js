import React, { useEffect, useRef, useState } from "react";
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
    Button,
    InputLabel,
    InputBase,
    Dialog,
    IconButton,
    DialogTitle,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
import { setAlert } from "../../../redux/configSlice";
import {
    createTalentPool,
    deleteTalentPool,
    getTalentPool,
} from "../../../redux/admin/jobsSlice";
import { ALERT_TYPE } from "../../../utils/Constants";
import { dateConverterMonth } from "../../../utils/DateTime";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import IconSection from "./IconSection";
import { ExpandMore } from "@mui/icons-material";
import SmallButton from "../../common/SmallButton";

import deleteIcon from "../../../assets/Padding Excluded/Black_Trash_Delete_1 - Copy.svg";
import editIcon from "../../../assets/Padding Included/Yellow_Edit.svg";
import addProfileIcon from "../../../assets/Padding Excluded/Circular Icons__Red_User_Profile.svg"
import TalentSVGButton from "../../common/TalentSVGButton";
import yellowTriangle from "../../../assets/Characters/Yellow_Triangle_Happy.svg"
import Delete from "../../candidate/myCam/dialog/Delete";
import EditPool from "./DialogBox/EditPool";
import TeamAccessList from "./DialogBox/TeamAccessList";

export default function TalentPool() {
    const dispatch = useDispatch();
    const theme = useTheme();

    const hiddenFileInput = useRef(null);

    const [lastKey, setLastKey] = useState(0);
    const [tableData, setTableData] = useState([]);
    const [jobTitleCount, setJobTitleCount] = useState(0);
    const [openAdd, setOpenAdd] = useState(false);
    const [poolDetails, setPoolDetails] = useState({ name: '', description: '', logo: null })
    const [poolId, setPoolId] = useState(0)
    const [buttonMenu, setButtonMenu] = useState(false);
    const [addTalent, setAddTalent] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false)
    const [openDialogRow, setOpenDialogRow] = useState(null);

    // Function to handle the click event and open the permission dialog
    const handleOpenPermissionDialog = (rowId) => {
        setButtonMenu(prevState => !prevState)
        setOpenDialogRow(rowId);
    };
    const getTitles = async (lastkeyy) => {
        try {
            const { payload } = await dispatch(getTalentPool({ lastKey: lastkeyy }));
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
        } catch (error) { }
    };

    const handleNewJobName = (event) => {
        setPoolDetails({
            ...poolDetails,
            name: event.target.value
        });
    };
    const handleNewDescription = (event) => {
        setPoolDetails({
            ...poolDetails,
            description: event.target.value
        })
    }

    const handleAddNewJob = async (logoData) => {
        const isFile = logoData instanceof File;

        console.log(isFile);
        // console.log(poolDetails)
        try {
            if (poolDetails?.name.trim().length !== 0) {
                const data = {
                    title: poolDetails.name,
                    description: poolDetails.description,
                    logo: isFile ? logoData : null
                };
                console.log(data)
                const { payload } = await dispatch(createTalentPool(data));
                if (payload.status === "success") {
                    setTableData([]);
                    setPoolDetails({ title: '', description: '', logo: null });
                    setOpenAdd(false);
                    dispatch(
                        setAlert({
                            show: true,
                            type: ALERT_TYPE.SUCCESS,
                            msg: "Talent pool added successfully",
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
        } catch (error) { }
    };

    const handleOpenAdd = () => {
        setOpenAdd((prevState) => !prevState);
    };
    const handleDeleteDialog = (poolId) => {
        console.log(poolId)
        setPoolId(poolId)
        setOpenDelete(prevState => !prevState)
    }
    const handleCancelDelete = () => {
        setOpenDelete((prevState) => !prevState);
        setConfirmDelete(false);
    }

    const handleDeletePool = async () => {
        const { payload } = await dispatch(deleteTalentPool({ pool_id: poolId }));
        if (payload.status === "success") {
            dispatch(
                setAlert({
                    show: true,
                    type: ALERT_TYPE.SUCCESS,
                    msg: "Talent pool Deleted successfully",
                })
            );
            handleCancelDelete()
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
    }

    const handleEditDialog = (poolInformation) => {
        setPoolDetails(poolInformation)
        setOpenEdit(prevState => !prevState)
    }

    const handleAddTalentDialog = () => {
        setAddTalent(prevState => !prevState)
    }

    const handleImageChange = async (event) => {
        // setZoom(1);
        console.log("eventFile")
        console.log(event.target.files[0])
        // setPoolDetails(event.target.files[0].name);
        handleAddNewJob(event.target.files[0] || null)
        setPoolDetails({ ...poolDetails, logo: event.target.files[0] })
        // setImagePreview(imageData);
        // setOpenEditImage(true);
    };

    const handleImageClick = () => {
        hiddenFileInput.current.click();
    };

    useEffect(() => {
        getTitles(0);
    }, []);

    return (
        <>
            {openAdd && (
                <Paper sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                    mt: 4,
                    pt: 2
                }}>
                    <IconSection />
                    <Box>
                        <Typography sx={{
                            fontWeight: 700,
                            textAlign: "center"
                        }}>
                            Create your First pool
                        </Typography>
                        <Typography sx={{

                            textAlign: "center"
                        }}>
                            Add candidates who have the potential to meet your company
                            or project needs
                        </Typography>

                    </Box>
                    <Box sx={{
                        width: "30%",
                        display: "flex",
                        flexDirection: "column",
                        gap: 1
                    }}>
                        <Box>
                            <InputLabel
                                htmlFor="current_job_title"
                                sx={{
                                    color: "black",
                                    paddingLeft: "10px",
                                    paddingBottom: "2px",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                }}
                            >
                                Pool name
                            </InputLabel>
                            <Paper
                                elevation={3}
                                sx={{
                                    display: "flex",
                                    borderRadius: "25px",
                                    height: "40px",
                                    boxShadow: "none",
                                    border: `1px solid ${theme.palette.grayBorder}`,
                                }}
                            >
                                <InputBase
                                    sx={{ ml: 2, mr: 2, width: "100%" }}
                                    id="Pool_name"
                                    placeholder={"enter your talent pool name"}
                                    value={poolDetails.name}
                                    onChange={handleNewJobName}
                                />
                            </Paper>
                        </Box>
                        <Box>

                            <InputLabel
                                htmlFor="current_job_title"
                                sx={{
                                    color: "black",
                                    paddingLeft: "10px",
                                    paddingBottom: "2px",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                }}
                            >
                                Description
                            </InputLabel>
                            <Paper
                                elevation={3}
                                sx={{
                                    display: "flex",
                                    borderRadius: "25px",
                                    height: "40px",
                                    boxShadow: "none",
                                    border: `1px solid ${theme.palette.grayBorder}`,
                                }}

                            >
                                <InputBase
                                    sx={{ ml: 2, mr: 2, width: "100%" }}
                                    id="Pool_name"
                                    placeholder={"enter a short description about the pool"}
                                    value={poolDetails.description}
                                    onChange={handleNewDescription}
                                />
                            </Paper>
                        </Box>

                    </Box>
                    <Box
                        sx={{
                            margin: "auto",
                            width: "30%"
                        }}
                    >
                        <Button
                            variant="contained"
                            color="grayButton100"
                            sx={{
                                borderRadius: 0,
                                width: "50%",
                                height: "47px",
                                borderTopLeftRadius: 25,
                            }}
                            onClick={handleAddNewJob}
                            disabled={poolDetails?.name?.trim().length === 0}
                        >
                            Skip image
                        </Button>
                        <input
                            ref={hiddenFileInput}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: "none" }}
                        />
                        <Button
                            variant="contained"
                            color="yellowButton100"
                            sx={{
                                borderRadius: 0,
                                width: "50%",
                                height: "47px",
                                borderTopRightRadius: 25,
                            }}
                            onClick={() => {
                                handleImageClick()
                            }}
                            disabled={poolDetails?.name?.trim().length === 0}
                        >
                            add a pool image
                        </Button>
                    </Box>
                </Paper>
            )}
            {openEdit && <EditPool poolDetails={poolDetails} getUpdatedData={getTitles} handleToggle={handleEditDialog} />}
            {!openAdd && !openEdit && (
                <>
                    <Box sx={{ ml: 6 }}>
                        <Typography
                            sx={{
                                fontSize: "36px",
                                fontWeight: 700,
                                textAlign: "center"
                                // ml: 6
                            }}
                        >
                            Talent Pools
                        </Typography>

                        <Grid
                            container
                            spacing={2}
                            flexDirection={"column"}
                            sx={{
                                display: { xs: "none", md: "flex" },
                                marginTop: "30px",
                                background: "white",
                                borderRadius: "25px"
                            }}
                            boxShadow={1}
                        >
                            <Box sx={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                                <Box sx={{ width: 160 }}></Box>
                                <Box mt={2}>
                                    <IconSection />
                                </Box>
                                <Button
                                    variant="contained"
                                    color="yellowButton100"
                                    sx={{
                                        borderRadius: "0 25px 0 25px"
                                    }}
                                    onClick={handleOpenAdd}>
                                    create new pool
                                </Button>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    paddingX: 2,
                                    paddingY: 1,
                                    borderBottom: 2,
                                    borderColor: theme.palette.grayBorder
                                }}
                            >
                                <Box>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                        <Typography
                                            sx={{
                                                fontWeight: 700
                                            }}
                                        >
                                            Talent Pools
                                        </Typography>
                                        <SmallButton
                                            color="userID"
                                            // borderRadius="5px"
                                            label={1}
                                            paddingX={2}
                                            fontSize={10}
                                            fontWeight={700}
                                            textColor="#000"
                                            borderRadius="6px"
                                            width="fit-content"
                                        ></SmallButton>
                                    </Box>
                                    <Typography>
                                        Create and add candidates to a talent pool
                                    </Typography>
                                </Box>

                                <Box sx={{
                                    width: "42%"
                                }}>
                                    <Paper
                                        elevation={3}
                                        sx={{
                                            display: "flex",
                                            borderRadius: "25px",
                                            height: "40px",
                                            boxShadow: "none",
                                            border: `1px solid ${theme.palette.grayBorder}`,
                                        }}
                                    >
                                        <InputBase
                                            sx={{ ml: 2, mr: 2, width: "100%" }}
                                            id="Pool_name"
                                            placeholder={"search for a pool"}
                                        />
                                    </Paper>
                                </Box>

                            </Box>
                            <InfiniteScroll
                                style={{ overflow: "visible" }}
                                dataLength={tableData.length}
                                next={() => getTitles(lastKey)}
                                scrollThreshold={"10px"}
                                hasMore={true}
                                loader={<Typography sx={{ textAlign: "center", py: 4, mt: 4 }}>Loading more...</Typography>}
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
                                    <TableContainer component={Box} sx={{
                                        overflowX: "unset"
                                    }}>
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
                                                            Date Created
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant="subtitle1" fontWeight="bold">
                                                            Pool size
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant="subtitle1" fontWeight="bold">
                                                            Team Access
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>

                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {tableData.map((row, index) => {

                                                    return (
                                                        <TableRow
                                                            key={row.id}
                                                            style={{
                                                                "& .css-12zgwp-MuiTableCell-root": {
                                                                    padding: "0 16px !important",
                                                                },
                                                            }}

                                                        >
                                                            <TableCell>
                                                                <Link
                                                                    to={`/admin/admin-talent/talent-pool/${row?.pool_id}`}
                                                                    target={"_blank"}
                                                                    style={{
                                                                        textDecoration: "none",
                                                                        color: theme.palette.black,
                                                                    }}
                                                                >
                                                                    {row?.title}
                                                                </Link>
                                                            </TableCell>
                                                            <TableCell>
                                                                {dateConverterMonth(row.created_at)}
                                                            </TableCell>
                                                            <TableCell>
                                                                <SmallButton
                                                                    color="userID"
                                                                    // borderRadius="5px"
                                                                    label={1}
                                                                    paddingX={2}
                                                                    fontSize={10}
                                                                    fontWeight={700}
                                                                    textColor="#000"
                                                                    borderRadius="6px"
                                                                    width="fit-content"
                                                                ></SmallButton>
                                                            </TableCell>
                                                            <TableCell
                                                                sx={{
                                                                    position: "relative"

                                                                }}>
                                                                <Button
                                                                    variant="contained"
                                                                    color="grayButton100"
                                                                    sx={{
                                                                        padding: "0 50px",
                                                                        height: "25px",
                                                                        borderRadius: 2
                                                                    }}
                                                                    endIcon={<ExpandMore />}

                                                                    onClick={() => handleOpenPermissionDialog(index)}
                                                                // onClick={() => setButtonMenu((prevState) => !prevState)}
                                                                >
                                                                    Permissions
                                                                </Button>
                                                                {openDialogRow === index && <TeamAccessList openDialog={buttonMenu} jobId={1413} closeFunc={handleOpenPermissionDialog} />}
                                                            </TableCell>
                                                            <TableCell sx={{
                                                                display: "flex"
                                                            }}>
                                                                <Box
                                                                    component={"img"}
                                                                    height={30}
                                                                    width={30}
                                                                    src={addProfileIcon}
                                                                    sx={{
                                                                        cursor: "pointer"
                                                                    }}
                                                                    onClick={handleAddTalentDialog}
                                                                />
                                                                <TalentSVGButton
                                                                    color={"white"}
                                                                    source={editIcon}
                                                                    height={34}
                                                                    width={35}
                                                                    padding={0}
                                                                    onClick={() => handleEditDialog(row)}
                                                                />
                                                                <TalentSVGButton
                                                                    color={"white"}
                                                                    source={deleteIcon}
                                                                    height={24}
                                                                    width={18}
                                                                    padding={0}
                                                                    onClick={() => handleDeleteDialog(row.pool_id)}
                                                                />
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </InfiniteScroll>
                        </Grid>
                    </Box >
                    <Dialog
                        open={addTalent}
                        fullWidth={true}
                        maxWidth={"xs"}
                        scroll="body"
                    >
                        <DialogTitle>
                            <IconButton
                                aria-label="close"
                                onClick={handleAddTalentDialog}
                                sx={{
                                    position: "absolute",
                                    right: 8,
                                    top: 8,
                                    color: (theme) => theme.palette.grey[500],
                                }}
                            >
                                {/* <CloseIcon /> */}
                                <Box
                                    sx={{
                                        width: "20px",
                                        height: "20px",
                                        color: "#000000",
                                        border: 2,
                                        fontSize: "18px",
                                        borderRadius: "5px",
                                    }}
                                >
                                    X
                                </Box>
                            </IconButton>
                        </DialogTitle>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 2,
                            }}>

                            <Box
                                component={"img"}
                                src={yellowTriangle}
                                sx={{ width: 150, height: 100 }}
                            />
                            <Typography
                                sx={{
                                    textAlign: "center",
                                    fontSize: "22px",
                                    fontWeight: 900,
                                }}
                            >
                                Get started choosing your A team
                            </Typography>
                            <Typography
                                sx={{
                                    textAlign: "center",
                                    fontSize: "18px",
                                    fontWeight: 800,
                                }}
                            >
                                Add talent to yout First pool
                            </Typography>
                            <Button
                                variant="contained"
                                color="redButton100"
                                sx={{
                                    width: "100%",
                                    borderRadius: 0
                                }}
                            >
                                Search Talents
                            </Button>
                        </Box>
                    </Dialog>
                    <Delete
                        show={openDelete}
                        handleOpen={handleDeleteDialog}
                        handleCancel={handleCancelDelete}
                        handleDelete={handleDeletePool}
                        confirmDelete={confirmDelete}
                        setConfirmDelete={setConfirmDelete}
                    />
                </>
            )
            }
        </>

    );
}
