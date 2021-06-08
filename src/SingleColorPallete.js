import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';

import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import SnackBar from './Snackbar';

import styles from './styles/PaletteStyles';

class SingleColorPallete extends Component {
  constructor(props) {
    super(props)
    this._shades = this.gatherShades(this.props.palette, this.props.colorId);
    this.state = { format: 'hex', open: false }
    this.changeFormat = this.changeFormat.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this)
  }

  gatherShades(palette, colorToFilterBy) {
    //return shades of given color
    let shades = [];
    let allColors = palette.colors;
    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter(color => color.id === colorToFilterBy)
      )
    }
    return shades.slice(1);
  }

  changeFormat(val) {
    this.setState({ format: val, open: true });
  }
  closeSnackbar() {
    this.setState({ open: false });
  }

  render() {
    const { classes } = this.props;
    const { paletteName, emoji, id } = this.props.palette;
    const { format, open } = this.state;
    const colorBoxes = this._shades.map(color => (
      <ColorBox
        key={color.name}
        name={color.name}
        background={color[format]}
        showingFullPalette={false}
      />
    ));
    return (
      <div className={classes.palette}>
        <Navbar
          handleChange={this.changeFormat}
          showingAllColors={false}
        />
        <div className={classes.colors}>
          {colorBoxes}
          <div className={classes.goBack}>
            <Link to={`/palette/${id}`}>GO BACK</Link>
          </div>
        </div>
        <SnackBar open={open} closeSnackbar={this.closeSnackbar} format={format} />
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    )
  }
}

export default withStyles(styles)(SingleColorPallete);