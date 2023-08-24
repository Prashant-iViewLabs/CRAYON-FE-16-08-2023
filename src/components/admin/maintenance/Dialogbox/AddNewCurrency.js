import React, { useState } from "react";
import CustomDialog from "../../../common/CustomDialog";
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputBase,
  Paper,
} from "@mui/material";
import { useTheme } from "@emotion/react";

export default function AddNewCurrency({
  show,
  handleOpen,
  handleAdd,
  handleNewJob,
  newTitle,
  currencySymbol,
  currencyName,
  minSalary,
  maxSalary,
  minRate,
  maxRate,
}) {
  const theme = useTheme();

  const currencyOptions = ["USD", "ZAR" /* Add more currency options here */];
  return (
    <CustomDialog
      show={show}
      hideButton={false}
      dialogWidth="sm"
      showFooter={false}
      onDialogClose={handleOpen}
      padding="16px 0 0 0"
    >
      <Box sx={{ mb: 2 }}>
        <fieldset
          style={{
            margin: "auto",
            mb: 2,
            padding: 4,
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
            justifyContent: "space-evenly",
            width: "90%",
            border: `1px solid ${theme.palette.grayBorder}`,
          }}
        >
          <legend
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#000000",
            }}
          >
            Currency
          </legend>
          <Paper
            sx={{
              display: "flex",
              height: "40px",
              borderRadius: "25px",
              boxShadow: "none",
              border: `1px solid ${theme.palette.grayBorder}`,
              margin: "20px",
            }}
          >
            <InputBase
              id="currencyTitle"
              label="Currency Title"
              value={newTitle}
              onChange={handleNewJob}
              margin="normal"
              sx={{ ml: 2, mr: 2, width: "100%" }}
              placeholder="currency title"
            />
          </Paper>
          <Paper
            sx={{
              display: "flex",
              height: "40px",
              borderRadius: "25px",
              boxShadow: "none",
              border: `1px solid ${theme.palette.grayBorder}`,
              width: "40%",
            }}
          >
            <InputBase
              id="currencySymbol"
              label="Symbol"
              onChange={handleNewJob}
              value={currencySymbol}
              margin="normal"
              sx={{ ml: 2, mr: 2, width: "10%" }}
              placeholder="$"
              inputProps={{
                maxLength: 1, // Change the maximum limit as needed
              }}
            />
            <div
              style={{
                borderLeft: `1px solid ${theme.palette.grayBorder}`,
                height: "40px",
              }}
            />
            <InputBase
              id="currencyName"
              label="Name"
              onChange={handleNewJob}
              value={currencyName}
              margin="normal"
              sx={{ ml: 2, mr: 2, width: "100%" }}
              placeholder="currency name"
              inputProps={{
                maxLength: 3, // Change the maximum limit as needed
                style: { textTransform: "uppercase" },
                onInput: (e) => {
                  e.target.value = e.target.value.toUpperCase();
                },
              }}
            />
          </Paper>
        </fieldset>
      </Box>
      <Box sx={{ mb: 2 }}>
        <fieldset
          style={{
            margin: "auto",
            mb: 2,
            padding: 4,
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
            justifyContent: "space-evenly",
            width: "90%",
            border: `1px solid ${theme.palette.grayBorder}`,
          }}
        >
          <legend
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#000000",
            }}
          >
            Salary
          </legend>
          <Paper
            sx={{
              display: "flex",
              height: "40px",
              borderRadius: "25px",
              boxShadow: "none",
              border: `1px solid ${theme.palette.grayBorder}`,
              margin: "20px",
            }}
          >
            <InputBase
              id="minSalary"
              label="Min Salary"
              value={minSalary}
              onChange={handleNewJob}
              type="number"
              sx={{ ml: 2, mr: 2, width: "100%" }}
              placeholder="minimum salary"
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
              id="maxSalary"
              label="Max Salary"
              value={maxSalary}
              type="number"
              sx={{ ml: 2, mr: 2, width: "100%" }}
              placeholder="maximum salary"
              onChange={handleNewJob}
            />
          </Paper>
        </fieldset>
      </Box>
      <Box sx={{ mb: 2 }}>
        <fieldset
          style={{
            margin: "auto",
            mb: 2,
            padding: 4,
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
            justifyContent: "space-evenly",
            width: "90%",
            border: `1px solid ${theme.palette.grayBorder}`,
          }}
        >
          <legend
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#000000",
            }}
          >
            Rate
          </legend>
          <Paper
            sx={{
              display: "flex",
              height: "40px",
              borderRadius: "25px",
              boxShadow: "none",
              border: `1px solid ${theme.palette.grayBorder}`,
              margin: "20px",
            }}
          >
            <InputBase
              id="minRate"
              label="Min Rate"
              value={minRate}
              onChange={handleNewJob}
              type="number"
              sx={{ ml: 2, mr: 2, width: "100%" }}
              placeholder="minimum rate"
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
              id="maxRate"
              label="Max Rate"
              value={maxRate}
              type="number"
              sx={{ ml: 2, mr: 2, width: "100%" }}
              onChange={handleNewJob}
              placeholder="maximum rate"
            />
          </Paper>
        </fieldset>
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
          onClick={() =>
            handleAdd(
              newTitle,
              currencyName,
              minSalary,
              maxSalary,
              minRate,
              maxRate
            )
          }
        >
          add
        </Button>
      </Box>
    </CustomDialog>
  );
}
