import React, { Component } from 'react';
import classNames from 'classnames';
import arrayMove from 'array-move';
import { withStyles } from '@material-ui/core/styles';

import ColorPickerForm from './ColorPickerForm';
import PaletteFormNav from './PaletteFormNav';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DraggableColorList from './DraggableColorList';
import Button from '@material-ui/core/Button';

import seedColors from './seedColors';

import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import styles from './styles/NewPaletteFormStyles'

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20
  };

  constructor(props) {
    super(props);
    this.state = {
      open: true,
      colors: seedColors[0].colors
    }
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  addNewColor = (newColor) => {
    this.setState(st => ({
      colors: [...st.colors, newColor]
    }))
  }

  removeColor = (colorName) => {
    this.setState(st => ({
      colors: st.colors.filter(({ name }) => name !== colorName)
    }));
  }

  addRandomColor = () => {
    const allColors = seedColors.map(p => p.colors).flat();
    let rand;
    let randomColor;
    let isDuplicateColor = true;
    while (isDuplicateColor) {
      rand = Math.floor(Math.random() * allColors.length);
      randomColor = allColors[rand];
      console.log(randomColor);
      isDuplicateColor = this.state.colors.some(({ name }) => name === randomColor.name);
    };
    this.setState(st => ({
      colors: [...st.colors, randomColor]
    }));
  }

  clearColors = () => {
    this.setState({ colors: [] });
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  };

  handleSubmit = ({ newPaletteName, emoji }) => {
    const newPalette = {
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g, '-'),
      colors: this.state.colors,
      emoji: emoji
    }
    this.props.savePalette(newPalette);
    this.props.history.push('/');
  }

  render() {
    const { classes, maxColors, palettes } = this.props;
    const { open, colors } = this.state;
    const paletteIsFull = colors.length >= maxColors;
    return (
      <ScopedCssBaseline>
        <div className={classes.root}>
          <PaletteFormNav
            open={open}
            palettes={palettes}
            handleDrawerOpen={this.handleDrawerOpen}
            handleSubmit={this.handleSubmit}
          />
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <div className={classes.container}>
              <Typography variant='h4'>Design Your Palette</Typography>
              <div className={classes.buttons}>
                <Button
                  variant='contained'
                  color='secondary'
                  onClick={this.clearColors}
                >
                  Clear Palette
            </Button>
                <Button
                  variant='contained'
                  color='primary'
                  disabled={paletteIsFull}
                  onClick={this.addRandomColor}
                >
                  Random Color
            </Button>
              </div>
              <ColorPickerForm
                colors={colors}
                paletteIsFull={paletteIsFull}
                addNewColor={this.addNewColor}
              />
            </div>
          </Drawer>
          <main
            className={classNames(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            <div className={classes.drawerHeader} />
            <DraggableColorList
              colors={colors}
              removeColor={this.removeColor}
              axis='xy'
              onSortEnd={this.onSortEnd}
              distance={5}
            />
          </main>
        </div>
      </ScopedCssBaseline>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);