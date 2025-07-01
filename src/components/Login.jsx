import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Enter valid email address")
        .required("Email is required"),
      password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      setErrorMessage(""); // Clear previous errors

      try {
        const response = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Login failed");
        }

        // Store the token (you might want to use more secure storage in production)
        login({ token: data.token, userId: data.userId });

        setSubmitSuccess(true);
        resetForm();

        navigate("/home");
      } catch (error) {
        console.error("Login error:", error);
        setErrorMessage(error.message || "Invalid email or password");
      } finally {
        setIsSubmitting(false);
        setTimeout(() => {
          setSubmitSuccess(false);
          setErrorMessage("");
        }, 3000);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-indigo-600 mb-2">
            Charify
          </h1>
          <p className="text-gray-500 mb-2 text-lg font-medium">
            Let's Make A Difference in Someone's Life Across Pakistan
          </p>
          <h2 className="text-2xl font-bold mb-1">Welcome Back</h2>
          <p className="text-gray-600">
            Login to your account to make a difference in your community
          </p>
        </div>
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="your@email.com"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-600 text-sm mt-1 flex items-center gap-1">
                <span className="font-bold">!</span> {formik.errors.email}
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="At least 8 characters"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-600 text-sm mt-1 flex items-center gap-1">
                <span className="font-bold">!</span> {formik.errors.password}
              </div>
            )}
          </div>
          {errorMessage && (
            <div className="text-red-600 text-sm flex items-center gap-1">
              <span className="font-bold">!</span> {errorMessage}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg shadow transition disabled:opacity-60"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-indigo-600 rounded-full"></span>
            ) : (
              "Login"
            )}
          </button>
          {submitSuccess && (
            <div className="text-green-600 text-center font-semibold flex items-center justify-center gap-1">
              <span className="font-bold">✓</span> Login successful!
            </div>
          )}
          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-indigo-600 hover:underline">
              Sign up
            </Link>
          </p>
          <button
            type="button"
            className="mt-2 w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition"
            onClick={() => navigate("/admin")}
          >
            Admin Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
