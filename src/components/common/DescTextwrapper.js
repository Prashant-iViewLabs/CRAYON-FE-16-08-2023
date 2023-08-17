
import React from 'react';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} placement='top' />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}));


export default function DescTextwrapper({
    children,
    line = 3,
    weight = 400,
    size = 14,
    gutterBottom = true,
    ...rest
}) {
    return (
        <HtmlTooltip
            title={
                children
            }
        >
            <Typography sx={{
                fontWeight: weight,
                fontSize: size,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: line,
                ...rest,
            }}>{children}</Typography>
        </HtmlTooltip>
    );
}
