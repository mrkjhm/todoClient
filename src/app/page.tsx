"use client";

import Todo from "../components/Todo";
import { useUser } from "../context/UserContext";
import Link from "next/link";

export default function Home() {
  const { user, checkingAuth, loading } = useUser();

  if (loading || checkingAuth) return null;

  if (!user) {
    return (
      <section className="flex flex-col items-center justify-center min-h-[70vh] px-5">
        <p className="text-gray-400 mb-4 text-lg">
          Your session has expired or you have been logged out.
        </p>

        <Link
          href="/login"
          className="px-4 py-2  bg-linear-to-r from-[#22fff1] to-[#b9ffb3] text-black rounded-md w-[300px] text-center"
        >
          Login again
        </Link>
      </section>
    );
  }

  return (
    <section className="flex justify-center mt-20 px-5">
      <Todo />
    </section>
  );
}
