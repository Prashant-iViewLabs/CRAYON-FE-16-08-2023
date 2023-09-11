import { Avatar, Box, Button, Switch, Typography, alpha, styled } from '@mui/material';
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import { assignJobs, getAllTeamMembers } from '../../../../redux/employer/myTeams';
import { ALERT_TYPE, ERROR_MSG } from '../../../../utils/Constants';
import { setAlert, setLoading } from '../../../../redux/configSlice';


const BlueSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
        color: theme.palette.greenButton.main,
        "&:hover": {
            backgroundColor: alpha(
                theme.palette.greenButton.main,
                theme.palette.action.hoverOpacity
            ),
        },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
        backgroundColor: theme.palette.greenButton.main,
    },
    "& .MuiSwitch-track": {
        margin: "auto",
        height: "60% !important",
    },
    "& .css-jsexje-MuiSwitch-thumb": {
        borderRadius: "15% !important",
    },
}));
const TeamAccessList = ({ jobId, openDialog, closeFunc }) => {
    const dispatch = useDispatch()
    const [teamMembers, setTeamMembers] = useState([]);
    const handleGetTeamMembersDetails = async (companyId) => {
        try {
            const { payload } = await dispatch(getAllTeamMembers({ job_id: jobId }));
            setTeamMembers(payload.data);
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

    const handleJobAccess = async (event, user_id) => {
        try {
            const data = {
                userid: user_id,
                jobid: jobId,
                flag: event.target.checked,
            };
            console.log(user_id, jobId);
            const { payload } = await dispatch(assignJobs(data));
            if (payload.status === "success") {
                console.log(payload);
                dispatch(
                    setAlert({
                        show: true,
                        type: ALERT_TYPE.SUCCESS,
                        msg: "Job assigned successfully",
                    })
                );
            } else {
                dispatch(
                    setAlert({
                        show: true,
                        type: ALERT_TYPE.SUCCESS,
                        msg: payload?.error,
                    })
                );
            }
        } catch (error) {
            dispatch(
                setAlert({
                    show: true,
                    type: ALERT_TYPE.SUCCESS,
                    msg: error,
                })
            );
        }
    };
    useEffect(() => {
        handleGetTeamMembersDetails(jobId);
    }, []);
    return (
        <>
            {openDialog ? (
                <Box
                    sx={{
                        position: "absolute",
                        left: 0,
                        marginTop: 1,
                        background: "#ffff",
                        padding: 0,
                        width: 300,
                        zIndex: 100,
                        borderRadius: "25px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                        // boxShadow: "-1px 3px 8px rgba(0, 0, 0, 0.1)",
                        boxShadow: 2
                    }}
                >
                    <Box sx={{
                        padding: 2,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2
                    }}>
                        <Typography
                            sx={{
                                fontSize: "14px",
                                fontWeight: 900,
                            }}
                        >
                            Who can access this job?
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "12px",
                            }}
                        >
                            Below is a list of your team members that can view, edit
                            and manage this pool.
                        </Typography>
                    </Box>
                    <Box
                        id="talentList"
                        sx={{
                            padding: "16px",
                            height: "200px",
                            overflowY: "auto",
                        }}
                    > {/*
                        <InfiniteScroll
                            style={{
                                height: "100%",
                                overflowX: "hidden",
                                scrollbarWidth: "thin",
                            }}
                            dataLength={teamMembers.length}
                            hasMore={true}
                            scrollableTarget="talentList"
                            endMessage={
                                <p style={{ textAlign: "center" }}>
                                    <b>Yay! You have seen it all</b>
                                </p>
                            }
                        >
                            {teamMembers.map((teamMember) => (
                                <>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            padding: "16px 0 0 0",
                                        }}
                                    >
                                        <Avatar>{teamMember?.user.first_name[0]}</Avatar>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "start",
                                                width: "100px",
                                            }}
                                        >
                                            <Box>
                                                <Typography>{teamMember?.user.first_name}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography>
                                                    {teamMember?.employer_role_type.name}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <BlueSwitch
                                            defaultChecked={
                                                teamMember?.assigned_job !== null ||
                                                teamMember?.role_type_id === 1 ||
                                                teamMember?.role_type_id === 2
                                            }
                                            disabled={
                                                teamMember?.role_type_id === 1 ||
                                                    teamMember?.role_type_id === 2
                                                    ? true
                                                    : false
                                            }
                                            onChange={(event) =>
                                                handleJobAccess(event, teamMember.user_id)
                                            }
                                        />
                                    </Box>
                                </>
                            ))}
                            <style>
                                {`.infinite-scroll-component::-webkit-scrollbar {
                width: 7px !important;
                background-color: #F5F5F5; 
                }

                .infinite-scroll-component__outerdiv {
                  height:100%
                }

                .infinite-scroll-component::-webkit-scrollbar-thumb {
                  background-color: #888c; 
              }`}
                            </style>
                        </InfiniteScroll>*/}
                    </Box>
                    <Box sx={{ display: "flex", width: "100%" }}>
                        <Button
                            variant="contained"
                            color="grayButton200"
                            sx={{
                                borderRadius: "0 0 0 25px",
                                width: "30%",
                                padding: "25px 40px",
                                fontSize: "10px",
                            }}
                            onClick={() => closeFunc()}
                        >
                            close
                        </Button>
                        {/* <Link
                            to={"/employer/my-team"}
                            style={{
                                textDecoration: "none",
                                color: theme.palette.black,
                                flexGrow: 1,
                            }}
                        > */}
                        <Button
                            variant="contained"
                            backgroundColor={"redButton"}
                            sx={{
                                borderRadius: "0 0 25px 0",
                                width: "100%",
                                padding: "25px 20px",
                                fontSize: "10px",
                            }}
                            color="redButton100"
                        >
                            Add/edit a team member
                        </Button>
                        {/* </Link> */}
                    </Box>
                </Box>
            ) : (
                ""
            )}
        </>
    )
}

export default TeamAccessList