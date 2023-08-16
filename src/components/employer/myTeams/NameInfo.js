import React, { useState } from "react";

import { Avatar, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function getColorByIndex(index) {
  // Define an array of colors
  const colors = [
    "#FF5733", // Red
    "#4ea35d", // Green
    "#8268ff", // Blue
    "#ff83ca", // Pink
    "#00b3b3", // Cyan
  ];

  const colorIndex = index % colors.length;
  return colors[colorIndex];
}

const NameInfo = ({ name, email, userID, role }) => {
  const [randomColor] = useState(() =>
    getColorByIndex(Math.floor(Math.random() * 1000))
  );
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
      }}
    >
      <Avatar sx={{ bgcolor: randomColor }}>{name[0]}</Avatar>
      {role === 1 || role === 2 ? (
        <Link
          to={`/employer/my-team/team-info/${userID}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: "Bold",
                overflow: "hidden",
                whiteSpace: "nowrap",
                maxWidth: "200px",
              }}
              textOverflow={"ellipsis"}
            >
              {name}
            </Typography>
            <Typography>{email}</Typography>
          </Box>
        </Link>
      ) : (
        <Box>
          <Typography
            sx={{
              fontWeight: "Bold",
              overflow: "hidden",
              whiteSpace: "nowrap",
              maxWidth: "200px",
            }}
            textOverflow={"ellipsis"}
          >
            {name}
          </Typography>
          <Typography>{email}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default NameInfo;
