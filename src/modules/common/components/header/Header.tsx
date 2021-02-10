import { makeStyles, Toolbar, Switch, Box, Link } from "@material-ui/core";
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

  return (
    <Toolbar className={classes.header}>
      <Box className={classes.themeToogle}>
        <Link
          color="primary"
          component={RouterLink}
          to="/login"
          className={classes.link}
        >
          Login
        </Link>
        <Link
          color="secondary"
          component={RouterLink}
          to="/register"
          className={classes.link}
        >
          Registration
        </Link>
        <Switch checked={isDark} color="default" onChange={() => onToogle()} />
      </Box>
    </Toolbar>
  );
}

export default Header;
