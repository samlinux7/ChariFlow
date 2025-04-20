import React, { useState } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import '../index.css';

function SignUpPage() {
  const [formData, setFormData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showOtherCityInput, setShowOtherCityInput] = useState(false);

  // Major cities in Pakistan
  const pakistanCities = [
    "Islamabad",
    "Karachi",
    "Lahore",
    "Peshawar",
    "Quetta",
    "Sukkur",
    "Khairpur",
    "Faisalabad",
    "Rawalpindi",
    "Multan",
    "Hyderabad",
    "Gujranwala",
    "Other (Please specify)"
  ];

  const formik = useFormik({
    initialValues: {
      Name: "",
      Email: "",
      Contact: "",
      Password: "",
      City: "",
      OtherCity: "",
    },    
    validationSchema: yup.object({
      Name: yup.string()
        .min(3, "Minimum length should be 3")
        .required("Name is required"),
      Email: yup.string()
        .email("Enter valid email address")
        .required("Email is required"),
      Contact: yup.string()
        .length(11, "Contact number should be 11 digits")
        .required("Contact number is required"),
      Password: yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      City: yup.string()
        .required("Please select your city"),
      OtherCity: yup.string()
        .when('City', {
          is: "Other (Please specify)",
          then: yup.string().required("Please specify your city"),
          otherwise: yup.string().notRequired()
        }),
    }),
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormData([...formData, values]);
      resetForm();
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setShowOtherCityInput(false);
      setTimeout(() => setSubmitSuccess(false), 3000);
    },
  });

  // Handle city selection change
  const handleCityChange = (e) => {
    formik.handleChange(e);
    setShowOtherCityInput(e.target.value === "Other (Please specify)");
  };

  return (
    <div className="donation-signup-container">
      <div className="donation-signup-header">
        <div className="charify-logo">
          <h1>Charify</h1>
          <p className="tagline">Lets MAke A difference in someone life Across Pakistan</p>
        </div>
        <h2>Join Our Cause</h2>
        <p className="donation-subtitle">Create your account to make a difference in your community</p>
      </div>
      
      <form onSubmit={formik.handleSubmit} className="donation-signup-form">
        <div className="form-group">
          <label htmlFor="Name">Full Name</label>
          <input 
            type="text" 
            id="Name"
            name="Name" 
            onChange={formik.handleChange} 
            value={formik.values.Name} 
            onBlur={formik.handleBlur}
            className={formik.touched.Name && formik.errors.Name ? "error-input" : ""}
            placeholder="Enter your full name"
          />
          {formik.touched.Name && formik.errors.Name ? (
            <div className="error-message">
              <span className="error-icon">!</span> {formik.errors.Name}
            </div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="Email">Email Address</label>
          <input 
            type="email" 
            id="Email"
            name="Email" 
            onChange={formik.handleChange} 
            value={formik.values.Email} 
            onBlur={formik.handleBlur}
            className={formik.touched.Email && formik.errors.Email ? "error-input" : ""}
            placeholder="your@email.com"
          />
          {formik.touched.Email && formik.errors.Email ? (
            <div className="error-message">
              <span className="error-icon">!</span> {formik.errors.Email}
            </div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="Contact">Phone Number</label>
          <input 
            type="text" 
            id="Contact"
            name="Contact" 
            onChange={formik.handleChange} 
            value={formik.values.Contact} 
            onBlur={formik.handleBlur}
            className={formik.touched.Contact && formik.errors.Contact ? "error-input" : ""}
            placeholder="03XXXXXXXXX (11 digits)"
          />
          {formik.touched.Contact && formik.errors.Contact ? (
            <div className="error-message">
              <span className="error-icon">!</span> {formik.errors.Contact}
            </div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="Password">Create Password</label>
          <input 
            type="password" 
            id="Password"
            name="Password" 
            onChange={formik.handleChange} 
            value={formik.values.Password} 
            onBlur={formik.handleBlur}
            className={formik.touched.Password && formik.errors.Password ? "error-input" : ""}
            placeholder="At least 8 characters"
          />
          {formik.touched.Password && formik.errors.Password ? (
            <div className="error-message">
              <span className="error-icon">!</span> {formik.errors.Password}
            </div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="City">City</label>
          <select
            id="City"
            name="City"
            onChange={handleCityChange}
            onBlur={formik.handleBlur}
            value={formik.values.City}
            className={formik.touched.City && formik.errors.City ? "error-input" : ""}
          >
            <option value="">Select your city</option>
            {pakistanCities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
          {formik.touched.City && formik.errors.City ? (
            <div className="error-message">
              <span className="error-icon">!</span> {formik.errors.City}
            </div>
          ) : null}
        </div>

        {showOtherCityInput && (
          <div className="form-group">
            <label htmlFor="OtherCity">Specify Your City</label>
            <input 
              type="text" 
              id="OtherCity"
              name="OtherCity" 
              onChange={formik.handleChange} 
              value={formik.values.OtherCity} 
              onBlur={formik.handleBlur}
              className={formik.touched.OtherCity && formik.errors.OtherCity ? "error-input" : ""}
              placeholder="Enter your city name"
            />
            {formik.touched.OtherCity && formik.errors.OtherCity ? (
              <div className="error-message">
                <span className="error-icon">!</span> {formik.errors.OtherCity}
              </div>
            ) : null}
          </div>
        )}

        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="spinner"></span>
          ) : (
            "Create Account & Join Charify"
          )}
        </button>

        {submitSuccess && (
          <div className="success-message">
            <span className="success-icon">✓</span> Thank you for joining Charify!
          </div>
        )}

        <p className="form-footer">
          Already have an account? <a href="/login" className="login-link">Log in</a>
        </p>
      </form>
    </div>
  );
}

export default SignUpPage;