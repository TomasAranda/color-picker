import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';

import ColorBox from "./ColorBox";
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import SnackBar from './Snackbar';

import styles from './styles/PaletteStyles';

class Palette extends Component {
  constructor(props) {
    super(props)
    this.state = { level: 500, format: 'hex', open: false };
    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this)
  }
  changeLevel(level) {
    this.setState({ level })
  }
  changeFormat(val) {
    this.setState({ format: val, open: true })
  }
  closeSnackbar() {
    this.setState({ open: false });
  }
  render() {
    const { classes } = this.props;
    const { colors, paletteName, emoji, id } = this.props.palette;
    const { level, format, open } = this.state;
    const colorBoxes = colors[level].map(color => (
      <ColorBox
        key={color.id}
        background={color[format]}
        name={color.name}
        moreUrl={`/palette/${id}/${color.id}`}
        showingFullPalette
      />
    ));
    return (
      <div className={classes.palette}>
        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          handleChange={this.changeFormat}
          showingAllColors
        />
        <div className={classes.colors}>{colorBoxes}</div>
        <SnackBar open={open} closeSnackbar={this.closeSnackbar} format={format} />
        <PaletteFooter
          paletteName={paletteName}
          emoji={emoji}
        />
      </div>
    )
  }
}

export default withStyles(styles)(Palette);