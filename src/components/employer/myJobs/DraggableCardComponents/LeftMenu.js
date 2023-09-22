import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Chat from "../../../../assets/Characters/Crayon_Talent_Menu_Chat.svg";
import Search from "../../../../assets/Characters/Crayon_Talent_Menu_Search.svg";
import Dashboard from "../../../../assets/Characters/Crayon_Talent_Menu_Dashboard.svg";
import Maintenance from "../../../../assets/Characters/Crayon_Talent_Menu_Maintenance.svg";
import Talent from "../../../../assets/Characters/Crayon_Talent_Menu_Talent.svg";
import Jobs from "../../../../assets/Characters/Crayon_Talent_Menu_Jobs.svg";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import downArrow from "../../../../assets/Black_Down_Open - Copy.svg";
import upArrow from "../../../../assets/Black_Up_Close - Copy.svg";
import { getTalentPool } from "../../../../redux/admin/jobsSlice";
import { useDispatch } from "react-redux";

const JOBS = [
  { id: 1, label: "All Jobs", path: "all-jobs" },
  { id: 2, label: "Pending Jobs", path: "pending-jobs" },
  { id: 3, label: "Active Jobs", path: "active-jobs" },
  { id: 4, label: "Paused Jobs", path: "paused-jobs" },
  { id: 5, label: "Closed Jobs", path: "closed-jobs" },
  { id: 6, label: "Crayon Direct" },
  { id: 7, label: "Crayon Recruit" },
];

const TALENT = [
  { id: 0, label: "All talent", path: "all-talent", submenu: [] },
  {
    id: 1,
    label: "My Talent",
    path: "applicants",
    submenu: [
      { id: 6, label: "Applicants", path: "applicants" },
      { id: 7, label: "Followers", path: "followers" },
    ],
  },

  {
    id: 4,
    label: "Talent pools",
    path: "talent-pool",
    submenu: [],
  },
];

const SEARCH = [
  { id: 0, label: "Build a search", path: "build-search", mySearch: [] },
  {
    id: 1,
    label: "My searches",
    path: "",
    mySearch: [
      { id: 0, label: "Graphic Designers" },
      { id: 1, label: "Lead Developers" },
      { id: 2, label: "Paid Media Intern" },
    ],
  },
  { id: 2, label: "Job titles", path: "job-title-search", mySearch: [] },
  { id: 3, label: "Industries", mySearch: [], path: "" },
  { id: 4, label: "Companies", mySearch: [], path: "" },
  { id: 5, label: "Skills", path: "skills-search", mySearch: [] },
  { id: 6, label: "Tools", path: "tools-search", mySearch: [] },
  {
    id: 7,
    label: "Qualifications",
    path: "qualifications-search",
    mySearch: [],
  },
  { id: 8, label: "Institutions", path: "institution-search", mySearch: [] },
  { id: 9, label: "Schools", path: "schools-search", mySearch: [] },
  { id: 10, label: "Cities/Towns", path: "towns-search", mySearch: [] },
  {
    id: 11,
    label: "Nationalities",
    path: "nationalities-search",
    mySearch: [],
  },
  { id: 12, label: "Languages", path: "languages-search", mySearch: [] },
];

const MAINTENANCE = [
  {
    id: 1,
    label: "Database items",
    databaseList: [
      {
        id: 0,
        label: "Job titles",
        path: "jobtitle",
        counter: "JobsTitlecounter",
      },
      { id: 1, label: "Skills", path: "skills", counter: "Skillscounter" },
      { id: 2, label: "Tools", path: "tools", counter: "Toolscounter" },
      {
        id: 3,
        label: "Qualifications",
        path: "qualifications",
        counter: "Qualificationscounter",
      },
      {
        id: 4,
        label: "Institutions",
        path: "institutions",
        counter: "Institutioncounter",
      },
      {
        id: 5,
        label: "Companies",
        path: "company",
        counter: "CompanyEmpcounter",
      },
      {
        id: 6,
        label: "Associations",
        path: "associations",
        counter: "Associationcounter",
      },
      { id: 7, label: "Schools", path: "schools", counter: "Schoolscounter" },
      { id: 8, label: "Towns", path: "towns", counter: "Townscounter" },
      {
        id: 9,
        label: "Nationalities",
        path: "nationalities",
        counter: "Nationalitycounter",
      },
      {
        id: 10,
        label: "Languages",
        path: "languages",
        counter: "Languagecounter",
      },
      {
        id: 11,
        label: "Industries",
        path: "industries",
        counter: "Industrycounter",
      },
      {
        id: 12,
        label: "Qualification types",
        path: "qualification-types",
        counter: "QualificationTypecounter",
      },
      {
        id: 13,
        label: "Currencies",
        path: "currencies",
        counter: "Currencycounter",
      },
    ],
  },
  { id: 2, label: "Vouchers", databaseList: [] },
  { id: 3, label: "Payments", databaseList: [] },
];

