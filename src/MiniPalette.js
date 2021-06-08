import React, { memo } from 'react';
import { withStyles } from '@material-ui/styles';

import Delete from '@material-ui/icons/Delete'

import styles from './styles/MiniPaletteStyles';

const MiniPalette = memo(function MiniPalette({ id, classes, paletteName, emoji, colors, handleGoToPalette, openDialog }) {
  function handleDelete(e) {
    e.stopPropagation();
    openDialog(id);
  }
  function handleClick() {
    handleGoToPalette(id);
  }

  const miniColorBoxes = colors.map(color => (
    <div
      key={color.name}
      className={classes.miniColor}
      style={{ backgroundColor: color.color }}
    />
  ));
  return (
    <div className={classes.root} onClick={handleClick}>
      <Delete
        className={classes.deleteIcon}
        onClick={handleDelete}
      />
      <div className={classes.colors}>
        {miniColorBoxes}
      </div>
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  )
});

export default withStyles(styles)(MiniPalette)