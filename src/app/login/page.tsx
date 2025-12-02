"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LoginButton from "@/src/components/ui/LoginButton";
import { useUser } from "@/src/context/UserContext";
import toast from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const { setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleLogin = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Invalid login");
        return;
      }

      if (!data.user) {
        setError(data.message);
        return;
      }
      setUser(data.user);

      toast.success("Login successful!");

      router.push("/");
    } catch (error) {
      console.error("Login error", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen">
      <div className="absolute top-10 border p-5 rounded-md w-100 text-center text-gray-500">
        <p className="text-sm uppercase mb-2">Account for testing:</p>
        <p>Email: user@mail.com</p>
        <p>Password: password</p>
      </div>
      <div className="w-100">
        <h1 className="text-bold text-xl mb-4">Login Page</h1>
        <div className="flex flex-col gap-2 mb-2">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded-md"
          />

          {/* Password input with eye icon */}
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

        {error && <p className="text-sm text-red-500 py-2">{error}</p>}
        <div>
          <LoginButton onClick={handleLogin} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
