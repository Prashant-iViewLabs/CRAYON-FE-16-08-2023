import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';
import { valueToPercent } from '../../utils/Common';

function RadialChart({ value = 0, chartName, max = 100, size, countFontSize, thickness = 2,labelFontSize, color }) {
  const containerStyle = {
    width: size,
    height: size,
    borderRadius: '50%',
    color: "lightGray",
    background: "transparent",
    position: 'relative',
    boxShadow: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };
  const theme = useTheme()
  const [progress, setProgress] = useState(0);
  const convertedValue = valueToPercent(max, value)
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= convertedValue ? convertedValue : prevProgress + 3));
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, [progress]);
  return (
    <div>
      <Paper style={containerStyle} onMouseEnter={() => setProgress(0)} sx={{
        boxShadow:0
      }}>
        <CircularProgress
          variant="determinate"
          value={97}
          size={size}

          thickness={thickness}
          style={{
            position: 'absolute',
            background: "transparent",
            top: 0,
            left: 0,
            color: theme.palette.chart.gray,
            strokeLinecap: "round",
          }}
        />
        <CircularProgress
          variant="determinate"
          value={progress}
          size={size}
          thickness={2}
          style={{ position: 'absolute', background: "transparent", top: 0, left: 0, color: theme.palette.chart[color], strokeLinecap: "round" }}
        />
        <div style={{ fontSize: countFontSize, fontWeight: 'bold', color: "black" }}>
          {value || 0}
        </div>
        <div style={{ color: "black", fontSize: labelFontSize }}>{chartName}</div>
      </Paper>
    </div>
  );
}

export default RadialChart;
