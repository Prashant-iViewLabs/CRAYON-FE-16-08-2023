import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    // mode: 'light',
    base: {
      main: "#FFFFFF",
    },
    cvColor: {
      main: "#E0E0E080",
      contrastText: "#FFFFFF",
      light: "#f1e5ff",
    },
    redButton: {
      main: "#E41E26",
      contrastText: "#FFFFFF",
      light: "#F44336",
    },
    redButton100: {
      main: "#E41E26",
      contrastText: "#FFFFFF",
    },
    pinkButton: {
      main: "#F5576C",
      contrastText: "#FFFFFF",
    },
    orangeButton: {
      main: "#FF934A",
      contrastText: "#FFFFFF",
      light: "#ff9800",
    },
    orangeButton100: {
      main: "#F09248",
      contrastText: "#FFFFFF"
    },
    blueButton100: {
      main: "#52CBDC",
      contrastText: "#FFFFFF",
    },
    blueButton200: {
      main: "#59B4D1",
      contrastText: "#FFFFFF",
    },
    blueButton300: {
      main: "#4382C3",
      contrastText: "#FFFFFF",
      light: "#1976d2",
    },
    blueButton400: {
      main: "#367BF5",
      contrastText: "#FFFFFF",
      light: "#1976d2",
    },
    blueButton500: {
      main: "#2980B9",
      contrastText: "#FFFFFF",
    },
    blueButton600: {
      main: "#8ACDEB",
      contrastText: "#FFFFFF",
    },
    blueButton700: {
      main: "#0A66C2",
      contrastText: "#FFFFFF",
    },
    blueButton800: {
      main: "#228cce",
      contrastText: "#FFFFFF"
    },
    yellowButton100: {
      main: "#F8B318",
      contrastText: "#FFFFFF",
      light: "#FBC02D",
    },
    yellowButton200: {
      main: "#F38E18",
      contrastText: "#FFFFFF",
    },
    yellowButton300: {
      main: "#F3AA18",
      contrastText: "#FFFFFF",
    },
    yellowButton400: {
      main: "#C19C47",
      contrastText: "#FFFFFF"
    },
    grayButton: {
      main: "#747474",
      contrastText: "#FFFFFF",
      light: "#78909c",
    },
    grayButton100: {
      main: "#efeeee",
      light: "#000000",
    },
    grayButton200: {
      main: "#E5E5E5",
      contrastText: "#000000",
    },
    grayButton300: {
      main: "#D4DADD",
      contrastText: "#FFFFFF",
    },
    grayButton400: {
      main: "#BFBEBE",
      contrastText: "#FFFFFF",
    },
    greenButton: {
      main: "#2FA84F",
      contrastText: "#FFFFFF",
    },
    greenButton200: {
      main: "#18CA09",
      contrastText: "#FFFFFF",
    },
    lightGreenButton100: {
      main: "#B6C773",
      contrastText: "#FFFFFF",
    },
    lightGreenButton200: {
      main: "#87A707",
      contrastText: "#FFFFFF",
    },
    lightGreenButton300: {
      main: "#61CA58",
      contrastText: "#FFFFFF",
    },
    lightBlueJobButton300: {
      main: "#0A66C2",
      contrastText: "#FFFFFF",
    },
    purpleButton: {
      main: "#993C7D",
      contrastText: "#FFFFFF",
    },
    purpleButton200: {
      main: "#811650",
      contrastText: "#FFFFFF",
    },
    purpleButton300: {
      main: "#F05DD8",
      contrastText: "#FFFFFF",
    },
    pinkButton100: {
      main: "#F05DD8",
      contrastText: "#FFFFFF",
    },
    brownButton: {
      main: "#C19C47",
      contrastText: "#FFFFFF",
    },
    black100: {
      main: "#000000",
      contrastText: "#FFFFFF",
    },
    recruit100: {
      main: "#C19C47",
      contrastText: "#FFFFFF",
    },
    eyeview: {
      main: "#1DB954",
      contrastText: "#FFFFFF",
    },
    eyeview100: {
      main: "#EBECF3",
      contrastText: "#FFFFFF",
    },
    QandA: {
      main: "#F09248",
      contrastText: "#FFFFFF",
    },
    quicklinks: {
      main: "#228CCE",
      contrastText: "#FFFFFF",
    },
    white: "#FFFFFF",
    black: "#000000",
    mainBackground: "#FAFAFA",
    menuBackground: "#F7F9FA",
    hoverBlue: "#E6EFFF",
    lightText: "#5E6366",
    lightGray: "#D3D3D3",
    grayRejct: "#efeeee",
    grayBackground: "#F0F0F0",
    grayBorder: "#E0E0E0",
    placeholder: "#C6CACC",
    grayIcon: "#545974",
    picNameColor: "#069697",
    yellowColor: "#DC9B53",
    chart: {
      red: "#EC5D60",
      green: "#B6C773",
      yellow: "#F09248",
      green200: "#18CA09",
    },
  },
  status: {
    pending: {
      main: "#F8B318",
    },
    ilikethis: {
      main: "#FF934A",
    },
    ilovethis: {
      main: "#B6C773",
    },
    notforme: {
      main: "#F05D61",
    },
    active: {
      main: "#B6C773",
    },
    paused: {
      main: "#FF934A",
    },
    closed: {
      main: "#F05D61",
    },
    rejected: {
      main: "#F05D61",
    },
  },
  manageTalent: {
    lovethis: {
      main: "#F05DD8",
      contrastText: "#FFFFFF",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 700,
          borderRadius: 25,
          height: "40px",
          boxShadow: "none",
          letterSpacing: "0.75px",
        },
      },
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },

    MuiListItemButton: {
      defaultProps: {
        disableRipple: true,
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
  },
  typography: {
    fontFamily: ["Nunito", "serif"].join(","),
  },
});

export default theme;
