import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import yellowStar from "../../../../assets/Characters/Yellow_Star.svg";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import challanger from "../../../../assets/Characters/Red_Skateboarder.svg";
import character from "../../../../assets/Characters/Yellow_Retangle.svg";
import contemplator from "../../../../assets/Characters/Blue_Half_Circle_Contemplator.svg";
import contemplator1 from "../../../../assets/Characters/Green_Triangle_Happy.svg";
import SmallButton from "../../../common/SmallButton";
import AutoComplete from "../../../common/AutoComplete";
import { useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import { useDispatch } from "react-redux";
import { setAlert } from "../../../../redux/configSlice";
import { ALERT_TYPE, ERROR_MSG } from "../../../../utils/Constants";
import locale from "../../../../i18n/locale";
import {
  getPersonalities,
  getTraits,
} from "../../../../redux/employer/postJobSlice";
import { talentPersonality } from "../../../../redux/admin/jobsSlice";

const StyledBox = styled("img")(() => ({
  cursor: "pointer",
  height: 50,
  width: 50,
}));

const PERSONALITY = {
  primary_personality: "",
  shadow_personality: "",
  grit_score: "",
  traits: [],
};

export default function EditPersonality({
  show,
  handleOpen,
  setPersonalityAdded,
  talentContent,
  seteditPersonality,
  traits,
}) {
  const navigate = useNavigate();
  const i18n = locale.en;
  const theme = useTheme();
  const dispatch = useDispatch();

  const buttons = [
    {
      id: "1",
      name: "Challenger",
      label: "Primary",
      label1: "Secondary",
      activeLabel: "",
    },
    {
      id: "2",
      name: "Character",
      label: "Primary",
      label1: "Secondary",
      activeLabel: "",
    },
    {
      id: "3",
      name: "Contemplator",
      label: "Primary",
      label1: "Secondary",
      activeLabel: "",
    },
    {
      id: "4",
      name: "Collaborator",
      label: "Primary",
      label1: "Secondary",
      activeLabel: "",
    },
  ];

  const [buttonArr, setButtonArr] = useState(buttons);
  const [primarySelected, setPrimarySelected] = useState(false);
  const [shadowSelected, setShadowSelected] = useState(false);

  const [personalitiesData, setPersonalitiesData] = useState({
    ...PERSONALITY,
  });

  const handleMultipleAutoComplete = (event, newValue, id) => {
    if (newValue.length <= 5) {
      let newPersonalitiesData = {
        ...personalitiesData,
        [id]: newValue.map((val) => val?.inputValue || val?.trait_id || val),
      };
      setPersonalitiesData(newPersonalitiesData);
    } else {
      newValue.splice(5, 1);
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: "You can't add more than 5 traits!!",
        })
      );
    }
  };

  const getTraitsValue = () => {
    if (personalitiesData.traits?.length == 0) {
      return [];
    }

    return personalitiesData.traits?.map(
      (id) => traits?.find((trait) => trait.id == id) || id
    );
  };

  const handleChange = (event, value, id) => {
    const {
      target: { name },
    } = event;
    setButtonArr(
      buttonArr.map((item) =>
        item.id === id
          ? { ...item, activeLabel: name }
          : {
              ...item,
              activeLabel: item.activeLabel === name ? "" : item.activeLabel,
            }
      )
    );

    const newPersonalitiesData = {
      ...personalitiesData,
      [name]: id,
    };
    setPersonalitiesData(newPersonalitiesData);
  };

  const addPersonality = async () => {
    const data = {
      ...personalitiesData,
      user_id: talentContent.user_id,
    };
    const { payload } = await dispatch(talentPersonality(data));
    if (payload?.status == "success") {
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.SUCCESS,
          msg: "Personality Added Successfully",
        })
      );
      setPersonalityAdded(true);
      await handleClose();
    } else {
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: "Something went wrong! please relaod the window",
        })
      );
    }
  };

  const rangeHandler = (event) => {
    const {
      target: { value },
      target: { name },
      target: { id },
    } = event;

    const newPersonalitiesData = {
      ...personalitiesData,
      [name]: Number(value),
    };
    setPersonalitiesData(newPersonalitiesData);
  };

  const handleClose = () => {
    seteditPersonality((prev) => !prev);
    setButtonArr(buttonArr.map((item) => ({ ...item, activeLabel: " " })));
    setPersonalitiesData({
      ...PERSONALITY,
    });
  };

  return (
    <Dialog open={show} hideButton={false} maxWidth="xs" showFooter={false}>
      <DialogTitle onClose={handleClose}>
        <IconButton
          aria-label="close"
          onClick={() => {
            handleClose();
          }}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Box
            sx={{
              width: "20px",
              height: "20px",
              color: "#000000",
              border: 2,
              fontSize: "18px",
              borderRadius: "5px",
            }}
          >
            X
          </Box>
        </IconButton>
      </DialogTitle>

      <Box
        sx={{
          height: "580px",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 3,
            padding: "16px",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 700,
            }}
          >
            Edit Personality
          </Typography>
          <Typography sx={{ fontSize: "12px", fontWeight: 700 }}>
            Please match and select a personality profile below:
          </Typography>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "50%",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  height: "230px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <StyledBox
                  className="homeImages"
                  alt="Home Image"
                  src={challanger}
                />
                <StyledBox
                  className="homeImages"
                  alt="Home Image"
                  src={character}
                />
                <StyledBox
                  className="homeImages"
                  alt="Home Image"
                  src={contemplator1}
                />
                <StyledBox
                  className="homeImages"
                  alt="Home Image"
                  src={contemplator}
                />
              </Box>

              <Box
                sx={{
                  height: "230px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                    height: "50px",
                    width: "fit-content",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Challenger
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    height: "50px",
                    width: "fit-content",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Character
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    height: "50px",
                    width: "fit-content",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Contemplator
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    height: "50px",
                    width: "fit-content",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Collaborator
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                height: "230px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {buttonArr.map((item, index) => {
                return (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      height: "45px",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      name="primary_personality"
                      variant="contained"
                      color={
                        item.activeLabel === "primary_personality"
                          ? "lightGreenButton300"
                          : "grayButton200"
                      }
                      mr="8px"
                      onClick={(event) => {
                        handleChange(event, item.name, item.id);
                        setPrimarySelected((prev) => !prev);
                      }}
                      sx={{
                        width: "100px !important",
                        height: "20px",
                        fontWeight: 300,
                        letterSpacing: "0.75px",
                        boxShadow: 0,
                        borderRadius: "5px",
                        color: "white",
                        padding: "0 8px",
                        fontSize: "10px !important",
                      }}
                    >
                      {item.label}
                    </Button>
                    <Button
                      name="shadow_personality"
                      variant="contained"
                      color={
                        item.activeLabel === "shadow_personality"
                          ? "orangeButton"
                          : "grayButton200"
                      }
                      mr="8px"
                      onClick={(event) => {
                        handleChange(event, item.name, item.id);
                        setShadowSelected((prev) => !prev);
                      }}
                      sx={{
                        width: "100px !important",
                        height: "20px",
                        fontWeight: 300,
                        letterSpacing: "0.75px",
                        boxShadow: 0,
                        borderRadius: "5px",
                        color: "white",
                        padding: "0 8px",
                        fontSize: "10px !important",
                      }}
                    >
                      {item.label1}
                    </Button>
                  </Box>
                );
              })}
            </Box>
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography sx={{ fontSize: "12px", fontWeight: 700 }}>
              Add & edit personality traits below:
            </Typography>
            <AutoComplete
              multiple={true}
              id="traits"
              name="traits"
              value={getTraitsValue()}
              onChange={handleMultipleAutoComplete}
              sx={{ width: "100%", display: "inline-table" }}
              placeholder={"Enter or edit personality trait"}
              data={traits}
              limitTags={5}
              height={20}
            ></AutoComplete>
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography sx={{ fontSize: "12px", fontWeight: 700 }}>
              Enter grit score below:
            </Typography>
            <Paper
              sx={{
                display: "flex",
                height: "40px",
                borderRadius: "25px",
                boxShadow: "none",
                width: "100%",
                border: `1px solid ${theme.palette.grayBorder}`,
              }}
            >
              <InputBase
                name="grit_score"
                sx={{ ml: 2, mr: 2, width: "100%" }}
                placeholder="Enter or edit grit score"
                type="number"
                onChange={(event) => rangeHandler(event)}
              />
            </Paper>
          </Box>
        </Box>
        <Grid
          container
          // padding="0 8px 8px 8px"
          alignItems="center"
          overflow={"hidden"}
          sx={{
            width: "100%",
            height: 51,
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            id="broad"
            sx={{
              borderRadius: 0,
              width: "100%",
              height: "100%",
              fontSize: "14px",
            }}
            color="redButton100"
            onClick={addPersonality}
          >
            Update
          </Button>
        </Grid>
      </Box>
    </Dialog>
  );
}
