import {
  Box,
  Button,
  Grid,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React from "react";
import TalentSVGButton from "../../../common/TalentSVGButton";
import chatComment from "../../../../assets/Padding Excluded/Black_Chat_Green.svg";
import sort from "../../../../assets/Padding Excluded/Black_Sort_Filter.svg";
import locale from "../../../../i18n/locale";
import profile from "../../../../assets/profile.png";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import send from "../../../../assets/send.svg";

const StyledTextField = styled(OutlinedInput)(({ theme }) => ({
  width: "100%",
  margin: "8px 0",
  paddingRight: "8px",
  // paddingLeft: '16px',
  // '& .MuiInputLabel-outlined': {
  // marginLeft: '4px',
  // color: theme.palette.placeholder
  // opacity: 0.75
  // },
  "& .MuiOutlinedInput-notchedOutline": {
    // background: theme.palette.white,
    borderColor: theme.palette.grayBorder,
    borderRadius: "20px",
  },
}));

export default function CommentBox() {
  const i18n = locale.en;
  const theme = useTheme();
  return (
    <Grid sx={{ mt: 4, width: "90%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", width: "140px", alignItems: "center" }}>
          <TalentSVGButton
            color={"white"}
            source={chatComment}
            height={16}
            width={18}
            padding={"0 16px 0 0 !important"}
          />
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 700,
            }}
          >
            {i18n["allTalent.comments"]} (2)
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TalentSVGButton
            color={"white"}
            source={sort}
            height={16}
            width={18}
            padding={"0px !important"}
          />
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 700,
            }}
          >
            {"Sort"}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", mt: 2 }}>
        <Box
          component="img"
          className="profileAvatar"
          alt="crayon logo"
          src={profile}
          sx={{
            mr: 1,
            width: 20,
            height: 20,
          }}
        />
        <Box>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 600,
              mr: 1,
            }}
          >
            Name
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              mr: 1,
            }}
          >
            Currently on R25,000pm, looking to change industries in the fintech
            space.
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 400,
              mr: 1,
              color: theme.palette.grayButton.main,
              textAlign: "end",
            }}
          >
            28 Nov 2022:
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", mt: 1 }}>
        <Box
          component="img"
          className="profileAvatar"
          alt="crayon logo"
          src={profile}
          sx={{
            mr: 1,
            width: 20,
            height: 20,
          }}
        />
        <Box>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 600,
              mr: 1,
            }}
          >
            Name
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              mr: 1,
            }}
          >
            Currently on R25,000pm, looking to change industries in the fintech
            space.
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 400,
              mr: 1,
              color: theme.palette.grayButton.main,
              textAlign: "end",
            }}
          >
            28 Nov 2022:
          </Typography>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}>
        <StyledTextField
          id="outlined-adornment-password"
          type="text"
          size="small"
          placeholder="type your comment here..."
          endAdornment={
            <InputAdornment position="end">
              <Button
                variant="contained"
                id="broad"
                sx={{
                  borderRadius: "20px",
                  fontSize: "12px",
                  height: "25px !important",
                }}
                color="lightGreenButton300"
              >
                Post
              </Button>
            </InputAdornment>
          }
        />
      </Box>
    </Grid>
  );
}
