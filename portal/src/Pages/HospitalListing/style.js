import { makeStyles } from "@material-ui/core/styles";

import Doctor from "./Assets/Doctor.svg";
import Man from "./Assets/man.png";

const useStyles = makeStyles(theme => ({
  // container: {
  //   display: "flex",
  //   justifyContent: "space-between",
  //   marginTop: theme.spacing() * 2
  // },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  addbutton: {
    textAlign: "right",
    margin: "1rem 1rem"
  },
  button: {
    margin: "0.36rem"
  },
  chatBoard: {
    display: "flex",
    flexFlow: "column wrap",
    justifyContent: "space-between",
    width: "90%",
    maxWidth: "800px",
    margin: "20px 5px"
  },
  msgChat: {
    flex: 1,
    overflowX: "hidden",
    overflowY: "auto",
    padding: "10px"
  },
  msg: {
    display: "flex",
    alignItems: "flex-end",
    marginBottom: "1rem"
  },
  msgbubble: {
    maxWidth: "450px",
    padding: "10px",
    borderRadius: "15px",
    background: "#ececec",
    lineHeight: "1.3rem"
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(3)
  },
  msgInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px"
  },
  msgSenderName: {
    marginRight: "10px",
    fontWeight: "bold",
    fontFamily: "Poppins"
  },
  msgTime: {
    fontSize: "0.85rem"
  },
  msgText: {
    fontFamily: "Open Sans"
  },
  messageInput: {
    padding: "10px",
    border: "none",
    borderRadius: "3px",
    fontSize: "1em",
    width: "100%",
    marginTop: "3rem"
  },
  msginput: {
    padding: "0rem 0.3rem",
    width: "80%",
    background: "#ddd",
    height: "2rem",
    border: "none"
  },

  sendbutton: {
    marginLeft: "10px",
    background: " rgb(0, 196, 65)",
    color: "#fff",
    padding: "0.5rem 1rem",
    fontWeight: "bold",
    cursor: "pointer",
    border: "none"
  },
  msgImg: {
    width: "50px",
    height: "50px",
    marginRight: "10px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    borderRadius: "50%",
    backgroundImage: `url(${Doctor})`
  },
  msgImgRight: {
    width: "50px",
    height: "50px",
    marginRight: "10px",
    background: "#ddd",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    borderRadius: "50%",
    backgroundImage: `url(${Man})`
  }
}));

export default useStyles;
