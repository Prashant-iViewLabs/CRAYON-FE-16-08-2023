import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: "250",
    },
  },
};

function getStyles(option, value, theme) {
  return {
    fontWeight:
      value.indexOf(option) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function SelectMenuWithScroll({
  type,
  name,
  placeholder,
  sx,
  value,
  defaultValue,
  onHandleChange,
  options,
  disabled = false,
  id,
  input,
  multiple,
  onOpen,
  handleScroll,
}) {
  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        borderRadius: "25px",
        height: "40px",
        boxShadow:
          "0px 1px 4px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.02), 0px 1px 12px rgba(0, 0, 0, 0.12)",
        ...sx,
      }}
    >
      <Select
        multiple={multiple}
        disabled={disabled}
        input={input}
        id={id}
        // multiple={type == "multiple"}
        MenuProps={{
          ...MenuProps,
          onScroll: handleScroll, // Add a scroll event listener
        }}
        displayEmpty
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onHandleChange}
        onOpen={onOpen}
        // MenuProps={MenuProps}
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        }}
        renderValue={(selected) => {
          if (!selected || selected.length === 0) {
            return (
              <em style={{ opacity: "0.4", fontStyle: "normal" }}>
                {placeholder}
              </em>
            );
          }
          if (type == "multiple") {
            console.log(selected);
            return (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    variant="outlined"
                    key={value}
                    label={
                      options.find(
                        (item) =>
                          item.job_id == value ||
                          item.pool_id == value ||
                          item.company_id == value
                      )?.name
                    }
                  />
                ))}
              </Box>
            );
          } else {
            let data = options.find((item) =>
              item?.job_id
                ? item?.job_id == selected
                : item?.company_id
                ? item?.company_id == selected
                : item?.pool_id == selected
            );
            return typeof selected === "string"
              ? selected
              : data?.name
              ? data?.name
              : data?.title;
          }
        }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options?.length > 0 &&
          options?.map((option) => (
            <MenuItem
              key={
                option.job_id
                  ? option.job_id
                  : option.company_id
                  ? option?.company_id
                  : option.pool_id
              }
              value={
                option.job_id
                  ? option.job_id
                  : option.company_id
                  ? option?.company_id
                  : option.pool_id
              }
              // style={getStyles(option, value, theme)}
            >
              {option?.title || option?.name}
            </MenuItem>
          ))}
      </Select>
    </Paper>
  );
}
