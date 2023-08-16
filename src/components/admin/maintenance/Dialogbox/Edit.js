import React from "react";
import CustomDialog from "../../../common/CustomDialog";
import {
  Box,
  Button,
  InputBase,
  Paper,
  Switch,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import AutoComplete from "../../../common/AutoComplete";
import { useSelector } from "react-redux";
export default function Edit({
  show,
  handleOpen,
  handleEdit,
  companyName,
  handleEditJob,
  existingCompany,
  data,
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
      <Box sx={{ padding: 4 }}>
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
            id="edit_input"
            value={companyName}
            onChange={handleEditJob}
            placeholder={"Change current company name"}
          />
        </Paper>
      </Box>
      <div style={{ display: "flex", alignItems: "center" }}>
        <hr style={{ flexGrow: 1, marginRight: "10px" }} />
        <span>Or</span>
        <hr style={{ flexGrow: 1, marginLeft: "10px" }} />
      </div>
      <Box sx={{ padding: 4 }}>
        <AutoComplete
          // showAddOption={true}
          // allowCustomInput={true}
          id="existing_name"
          value={existingCompany}
          onChange={handleEditJob}
          placeholder="Select from existing companies"
          data={data}
        ></AutoComplete>
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
