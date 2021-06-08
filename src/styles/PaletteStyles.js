import sizes from './sizes';
export default {
  palette: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  colors: {
    height: '90%'
  },
  goBack: {
    width: '20%',
    height: '50%',
    backgroundColor: 'black',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    marginBottom: '-4px',
    '& a': {
      color: 'white',
      backgroundColor: 'rgba(255, 255, 255, .4)',
      width: '100px',
      height: '30px',
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginLeft: '-50px',
      marginTop: '-15px',
      background: 'rgba(255, 255, 255, .4)',
      border: 'none',
      outline: 'none',
      fontSize: '1rem',
      lineHeight: '30px',
      textAlign: 'center',
      cursor: 'pointer',
      textDecoration: 'none'
    },
    [sizes.down('lg')]: {
      width: '25%',
      height: '33.3333%'
    },
    [sizes.down('md')]: {
      width: '50%',
      height: '20%'
    },
    [sizes.down('xs')]: {
      width: '100%',
      height: props => props.showingFullPalette ? '5%' : '10%',
    }
  }
}