import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from "react-color";

import { styles, buttonStyles } from './styles/ColorPickerFormStyles';

const StyledButton = withStyles(buttonStyles)(({ classes, color, ...other }) => (
  <Button className={classes.addColor} variant='contained' {...other} />
));

class ColorPickerForm extends Component {
  constructor(props) {
    super(props)
    this.state = { currentColor: 'teal', newColorName: '' }
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isUniqueColorName', value =>
      this.props.colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
    );
    ValidatorForm.addValidationRule('isUniqueColor', value =>
      this.props.colors.every(({ color }) => color !== this.state.currentColor)
    );
  }

  handleSubmit = () => {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName
    };
    this.props.addNewColor(newColor);
    this.setState({ newColorName: '' })
  }

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  updateCurrentColor = (newColor) => {
    this.setState({ currentColor: newColor.hex });
  };

  render() {
    const { paletteIsFull, classes } = this.props;
    const { currentColor, newColorName } = this.state;
    return (
      <React.Fragment>
        <ChromePicker
          className={classes.picker}
          color={currentColor}
          onChange={this.updateCurrentColor}
        />
        <ValidatorForm
          className={classes.form}
          onSubmit={this.handleSubmit}
          instantValidate={false}
        >
          <TextValidator
            className={classes.colorNameInput}
            variant='filled'
            label="Color Name"
            placeholder='Color Name'
            onChange={this.handleChange}
            name="newColorName"
            value={newColorName}
            autoComplete='off'
            validators={['required', 'isUniqueColorName', 'isUniqueColor']}
            errorMessages={[
              'Enter a color name',
              'Color name must be unique',
              'Color already used!'
            ]}
          />
          <StyledButton
            color={currentColor}
            disabled={paletteIsFull}
            type='submit'
          >{!paletteIsFull ? 'ADD COLOR' : 'PALETTE FULL'}</StyledButton>
        </ValidatorForm>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(ColorPickerForm);