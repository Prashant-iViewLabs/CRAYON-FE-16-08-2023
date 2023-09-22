import { Box, Grid } from "@mui/material";
import React from "react";
import { useTheme } from "@emotion/react";
import Slider from "../../../common/Slider";

import TagsSlider from "./TagsSlider";

export default function CandidateFlipInfo({
  primary,
  shadow,
  gritScore,
  skills,
  traits,
  tools,
}) {
  const theme = useTheme();
  const jobTags = skills.map((tag) => tag?.tag?.tag);
  const traitsTags = traits.map((trait) => trait?.trait?.name);
  const toolTags = tools.map((tool) => tool?.tool?.name);
  console.log(toolTags);

  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        marginLeft: "4px",
        marginBottom: "8px",
        gap: 1,
        width: "192px",
        marginTop: "6px",
      }}
    >
      <TagsSlider items={jobTags} color={"skillsButton"} hideTagsAfter={4} />
      <TagsSlider items={toolTags} color={"toolsButton"} hideTagsAfter={4} />
      <TagsSlider items={traitsTags} color={"traitsButton"} hideTagsAfter={4} />
    </Grid>
  );
}
