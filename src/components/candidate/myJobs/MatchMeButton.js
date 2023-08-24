import { Box, Button, Tooltip, Typography } from '@mui/material'
import React from 'react'

import redTriangleSmile from "../../../assets/Characters/Red_Triangle_Smiling.svg";


import { styled } from '@mui/material/styles';

import { tooltipClasses } from '@mui/material/Tooltip';
import SingleRadialChart from '../../common/SingleRadialChart';
import { useTheme } from '@emotion/react';
const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
        maxWidth: 180,
        borderRadius: 15,
        padding: "16px 12px"
    },
}));
const MatchMeButton = ({ closeFunc }) => {
    const theme = useTheme()
    return (
        <Box>
            <Box
                sx={{
                    padding: "5px 16px",
                    height: "400px",
                }}
            >
                <Box mb={2} sx={{
                    display: "flex",
                    gap:1
                }}>
                    <strong>My match % </strong>
                    <Tooltip>
                        {/* <Typography sx={{
                            border: "1px solid black",
                            padding: "2px",
                            height: 12,
                            width: 12,
                            borderRadius: 1
                        }}>
                            i
                        </Typography> */}
                        <LightTooltip title={"This percentage match does not necessarily mean you will or will not be shortlisted for a job, but it helps provide a quick indicator of your suitability. "} placement='right-end'>
                            <Typography sx={{
                                padding: "5px",
                                height: "8px",
                                width: "8px",
                                borderRadius: "5px",
                                fontSize: "15px",
                                /* text-align: center; */
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: 900,
                                border: 1
                            }}>i</Typography>
                        </LightTooltip>
                    </Tooltip>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "0.8rem",
                            textAlign: "justify",
                            color: "gray",
                            fontWeight: 700,
                        }}
                    >
                        The Crayon system uses the information you've provided to match your
                        skillset and experience against the requirement of the role.
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Box
                            component={"img"}
                            src={redTriangleSmile}
                            sx={{ width: 36, height: 36, margin: "auto" }}
                        />
                        <Typography
                            sx={{
                                fontSize: "0.8rem",
                                textAlign: "left",
                                color: "gray",
                                fontWeight: 700,
                            }}
                        >
                            <strong>Remember,</strong> the more you complete, the stronger you
                            can compete!
                        </Typography>
                    </Box>
                    <Box sx={{
                        margin: "auto",
                        width: "80%",
                    }}>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "center"
                        }}>
                            <SingleRadialChart
                                labelsData={"match"}
                                series={[80]}
                                width={150}
                                color={theme.palette.chart.green200}
                                isHovered={true}
                            />
                        </Box>
                        <Typography
                            sx={{
                                fontWeight: "bold",
                                fontSize: "14px",
                                textAlign: "center"
                            }}
                        >
                            You’re a strong match for this role; apply while it’s still available!
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box
                container
                alignItems="center"
                overflow={"hidden"}
                sx={{
                    width: "100%",
                    borderRadius: "0 0 25px 25px",
                    height: 50,
                }}
            >
                <Button
                    variant="contained"
                    sx={{
                        borderRadius: 0,
                        width: "50%",
                        height: "100%",
                        fontSize: "12px",
                    }}
                    color="grayButton100"
                    onClick={closeFunc}
                >
                    close
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        borderRadius: 0,
                        width: "50%",
                        height: "100%",
                        fontSize: "12px",
                    }}
                    color="redButton"
                >
                    View More
                </Button>
                {/* </Grid> */}
            </Box>

        </Box>
    )
}

export default MatchMeButton