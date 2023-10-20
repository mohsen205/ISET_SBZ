import React, { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import BoxCentered from "../../components/utils/BoxCentered";
import { loginAdmin } from "../../store/actions/authActions";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("يجب أن يكون البريد الإلكتروني صالح")
    .required("البريد الإلكتروني مطلوب"),
  password: Yup.string().required("كلمة المرور مطلوبة"),
});

const Login = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(
        loginAdmin({
          adminEmail: values.email,
          adminPassword: values.password,
        }),
      ).unwrap();
      setSubmitting(false);
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(
        "الرجاء التحقق من عنوان البريد الإلكتروني وكلمة المرور الخاصة بك.",
      );
      setOpenSnackbar(true);
      setSubmitting(false);
    }
  };

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        setOpen={() => setOpenSnackbar(true)}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
      <BoxCentered height="100vh">
        <Box
          sx={{
            minWidth: "300px",
          }}
        >
          <Typography variant="h5" color="initial" textAlign="center">
            دخوال
          </Typography>
          <Box>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {({ isSubmitting, errors, touched }) => {
                return (
                  <Form>
                    <Stack gap={1} mt={4}>
                      <Field
                        error={errors.email && touched.email}
                        as={TextField}
                        type="email"
                        name="email"
                        variant="outlined"
                        placeholder="عنوان البريد الإلكتروني"
                        label="عنوان البريد الإلكتروني"
                        helperText={errors.email}
                      />

                      <Field
                        error={errors.password && touched.password}
                        as={TextField}
                        type="password"
                        name="password"
                        placeholder="كلمة المرور"
                        variant="outlined"
                        label="كلمة المرور"
                        helperText={errors.password}
                      />
                      <LoadingButton
                        type="submit"
                        variant="contained"
                        style={{ textTransform: "capitalize", padding: 8 }}
                        size="medium"
                        loading={isSubmitting}
                        disabled={isSubmitting}
                      >
                        تسجيل الدخول
                      </LoadingButton>
                    </Stack>
                  </Form>
                );
              }}
            </Formik>
          </Box>
        </Box>
      </BoxCentered>
    </>
  );
};

export default Login;
