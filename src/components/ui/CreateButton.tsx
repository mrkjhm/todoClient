"use client";

import React from "react";

interface CreateButtonProps {
  onClick: () => void;
}

const CreateButton = ({ onClick }: CreateButtonProps) => {
  return (
    <div className="absolute flex w-full justify-center -bottom-4">
      <button
        className="p-1 px-5 rounded-md border bg-linear-to-r from-[#22fff1] to-[#b9ffb3] text-black transition flex justify-center  mt-2"
        onClick={onClick}
      >
        <p className="text-sm text-center w-fit">Add todo</p>
      </button>
    </div>
  );
};

export default CreateButton;

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// const createTodo = async () => {
//   try {
//     const res = await fetch(`${API_URL}/api/todos/`, {
//       method: "POST",
//       credentials: "include",
//     });

//     if (!res.ok) {
//       console.error("Failed to create todo");
//     }

//     onCreate(id);
//   } catch (error) {
//     console.error("Failed to create todo", error);
//   }
// };
