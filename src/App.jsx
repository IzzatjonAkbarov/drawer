import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import tick from "./assets/tick.svg";
import xbar from "./assets/xbar.svg";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import user from "./assets/user.svg";
export default function App() {
  let userData = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [isSubmitted, setIsSubmitted] = React.useState(false); // Track form submission
  React.useEffect(() => {
    axios
      .get("https://67aec39a9e85da2f020e488f.mockapi.io/user_Info")
      .then(({ data }) => setData(data))
      .catch((error) => {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data. Please try again later.");
      });
  }, []);
  const loginScheme = z.object({
    email: z
      .string()
      .refine(
        (value) =>
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
        { message: "Email qiymatlari Xato kiritilgan" }
      ),
    password: z
      .string()
      .min(3, "Incorrect password")
      .refine((password) => /[A-Z]/.test(password), {
        message: "Password must contain at least one uppercase letter",
      }),
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginScheme) });

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
    setIsSubmitted(false); // Reset submission state when drawer is opened/closed
  };

  const handleFormClick = (event) => {
    event.stopPropagation();
  };
  const resettingTheValue = (e) => {
    reset({ password: "" });
  };

  const resettingTheEmail = (e) => {
    reset({ email: "" });
  };
  console.log(data);

  const submit = ({ email, password }) => {
    console.log(data);
    setIsSubmitted(true);

    const user = data.find(
      (value) => value.Email_Adress === email && value.Password === password
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login successful!");

      setTimeout(() => {}, 2000);
      toggleDrawer(true);

      reset();
    } else {
      toast.error("Email or password is incorrect.");
    }
  };

  const DrawerList = (
    <Box sx={{ width: 500 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <div
          onClick={handleFormClick}
          className="m-auto p-5 h-[98vh] flex flex-col justify-between">
          <form
            onSubmit={handleSubmit(submit)}
            className="space-y-4 md:space-y-6"
            action="#">
            <h1 className="text-[#4e4b66] text-[28px] font-bold py-5 text-center">
              Вход или регистрация
            </h1>
            <div className="relative">
              <input
                type="text"
                {...register("email")}
                name="email"
                id="email"
                className={`border ${
                  errors.email
                    ? "border-[#f00] text-[#f00] bg-[#ffe2e2]"
                    : "border-[#a0a3bc] text-[#a0a3bc] bg-gray-50"
                } rounded-lg block w-full outline-none p-2.5`}
                placeholder="Адрес эл. почты"
              />
              {(isSubmitted || errors.email) && (
                <button
                  onClick={resettingTheEmail}
                  className="absolute top-3.5 right-3">
                  {errors.email ? (
                    <img src={xbar} alt="Error" />
                  ) : (
                    <img src={tick} alt="Success" />
                  )}
                </button>
              )}
            </div>

            <div className="relative">
              <input
                type="password"
                {...register("password")}
                name="password"
                id="password"
                placeholder="Пароль"
                className={`border ${
                  errors.password
                    ? "border-[#f00] text-[#f00] bg-[#ffe2e2]"
                    : "border-[#a0a3bc] text-[#a0a3bc] bg-gray-50"
                } rounded-lg block w-full outline-none p-2.5`}
              />
              {(isSubmitted || errors.password) && ( // Show icon only after submission or if there's an error
                <button
                  onClick={resettingTheValue}
                  className="absolute top-3.5 right-3">
                  {errors.password ? (
                    <img src={xbar} alt="Error" />
                  ) : (
                    <img src={tick} alt="Success" />
                  )}
                </button>
              )}
            </div>

            <a className="text-end text-[12px] text-[#a0a3bc] flex items-center justify-end">
              Забыли пароль
            </a>
            <button
              type="submit"
              className="flex items-center mx-auto justify-center gap-2 font-medium rounded-2xl text-sm px-10 py-2.5 text-center bg-[#f56e1e] text-white">
              <svg
                width={29}
                height={28}
                viewBox="0 0 29 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.25 1.75H4.98038C5.50142 1.75001 6.00679 1.92106 6.41256 2.23477C6.81833 2.54847 7.10011 2.98595 7.21108 3.47456L7.94945 6.70422M7.94945 6.70422L9.20868 13.3894C9.49003 14.907 10.318 16.2815 11.5479 17.2727C12.7779 18.264 14.3316 18.809 15.9376 18.8125H19.0182C20.5723 18.8093 22.079 18.299 23.2909 17.3652C24.5028 16.4314 25.3477 15.1298 25.6869 13.6742L26.8524 8.72316C26.91 8.48217 26.9103 8.23184 26.8534 7.99071C26.7965 7.74959 26.6838 7.52383 26.5237 7.33016C26.3636 7.13649 26.1601 6.97987 25.9284 6.87189C25.6966 6.76391 25.4426 6.70733 25.185 6.70636L7.94945 6.70422Z"
                  stroke="#EDEDF4"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
                <path
                  d="M10.7814 26.2501C11.3049 26.2501 11.7293 25.8257 11.7293 25.3022C11.7293 24.7786 11.3049 24.3542 10.7814 24.3542C10.2579 24.3542 9.8335 24.7786 9.8335 25.3022C9.8335 25.8257 10.2579 26.2501 10.7814 26.2501Z"
                  stroke="#EDEDF4"
                  strokeWidth={2}
                />
                <path
                  d="M24.0519 26.2501C24.5754 26.2501 24.9998 25.8257 24.9998 25.3022C24.9998 24.7786 24.5754 24.3542 24.0519 24.3542C23.5284 24.3542 23.104 24.7786 23.104 25.3022C23.104 25.8257 23.5284 26.2501 24.0519 26.2501Z"
                  stroke="#EDEDF4"
                  strokeWidth={2}
                />
              </svg>
              <p>Войти</p>
            </button>
            <div>
              <Link to={"/register"} className="text-center py-5">
                Зарегистрироваться
              </Link>
            </div>
          </form>

          <div>
            <p className="text-[10px] text-[#a0a3bc] text-center">
              При входе и регистрации вы предоставляете Согласие на обработку
              персональных данных в соответствии с Политикой обработки
              персональных данных, а также соглашаетесь с
              <span className="text-[#f56e1e] underline">
                Политикой обработки персональных данных
              </span>
            </p>
          </div>
        </div>
      </List>
    </Box>
  );

  return (
    <div>
      <header className="bg-[#f56e1e] text-white">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          {/* Logo */}
          <div className="text-xl font-bold">
            <a href="/" className="hover:text-gray-200">
              MyLogo
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-gray-200">
              Home
            </a>
            <a href="#" className="hover:text-gray-200">
              About
            </a>
            <a href="#" className="hover:text-gray-200">
              Services
            </a>
            <a href="#" className="hover:text-gray-200">
              Contact
            </a>
          </nav>

          {/* Action Button */}
          <div className="flex items-center gap-4">
            <Button
              className="!bg-white !text-[#f56e1e] !hover:bg-gray-100 !px-4 !py-2 !rounded"
              onClick={toggleDrawer(true)}>
              Login
            </Button>
            <Drawer
              anchor="right"
              className="h-screen"
              open={open}
              onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>

            {userData ? (
              <div className="flex items-center gap-1 flex-col">
                <img src={user} alt="" />
                <p className="text-white">{userData?.Fisrt_Name}</p>
              </div>
            ) : (
              ""
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button className="text-white hover:text-gray-200 focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
