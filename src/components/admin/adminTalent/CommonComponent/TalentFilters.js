import React, { useState } from 'react'
import { Box, InputBase, Paper, Typography, useTheme } from '@mui/material'
import SmallButtonTalent from '../../../common/SmallButtonTalent'

import activeDownClose from "../../../../assets/Black_Down_Open - Copy.svg";
import SelectMenu from '../../../common/SelectMenu';


const TalentFilters = ({
    title,
    totlaCount,
    handleJobRoleChange,
    stageArray,
    handleInputSearch
}) => {
    const theme = useTheme();
    return (
        <Box sx={{ ml: 0 }}>
            <Paper sx={{ p: 3, borderRadius: "20px", mt: 3 }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "19%",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "24px",
                            fontWeight: 700,
                            // ml: 6
                        }}
                    >
                        {/* i18n["allTalent.title"]} */}
                        {title}
                    </Typography>
                    <SmallButtonTalent
                        fontWeight={900}
                        textColor={"#000"}
                        color="grayButton200"
                        label={totlaCount}
                        mr={1}
                        alignItems={"flex-end"}
                    />
                </Box>

                <Box sx={{ display: "flex" }} gap={3} mt={2}>
                    <Paper
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "40px",
                            borderRadius: "25px",
                            boxShadow: "none",
                            border: `1px solid ${theme.palette.grayBorder}`,
                            width: "50%",
                        }}
                    >
                        <InputBase
                            id="keyword"

                            name="job_role_type"
                            // value={title}
                            // onChange={handleInputSearch}
                            onChange={(event) => {
                                handleInputSearch(event);
                            }}
                            placeholder={"Enter quick search term..."}
                            sx={{ ml: 2, mr: 2, width: "100%" }}
                        />
                    </Paper>

                    <Paper
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "40px",
                            borderRadius: "25px",
                            boxShadow: "none",
                            border: `1px solid ${theme.palette.grayBorder}`,
                            width: "50%",
                        }}
                    >
                        <InputBase
                            id="job_stage"
                            // value={title}
                            // onChange={handleInputSearch}
                            placeholder={"Stage"}
                            sx={{ ml: 2, mr: 2, width: "100%" }}
                        />
                        <SelectMenu
                            name="job_role_type"
                            //   value={value}
                            onHandleChange={handleJobRoleChange}
                            options={stageArray}
                            placeholder={"Job stage"}
                        />
                    </Paper>
                </Box>
                <Box sx={{ display: "flex" }} gap={3} mt={2}>
                    <Paper
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "40px",
                            borderRadius: "25px",
                            boxShadow: "none",
                            border: `1px solid ${theme.palette.grayBorder}`,
                            width: "50%",
                        }}
                    >
                        <InputBase
                            id="keyword"
                            // value={title}
                            // onChange={handleInputSearch}
                            placeholder={"Status"}
                            sx={{ ml: 2, mr: 2, width: "100%" }}
                        />
                        <Box
                            component="img"
                            className="eye"
                            alt="eye logo"
                            src={activeDownClose}
                            sx={{
                                height: 25,
                                width: 25,
                                mr: 1,
                            }}
                        />
                    </Paper>

                    <Paper
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "40px",
                            borderRadius: "25px",
                            boxShadow: "none",
                            border: `1px solid ${theme.palette.grayBorder}`,
                            width: "50%",
                        }}
                    >
                        <InputBase
                            id="job_stage"
                            // value={title}
                            // onChange={handleInputSearch}
                            placeholder={"Associated jobs"}
                            sx={{ ml: 2, mr: 2, width: "100%" }}
                        />
                        <Box
                            component="img"
                            className="eye"
                            alt="eye logo"
                            src={activeDownClose}
                            sx={{
                                height: 25,
                                width: 25,
                                mr: 1,
                            }}
                        />
                    </Paper>
                </Box>
                <Box sx={{ display: "flex" }} gap={3} mt={2}>
                    <Paper
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "40px",
                            borderRadius: "25px",
                            boxShadow: "none",
                            border: `1px solid ${theme.palette.grayBorder}`,
                            width: "50%",
                        }}
                    >
                        <InputBase
                            id="keyword"
                            // value={title}
                            // onChange={handleInputSearch}
                            placeholder={"Talent Pools"}
                            sx={{ ml: 2, mr: 2, width: "100%" }}
                        />
                        <Box
                            component="img"
                            className="eye"
                            alt="eye logo"
                            src={activeDownClose}
                            sx={{
                                height: 25,
                                width: 25,
                                mr: 1,
                            }}
                        />
                    </Paper>
                    <Paper
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "40px",
                            borderRadius: "25px",
                            boxShadow: "none",
                            border: `1px solid ${theme.palette.grayBorder}`,
                            width: "50%",
                            opacity: 0,
                        }}
                    >
                        <InputBase
                            id="keyword"
                            // value={title}
                            // onChange={handleInputSearch}
                            placeholder={"Job status"}
                            sx={{ ml: 2, mr: 2, width: "100%" }}
                            disabled
                        />
                        <Box
                            component="img"
                            className="eye"
                            alt="eye logo"
                            src={activeDownClose}
                            sx={{
                                height: 25,
                                width: 25,
                                mr: 1,
                            }}
                        />
                    </Paper>
                </Box>
            </Paper>

        </Box>
    )
}

export default TalentFilters