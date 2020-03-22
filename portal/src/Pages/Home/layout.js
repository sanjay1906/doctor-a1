import React, { useState, useEffect } from "react";
import clsx from "clsx";
import SearchIcon from "@material-ui/icons/Search";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AssessmentIcon from "@material-ui/icons/Assessment";
import MapIcon from "@material-ui/icons/Map";
import Map from "./component/Map";
import Charts from "Pages/Charts";

import { InputComponent, Chat } from "Components";

import useStyles from "./style";

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
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
            Doctor-AI
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
          <div className={classes.listItem} onClick={() => setStep(1)}>
            <ListItem>
              <ListItemIcon>
                <MapIcon style={{ fontSize: "2rem", color: "#e263ff" }} />
              </ListItemIcon>
              <ListItemText> Map </ListItemText>
              <ListItemText />
            </ListItem>
          </div>
          <Divider />
          <div className={classes.listItem} onClick={() => setStep(2)}>
            <ListItem>
              <ListItemIcon>
                <AssessmentIcon
                  style={{ fontSize: "2rem", color: "#e263ff" }}
                />
              </ListItemIcon>
              <ListItemText> Charts </ListItemText>
              <ListItemText />
            </ListItem>
          </div>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div style={{ padding: 20, marginTop: "3rem" }}>
          {step === 1 && <Map />}
          {step === 2 && <Charts />}
        </div>
      </main>
    </div>
  );
}

{
  /* <div style={{ display: "flex" }}>
            <InputBase
              placeholder="Search your desease"
              fullWidth
              style={{ borderBottom: "1px solid rgba(0,0,0,0.4)" }}
            />
            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search">
              <SearchIcon color="primary" />
            </IconButton>
          </div> */
}
{
  /* <div> */
}
{
  /* {Boolean(state.isLoaded) && ( */
}
{
  /* <Map /> */
}

{
  /* )} */
}
{
  /* {Boolean(mapPermission !== "granted" && state.isLoaded) && (
            <div>
              <p>Please enable Geolocation permission</p>
            </div>
          )} */
}
{
  /* </div> */
}
