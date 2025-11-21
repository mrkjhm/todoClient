"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@/src/context/UserContext";

const LogoutButton = () => {
  const router = useRouter();
  const { logout } = useUser();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <button onClick={handleLogout}>
      <p>Logout</p>
    </button>
  );
};

export default LogoutButton;
