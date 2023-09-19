import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled, alpha } from "@mui/material/styles";
import locale from "../../../i18n/locale";
import Switch from "@mui/material/Switch";
import { InputBase, Paper, Popover } from "@mui/material";
import {
  ADMIN_SEARCH_FILTER,
  ALERT_TYPE,
  ERROR_MSG,
} from "../../../utils/Constants";
import { getTraits } from "../../../redux/employer/postJobSlice";
import { setAlert, setLoading } from "../../../redux/configSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import TalentSVGButton from "../../common/TalentSVGButton";
import InfoIcon from "../../common/InfoIcon";
import link from "../../../assets/CircularIcon/Red/Circular Icons__Red_Title_Job_Experience.svg";
import diamond from "../../../assets/Characters/Red_Diamond.svg";
import leftArrow from "../../../assets/Black_Left_Previous.svg";
import rightArrow from "../../../assets/Black_Right_Next.svg";
import * as React from "react";
import FilterDrawer from "./dialogBox/FilterDrawer";
import {
  getQualificationsData,
  getSchoolData,
} from "../../../redux/admin/searchSlice";
import SmallButtonTalent from "../../common/SmallButtonTalent";
import QualificationAccordian from "./dialogBox/QualificationAccordian";
import SchoolAccordian from "./dialogBox/Schoolaccordian";

const RedSwitch = styled(Switch)(({ theme }) => ({
  // padding: "0px !important",
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: theme.palette.redButton100.main,
    "&:hover": {
      backgroundColor: alpha(
        theme.palette.redButton100.main,
        theme.palette.action.hoverOpacity
      ),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: theme.palette.redButton100.main,
  },
  "& .MuiSwitch-track": {
    margin: "auto",
    height: "50% !important",
    width: "90% !important",
    padding: "0px !important",
    backgroundColor: theme.palette.redButton100.main,
  },
  ".MuiButtonBase-root.MuiSwitch-switchBase": {
    borderRadius: "15% !important",
    padding: "11px !important",
  },
  "& .MuiSwitch-thumb": {
    borderRadius: "15% !important",
    height: "15px !important",
    width: "15px !important",
    backgroundColor: theme.palette.redButton100.main,
  },
  "& .MuiButtonBase-root-MuiSwitch-switchBase": {
    borderRadius: "15% !important",
    padding: "11px !important",
  },
}));
const BlueSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-root": {
    padding: "0px !important",
  },
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: theme.palette.blueButton700.main,
    "&:hover": {
      backgroundColor: alpha(
        theme.palette.blueButton700.main,
        theme.palette.action.hoverOpacity
      ),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: theme.palette.blueButton700.main,
  },
  "& .MuiSwitch-track": {
    margin: "auto",
    height: "50% !important",
    width: "90% !important",
    padding: "0px !important",
    backgroundColor: theme.palette.blueButton700.main,
  },
  ".MuiButtonBase-root.MuiSwitch-switchBase": {
    borderRadius: "15% !important",
    padding: "11px !important",
  },
  "& .MuiSwitch-thumb": {
    borderRadius: "15% !important",
    height: "15px !important",
    width: "15px !important",
    backgroundColor: theme.palette.blueButton700.main,
  },
}));

const BASIC = {
  lastKey: "",
  keyword: "",
};

const StyledBox = styled("img")(() => ({
  cursor: "pointer",
  height: 60,
  width: 60,
  textAlign: "center",
}));

