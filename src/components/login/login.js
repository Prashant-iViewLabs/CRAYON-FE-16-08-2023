import { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import locale from "../../i18n/locale";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import InputBox from "../../components/common/InputBox";
import { useTheme } from "@mui/material/styles";
import "./login.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Avatar,
  IconButton,
  InputBase,
  Dialog,
  DialogTitle,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import jwt_decode from "jwt-decode";
import { getLocalStorage } from "../../utils/Common";
import CloseIcon from "@mui/icons-material/Close";
import smileFace from "../../assets/Characters/Red_Circle_Bow_Tie-62.svg";
import Switch from "@mui/material/Switch";
import { styled, alpha } from "@mui/material/styles";
import CancelIcon from "@mui/icons-material/Cancel";
import ForgotPassword from "./ForgotPassword";

const LOGINDATA = {
  username: "",
  password: "",
};

const BlueSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: theme.palette.blueButton700.main,
    "&:hover": {
      backgroundColor: alpha(
        theme.palette.blueButton700.main,
        theme.palette.action.hoverOpacity
      ),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: theme.palette.blueButton700.main,
  },
  "& .MuiSwitch-track": {
    margin: "auto",
    height: "60% !important",
  },
  "& .css-jsexje-MuiSwitch-thumb": {
    borderRadius: "15% !important",
  },
}));

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Email required")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid Email"),
  password: Yup.string().required("Password required"),
});

export default function Login({
  handleLogin,
  toggleForm,
  openFunc,
  closeFunc,
}) {
  const i18n = locale.en;
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState("password");
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [loginTouched, setLoginTouched] = useState(false);

  const handleShowPassword = () => {
    if (showPassword) setInputType("password");
    else setInputType("text");

    setShowPassword(!showPassword);
  };

  const token = localStorage?.getItem("token");
  let decodedToken;
  if (token) {
    decodedToken = jwt_decode(token);
  }

  const formik = useFormik({
    initialValues: LOGINDATA,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formBody = {
        username: formik.values.username,
        password: formik.values.password,
        fileName:
          decodedToken?.data?.role_id === undefined
            ? getLocalStorage("fileName")
            : "",
        job_id:
          decodedToken?.data?.role_id === undefined
            ? getLocalStorage("job_id")
            : "",
        jobs_user_id:
          decodedToken?.data?.role_id === undefined
            ? getLocalStorage("jobs_user_id")
            : "",
      };
      await handleLogin(formBody);
      setLoginTouched(false);
    },
  });
  const handleForgotPassword = () => {
    closeFunc();
    setOpenForgotPassword(true);
  };
  const handleCloseForgotPassword = () => {
    setOpenForgotPassword(false);
  };

  return (
    <>
      <Dialog
        open={openFunc}
        hideButton={false}
        onClose={closeFunc}
        dialogWidth="sm"
        // fullWidth={true}
        showFooter={false}
        title={i18n["login.login"]}
        // isApplyJob
        padding={0}
      >
        <DialogTitle onClose={closeFunc}>
          <IconButton
            aria-label="close"
            onClick={() => {
              closeFunc();
              setLoginTouched(false);
              formik.resetForm();
            }}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Box
              sx={{
                width: "20px",
                height: "20px",
                color: "#000000",
                border: 2,
                fontSize: "18px",
                borderRadius: "5px",
              }}
            >
              X
            </Box>
          </IconButton>
        </DialogTitle>
        <Box
          sx={{
            width: "459px",
            padding: "30px 0 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar src={smileFace} sx={{ width: 96, height: 96 }} />
          <Typography
            sx={{
              fontSize: "25px",
              fontWeight: 700,
            }}
          >
            guess who’s back, back again
          </Typography>
          <Typography
            sx={{
              fontSize: "18px",
              marginTop: 2,
              fontWeight: 700,
            }}
          >
            Sign in
            {/* {(formik.errors.username || formik.errors.password) &&
        <span className="error-div">oops! Something wasn't right</span>} */}
          </Typography>
          {Object.keys(formik.errors).length !== 0 &&
          Object.keys(formik.touched).some((field) => formik.touched[field]) &&
          loginTouched ? (
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 500,
                color: "red", // You can customize the error color
              }}
            >
              oops! something wasn’t right{" "}
              {/* Display the specific error message */}
            </Typography>
          ) : (
            " "
          )}
          <Box sx={{ mt: 3, width: "90%", padding: 0 }}>
            <Paper
              sx={{
                display: "flex",
                height: "40px",
                borderRadius: "25px",
                boxShadow: "none",
                border: `1px solid ${theme.palette.grayBorder}`,
              }}
            >
              <InputBase
                id="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={i18n["login.emailAddrees"]}
                sx={{ ml: 2, mr: 2, width: "100%" }}
              />
              {formik.errors.username && formik.touched.username && (
                <span className="error-div">
                  {formik.errors.username} <CancelIcon fontSize="small" />
                </span>
              )}
            </Paper>
          </Box>

          <Box sx={{ mt: 3, width: "90%" }}>
            <Paper
              sx={{
                display: "flex",
                height: "40px",
                borderRadius: "25px",
                boxShadow: "none",
                border: `1px solid ${theme.palette.grayBorder}`,
              }}
            >
              <InputBase
                sx={{ ml: 2, mr: 2, width: "100%" }}
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type={inputType}
                placeholder={i18n["login.password"]}
              />
              {/* <IconButton
            sx={{ py: 0 }}
            color=""
            aria-label="reset password"
            component="button"
            onClick={handleShowPassword}
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton> */}
              {formik.errors.password && formik.touched.password && (
                <span className="error-div">
                  {formik.errors.password} <CancelIcon fontSize="small" />{" "}
                </span>
              )}
            </Paper>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: 3,
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              remember me
            </Typography>
            <BlueSwitch
              defaultChecked={false}
              // onChange={(event) =>
              //   handleJobAccess(event, row.job_id)
              // }
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              marginTop: 3,
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              need an account?
            </Typography>
            <Link>
              <Typography
                sx={{
                  color: "black",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
                onClick={toggleForm}
              >
                join Now
              </Typography>
            </Link>
          </Box>
          {/*<Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
           <Link style={{ textDecoration: "none" }}>Forgot Password?</Link>
         </Box>*/}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 3,
              width: "100%",
              overflow: "hidden",
            }}
          >
            <Button
              sx={{
                width: "50%",
                borderRadius: 0,
                padding: 3,
              }}
              variant="contained"
              color="grayButton100"
              onClick={handleForgotPassword}
            >
              forgot Password?
            </Button>
            <Button
              sx={{
                width: "50%",
                borderRadius: 0,
                padding: 3,
              }}
              variant="contained"
              color="redButton"
              onClick={() => {
                formik.handleSubmit();
                setLoginTouched(true);
              }}
              type="submit"
            >
              {loginTouched ? "Sign in" : "let's go"}
            </Button>
          </Box>
        </Box>
      </Dialog>
      <ForgotPassword
        openFunc={openForgotPassword}
        closeFunc={handleCloseForgotPassword}
      />
    </>
  );
}
