// UpdateWorker.js

import React, { useState, useEffect } from "react";
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
import { useParams } from "react-router-dom";

const initialValues = {
  idNumber: "",
  uidNumber: "",
  fullName: "",
  class: "",
  domain: "",
  order: "",
  startWorkingDate: "", // Initialize with an empty string
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

const formatDate = date => {
  date = new Date(date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const UpdateWorker = () => {
  const { id } = useParams(); // Get the worker ID from the URL
  const [formValues, setFormValues] = useState(initialValues);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    // Fetch worker data by ID and set the initial values
    const token = localStorage.getItem("id-token");

    axios
      .get(`https://isetsbz.azurewebsites.net/worker/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        const workerData = response.data;
        // Format the date here before setting it in the form
        const formattedDate = formatDate(workerData.startWorkingDate);
        setFormValues({ ...workerData, startWorkingDate: formattedDate });
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  const onSubmit = (values, { setSubmitting }) => {
    const token = localStorage.getItem("id-token");

    axios
      .put(`https://isetsbz.azurewebsites.net/worker/${id}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        // Successful update
        setSnackbarSeverity("success");
        setSnackbarMessage("تم تحديث العامل بنجاح");
        setOpenSnackbar(true);
      })
      .catch(() => {
        // Error during update
        setSnackbarSeverity("error");
        setSnackbarMessage(
          "حدث خطأ أثناء تحديث العامل. يرجى المحاولة مرة أخرى.",
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
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity={snackbarSeverity}>{snackbarMessage}</Alert>
      </Snackbar>
      <Container>
        <Formik
          initialValues={formValues || initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
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

export default UpdateWorker;
