import React, { useState } from "react";
import CustomDialog from "../../../common/CustomDialog";
import { Box, Button, InputBase, Paper } from "@mui/material";
import { useTheme } from "@emotion/react";
import SelectMenu from "../../../common/SelectMenu";
import { useSelector } from "react-redux";

export default function AddNew({
  show,
  handleOpen,
  handleAdd,
  handleNewJob,
  newTitle,
  name,
  setValue,
  value,
  dialogText,
}) {
  const theme = useTheme();
  const { typeOfQualification } = useSelector((state) => state.myCv);
  const { country } = useSelector((state) => state.postJobs);

  const handleQualificationType = (event, index) => {
    const {
      target: { value },
    } = event;
    setValue(value);
  };
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
            id="password"
            value={newTitle}
            onChange={handleNewJob}
            placeholder={`Add new ${dialogText}`}
          />
        </Paper>
        {name === "qualification" || name === "town" ? (
          <SelectMenu
            name="required_qualification_id"
            value={value}
            onHandleChange={handleQualificationType}
            options={name === "qualification" ? typeOfQualification : country}
            sx={{
              width: "100%",
              mt: 2,
              border: `1px solid ${theme.palette.grayBorder}`,
              boxShadow: "none !important",
            }}
            placeholder="Select the regionw"
          />
        ) : null}
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
          onClick={() => (name !== "" ? handleAdd(value) : handleAdd())}
        >
          add
        </Button>
      </Box>
    </CustomDialog>
  );
}
