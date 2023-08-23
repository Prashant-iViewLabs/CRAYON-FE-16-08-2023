import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import locale from "../../../i18n/locale";
import Typography from "@mui/material/Typography";
import ProfileCard from "./ProfileCard";


import { styled } from "@mui/material/styles";

import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { Button } from "@mui/material";

const BorderLinearProgress = styled(LinearProgress)(({ theme, value }) => ({
  height: "5px",
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grayBorder,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor:
      value == 100
        ? theme.palette.lightGreenButton300.main
        : theme.palette.redButton100.main,
  },
}));
function LinearProgressWithLabel(props) {
  return (
    <Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
      <Box sx={{ width: "100%", mr: 1 }}>
        <BorderLinearProgress variant="determinate" {...props} />
      </Box>
    </Box>
  );
}

export default function MyCV() {
  const i18n = locale.en;

  return (
    <>
      <Grid
        container
        spacing={0}
        sx={{ pb: 3 }}
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="center"
        gap={2}
      >
        <Grid xs={12} sm={6} md={8} lg={9} xl={10} sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          
          <Typography
            sx={{
              width: "60%",
              fontSize: "36px",
              fontWeight: 700,
              display: "flex",
              justifyContent: "end",
            }}
          >
            {i18n["myProfile.title"]}
          </Typography>
          <Box sx={{
            width: "30%", background: "#ffff",
            borderRadius: "17px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            padding: 2,
            paddingX: 4
          }}>
            <Box sx={{ display: "flex", justifyContent: "space-between"}}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 600,
                  mr: 1,
                }}
              >
                {i18n["empMyProfile.profileCompletion"]}
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 600,
                  mr: 1,
                }}
              >
                Progress
              </Typography>
            </Box>
            <LinearProgressWithLabel value={50}/>
            {/* <StyledButton
              disabled={expanded}
              variant="contained"
              color="redButton100"
              onClick={handleUpdateProfile}
              sx={{padding:"17px"}}
            >
              {i18n["empMyProfile.updateProfile"]}
            </StyledButton> */}
            {/* {!expanded ? (
            <StyledButton
              // disabled={expanded}
              variant="contained"
              color="redButton100"
              onClick={handleUpdateProfile}
            >
              {i18n["empMyProfile.updateProfile"]}
            </StyledButton>
          ) : (
            <StyledButton
              // disabled={expanded}
              variant="outlined"
              color="redButton100"
              onClick={handleCancelProfile}
            >
              {i18n["empMyProfile.cancelProfile"]}
            </StyledButton>
          )} */}
          </Box>
        </Grid>

        {/* <ButtonPanel panelData={CANDIDATE_MY_CV_LEFT} side='left' /> */}
        <Grid xs={12} sm={6} md={8} lg={9} xl={10}>
          {/* <Paper
            sx={{
              boxShadow: 0,
              p: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          > */}
          <Box>
            {/* <TheBasics handleProfileData={getProfileData} profile={profile} /> */}
            <ProfileCard />
          </Box>
          {/* </Paper> */}
        </Grid>

        {/* <ButtonPanel panelData={CANDIDATE_MY_CV_RIGHT} side='right' /> */}
      </Grid>
    </>
  );
}