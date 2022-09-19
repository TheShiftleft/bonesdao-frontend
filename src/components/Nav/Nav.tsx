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
  Paper,
  MenuList,
  MenuItem,
  Button,
  Popper,
  Grow,
  ClickAwayListener,
  ButtonBase,
  Collapse,
  ListItemIcon,
} from '@material-ui/core';

import ListItemLink from '../ListItemLink';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
      backgroundColor: '#fff',
      color: 'black',
      border: 'none'
    },
    '& span': {
      color: "#121212"
    }
  },
  moreButton: {
    textTransform: 'uppercase',
    color: '#121212',
    fontSize: '14px',
    fontWeight: 'bold',
    margin: theme.spacing(1, 2),
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: '#fff',
      color: 'black',
      border: 'none'
    },
    '& span': {
      color: "#121212",
      '& span': {
        marginLeft: '0px',
        marginBottom: '5px'
      }
    }
  },
  brandLink: {
    textDecoration: 'none',
    color: '#e0e3bd',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  menuItem: {
    padding: '0px',
    '&:hover': {
      backgroundColor: '#845EC2 !important',
      color: '#fff !important',
      '& a': {
        color: '#fff !important'
      }
    },
    '& a': {
      textDecoration: 'none',
      padding: '6px 16px'
    }
  },
  menu: {
    boxShadow: '7px 9px 23px -7px rgba(0,0,0,1)'
  }
}));

const Nav = () => {
  const matches = useMediaQuery('(min-width:900px)');
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleMenuToggle = () => {
    setMenuOpen((prevOpen) => !prevOpen);
  };

  const handleMenuClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setMenuOpen(false);
  };

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
                <Button 
                  ref={anchorRef} 
                  aria-controls={menuOpen ? 'menu-list-grow' : undefined} 
                  aria-haspopup="true" 
                  onClick={handleMenuToggle}
                  variant='text' 
                  color="primary" 
                  className={classes.moreButton}
                  endIcon={<ExpandMoreIcon style={{transform: `${menuOpen ? 'rotate(180deg)' : ''}`}} />}>
                  More
                </Button>
              </Box>
              <Popper open={menuOpen} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleMenuClose}>
                      <MenuList className={classes.menu} variant='menu' autoFocusItem={menuOpen} style={{ minWidth: '100px' }}>
                        <MenuItem className={classes.menuItem} onClick={handleMenuClose}>
                          <Link to="/" style={{ width: '100%' }}>
                            Swap
                          </Link>
                        </MenuItem>
                        <MenuItem className={classes.menuItem} onClick={handleMenuClose}>
                          <Link to="/">
                            Docs
                          </Link>
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
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
                {/* <ListItemLink primary="More" to="/" /> */}
                <ListItem component='li' button onClick={handleMenuToggle}>
                  <ListItemText primary="More" style={{ flex: 'none' }}  />
                  <ListItemIcon>
                    <ExpandMoreIcon style={{transform: `${menuOpen ? 'rotate(180deg)' : ''}`}} />
                  </ListItemIcon>
                  {/* {open ? <ExpandLess /> : <ExpandMore />} */}
                </ListItem>
                <Collapse in={menuOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button style={{ padding: '0px', paddingLeft: '20px' }}>
                      <Link to="/bond" style={{ width: '100%', padding: '6px 16px', textDecoration: 'none'  }}>
                        Swap
                      </Link>
                    </ListItem>
                    <ListItem button style={{ padding: '0px', paddingLeft: '20px'}}>
                      <Link to="/farms" style={{ width: '100%', padding: '6px 16px', textDecoration: 'none'}}>
                        Docs
                      </Link>
                    </ListItem>
                  </List>
                </Collapse>
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
