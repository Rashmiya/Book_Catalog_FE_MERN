import * as React from 'react';
import './SignInPageStyle.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { LoginDetails } from '../../utils/interface';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAction } from './slices/SignInSlice';

const SignInPage = () => {

  //states and instance

  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setpasswordError] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  const user = useSelector((state: any) => state.signIn.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (user === true) {
      navigate('/dashboard');
    }
  });

  //functions
  function checkInputValidation(dataItem: LoginDetails) {
    const email = /^[A-z2-9]+@[A-z2-9]+\.[A-z2-9]+$/;
    const password = /^[A-z,0-9 _]{4,10}$/;
    let fieldStatus = false;

    if (dataItem.email !== undefined && email.test(dataItem.email)) {
      fieldStatus = true;
    } else {
      fieldStatus = false;
      setEmailError('Enter valid Email,(abc@abc.com)');
      return;
    }

    if (dataItem.password !== undefined && password.test(dataItem.password)) {
      fieldStatus = true;
    } else {
      fieldStatus = false;
      setpasswordError('Check valid Password');
      return;
    }

    return fieldStatus;
  }
  function logInFunction() {
    const loginPerson = { email, password };
    if (checkInputValidation(loginPerson)) {
      dispatch(loginUserAction(loginPerson));
    }
  }
  const openSignInPage = () => {
    navigate('/register');
  };
  
  function checkValidation(field: string, value: string) {
    const email = /^[A-z2-9]+@[A-z2-9]+\.[A-z2-9]+$/;
    const password = /^[A-z,0-9 _]{4,10}$/;
    switch (field) {
    case 'Email':
      if (value !== '' && email.test(value)) {
        setEmailError('');
        setEmail(value);
      } else {
        setEmailError('Enter valid Email,(abc@abc.com)');
        setEmail(value);
      }
      break;

    case 'Password':
      if (value !== '' && password.test(value)) {
        setpasswordError('');
        setPassword(value);
      } else {
        setpasswordError('Check valid Password');
        setPassword(value);
      }
      break;
    }
  }

  //render body
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid style={{ overflow: 'hidden' }} container spacing={2} columns={16}>
          <Grid xs={16} item={true}>
            <div className="mainPage">
              <div className="fieldsArea">
                <h2 className="labletxt">Sign in to continue!</h2>
                {/* sign in fields */}
                <TextField
                  error={emailError !== ''}
                  className="txtField emailField"
                  id="filled-search"
                  label="Email"
                  type="Email"
                  value={email}
                  variant="filled"
                  helperText={emailError}
                  size="small"
                  onChange={(e) => {
                    checkValidation('Email', e.target.value);
                  }}
                />
                <TextField
                  error={passwordError !== ''}
                  className="txtField passwordField"
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  variant="filled"
                  value={password}
                  autoComplete="current-password"
                  helperText={passwordError}
                  size="small"
                  onChange={(e) => {
                    checkValidation('Password', e.target.value);
                  }}
                />

                <Button
                  className="btn signInBtn"
                  variant="contained"
                  onClick={()=>logInFunction()}
                >
                  Log in
                </Button>

                <Button
                  className="btn signUpBtn"
                  variant="outlined"
                  onClick={openSignInPage}
                >
                  Create Account
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default SignInPage;


