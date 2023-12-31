// import {
//   Box,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
// } from "@mui/material";
// import React from "react";
// import Divider from "@mui/material/Divider";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";

// export default function FilterDrawer({ toggleDrawer }) {
//   return (
//     <Box
//       sx={{ width: 250 }}
//       role="presentation"
//       onClick={toggleDrawer(false)}
//       onKeyDown={toggleDrawer(false)}
//     >
//       <List>
//         {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//       <Divider />
//     </Box>
//   );
// }

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material/styles";
import { truncate } from "lodash";

export default function FilterDrawer({
  panelData,
  side,
  onChangeFilter = () => {},
  toggleDrawer,
}) {
  const theme = useTheme();
  const [selectedBtns, setSelectedBtn] = useState([panelData[0]?.id]);

  useEffect(() => {
    setSelectedBtn([panelData[0]?.id]);
  }, [panelData]);

  const removeBtnSelection = (selectedBtnList, id) => {
    selectedBtnList.splice(
      selectedBtns.findIndex((selectedBtn) => selectedBtn == id),
      1
    );
  };
  const handleButtonClick = (event, { id, name, title }) => {
    if (title == true) {
      if (selectedBtns.find((selectedBtn) => selectedBtn == id)) {
        const selectedBtnList = [...selectedBtns];
        removeBtnSelection(selectedBtnList, id);
        setSelectedBtn(selectedBtnList);
        onChangeFilter(selectedBtnList);
      } else {
        setSelectedBtn([panelData[0]?.id]);
        onChangeFilter([panelData[0]?.id]);
      }
    } else {
      if (selectedBtns.find((selectedBtn) => selectedBtn == id)) {
        const selectedBtnList = [...selectedBtns];
        removeBtnSelection(selectedBtnList, id);
        if (selectedBtnList.length == 0) {
          setSelectedBtn([panelData[0]?.id]);
          onChangeFilter([panelData[0]?.id]);
        } else {
          setSelectedBtn(selectedBtnList);
          onChangeFilter(selectedBtnList);
        }
      } else {
        if (
          selectedBtns.find((selectedBtn) => selectedBtn == panelData[0]?.id)
        ) {
          const selectedBtnList = [...selectedBtns];
          removeBtnSelection(selectedBtnList, id);
          selectedBtnList.push(id);
          setSelectedBtn(selectedBtnList);
          onChangeFilter(selectedBtnList);
        } else {
          setSelectedBtn((prevState) => [...prevState, id]);
          onChangeFilter([...selectedBtns, id]);
        }
      }
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
      }}
    >
      {panelData?.map((btn) => (
        <Tooltip title={btn.name} placement="top-end">
          <Button
            sx={{
              mb: 1,
              padding: "6px 7px",
              lineHeight: "inherit",
              borderRadius: "5px",
              borderBottomLeftRadius: side == "left" ? { sm: 0 } : "5px",
              borderTopLeftRadius: side == "left" ? { sm: 0 } : "5px",
              borderTopRightRadius: side == "right" ? { sm: 0 } : "5px",
              borderBottomRightRadius: side == "right" ? { sm: 0 } : "5px",
              mr: { xs: 1, sm: 0 },
              minWidth: { xs: "90px", sm: 0 },
              fontWeight:
                btn.title || selectedBtns.includes(btn.id) ? 900 : 400,
              "&:hover": {
                boxShadow: 15,
                // opacity: 1,
                backgroundColor: theme.palette[btn.color]?.main,
                color: theme.palette.white,
                fontWeight: 900,
              },
              // opacity: selectedBtns.includes(btn.id) ? 1 : 0.5
            }}
            marginTop={1}
            onClick={(e) => handleButtonClick(e, btn)}
            disableElevation
            variant="contained"
            color={selectedBtns.includes(btn.id) ? btn.color : "base"}
            key={btn.id}
          >
            {truncate(btn?.name, { length: 14 })}
          </Button>
        </Tooltip>
      ))}
    </Box>
  );
}
