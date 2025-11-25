"use client";

import Link from "next/link";
import React from "react";
import Container from "./ui/Container";
import { useUser } from "../context/UserContext";
import LogoutButton from "./ui/LogoutButton";
import Image from "next/image";

interface NavItem {
  label: string;
  href: string;
}

const Navbar = () => {
  const { user, loading } = useUser();

  const guestLinks = [
    {
      label: "Login",
      href: "/login",
    },
    {
      label: "Register",
      href: "/register",
    },
  ];

  return (
    <nav className="border-b">
      <Container className="flex h-20 justify-between items-center">
        {/* LOGO */}
        <Link href="/">
          <Image
            src="/todo_logo.png"
            alt="todo logo"
            width={120}
            height={100}
          />
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex gap-5">
          {/* Default (before loading finished) */}
          {!user && (
            <div className="flex gap-5 opacity-100">
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </div>
          )}

          {/* After loading complete and authenticated */}
          {!loading && user && (
            <div className="flex gap-5">
              <p>
                Name: <span className="capitalize font-bold">{user.name}</span>
              </p>
              <LogoutButton />
            </div>
          )}
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;