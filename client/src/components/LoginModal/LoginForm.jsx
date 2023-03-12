import React from 'react'
import { useFormik } from 'formik';

const LoginForm = (props) => {
    const { submitButtonText, submitButtonAction } = props;
  
    const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      onSubmit: values => submitButtonAction(values)
    });
    return (
      <form onSubmit={formik.handleSubmit} className="center">
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
  
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
  
        <button type="submit">{submitButtonText}</button>
      </form>
    );
  };

export default LoginForm