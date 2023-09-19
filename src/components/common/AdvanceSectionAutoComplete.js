import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import { useTheme } from "@emotion/react";
import { styled } from "@mui/system";
import { useMemo, useState } from "react";
import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

const StyledAutocomplete = styled(Autocomplete)`
  .MuiAutocomplete-popupIndicator {
    display: none;
  }
`;

const filter = createFilterOptions();

export default function AdvanceSectionAutoComplete({
  id,
  placeholder,
  sx,
  value,
  defaultValue,
  onChange,
  data,
  height,
  disabled = false,
  multiple = false,
  limitTags = 5,
  allowCustomInput = true,
  index,
  showAddOption = false,
  disableCloseOnSelect,
  onFocus,
  autoCompleteRef,
}) {
  const theme = useTheme();
  const optionData = data;
  const [open, setOpen] = useState(false);
  const loading = open && data.length === 0;
  return (
    <Paper
      elevation={0}
      component="form"
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        borderRadius: 5,
        background: "white",
      }}
    >
      <StyledAutocomplete
        ref={autoCompleteRef}
        loading={loading}
        loadingText={
          loading ? (
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress color="inherit" size={20} />
            </Box>
          ) : null
        }
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        showAddOption={showAddOption}
        multiple={multiple}
        limitTags={limitTags}
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        }}
        disableCloseOnSelect={disableCloseOnSelect}
        disabled={disabled}
        allowCustomInput={allowCustomInput}
        size="small"
        id={id}
        index={index}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onFocus={onFocus}
        onChange={(event, newValue) => onChange(event, newValue, id, index)}
        // filterOptions={filterFunction}
        filterOptions={(options, params) => {
          const filteredOptions = options
            .filter((val) => val.name !== "") // Filter out objects with empty names
            .reduce((uniqueMap, obj) => {
              if (!uniqueMap[obj.name]) {
                uniqueMap[obj.name] = obj;
              }
              return uniqueMap;
            }, {});

          const newOptionsArr = Object.values(filteredOptions);
          const { inputValue } = params;

          if (
            inputValue &&
            inputValue.length &&
            inputValue.length > 1 &&
            allowCustomInput &&
            showAddOption
          ) {
            // Suggest the creation of a new value
            const isExisting = newOptionsArr.some(
              (option) => inputValue === option.name
            );
            if (inputValue !== "" && !isExisting) {
              newOptionsArr.push({
                inputValue,
                name: `Add "${inputValue}"`,
              });
            }
          }

          const filtered = newOptionsArr.filter((option) =>
            option.name.toLowerCase().startsWith(inputValue.toLowerCase())
          );

          if (
            filtered.length === 0 &&
            inputValue !== "" &&
            allowCustomInput &&
            showAddOption
          ) {
            // If no matching options found, add the "Add" option
            filtered.push({
              inputValue,
              name: `Add "${inputValue}"`,
            });
          }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handlehomeendkeysfilter="true"
        options={optionData}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.name || "";
        }}
        renderOption={(props, option) => {
          if (option.name !== null) {
            return <li {...props}>{option.name}</li>;
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            sx={{
              "& .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
                paddingTop: multiple ? "3px" : "6px",
              },
            }}
          />
        )}
        renderTags={(value, getTagProps) => {
          if (multiple && value[0] != "") {
            return value.map((option, index) => (
              <>
                <Chip
                  variant="outlined"
                  label={option?.name || option}
                  {...getTagProps({ index })}
                />
              </>
            ));
          }
        }}
      />
    </Paper>
  );
}
