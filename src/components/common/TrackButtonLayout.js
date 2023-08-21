import { Box, Button } from '@mui/material'
import React from 'react'

const TrackButtonLayout = ({colorPattern}) => {
    return (
        <Box sx={{
            display: "flex",
            paddingTop: 1,
            gap: 0.2,
        }}>
            <Button variant="contained"
                color={colorPattern[0]}
                sx={{
                    height: "6px",
                    minWidth: 10,
                    padding: "0px",
                    borderRadius: "5px 0 0 5px"
                }}></Button>
            <Button variant="contained" color={colorPattern[1]} sx={{
                height: "6px",
                minWidth: 10,
                padding: "0px",
                borderRadius: 0
            }}></Button>
            <Button variant="contained" color={colorPattern[2]} sx={{
                height: "6px",
                minWidth: 10,
                borderRadius: 0,
                padding: "0px"
            }}></Button>
            <Button variant="contained" color={colorPattern[3]} sx={{
                height: "6px",
                minWidth: 10,
                padding: "0px",
                borderRadius: "0 5px 5px 0"
            }}></Button>
        </Box>
    )
}

export default TrackButtonLayout