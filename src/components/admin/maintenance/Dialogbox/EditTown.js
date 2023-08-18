import React, { useState } from "react";
import CustomDialog from "../../../common/CustomDialog";
import { Box, Button, InputBase, Paper } from "@mui/material";
import { useTheme } from "@emotion/react";
import SelectMenu from "../../../common/SelectMenu";
import { useSelector } from "react-redux";
import AutoComplete from "../../../common/AutoComplete";

export default function EditTown({
  show,
  handleOpen,
  currQualification,
  currQualificationType,
  handleEditQual,
  handleEdit,
}) {
  const theme = useTheme();
  const { country } = useSelector((state) => state.postJobs);

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
            display: "flex",
            height: "40px",
            borderRadius: "25px",
            boxShadow: "none",
            border: `1px solid ${theme.palette.grayBorder}`,
          }}
        >
          <InputBase
            sx={{ ml: 2, mr: 2, width: "100%" }}
            id="current_town"
            value={currQualification}
            onChange={handleEditQual}
            placeholder={"Edit current town title"}
          />
        </Paper>
        <SelectMenu
          name="required_region_id"
          value={currQualificationType}
          onHandleChange={handleEditQual}
          options={country}
          sx={{
            width: "100%",
            mt: 2,
            border: `1px solid ${theme.palette.grayBorder}`,
            boxShadow: "none !important",
          }}
          placeholder="Select the region"
        />
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
          onClick={handleEdit}
        >
          edit
        </Button>
      </Box>
    </CustomDialog>
  );
}
