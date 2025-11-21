"use client";

import React from "react";

const LoginButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div>
      <button
        className=" bg-linear-to-r from-[#22fff1] to-[#b9ffb3] text-black w-full p-2 rounded-md"
        onClick={onClick}
        type="button"
      >
        Login
      </button>
    </div>
  );
};

export default LoginButton;
