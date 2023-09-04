
import { Box, Button, Stack, Switch, Typography, styled, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import crayonRecruit from '../../../assets/Padding Included/Red_Crayon_Icon.svg'
import crayonDirect from '../../../assets/Padding Excluded/Crayon_Direct_No_Padding.svg'
import redSkateBoard from '../../../assets/Characters/Red_Skateboarder.svg'
import greenRectangle from '../../../assets/Characters/Green_Retangle.svg'
import blueTriangle from '../../../assets/Characters/Blue_Triangle_Smiling.svg'
import yellowCircle from '../../../assets/Characters/Yellow_Circle_Bow_Tie.svg'
// import redSkateBoard from '../../../assets/Characters/Bl'

import { Add, CheckCircle, ExpandLess, ExpandMore, PlusOne } from '@mui/icons-material';


const AntSwitch = styled(Switch)(({ theme }) => ({
    width: "89px",
    height: "34px",
    padding: 0,
    borderRadius: "25px",
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 26,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(52px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 4,
        '&.Mui-checked': {
            transform: 'translateX(52px)',
            color: '#E41E26',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: '#FFFFFF',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 26,
        height: 26,
        borderRadius: "26px",
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : '#E41E26',
        boxSizing: 'border-box',
    },
}));

const JobType = ({ changeStep, handleComplete, handleJobType, selectedJobType, jobId }) => {
    const theme = useTheme()
    const [crayonRecruitExpand, setCrayonRecruitExpand] = useState(false)
    const [crayonDirectExpand, setCrayonDirectExpang] = useState(false)

    const handleCrayonRectuitExpand = () => {
        setCrayonRecruitExpand(prevState => !prevState)
    }
    const handleCrayonDirectExpand = () => {
        setCrayonDirectExpang(prevState => !prevState)
    }
    console.log(selectedJobType)
    if (jobId || selectedJobType !== "") {
        handleComplete(0)
        changeStep(1)
    }
    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: 2,
            mb: 5
        }}>
            {/* Header */}
            <Typography sx={{
                fontSize: "20px",
                fontWeight: 700
            }}>
                Let’s get you started! Do you want Crayon to do the heavy lifting, or are you happy to go it alone?
            </Typography>
            {/* Header */}

            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    justifyContent: "space-between",
                    width: "100%",
                    flexDirection: ["column", null, "row"],
                }}
            >
                {/* Crayon Recruit */}
                <Box sx={{
                    background: theme.palette.grayBackground,
                    borderRadius: "16px",
                    width: ["100", "100", "48%"],
                    border: 1,
                    borderColor: 'lightgray',
                    height: "fit-content",
                    minHeight: "500px",
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: "end",
                    }}>
                        <Box sx={{
                            background: "#ffffff",
                            padding: 1,
                            borderRadius: "0px 20px 0px 20px",
                            BorderLeft: 1,
                            borderBottom: 1,
                            borderColor: "lightgray",
                            display: "flex",
                            alignItems: "center",
                            gap: 1
                        }}>
                            <Box
                                component={"img"}
                                src={crayonRecruit}
                                sx={{ width: 33, height: 33 }}
                            />
                            <Typography sx={{
                                fontSize: "15px",
                                fontWeight: 600
                            }}>Crayon Recruit</Typography>
                        </Box>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        padding: 3,
                        gap: 2,
                        flexGrow: 1,
                    }}>
                        <Box
                            sx={{
                                width: "100px",
                                height: "134px",
                                display: "flex",
                                position: "relative"
                            }}
                        >
                            <Box
                                component={"img"}
                                src={redSkateBoard}
                                sx={{
                                    width: "95px",
                                    height: "97px",
                                    position: "absolute",
                                    left: -110,
                                    top: 8,
                                    zIndex: 2
                                }}
                            />
                            <Box
                                component={"img"}
                                src={greenRectangle}
                                sx={{
                                    width: "98px",
                                    height: "82px",
                                    position: "absolute",
                                    left: -30
                                }}
                            />
                            <Box
                                component={"img"}
                                src={blueTriangle}
                                sx={{
                                    width: "121px",
                                    height: "103px",
                                    position: "absolute",
                                    right: -60,
                                    zIndex: 2
                                }}
                            />
                            <Box
                                component={"img"}
                                src={yellowCircle}
                                sx={{
                                    width: "101px",
                                    height: "101px",
                                    position: "absolute",
                                    right: -130
                                }}
                            />
                        </Box>
                        <Typography sx={{
                            fontSize: "40px",
                            fontWeight: 600,
                        }}>

                            Crayon Recruit
                        </Typography>
                        <Typography sx={{
                            fontSize: "14px",
                            textAlign: 'center'
                        }}>

                            Finding talent takes talent. The Crayon team will source, screen (and interview) candidates to present only the most suitable options!
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography sx={{
                                fontSize: "12px"
                            }}>we don’t need interviews</Typography>
                            <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                            <Typography sx={{
                                fontSize: "12px"
                            }}>include recorded interviews</Typography>
                        </Stack>
                    </Box>
                    {crayonRecruitExpand && (
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                            marginBottom: 3
                        }}>
                            <Box sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: 2
                            }}>
                                <Box sx={{
                                    background: "white",
                                    textAlign: "center",
                                    fontSize: "48px",
                                    borderRadius: "50%",
                                    width: "84px",
                                    height: "84px",
                                    fontWeight: 600,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "red"
                                }}>
                                    10<span style={{
                                        // margin: "auto",
                                        fontSize: "28px",
                                        // width: "18px",
                                        // height: "30px"
                                    }}>€</span>

                                </Box>

                                <Add fontSize='large' color="error" />
                                <Box sx={{
                                    background: "white",
                                    textAlign: "center",
                                    fontSize: "48px",
                                    borderRadius: "50%",
                                    width: "84px",
                                    height: "84px",
                                    fontWeight: 600,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "red"
                                }}>
                                    5<span style={{ fontSize: "25px" }}>%</span>
                                </Box>
                            </Box>
                            <Box sx={{
                                width: "50%",
                                display: "flex",
                                margin: "auto",
                                flexDirection: "column",
                                gap: 2
                            }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        fontSize: "14px",
                                        gap: 2
                                    }}
                                >
                                    <Typography>Dashboard Management</Typography>
                                    <CheckCircle color='success' />
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        fontSize: "14px",
                                        gap: 2
                                    }}
                                >
                                    <Typography>Applicant screening</Typography>
                                    <CheckCircle color='success' />
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        fontSize: "14px",
                                        gap: 2
                                    }}
                                >
                                    <Typography>Proactive sourcing</Typography>
                                    <CheckCircle color='success' />
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        fontSize: "14px",
                                        gap: 2
                                    }}
                                >
                                    <Typography>Recorded interviews</Typography>
                                    <CheckCircle color='success' />
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        fontSize: "14px",
                                        gap: 2
                                    }}
                                >
                                    <Typography>Reference checks</Typography>
                                    <CheckCircle color='success' />
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        fontSize: "14px",
                                        gap: 2
                                    }}
                                >
                                    <Typography>Pay monthly (Crayon Talent only)</Typography>
                                    <CheckCircle color='success' />
                                </Box>
                            </Box>
                            <Box>
                                <Typography sx={{
                                    textAlign: "center",
                                    fontSize: "14px"
                                }}>let us run your hiring while you run your business</Typography>
                                <Typography sx={{
                                    textAlign: "center",
                                    fontSize: "25px",
                                    fontWeight: "bold"
                                }}>time is money; Crayon Recruit saves you both</Typography>
                                <Typography sx={{
                                    textAlign: "center",
                                    fontSize: "14px"
                                }}>join the hundreds of companies already hiring with Crayon</Typography>
                            </Box>
                        </Box>
                    )}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        {crayonRecruitExpand ?
                            <Button
                                variant="contained"
                                color="grayButton200"
                                sx={{
                                    width: "229px",
                                    height: "57px",
                                    fontSize: "15px",
                                    borderRadius: "26px 0 0 0",
                                }}
                            // onClick={handleCrayonRectuitExpand}
                            >
                                top-up coins
                            </Button> :
                            <Button
                                variant="contained"
                                color="grayButton200"
                                sx={{
                                    width: "229px",
                                    height: "57px",
                                    fontSize: "15px",
                                    borderRadius: "26px 0 0 0",
                                }}
                                onClick={handleCrayonRectuitExpand}
                            >
                                Learn More <ExpandMore />
                            </Button>}
                        <Button
                            variant="contained"
                            color="yellowButton400"
                            sx={{
                                width: "229px",
                                height: "57px",
                                fontSize: "15px",
                                borderRadius: "0 26px 0 0 ",
                            }}
                            onClick={() => {
                                handleComplete()
                                changeStep(1)
                                handleJobType("crayon recruit")
                            }}
                        >
                            find my dream team
                        </Button>
                    </Box>
                </Box>
                {/* Crayon Recruit */}
                {/* Crayon Direct */}
                <Box sx={{
                    background: theme.palette.grayBackground,
                    borderRadius: "16px",

                    width: ["100", "100", "48%"],
                    border: 1,
                    borderColor: 'lightgray',
                    height: "fit-content",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "500px"
                }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: "start"
                    }}>
                        <Box sx={{
                            background: "#ffffff",
                            padding: 1,
                            borderRadius: "20px 0px 20px 0px",
                            borderRight: 1,
                            borderBottom: 1,
                            borderColor: "lightgray",
                            display: "flex",
                            alignItems: "center",
                            gap: 1
                        }}>
                            <Box
                                component={"img"}
                                src={crayonDirect}
                                sx={{ width: 33, height: 33 }}
                            />
                            <Typography sx={{
                                fontSize: "15px",
                                fontWeight: 600
                            }}>Crayon Direct</Typography>
                        </Box>
                    </Box>

                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        padding: 3,
                        gap: 2,
                        flexGrow: 1

                    }}>
                        <Box sx={{

                            width: "152px",
                            height: "134px"
                        }}>
                            Image Box
                        </Box>
                        <Typography sx={{
                            fontSize: "40px",
                            fontWeight: 600
                        }}>

                            Crayon Direct
                        </Typography>
                        <Typography sx={{
                            fontSize: "14px",
                            textAlign: "center"
                        }}>

                            You’ve got the time and expertise to find your next rockstar. Be in control of the process from start to finish via your employer dashboard!
                        </Typography>
                    </Box>
                    {crayonDirectExpand && (
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                            marginBottom: 3
                        }}>
                            <Box sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: 2
                            }}>
                                <Box sx={{
                                    background: "white",
                                    textAlign: "center",
                                    fontSize: "48px",
                                    borderRadius: "50%",
                                    width: "84px",
                                    height: "84px",
                                    fontWeight: 600,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "red"
                                }}>
                                    10<span style={{
                                        // margin: "auto",
                                        fontSize: "28px",
                                        // width: "18px",
                                        // height: "30px"
                                    }}>€</span>

                                </Box>
                            </Box>
                            <Box sx={{
                                width: "50%",
                                display: "flex",
                                margin: "auto",
                                flexDirection: "column",
                                gap: 2
                            }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        fontSize: "14px",
                                        gap: 2
                                    }}
                                >
                                    <Typography>Dashboard Management</Typography>
                                    <CheckCircle color='success' />
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        fontSize: "14px",
                                        gap: 2
                                    }}
                                >
                                    <Typography>Auto matching %</Typography>
                                    <CheckCircle color='success' />
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        fontSize: "14px",
                                        gap: 2
                                    }}
                                >
                                    <Typography>Drag and drop candidates</Typography>
                                    <CheckCircle color='success' />
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        fontSize: "14px",
                                        gap: 2
                                    }}
                                >
                                    <Typography>Screening Q&A</Typography>
                                    <CheckCircle color='success' />
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        fontSize: "14px",
                                        gap: 2
                                    }}
                                >
                                    <Typography>Application videos</Typography>
                                    <CheckCircle color='success' />
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        fontSize: "14px",
                                        gap: 2
                                    }}
                                >
                                    <Typography>Application videos</Typography>
                                    <CheckCircle color='success' />
                                </Box>
                            </Box>
                            <Box>
                                <Typography sx={{
                                    textAlign: "center",
                                    fontSize: "14px"
                                }}>we’ve built the tools to get it done</Typography>
                                <Typography sx={{
                                    textAlign: "center",
                                    fontSize: "25px",
                                    fontWeight: "bold"
                                }}>optimise your recruiting process today</Typography>
                                <Typography sx={{
                                    textAlign: "center",
                                    fontSize: "14px"
                                }}>join the hundreds of companies already hiring with Crayon</Typography>
                            </Box>
                        </Box>
                    )}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        {crayonDirectExpand ?
                            <Button
                                variant="contained"
                                color="grayButton200"
                                sx={{
                                    width: "229px",
                                    height: "57px",
                                    fontSize: "15px",
                                    borderRadius: "26px 0 0 0",
                                }}
                            >
                                top-up coins
                            </Button>
                            :
                            <Button
                                variant="contained"
                                color="grayButton200"
                                sx={{
                                    width: "229px",
                                    height: "57px",
                                    fontSize: "15px",
                                    borderRadius: "26px 0 0 0",
                                }}
                                onClick={handleCrayonDirectExpand}
                            >
                                Learn More <ExpandMore />
                            </Button>
                        }
                        <Button
                            variant="contained"
                            color="orangeButton100"
                            sx={{

                                width: "229px",
                                height: "57px",
                                fontSize: "15px",
                                borderRadius: "0 26px 0 0 ",
                            }}
                            onClick={() => {
                                handleComplete()
                                changeStep(1)
                                handleJobType("crayon Direct")
                            }}
                        >
                            I’ll steer myself
                        </Button>
                    </Box>
                </Box>
                {/* Crayon Direct */}

            </Box>
        </Box >
    )
}

export default JobType