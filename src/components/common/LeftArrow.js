import { Box } from '@mui/material'
import React from 'react'
import leftArrowIcon from "../../assets/Black_Left_Previous.svg"
const LeftArrow = () => {
    return (
        <Box component={"img"} sx={{
            height: 30,
            width: 30
        }}
            src={leftArrowIcon} />
    )
}

export default LeftArrow