export default function SchoolSearch() {
  const i18n = locale.en;
  const theme = useTheme();

  const dispatch = useDispatch();

  const [basicData, setBasicData] = useState(BASIC);
  const [flip, setFlip] = useState(false);
  const [state, setState] = useState(false);
  const [anchorElReferral, setAnchorElReferral] = useState(null);

  const [titlesList, setTitlesList] = useState([]);
  const [titlesListKey, setTitlesListKey] = useState(0);

  const [candidateList, setCandidateList] = useState([]);
  const [openAccordian, setOpenAccordian] = useState(false);
  const [scroll, setScroll] = useState();
  const [totalJobs, setTotalJobs] = useState();

  const [title, setTitle] = useState("");

  const openReferral = Boolean(anchorElReferral);

  const { traits } = useSelector((state) => state.postJobs);

  const getAllData = async () => {
    try {
      dispatch(setLoading(true));
      await dispatch(getTraits());
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: ERROR_MSG,
        })
      );
    }
  };

  const handleInputSearch = (event) => {
    setTitle(event.target.value);
    let newBasicData = {
      ...basicData,
      [event.target.id]: event.target.value,
    };
    setBasicData(newBasicData);
  };

  const handleSearch = async (title, titlelastkey) => {
    const newBasicData = {
      lastKey: titlelastkey,
      keyword: title,
    };
    if (title !== "") {
      const { payload } = await dispatch(getSchoolData(newBasicData));
      if (payload?.status == "success") {
        setTitlesListKey(payload?.pageNumber + 1);
        setTotalJobs(payload?.totalData);
        setTitlesList((prevState) => [...prevState, ...payload.data]);
        setOpenAccordian(true);
      } else {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.ERROR,
            msg: "Something went wrong! please relaod the window",
          })
        );
      }
    }
  };

  const toggleDrawer = (open) => (event) => {
    setFlip((prev) => !prev);
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };

  const handlePopoverCloseReferral = () => {
    setAnchorElReferral(null);
  };

  const resetSearch = () => {
    setOpenAccordian(false);
    setTitle("");
    setBasicData(BASIC);
  };

  const editSearch = () => {
    setOpenAccordian(false);
    setTitle(title);
    setBasicData(BASIC);
  };

  useEffect(() => {
    getAllData();
  }, []);
  return (
    <Box>
      <Typography
        sx={{
          fontSize: "36px",
          fontWeight: 700,
          //   ml: 6,
          textAlign: "center",
        }}
      >
        {"Search by school"}
      </Typography>

      <Paper sx={{ p: 3, pt: 0, pr: 0, borderRadius: "20px", pb: 0 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
          <Box
            sx={{
              display: "flex",

              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
            width={openAccordian ? "59%" : "57%"}
          >
            <Box
              sx={{
                display: "flex",
                height: "100px",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <StyledBox
                className="homeImages"
                alt="Home Image"
                src={diamond}
              />

              {openAccordian ? (
                <Box
                  sx={{
                    display: "flex",
                    width: "220px",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography sx={{ fontSize: "12px", fontWeight: 900 }}>
                    Result based on your search:
                  </Typography>
                  <SmallButtonTalent
                    fontWeight={900}
                    textColor={"#000"}
                    color="grayButton200"
                    label={totalJobs}
                    mr={1}
                  />
                </Box>
              ) : (
                <Typography sx={{ fontSize: "12px", fontWeight: 900 }}>
                  Search based on school
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-end",
                height: "100px",
              }}
            >
              <Button
                sx={{
                  boxShadow: 0,
                  fontSize: "14px",
                  // width: "50%",
                  borderRadius: "0 20px 0 20px !important",
                  height: "43px",
                  padding: 3,
                }}
                variant="contained"
                color="yellowButton100"
                width="fit-content"
              >
                my searches
              </Button>
              <Button
                // onClick={(event) => {
                //   setAnchorElReferral(event.target);
                //   setFlip((prev) => !prev);
                // }}
                sx={{
                  boxShadow: 0,
                  fontSize: "14px",
                  // width: "50%",
                  borderRadius: "10px 0 0 10px !important",
                  height: "43px",
                  minWidth: "40px !important",
                  padding: 0,
                  ".MuiButton-startIcon": {
                    margin: "0px !important",
                  },
                }}
                variant="contained"
                color="blueButton700"
                startIcon={
                  <Box
                    component="img"
                    className="eye"
                    alt="eye logo"
                    src={openReferral ? rightArrow : leftArrow}
                    sx={{
                      height: 26,
                      width: 26,
                    }}
                  />
                }
              />
              <Popover
                id="dropdown"
                open={openReferral}
                anchorEl={anchorElReferral}
                onClose={handlePopoverCloseReferral}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                PaperProps={{
                  sx: {
                    minWidth: "10% !important",
                    borderRadius: "20px !important",
                    marginTop: "140px !important",
                    backgroundColor: "transparent !important",
                  },
                }}
              >
                <FilterDrawer
                  toggleDrawer={toggleDrawer}
                  panelData={ADMIN_SEARCH_FILTER}
                  // onChangeFilter={onChangefavourite}
                  side="right"
                />
              </Popover>
            </Box>
            {}
          </Box>
        </Box>
        {!openAccordian && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Box
              sx={{
                width: "120px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <TalentSVGButton
                color={"white"}
                source={link}
                height={30}
                width={30}
                startIconMargin={"0px !important"}
                padding={"0px !important"}
              />

              <Typography sx={{ fontSize: "12px", fontWeight: 700 }}>
                School
              </Typography>
            </Box>

            <Paper
              sx={{
                display: "flex",
                height: "40px",
                borderRadius: "25px",
                boxShadow: "none",
                border: `1px solid ${theme.palette.grayBorder}`,
                width: "50%",
              }}
            >
              <InputBase
                id="keyword"
                value={title}
                onChange={handleInputSearch}
                placeholder={"Enter the school you would like to search for..."}
                sx={{ ml: 2, mr: 2, width: "100%" }}
              />
            </Paper>

            <Box sx={{ display: "flex" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <InfoIcon />
                <Typography sx={{ fontSize: "12px" }}>
                  inclue past titles
                </Typography>
                <RedSwitch />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <InfoIcon />
                <Typography sx={{ fontSize: "12px" }}>
                  include dream jobs
                </Typography>
                <BlueSwitch />
              </Box>
            </Box>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 4,
          }}
        >
          <Button
            sx={{
              boxShadow: 0,
              fontSize: "14px",
              // width: "50%",
              borderRadius: "20px 0 0 0 !important",
              height: "43px",
              padding: 3,
              color: "#000",
            }}
            variant="contained"
            color="grayButton200"
            width="fit-content"
            onClick={resetSearch}
          >
            reset search
          </Button>
          <Button
            sx={{
              boxShadow: 0,
              fontSize: "14px",
              // width: "50%",
              borderRadius: "0px !important",
              height: "43px",
              padding: 3,
            }}
            variant="contained"
            color="yellowButton100"
            width="fit-content"
            onClick={() => {
              handleSearch(basicData?.keyword, 0);
              setTitlesList([]);
            }}
          >
            save search
          </Button>
          <Button
            sx={{
              boxShadow: 0,
              fontSize: "14px",
              // width: "50%",
              borderRadius: "0 20px 0 0 !important",
              height: "43px",
              padding: 3,
            }}
            variant="contained"
            color="redButton100"
            width="fit-content"
            onClick={editSearch}
          >
            edit search
          </Button>
        </Box>
      </Paper>
      {console.log(basicData, titlesListKey)}
      {openAccordian && (
        <Paper sx={{ p: 3, mt: 4, borderRadius: "20px" }}>
          <SchoolAccordian
            titlesList={titlesList}
            candidateList={candidateList}
            traits={traits}
            handleTitleScroll={handleSearch}
            basicData={basicData}
            titlesListKey={titlesListKey}
            setTitlesList={setTitlesList}
          />
        </Paper>
      )}
    </Box>
  );
}
