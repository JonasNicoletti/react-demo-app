import {
  makeStyles,
  Toolbar,
  Switch,
  Box,
  Link,
  Menu,
  IconButton,
  MenuItem,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Api } from "modules/common/api";
import { useAuth } from "modules/common/contexts/auth-context";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
  themeToogle: {
    marginLeft: "auto",
  },
  link: {
    marginRight: theme.spacing(2),
  },
}));

type HeaderProps = {
  onToogle: Function;
  isDark: boolean;
};

function Header({ isDark = false, onToogle }: HeaderProps) {
  const classes = useStyles();
  const { isLoggedIn, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    await Api.getInstance().logout();
    logout();
  };

  let actions;
  if (isLoggedIn) {
    actions = [
      <>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="secondary"
          onClick={handleMenu}
        >
          <AccountCircle />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          id="menu-appbar"
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={open}
          onClose={() => handleClose()}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </>,
    ];
  } else {
    actions = [
      <Link
        key="login"
        color="primary"
        component={RouterLink}
        to="/login"
        className={classes.link}
      >
        Login
      </Link>,
      <Link
        key="register"
        color="secondary"
        component={RouterLink}
        to="/register"
        className={classes.link}
      >
        Registration
      </Link>,
    ];
  }
  return (
    <Toolbar className={classes.header}>
      <Link color="textPrimary" variant="h6" component={RouterLink} to="/">
        Home
      </Link>
      <Box className={classes.themeToogle}>
        {actions}
        <Switch checked={isDark} color="default" onChange={() => onToogle()} />
      </Box>
    </Toolbar>
  );
}

export { Header };
