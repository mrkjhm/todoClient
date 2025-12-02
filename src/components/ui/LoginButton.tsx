"use client";

import React from "react";

const LoginButton = ({
  onClick,
  loading,
}: {
  onClick: () => void;
  loading: boolean;
}) => {
  return (
    <div>
      <button
        className="flex justify-center items-center bg-linear-to-r from-[#22fff1] to-[#b9ffb3] text-black w-full p-2 rounded-md gap-3"
        onClick={onClick}
        type="button"
      >
        {loading && (
          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
        )}
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
};

export default LoginButton;
