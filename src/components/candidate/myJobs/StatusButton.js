import { Box, Button, Menu, styled } from '@mui/material'
import React, { useState } from 'react'

import Like from '../../../assets/StatusIcons/Like.svg';
import Pending from '../../../assets/StatusIcons/Pending.svg';
import IloveThis from '../../../assets/StatusIcons/Black_I_Love_This.svg';
import NotForMe from '../../../assets/StatusIcons/Black_Reject.svg';

const statusIconComponents = {
    "pending": Pending,
    "i like this": Like,
    "i love this": IloveThis,
    "not for me": NotForMe,
};

const StyledMenu = styled((props) => (
    <Menu
        elevation={4}
        // anchorOrigin={{
        //   vertical: "bottom",
        //   horizontal: "right",
        // }}
        // transformOrigin={{
        //     vertical: 'top',
        //     horizontal: 'right',
        // }}
        anchorOrigin={{
            vertical: "top",
            horizontal: "right",
        }}
        transformOrigin={{
            vertical: "bottom",
            horizontal: "right",
        }}
        {...props}
    />
))(({ theme }) => ({
    "& .MuiPaper-root": {
        borderRadius: "10px 10px 0 0",
        color:
            theme.palette.mode === "light"
                ? "rgb(55, 65, 81)"
                : theme.palette.grey[300],
        backgroundColor: theme.palette.menuBackground,

        "& .MuiList-root": {
            paddingTop: 0,
        },
        // boxShadow:
        //     'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        // '& .MuiMenu-list': {
        //     padding: '4px 0',
        // },
        // '& .MuiMenuItem-root': {
        //     '& .MuiSvgIcon-root': {
        //         fontSize: 18,
        //         color: theme.palette.text.secondary,
        //         marginRight: theme.spacing(1.5),
        //     },
        //     '&:active': {
        //         backgroundColor: alpha(
        //             theme.palette.primary.main,
        //             theme.palette.action.selectedOpacity,
        //         ),
        //     },
        // },
        "& .MuiTypography-root": {
            fontSize: "10px",
            fontWeight: 700,
        },
        "& .MuiMenu-list": {
            padding: 0,
        },
        "& .MuiButton-root": {
            fontSize: 10
        }
    },
    "& .MuiFormControlLabel-root": {
        height: "40px",
        "& .MuiTypography-root": {
            fontSize: "10px",
            color: theme.palette.lightText,
            fontWeight: 400,
        },
    },
}));
const StatusButton = ({ selectedStatus, options, handleStatusChange }) => {
    // const [selectedStatus, setSelectedStatus] = useState()

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const setButtonColor = (name) => {
        switch (name) {
            case "pending":
                return "yellowButton200"
            case 'i like this':
                return "blueButton700"
            case 'not for me':
                return "redButton"
            case 'i love this':
                return "pinkButton100"
            default:
                return "grayButton100"
        }
    }
    return (
        <>
            <Button
                sx={{
                    borderRadius: 0,
                    height: "100%",
                    width: "100%",
                    fontSize: "10px",
                    padding: 0
                }}
                startIcon={<Box
                    component="img"
                    sx={{
                        height: 16,
                        width: 16,
                        maxHeight: { xs: 15 },
                        maxWidth: { xs: 15 },
                    }}
                    alt="Status"
                    src={statusIconComponents[selectedStatus]}
                />}
                color={setButtonColor(selectedStatus)}
                variant='contained'
                onClick={handleClick}
            >
                {selectedStatus}
            </Button >
            <StyledMenu
                id="customized-menu"
                MenuListProps={{
                    "aria-labelledby": "customized-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                }}>
                    {options.map(status => {
                        const IconComponent = statusIconComponents[status.name];
                        return (
                            <Button variant='contained'
                                startIcon={
                                    <Box
                                        component="img"
                                        sx={{
                                            height: 16,
                                            width: 16,
                                            maxHeight: { xs: 15 },
                                            maxWidth: { xs: 15 },
                                        }}
                                        alt="Status"
                                        src={IconComponent}
                                    />}
                                color={setButtonColor(status.name)}
                                sx={{
                                    borderRadius: 0,
                                    paddingY: 3,
                                    display: "flex",
                                    justifyContent: "start",
                                }}
                                onClick={() => {
                                    handleStatusChange(status.id)
                                    handleClose()
                                }}
                            >
                                {status.name}
                            </Button>
                        )
                    })}
                </Box>
            </StyledMenu>
        </>
    )
}

export default StatusButton