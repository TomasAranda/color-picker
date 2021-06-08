import chroma from 'chroma-js';
import sizes from './sizes';
export default {
  colorBox: {
    width: '20%',
    height: props => props.showingFullPalette ? '25%' : '50%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-4px',
    '&:hover button': {
      opacity: 1
    },
    [sizes.down('lg')]: {
      width: '25%',
      height: props => props.showingFullPalette ? '20%' : '33.3333%'
    },
    [sizes.down('md')]: {
      width: props => '50%',
      height: props => props.showingFullPalette ? '10%' : '20%',
    },
    [sizes.down('xs')]: {
      width: props => '100%',
      height: props => props.showingFullPalette ? '5%' : '10%',
    }
  },
  copyText: {
    color: props => chroma(props.background).luminance() >= 0.5 ? 'rgba(0,0,0,0.7)' : 'white'
  },
  colorName: {
    color: props => chroma(props.background).luminance() <= 0.08 ? 'white' : 'black'
  },
  seeMore: {
    color: props => chroma(props.background).luminance() >= 0.5 ? 'rgba(0,0,0,0.7)' : 'white',
    background: 'rgba(255, 255, 255, 0.3)',
    position: 'absolute',
    border: 'none',
    right: '0px',
    bottom: '0px',
    width: '60px',
    height: '30px',
    textAlign: 'center',
    lineHeight: '30px',
    textTransform: 'uppercase',
    [sizes.down('xs')]: {
      bottom: '50%',
      marginBottom: '-15px' 
    }
  },
  copyButton: {
    // color: props => chroma(props.background).luminance() >= 0.5 ? 'rgba(0,0,0,0.7)' : 'white',
    color: 'white',
    background: props => chroma(props.background).luminance() <= 0.08 ? 'rgba(255, 255, 255, .4)' : 'rgba(0,0,0,0.4)',
    width: '100px',
    height: '30px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: '-50px',
    marginTop: '-15px',
    border: 'none',
    borderRadius: '5px',
    outline: 'none',
    fontSize: '1rem',
    lineHeight: '30px',
    textAlign: 'center',
    cursor: 'pointer',
    textDecoration: 'none',
    opacity: 0,
    transition: 'opacity .5s'
  },
  boxContent: {
    position: 'absolute',
    width: '100%',
    textTransform: 'uppercase',
    bottom: '0',
    left: '0',
    color: 'black',
    letterSpacing: '1px',
    padding: '10px',
    fontSize: '12px'
  },
  copyOverlay: {
    width: '100%',
    height: '100%',
    zIndex: 0,
    transform: 'scale(0)'
  },
  '@keyframes fadeInOutOverlay': {
    from: {
      opacity: 1,
      transform: 'scale(0.1)'
    },
    '25%, 75%': {
      opacity: 1,
      transform: 'scale(10)'
    },
    to: {
      opacity: 0,
      transform: 'scale(10)'
    }
  },
  '@keyframes fadeInOutOverlaySmallSize': {
    from: {
      opacity: 1,
      transform: 'scale(0.1)'
    },
    '35%, 75%': {
      opacity: 1,
      transform: 'scaleX(10) scaleY(45)'
    },
    to: {
      opacity: 0,
      transform: 'scaleX(10) scaleY(45)'
    }
  },
  showOverlay: {
    zIndex: 10,
    // overflow: 'hidden',
    position: 'absolute',
    animationName: '$fadeInOutOverlay',
    animationDuration: '1.8s',
    animationTimingFunction: 'ease-in-out',
    [sizes.down('md')]: {
      animationName: '$fadeInOutOverlaySmallSize'
    }
  },
  copyMsg: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '4rem',
    transform: 'scale(0)',
    color: 'white',
    '& h1': {
      fontWeight: 400,
      textShadow: '2px 4px black',
      background: props => chroma(props.background).luminance() <= 0.08 ? 'rgba(255,255,255,0.2)' : 'rgba(0, 0, 0, .1)',
      width: '100%',
      textAlign: 'center',
      marginBottom: 0,
      padding: '1rem',
      textTransform: 'uppercase',
      [sizes.down('xs')]: {
        fontSize: '5rem',
      }
    },
    '& p': {
      fontSize: '2rem',
      fontWeight: 100
    },
  },
  '@keyframes fadeInOutMessage': {
    '0%, 100%': {
      opacity: 0,
      transform: 'scale(0)'
    },
    '25%, 70%': {
      opacity: 1,
      transform: 'scale(1)'
    },
    '99%': {
      transform: 'scale(1)'
    }
  },
  showMsg: {
    zIndex: 10,
    animationName: '$fadeInOutMessage',
    animationDuration: '1.3s',
    animationTimingFunction: 'ease-in-out',
    animationDelay: '.4s'
  }
}