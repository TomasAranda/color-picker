import chroma from 'chroma-js';
import sizes from './sizes';

export default {
  root: {
    width: '20%',
    height: '25%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'move',
    marginBottom: '-6px',
    '&:hover svg': {
      color: 'white',
      transform: 'scale(1.3)'
    },
    [sizes.down('lg')]: {
      width: '25%',
      height: '20%'
    },
    [sizes.down('md')]: {
      width: '50%',
      height: '10%'
    },
    [sizes.down('sm')]: {
      width: '100%',
      height: '5%'
    },
  },
  boxContent: {
    position: 'absolute',
    width: '100%',
    textTransform: 'uppercase',
    bottom: '0',
    left: '0',
    color: props => chroma(props.color).luminance() >= 0.08 ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.8)',
    letterSpacing: '1px',
    padding: '10px',
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  deleteIcon: {
    paddingBottom: '6px',
    cursor: 'pointer',
    transition: 'all .3s ease-in-out'
  }
}