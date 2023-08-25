import React, { useState } from "react";
import SmallButton from "../../../common/SmallButton";
import { Box, IconButton, Popover, Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import eye from "../../../../assets/Black_View.svg";
import loveThis from "../../../../assets/Black_I_Love_This.svg";
import cv from "../../../../assets/Black_CV.svg";
import chatHistory from "../../../../assets/Black_Chat History.svg";
import chat from "../../../../assets/Black_Chat.svg";
import user from "../../../../assets/Black_User_Profile.svg";
import email from "../../../../assets/Black_Email.svg";
import duplicate from "../../../../assets/Black_Duplicate.svg";
import contact from "../../../../assets/Black_Contact.svg";
import linkedin from "../../../../assets/linkedin.svg";
import personalDetail from "../../../../assets/Black_Personal Details.svg";
import SVGButton from "../../../common/SVGButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useDispatch } from "react-redux";
import CopyToClipboard from "react-copy-to-clipboard";
import { setAlert } from "../../../../redux/configSlice";
import { ALERT_TYPE } from "../../../../utils/Constants";

export default function ExpandBottomButtons({
  phoneNo,
  emailAddress,
  linkedinAddress,
}) {
  const [openInfoDialog, setOpenInfoDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [opeVideoDialog, setOpeVideoDialog] = useState(false);
  const [personalDetails, setPersonalDetail] = useState(false);
  const dispatch = useDispatch();

  const onHandleClose = () => {
    setOpenInfoDialog(false);
    setAnchorEl(null);
  };

  const handleInfoDialog = (event) => {
    setOpenInfoDialog(true);
    !openInfoDialog && setAnchorEl(event.target);
  };

  const handleVideoDialog = (event) => {
    setOpeVideoDialog(true);
    !opeVideoDialog && setAnchorEl(event.target);
  };
  const onHandleCloseVideo = () => {
    setOpeVideoDialog(false);
    setAnchorEl(null);
  };

  const handlePersonalDetail = (event) => {
    setPersonalDetail(true);
    !opeVideoDialog && setAnchorEl(event.target);
  };

  const onHandleClosePersonal = () => {
    setPersonalDetail(false);
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        margin: "16px",
      }}
    >
      <SmallButton
        color={"eyeview"}
        startIcon={<PlayArrowIcon />}
        padding={0}
        justifyContent={"flex-end"}
        borderRadius={50}
        height={31}
        width={33}
        fontWeight={700}
        onClick={handleVideoDialog}
      />
      <Popover
        id="dropdown-menu"
        open={opeVideoDialog}
        anchorEl={anchorEl}
        onClose={onHandleCloseVideo}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box
          sx={{
            width: "250px",
            padding: "16px !important",
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "14px",
            }}
          >
            Video:
          </Typography>
          <Box sx={{ display: "flex", pt: 1 }}>
            <SmallButton
              color={"redButton"}
              startIcon={<PlayArrowIcon />}
              padding={0}
              justifyContent={"flex-end"}
              borderRadius={50}
              // startIconMargin="4px"
              // margin="auto"
              height={31}
              width={33}
              fontWeight={700}
            />
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "14px",
                marginLeft: "16px !important",
                margin: "auto",
              }}
            >
              Crayon Cam
            </Typography>
          </Box>
          <Box sx={{ display: "flex", pt: 1 }}>
            <SmallButton
              color={"eyeview"}
              startIcon={<PlayArrowIcon />}
              padding={0}
              justifyContent={"flex-end"}
              borderRadius={50}
              // startIconMargin="4px"
              // margin="auto"
              height={31}
              width={33}
              fontWeight={700}
            />
            <Typography
              sx={{
                fontWeight: 700,
                marginLeft: "16px !important",
                margin: "auto",
                fontSize: "14px",
              }}
            >
              Application Video
            </Typography>
          </Box>
        </Box>
      </Popover>
      <SVGButton color={"redButton"} source={cv} onClick={handleInfoDialog} />

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
          horizontal: "center",
        }}
      >
        <Box
          sx={{
            width: "250px",
            padding: "16px !important",
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "14px",
            }}
          >
            Documents:
          </Typography>
          <Box sx={{ display: "flex", pt: 1 }}>
            <SVGButton color={"redButton"} source={user} />
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "14px",
                marginLeft: "16px !important",
                margin: "auto",
              }}
            >
              Crayon Vitae
            </Typography>
          </Box>
          <Box sx={{ display: "flex", pt: 1 }}>
            <SVGButton color={"redButton"} source={cv} />
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "14px",
                marginLeft: "16px !important",
                margin: "auto",
              }}
            >
              Original CV
            </Typography>
          </Box>
          <Box sx={{ display: "flex", pt: 1 }}>
            <SVGButton color={"redButton"} source={user} />
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "14px",
                marginLeft: "16px !important",
                margin: "auto",
              }}
            >
              Portfolio
            </Typography>
          </Box>
        </Box>
      </Popover>

      <SVGButton
        color={"quicklinks"}
        source={personalDetail}
        onClick={handlePersonalDetail}
      />
      <Popover
        id="dropdown-menu"
        open={personalDetails}
        anchorEl={anchorEl}
        onClose={onHandleClosePersonal}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Box
          sx={{
            width: "250px",
            padding: "16px !important",
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "14px",
            }}
          >
            Contact info:
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", pt: 1 }}>
              <SVGButton color={"quicklinks"} source={email} />

              <Tooltip title={emailAddress} placement="top-end">
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "14px",
                    marginLeft: "16px !important",
                    width: "150px",
                    margin: "auto",
                    whiteSpace: "nowrap", // Prevents text from wrapping
                    overflow: "hidden", // Hides any overflowing content
                    textOverflow: "ellipsis", // Adds dots at the end of overflowing text
                  }}
                >
                  {emailAddress}
                </Typography>
              </Tooltip>
            </Box>
            <CopyToClipboard
              text={emailAddress}
              onCopy={() => {
                dispatch(
                  setAlert({
                    show: true,
                    type: ALERT_TYPE.SUCCESS,
                    msg: "Copied to clipboard",
                  })
                );
              }}
            >
              <SVGButton color={"white"} source={duplicate} />
            </CopyToClipboard>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", pt: 1 }}>
              <SVGButton color={"quicklinks"} source={contact} />
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "14px",
                  margin: "auto",
                  marginLeft: "16px !important",
                }}
              >
                {phoneNo}
              </Typography>
            </Box>
            <CopyToClipboard
              text={phoneNo}
              onCopy={() => {
                dispatch(
                  setAlert({
                    show: true,
                    type: ALERT_TYPE.SUCCESS,
                    msg: "Copied to clipboard",
                  })
                );
              }}
            >
              <SVGButton color={"white"} source={duplicate} />
            </CopyToClipboard>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", pt: 1 }}>
              <SVGButton color={"white"} source={linkedin} />
              <Tooltip title={linkedinAddress} placement="top">
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "14px",
                    marginLeft: "16px !important",
                    width: "150px",
                    margin: "auto",
                    whiteSpace: "nowrap", // Prevents text from wrapping
                    overflow: "hidden", // Hides any overflowing content
                    textOverflow: "ellipsis", // Adds dots at the end of overflowing text
                  }}
                >
                  {linkedinAddress !== null ? linkedinAddress : "-"}
                </Typography>
              </Tooltip>
            </Box>
            <CopyToClipboard
              text={linkedinAddress}
              onCopy={() => {
                dispatch(
                  setAlert({
                    show: true,
                    type: ALERT_TYPE.SUCCESS,
                    msg: "Copied to clipboard",
                  })
                );
              }}
            >
              <SVGButton color={"white"} source={duplicate} />
            </CopyToClipboard>
          </Box>
        </Box>
      </Popover>
      <SVGButton color={"yellowButton100"} source={chatHistory} />
      <SVGButton color={"redButton"} source={chat} />
    </Box>
  );
}
