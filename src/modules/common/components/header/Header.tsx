import { makeStyles, Toolbar } from "@material-ui/core";
import { Brightness7, Brightness3 } from "@material-ui/icons";
import ToggleButton from "@material-ui/lab/ToggleButton";

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
}));

type HeaderProps = {
  onToogle: Function;
  isDark: boolean;
};

function Header({ isDark = false, onToogle }: HeaderProps) {
  const classes = useStyles();

  const icon = isDark ? <Brightness3 /> : <Brightness7 />;

  return (
    <Toolbar className={classes.header}>
      <ToggleButton
        className={classes.themeToogle}
        value="check"
        selected={isDark}
        onChange={() => onToogle()}
      >
        {icon}
      </ToggleButton>
    </Toolbar>
  );
}

export default Header;
