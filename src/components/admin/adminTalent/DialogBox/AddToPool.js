import { Box, Popover, Typography } from "@mui/material";
import React from "react";
import Ozow from "../../../../assets/Company Logos/Screenshot 2023-08-11 at 12.21.50.png";
import InfiniteScroll from "react-infinite-scroll-component";
// import logo from "../../../../assets/Company Logos/Ogilvy Restructures.jpg";

export default function AddToPool({ talentData, addToPool }) {
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
        Add to pool
      </Typography>
      <Typography sx={{ fontSize: "11px", fontWeight: 700, mt: 1 }}>
        Select the talent you want to add to a existing pool or <br /> create a
        new pool and add.
      </Typography>

      <Box>
        <Box
          id="talentList"
          sx={{ overflow: "hidden", height: "380px", mt: 1 }}
        >
          <InfiniteScroll
            style={{
              height: "100%",
              overflowX: "hidden",
              scrollbarWidth: "thin",
            }}
            dataLength={talentData?.length}
            // next={() => getJobList(lastKey)}
            hasMore={true}
            scrollableTarget="talentList"
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {talentData.map((item, index) => {
              return (
                <Box sx={{ display: "flex", mt: 2 }}>
                  <Box
                    component="img"
                    className="profileAvatar"
                    alt="crayon logo"
                    src={item?.profile_url}
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
                        cursor: "pointer",
                      }}
                      key={index}
                      onClick={() =>
                        addToPool(talentData?.user_id, item?.pool_id)
                      }
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
