import React, { useState } from "react";
import toast from "react-hot-toast";

const CreateProject = ({
  onProjectCreated,
}: {
  onProjectCreated: () => void;
}) => {
  const [title, setTitle] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const createProject = async () => {
    try {
      if (title.trim() === "") {
        toast.error("Enter a project title");
        return;
      }

      const result = await fetch(`${API_URL}/api/projects/create-project`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ title }),
      });

      if (!result.ok) {
        console.error("Failed to create project");
        return;
      }

      toast.success("Project created successfully");

      const data = await result.json();
      console.log("Project created:", data.project);
      setTitle("");

      onProjectCreated();
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <>
      <div className="border border-[#b9ffb3] rounded-md flex items-center w-[400px] mb-15">
        <input
          type="text"
          className="px-3 py-2 w-full focus:outline-none"
          placeholder="Enter project..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          className="h-full bg-linear-to-r from-[#22fff1] to-[#b9ffb3] text-black px-4 py-2 border-l hover:opacity-90 transition rounded-r-sm"
          onClick={createProject}
        >
          Create
        </button>
      </div>
    </>
  );
};

export default CreateProject;
