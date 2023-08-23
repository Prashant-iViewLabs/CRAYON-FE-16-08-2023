import { Avatar, Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import {
    getFollowCompany,
} from "../../../../redux/candidate/myProfileSlice";

import CompanyListLogo from "../../../../assets/Padding Included/Black_Company_Details.svg";


const DisplayFollowedCompanies = () => {
    const dispatch = useDispatch();
    const [openDialog, setOpenDialog] = useState(false)
    const [followedCompany, setFollowedCompany] = useState([]);

    const getFollowedCompany = async () => {
        try {
            const { payload } = await dispatch(getFollowCompany({ lastKey: "" }));
            if (payload.status === "success") {
                setFollowedCompany(payload.data);
            }
            console.log(payload.data);
        } catch (error) { }
    };

    useEffect(() => {
        if(openDialog){
            getFollowedCompany()
        }
    }, [openDialog])

    return (
        <>
            <Button
                variant="contained"
                color="blueButton700"
                sx={{
                    borderRadius: "0 0 17px 0",
                }}
                onClick={() => setOpenDialog(prevState => !prevState)}
            >
                <Box
                    component="img"
                    sx={{
                        height: 26,
                        width: 26,
                        maxHeight: { xs: 26 },
                        maxWidth: { xs: 26 },
                    }}
                    alt="Company List"
                    src={CompanyListLogo}
                />
            </Button>
            {openDialog ?
                <Box sx={{
                    position: "absolute",
                    top: "63px",
                    right: 0,
                    background: "#ffff",
                    padding: "10px",
                    width: 300,
                    zIndex: 100,
                    borderRadius: "17px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    boxShadow: "-1px 3px 8px rgba(0, 0, 0, 0.1)",
                }}>
                    <Box>
                        <Typography sx={{
                            fontSize: "14px",
                            fontWeight: 900
                        }}>My Companies ({followedCompany?.length})</Typography>
                        <Typography sx={{
                            fontSize: "12px",
                        }}>Below is a list of companies you are following</Typography>
                    </Box>
                    <Box
                        id="talentList"
                        sx={{

                            display: "flex",
                            overflow: "hidden",
                            height: "250px",
                            justifyContent: "flex-start",
                        }}
                    >
                        <InfiniteScroll
                            style={{
                                height: "100%",
                                overflowX: "hidden",
                                scrollbarWidth: "thin",
                            }}
                            dataLength={followedCompany?.length}
                            // next={() => getFollowedCompany(lastKey)}
                            hasMore={true}
                            scrollableTarget="talentList"
                            endMessage={
                                <p style={{ textAlign: "center" }}>
                                    <b>Yay! You have seen it all</b>
                                </p>
                            }
                        >
                            {/* <Box sx={{ display: "flex", width: "100%" }}> */}
                            {/* <Typography
                                    sx={{
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        mr: 1,
                                    }}
                                > */}
                            {console.log(followedCompany)}
                            {followedCompany?.map((item) => {
                                return (
                                    <Box sx={{
                                        display: "flex",
                                        padding: 1,
                                        alignItems: "center",
                                        gap: 1
                                    }}>
                                        <Avatar></Avatar>
                                        <Box>
                                            <Typography
                                                sx={{
                                                    fontSize: "14px",
                                                    fontWeight: 600,
                                                    mr: 1,
                                                }}
                                            >
                                                {item.company.name}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: "12px",
                                                    fontWeight: 600,
                                                    mr: 1,
                                                }}
                                            >
                                                Industry
                                            </Typography>
                                        </Box>

                                    </Box>

                                );
                            })}
                            {/* </Typography> */}
                            {/* </Box> */}
                            <style>
                                {`.infinite-scroll-component::-webkit-scrollbar {
                      width: 7px !important;
                      background-color: #F5F5F5; /* Set the background color of the scrollbar */
                    }

                    .infinite-scroll-component__outerdiv {
                      height:100%;
                      width: 100%;
                    }

                    .infinite-scroll-component::-webkit-scrollbar-thumb {
                      background-color: #888c; /* Set the color of the scrollbar thumb */
                    }`}
                            </style>
                        </InfiniteScroll>
                    </Box>
                </Box >

                : ""}
        </>

    )
}

export default DisplayFollowedCompanies