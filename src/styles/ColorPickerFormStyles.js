import chroma from 'chroma-js';

export const buttonStyles = {
  addColor: {
    width: '100%',
    padding: '1rem',
    marginTop: '1rem',
    fontSize: '1.5rem',
    backgroundColor: props => props.color,
    color: props => chroma(props.color || 'white').luminance() <= 0.08 ? 'white' : 'black'
  }
}

export const styles = {
  picker: {
    width: '100% !important',
    marginTop: '1rem'
  },
  form: {
    width: '100%',
    margin: '.5rem 0'
  },
  colorNameInput: {
    width: '100%',
    heigth: '70px',
  }
}