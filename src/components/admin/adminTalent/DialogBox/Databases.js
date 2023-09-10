import { Box, Popover, Typography } from "@mui/material";
import React from "react";
import Ozow from "../../../../assets/Company Logos/Ogilvy Restructures.jpg";
import InfiniteScroll from "react-infinite-scroll-component";
// import logo from "../../../../assets/Company Logos/Ogilvy Restructures.jpg";

export default function Databases({
  openPersonality,
  anchorElPersonality,
  handlePopoverClose,
}) {
  const companies = [
    { name: "Ozow", title: "industry" },
    { name: "Ozow", title: "industry" },
    { name: "Ozow", title: "industry" },
    { name: "Ozow", title: "industry" },
    { name: "Ozow", title: "industry" },
    { name: "Ozow", title: "industry" },
    { name: "Ozow", title: "industry" },
    { name: "Ozow", title: "industry" },
    { name: "Ozow", title: "industry" },
    { name: "Ozow", title: "industry" },
    { name: "Ozow", title: "industry" },
    { name: "Ozow", title: "industry" },
  ];
  return (
    <Box
      sx={{
        padding: "16px !important",
      }}
    >
      <Typography
        sx={{
          fontSize: "12px",
          fontWeight: 700,
        }}
      >
        Databases (7)
      </Typography>
      <Typography sx={{ fontSize: "11px", fontWeight: 700 }}>
        Below is the list of databases this user is linked to
      </Typography>

      <Box>
        <Box
          id="talentList"
          sx={{ overflow: "hidden", height: "380px", mt: 2 }}
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
                    src={Ozow}
                    sx={{
                      mr: 1,
                      height: "35px !important",
                      width: "35px !important",
                      borderRadius: "5px",
                    }}
                  />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 700,
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 700,
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
