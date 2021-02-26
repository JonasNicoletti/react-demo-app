import {
  Container,
  makeStyles,
  CssBaseline,
  ThemeProvider,
  CircularProgress,
} from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { light, dark } from "theme";
import "./App.css";
import { useToogleTheme } from "modules/common/hooks";
import { useAuth } from "modules/common/contexts/auth-context";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import { Login, Registration, PasswordForgot, PasswordReset } from "modules/auth";
import { Api } from "modules/common/api";
import { useState } from "react";
import { Footer, Header } from "modules/common/components";
import { Home } from "modules/home/components";

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
  const { isLoggedIn, login } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    async function checklogin() {
      try {
        const user = await Api.getInstance().auth();
        login(user, false);
      } catch {}
      setIsLoaded(true);
    }
    if (!isLoggedIn) {
      checklogin();
    }
  }, [isLoggedIn, login]);

  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      <div className={classes.root}>
        {isLoaded ? (
          <Router>
            <Header isDark={isDark} onToogle={toogle} />
            <Container className={classes.main} maxWidth="md">
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/register">
                  <Registration />
                </Route>
                <Route path="/password-forgot">
                  <PasswordForgot />
                </Route>
                <Route path="/reset-password/:token">
                  <PasswordReset />
                </Route>
              </Switch>
            </Container>
            <Footer />
          </Router>
        ) : (
          <CircularProgress />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
