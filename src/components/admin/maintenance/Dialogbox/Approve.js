import React, { useEffect, useState } from "react";
import CustomDialog from "../../../common/CustomDialog";
import { Box, Button, Switch, Typography } from "@mui/material";

export default function Approve({
  show,
  handleOpen,
  handleCancel,
  handleApprove,
  jobID,
  approveEvent,
  dialogText,
}) {
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
          fontSize={16}
          fontWeight={"bold"}
          textAlign={"center"}
          paragraph
        >
          Please confirm that you want to{" "}
          {approveEvent?.target?.checked ? "approve" : "disapprove"} the
          selected {dialogText}
        </Typography>
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
          onClick={() => handleApprove(approveEvent, jobID)}
        >
          continue
        </Button>
      </Box>
    </CustomDialog>
  );
}
