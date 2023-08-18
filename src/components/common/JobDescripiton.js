import { Fade, Tooltip, Typography } from "@mui/material";
import React from "react";
import TextWrapper from "./TextWrapper";
import DOMPurify from "dompurify";
import { useTheme } from "@emotion/react";

function createMarkup(html) {
  return {
    __html: DOMPurify.sanitize(html),
  };
}

export default function JobDescripiton({ description }) {
  const theme = useTheme();
  const hasptag = description?.trim()?.startsWith("<");
  const getDescriptionText = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText;
  };

  return hasptag ? (
    <Tooltip
      title={getDescriptionText(description)}
      arrow
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 600 }}
      placement="top"
    >
      <Typography
        sx={{
          fontWeight: 400,
          fontSize: 14,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 3,
          letterSpacing: "0.25px",
        }}
        color={theme.palette.black100}
        gutterBottom={true}
        dangerouslySetInnerHTML={createMarkup(description)}
      />
    </Tooltip>
  ) : (
    <TextWrapper
      mt="12px"
      mb={1}
      color={theme.palette.black100}
      letterSpacing="0.25px"
    >
      {description}
    </TextWrapper>
  );
}
