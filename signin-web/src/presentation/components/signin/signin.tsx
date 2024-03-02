import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Snackbar,
  SnackbarContent,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { signIn } from "../../../domain/api/api";
import signinStyle from "./signinStyle";
import { SignInRequestPayload } from "../../../domain/interfaces/signinInterfaces";

const Signin = () => {
  const navigate = useNavigate();
  const StyledLink = styled(Link)(signinStyle.linkStyle);

  const [password, setPwassword] = useState<string>("");
  const [userEmail, setEmail] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [snackBar, setSnackBar] = useState<boolean>(false);
  const [signInResponseData, setSingUpResponseData] = useState<any>({});
  const [responseMessage, setResponseMessage] = useState<string>("");

  const handleEmailChange = (email: string) => {
    setEmail(email);
  };
  const handlePasswordChange = (password: string) => {
    setPwassword(password);
  };
  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseSnackBar = (event: any) => {
    event.stopPropagation();
    setSnackBar(false);
  };

  const handleSignin = useCallback(async () => {
    if (!userEmail || !password) {
      setResponseMessage("Please enter email and password");
    } else {
      const signInRequestPayload: SignInRequestPayload = {
        userEmail,
        userPassword: password,
      };
      const response = await signIn(signInRequestPayload);
      setSingUpResponseData(response);
      setResponseMessage(response?.signInResponseMessage);
      if (response.statusCode === 200 || response.statusCode === 201) {
        localStorage.setItem("authToken", response?.jwtToken);
        navigate("/application");
      }
    }
    setSnackBar(true);
  }, [userEmail, password, navigate]);

  return (
    <>
      <Grid>
        <Paper elevation={10} style={signinStyle.paperStyle}>
          <Grid
            container
            alignItems={"center"}
            justifyContent={"center"}
            direction="column"
          >
            <Avatar style={signinStyle.avatarStyle}>
              <LockOpenIcon />
            </Avatar>
            <h2>Sign In</h2>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              placeholder="Enter your email address"
              fullWidth
              required
              value={userEmail}
              onChange={(e) => handleEmailChange(e.target.value)}
            />
            <TextField
              style={signinStyle.passwordTextFieldStyle}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              placeholder="Enter your password"
              fullWidth
              required
              value={password}
              type={showPassword ? "text" : "password"}
              onChange={(e) => handlePasswordChange(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowPasswordClick}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={signinStyle.buttonStyle}
            fullWidth
            onClick={handleSignin}
          >
            Sign in
          </Button>
          <Snackbar
            open={snackBar}
            autoHideDuration={4000}
            onClick={(event) => handleCloseSnackBar(event)}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
          >
            <SnackbarContent
              style={
                signInResponseData?.statusCode === 200 ||
                signInResponseData?.statusCode === 201
                  ? signinStyle.snackBarStyle
                  : signinStyle.snackBarStyleError
              }
              message={
                <span id="client-snackbar">
                  {responseMessage ||
                    signInResponseData?.message ||
                    signInResponseData?.signInResponseMessage}
                </span>
              }
              action={[
                <IconButton
                  key="close"
                  aria-label="close"
                  color="inherit"
                  onClick={(event) => handleCloseSnackBar(event)}
                >
                  <>x</>
                </IconButton>,
              ]}
            />
          </Snackbar>
          <Typography>
            <StyledLink to="#">Forgot password ?</StyledLink>
          </Typography>
          <Typography>
            Do you have account ? <StyledLink to="/signup">Sign Up</StyledLink>
          </Typography>
        </Paper>
      </Grid>
    </>
  );
};

export default Signin;
