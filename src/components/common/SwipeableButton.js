import { useRef } from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { styled, useTheme } from "@mui/material/styles";
import locale from "../../i18n/locale";
import Typography from "@mui/material/Typography";
import { USER_TYPES } from "../../utils/Constants";

export default function SwipeableButton({
  selectedUser,
  onButtonToggle,
  setSignupTouched,
  error,
}) {
  const i18n = locale.en;
  const slider = useRef();
  const container = useRef();
  const theme = useTheme();
  console.log(selectedUser);
  const selectedColor = (selectedUser) => {
    console.log(selectedUser);
    switch (selectedUser) {
      case "Candidate":
        return "blueButton600";
      case "Employer":
        return "redButton";
      case "Recruiter":
        return "yellowButton100";
      case "Promoter":
        return "lightGreenButton300";
      default:
        break;
    }
  };
  const ButtonComponent = ({ selectedUser, nextUser }) => {
    return (
      <Button
        sx={{
          width: 100,
          boxShadow: 0,
        }}
        variant="contained"
        color={selectedColor(selectedUser)}
        onClick={(e) => onButtonToggle(e, nextUser)}
      >
        {selectedUser}
      </Button>
    );
  };

  const TypographyComponent = ({ user, children, ...otherStyles }) => {
    return (
      <Typography
        onClick={(e) => {
          onButtonToggle(e, user);
          setSignupTouched(true);
        }}
        sx={{
          fontWeight: 300,
          fontSize: 14,
          color: error
            ? theme.palette.redButton100.main
            : theme.palette.lightGray,
          cursor: "pointer",
          width: 100,
          textAlign: "center",
          ...otherStyles,
        }}
        variant="subtitle1"
      >
        {children}
      </Typography>
    );
  };
  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        borderRadius: "25px",
        height: "40px",
        alignItems: "center",
        justifyContent: "space-between",
        overflowX: "auto",
        whiteSpace: "nowrap",
        padding: "0 1px",
      }}
      style={{
        maxWidth: "100%",
      }}
    >
      {selectedUser === USER_TYPES[0] ? (
        <ButtonComponent selectedUser={selectedUser} nextUser={USER_TYPES[1]} />
      ) : (
        <TypographyComponent
          user={USER_TYPES[0]}
          color={selectedUser === undefined && "redButton100"}
        >
          {USER_TYPES[0]}
        </TypographyComponent>
      )}
      {selectedUser === USER_TYPES[1] ? (
        <ButtonComponent selectedUser={selectedUser} nextUser={USER_TYPES[2]} />
      ) : (
        <TypographyComponent
          user={USER_TYPES[1]}
          color={selectedUser === undefined && "redButton100"}
          // mr={selectedUser === USER_TYPES[0] ? 3 : 0}
          // ml={selectedUser === USER_TYPES[2] ? 3 : 0}
        >
          {USER_TYPES[1]}
        </TypographyComponent>
      )}
      {selectedUser === USER_TYPES[2] ? (
        <ButtonComponent selectedUser={selectedUser} nextUser={USER_TYPES[3]} />
      ) : (
        <TypographyComponent
          user={USER_TYPES[2]}
          color={selectedUser === undefined && "redButton100"}
          // mr={selectedUser === USER_TYPES[1] ? 3 : 0}
          // ml={selectedUser === USER_TYPES[3] ? 3 : 0}
        >
          {USER_TYPES[2]}
        </TypographyComponent>
      )}
      {selectedUser === USER_TYPES[3] ? (
        <ButtonComponent selectedUser={selectedUser} nextUser={USER_TYPES[0]} />
      ) : (
        <TypographyComponent
          user={USER_TYPES[3]}
          color={selectedUser === undefined && "redButton100"}
        >
          {USER_TYPES[3]}
        </TypographyComponent>
      )}
    </Paper>
  );
}
