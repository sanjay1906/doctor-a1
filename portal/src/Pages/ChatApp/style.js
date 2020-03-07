import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  chatBoard: {
    display: 'flex',
    flexFlow: 'column wrap',
    justifyContent: 'space-between',
    width: '90%',
    maxWidth: '800px',
    margin: '20px 5px'
  },
  msgChat: {
    flex: 1,
    overflowY: 'auto',
    padding: '10px'
  },
  msg: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: '1rem'
  },
  msgbubble: {
    maxWidth: '450px',
    padding: '10px',
    borderRadius: '15px',
    background: '#ececec',
    lineHeight: '1.3rem'
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3)
  },
  msgInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px'
  },
  msgSenderName: {
    marginRight: '10px',
    fontWeight: 'bold',
    fontFamily: 'Poppins'
  },
  msgTime: {
    fontSize: '0.85rem'
  },
  msgText: {
    fontFamily: 'Open Sans'
  },

  msgImg: {
    width: '50px',
    height: '50px',
    marginRight: '10px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    borderRadius: '50%',
    backgroundImage: `url('/images/Doctor.svg')`
  },
  msgImgRight: {
    width: '50px',
    height: '50px',
    marginRight: '10px',
    background: '#ddd',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    borderRadius: '50%',
    backgroundImage: `url(${`https://image.flaticon.com/icons/svg/145/145867.svg`})`
  }
}));

export default useStyles;
