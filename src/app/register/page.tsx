"use client";

import React, { useEffect, useState } from "react";
import RegisterButton from "@/src/components/ui/RegisterButton";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // register
  const handleRegister = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }
      toast.success("User successfully register");

      // setTimeout(() => {
      //   setSuccessMessage("");
      // }, 5000);

      setName("");
      setEmail("");
      setPassword("");

      return;
    } catch (error) {
      console.error("Error to Register", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-100">
        <h1 className="text-bold text-xl mb-4">Register Page</h1>
        <div className="flex flex-col gap-2 mb-2">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded-md"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded-md"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded-md w-full pr-10"
            />

            <i
              className={`ri-${
                showPassword ? "eye-off-fill" : "eye-fill"
              } absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer`}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>
        </div>
        {/* {error && <div className="text-sm text-red-500 py-2">{error}</div>} */}
        {successMessage && (
          <div className="text-sm text-green-500 py-2">{successMessage}</div>
        )}
        <div onClick={handleRegister}>
          <RegisterButton />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
