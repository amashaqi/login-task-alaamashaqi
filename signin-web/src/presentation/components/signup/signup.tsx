import React, { useState, useCallback } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  CircularProgress,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { InputAdornment, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import signupStyle from "./signupStyle";
import { validateEmail } from "../../../domain/validation/emailValidation";
import { validatePassword } from "../../../domain/validation/passwordValidation";
import { createNewUser } from "../../../domain/api/api";
import { SignUpRequestPayload } from "../../../domain/interfaces/signinInterfaces";
import { Role } from "../../../domain/enums/roles";
const Signin = () => {
  const StyledLink = styled(Link)(signupStyle.linkStyle);
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [userEmail, setEmail] = useState<string>("");
  const [password, setPwassword] = useState<string>("");
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [emailErrors, setEmailErrors] = useState<string[]>([]);
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [snackBar, setSnackBar] = useState<boolean>(false);
  const [signUpResponseData, setSingUpResponseData] = useState<any>({});

  const handleNameChange = (userName: string) => {
    setName(userName);
  };
  const handleEmailChange = (email: string) => {
    setEmail(email);
  };
  const handlePasswordChange = (password: string) => {
    setPwassword(password);
  };
  const handleConfirmPasswordChange = (confirmedPassword: string) => {
    setConfirmedPassword(confirmedPassword);
  };
  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseSnackBar = (event: any) => {
    event.stopPropagation();
    setSnackBar(false);
  };

  const handleSignup = useCallback(async () => {
    const passwordValidationErrors = validatePassword(
      password,
      confirmedPassword
    );
    const emailValidationErrors = validateEmail(userEmail);

    setPasswordErrors(passwordValidationErrors);
    setEmailErrors(emailValidationErrors);

    if (
      passwordValidationErrors.length === 0 &&
      emailValidationErrors.length === 0
    ) {
      setLoader(true);
      const signUpRequestPayload: SignUpRequestPayload = {
        userName: name,
        userEmail,
        userPassword: password,
        roles: [Role.User],
      };
      const response = await createNewUser(signUpRequestPayload);

      setSingUpResponseData(response);
      setSnackBar(true);

      if (response?.statusCode === 201 || response?.statusCode === 200) {
        navigate("/");
      }
    }

    setLoader(false);
  }, [password, confirmedPassword, name, userEmail, navigate]);

  const generateErrors = (errors: string[]) => {
    return (
      <Alert severity="warning">
        <List dense={true}>
          {errors.map((msg: string, index: number) => (
            <Grid key={index}>{`• ${msg}`}</Grid>
          ))}
        </List>
      </Alert>
    );
  };

  return (
    <Grid>
      <Paper
        elevation={10}
        style={
          passwordErrors.length > 1
            ? signupStyle.paperStyleExtened
            : signupStyle.paperStyle
        }
      >
        <Grid
          container
          alignItems={"center"}
          justifyContent={"center"}
          direction="column"
        >
          <Avatar style={signupStyle.avatarStyle}>
            <LockOpenIcon />
          </Avatar>
          <h2>Sign Up</h2>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            placeholder="Enter your name"
            fullWidth  
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
          />
          <TextField
            style={signupStyle.passwordTextFieldStyle}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            placeholder="Enter your email address"
            fullWidth
            required
            error={emailErrors.length !== 0}
            value={userEmail}
            onChange={(e) => handleEmailChange(e.target.value)}
          />

          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            placeholder="Enter your password"
            fullWidth
            required
            error={passwordErrors.length !== 0}
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
          <TextField
            style={signupStyle.passwordTextFieldStyle}
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
            placeholder="Confirm your password"
            fullWidth
            required
            error={passwordErrors.length !== 0}
            value={confirmedPassword}
            type={showPassword ? "text" : "password"}
            onChange={(e) => handleConfirmPasswordChange(e.target.value)}
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
        {passwordErrors?.length !== 0 &&
          generateErrors([...passwordErrors, ...emailErrors])}
        <FormControlLabel
          control={<Checkbox name="checkedB" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={signupStyle.buttonStyle}
          fullWidth
          onClick={handleSignup}
        >
          {loader ? <CircularProgress color="inherit" /> : "   Sign up"}

          <Snackbar
            open={snackBar}
            autoHideDuration={4000}
            onClick={(event) => handleCloseSnackBar(event)}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
          >
            <SnackbarContent
              style={
                signUpResponseData?.signUpResponseMessage
                  ? signupStyle.snackBarStyle
                  : signupStyle.snackBarStyleError
              }
              message={
                <span id="client-snackbar">
                  {signUpResponseData?.message ||
                    signUpResponseData?.signUpResponseMessage}
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
        </Button>
        <Typography>
          <StyledLink to="/ss">Forgot password ?</StyledLink>
        </Typography>
        <Typography>
          Already have account ? <StyledLink to="/">Sign in</StyledLink>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Signin;
