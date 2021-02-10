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
import { AuthProvider } from "modules/common/contexts/auth-context";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import { Login } from "modules/login/components/Login";
import { Registration } from "modules/registration/components/Registration";

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
      <AuthProvider>
        <CssBaseline />
        <div className={classes.root}>
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
              </Switch>
            </Container>
            <Footer />
          </Router>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
