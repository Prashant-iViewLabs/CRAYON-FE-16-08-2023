import React, { useState } from "react";
import { Box, Typography, Switch, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CustomDialog from "../../common/CustomDialog";
import RoundCrossSign from "../../../assets/roundCrossSign.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton, InputBase, Popover } from "@mui/material";
import { useTheme } from "@emotion/react";
import {
  editUserPassword,
  removeMember,
} from "../../../redux/employer/myTeams";
import { useDispatch } from "react-redux";
import { setAlert } from "../../../redux/configSlice";
import { ALERT_TYPE } from "../../../utils/Constants";

const Actions = ({ userID, permission, setDeleted }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openInfoDialog, setOpenInfoDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [inputType, setInputType] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const theme = useTheme();
  const dispatch = useDispatch();

  const handleOpenDelete = () => {
    setOpenDelete((prevState) => !prevState);
  };
  const handleEdit = (event) => {
    setOpenInfoDialog(true);
    !openInfoDialog && setAnchorEl(event.target);
  };

  const handleShowPassword = () => {
    if (showPassword) setInputType("password");
    else setInputType("text");

    setShowPassword(!showPassword);
  };

  const onHandleClose = () => {
    setOpenInfoDialog(false);
    setAnchorEl(null);
  };

  const handleChangePassword = async () => {
    try {
      const data = {
        userid: userID,
        password: newPassword,
      };
      console.log(data);
      const { payload } = await dispatch(editUserPassword(data));
      if (payload.status === "success") {
        console.log(payload);
        setOpenInfoDialog(false);
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Password changed successfully",
          })
        );
      } else {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: payload.message,
          })
        );
      }
    } catch (error) {
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.SUCCESS,
          msg: error,
        })
      );
    }
  };

  const handleDeleteMember = async () => {
    try {
      const data = {
        userids: [userID],
      };
      const { payload } = await dispatch(removeMember(data));
      if (payload.status === "success") {
        setOpenDelete(false);
        setDeleted(payload.data);
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Member removed",
          })
        );
      } else {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.ERROR,
            msg: payload?.message,
          })
        );
      }
    } catch (error) {
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: error,
        })
      );
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        {permission !== "Super Admin" ? (
          <DeleteIcon
            color="blueButton400"
            onClick={handleOpenDelete}
            sx={{ cursor: "pointer" }}
          />
        ) : null}

        <EditIcon
          color="redButton100"
          onClick={handleEdit}
          sx={{ cursor: "pointer" }}
        />
        <Popover
          id="dropdown-menu"
          open={openInfoDialog}
          anchorEl={anchorEl}
          onClose={onHandleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          sx={{
            width: "100% !important",
            "& .css-ll95b0-MuiPaper-root-MuiPopover-paper": {
              padding: "16px !important",
            },
          }}
        >
          <Box sx={{ mt: 3 }}>
            <Paper
              sx={{
                display: "flex",
                height: "40px",
                borderRadius: "25px",
                boxShadow: "none",
                border: `1px solid ${theme.palette.grayBorder}`,
              }}
            >
              <InputBase
                sx={{ ml: 2, mr: 2, width: "100%" }}
                id="password"
                type={inputType}
                placeholder="Change password"
                onChange={(event) => setNewPassword(event.target.value)}
              />
              <IconButton
                sx={{ py: 0 }}
                color=""
                aria-label="reset password"
                component="button"
                onClick={handleShowPassword}
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </Paper>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 0,
            }}
          >
            <Button
              sx={{
                width: 150,
                mt: 3,
              }}
              variant="contained"
              color="redButton"
              onClick={handleChangePassword}
            >
              Confirm
            </Button>
          </Box>
        </Popover>
      </Box>
      <CustomDialog
        show={openDelete}
        hideButton={false}
        dialogWidth="xs"
        showFooter={false}
        onDialogClose={handleOpenDelete}
        padding={0}
      >
        <Box
          sx={{
            padding: 4,
          }}
        >
          <Typography
            variant="h5"
            fontWeight={"Bold"}
            textAlign={"center"}
            sx={{
              marginBottom: 3,
            }}
          >
            Sure you want to delete?
          </Typography>
          <Typography
            fontSize={16}
            fontWeight={"bold"}
            textAlign={"center"}
            paragraph
          >
            Please confirm that you want to delete the selected user
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>Click to confirm</Typography>
            <Switch />
          </Box>
        </Box>
        <Box>
          <Button
            sx={{
              boxShadow: 0,
              fontSize: "14px",
              width: "50%",
              borderRadius: 0,
              height: "43px",
              background: "lightgray",
              color: "black",
              padding: 3,
            }}
            variant="contained"
            onClick={handleOpenDelete}
          >
            cancel
          </Button>
          <Button
            sx={{
              boxShadow: 0,
              fontSize: "14px",
              width: "50%",
              borderRadius: 0,
              height: "43px",
              padding: 3,
            }}
            variant="contained"
            color="redButton100"
            onClick={handleDeleteMember}
          >
            continue
          </Button>
        </Box>
      </CustomDialog>
    </>
  );
};

export default Actions;
