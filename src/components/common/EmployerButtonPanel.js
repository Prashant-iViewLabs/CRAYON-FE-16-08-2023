import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material/styles";
import { truncate } from "lodash";
import GenderSection from "./GenderSection";
import Race from "./Race";
import SalaryBox from "./SalaryBox";
import QualificationBox from "./QualificationBox";
import downArrow from "../../assets/Black_Down_Open - Copy.svg";
import upArrow from "../../assets/Black_Up_Close - Copy.svg";

export default function EmployerButtonPanel({
  panelData,
  side,
  onChangeFilter = () => {},
  setGender,
  setQualification,
}) {
  const theme = useTheme();
  const [selectedBtns, setSelectedBtn] = useState([panelData[0]?.id]);
  const [openDropDown, setOpenDropDownId] = useState(null);

  useEffect(() => {
    setSelectedBtn([panelData[0]?.id]);
  }, [panelData]);

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
    // <Grid xs >
    <Box
      sx={{
        // mt: { sx: 0, sm: topMargin ? '68px' : '16px' },
        textAlign: side === "right" && "end",
        display: { xs: "none", sm: "flex" },
        flexDirection: "column",
        gap: "10px",
        // overflow: { xs: "auto", sm: "hidden" },
      }}
    >
      {panelData?.map((btn) => (
        <Box
          key={btn.id}
          sx={{
            position: "relative",
          }}
        >
          <Tooltip title={btn.name} placement="top-end">
            <Button
              endIcon={
                btn.dropDown && (
                  <Box
                    component={"img"}
                    src={openDropDown ? upArrow : downArrow}
                    sx={{
                      height: "28px",
                      width: "30px",
                    }}
                  />
                )
              }
              sx={{
                flexDirection: "row-reverse",
                padding: "6px 7px",
                lineHeight: "inherit",
                borderRadius: "5px",
                width: "100%",
                borderBottomLeftRadius: side === "left" ? { sm: 0 } : "5px",
                borderTopLeftRadius: side === "left" ? { sm: 0 } : "5px",
                borderTopRightRadius: side === "right" ? { sm: 0 } : "5px",
                borderBottomRightRadius: side === "right" ? { sm: 0 } : "5px",
                mr: { xs: 1, sm: 0 },
                minWidth: { xs: "90px", sm: 0 },
                fontWeight:
                  btn.title || selectedBtns.includes(btn.id) ? 900 : 400,
                "&:hover": {
                  // opacity: 1,
                  // backgroundColor: theme.palette[btn.color]?.main,
                  backgroundColor: theme.palette.redButton200.main,
                  color: theme.palette.white,
                  fontWeight: 900,
                },
                // opacity: selectedBtns.includes(btn.id) ? 1 : 0.5
              }}
              onClick={(e) => {
                handleButtonClick(e, btn);
              }}
              disableElevation
              variant="contained"
              color={selectedBtns.includes(btn.id) ? "redButton200" : "base"}
              key={btn.id}
            >
              {truncate(btn?.name, { length: 14 })}
            </Button>
          </Tooltip>
          {btn.dropDown && openDropDown === btn?.id && (
            <Box
              sx={{
                width: "150px",
                boxShadow: 1,
                borderRadius: "0 0 10px 10px",
                position: "absolute",
                top: 37,
                zIndex: 10,
                background: "#FFFFFF",
              }}
            >
              {btn.name === "gender" && <GenderSection setGender={setGender} />}
              {btn.name === "race" && <Race />}
              {btn.name === "salary" && (
                <Box
                  sx={{
                    width: "500px",
                    padding: "16px",
                    boxShadow: 1,
                    borderRadius: "0 0 10px 10px",
                    position: "absolute",
                    zIndex: 10,
                    background: "#FFFFFF",
                  }}
                >
                  <SalaryBox />
                </Box>
              )}
              {btn.name === "qualification" && (
                <QualificationBox setQualification={setQualification} />
              )}
            </Box>
          )}
        </Box>
      ))}
    </Box>
    // </Grid>
  );
}
