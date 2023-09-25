import { Box, Button, Typography, useTheme } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import EmployerButtonPanel from "./EmployerButtonPanel";

export default function QualificationBox({ setQualification }) {
  const qualification = useMemo(
    () => [
      { id: 1, name: "Degree", color: "blueButton700" },
      { id: 2, name: "Diploma", color: "blueButton700" },
      { id: 3, name: "Certificate", color: "blueButton700" },
      { id: 4, name: "Post Graduate", color: "blueButton700" },
    ],
    []
  );
  const theme = useTheme();
  const [selectedBtns, setSelectedBtn] = useState([]);
  const [openDropDown, setOpenDropDownId] = useState(null);

  const qualificationRef = useRef(selectedBtns);

  //   useEffect(() => {
  //     setSelectedBtn([qualification[0]?.id]);
  //   }, [qualification]);

  useEffect(() => {
    // Update the ref whenever the state changes
    qualificationRef.current = selectedBtns;
    console.log(qualificationRef.current);
    qualificationRef.current.length &&
      setQualification(qualificationRef.current);
  }, [selectedBtns]);

  console.log(selectedBtns);

  const removeBtnSelection = (selectedBtnList, id) => {
    selectedBtnList.splice(
      selectedBtns.findIndex((selectedBtn) => selectedBtn == id),
      1
    );
  };
  const handleButtonClick = (event, { id, name, title, dropDown }) => {
    if (dropDown) {
      setOpenDropDownId((prevState) => (prevState === id ? null : id));
      return;
    }
    if (title == true) {
      if (selectedBtns.find((selectedBtn) => selectedBtn == id)) {
        const selectedBtnList = [...selectedBtns];
        removeBtnSelection(selectedBtnList, id);
        setSelectedBtn(selectedBtnList);
        // onChangeFilter(selectedBtnList);
      } else {
        setSelectedBtn([qualification[0]?.id]);
        // onChangeFilter([qualification[0]?.id]);
      }
    } else {
      if (selectedBtns.find((selectedBtn) => selectedBtn == id)) {
        const selectedBtnList = [...selectedBtns];
        removeBtnSelection(selectedBtnList, id);
        if (selectedBtnList.length == 0) {
          setSelectedBtn([qualification[0]?.id]);
          //   onChangeFilter([qualification[0]?.id]);
        } else {
          setSelectedBtn(selectedBtnList);
          //   onChangeFilter(selectedBtnList);
        }
      } else {
        if (
          selectedBtns.find(
            (selectedBtn) => selectedBtn == qualification[0]?.id
          )
        ) {
          const selectedBtnList = [...selectedBtns];
          removeBtnSelection(selectedBtnList, id);
          selectedBtnList.push(id);
          setSelectedBtn(selectedBtnList);
          //   onChangeFilter(selectedBtnList);
        } else {
          setSelectedBtn((prevState) => [...prevState, id]);
          //   onChangeFilter([...selectedBtns, id]);
        }
      }
    }
  };

  return (
    <Box
      sx={{
        width: 150,
        paddingY: 2,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {qualification.map((item) => {
        return (
          <Button
            sx={{
              padding: "6px 7px",
              lineHeight: "inherit",
              borderRadius: "5px",
              width: "100%",
              borderBottomRightRadius: "5px",
              mr: { xs: 1, sm: 0 },
              minWidth: { xs: "90px", sm: 0 },
              fontWeight: 400,
              "&:hover": {
                // opacity: 1,
                // backgroundColor: theme.palette[item.color]?.main,
                backgroundColor: theme.palette.redButton200.main,
                color: theme.palette.white,
                fontWeight: 900,
              },
              // opacity: selectedBtns.includes(item.id) ? 1 : 0.5
            }}
            onClick={(e) => {
              handleButtonClick(e, item);
            }}
            disableElevation
            variant="contained"
            color={selectedBtns.includes(item.id) ? "redButton200" : "base"}
            key={item.id}
          >
            {item?.name}
          </Button>
        );
      })}
    </Box>
  );
}
