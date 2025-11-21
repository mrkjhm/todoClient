"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useUser } from "@/src/context/UserContext";

interface UserItem {
  id: number;
  name: string;
  email: string;
}

const Page = () => {
  const { user, checkingAuth } = useUser();
  const [users, setUsers] = useState<UserItem[]>([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // 🔥 Stable function using useCallback

  return (
    <div>
      <h1>All Users</h1>
      {users.map((item) => (
        <div key={item.id}>
          console.log(users)
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Page;
