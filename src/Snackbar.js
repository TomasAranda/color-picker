import React from 'react';

import { Snackbar, IconButton } from '@material-ui/core';
import { Close } from "@material-ui/icons";

function SnackBar({ open, closeSnackbar, format }) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={3000}
      onClose={closeSnackbar}
      message={<span id='message-id'>Format changed to {format.toUpperCase()}</span>}
      ContentProps={{
        'aria-describedby': 'message-id'
      }}
      action={
        <React.Fragment>
          <IconButton
            onClick={closeSnackbar}
            color='inherit'
            key='close'
            aria-label='close'
          >
            <Close fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  )
}

export default SnackBar;