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
        <Link href="/">
          {/* <h1 className="font-black text-xl">TODO</h1> */}
          <Image
            src="/todo_logo.png"
            alt="todo logo"
            width={150}
            height={100}
          />
        </Link>
        <div className="flex gap-5">
          {!user && !loading && (
            <div className="flex gap-5">
              {guestLinks.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          )}
          {user && (
            <div className="flex gap-5">
              <p>
                Name: <span className="capitalize font-bold">{user.name}</span>
              </p>

              {user && <LogoutButton />}
            </div>
          )}
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
