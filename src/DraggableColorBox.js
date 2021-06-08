import React from 'react';

import { withStyles } from '@material-ui/styles';
import Delete from '@material-ui/icons/Delete';
import { SortableElement } from 'react-sortable-hoc';

import styles from './styles/DraggableColorBoxStyles';

const DraggableColorBox = SortableElement(({ color, classes, name, handleClick }) => {
  return (
    <div className={classes.root} style={{ backgroundColor: color }}>
      <div className={classes.boxContent}>
        <span style={{ paddingTop: '2.5px' }}>{name}</span>
        <Delete className={classes.deleteIcon} onClick={() => handleClick(name)} />
      </div>
    </div>
  )
})

export default withStyles(styles)(DraggableColorBox);