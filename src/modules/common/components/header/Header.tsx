import {
  makeStyles,
  Toolbar,
  Switch,
  Box,
  Link,
  Button,
} from "@material-ui/core";
import { Api } from "modules/common/api";
import { useAuth } from "modules/common/contexts/auth-context";
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
  const handleLogout = async () => {
    await Api.getInstance().logout();
    logout();
  };
  let links;
  console.log(isLoggedIn);
  if (isLoggedIn) {
    links = [
      <Button key="logout" color="secondary" onClick={handleLogout}>
        Logout
      </Button>,
    ];
  } else {
    links = [
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
        {links}
        <Switch checked={isDark} color="default" onChange={() => onToogle()} />
      </Box>
    </Toolbar>
  );
}

export default Header;
