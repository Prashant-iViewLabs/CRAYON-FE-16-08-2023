import React, { useState } from "react";
import CustomDialog from "../../../common/CustomDialog";
import { Box, Button, InputBase, Paper } from "@mui/material";
import { useTheme } from "@emotion/react";
import SelectMenu from "../../../common/SelectMenu";
import { useSelector } from "react-redux";

export default function AddNewQualification({
  show,
  handleOpen,
  handleAdd,
  handleNewJob,
  newTitle,
  reference,
  level,
}) {
  const theme = useTheme();
  return (
    <CustomDialog
      show={show}
      hideButton={false}
      dialogWidth="xs"
      showFooter={false}
      onDialogClose={handleOpen}
      padding={0}
    >
      <Box
        sx={{
          padding: 4,
        }}
      >
        <Paper
          sx={{
            mb: 2,
            display: "flex",
            height: "40px",
            borderRadius: "25px",
            boxShadow: "none",
            border: `1px solid ${theme.palette.grayBorder}`,
          }}
        >
          <InputBase
            sx={{ ml: 2, mr: 2, width: "100%" }}
            id="typename"
            value={newTitle}
            onChange={handleNewJob}
            placeholder={"Qualification type name"}
          />
        </Paper>
        <Paper
          sx={{
            mb: 2,
            display: "flex",
            height: "40px",
            borderRadius: "25px",
            boxShadow: "none",
            border: `1px solid ${theme.palette.grayBorder}`,
          }}
        >
          <InputBase
            sx={{ ml: 2, mr: 2, width: "100%" }}
            id="reference"
            value={reference}
            onChange={handleNewJob}
            placeholder={"Qualification reference"}
          />
        </Paper>
        <Paper
          sx={{
            display: "flex",
            height: "40px",
            borderRadius: "25px",
            boxShadow: "none",
            border: `1px solid ${theme.palette.grayBorder}`,
          }}
        >
          <InputBase
            sx={{ ml: 2, mr: 2, width: "100%" }}
            id="level"
            value={level}
            onChange={handleNewJob}
            placeholder={"Qualification level"}
            type="number"
          />
        </Paper>
      </Box>
      <Box>
        <Button
          sx={{
            boxShadow: 0,
            fontSize: "14px",
            width: "50%",
            borderRadius: 0,
            height: "43px",
            background: "lightgray",
            color: "black",
            padding: 3,
          }}
          variant="contained"
          onClick={handleOpen}
        >
          cancel
        </Button>
        <Button
          sx={{
            boxShadow: 0,
            fontSize: "14px",
            width: "50%",
            borderRadius: 0,
            height: "43px",
            padding: 3,
          }}
          variant="contained"
          color="redButton100"
          onClick={() => handleAdd(newTitle, reference, level)}
        >
          add
        </Button>
      </Box>
    </CustomDialog>
  );
}
