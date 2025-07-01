import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import "../index.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const [formData, setFormData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      Name: "",
      Email: "",
      Contact: "",
      Password: "",
      City: "",
    },
    validationSchema: yup.object({
      Name: yup
        .string()
        .min(3, "Minimum length should be 3")
        .required("Name is required"),
      Email: yup
        .string()
        .email("Enter valid email address")
        .required("Email is required"),
      Contact: yup
        .string()
        .length(11, "Contact number should be 11 digits")
        .required("Contact number is required"),
      Password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      City: yup.string().required("Please enter your city"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      try {
        // Prepare data for backend (note field name mapping)
        const userData = {
          name: values.Name,
          email: values.Email,
          phone: values.Contact,
          password: values.Password,
          city: values.City,
        };

        const response = await fetch("http://localhost:3000/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Signup failed");
        }

        // Success handling
        setFormData([...formData, values]);
        resetForm();
        setSubmitSuccess(true);
        setTimeout(() => setSubmitSuccess(false), 3000);
        navigate("/Login"); // Redirect to login page after successful signup
      } catch (error) {
        // Error handling
        alert(error.message || "An error occurred during signup");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-pink-100 py-8 px-2">
      <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-2xl p-8 border border-gray-100">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-4xl font-extrabold text-blue-600 tracking-tight mb-1">
            Charify
          </h1>
          <p className="text-sm text-gray-500 mb-2 italic">
            Let's Make a Difference in Someone's Life Across Pakistan
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mb-1 mt-2">
            Join Our Cause
          </h2>
          <p className="text-gray-500 text-center text-sm">
            Create your account to make a difference in your community
          </p>
        </div>
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="Name"
              className="block text-gray-700 font-medium mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="Name"
              name="Name"
              onChange={formik.handleChange}
              value={formik.values.Name}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                formik.touched.Name && formik.errors.Name
                  ? "border-red-400"
                  : "border-gray-300"
              }`}
              placeholder="Enter your full name"
              autoComplete="name"
            />
            {formik.touched.Name && formik.errors.Name && (
              <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <span className="font-bold">!</span> {formik.errors.Name}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="Email"
              className="block text-gray-700 font-medium mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="Email"
              name="Email"
              onChange={formik.handleChange}
              value={formik.values.Email}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                formik.touched.Email && formik.errors.Email
                  ? "border-red-400"
                  : "border-gray-300"
              }`}
              placeholder="your@email.com"
              autoComplete="email"
            />
            {formik.touched.Email && formik.errors.Email && (
              <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <span className="font-bold">!</span> {formik.errors.Email}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="Contact"
              className="block text-gray-700 font-medium mb-1"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="Contact"
              name="Contact"
              onChange={formik.handleChange}
              value={formik.values.Contact}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                formik.touched.Contact && formik.errors.Contact
                  ? "border-red-400"
                  : "border-gray-300"
              }`}
              placeholder="03XXXXXXXXX (11 digits)"
              autoComplete="tel"
            />
            {formik.touched.Contact && formik.errors.Contact && (
              <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <span className="font-bold">!</span> {formik.errors.Contact}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="Password"
              className="block text-gray-700 font-medium mb-1"
            >
              Create Password
            </label>
            <input
              type="password"
              id="Password"
              name="Password"
              onChange={formik.handleChange}
              value={formik.values.Password}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                formik.touched.Password && formik.errors.Password
                  ? "border-red-400"
                  : "border-gray-300"
              }`}
              placeholder="At least 8 characters"
              autoComplete="new-password"
            />
            {formik.touched.Password && formik.errors.Password && (
              <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <span className="font-bold">!</span> {formik.errors.Password}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="City"
              className="block text-gray-700 font-medium mb-1"
            >
              City
            </label>
            <input
              type="text"
              id="City"
              name="City"
              onChange={formik.handleChange}
              value={formik.values.City}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                formik.touched.City && formik.errors.City
                  ? "border-red-400"
                  : "border-gray-300"
              }`}
              placeholder="Enter your city name"
              autoComplete="address-level2"
            />
            {formik.touched.City && formik.errors.City && (
              <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <span className="font-bold">!</span> {formik.errors.City}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2.5 mt-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg shadow-md transition disabled:opacity-60 flex items-center justify-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-blue-500 rounded-full inline-block"></span>
            ) : (
              "Create Account & Join Charify"
            )}
          </button>

          {submitSuccess && (
            <div className="flex items-center justify-center mt-3 text-green-600 text-sm font-medium gap-1">
              <span className="text-lg">✓</span> Thank you for joining Charify!
            </div>
          )}

          <p className="text-center text-gray-500 text-sm mt-4">
            Already have an account?{" "}
            <Link
              to="/Login"
              className="text-blue-600 hover:underline font-semibold"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
