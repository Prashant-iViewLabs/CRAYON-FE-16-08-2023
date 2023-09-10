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
    Button,
    InputLabel,
    InputBase,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
import {
    addJobTitle,
    getAllCurrencies,
} from "../../../redux/admin/maintenance";
import { setAlert } from "../../../redux/configSlice";
import {
    addTalentPool,
    createTalentPool,
    getTalentPool,
} from "../../../redux/admin/jobsSlice";
import { ALERT_TYPE } from "../../../utils/Constants";
import { dateConverterMonth } from "../../../utils/DateTime";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import IconSection from "./IconSection";
import { ExpandMore } from "@mui/icons-material";
import SmallButton from "../../common/SmallButton";
import ButtomMenu from "./DialogBox/ButtonMenu";

export default function TalentPool() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const [lastKey, setLastKey] = useState(0);
    const [tableData, setTableData] = useState([]);
    const [jobTitleCount, setJobTitleCount] = useState(0);
    const [openAdd, setOpenAdd] = useState(false);
    const [poolDetails, setPoolDetails] = useState({ name: '', description: '' })
    const [buttonMenu, setButtonMenu] = useState(false);

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

    const handleAddNewJob = async () => {
        try {
            if (poolDetails?.name.trim().length !== 0) {
                const data = {
                    title: poolDetails.name,
                    description: poolDetails.description
                };
                const { payload } = await dispatch(createTalentPool(data));
                if (payload.status === "success") {
                    setTableData([]);
                    setPoolDetails({ title: '', description: '' });
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
    useEffect(() => {
        getTitles(0);
    }, []);

    return (
        <>
            {openAdd ? (
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
                        <Button
                            variant="contained"
                            color="yellowButton100"
                            sx={{
                                borderRadius: 0,
                                width: "50%",
                                height: "47px",
                                borderTopRightRadius: 25,
                            }}
                            onClick={handleAddNewJob}
                            disabled={poolDetails?.name?.trim().length === 0}
                        >
                            add a pool image
                        </Button>
                    </Box>
                </Paper>
            ) :
                (
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
                                style={{ overflow: "hidden" }}
                                dataLength={tableData.length}
                                next={() => getTitles(lastKey)}
                                // scrollThreshold={"10px"}
                                hasMore={true}
                                loader={<Typography sx={{ textAlign: "center", py: 4 }}>Loading more...</Typography>}
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
                                    <TableContainer component={Box}>
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
                                                {tableData.map((row) => (
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
                                                        <TableCell sx={{
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
                                                                onClick={() => setButtonMenu((prevState) => !prevState)}
                                                            >
                                                                Permissions
                                                            </Button>
                                                            {/* <Box sx={{position: "relative"}}> */}
                                                                {buttonMenu && (
                                                                    <ButtomMenu />
                                                                )}
                                                            {/* </Box> */}
                                                        </TableCell>
                                                        <TableCell>
                                                            Action button
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </InfiniteScroll>
                        </Grid>

                    </Box >
                )
            }
        </>

    );
}
