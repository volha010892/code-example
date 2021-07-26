import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid,
  Drawer,
  Divider,
  List,
  ListItem,
  Tooltip,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import {
  Menu,
  ChevronRight,
  ChevronLeft,
  SupervisorAccount,
} from '@material-ui/icons';
import { useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import Routes from '../../routing/routes';
import useStyles from './appbar.styles';
import { useWindowSize, autoCollapseSize } from '../../utils/resize';
import { StorageService, hasRolesIntersection } from '../../utils/utils';

interface Path {
  name: string;
  path: string;
  icon: JSX.Element;
  rolesAllowed?: string[];
}

const pathes: Path[] = [
  {
        name: Routes.AdminUser.name,
        path: Routes.AdminUser.path,
        icon: <SupervisorAccount />,
        rolesAllowed: Routes.AdminUser.rolesAllowed,
  },
];

const getNameByPath = (path: string): string | undefined => {
  const pathname = Object.values(Routes).find(
    (route) => route.path === path,
  )?.name;
  return pathname;
};

export default function MenuAppBar() {
  const location = useLocation();
  const size = useWindowSize();
  const styles = useStyles();
  const theme = useTheme();
  const path = getNameByPath(location.pathname);
  const [pageName, setPageName] = useState(path);
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    setOpen(size ? size >= autoCollapseSize : false);
  }, [size]);

  useEffect(() => {
    setPageName(path);
  }, [path]);

  useEffect(() => {
    setCurrentUser(StorageService.getUserData());
  }, []);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <div className={clsx(styles.root, { opened: open })}>
      <Drawer
        variant="permanent"
        className={clsx(styles.drawer, {
          [styles.drawerOpen]: open,
          [styles.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [styles.drawerOpen]: open,
            [styles.drawerClose]: !open,
          }),
        }}
      >
        <div className={styles.toolbar}>
          <Grid container direction="row" alignItems="center" justify="center">
            <Typography variant="h6">Areaby.online</Typography>
            <Typography className={styles.smallTitle}>
              Спортивная ловля форели
            </Typography>
          </Grid>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {pathes.map((routePath) => {
            const selected = path === getNameByPath(routePath.path);
            let jsxPage = null;
            if (hasRolesIntersection(routePath.rolesAllowed, currentUser)) {
              jsxPage = (
                <NavLink
                  key={routePath.path}
                  to={routePath.path}
                  className={styles.link}
                  activeClassName={styles.selected}
                  exact
                  replace={selected}
                >
                  <ListItem button selected={selected}>
                    <Tooltip title={routePath.name} placement="right" arrow>
                      <ListItemIcon
                        className={clsx({ [styles.selected]: selected })}
                      >
                        {routePath.icon}
                      </ListItemIcon>
                    </Tooltip>
                    <ListItemText primary={routePath.name} />
                  </ListItem>
                </NavLink>
              );
            }
            return jsxPage;
          })}
        </List>
      </Drawer>
      <AppBar
        className={clsx(styles.appBar, {
          [styles.appBarShift]: open,
        })}
      >
        <Toolbar>
          <div className={styles.headPage}>
            <IconButton
              edge="start"
              className={clsx({
                [styles.menuButton]: !open && styles.hide,
                [styles.hide]: open,
              })}
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
            >
              <Menu />
            </IconButton>
            <Typography
              variant="h6"
              className={clsx(styles.pageTitle, {
                [styles.pageTitleClose]: open,
              })}
            >
              {pageName}
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <div className={styles.offset} />
    </div>
  );
}