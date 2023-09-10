import {
  Box,
  Button,
  Grid,
  ListItemText,
  Menu,
  MenuItem,
  Popover,
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
import DOWN from "../../../../assets/Padding Excluded/Black_Down_Open.svg";
import UP from "../../../../assets/Padding Excluded/Black_Up_Close.svg";
import upClose from "../../../../assets/Padding Included/Black_Up_Close.svg";
import downClose from "../../../../assets/Padding Included/Black_Down_Open.svg";
import AddToPool from "./AddToPool";
import AddToJob from "./AddToJob";

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
          endIcon={
            <Box
              component="img"
              className="eye"
              alt="eye logo"
              src={anchorEl ? UP : DOWN}
              sx={{
                height: 12,
                width: 12,
              }}
            />
          }
        >
          add to pool
        </Button>

        <Popover
          id="dropdown-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          sx={{
            "& .MuiPaper-root-MuiPopover-paper": {
              minWidth: "18% !important",
              borderRadius: "20px !important",
              mt: 2,
            },
          }}
        >
          <AddToPool talentData={tableData} addToPool={addToPool} />
        </Popover>
        <Button
          id="broad"
          aria-controls={jobClick ? "broad-menu-job" : undefined}
          aria-haspopup="true"
          aria-expanded={jobClick ? "true" : undefined}
          onClick={handleAddJobClick}
          variant="contained"
          endIcon={
            <Box
              component="img"
              className="eye"
              alt="eye logo"
              src={jobClick ? upClose : downClose}
              sx={{
                height: 12,
                width: 12,
              }}
            />
          }
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
        <Popover
          id="broad-menu-job"
          anchorEl={jobClick}
          open={Boolean(jobClick)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={{
            "& .MuiPaper-root-MuiPopover-paper": {
              minWidth: "18% !important",
              borderRadius: "20px !important",
              mt: 2,
            },
          }}
        >
          <AddToJob talentJob={talentJobs} addToJob={addToJob} talentContent={talentContent}/>
        </Popover>
      </Grid>
    </Grid>
  );
}
