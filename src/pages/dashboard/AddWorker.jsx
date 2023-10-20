import React, { useState } from "react";
import {
  Container,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import axios from "axios";

const initialValues = {
  idNumber: "",
  uidNumber: "",
  fullName: "",
  class: "",
  domain: "",
  order: "",
  startWorkingDate: "",
  administrativeStatus: "",
  phoneNumber: "",
};

const validationSchema = Yup.object({
  idNumber: Yup.string().required("الرقم التعريفي مطلوب"),
  uidNumber: Yup.string().required("رقم الهوية مطلوب"),
  fullName: Yup.string().required("الاسم الكامل مطلوب"),
  class: Yup.string().required("الصف مطلوب"),
  domain: Yup.string().required("المجال مطلوب"),
  order: Yup.string().required("الترتيب مطلوب"),
  startWorkingDate: Yup.date().required("تاريخ بدء العمل مطلوب"),
  administrativeStatus: Yup.string().required("الوضع الإداري مطلوب"),
  phoneNumber: Yup.string().required("رقم الهاتف مطلوب"),
});

const AddWorker = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const token = localStorage.getItem("id-token");
    axios
      .post(`https://isetsbz.azurewebsites.net/worker`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(_ => {
        // Successful submission
        setSnackbarSeverity("success");
        setSnackbarMessage("تمت إضافة العامل بنجاح");
        setOpenSnackbar(true);
        resetForm();
      })
      .catch(_ => {
        // Error during submission
        setSnackbarSeverity("error");
        setSnackbarMessage(
          "حدث خطأ أثناء إضافة العامل. يرجى المحاولة مرة أخرى.",
        );
        setOpenSnackbar(true);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(true)}
      >
        <Alert severity={snackbarSeverity}>{snackbarMessage}</Alert>
      </Snackbar>
      <Container>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, errors, touched }) => {
            return (
              <Form>
                <Stack gap={1} mt={2}>
                  <Field
                    as={TextField}
                    name="idNumber"
                    label="رقم بطاقة التعريف"
                    error={errors.idNumber && touched.idNumber}
                    helperText={<ErrorMessage name="idNumber" />}
                  />

                  <Field
                    as={TextField}
                    name="uidNumber"
                    label="المعرف الوحيد"
                    error={errors.uidNumber && touched.uidNumber}
                    helperText={<ErrorMessage name="uidNumber" />}
                  />

                  <Field
                    as={TextField}
                    name="fullName"
                    label="الاسم الكامل"
                    error={errors.fullName && touched.fullName}
                    helperText={<ErrorMessage name="fullName" />}
                  />

                  <Field
                    as={TextField}
                    name="class"
                    label="القسم"
                    error={errors.class && touched.class}
                    helperText={<ErrorMessage name="class" />}
                  />

                  <Field
                    as={TextField}
                    name="domain"
                    label="الاختصاص"
                    error={errors.domain && touched.domain}
                    helperText={<ErrorMessage name="domain" />}
                  />

                  <Field
                    as={TextField}
                    name="order"
                    label="الرتبة"
                    error={errors.order && touched.order}
                    helperText={<ErrorMessage name="order" />}
                  />

                  <Field
                    as={TextField}
                    type="date"
                    name="startWorkingDate"
                    label="تاريخ  المباشرة"
                    error={errors.startWorkingDate && touched.startWorkingDate}
                    helperText={<ErrorMessage name="startWorkingDate" />}
                  />

                  <FormControl>
                    <InputLabel>الوضع الإداري</InputLabel>
                    <Field as={Select} name="administrativeStatus">
                      <MenuItem value="موظف">موظف</MenuItem>
                      <MenuItem value="متدرب">متدرب</MenuItem>
                    </Field>
                    {errors.administrativeStatus &&
                      touched.administrativeStatus && (
                        <div className="error-message">
                          <ErrorMessage name="administrativeStatus" />
                        </div>
                      )}
                  </FormControl>

                  <Field
                    as={TextField}
                    name="phoneNumber"
                    label="رقم الهاتف"
                    error={errors.phoneNumber && touched.phoneNumber}
                    helperText={<ErrorMessage name="phoneNumber" />}
                  />

                  <LoadingButton
                    type="submit"
                    variant="contained"
                    style={{ textTransform: "capitalize", padding: 8 }}
                    size="medium"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    إرسال
                  </LoadingButton>
                </Stack>
              </Form>
            );
          }}
        </Formik>
      </Container>
    </>
  );
};

export default AddWorker;
