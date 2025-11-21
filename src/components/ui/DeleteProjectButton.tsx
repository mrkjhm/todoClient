import React from "react";
import toast from "react-hot-toast";

interface DeleteProjectButtonProps {
  id: number;
  onDelete: (id: number) => void;
}

const DeleteProjectButton = ({ id, onDelete }: DeleteProjectButtonProps) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleDelete = async () => {
    try {
      const res = await fetch(`${API_URL}/api/projects/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        console.error("Failed to delete project");
        return;
      }

      toast.success("Project deleted successfully");
      onDelete(id);
    } catch (error) {
      console.error("Failed to delete project", error);
      toast.error("Something went wrong");
    }
  };

  const confirmDelete = () => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-medium">Delete this project?</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              handleDelete();
            }}
            className="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <i
        className="ri-close-circle-line cursor-pointer text-lg"
        onClick={confirmDelete}
      ></i>
    </div>
  );
};

export default DeleteProjectButton;
