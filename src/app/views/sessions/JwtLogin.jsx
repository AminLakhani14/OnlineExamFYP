import { LoadingButton } from "@mui/lab";
import { Card, Checkbox, Grid, TextField } from "@mui/material";
import { Box, styled, useTheme } from "@mui/system";
import { Paragraph } from "app/components/Typography";
import useAuth from "app/hooks/useAuth";
import { Formik } from "formik";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "./session.css";

const FlexBox = styled(Box)(() => ({ display: "flex", alignItems: "center" }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: "center" }));

const ContentBox = styled(Box)(() => ({
  maxWidth: "700px",
  height: "60vh",
  padding: "32px",
  position: "relative",
  background: "rgba(255, 255, 255, 0.7)",
}));

const JWTRoot = styled(JustifyBox)(() => ({
  // backgroundImage: `url(https://www.xmple.com/wallpaper/purple-gradient-blue-linear-1920x1080-c2-87cefa-da70d6-a-195-f-14.svg)`,
  backgroundImage: `url(https://content.jdmagicbox.com/comp/gorakhpur/k3/9999px551.x551.180714220004.i4k3/catalogue/colourable-compilation-opc-pvt-ltd--gorakhpur-online-examination-centres-0rvmibxd0h.jpg)`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  overflow: "auto",
  height: "100% !important",
  width: "100% !important",
}));

// inital login credentials
const initialValues = {
  email: "amin@gmail.com",
  password: "amin12",
  remember: true,
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be 6 character length")
    .required("Password is required!"),
  email: Yup.string()
    .email("Invalid Email address")
    .required("Email is required!"),
});

const JwtLogin = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      navigate("/");
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <>
      <JWTRoot>
        <div className="loginPage">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-5 col-xl-4 contentBox">
              <ContentBox className="d-flex flex-column w-100 align-items-center justify-content-center">
                <div className="d-flex mb-5 align-items-center">
                  <img
                    src={
                      "https://iqra.edu.pk/wp-content/uploads/2021/03/favicon-1.png"
                    }
                    alt="Loading..."
                  />
                  <h5 className="mx-3 logoText m-0">
                    <b>IU - Online</b> <br />
                    Examination System
                  </h5>
                </div>
                <Formik
                  onSubmit={handleFormSubmit}
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <TextField
                        fullWidth
                        size="small"
                        type="email"
                        name="email"
                        label="Email"
                        variant="outlined"
                        onBlur={handleBlur}
                        value={values.email}
                        onChange={handleChange}
                        helperText={touched.email && errors.email}
                        error={Boolean(errors.email && touched.email)}
                        sx={{ mb: 3 }}
                      />

                      <TextField
                        fullWidth
                        size="small"
                        name="password"
                        type="password"
                        label="Password"
                        variant="outlined"
                        onBlur={handleBlur}
                        value={values.password}
                        onChange={handleChange}
                        helperText={touched.password && errors.password}
                        error={Boolean(errors.password && touched.password)}
                        sx={{ mb: 1.5 }}
                      />

                      <FlexBox justifyContent="space-between">
                        <FlexBox gap={1}>
                          <Checkbox
                            size="small"
                            name="remember"
                            onChange={handleChange}
                            checked={values.remember}
                            sx={{ padding: 0 }}
                          />

                          <Paragraph>Remember Me</Paragraph>
                        </FlexBox>

                        <NavLink to="/session/forgot-password">
                          Forgot password?
                        </NavLink>
                      </FlexBox>

                      <LoadingButton
                        type="submit"
                        color="primary"
                        loading={loading}
                        variant="contained"
                        sx={{ my: 2 }}
                        className="w-100"
                      >
                        Login
                      </LoadingButton>

                      <Paragraph className={"d-flex justify-content-center"}>
                        Don't have an account?
                        <NavLink
                          to="/session/signup"
                          style={{ color: "red", marginLeft: 5 }}
                        >
                          Register
                        </NavLink>
                      </Paragraph>
                    </form>
                  )}
                </Formik>
              </ContentBox>
            </div>
            <div className="col-12 col-md-6 col-lg-7 col-xl-8 align-self-end">
              <h1 className="loginHeading">
                <span>Welcome to the</span> <br />
                Iqra University <br /> Onine Examination System
              </h1>
            </div>
          </div>
        </div>
      </JWTRoot>
    </>
  );
};

export default JwtLogin;
