import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LabelledInput from "../LabelledInput";
import { api } from "../../utils/api";
import { SignupType } from "@blog-web/types/client";

export const Auth = () => {
  // taking user data & update them
  const [signupInput, setSignupInput] = useState<SignupType>({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  //navigate to other page
  const navigate = useNavigate();

  const sendRequest = async () => {
    try {
      // send user data to server
      const response = await api.post(
        `/auth/signup`,
        signupInput
      );
      const jwt = response.data.token;

      //store response into local storage
      localStorage.setItem("token", jwt);
      localStorage.setItem("username", signupInput.username);

      //navigate to blogs route
      navigate("/blogs");
    } catch (err) {
      alert("Invalid inputs");
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center">
      <div className="flex justify-center ">
        <div className="">
          <div className="text-3xl font-bold pb-5">Create an Account</div>
          <LabelledInput
            label="Name"
            placeholder="Arghya Das"
            onChange={(e: { target: { value: any; }; }) => {
              setSignupInput({
                ...signupInput,
                name: e.target.value,
              });
            }}
          />
          <LabelledInput
            label="Email"
            placeholder="blog.web@dev.com"
            onChange={(e: { target: { value: any; }; }) => {
              setSignupInput({
                ...signupInput,
                email: e.target.value,
              });
            }}
          />
          <LabelledInput
            label="Username"
            placeholder="blog01web"
            onChange={(e: { target: { value: any; }; }) => {
              setSignupInput({
                ...signupInput,
                username: e.target.value,
              });
            }}
          />
          <LabelledInput
            type="password"
            label="Password"
            placeholder="Axbcy!Z@2134"
            onChange={(e: { target: { value: any; }; }) => {
              setSignupInput({
                ...signupInput,
                password: e.target.value,
              });
            }}
          />

          <button
            onClick={sendRequest}
            type="button"
            className="w-full text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Sign Up
          </button>

          <div className="text-state-200 pt-4">
            Already have an Account?
            <Link to={"/signin"} className="pl-2 underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
