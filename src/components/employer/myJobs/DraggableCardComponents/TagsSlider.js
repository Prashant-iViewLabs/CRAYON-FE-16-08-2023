import React from "react";
import SmallButton from "../../../common/SmallButton";
import { nanoid } from "@reduxjs/toolkit";
import { Box } from "@mui/material";

export default function TagsSlider({ items, color, hideTagsAfter }) {
  const remaining = (value) => {
    const remainingTags = items.slice(value, items.length);
    return remainingTags.join(", ");
  };
  return (
    <Box
      sx={{
        // width: '100%',
        marginLeft: "4px",
        display: "flex",
        flexWrap: "wrap",
        gap: 1,
        minHeight: "25px",
      }}
    >
      {items
        .filter((item) => item != null)
        .map((item, index) => {
          if (item !== undefined && index < hideTagsAfter) {
            return (
              <SmallButton
                key={nanoid()}
                color={color}
                height={25}
                value={item}
                label={item}
              />
            );
          } else if (items.length === index + 1 && item !== undefined) {
            return (
              <SmallButton
                key={nanoid()}
                color={color}
                height={25}
                value={remaining(hideTagsAfter)}
                label={`+ ${items.length - hideTagsAfter}`}
              />
            );
          }
        })}
    </Box>
  );
}
