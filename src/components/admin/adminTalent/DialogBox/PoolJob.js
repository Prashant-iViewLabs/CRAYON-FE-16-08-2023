import {
  Box,
  Button,
  Grid,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import SingleRadialChart from "../../../common/SingleRadialChart";
import { useTheme } from "@emotion/react";
import SmallButton from "../../../common/SmallButton";
import locale from "../../../../i18n/locale";
import InfiniteScroll from "react-infinite-scroll-component";
import { AddToPhotosOutlined } from "@mui/icons-material";

const label1 = "applied";
const label2 = "shortlisted";
const label3 = "interviewed";

export default function PoolJob({
  handleClick,
  tableData,
  handleClose,
  talentContent,
  addToPool,
  anchorEl,
  jobClick,
  talentJobs,
  addToJob,
  handleAddJobClick,
}) {
  const theme = useTheme();
  const i18n = locale.en;

  return (
    <Grid
      sx={{
        border: "2px solid lightgray",
        borderRadius: "20px",
        overflow: "hidden",
        width: "90%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          //   gap: 3,
        }}
      >
        <Box sx={{}}>
          <SingleRadialChart
            hollow="55%"
            nameSize="11px"
            valueSize="14px"
            // nameOffsetY="11"
            // valueOffsetY="-17"
            labelsData={"shortlisted"}
            series={[10]}
            width={130}
            color={theme.palette.lightGreenButton300.main}
          />
        </Box>
        <Box sx={{}}>
          <SingleRadialChart
            hollow="55%"
            nameSize="11px"
            valueSize="14px"
            // nameOffsetY="11"
            // valueOffsetY="-17"
            labelsData={"applied"}
            max={1000}
            series={[34]}
            width={130}
            color={theme.palette.lightGreenButton300.main}
          />
        </Box>

        <Box sx={{}}>
          <SingleRadialChart
            hollow="55%"
            nameSize="11px"
            valueSize="14px"
            // nameOffsetY="11"
            // valueOffsetY="-17"
            labelsData={"interviewed"}
            series={[3]}
            width={130}
            color={theme.palette.lightGreenButton300.main}
          />
        </Box>
      </Box>
      <Grid
        container
        // padding="0 8px 8px 8px"
        alignItems="center"
        overflow={"hidden"}
        sx={{
          width: "100%",
          height: 51,
        }}
      >
        <Button
          variant="contained"
          sx={{
            borderRadius: 0,
            width: "33.33%",
            height: "100%",
            fontSize: "14px",
          }}
          color="blueButton200"
          //   onClick={handleMatchMeButton}
        >
          Match me
        </Button>
        <Button
          variant="contained"
          id="broad"
          aria-controls={anchorEl ? "broad-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={anchorEl ? "true" : undefined}
          sx={{
            borderRadius: 0,
            width: "33.33%",
            height: "100%",
            fontSize: "14px",
          }}
          color="grayButton200"
          onClick={handleClick}
        >
          add to pool
        </Button>
        <Menu
          id="broad-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          PaperProps={{
            style: {
              width: "160px",
            },
          }}
        >
          <Box id="talentList" sx={{ overflow: "hidden", height: "100px" }}>
            <InfiniteScroll
              style={{
                height: "100%",
                overflowX: "hidden",
                scrollbarWidth: "thin",
              }}
              dataLength={tableData?.length}
              // next={() => getJobList(lastKey)}
              hasMore={true}
              scrollableTarget="talentList"
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {tableData.map((option, index) => (
                <MenuItem
                  key={index}
                  onClick={() =>
                    addToPool(talentContent?.user_id, option?.pool_id)
                  }
                >
                  <ListItemText primary={option.title} />
                </MenuItem>
              ))}
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
        </Menu>
        <Button
          id="broad"
          aria-controls={jobClick ? "broad-menu-job" : undefined}
          aria-haspopup="true"
          aria-expanded={jobClick ? "true" : undefined}
          onClick={handleAddJobClick}
          variant="contained"
          sx={{
            borderRadius: 0,
            width: "33.33%",
            height: "100%",
            fontSize: "14px",
          }}
          color="redButton100"
        >
          add to job
        </Button>
        <Menu
          id="broad-menu-job"
          anchorEl={jobClick}
          open={Boolean(jobClick)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          PaperProps={{
            style: {
              width: "150px",
            },
          }}
        >
          <Box id="talentList" sx={{ overflow: "hidden", height: "100px" }}>
            <InfiniteScroll
              style={{
                height: "100%",
                overflowX: "hidden",
                scrollbarWidth: "thin",
              }}
              dataLength={talentJobs?.length}
              // next={() => getJobList(lastKey)}
              hasMore={true}
              scrollableTarget="talentList"
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {talentJobs.map((option, index) => (
                <MenuItem
                  key={index}
                  onClick={(event) => addToJob(event, talentContent?.user_id)}
                >
                  <Tooltip title={option?.title} placement="top-end">
                    <ListItemText
                      sx={{
                        width: "120px",
                        whiteSpace: "nowrap", // Prevents text from wrapping
                        overflow: "hidden", // Hides any overflowing content
                        textOverflow: "ellipsis",
                      }}
                      primary={option?.title}
                    />
                  </Tooltip>
                </MenuItem>
              ))}
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
        </Menu>
      </Grid>
    </Grid>
  );
}
