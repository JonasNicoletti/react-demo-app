import {
  Container,
  makeStyles,
  CssBaseline,
  ThemeProvider,
} from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { Footer, Header } from "modules/common/components/";
import { light, dark } from "theme";
import Home from "modules/home/components/Home";
import "./App.css";
import { useToogleTheme } from "modules/common/hooks";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));
function App() {
  const classes = useStyles();
  const [isDark, toogle] = useToogleTheme();
  const appliedTheme = createMuiTheme(isDark ? light : dark);
  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      <div className={classes.root}>
        <Header isDark={isDark} onToogle={toogle} />
        <Container className={classes.main} maxWidth="md">
          <Home />
        </Container>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
