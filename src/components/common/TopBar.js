import { useState, useEffect, Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled, useTheme } from "@mui/material/styles";
import crayon from "../../assets/Crayon_Favicon.svg";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  PUBLIC_TAB_ITEMS,
  DRAWER_WIDTH,
  AUTHORIZED_TAB_ITEMS_EMPLOYER,
  AUTHORIZED_TAB_ITEMS_CANDIDATE,
  ALERT_TYPE,
  ERROR_MSG,
} from "../../utils/Constants";
import { useLocation, Link, useNavigate } from "react-router-dom";
import locale from "../../i18n/locale";
import BarChartIcon from "@mui/icons-material/BarChart";
import CustomDialog from "./CustomDialog";
import Signup from "../login/signup";
import Login from "../login/login";
import { setAlert } from "../../redux/configSlice";
import {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
} from "../../utils/Common";
import { login, logout } from "../../redux/login/loginSlice";
import { Popover, Typography } from "@mui/material";
import jwt_decode from "jwt-decode";

import userProfile from "../../assets/Padding Included/User_Profile.svg";
import profileDetail from "../../assets/Padding Included/Profile_Details.svg";
import { TryOutlined } from "@mui/icons-material";

const StyledTab = styled(Tabs)(({ theme }) => ({
  "& .MuiTab-root": {
    textTransform: "none",
    color: theme.palette.black,
    fontSize: 16,
    fontWeight: 700,
    opacity: 1,
  },
  "& .MuiTabs-indicator": {
    backgroundColor: theme.palette.redButton.main,
    height: "4px",
    borderRadius: "5px",
    // display: "flex",
    // justifyContent: "center",
    // backgroundColor: "transparent",
    // height: "60px",
    // width: "60px  !important",
    // borderRadius: "50%",
    // borderRight: "5px solid transparent",
    // borderLeft: "5px solid transparent",
    // borderBottom: "5px solid orange",
  },
}));

