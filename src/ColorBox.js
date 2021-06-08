import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames';
import { withStyles } from '@material-ui/styles';

import styles from './styles/ColorBoxStyles';

class ColorBox extends Component {
  constructor(props) {
    super(props)

    this.state = { copied: false }
    this.changeCopyState = this.changeCopyState.bind(this)
  }

  changeCopyState() {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1800);
    });
  }

  render() {
    const { name, background, moreUrl, showingFullPalette, classes } = this.props;
    const { copied } = this.state;
    return (
      <div
        className={classes.colorBox}
        style={{ background }}
        onClick={() => navigator.clipboard.writeText(background)
          .then(() => this.changeCopyState())}
      >
        <div
          className={classNames(classes.copyOverlay, {
            [classes.showOverlay]: copied,
          })}
          style={{ background }}
        />
        <div
          className={classNames(classes.copyMsg, {
            [classes.showMsg]: copied,
          })}
        >
          <h1>Copied!</h1>
          <p className={classes.copyText}>{background}</p>
        </div>
        <div>
          <div className={classes.boxContent}>
            <span className={classes.colorName}>{name}</span>
          </div>
          <button className={classes.copyButton}>COPY</button>
        </div>
        {showingFullPalette &&
          <Link to={moreUrl} onClick={evt => evt.stopPropagation()}>
            <span className={classes.seeMore}>MORE</span>
          </Link>
        }
      </div>
    )
  }
}

export default withStyles(styles)(ColorBox);