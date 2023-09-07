import { Box, Button, Grid, Paper, Typography, styled, useTheme } from '@mui/material';
import React, { useState } from 'react'
import AddVideo from './dialog/AddVideo';
import CounterDialog from './dialog/CounterDialog'
import RecordingInProgress from './dialog/RecordingInProgress';
import VideoAddSteps from './VideoAddSteps';
import CamList from './CamList';

const StyledButtonLeft = styled(Button)(({ theme }) => ({
    marginRight: "24px",
    fontSize: "12px",
    // width: "140px",
    border: `2px solid ${theme.palette.redButton100.main}`,
    "& .MuiSvgIcon-root": {
        fontSize: "16px",
    },
    borderRadius: "10px",
}));


const MyCam = () => {
    const theme = useTheme()
    const [activeStep, setActiveStep] = useState(1)
    return (
        <Grid
            container
            spacing={0}
            sx={{ pt: 3 }}
            flexDirection={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
        >
            <Grid item sm={3} md={2} lg={2} xl={1} className="filterSec" >
                <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                    <StyledButtonLeft
                        onClick={() => setActiveStep(1)}
                        variant={"contained"}
                        color={activeStep === 1 ? "redButton100" : "white"}
                        // color="grayButton500"
                        sx={{
                            mb: 1,
                            borderRadius: "0 10px 10px 0",
                            border: 0
                            // color: step !== 4 ? "" : theme.palette.buttonText?.main,
                        }}
                    >
                        {"my cam"}
                    </StyledButtonLeft>
                    <StyledButtonLeft
                        onClick={() => setActiveStep(2)}
                        variant={"contained"}
                        color={activeStep === 2 ? "redButton100" : "white"}
                        sx={{
                            mb: 1,
                            borderRadius: "0 10px 10px 0",
                            border: 0
                            // color: step === 4 ? "" : theme.palette.buttonText?.main,
                        }}
                    >
                        {"job videos"}
                    </StyledButtonLeft>
                </Box>
            </Grid>
            <Grid
                item
                xs={12}
                sm={9}
                md={10}
                lg={10}
                xl={11}
                sx={{
                    px: 2,
                    display: "flex",
                    flexDirection: "column",
                    // alignItems: "center",
                    // minHeight: "80vh"
                }}
                gap={1}
                flexGrow="1 !important"
            >
                <Paper sx={{
                    width: "fit-content",
                    paddingY: 1,
                    paddingX: 2
                }}>
                    <Typography sx={{
                        fontSize:"16px",
                        fontWeight: 700
                    }}>my videos</Typography>
                    <Typography sx={{
                        fontSize:"14px",
                        fontWeight: 500
                    }}>It's selfie time. Push record and let us get to know you!</Typography>
                </Paper>
                <Box sx={{
                    margin: "auto",
                    width: activeStep === 1 ? "40%" : "100%"
                }}>
                    {activeStep === 1 && (<VideoAddSteps />)}
                    {activeStep === 2 && (<CamList />)}
                </Box>
            </Grid>
        </Grid>
    )
}

export default MyCam