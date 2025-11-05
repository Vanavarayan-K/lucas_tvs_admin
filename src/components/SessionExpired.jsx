import React from 'react'
import { DialogTitle, Dialog,DialogContent,DialogActions,Button } from '@mui/material';
import { logoutUser } from '../slices/authslice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const SessionExpired = ({open}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogoutConfirm = () => {
        logoutUser(dispatch);
        navigate('/login') // Redirect to login page
    };
  return (
    <Dialog open={open}>
        <DialogTitle>Session Expired</DialogTitle>
        <DialogContent>
          Your session has expired. Please log in again.
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleLogoutConfirm}>
            Go to Login
          </Button>
        </DialogActions>
    </Dialog>
  )
}

export default SessionExpired