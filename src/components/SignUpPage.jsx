import React, { useState } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import "../index.css";


function SignUpPage() {
  const [formdata, setFormData] = useState([]);

  const formik = useFormik({
    initialValues: {
      Name: "",
      Email: "",
      Contact: "",
    },
    validationSchema: yup.object({
      Name: yup.string().min(3, "Minimum length should be 3").required("Name can not be empty"),
      Email: yup.string().email("Enter valid Email").required("Can not be empty"),
      Contact: yup.string().length(11, "Contact number should be size of 11").required("Number is Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      setFormData([...formdata, values]);
      resetForm();
    }
  });

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={formik.handleSubmit} className="signup-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type='text'
            name='Name'
            onChange={formik.handleChange}
            value={formik.values.Name}
            onBlur={formik.handleBlur}
          />
          {formik.touched.Name && formik.errors.Name && <div className="error">{formik.errors.Name}</div>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type='email'
            name='Email'
            onChange={formik.handleChange}
            value={formik.values.Email}
            onBlur={formik.handleBlur}
          />
          {formik.touched.Email && formik.errors.Email && <div className="error">{formik.errors.Email}</div>}
        </div>

        <div className="form-group">
          <label>Contact</label>
          <input
            type='text'
            name='Contact'
            onChange={formik.handleChange}
            value={formik.values.Contact}
            onBlur={formik.handleBlur}
          />
          {formik.touched.Contact && formik.errors.Contact && <div className="error">{formik.errors.Contact}</div>}
        </div>

        <button type='submit' className="submit-btn">Submit</button>
      </form>

      {formdata.length > 0 && (
        <div className="submitted-data">
          <h3>Submitted Data</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {formdata.map((data, index) => (
                <tr key={index}>
                  <td>{data.Name}</td>
                  <td>{data.Email}</td>
                  <td>{data.Contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SignUpPage;
