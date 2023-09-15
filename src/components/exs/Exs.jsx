import React from "react";
import { useCallback } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

export default function Exs() {
  const schema = yup.object().shape({
    firstName: yup.string().min(3).required(),
    lastName: yup.string().min(3).required(),
  });

  const handleOnSubmit = (values) => {
    const fullName = Object.keys(values)
      .map((key) => values[key])
      .join(" ");
    alert(`Hello ${fullName}!`);
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
    },
    validationSchema: schema,
    onSubmit: handleOnSubmit,
  });

  const setInputValue = useCallback(
    (key, value) =>
      formik.setValues({
        ...formik.values,
        [key]: value,
      }),
    [formik]
  );

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <input
          placeholder="Type your First Name"
          value={formik.values.firstName}
          onChange={(e) => setInputValue("firstName", e.target.value)}
        />
        <small>{formik.errors.firstName}</small>
        <input
          placeholder="Type your Last Name"
          value={formik.values.lastName}
          onChange={(e) => setInputValue("lastName", e.target.value)}
        />
        <small>{formik.errors.lastName}</small>
        {!!formik.errors.lastName && <br />}
        <button type="submit" disabled={!formik.isValid}>
          Submit
        </button>
      </form>
    </>
  );
}
