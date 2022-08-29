import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
  Divider,
  Container,
} from '@material-ui/core';

import ListItemLink from '../ListItemLink';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AccountButton from './AccountButton';
import BonesLogo from '../../assets/img/logo-bones_red.png';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    color: '#e0e3bd',
    'background-color': '#fff',
    // borderBottom: `1px solid ${theme.palette.divider}`,
    padding: '10px',
    marginBottom: '3rem',
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  hide: {
    display: 'none',
  },
  toolbar: {
    flexWrap: 'wrap',
    padding: '0px'
  },
  toolbarTitle: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center'
  },
  link: {
    textTransform: 'uppercase',
    color: '#121212',
    fontSize: '14px',
    fontWeight: 'bold',
    margin: theme.spacing(1, 2),
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  brandLink: {
    textDecoration: 'none',
    color: '#e0e3bd',
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

const Nav = () => {
  const matches = useMediaQuery('(min-width:900px)');
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <AppBar position="sticky" elevation={0} className={classes.appBar}>
        {matches ? (
          <Container maxWidth='lg'>
            <Toolbar className={classes.toolbar}>
              <Box className={classes.toolbarTitle}>
                <Link to="/" color="inherit" className={classes.brandLink}>
                  <img src={BonesLogo} height='50px' alt='Bones logo' />
                </Link>
              </Box>
              <Box mr={5}>
                <Link color="textPrimary" to="/" className={classes.link}>
                  Home
                </Link>
                <Link color="textPrimary" to="/farms" className={classes.link}>
                  Farms
                </Link>
                <Link color="textPrimary" to="/boardroom" className={classes.link}>
                  Boardroom
                </Link>
                <Link color="textPrimary" to="/bond" className={classes.link}>
                  Bond
                </Link>
                <Link color="textPrimary" to="/" className={classes.link}>
                  More
                </Link>
              </Box>
              <AccountButton text="Connect Wallet" />
            </Toolbar>
          </Container>
        ) : (
          <Toolbar className={classes.toolbar}>
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Box>
              <Link to="/" color="inherit" className={classes.brandLink}>
                <img src={BonesLogo} height='50px' alt='Bones logo' />
              </Link>
            </Box>

            <Drawer
              className={classes.drawer}
              onEscapeKeyDown={handleDrawerClose}
              onBackdropClick={handleDrawerClose}
              variant="temporary"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
              </div>
              <Divider />
              <List>
                <ListItemLink primary="Home" to="/" />
                <ListItemLink primary="Farms" to="/farms" />
                <ListItemLink primary="Boardroom" to="/boardroom" />
                <ListItemLink primary="Bond" to="/bond" />
                <ListItemLink primary="More" to="/" />
                {/* <ListItemLink primary="Cemetery" to="/cemetery" />
                <ListItemLink primary="Masonry" to="/masonry" />
                <ListItemLink primary="Pit" to="/pit" />
                <ListItemLink primary="SBS" to="/sbs" />
                <ListItemLink primary="Liquidity" to="/liquidity" />
                <ListItemLink primary="Regulations" to="/regulations" />
                <ListItem button component="a" href="https://docs.tomb.finance">
                  <ListItemText>Docs</ListItemText>
                </ListItem> */}
                <ListItem style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AccountButton text="Connect" />
                </ListItem>
              </List>
            </Drawer>
          </Toolbar>
        )}
    </AppBar>
  );
};

export default Nav;
