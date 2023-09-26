import * as React from "react";
import Box from "@mui/material/Box";
import { Grid, Typography, useTheme } from "@mui/material";


export default function QuestionStepper({ questionList }) {
  const theme = useTheme()
  return (
    <Grid container display="flex" margin={"auto"} sx={{
      paddingTop: 0,
      padding: "20px"
    }}>
      <Box style={{ marginLeft: "20px" }}>
        <Grid container sx={{ marginTop: "20px" }}>
          {questionList?.map((question, index) => (
            <Grid item xs={12} key={index} sx={{ marginTop: "20px" }}>
              <Box
                style={{
                  position: "relative",
                  paddingLeft: "20px",
                }}
              >
                {index < questionList?.length-1 && (
                  <Box
                    style={{
                      position: "absolute",
                      left: "-10px",
                      top: "30px",
                      height: "95%",
                      borderLeft: `2px solid ${theme.palette.blueButton700.main}`,
                    }}
                  />
                )}
                <Box
                  style={{
                    backgroundColor: theme.palette.blueButton700.main,
                    borderRadius: "50%",
                    color: "#FFFFFF",
                    width: "30px",
                    height: "30px",
                    textAlign: "center",
                    lineHeight: "30px",
                    fontWeight: "bold",
                    position: "absolute",
                    top: "0px",
                    left: "-23px",
                  }}
                >
                  {index + 1}
                </Box>
                <Box style={{ marginLeft: "15px" }}>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: 16,
                      letterSpacing: "0.75px",
                      marginBottom: "8px",
                    }}
                  >
                    {question.question}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: 14,
                      letterSpacing: "0.75px",
                      marginBottom: "8px",
                    }}
                  >
                    {/* {step.description} */}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Grid>
  );
}
