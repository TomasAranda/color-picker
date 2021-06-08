import React, { Component } from 'react';

import { Picker } from 'emoji-mart';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import 'emoji-mart/css/emoji-mart.css';

export default class PaletteMetaForm extends Component {
  constructor(props) {
    super(props)
    this.state = { stage: 'form', newPaletteName: '' }
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isUniquePaletteName', value =>
      this.props.palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
    );
  }

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  showEmojiPicker = () => {
    this.setState({ stage: 'emoji' });
  }

  savePalette = (emoji) => {
    const newPalette = {
      newPaletteName: this.state.newPaletteName,
      emoji: emoji.native
    };
    this.props.handleSubmit(newPalette);
    this.setState({ stage: '' })
  }

  render() {
    const { hideForm } = this.props;
    const { stage, newPaletteName } = this.state;
    return (
      <React.Fragment>
        <Dialog open={stage === 'form'} onClose={hideForm} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
          <ValidatorForm onSubmit={this.showEmojiPicker}>
            <DialogContent>
              <DialogContentText>
                Please enter a name for your new beatiful palette. Make sure it's unique!
              </DialogContentText>
              <TextValidator
                value={newPaletteName}
                label='Palette Name'
                name='newPaletteName'
                onChange={this.handleChange}
                fullWidth
                validators={['required', 'isUniquePaletteName']}
                errorMessages={['Enter Palette Name', 'Palette Name already used']}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={hideForm}
                color="secondary"
                variant='contained'
              >
                Cancel
            </Button>
              <Button
                variant='contained'
                color='primary'
                type='submit'
              >Save</Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
        <Dialog open={stage === 'emoji'} onClose={hideForm}>
          <DialogTitle id="form-dialog-title">Pick a Palette Emoji</DialogTitle>
          <Picker onSelect={this.savePalette} title='Choose an emoji!' />
        </Dialog>
      </React.Fragment>
    );
  }
}