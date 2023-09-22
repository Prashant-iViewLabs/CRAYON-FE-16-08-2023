import Chart from "react-apexcharts";
import { useTheme } from "@mui/material/styles";
import ApexCharts from "apexcharts";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { percentToValue, valueToPercent } from "../../utils/Common";
import { Box } from "@mui/material";

const StyledChart = styled(Chart)(({ theme }) => ({}));

export default function SingleRadialChart({
  series,
  width,
  height,
  index,
  isHovered,
  name,
  labelsData,
  color,
  hollow = "65%",
  nameSize = "12px",
  valueSize = "20px",
  nameOffsetY = 16,
  valueOffsetY = -16,
  max = 100,
}) {
  const theme = useTheme();
  const [enableAnimation, setEnableAnimation] = useState(false)
  const chartOptions = {
    options: {
      chart: {
        id: "chart" + name + index,
        type: "radialBar",
        sparkline: {
          enabled: true,
        },
      },
      tooltip: {
        enabled: true,
        theme: "dark", // You can customize the theme
        style: {
          fontSize: "12px",
          fontFamily: undefined,
        },
        onDatasetHover: {
          highlightDataSeries: true,
        },
        y: {
          formatter: function (val) {
            return [percentToValue(max, val)];
          },
        },
      },
      colors: [color],
      stroke: {
        lineCap: "round",
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 10,
          endAngle: 360,
          hollow: {
            size: hollow,
          },
          dataLabels: {
            name: {
              show: true,
              fontSize: nameSize,
              offsetY: nameOffsetY,
              fontWeight: 500,
              color: "#404040",
            },
            value: {
              show: true,

              fontSize: valueSize,
              offsetY: valueOffsetY,
              fontWeight: 700,
              color: "black",
              formatter: function (val) {
                return [percentToValue(max, val)];
              },
            },
          },
        },
      },
      labels: [labelsData],
    },
  };

  const toggleAnimation = () => {
    setEnableAnimation((prevState) => !prevState);
  };
  const handleMouseMove = () => {
    if (enableAnimation) {
      ApexCharts.exec('chart' + name + index, 'updateSeries', [0])
      ApexCharts.exec('chart' + name + index, 'updateSeries', [valueToPercent(max, series[0])])
    }
  }

  return (
    <Box
      onMouseEnter={toggleAnimation}
      onMouseLeave={toggleAnimation}
      onMouseMove={handleMouseMove}  
    >

      <StyledChart
        options={chartOptions.options}
        // series={series}
        series={
          [valueToPercent(max, series[0])]
        }
        type="radialBar"
        width={width}
        height={height}
      />
    </Box>
  );
}
