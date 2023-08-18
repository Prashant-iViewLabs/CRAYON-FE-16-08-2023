import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import theme from "../utils/Theme";

const AdvanceSection = () => {
  const [openAdvanceSearch, setAdvanceSearch] = useState(false);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "auto",
        flexDirection: "column",
      }}
    >
      {openAdvanceSearch && (
        <Box
          sx={{
            // width: "100%",
            background: theme.palette.grayBackground,
            padding: 4,
            borderRadius: 5,
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa voluptas
          omnis fuga iure, minima ipsam asperiores ratione error, deleniti hic
          quisquam sint dolorum distinctio facere nostrum aut. Quam ad quae
          dolorem! Provident temporibus, nemo veniam sed expedita sapiente enim.
          Fugiat quaerat itaque dolores ratione corrupti soluta expedita
          deserunt, in odio?
        </Box>
      )}
      <Button
        sx={{
          padding: "4px 20px",
          height: 20,
          borderRadius: "0 0 15px 15px",
          boxShadow: 3,
        }}
        size="small"
        variant="contained"
        color="white"
        endIcon={openAdvanceSearch ? <ExpandLess /> : <ExpandMore />}
        onClick={() => {
          setAdvanceSearch((prevState) => !prevState);
        }}
      >
        {openAdvanceSearch ? "close" : "Advance"}
      </Button>
    </Box>
  );
};

export default AdvanceSection;
