import {
  Box,
  Button,
  Typography,
  useTheme,
  FormControl,
  InputLabel,
  FormHelperText,
  Input,
  IconButton,
  Hidden,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import signup from "../../assets/images/edit.jpg";
import FlexBetween from "../../components/FlexBetween";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import GoogleIcon from "@mui/icons-material/Google";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useCreateUserMutation } from "../../state/api";
import { setCredentials } from "../../state";

const Signup = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  //const isMobile = useMediaQuery('(md: 600px)')

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [createUser, { isLoading }] = useCreateUserMutation();
  //const { userInfo } = useSelector(state => state.global)

  // useEffect(() => {
  //     if(userInfo) {
  //         navigate('/login')
  //     }
  // }, [userInfo, navigate])

  const clickHandler = (path) => {
    navigate(path);
  };

  const validateSchema = yup.object({
    name: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "password should be minimum of eight characters long")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validateSchema,
    onSubmit: async (values) => {
      try {
        await createUser(values).unwrap();
        dispatch(setCredentials(values));
        toast.success("Account created successfully");
        navigate("/login");
      } catch (err) {
        console.log(err);
        toast.error(err?.data?.message || err.error || "An error occurred");
      }
    },
  });
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          mt: "1rem",
        }}
      >
        <Box
          sx={{
            justifyContent: "flex-start",
            color: theme.palette.secondary[500],
            ml: { xs: "2rem", sm: "5rem", md: "10rem" },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "1.5rem", sm: "2rem" },
              fontWeight: "bold",
            }}
          >
            FEDECO
          </Typography>
        </Box>

        <Box>
          <Button
            variant="contained"
            onClick={() => {
              clickHandler("/login");
            }}
            sx={{
              backgroundColor: theme.palette.secondary[500],
              color: theme.palette.background.alt,
              fontSize: { xs: "0.7rem", sm: "0.8rem" },
              fontWeight: "bold",
              padding: "0.5rem 1rem",
              width: { xs: "5rem", sm: "6rem" },
              borderRadius: "2rem",
              mr: { xs: "2rem", sm: "5rem", md: "10rem" },
            }}
          >
            Log In
          </Button>
        </Box>
      </Box>

      <Box height="90vh" mt="2rem" mx="8%" borderRadius="2rem">
        <FlexBetween>
          <Hidden mdDown>
            {/* <Typography
                    position="absolute"
                    top="8rem"
                    left="15%"
                    fontSize="2rem"
                    fontWeight="bold"
                    fontFamily={theme.typography.fontFamily[7]}
                    color={theme.palette.primary[500]}
                >
                    Welcome Back!!!
                </Typography> */}

            <Box
              component="img"
              alt="signup image"
              src={signup}
              width="50%"
              height="596px"
              borderRadius="2rem 0 0 2rem"
            />
          </Hidden>

          <Box
            sx={{
              backgroundColor: theme.palette.primary[700],
              //color: theme.palette.primary[900],
              width: "100%",
              height: "596px",
              borderRadius: "0 2rem 2rem 0",
              padding: "0.7rem",
            }}
          >
            <Typography fontWeight="bold" fontSize="1.3rem" ml="1rem">
              Create Your Account
            </Typography>

            <Box display="flex" flexWrap="wrap" gap="1rem" m="1rem 1rem">
              <Button
                sx={{
                  variant: "contained",
                  backgroundColor: theme.palette.secondary[500],
                  color: theme.palette.background.alt,
                  padding: "0.5rem 1rem",
                  borderRadius: "2rem",
                  boxShadow: theme.shadows[10],
                }}
              >
                <FacebookRoundedIcon />
                <Typography ml="0.5rem" fontSize="0.7rem">
                  sign in with facebook
                </Typography>
              </Button>
              <Button
                sx={{
                  variant: "contained",
                  backgroundColor: theme.palette.secondary[500],
                  color: theme.palette.background.alt,
                  padding: "0.5rem 1rem",
                  borderRadius: "2rem",
                  boxShadow: theme.shadows[10],
                }}
              >
                <GoogleIcon />
                <Typography ml="0.5rem" fontSize="0.7rem">
                  sign in with google
                </Typography>
              </Button>
            </Box>

            <Typography m="2rem 1rem">Or create an account?</Typography>

            <Box>
              <form onSubmit={formik.handleSubmit}>
                <Box
                  display="flex"
                  flexWrap="wrap"
                  color={theme.palette.primary[500]}
                  m="2rem 1rem"
                >
                  <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
                    <InputLabel htmlFor="name">Username</InputLabel>
                    <Input
                      id="name"
                      type="text"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      onBlur={formik.handleBlur}
                    />
                    <FormHelperText id="my-helper-text">
                      {formik.errors.name}
                    </FormHelperText>
                  </FormControl>

                  <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input
                      id="email"
                      name="email"
                      type="text"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      onBlur={formik.handleBlur}
                    />
                    <FormHelperText id="my-helper-text">
                      {formik.errors.email}
                    </FormHelperText>
                  </FormControl>

                  <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      onBlur={formik.handleBlur}
                      endAdornment={
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      }
                    />
                    <FormHelperText id="my-helper-text">
                      {formik.errors.password}
                    </FormHelperText>
                  </FormControl>
                </Box>
                <Button
                  type="submit"
                  variant="filled"
                  width="25ch"
                  sx={{
                    backgroundColor: theme.palette.secondary[500],
                    color: theme.palette.background.alt,
                    m: "1rem 1rem",
                    padding: "0.5rem 1rem",
                    borderRadius: "2rem",
                    boxShadow: theme.shadows[10],
                  }}
                >
                  {" "}
                  submit{" "}
                </Button>
              </form>
              <Box display="flex" justifyContent="center" alignItems="center">
                {isLoading && <CircularProgress color="secondary" />}
              </Box>
              <Typography ml="1rem" mt="0.5rem">
                Already have an account?{" "}
                <span
                  style={{
                    color: theme.palette.secondary[500],
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    clickHandler("/login");
                  }}
                >
                  Log in
                </span>
              </Typography>
            </Box>
          </Box>
        </FlexBetween>
      </Box>
    </Box>
  );
};
export default Signup;
