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
import { useFormik } from "formik";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Api } from "modules/common/api";
import { useAuth } from "modules/common/contexts/auth-context";
import { Link as RouterLink } from "react-router-dom";
import * as yup from "yup";
import { useSnackbar } from "notistack";
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

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
});
function PasswordForgot() {
  const classes = useStyles();
  const api = Api.getInstance();
  const { setError } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await api.forgotPassword({ email: values.email });
        enqueueSnackbar("Check your inbox!", { variant: "info" });
      } catch (error) {
        setError({ message: error.response.data.message });
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
          Password Reset
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Request Password Reset
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                href="#"
                variant="body2"
                component={RouterLink}
                to="/register"
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export { PasswordForgot };