export default function TopBar() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const i18n = locale.en;
  let { pathname } = useLocation();
  const navigate = useNavigate();

  const token = localStorage?.getItem("token");
  let decodedToken;
  if (token) {
    decodedToken = jwt_decode(token);
  }

  const userType = decodedToken?.data?.role_id;

  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(getLocalStorage("token"))
  );

  const [isAdmin, setIsAdmin] = useState(false);
  const [currentTabs, setcurrentTabs] = useState(PUBLIC_TAB_ITEMS);
  const [activeTab, setActiveTab] = useState(pathname.slice(1));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [publicTabs, setPublicTabs] = useState(PUBLIC_TAB_ITEMS);
  const quickLinksButtonRef = useRef(null);

  const sign = useSelector((state) => state.sign);
  // const handleLogin = () => {
  //   setOpenLoginDialog(true);
  //   setShowLogin(true);
  // };
  // const handleSignup = () => {
  //   setOpenLoginDialog(true);
  //   setShowLogin(false);
  // };
  const onHandleClose = () => {
    setOpenLoginDialog(false);
    setShowSignup(false);
  };

  useEffect(() => {
    if (pathname.slice(1) != activeTab) {
      setActiveTab(pathname.slice(1));
    }
  }, [pathname]);

  useEffect(() => {
    //on refresh
    setIsAdmin(false);
    if (userType == 1 || userType == 4) {
      if (pathname.slice(1).includes("admin")) {
        setIsAdmin(true);
        setcurrentTabs([]);
      } else {
        if (pathname.slice(1).includes("employer")) {
          setIsLoggedIn(true);
          setcurrentTabs(AUTHORIZED_TAB_ITEMS_EMPLOYER);
        } else {
          setcurrentTabs(PUBLIC_TAB_ITEMS);
        }
      }
    } else if (userType == 3) {
      if (pathname.slice(1).includes("candidate")) {
        setIsLoggedIn(true);
        setcurrentTabs(AUTHORIZED_TAB_ITEMS_CANDIDATE);
      } else {
        setcurrentTabs(PUBLIC_TAB_ITEMS);
      }
    } else {
      setcurrentTabs(PUBLIC_TAB_ITEMS);
    }
  }, [activeTab, userType, isLoggedIn]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleTabChange = (event, newTab) => {
    setActiveTab(newTab);
    if (
      newTab === "employer/quick_links" ||
      newTab === "candidate/quick_links"
    ) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleTabClick = (event, newTab) => {
    setAnchorEl(quickLinksButtonRef.current);
  };

  const signUpHandle = () => {
    const role_id = decodedToken?.data?.role_id;
    console.log(role_id, decodedToken?.data?.role_id);
    if (Boolean(getLocalStorage("token")) && localStorage.getItem("temp")) {
      let tabs;
      if (role_id == 4) {
        tabs = AUTHORIZED_TAB_ITEMS_EMPLOYER;
        navigate("employer/my-profile", { replace: true });
        setActiveTab("employer/my-profile");
      } else {
        tabs = AUTHORIZED_TAB_ITEMS_CANDIDATE;
        navigate("candidate/my-profile", { replace: true });
        setActiveTab("candidate/my-profile");
      }
      setcurrentTabs(tabs);
      // setLocalStorage("isLoggedIn", true);
      // setLocalStorage("userType", role_id);
      setIsLoggedIn(true);
      localStorage.removeItem("temp");
    }
  };
  useEffect(() => {
    signUpHandle();
  }, [sign]);

  const onHandleLogin = async (loginData) => {
    try {
      const { payload } = await dispatch(login(loginData));

      if (payload?.status == "success" && payload?.token) {
        setShowLogin(false);

        const user = payload.data.role_id;
        setLocalStorage("token", payload?.token);
        onHandleClose();

        const jwt = localStorage?.getItem("token");
        const parts = jwt?.split(".");
        if (parts?.length !== 3) {
          throw new Error("Invalid JWT");
        }
        const encodedPayload = parts[1];
        const decodedPayload = atob(encodedPayload);
        const payloadData = JSON.parse(decodedPayload);
        const profileCompletion = payloadData.data?.profile_percent_complete;
        let tabs;
        if (user === 1) {
          setIsAdmin(true);
          navigate("admin/dashboard", { replace: true });
        } else if (user === 4) {
          if (profileCompletion === 100) {
            tabs = AUTHORIZED_TAB_ITEMS_EMPLOYER;
            navigate("employer/my-jobs", { replace: true });
            setActiveTab("employer/my-jobs");
          } else {
            tabs = AUTHORIZED_TAB_ITEMS_EMPLOYER;
            navigate("employer/my-jobs", { replace: true });
            setActiveTab("employer/my-jobs");
          }
        } else {
          if (profileCompletion === 0) {
            tabs = AUTHORIZED_TAB_ITEMS_CANDIDATE;
            navigate("candidate/my-jobs", { replace: true });
            setActiveTab("candidate/my-jobs");
          } else {
            tabs = AUTHORIZED_TAB_ITEMS_CANDIDATE;
            navigate("candidate/my-jobs", { replace: true });
            setActiveTab("candidate/my-jobs");
          }
        }

        setcurrentTabs(tabs);
        // setLocalStorage("isLoggedIn", true);
        // setLocalStorage("userType", user);
        setIsLoggedIn(true);
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Successfully Login!",
          })
        );
      } else {
        console.log(payload);
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.ERROR,
            msg: payload?.message?.message,
          })
        );
      }
    } catch (error) {
      dispatch(setAlert({ show: true }));
    }
  };

  const handlequicklinks = () => {
    setcurrentTabs(PUBLIC_TAB_ITEMS);
  };
  const handleLogout = async () => {
    try {
      const { payload } = await dispatch(logout());
      if (payload.status === "success") {
        removeLocalStorage("token");
        removeLocalStorage("isLoggedIn");
        removeLocalStorage("userType");
        removeLocalStorage("cvComponent");
        removeLocalStorage("jobComponent");
        setIsLoggedIn(false);
        setIsAdmin(false);
        navigate("jobs", { replace: true });
        setcurrentTabs(PUBLIC_TAB_ITEMS);
        setActiveTab("jobs");
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Logged out successfully!",
          })
        );
      }
    } catch (error) {}
  };
  const handleTalent = () => {
    setIsAdmin(true);
    navigate("admin/dashboard", { replace: true });
  };
  const handleHomeLogoClick = () => {
    setIsAdmin(false);
    navigate("/", { replace: true });
    setcurrentTabs(PUBLIC_TAB_ITEMS);
    setActiveTab("");
  };
  const handleMyCrayon = () => {
    setIsAdmin(false);
    if (userType == 4) {
      navigate("employer/my-jobs", { replace: true });
      setcurrentTabs(AUTHORIZED_TAB_ITEMS_EMPLOYER);
      setActiveTab("employer/my-jobs");
    } else {
      navigate("candidate/my-jobs", { replace: true });
      setcurrentTabs(AUTHORIZED_TAB_ITEMS_CANDIDATE);
      setActiveTab("candidate/my-jobs");
    }
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const handleCloseLogin = () => {
    setShowLogin(false);
  };
  const handleCloseSignup = () => {
    setShowSignup(false);
  };
  const toggleForm = () => {
    setShowLogin((prevState) => !prevState);
    setShowSignup((prevState) => !prevState);
  };
  const open = Boolean(anchorEl);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box
        component="img"
        sx={{
          height: 40,
          width: 74,
          maxHeight: { xs: 40 },
          maxWidth: { xs: 74 },
        }}
        alt="crayon logo"
        src={crayon}
      />
      <Divider />
      <List>
        {currentTabs?.map(({ label }) => (
          <ListItem key={label} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
        {!isLoggedIn ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              paddingTop: "8px",
            }}
          >
            {/* <ListItem disablePadding> */}
            <Button
              variant="contained"
              color="base"
              sx={{
                mr: 2,
                width: "40%",
                border: `solid ${theme.palette.redButton.main} 2px`,
                color: theme.palette.redButton.main,
              }}
              onClick={() => setShowLogin(true)}
            >
              {i18n["topBar.login"]}
            </Button>
            {/* </ListItem> */}
            {/* <ListItem disablePadding> */}
            <Button
              variant="contained"
              color="redButton"
              sx={{ width: "40%" }}
              onClick={() => setShowSignup(true)}
            >
              {i18n["topBar.join"]}
            </Button>
            {/* </ListItem> */}
          </div>
        ) : (
          <Button
            variant="contained"
            sx={{
              ml: 2,
              mr: 2,
              width: "96px",
              border: `solid ${theme.palette.redButton.main} 2px`,
              color: theme.palette.redButton.main,
            }}
            color="base"
            onClick={handleLogout}
          >
            {i18n["topBar.logout"]}
          </Button>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        component="nav"
        elevation={0}
        color="base"
        sx={{
          borderRadius: 0,
          height: "80px",
          justifyContent: "center",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: { xs: "space-between" },
          }}
        >
          <div>
            <Box
              sx={{
                display: "flex",
                cursor: "pointer",
              }}
              onClick={handleHomeLogoClick}
            >
              <Box
                component="img"
                sx={{
                  height: 45,
                  marginTop: 1,
                  cursor: "pointer",
                }}
                alt="crayon logo"
                src={crayon}
              />
              <Box
                sx={{
                  marginLeft: 1,
                }}
              >
                <Typography
                  sx={{
                    margin: 0,
                    fontWeight: "bold",
                    fontFamily: "",
                  }}
                  variant="h4"
                >
                  Crayon
                </Typography>
                <Typography
                  sx={{
                    fontSize: "11px",
                    letterSpacing: 1,
                    margin: 0,
                    fontWeight: 600,
                    lineHeight: 1,
                    textAlign: "center",
                  }}
                  paragraph
                >
                  we connect smiles
                </Typography>
              </Box>
            </Box>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ paddingRight: "25px" }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ mr: 0, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              {!isAdmin && (
                <>
                  <StyledTab
                    value={activeTab}
                    onChange={handleTabChange}
                    // onClick={handleQuickLinkTab}
                    textColor="inherit"
                    aria-label="secondary tabs example"
                    sx={{
                      display: { xs: "none", sm: "block" },
                    }}
                  >
                    {currentTabs?.map(({ label, path }) => (
                      <Tab
                        ref={
                          label === "quick links" ? quickLinksButtonRef : null
                        }
                        onClick={label == "quick links" && handleTabClick}
                        key={path}
                        value={path}
                        to={label != "quick links" ? path : null}
                        label={label}
                        component={Link}
                        sx={{
                          display: "flex",
                          flexDirection: "row-reverse",
                          justifyContent: "center",
                          minHeight: "48px !important",
                        }}
                        icon={
                          label == "quick links" ? (
                            <>
                              {open ? (
                                <KeyboardArrowUpIcon />
                              ) : (
                                <KeyboardArrowDownIcon />
                              )}
                            </>
                          ) : (
                            ""
                          )
                        }
                      />
                    ))}
                  </StyledTab>
                  <Popover
                    id="dropdown-menu"
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handlePopoverClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <Tabs orientation="vertical" onChange={handlequicklinks}>
                      {publicTabs?.map(({ label, path }) => (
                        <Tab
                          key={path}
                          value={path}
                          to={path}
                          label={label}
                          component={Link}
                          onClick={handlePopoverClose}
                        />
                      ))}
                    </Tabs>
                  </Popover>
                </>
              )}
            </div>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {/* {isLoggedIn == true && !isAdmin && userType == 4 && (
                <IconButton color="redButton">
                  <NotificationsIcon />
                </IconButton>
              )} */}
              {isLoggedIn == true ? (
                <>
                  <Button
                    variant="contained"
                    sx={{
                      ml: 2,
                      mr: 2,
                      width: "96px",
                      border: `solid ${theme.palette.redButton.main} 2px`,
                      color: theme.palette.redButton.main,
                    }}
                    color="base"
                    onClick={handleLogout}
                  >
                    {i18n["topBar.logout"]}
                  </Button>
                  {userType == 4 &&
                    (isAdmin ? (
                      <>
                        <Button
                          variant="contained"
                          sx={{ mr: 2, width: "96px" }}
                          color="orangeButton"
                        >
                          {i18n["topBar.lite"]}
                        </Button>
                        <Button
                          variant="contained"
                          sx={{ mr: 2, width: "96px" }}
                          color="redButton"
                        >
                          {i18n["topBar.upgrade"]}
                        </Button>
                        <Button
                          variant="contained"
                          sx={{ width: "110px" }}
                          color="redButton"
                          onClick={handleMyCrayon}
                        >
                          {i18n["topBar.myCrayon"]}
                        </Button>
                      </>
                    ) : currentTabs == PUBLIC_TAB_ITEMS ? (
                      <Button
                        variant="contained"
                        sx={{ width: "110px" }}
                        color="redButton"
                        onClick={handleMyCrayon}
                      >
                        {i18n["topBar.myCrayon"]}
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="redButton"
                        endIcon={<BarChartIcon />}
                        onClick={handleTalent}
                        sx={{
                          width: "96px",
                          "& .MuiButton-endIcon": {
                            background: theme.palette.white,
                            borderRadius: "2px",
                            color: theme.palette.redButton.main,
                          },
                        }}
                      >
                        {i18n["topBar.talent"]}
                      </Button>
                    ))}
                  {userType == 3 && currentTabs == PUBLIC_TAB_ITEMS && (
                    <Button
                      variant="contained"
                      sx={{ width: "110px" }}
                      color="redButton"
                      onClick={handleMyCrayon}
                    >
                      {i18n["topBar.myCrayon"]}
                    </Button>
                  )}
                </>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    borderRadius: 4,
                    overflow: "hidden",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      width: "50%",
                      padding: 3,
                      borderRadius: 0,
                    }}
                    color="redButton100"
                    onClick={() => setShowLogin(true)}
                  >
                    <Box
                      component="img"
                      sx={{
                        height: 25,
                        cursor: "pointer",
                      }}
                      alt="crayon logo"
                      src={userProfile}
                    />{" "}
                    {i18n["topBar.login"]}
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      width: "50%",
                      padding: 3,
                      borderRadius: 0,
                    }}
                    color="blueButton300"
                    // startIcon={}
                    onClick={() => setShowSignup(true)}
                  >
                    <Box
                      component="img"
                      sx={{
                        height: 25,
                        marginRight: 1,
                        cursor: "pointer",
                      }}
                      alt="crayon logo"
                      src={profileDetail}
                    />
                    {i18n["topBar.join"]}
                  </Button>
                </Box>
              )}
            </Box>
          </div>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          anchor="right"
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Login
        handleLogin={onHandleLogin}
        openFunc={showLogin}
        toggleForm={toggleForm}
        closeFunc={handleCloseLogin}
      />
      <Signup
        onDialogClose={onHandleClose}
        toggleForm={toggleForm}
        openFunc={showSignup}
        closeFunc={handleCloseSignup}
      />
      {/* {showLogin ? (
        <Login handleLogin={onHandleLogin} toggleForm={toggleForm} openFunc={handleLogin} closeFunc={onHandleClose}/>
      ) : (
      )} */}
    </Box>
  );
}
