import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const userCheckingScheme = z.object({
    name: z
      .string()

      .refine((value) => /^[A-Za-zÀ-ÖØ-öø-ÿ'-]{2,30}$/.test(value), {
        message:
          "Name should be in string format should not contain any number",
      }),
    surname: z
      .string()

      .refine((value) => /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,50}$/.test(value), {
        message:
          "Surname should be in string format should not contain any number",
      }),

    email: z
      .string()
      .refine(
        (value) =>
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
        { message: "Email qiymatlari Xato kiritilgan" }
      ),
    password: z
      .string()
      .min(5, "Minimum Value is 5")
      .max(20, "Maximum value is 20")
      .refine(
        (value) =>
          /^(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*\d{0,3})[A-Za-z\d@$!%*?&]{5,20}$/.test(
            value
          ),
        {
          message:
            "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.",
        }
      ),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userCheckingScheme),
  });

  const submit = ({ surname, name, email, password }) => {
    axios
      .post("https://67aec39a9e85da2f020e488f.mockapi.io/user_Info", {
        Fisrt_Name: name,
        Last_Name: surname,
        Password: password,
        Country: "",
        Town_city: "",
        State_Address: "",
        Extra_Adress: "",
        Your_State: "",
        Email_Adress: email,
        Zip: "",
        Phone_number: "",
      })
      .then(({ data }) => localStorage.setItem("user", JSON.stringify(data)));
    toast.success("Registered Successfully");
    navigate("/");
  };
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <form onSubmit={handleSubmit(submit)} className="w-[50%] mx-auto">
        <h1 className="text-2xl pb-10">Register Page</h1>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 ">
            Your Name
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5     "
            placeholder="Your Name"
          />
          {errors.name && (
            <p className="text-[10px] mt-2 text-red-600   rounded-md">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="surname"
            className="block mb-2 text-sm font-medium text-gray-900 ">
            Your surname
          </label>
          <input
            {...register("surname")}
            type="text"
            id="surname"
            className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5     "
            placeholder="Your surname"
          />
          {errors.name && (
            <p className="text-[10px] mt-2 text-red-600   rounded-md">
              {errors.surname.message}
            </p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 ">
            Your Email
          </label>

          <input
            {...register("email")}
            type="text"
            id="email"
            className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5     "
            placeholder="Your Email"
          />
          {errors.email && (
            <p className="text-[10px] mt-2 text-red-600   rounded-md">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 ">
            Your password
          </label>

          <input
            {...register("password")}
            type="password"
            placeholder="* * * * *"
            id="password"
            className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5     "
          />
          {errors.password && (
            <p className="text-[10px] mt-2 text-red-600  rounded-md">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-[100%] text-white bg-[#f56e1e] hover:bg-[#f56d1ec7]   font-medium rounded-lg text-sm   px-5 py-2.5 text-center ">
          Register
        </button>
        <span className="flex items-center gap-2 mt-3">
          <p>If you registered already</p>
          <Link to={"/"} className="underline text-[#f56e1e]">
            Click here
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
