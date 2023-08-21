import React from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputBase,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import smileFace from "../../assets/Characters/Blue_Circle_Smile.svg";
import { useTheme } from "@emotion/react";

const ForgotPassword = ({ openFunc, closeFunc }) => {
  const theme = useTheme();
  return (
    <Dialog
      sx={{
        padding: 0,
      }}
      open={openFunc}
      onDialogClose={closeFunc}
    >
      <DialogTitle onClose={closeFunc}>
        <IconButton
          aria-label="close"
          onClick={closeFunc}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          width: "350px",
          padding: "30px 0 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* <Box
                    
                > */}
        <Avatar src={smileFace} sx={{ width: 96, height: 96 }} />
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 700,
          }}
        >
          Forgot Password
        </Typography>

        <Box sx={{ mt: 3, width: "90%", padding: 0 }}>
          <Paper
            sx={{
              display: "flex",
              height: "40px",
              borderRadius: "25px",
              boxShadow: "none",
              border: `1px solid ${theme.palette.grayBorder}`,
            }}
          >
            <InputBase id="username" sx={{ ml: 2, mr: 2, width: "100%" }} />
          </Paper>
        </Box>

        <Box sx={{ mt: 3, width: "90%" }}>
          <Paper
            sx={{
              display: "flex",
              height: "40px",
              borderRadius: "25px",
              boxShadow: "none",
              border: `1px solid ${theme.palette.grayBorder}`,
            }}
          >
            <InputBase sx={{ ml: 2, mr: 2, width: "100%" }} />
          </Paper>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: 3,
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            remember me
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            marginTop: 3,
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            need an account?
          </Typography>
          <Link>
            <Typography
              sx={{
                color: "black",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              join Now
            </Typography>
          </Link>
        </Box>

        {/* </Box> */}
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 3,
          overflow: "hidden",
          padding: 0,
        }}
      >
        <Button
          sx={{
            width: "50%",
            borderRadius: 0,
            padding: 3,
          }}
          variant="contained"
          color="grayButton100"
          onClick={closeFunc}
        >
          Cancel
        </Button>
        <Button
          // onClick={handleResetPassword}
          sx={{
            width: "50%",
            borderRadius: 0,
            padding: 3,
            marginLeft: "0 !important",
          }}
          variant="contained"
          color="redButton"
        >
          Reset Password
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ForgotPassword;
