import React, { useState, useEffect } from "react";
import Header from "Components/Header";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Map from "./component/Map";

// import useStyles from "./style";

//SideDrawer
import clsx from "clsx";
import {
  Container,
  AppBar,
  Drawer,
  List,
  CssBaseline,
  Typography,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  IconButton,
  Paper,
  InputBase
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

import { InputComponent } from "Components";

//Side Drawer
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "Center",
    alignItems: "Center"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  inputSearchFiled: {
    textAlign: "center",
    marginTop: "5rem"
  },
  inputSearch: {
    padding: "1rem",
    width: theme.spacing() * 50,
    background: "#D9F1E3",
    border: "1px solid #d3d3d3",
    boxShadow: "0px 8px 20px 0px rgba(0, 0, 0, 0.15)",
    outline: "none",
    // borderRadius: "34px"
    borderTopLeftRadius: "25px",
    borderBottomLeftRadius: "25px",
    [theme.breakpoints.only("xs")]: {
      // marginTop: "1rem",
      borderRadius: "5px"
    }
  },
  searchButton: {
    padding: "18px 30px ",
    background: "#7563FF",
    color: "#fff",
    border: "none",
    borderTopRightRadius: "25px",
    borderBottomRightRadius: "25px",
    outline: "none",
    [theme.breakpoints.only("xs")]: {
      marginTop: "1rem",
      borderRadius: "5px"
    }
  }
}));

const Home = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [mapPermission, setMapPermission] = useState(null);
  const [deseaseName, setDeseaseName] = useState(null);
  const [state, setstate] = useState({
    latitude: "",
    logitude: "",
    isLoaded: false
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    (async () => {
      const permission = await navigator.permissions.query({
        name: "geolocation"
      });
      setMapPermission(permission.state);
      permission.onchange = () => {
        setMapPermission(permission.state);
      };
    })();
  }, []);

  useEffect(() => {
    if (mapPermission === "granted") {
      navigator.geolocation.getCurrentPosition(location => {
        setstate({
          latitude: location.coords.latitude,
          logitude: location.coords.longitude,
          isLoaded: true
        });
      });
    }
  }, [mapPermission]);

  const handleSearch = () => {
    // TODO : Validate search should not empty
    // TODO : Search Nearby Hospital
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        style={{ background: "#7563FF" }}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Bed Tracking System
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}>
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {["Home", "Hospital", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div style={{marginTop:60,display:'flex'}}>
          <InputBase
            placeholder="Search your desease"
            fullWidth
            style={{borderBottom:'1px solid rgba(0,0,0,0.4)'}}
          />
          <IconButton type="submit" className={classes.iconButton} aria-label="search">
            <SearchIcon color="primary"/>
          </IconButton>
          </div>
        <div>
          {Boolean(mapPermission === "granted" && state.isLoaded) && (
            <Map
              options={{
                center: { lat: state.latitude, lng: state.logitude },
                zoom: 5
              }}
            />
          )}
          {Boolean(mapPermission !== "granted" && state.isLoaded) && (
            <div>
              <p>Please enable Geolocation permission</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
