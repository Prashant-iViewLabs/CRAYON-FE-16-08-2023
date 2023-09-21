import { Box } from '@mui/material'
import React from 'react'
import RightArrowIcon from "../../assets/Black_Right_Next.svg"
const RightArrow = () => {
    return (
        <Box component={"img"} sx={{
            height: 30,
            width: 30
        }}
            src={RightArrowIcon} />
    )
}

export default RightArrow