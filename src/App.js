import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';

import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPallete from './SingleColorPallete';
import NewPaletteForm from "./NewPaletteForm";
import Page from './Page';

import { TransitionGroup, CSSTransition } from "react-transition-group";

class App extends Component {
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
    this.state = { palettes: savedPalettes || seedColors };
  }

  findPalette = (id) => {
    return this.state.palettes.find(palette => palette.id === id);
  }
  deletePalette = (id) => {
    this.setState(st => ({
      palettes: st.palettes.filter(palette => palette.id !== id)
    }), this.syncLocalStorage);
  }
  savePalette = (newPalette) => {
    this.setState(st => (
      { palettes: [...st.palettes, newPalette] }
    ), this.syncLocalStorage);
  }
  syncLocalStorage = () => {
    window.localStorage.setItem('palettes', JSON.stringify(this.state.palettes));
  }
  render() {
    const { palettes } = this.state;
    return (
      <Route render={({ location }) => (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames='page' timeout={500}>
            <Switch location={location}>
              <Route
                exact
                path='/'
                render={(routeProps) => (
                  <Page className='page'>
                    <PaletteList
                      {...routeProps}
                      palettes={palettes}
                      deletePalette={this.deletePalette}
                    />
                  </Page>
                )}
              />
              <Route
                exact
                path='/palette/new'
                render={(routeProps) => (
                  <Page className='page'>
                    <NewPaletteForm
                      {...routeProps}
                      savePalette={this.savePalette}
                      palettes={this.state.palettes}
                    />
                  </Page>
                )}
              />
              <Route
                exact
                path='/palette/:id'
                render={routeProps => (
                  <Page className='page'>
                    <Palette
                      palette={generatePalette(this.findPalette(routeProps.match.params.id))}
                    />
                  </Page>
                )}
              />
              <Route
                exact
                path='/palette/:paletteId/:colorId'
                render={routeProps => (
                  <Page className='page'>
                    <SingleColorPallete
                      palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))}
                      colorId={routeProps.match.params.colorId}
                    />
                  </Page>
                )}
              />
            </Switch >
          </CSSTransition>
        </TransitionGroup>
      )} />
    )
  }
}

export default App;
