import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing() * 2
  },
  addbutton: {
    textAlign: 'right',
    margin: '1rem 1rem'
  },

  button: {
    margin: '0.36rem'
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3)
  },
  root: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },

  DialogTitle: {
    marginRight: '20rem'
  },
  Doctorside: {
    color: deepPurple[500]
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  }
}));

export default useStyles;
