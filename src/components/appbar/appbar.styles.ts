import { createStyles, makeStyles } from '@material-ui/core/styles';

const drawerWidth = 270;
const menuPadding = 15;
const drawerCloseWidth = 57;

const useStyles = makeStyles((theme) => createStyles({
  root: {
    display: 'flex',
  },
  offset: theme.mixins.toolbar,
  appBar: {
    position: '-webkit-sticky',
    top: 0,
    marginLeft: -drawerCloseWidth,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: 0,
    width: `calc(100% - ${drawerWidth + menuPadding}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: -20,
    },
    [theme.breakpoints.down('sm')]: {
      marginRight: 15,
    },
    marginRight: 50,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth + menuPadding,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  smallTitle: {
    fontSize: 12,
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
  selected: {
    color: theme.palette.info.main,
  },
  pageTitle: {
    width: 'auto',
    [theme.breakpoints.down('xs')]: {
      fontSize: 16,
    },
  },
  pageTitleClose: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 18,
      paddingRight: 18,
    },
  },
  subpageText: {
    fontSize: 13,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  headPage: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export default useStyles;