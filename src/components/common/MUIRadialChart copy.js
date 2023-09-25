import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Paper } from '@material-ui/core';
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles((theme) => ({
  chartContainer: {
    width: '100px',
    height: '100px',
    position: 'relative',
  },
  backgroundCircle: {
    stroke: '#ccc', // Gray background color
    strokeWidth: '10px',
    fill: 'transparent',
    transition: 'stroke-dashoffset 0.5s ease-in-out',
  },
  completedCircle: {
    stroke: 'blue',
    strokeWidth: '10px',
    fill: 'transparent',
    transition: 'stroke-dashoffset 0.5s ease-in-out',
  },
  text: {
    fill: theme.palette.primary.main,
    fontSize: '12px',
    textAnchor: 'middle',
    dominantBaseline: 'middle',
  },
}));

// const MUIRadialChart = ({ percentage, chartName }) => {
//   const classes = useStyles();
//   const radius = 40;
//   const circumference = 2 * Math.PI * radius;
//   const dashoffset = circumference * (1 - percentage / 100); // Calculate dashoffset

//   return (
//     <div className={classes.chartContainer}>
//       <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
//         {/* Gray background circle */}
//         <circle
//           className={classes.backgroundCircle}
//           r={radius}
//           cx="50%"
//           cy="50%"
//           strokeWidth="10px"
//           strokeDasharray={circumference}
//           strokeDashoffset={-circumference / 4} // Start from 12 o'clock
//         />
//         {/* Blue completed percentage circle */}
//         <circle
//           className={classes.completedCircle}
//           r={radius}
//           cx="50%"
//           cy="50%"
//           strokeWidth="10px"
//           strokeDasharray={circumference}
//           strokeDashoffset={dashoffset - circumference / 4} // Start from 12 o'clock
//         />
//         <text className={classes.text} x="50%" y="45%">
//           {`${percentage}%`}
//         </text>
//         <text className={classes.text} x="50%" y="60%">
//           {chartName}
//         </text>
//       </svg>
//     </div>
//   );
// };

const MUIRadialChart = ({ percentage =0, chartName }) => {
  const theme = useTheme()
  return (
    <div>
      <Paper
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          position: 'relative',
          boxShadow: '0',
        }}
      >
        <CircularProgress
          variant="determinate"
          color="secondary"
          value={90} // Set it to 100 to make the whole circle gray
          size={100}
          thickness={2}
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
        <CircularProgress
          variant="determinate"
          color="primary" // Use the secondary color for the completed percentage
          value={percentage} // Adjust this value to set the completion percentage (e.g., 10 for 10%)
          size={100}
          thickness={2}
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      </Paper>


    </div>
  )
}

export default MUIRadialChart;