export default function LeftMenu({ leftExpanded }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [poolData, setPoolData] = useState([]);
  const [talentList, setTalentList] = useState(TALENT);

  const getTalentPoolList = async (lastkeyy) => {
    try {
      const { payload } = await dispatch(getTalentPool({ lastKey: lastkeyy }));
      if (payload.status === "success") {
        setPoolData((prevState) => [...prevState, ...payload.data]);
        const talentPoolIndex = talentList.findIndex((item) => item.id === 4);

        const updatedTalentList = [...talentList];
        updatedTalentList[talentPoolIndex] = {
          ...updatedTalentList[talentPoolIndex],
          submenu: payload.data,
        };

        setTalentList(updatedTalentList);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getTalentPoolList(0);
  }, []);

  // const handleClick = (event, parentPath, childPath) => {
  //   event.stopPropagation();
  //   const newWindow = window.open(
  //     `/admin/${parentPath}/${childPath}`,
  //     "_blank"
  //   );
  //   if (newWindow) {
  //     newWindow.opener = null; // Prevent the new window from having a reference to the current window
  //   }
  // };

  useEffect(() => {
    setOpen(TALENT.map((item) => false));
    setSearchOpen(SEARCH.map((item) => false));
  }, []);

  const handleClickOpen = (index) => {
    setOpen(
      open.map((item, itemindex) => (itemindex === index ? !item : false))
    );
  };

  const handleSearchClick = (index) => {
    setSearchOpen(
      searchOpen.map((item, itemindex) => (itemindex === index ? !item : false))
    );
  };

  const handleSubClick = (event, parentPath, childPath, menuIndex, poolID) => {
    event.stopPropagation();
    let newWindow;
    if (poolID) {
      newWindow = window.open(
        `/admin/${parentPath}/talent-pool/${poolID}`,
        "_blank"
      );
    } else {
      newWindow = window.open(`/admin/${parentPath}/${childPath}`, "_blank");
    }

    if (newWindow) {
      newWindow.opener = null; // Prevent the new window from having a reference to the current window
    }
  };

  return (
    <Box
      sx={{
        width: leftExpanded ? "260px" : "80px",
        backgroundColor: "#FFFFFF",
        borderRadius: "0 0 25px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        cursor: "pointer",
        padding: "0 10px",
      }}
      className="filterSec"
    >
      <Box sx={{ display: "flex", marginTop: "65px" }}>
        <Box
          component={"img"}
          src={Dashboard}
          sx={{
            height: "60px",
            width: "60px",
          }}
        />
        {leftExpanded && (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: 900,
              }}
            >
              Dashboard
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 900,
              }}
            >
              The stats and facts
            </Typography>
            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: 500,
              }}
            >
              Item 1
            </Typography>
            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: 500,
              }}
            >
              Item 2
            </Typography>
            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: 500,
              }}
            >
              Item 3
            </Typography>
          </Box>
        )}
      </Box>

      <Box sx={{ display: "flex", marginTop: "45px" }}>
        <Box
          component={"img"}
          src={Jobs}
          sx={{
            height: "60px",
            width: "60px",
          }}
        />
        {leftExpanded && (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: 900,
              }}
            >
              Jobs
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 900,
              }}
            >
              Manage your jobs
            </Typography>
            {JOBS.map((item) => {
              return (
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: 500,
                  }}
                  onClick={(event) =>
                    handleSubClick(event, "adminJobs", item.path)
                  }
                >
                  {item.label}
                </Typography>
              );
            })}
          </Box>
        )}
      </Box>

      <Box sx={{ display: "flex", marginTop: "45px", width: "100%" }}>
        <Box
          component={"img"}
          src={Talent}
          sx={{
            height: "60px",
            width: "60px",
          }}
        />
        {leftExpanded && (
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: 900,
              }}
            >
              Talent
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 900,
              }}
            >
              Manage your talent
            </Typography>

            {talentList.map((subMenuItem, subIndex) => (
              <List disablePadding={true}>
                <ListItemButton
                  key={subIndex}
                  sx={{
                    padding: "0px !important",
                  }}
                  onClick={() => {
                    subMenuItem?.submenu && handleClickOpen(subIndex);
                  }}
                >
                  {console.log(subMenuItem.path)}
                  <ListItemText
                    sx={{
                      margin: "0px !important",
                      "& .MuiTypography-root": {
                        fontSize: "15px",
                        fontWeight: 500,
                      },
                    }}
                    primary={subMenuItem.label}
                    onClick={(event) => {
                      subMenuItem?.submenu && handleClickOpen(subIndex);
                      subMenuItem?.submenu.length <= 0 &&
                        handleSubClick(
                          event,
                          "admin-talent",
                          subMenuItem.path,
                          subIndex
                        );
                    }}
                  />
                  {subMenuItem?.submenu.length ? (
                    open[subIndex] ? (
                      <Box
                        component={"img"}
                        src={upArrow}
                        sx={{
                          height: "28px",
                          width: "30px",
                        }}
                      />
                    ) : (
                      <Box
                        component={"img"}
                        src={downArrow}
                        sx={{
                          height: "28px",
                          width: "30px",
                        }}
                      />
                    )
                  ) : null}
                </ListItemButton>
                <Collapse in={open[subIndex]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {subMenuItem?.submenu.map((item, index) => (
                      <ListItemButton sx={{ padding: "0 0 0 24px!important" }}>
                        <ListItemText
                          sx={{
                            margin: "0px !important",
                            "& .MuiTypography-root": {
                              fontSize: "15px",
                              fontWeight: "normal",
                            },
                          }}
                          key={index}
                          primary={item?.label || item?.title}
                          onClick={(event) =>
                            handleSubClick(
                              event,
                              "admin-talent",
                              item.path,
                              index,
                              item?.pool_id
                            )
                          }
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </List>
            ))}
          </Box>
        )}
      </Box>

      <Box sx={{ display: "flex", marginTop: "45px", width: "100%" }}>
        <Box
          component={"img"}
          src={Search}
          sx={{
            height: "60px",
            width: "60px",
          }}
        />
        {leftExpanded && (
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: 900,
              }}
            >
              Search
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 900,
              }}
            >
              Find talent, fast!
            </Typography>
            {SEARCH.map((item, itemIndex) => {
              return (
                <List disablePadding={true}>
                  <ListItemButton
                    key={itemIndex}
                    sx={{
                      padding: "0px !important",
                    }}
                    onClick={() => {
                      item?.mySearch && handleSearchClick(itemIndex);
                    }}
                  >
                    <ListItemText
                      sx={{
                        margin: "0px !important",
                        "& .MuiTypography-root": {
                          fontSize: "15px",
                          fontWeight: 500,
                        },
                      }}
                      primary={item.label}
                      onClick={(event) =>
                        handleSubClick(event, "search", item.path, itemIndex)
                      }
                    />
                    {item?.mySearch.length ? (
                      searchOpen[itemIndex] ? (
                        <Box
                          component={"img"}
                          src={upArrow}
                          sx={{
                            height: "28px",
                            width: "30px",
                          }}
                        />
                      ) : (
                        <Box
                          component={"img"}
                          src={downArrow}
                          sx={{
                            height: "28px",
                            width: "30px",
                          }}
                        />
                      )
                    ) : null}
                  </ListItemButton>
                  <Collapse
                    in={searchOpen[itemIndex]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {item?.mySearch.map((item, index) => (
                        <ListItemButton
                          sx={{ padding: "0 0 0 24px!important" }}
                        >
                          <ListItemText
                            sx={{
                              margin: "0px !important",
                              "& .MuiTypography-root": {
                                fontSize: "15px",
                                fontWeight: "normal",
                              },
                            }}
                            key={index}
                            primary={item?.label || item?.title}
                            onClick={(event) =>
                              handleSubClick(event, "", item.path, index)
                            }
                          />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </List>
              );
            })}
          </Box>
        )}
      </Box>

      <Box sx={{ display: "flex", marginTop: "45px" }}>
        <Box
          component={"img"}
          src={Chat}
          sx={{
            height: "60px",
            width: "60px",
          }}
        />
        {leftExpanded && (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: 900,
              }}
            >
              Chat
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 900,
              }}
            >
              Who said what
            </Typography>
          </Box>
        )}
      </Box>

      <Box sx={{ display: "flex", marginTop: "45px" }}>
        <Box
          component={"img"}
          src={Maintenance}
          sx={{
            height: "60px",
            width: "60px",
            marginBottom: "45px",
          }}
        />
        {leftExpanded && (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: 900,
              }}
            >
              Maintenance
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 900,
              }}
            >
              The nuts and bolts
            </Typography>
            {MAINTENANCE.map((item, itemIndex) => {
              return (
                <>
                  <List disablePadding={true}>
                    <ListItemButton
                      key={itemIndex}
                      sx={{
                        padding: "0px !important",
                      }}
                      // onClick={() => {
                      //   item?.databaseList && handleClick(itemIndex);
                      // }}
                    >
                      <ListItemText
                        sx={{
                          margin: "0px !important",
                          "& .MuiTypography-root": {
                            fontSize: "15px",
                            fontWeight: 500,
                          },
                        }}
                        primary={item.label}
                      />
                    </ListItemButton>
                    <List component="div" disablePadding>
                      {item?.databaseList.map((item, index) => (
                        <ListItemButton
                          sx={{ padding: "0 0 0 24px!important" }}
                        >
                          <ListItemText
                            sx={{
                              margin: "0px !important",
                              "& .MuiTypography-root": {
                                fontSize: "15px",
                                fontWeight: "normal",
                              },
                            }}
                            key={index}
                            primary={item?.label}
                            onClick={(event) =>
                              handleSubClick(
                                event,
                                "maintenance",
                                item.path,
                                index
                              )
                            }
                          />
                        </ListItemButton>
                      ))}
                    </List>
                  </List>
                </>
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
}
