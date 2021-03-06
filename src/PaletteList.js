import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { Link } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import MiniPalette from './MiniPalette';

import styles from './styles/PaletteListStyles';

class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = { openDeleteDialog: false, deletingId: '' }
  }

  openDialog = (id) => {
    this.setState({ openDeleteDialog: true, deletingId: id });
  }

  closeDialog = () => {
    this.setState({ openDeleteDialog: false, deletingId: '' });
  }
  
  handleDeleteConfirmation = () => {
    this.props.deletePalette(this.state.deletingId);
    this.closeDialog();
  }

  goToPalette = (id) => {
    this.props.history.push(`/palette/${id}`)
  }
  render() {
    const { palettes, classes } = this.props;
    const { openDeleteDialog } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1 className={classes.heading}>React Colors</h1>
            <Link to='/palette/new'>Create Palette</Link>
          </nav>
          <TransitionGroup className={classes.palettes}>
            {palettes.map(palette => (
              <CSSTransition
                key={palette.id}
                classNames='fade'
                timeout={500}
              >
                <MiniPalette
                  id={palette.id}
                  handleGoToPalette={this.goToPalette}
                  openDialog={this.openDialog}
                  {...palette} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
        <Dialog
          open={openDeleteDialog}
          onClose={this.closeDialog}
          aria-labelledby='delete-dialog-title'
        >
          <DialogTitle id='delete-dialog-title'>Delete Palette?</DialogTitle>
          <List>
            <ListItem button onClick={this.handleDeleteConfirmation}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: blue[100], color: blue[700] }}>
                  <Check />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Delete' />
            </ListItem>
            <ListItem button onClick={this.closeDialog}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: red[100], color: red[700] }}>
                  <Close />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Cancel' />
            </ListItem>
          </List>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(PaletteList);