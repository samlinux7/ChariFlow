import React, { useState } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import '../index.css';

function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },   
    validationSchema: yup.object({
      email: yup.string()
        .email("Enter valid email address")
        .required("Email is required"),
      password: yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSubmitSuccess(true);
        resetForm();
      } catch (error) {
        console.error("Login error:", error);
      } finally {
        setIsSubmitting(false);
        setTimeout(() => setSubmitSuccess(false), 3000);
      }
    },
  });

  return (
    <div className="donation-signup-container">
      <div className="donation-signup-header">
        <div className="charify-logo">
          <h1>Charify</h1>
          <p className="tagline">Let's Make A Difference in Someone's Life Across Pakistan</p>
        </div>
        <h2>Welcome Back</h2>
        <p className="donation-subtitle">Login to your account to make a difference in your community</p>
      </div>
      
      <form onSubmit={formik.handleSubmit} className="donation-signup-form">
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input 
            type="email" 
            id="email"
            name="email" 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={formik.touched.email && formik.errors.email ? "error-input" : ""}
            placeholder="your@email.com"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error-message">
              <span className="error-icon">!</span> {formik.errors.email}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password"
            name="password" 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className={formik.touched.password && formik.errors.password ? "error-input" : ""}
            placeholder="At least 8 characters"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="error-message">
              <span className="error-icon">!</span> {formik.errors.password}
            </div>
          )}
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="spinner"></span>
          ) : (
            "Login"
          )}
        </button>

        {submitSuccess && (
          <div className="success-message">
            <span className="success-icon">✓</span> Login successful!
          </div>
        )}

        <p className="form-footer">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;