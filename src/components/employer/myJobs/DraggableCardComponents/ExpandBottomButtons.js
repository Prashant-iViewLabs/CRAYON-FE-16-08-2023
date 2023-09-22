import React, { useState } from "react";
import SmallButton from "../../../common/SmallButton";
import { Box, IconButton, Popover, Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import eye from "../../../../assets/Black_View.svg";
import loveThis from "../../../../assets/Black_I_Love_This.svg";
import cv from "../../../../assets/CircularIcon/Red/Circular Icons__Red_CV.svg";
import playIcon from "../../../../assets/CircularIcon/Green/Circular Icons__Green_Play.svg";
import playIconRed from "../../../../assets/CircularIcon/Red/Circular Icons__Red_Play.svg";
import chatHistory from "../../../../assets/CircularIcon/Yellow/Circular Icons__Yellow_Chat History_2.svg";
import chat from "../../../../assets/CircularIcon/Red/Circular Icons__Red_Chat History_1.svg";
import user from "../../../../assets/CircularIcon/Red/Circular Icons__Red_User_Profile.svg";
import email from "../../../../assets/CircularIcon/Blue/Circular Icons__Blue_Mail.svg";
import duplicate from "../../../../assets/Padding Included/Blue_Documents.svg";
import contact from "../../../../assets/Black_Contact.svg";
import linkedin from "../../../../assets/linkedin.svg";
import personalDetail from "../../../../assets/Black_Personal Details.svg";
import SVGButton from "../../../common/SVGButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useDispatch } from "react-redux";
import CopyToClipboard from "react-copy-to-clipboard";
import { setAlert } from "../../../../redux/configSlice";
import { ALERT_TYPE } from "../../../../utils/Constants";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";

export default function ExpandBottomButtons({
  phoneNo,
  emailAddress,
  linkedinAddress,
  userID,
  cvLink,
}) {
  const [openInfoDialog, setOpenInfoDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [opeVideoDialog, setOpeVideoDialog] = useState(false);
  const [personalDetails, setPersonalDetail] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();
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
        margin: "auto",
        gap: "10px",
        marginTop: "8px",
      }}
    >
      <SVGButton
        color={"white"}
        source={playIcon}
        onClick={handleVideoDialog}
        height={40}
        width={40}
        startIconMargin={"0px !important"}
        padding={"0px !important"}
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
            <SVGButton
              color={"white"}
              source={playIconRed}
              height={30}
              width={30}
              startIconMargin={"0px !important"}
              padding={"0px !important"}
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
            <SVGButton
              color={"white"}
              source={playIcon}
              height={30}
              width={30}
              startIconMargin={"0px !important"}
              padding={"0px !important"}
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

      <SVGButton
        color={"white"}
        source={cv}
        onClick={handleInfoDialog}
        height={40}
        width={40}
        startIconMargin={"0px !important"}
        padding={"0px !important"}
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
          <Link
            to={`/candidate-cv/${userID}`}
            target="_blank"
            style={{
              textDecoration: "none",
              color: theme.palette.black,
              cursor: "pointer",
            }}
          >
            <Box sx={{ display: "flex", pt: 1 }}>
              <SVGButton
                color={"redButton"}
                source={user}
                height={30}
                width={30}
                startIconMargin={"0px !important"}
                padding={"0px !important"}
              />
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
          </Link>
          <Link
            to={`${cvLink}`}
            target="_blank"
            style={{
              textDecoration: "none",
              color: theme.palette.black,
              cursor: "pointer",
            }}
          >
            <Box sx={{ display: "flex", pt: 1 }}>
              <SVGButton
                color={"redButton"}
                source={cv}
                height={30}
                width={30}
                startIconMargin={"0px !important"}
                padding={"0px !important"}
              />
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "14px",
                  marginLeft: "16px !important",
                  margin: "auto",
                }}
                // onClick={() => handleDownloadClick(cvLink)}
              >
                Original CV
              </Typography>
            </Box>
          </Link>
          <Box sx={{ display: "flex", pt: 1 }}>
            <SVGButton
              color={"redButton"}
              source={user}
              height={30}
              width={30}
              startIconMargin={"0px !important"}
              padding={"0px !important"}
            />
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
        height={40}
        width={40}
        startIconMargin={"0px !important"}
        padding={"0px !important"}
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
              <SVGButton
                color={"quicklinks"}
                source={email}
                height={30}
                width={30}
                startIconMargin={"0px !important"}
                padding={"0px !important"}
              />

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
              <SVGButton
                color={"black"}
                source={duplicate}
                height={40}
                width={40}
                startIconMargin={"0px !important"}
                padding={"0px !important"}
              />
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
              <SVGButton
                color={"quicklinks"}
                source={contact}
                height={21}
                width={30}
                startIconMargin={"0px !important"}
                padding={"0px !important"}
              />
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
              <SVGButton
                color={"black"}
                source={duplicate}
                height={40}
                width={40}
                startIconMargin={"0px !important"}
                padding={"0px !important"}
              />
            </CopyToClipboard>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link
              to={`${linkedinAddress}`}
              target="_blank"
              style={{
                textDecoration: "none",
                color: theme.palette.black,
                cursor: "pointer",
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
            </Link>
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
              <SVGButton
                color={"black"}
                source={duplicate}
                height={40}
                width={40}
                startIconMargin={"0px !important"}
                padding={"0px !important"}
              />
            </CopyToClipboard>
          </Box>
        </Box>
      </Popover>
      <SVGButton
        color={"white"}
        source={chatHistory}
        height={40}
        width={40}
        startIconMargin={"0px !important"}
        padding={"0px !important"}
      />
      <SVGButton
        color={"white"}
        source={chat}
        height={40}
        width={40}
        startIconMargin={"0px !important"}
        padding={"0px !important"}
      />
    </Box>
  );
}
