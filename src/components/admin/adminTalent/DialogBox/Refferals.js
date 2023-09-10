import { Box, Popover, Typography } from "@mui/material";
import React from "react";
import Profile from "../../../../assets/Profile/Screenshot 2023-08-09 at 07.49.52.png";
import InfiniteScroll from "react-infinite-scroll-component";
export default function Refferals() {
  const companies = [
    {
      name: "Michael Legend Michael Legend",
      title: "Independent Financial Consultant Part Time CFO/FD",
    },
    { name: "Jhon Peters", title: "Senior Copywriter" },
    { name: "Mike White", title: "Senior Art Director" },
    { name: "Cindy Larter", title: "Creative Director" },
    {
      name: "Michael Legend Michael Legend",
      title: "Independent Financial Consultant Part Time CFO/FD",
    },
    { name: "Jhon Peters", title: "Senior Copywriter" },
    { name: "Mike White", title: "Senior Art Director" },
    { name: "Cindy Larter", title: "Creative Director" },
    {
      name: "Michael Legend Michael Legend",
      title: "Independent Financial Consultant Part Time CFO/FD",
    },
    { name: "Jhon Peters", title: "Senior Copywriter" },
    { name: "Mike White", title: "Senior Art Director" },
    { name: "Cindy Larter", title: "Creative Director" },
  ];
  return (
    <Box
      sx={{
        padding: "16px !important",
      }}
    >
      <Typography sx={{ fontSize: "11px", fontWeight: 700 }}>
        Below is a list of referred user linked to this candidate
      </Typography>

      <Box>
        <Box
          id="talentList"
          sx={{ overflow: "hidden", height: "350px", mt: 1 }}
        >
          <InfiniteScroll
            style={{
              height: "100%",
              overflowX: "hidden",
              scrollbarWidth: "thin",
            }}
            dataLength={companies?.length}
            // next={() => getJobList(lastKey)}
            hasMore={true}
            scrollableTarget="talentList"
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {companies.map((item, index) => {
              return (
                <Box sx={{ display: "flex", mt: 2 }}>
                  <Box
                    component="img"
                    className="profileAvatar"
                    alt="crayon logo"
                    src={Profile}
                    sx={{
                      mr: 1,
                      height: "50px !important",
                      width: "50px !important",
                      borderRadius: "5px",
                    }}
                  />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 700,
                        width: "100px",
                        whiteSpace: "nowrap", // Prevents text from wrapping
                        overflow: "hidden", // Hides any overflowing content
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 700,
                        width: "170px",
                        // whiteSpace: "nowrap", // Prevents text from wrapping
                        // overflow: "hidden", // Hides any overflowing content
                        // textOverflow: "ellipsis",
                      }}
                    >
                      {item.title}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
            <style>
              {`.infinite-scroll-component::-webkit-scrollbar {
                          width: 7px !important;
                          background-color: #F5F5F5; /* Set the background color of the scrollbar */
                        }

                        .infinite-scroll-component__outerdiv {
                          height:100%
                        }

                        .infinite-scroll-component::-webkit-scrollbar-thumb {
                          background-color: #888c; /* Set the color of the scrollbar thumb */
                        }`}
            </style>
          </InfiniteScroll>
        </Box>
      </Box>
    </Box>
  );
}
