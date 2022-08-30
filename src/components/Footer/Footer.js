import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography, Link, Box } from '@material-ui/core';
import MascotHead from '../../assets/img/bones_head.png';
import FacebookIcon from '../icons/FacebookIcon';
import TwitterIcon from '../icons/TwitterIcon';
import InstagramIcon from '../icons/InstagramIcon';
import DiscordIcon from '../icons/DiscordIcon';
import YoutubeIcon from '../icons/YoutubeIcon';

const useStyles = makeStyles((theme) => ({
  footer: {
    position: 'absolute',
    bottom: '0',
    padding: '30px 0px',
    width: '100%',
    color: 'white',
    backgroundColor: '#db1d2f',
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  link: {
    width: '24px',
    height: '24px',
    display: 'inline',
    fontWeight: 'bold',
    margin: '0px 10px',
    '&:hover': {
      textDecoration: 'none',
    }
  },
  img: {
    width: '24px',
    height: '24px',
    color: '#fff'
  },
  bonesText: {
    color: '#fff',
    fontSize: '32px',
    fontWeight: 'bold'
  }
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Grid container justify='center' spacing={3}>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary" align="center" display='inline'>
              <Link className={classes.link}  color="inherit" href="/">
                SITEMAP
              </Link>
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center" display='inline'>
              <Link className={classes.link}  color="inherit" href="/">
                TOKENS
              </Link>
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center" display='inline'>
              <Link className={classes.link}  color="inherit" href="/">
                SWAP
              </Link>
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center" display='inline'>
              <Link className={classes.link}  color="inherit" href="/">
                NEWS
              </Link>
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center" display='inline'>
              <Link className={classes.link}  color="inherit" href="/">
                SUPPORT
              </Link>
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center" display='inline'>
              <Link className={classes.link}  color="inherit" href="/">
                CONTACT
              </Link>
            </Typography>
          </Grid>
          <Grid container item xs={12} alignItems='center' justify='center'>
            <Box mr={1} component='img' alt='bones mascot' src={MascotHead} height='70px' />
            <Typography variant='p' className={classes.bonesText}>
              BONES
            </Typography>
          </Grid>
          <Grid container item xs={12} alignItems='center' justify='center'>
            <a href="https://facebook.com/" rel="noopener noreferrer" target="_blank" className={classes.link}>
              <FacebookIcon color='#fff'/>
            </a>
            <a href="https://twitter.com/" rel="noopener noreferrer" target="_blank" className={classes.link}>
              <TwitterIcon color='#fff'/>
            </a>
            <a href="https://instagram.com/" rel="noopener noreferrer" target="_blank" className={classes.link}>
              <InstagramIcon color='#fff'/>
            </a>
            <a href="https://discord.com/" rel="noopener noreferrer" target="_blank" className={classes.link}>
              <DiscordIcon color='#fff'/>
            </a>
            <a href="https://www.youtube.com/" rel="noopener noreferrer" target="_blank" className={classes.link}>
              <YoutubeIcon color='#fff'/>
            </a>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="textSecondary" align="left">
              {'Copyright © '}
              <Link color="inherit" href="/">
                BONES
              </Link>{' '}
              {new Date().getFullYear()}
              <span style={{ margin: '0px 5px' }}>|</span>
              <Link color="inherit" href="/">
                PRIVACY POLICY
              </Link>{' '}
            </Typography>
          </Grid>
        </Grid>
        {/* <Grid container>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary" align="left">
              {'Copyright © '}
              <Link color="inherit" href="/">
                Tomb Finance
              </Link>{' '}
              {new Date().getFullYear()}
            </Typography>
          </Grid>
          <Grid item xs={6} style={{ textAlign: 'right' }}>
            <a
              href="https://twitter.com/tombfinance"
              rel="noopener noreferrer"
              target="_blank"
              className={classes.link}
            >
              <img alt="twitter" src={TwitterImage} className={classes.img} />
            </a>
            <a
              href="https://github.com/tombfinance/tombfinance-frontend"
              rel="noopener noreferrer"
              target="_blank"
              className={classes.link}
            >
              <img alt="github" src={GithubImage} className={classes.img} />
            </a>
            <a href="https://t.me/tombfinance" rel="noopener noreferrer" target="_blank" className={classes.link}>
              <img alt="telegram" src={TelegramImage} className={classes.img} />
            </a>
            <a
              href="https://www.youtube.com/channel/UCGf87DxPzLXwPrfYpXIkaLQ"
              rel="noopener noreferrer"
              target="_blank"
              className={classes.link}
            >
              <img alt="youtube" src={YoutubeImage} className={classes.img} />
            </a>
            <a href="http://discord.tomb.finance/" rel="noopener noreferrer" target="_blank" className={classes.link}>
              <img alt="discord" src={DiscordImage} className={classes.img} />
            </a>
          </Grid>
        </Grid> */}
      </Container>
    </footer>
  );
};

export default Footer;
