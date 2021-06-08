import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import PaletteMetaForm from './PaletteMetaForm';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import LibraryAdd from '@material-ui/icons/LibraryAdd';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import styles from './styles/PaletteFormNavStyles';

class PaletteFormNav extends Component {
  constructor(props) {
    super(props)
    this.state = { formShowing: false }
  }

  showForm = () => {
    this.setState({ formShowing: true });
  }

  hideForm = () => {
    this.setState({ formShowing: false });
  }

  render() {
    const { classes, open, handleSubmit, handleDrawerOpen, palettes } = this.props;
    const { formShowing } = this.state;
    return (
      <div className={classes.root}>
        <AppBar
          color='default'
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="primary"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <LibraryAdd />
            </IconButton>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
            >
              Create a Palette
            </Typography>
          </Toolbar>
          <div className={classes.navBtns}>
            <Button
              className={classes.button}
              variant='contained'
              color='secondary'
            >
              <Link to='/' className={classes.link} tabIndex='-1'>
                Go Back
              </Link>
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={this.showForm}
            >
              Save Palette
            </Button>
          </div>
        </AppBar>
        {formShowing &&
          <PaletteMetaForm
            palettes={palettes}
            hideForm={this.hideForm}
            handleSubmit={handleSubmit}
          />
        }
      </div>
    )
  }
}

export default withStyles(styles)(PaletteFormNav);