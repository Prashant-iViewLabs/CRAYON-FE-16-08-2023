import { Box, Button, Grid, InputBase, InputLabel, Paper, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import IconSection from '../IconSection'
import CompanyLogo from '../../../../assets/nedbank.png'
import { useDispatch } from 'react-redux'
import { updateTalentPool } from '../../../../redux/admin/jobsSlice'
import { setAlert } from '../../../../redux/configSlice'
import { ALERT_TYPE } from '../../../../utils/Constants'

const EditPool = ({ poolDetails, getUpdatedData, handleToggle }) => {
    const theme = useTheme()
    const dispatch = useDispatch()
    const [details, setDetails] = useState({ ...poolDetails, title: poolDetails.title, description: poolDetails.description })

    console.log(poolDetails)
    const handleNewPoolName = (event) => {
        setDetails({ ...details, title: event.target.value })
    }
    const handleNewPoolDescription = (event) => {
        setDetails({ ...details, description: event.target.value })
    }

    const handleUpdatePool = async () => {
        try {
            const { payload } = await dispatch(updateTalentPool(details))
            if (payload.status === "success") {
                dispatch(
                    setAlert({
                        show: true,
                        type: ALERT_TYPE.SUCCESS,
                        msg: "Talent pool updated successfully",
                    })
                );
                handleToggle()
                getUpdatedData(0)
            } else {
                dispatch(
                    setAlert({
                        show: true,
                        type: ALERT_TYPE.ERROR,
                        msg: payload?.message?.message,
                    })
                );
            }
        } catch (error) { }

    }
    return (
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
                    <Box
                        sx={{
                            marginTop: 3,
                            padding: 2
                        }}
                    >
                        <Box
                            component="img"
                            className="profileAvatar"
                            alt="crayon logo"
                            src={CompanyLogo}
                            sx={{
                                height: 80,
                                width: 90,
                            }}
                        />
                        <Typography
                            sx={{
                                fontWeight: 700
                            }}
                        >
                            {poolDetails.title}
                        </Typography>
                        <Typography>
                            Edit pool details.
                        </Typography>
                    </Box>
                    <Box mt={2}>
                        <IconSection />
                    </Box>
                    <Button
                        variant="contained"
                        color="yellowButton100"
                        sx={{
                            borderRadius: "0 25px 0 25px"
                        }}
                    // onClick={handleOpenAdd}
                    >
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
                </Box>
                <Box sx={{
                    width: "45%",
                    display: "flex",
                    flexDirection: "column",
                    padding: 3,
                    gap: 1
                }}>
                    <Typography
                        sx={{
                            fontWeight: 700,
                            paddingLeft: "10px",
                            paddingBottom: "2px",
                        }}
                    >
                        Pool details
                    </Typography>
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
                                value={details.title}
                                onChange={handleNewPoolName}
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
                                value={details.description}
                                onChange={handleNewPoolDescription}
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
                        onClick={handleToggle}
                    // disabled={poolDetails?.name?.trim().length === 0}
                    >
                        go back
                    </Button>
                    <Button
                        variant="contained"
                        color="redButton100"
                        sx={{
                            borderRadius: 0,
                            width: "50%",
                            height: "47px",
                            borderTopRightRadius: 25,
                        }}
                        onClick={handleUpdatePool}
                        disabled={details?.name?.trim().length === 0}
                    >
                        update
                    </Button>
                </Box>
            </Grid >
        </Box >
    )
}

export default EditPool