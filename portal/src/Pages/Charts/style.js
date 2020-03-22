import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  Card: {
    borderRadius: "10px",
    position: "relative",
    // border: "1px solid #7563FF",
    "&:hover": {
      background: "#7563ff",
      color: "#fff"
    }
  },
  joinUser: {
    fontSize: "1.5rem"
  },
  content: {
    display: "flex",
    justifyContent: "space-between"
  },
  number: {
    fontFamily: "Poppins",
    margin: "0px",
    display: "inline-block",
    marginTop: "2rem"
  },
  cardText: {
    margin: 0,
    fontFamily: "Poppins",
    fontSize: "1rem"
  },
  iconDiv: {
    marginTop: "3rem"
  },
  icon: {
    color: "#7563FF",
    fontSize: "4rem"
  },
  ChartsGrid: {
    marginTop: "1rem"
  },
  mainCard: {
    borderRadius: "20px",
    position: "relative"
    // border: "1px solid #7563FF"
  }
}));

export default useStyles;
