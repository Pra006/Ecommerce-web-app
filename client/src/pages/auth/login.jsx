import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import CommonForm from "../../components/common/form";
import { loginFormControls, signupFormControls } from "../../config/index";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/auth-slice";
import { toast } from "@/components/ui";

const AuthLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if (data.payload) {
        toast.success("Login successful.");
        // Navigate("/");
      } else {
        toast.error(data.error?.message || "Login failed. Please try again.");
      }
    });
  }
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="font-title text-3xl text-foreground font-bold tracking-tight">
          sign in to your account
        </h1>
      </div>
      <CommonForm
        formData={formData}
        setFormData={setFormData}
        formControls={loginFormControls}
        buttonText={"Login"}
        onSubmit={onSubmit}
      />
      <div className="text-center">
        <p className="mt-2">
          Already have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/signup"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthLogin;
