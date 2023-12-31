import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import locale from "../../i18n/locale";
import { Tooltip } from "@mui/material";

export default function SmallButtonTalent({
  color,
  label,
  startIcon,
  endIcon,
  textColor,
  height = 20,
  startIconMargin,
  onClick,
  value,
  justifyContent,
  disabled,
  borderRadius,
  fontWeight,
  padding,
  margin,
  alignItems,
  minWidth,
  ...props
}) {
  const i18n = locale.en;
  const theme = useTheme();

  return (
    <Tooltip title={value ? value : label} placement="top-end">
      <Button
        variant="contained"
        disabled={disabled}
        color={color}
        startIcon={startIcon}
        endIcon={endIcon}
        onClick={onClick}
        margin={margin}
        sx={{
          justifyContent: justifyContent,
          fontSize: 10,
          fontWeight: fontWeight ? fontWeight : 300,
          letterSpacing: "0.75px",
          height: height,
          boxShadow: 0,
          borderRadius: borderRadius ? borderRadius : "5px",
          color: textColor,
          minWidth: minWidth ? minWidth :"fit-content",
          padding: padding ? padding : "0 8px",
          ".MuiButton-startIcon": {
            marginRight: startIconMargin,
            marginLeft: 0,
          },
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          "&:hover": {
            boxShadow: "none", // Remove box shadow on hover
          },
          alignItems: alignItems,
          ...props,
        }}
      >
        {/*{label?.length > 12 ? label.split(" ").at(0) : label}*/}
        {label}
      </Button>
    </Tooltip>
  );
}
