import React from 'react'
import BlueChilled from '../../../assets/Characters/Blue_Chilled.svg'
import YellowStar from '../../../assets/Characters/Yellow_Star.svg'
import GreenTriangle from '../../../assets/Characters/Green_Triangle_Happy.svg'
import RedRectangle from '../../../assets/Characters/Red_Retangle.svg'
import { Box } from '@mui/material'

const IconSection = () => {
    return (
        <Box
            sx={{
                width: "200px",
                display: "flex",
            }}
        >
            <Box sx={{
                width: "25%",
            }}>
                <Box
                    component={"img"}
                    src={BlueChilled}
                    sx={{
                        height: "65px",
                        width: "65px"
                    }}
                />
            </Box>
            <Box sx={{
                width: "25%",
                zIndex: 3
            }}>
                <Box
                    component={"img"}
                    src={YellowStar}
                    sx={{
                        height: "70px",
                        width: "70px"
                    }}
                />
            </Box>
            <Box sx={{
                width: "25%",
                zIndex: 2
            }}>

                <Box
                    component={"img"}
                    src={GreenTriangle}
                    sx={{
                        height: "65px",
                        width: "65px",
                    }}
                />
            </Box>
            <Box sx={{
                width: "25%",
                zIndex:1
            }}>
                <Box
                    component={"img"}
                    src={RedRectangle}
                    sx={{
                        height: "60px",
                        width: "60px",
                    }}
                />
            </Box>
        </Box>
    )
}

export default IconSection