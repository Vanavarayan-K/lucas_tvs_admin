import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { ThemeProvider } from "@mui/material";
import { createTheme } from '@mui/material/styles';



function SnackBar(props) {

  const getTheme = createTheme({
    palette:{
      primary: {
        main: '#314B8F'
      },
      '&..MuiAlert-filledSuccess':{
        backgroundColor:'yellow'
      }
    },
  })
  return (
    <ThemeProvider theme={getTheme}>
    <Snackbar 
    anchorOrigin={{ vertical:'bottom',horizontal: 'center' }}
     open={props.open} autoHideDuration={1000} onClose={props.close}>
      <Alert elevation={6} variant="filled" onClose={props.close} severity={props.severity}>
        {props.snackbarTitle}
      </Alert>
    </Snackbar>
    </ThemeProvider>
  );
}

export default SnackBar;
