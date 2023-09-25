import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import BlackMale from "../../assets/Padding Included/Black_Male.svg";
import BlueMale from "../../assets/Padding Included/Blue_Male.svg";
import raceBlack from "../../assets/Characters/Race/crayon_race_black.svg";
import raceColoured from "../../assets/Characters/Race/crayon_race_coloured.svg";
import raceIndian from "../../assets/Characters/Race/crayon_race_indian.svg";
import raceWhite from "../../assets/Characters/Race/crayon_race_white.svg";

export default function Race() {
  const [maleIcon, setMaleIcon] = useState(false);
  const [femaleIcon, setFemaleIcon] = useState(false);
  return (
    <Box
      sx={{
        width: 150,
        paddingY: 2,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: "50px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="text"
          onMouseEnter={() => setFemaleIcon(true)}
          onMouseLeave={() => setFemaleIcon(false)}
          sx={{
            borderRadius: 0,
            color: "black",
            flexDirection: "column",
            padding: "0px !important",
            fontWeight: "normal",
          }}
        >
          <Box component={"img"} height={50} width={50} src={raceWhite} /> White
        </Button>
        <Button
          variant="text"
          onMouseEnter={() => setMaleIcon(true)}
          onMouseLeave={() => setMaleIcon(false)}
          sx={{
            borderRadius: 0,
            color: "black",
            flexDirection: "column",
            padding: "0px !important",
            fontWeight: "normal",
          }}
        >
          <Box component={"img"} height={50} width={50} src={raceColoured} />{" "}
          Coloured
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="text"
          onMouseEnter={() => setFemaleIcon(true)}
          onMouseLeave={() => setFemaleIcon(false)}
          sx={{
            borderRadius: 0,
            color: "black",
            flexDirection: "column",
            padding: "0px !important",
            fontWeight: "normal",
          }}
        >
          <Box component={"img"} height={50} width={50} src={raceIndian} />
          Indian
        </Button>
        <Button
          variant="text"
          onMouseEnter={() => setMaleIcon(true)}
          onMouseLeave={() => setMaleIcon(false)}
          sx={{
            borderRadius: 0,
            color: "black",
            flexDirection: "column",
            padding: "0px !important",
            fontWeight: "normal",
          }}
        >
          <Box component={"img"} height={50} width={50} src={raceBlack} /> Black
        </Button>
      </Box>
    </Box>
  );
}
