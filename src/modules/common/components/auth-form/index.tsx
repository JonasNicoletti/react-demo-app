import {
  Container,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  makeStyles,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useFormik } from "formik";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type AuthFormProps = {
  title: string;
  linkSignUp?: boolean;
  linkSignIn?: boolean;
  linkPwdForgot?: boolean;
  validationSchema: any;
  initialValues: any;
  successFn: Function;
  errorFn: Function;
};
function AuthForm({
  title,
  linkSignUp,
  linkPwdForgot,
  linkSignIn,
  validationSchema,
  initialValues,
  successFn,
  errorFn,
}: AuthFormProps) {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await successFn(values);
      } catch (error) {
        errorFn(error);
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          {validationSchema.fields.name ? (
            <TextField
              autoComplete="uname"
              name="username"
              variant="outlined"
              fullWidth
              id="username"
              label="Username"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          ) : null}
          {validationSchema.fields.email ? (
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          ) : null}
          {validationSchema.fields.password ? (
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          ) : null}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {title}
          </Button>
          <Grid container>
            {linkSignUp ? (
              <Grid item xs>
                <Link
                  href="#"
                  variant="body2"
                  component={RouterLink}
                  to="/register"
                >
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            ) : null}
            {linkPwdForgot ? (
              <Grid item xs>
                <Link
                  href="#"
                  variant="body2"
                  component={RouterLink}
                  to="/password-forgot"
                >
                  Forgot password?
                </Link>
              </Grid>
            ) : null}
            {linkSignIn ? (
              <Grid item xs>
                <Link
                  href="#"
                  variant="body2"
                  component={RouterLink}
                  to="/login"
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            ) : null}
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export { AuthForm };
