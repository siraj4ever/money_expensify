import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Toast from "../../components/Toast";

function FomeikWithField() {
  const [toast, setToast] = useState();
  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setToast("Successfully Submit");
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Toast textToast={toast} />
            Email: <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
            <br />
            <br />
            Password: <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
            <br />
            <br />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default FomeikWithField;
