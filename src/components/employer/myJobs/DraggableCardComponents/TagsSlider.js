import React from "react";
import SmallButton from "../../../common/SmallButton";
import { nanoid } from "@reduxjs/toolkit";
import { Box } from "@mui/material";

export default function TagsSlider({ items, theme, color }) {
  return (
    <Box
      sx={{
        // width: '80%',
        display: "flex",
        flexWrap: "wrap",
        gap: 1,
        minHeight: "25px",
      }}
    >
      {items
        .filter((item) => item != null)
        .map((item, index) => {
          if (item !== undefined) {
            return (
              <SmallButton
                key={nanoid()}
                color={color}
                height={25}
                value={item}
                label={item}
              />
            );
          }
          return null; // Ensure you always return something in map
        })}
    </Box>
  );
}
