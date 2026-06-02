import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import CommonForm from "../../components/common/form";
import { signupFormControls } from "../../config/index";
import { useDispatch } from "react-redux";
import { signupUser } from "../../store/auth-slice";
import { toast } from "@/components/ui";

const AuthSignup = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    dispatch(signupUser(formData)).then((data) => {
      if (data.payload) {
        toast.success("Account created successfully.");
        navigate("/auth/login");
      } else {
        toast.error("User already exists.");
      }
    });
    console.log(formData);
  }
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="font-title text-3xl text-foreground font-bold tracking-tight">
          Create new Account
        </h1>
      </div>
      <CommonForm
        formData={formData}
        setFormData={setFormData}
        formControls={signupFormControls}
        buttonText={"Sign Up"}
        onSubmit={onSubmit}
      />
      <div className="text-center">
        <p className="mt-2">
          Already have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthSignup;
