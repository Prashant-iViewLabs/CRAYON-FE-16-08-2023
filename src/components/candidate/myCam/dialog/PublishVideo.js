import { Box, Button, Paper, Typography, useTheme } from '@mui/material'
import React from 'react'
import YellowStar from '../../../../assets/Characters/Yellow_Star.svg'

const PublishVideo = () => {
    const theme = useTheme()
    return (
        <Paper sx={{
            width: "100%",
            padding: 3,
            paddingBottom: 0,
            display: "flex",
            flexDirection: "column",
            height: "30rem",
            gap: 3
        }}>
            <Box sx={{
                background: theme.palette.mainBackground,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "15px",
                marginBottom: 2,
                gap: 2,
                flexGrow: 1
            }}>
                <Box
                    component={"img"}
                    src={YellowStar}
                    sx={{ width: 200, height: 200, paddingTop: 3, margin: "auto" }}
                />
            </Box>
            <Box>
                <Typography
                    sx={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: 700,
                    }}
                >
                    A star performance!
                </Typography>
                <Typography
                    sx={{
                        textAlign: "center",
                        fontSize: "14px",
                        fontWeight: 700,
                        marginBottom: 3,
                    }}
                >
                    Review, delete or publish your video now.
                </Typography>
            </Box>
            <Box sx={{
                margin: "auto",
                width: "80%"
            }}>
                <Button
                    variant="contained"
                    color="grayButton200"
                    sx={{
                        borderRadius: 0,
                        width: "33.33%",
                        height: "47px",
                        borderTopLeftRadius: 25,
                    }}
                >
                    review
                </Button>
                <Button
                    variant="contained"
                    color="redButton100"
                    sx={{
                        borderRadius: 0,
                        width: "33.33%",
                        height: "47px",
                    }}
                >
                    delete
                </Button>
                <Button
                    variant="contained"
                    color="greenButton200"
                    sx={{
                        borderRadius: 0,
                        width: "33.33%",
                        height: "47px",
                        borderTopRightRadius: 25
                    }}
                >
                    publish
                </Button>
            </Box>
        </Paper>
    )
}

export default PublishVideo