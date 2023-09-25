import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import BlackMale from "../../assets/Padding Included/Black_Male.svg";
import BlueMale from "../../assets/Padding Included/Blue_Male.svg";
import BlackFemale from "../../assets/Padding Included/Black_Female.svg";
import PinkFemale from "../../assets/Padding Included/Pink_Female.svg";

const GenderSection = ({ setGender }) => {
  const [maleIcon, setMaleIcon] = useState(false);
  const [femaleIcon, setFemaleIcon] = useState(false);
  return (
    <Box
      sx={{
        width: 150,
        paddingY: 2,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Button
        variant="text"
        onMouseEnter={() => setFemaleIcon(true)}
        onMouseLeave={() => setFemaleIcon(false)}
        sx={{
          borderRadius: 0,
        }}
      >
        <Box
          component={"img"}
          height={50}
          width={50}
          src={femaleIcon ? PinkFemale : BlackFemale}
          onClick={() => setGender("female")}
        />
      </Button>
      <Button
        variant="text"
        onMouseEnter={() => setMaleIcon(true)}
        onMouseLeave={() => setMaleIcon(false)}
        sx={{
          borderRadius: 0,
        }}
      >
        <Box
          component={"img"}
          height={50}
          width={50}
          src={maleIcon ? BlueMale : BlackMale}
          onClick={() => setGender("male")}
        />
      </Button>
    </Box>
  );
};

export default GenderSection;
