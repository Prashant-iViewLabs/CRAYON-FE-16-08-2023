import React, { useState } from 'react'
import CustomCard from "../../common/CustomCard";
import { Box, Button, Card, Grid, Tooltip, Typography, useTheme } from '@mui/material';
import SmallButton from '../../common/SmallButton';
import { convertDatetimeAgo, dateConverterMonth } from '../../../utils/DateTime';
import TrackButtonLayout from '../../common/TrackButtonLayout';
import { AccountBalanceWallet, Circle, Place, RadioButtonChecked } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { formatCurrencyWithCommas } from '../../../utils/Currency';
import job_exp from "../../../assets/Padding Included/Green_Duration.svg";
import calendar from "../../../assets/Padding Included/Yellow_Calendar.svg";
import job_logo from "../../../assets/job_logo.svg";
import Delete from "../../../assets/Padding Excluded/Black_Trash_Delete_1.svg";

const CamList = ({ job }) => {
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme()
  const [trackButton, setTrackButton] = useState(false);

  return (
    <Grid
      container
      spacing={2}
      flexDirection={{ sx: "column", md: "row" }}
      sx={{
        display: { xs: "none", md: "flex" },
      }}
      width={"99.5%"}
    >

      <Grid xl={3} lg={4} md={6} xs={12} >
        <Card
          sx={{
            borderRadius: "25px"
          }}
          handleMouseEnter={() => setIsHovered(true)}
          handleMouseLeave={() => setIsHovered(false)}
        >
          <Grid
            container
            // padding={1}
            justifyContent="space-between"
            // alignItems="center"
            overflow={"hidden"}
            sx={{
              borderRadius: "25px 25px 0 0",
            }}
          >
            {!trackButton ? (
              <>
                <Box
                  component="img"
                  sx={{
                    height: 40,
                    width: "20%",
                    maxHeight: { xs: 40 },
                    maxWidth: { xs: 40 },
                    ml: 2,
                    mt: 1,
                    p: 1,
                    borderRadius: 4,
                  }}
                  alt="job_logo"
                  src={job?.profile_url !== "No URL" ? job?.profile_url : job_logo}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    width: "45%",
                  }}
                >
                  <Box sx={{ display: "flex", gap: 1 }}>
                    {job?.job_type === "crayon recruit" ? (
                      <SmallButton
                        color="yellowButton100"
                        label={job?.job_type?.slice(6)}
                      />
                    ) : job?.job_type === "crayon Direct" ? (
                      <SmallButton
                        color="orangeButton"
                        label={job?.job_type?.slice(6)}
                      />
                    ) : null}

                    {job?.stage?.name && (
                      <SmallButton
                        color="lightGreenButton300"
                        label={job?.stage?.name}
                      />
                    )}
                  </Box>
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: 10,
                      letterSpacing: "0.75px",
                      opacity: 0.8,
                    }}
                  >
                    posted {convertDatetimeAgo(job?.updated_at)}
                  </Typography>
                </Box>
              </>
            ) : (
              <Box />
            )}
            <Box
              sx={{
                alignItems: "center",
                display: "flex",

                width: "30%",
                flexDirection: "column",
                // border: !trackButton ? "1px solid lightGray" : "none",
                borderTop: 0,
                borderRight: 0,
                borderRadius: "0 0px 0px 10px",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  // marginLeft: 1,
                  borderRadius: 0,
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
                onClick={() => {
                  setTrackButton((prevState) => !prevState);
                }}
                // endIcon={}
                color="grayButton100"
              >
                <TrackButtonLayout
                  job={job}
                  colorPattern={[
                    "lightGreenButton300",
                    "lightGreenButton300",
                    "lightGreenButton300",
                    "lightGreenButton300",
                  ]}
                />
                {/* {trackButton ? <ExpandLess /> : <KeyboardArrowDownIcon />} */}
              </Button>
              {!trackButton && (
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    fontWeight: "Bold",
                    fontSize: "0.9rem",
                    // visibility:  ? "visible" : "hidden"
                  }}
                >
                  {job?.job_status?.name || "Status"}{" "}
                  <Circle
                    fontSize="string"
                    color={job?.job_status?.name === "active" ? "success" : "error"}
                  />
                </Typography>
              )}
            </Box>
          </Grid>
          {/* {trackButton && <TrackButton job={job} closeFunc={setTrackButton} />}
      {matchMeButton && <MatchMeButton closeFunc={handleMatchMeButton} />} */}
          {!trackButton && (
            <>
              <Box
                sx={{
                  // display: "flex",
                  width: "100%",
                  height: "292px",
                  flexGrow: 1
                }}
              >
                <Grid
                  marginLeft={1}
                  marginRight={1}
                  sx={{
                    flexGrow: 1,
                  }}
                >
                  <Tooltip
                    arrow
                    // TransitionComponent={"Fade"}
                    // TransitionProps={{ timeout: 600 }}
                    title={job?.title}
                    placement="top"
                  >
                    <Link
                      to={`/candidate/job-detail/${`${job?.town?.name + " " + job?.town?.region?.name
                        }`}/${job?.job_id}`}
                      target={"_blank"}
                      style={{
                        textDecoration: "none",
                        color: theme.palette.black,
                      }}
                    >
                      <Typography
                        sx={{
                          // minHeight: "60px",
                          fontWeight: 700,
                          fontSize: 20,
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 1,
                        }}
                        gutterBottom
                      >
                        {/* {job?.title.slice(0, 30)} */}
                        Lead Developer Online Specialist...
                      </Typography>
                    </Link>
                  </Tooltip>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "12px",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <AccountBalanceWallet
                        fontSize="string"
                        color="primary"
                        sx={{}}
                      />
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: 12,
                          letterSpacing: "0.25px",
                        }}
                      >
                        {/* {job?.salary?.currency?.symbol} {formatCurrencyWithCommas(job?.salary?.min)} to {formatCurrencyWithCommas(job?.salary?.max)} per month */}
                        R 40,000 to 75,000 per month
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Place fontSize="string" color="error" />
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: 12,
                          letterSpacing: "0.25px",
                        }}
                      >
                        {/* {job?.town?.name}, {job?.town?.region?.name} */}
                        Cape Town, South Africa
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box
                        component="img"
                        sx={{
                          height: 16,
                          width: 16,
                          maxHeight: { xs: 15 },
                          maxWidth: { xs: 15 },
                          mr: 1,
                        }}
                        alt="job_exp"
                        src={job_exp}
                      />

                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: 12,
                          letterSpacing: "0.25px",
                        }}
                      >
                        {/* {job?.experience?.year_start} to {job?.experience?.year_end} years */}
                        2 to 4 years
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box
                        component="img"
                        sx={{
                          height: 16,
                          width: 16,
                          maxHeight: { xs: 15 },
                          maxWidth: { xs: 15 },
                          padding: 0,
                        }}
                        alt="calendar"
                        src={calendar}
                      />
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: 12,
                          letterSpacing: "0.25px",
                        }}
                      >
                        {dateConverterMonth(job?.created_at)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Box sx={{
                  background: "green",
                }}>
                  Video Section
                </Box>

              </Box>
            </>)}
          <Grid
            container
            // padding="0 8px 8px 8px"
            alignItems="center"
            overflow={"hidden"}
            sx={{
              width: "100%",
              borderRadius: "0 0 25px 25px",
              height: 51,
            }}
          >
            <Button
              variant="contained"
              sx={{
                borderRadius: 0,
                width: "50%",
                height: "100%",
                fontSize: "10px",
              }}
              color="blueButton200"
              startIcon={<RadioButtonChecked />}
            >
              Record Now
            </Button>
            <Button
              variant="contained"
              sx={{
                borderRadius: 0,
                width: "50%",
                height: "100%",
                fontSize: "10px",
              }}
              color="redButton"
              startIcon={
                <Box
                  component={"img"}
                  src={Delete}
                  sx={{ height: 15 }}
                />
              }
            >
              Delete
            </Button>
          </Grid>
        </Card>
      </Grid>
    </Grid>

  )
}

export default CamList