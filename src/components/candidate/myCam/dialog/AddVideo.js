import { Box, Button, Paper, Typography, useTheme } from '@mui/material'
import React from 'react'
import greenDiamond from '../../../../assets/Characters/Green_Diamond.svg'
import UploadIcon from '../../../../assets/Padding Excluded/Black_Upload.svg'
import { Videocam } from '@mui/icons-material';

const AddVideo = ({ nextStep }) => {
    const theme = useTheme()
    return (
        <Paper sx={{
            padding: 3,
            paddingBottom: 0,
            display: "flex",
            flexDirection: "column",
            gap: 3,
            justifyContent: "space-between",
            height: "35rem"
        }}>
            <Box sx={{
                background: theme.palette.mainBackground,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "15px",
                flexGrow: 1
            }}>
                <Box
                    component={"img"}
                    src={greenDiamond}
                    sx={{ width: 170, height: 150 }}
                />
                <Typography
                    sx={{
                        fontSize: "20px",
                        fontWeight: 700,
                    }}
                >
                    Add a new Crayon Cam video
                </Typography>
                <Typography
                    sx={{
                        textAlign: "center",
                        fontSize: "14px",
                        fontWeight: 700,
                    }}
                >
                    Record or upload a 1min video about who are and what makes you a<br /> competitive candidate
                </Typography>
            </Box>
            <Box>

                <Typography
                    sx={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: 700,
                    }}
                >
                    Remember to just be you!
                </Typography>
                <Typography
                    sx={{
                        textAlign: "center",
                        fontSize: "14px",
                        fontWeight: 700,
                    }}
                >
                    Highlight ypur skills, the tools you use and what the next steps in your<br /> career would be
                </Typography>
            </Box>

            <Box sx={{
                margin: "auto",
                width: "80%"
            }}>
                <Button
                    variant="contained"
                    color="blueButton700"
                    sx={{
                        borderRadius: 0,
                        width: "50%",
                        height: "47px",
                        borderTopLeftRadius: 25
                    }}
                    startIcon={<Videocam />}
                    onClick={() => nextStep(2)}
                >
                    Record Video
                </Button>
                <Button
                    variant="contained"
                    color='yellowButton100'
                    sx={{
                        borderRadius: 0,
                        width: "50%",
                        height: "47px",
                        borderTopRightRadius: 25
                    }}
                    startIcon={
                        <Box
                            component={"img"}
                            src={UploadIcon}
                            sx={{ height: 15 }}
                        />
                    }
                >
                    {/* {i18n["topBar.join"]} */}
                    Upload Video
                </Button>
            </Box>
        </Paper>
    )
}

export default AddVideo