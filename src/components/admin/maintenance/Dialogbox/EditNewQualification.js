import React, { useState } from "react";
import CustomDialog from "../../../common/CustomDialog";
import { Box, Button, InputBase, Paper } from "@mui/material";
import { useTheme } from "@emotion/react";
import SelectMenu from "../../../common/SelectMenu";
import { useSelector } from "react-redux";
import AutoComplete from "../../../common/AutoComplete";

export default function EditNewQualification({
  show,
  handleOpen,
  currQualification,
  currQualificationType,
  handleEditQual,
  handleEdit,
  existingQualification,
  existingQualificationType,
}) {
  const theme = useTheme();
  const { typeOfQualification, qualification } = useSelector(
    (state) => state.myCv
  );

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
            id="current_qualification"
            value={currQualification}
            onChange={handleEditQual}
            placeholder={"Edit current qualification title"}
          />
        </Paper>
        <SelectMenu
          name="required_qualification_id"
          value={currQualificationType}
          onHandleChange={handleEditQual}
          options={typeOfQualification}
          sx={{
            width: "100%",
            mt: 2,
            border: `1px solid ${theme.palette.grayBorder}`,
            boxShadow: "none !important",
          }}
          placeholder="Enter the minimum required qualification level"
        />
      </Box>
      <div style={{ display: "flex", alignItems: "center" }}>
        <hr style={{ flexGrow: 1, marginRight: "10px" }} />
        <span>Or</span>
        <hr style={{ flexGrow: 1, marginLeft: "10px" }} />
      </div>
      <Box
        sx={{
          padding: 4,
        }}
      >
        <AutoComplete
          id="qualification_id"
          value={existingQualification}
          onChange={handleEditQual}
          sx={{ width: "100%" }}
          placeholder="Change from existing qualification"
          data={qualification}
        ></AutoComplete>
        <SelectMenu
          name="existing_required_qualification_id"
          value={existingQualificationType}
          onHandleChange={handleEditQual}
          options={typeOfQualification}
          sx={{
            width: "100%",
            mt: 2,
            border: `1px solid ${theme.palette.grayBorder}`,
            boxShadow: "none !important",
          }}
          placeholder="Enter the minimum required qualification level"
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
