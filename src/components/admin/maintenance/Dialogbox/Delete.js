import React, { useEffect, useState } from "react";
import CustomDialog from "../../../common/CustomDialog";
import { Box, Button, Switch, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { alpha } from "@material-ui/core";

const BlueSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: theme.palette.greenButton.main,
    "&:hover": {
      backgroundColor: alpha(
        theme.palette.greenButton.main,
        theme.palette.action.hoverOpacity
      ),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: theme.palette.greenButton.main,
  },
  "& .MuiSwitch-track": {
    margin: "auto",
    height: "60% !important",
  },
  "& .css-jsexje-MuiSwitch-thumb": {
    borderRadius: "15% !important",
  },
  "& .css-5ryogn-MuiButtonBase-root-MuiSwitch-switchBase": {
    borderRadius: "15% !important",
  },
  "& .MuiSwitch-thumb": {
    borderRadius: "15% !important",
  },
}));

export default function Delete({
  show,
  handleOpen,
  handleDelete,
  dialogText,
  confirmDelete,
  handleCancel,
  setConfirmDelete,
}) {
  // const [isSwitchSelected, setIsSwitchSelected] = useState(false);
  // const [showError, setShowError] = useState(false);

  // const handleSwitchChange = (event) => {
  //   setIsSwitchSelected(event.target.checked);
  //   setShowError(false); // Hide the error when the switch is selected
  // };

  // const handleSubmit = () => {
  //   if (!isSwitchSelected) {
  //     setShowError(true); // Show the error if switch is not selected on submit
  //   } else {
  //     handleDelete(); // Call the handleDelete function if the switch is selected
  //   }
  // };

  const handleDeleteConfirm = (event) => {
    setConfirmDelete(event.target.checked);
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
        <Typography
          variant="h5"
          fontWeight={"Bold"}
          textAlign={"center"}
          sx={{
            marginBottom: 3,
          }}
        >
          Sure you want to delete?
        </Typography>
        <Typography
          fontSize={16}
          fontWeight={"bold"}
          textAlign={"center"}
          paragraph
        >
          Please confirm that you want to delete the selected {dialogText}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>Click to confirm</Typography>

          {/* <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BlueSwitch
              checked={isSwitchSelected}
              onChange={handleSwitchChange}
            />
            {showError && (
              <Typography variant="body2" color="error">
                Please select the switch
              </Typography>
            )}
          </Box>*/}
          {console.log(confirmDelete)}
          <BlueSwitch
            checked={confirmDelete}
            onChange={(event) => handleDeleteConfirm(event)}
          />
        </Box>
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
          onClick={handleCancel}
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
          onClick={handleDelete}
          disabled={!confirmDelete}
        >
          continue
        </Button>
      </Box>
    </CustomDialog>
  );
}
