"use client";

import React, { useEffect, useState, Fragment } from "react";
import DeleteButton from "../components/ui/DeleteButton";
import CreateButton from "../components/ui/CreateButton";
import Modal from "../components/ui/Modal"; // 🔥 IMPORTANT
import Container from "../components/ui/Container";
import { useUser } from "../context/UserContext";
import CircleCheckbox from "./ui/CircleCheckbox";
import toast from "react-hot-toast";
import CreateProject from "./ui/CreateProject";
import DeleteProjectButton from "./ui/DeleteProjectButton";

interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
  user: {
    name: string;
    email: string;
  };
}

interface Project {
  id: number;
  title: string;
  todos: Todo[];
}

const TodoPage = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [todos, setTodos] = useState<Todo[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");

  const { user } = useUser();

  // modal mode may condition kung create or edit(pero default niya create)
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );

  const handleDelete = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    setProjects((prevProjects) =>
      prevProjects.map((project) => ({
        ...project,
        todos: project.todos.filter((todo) => todo.id !== id),
      }))
    );
  };

  const handleDeleteProject = (id: number) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== id)
    );
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedTodo(null);
    setTitle("");
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_URL}/api/projects`, {
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Error fetching projects", data.message);
        setProjects([]);
        return;
      }

      setProjects(data.projects || []);
      console.log("Projects fetched:", data.projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    }
  };

  // CREATE TODO
  const createTodo = async () => {
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!selectedProjectId) {
      toast.error("No project selected");
      return;
    }
    console.log("Creating todo in project ID:", selectedProjectId);
    try {
      const res = await fetch(`${API_URL}/api/todos/${selectedProjectId}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to create todo");
        return;
      }

      toast.success("Todo created!");

      // Refresh list
      fetchTodos();
      fetchProjects();

      // Clear inputs
      setTitle("");

      // Close modal
      setOpenModal(false);
    } catch (error) {
      console.error("Error creating todo:", error);
      toast.error("Something went wrong");
    }
  };

  // FETCH ALL TODO OF LOGGED IN USER
  const fetchTodos = async () => {
    try {
      const res = await fetch(`${API_URL}/api/todos`, {
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Error fetching todos:", data.message);
        setTodos([]); // prevent undefined
        return;
      }

      setTodos(data.todos || []); // prevent undefined
    } catch (error) {
      console.error("Error fetching todos:", error);
      setTodos([]); // fallback
    }
  };

  // TO COMPLETE AND TO UNCOMPLETE TODO
  const toggleTodo = async (id: number) => {
    try {
      await fetch(`${API_URL}/api/todos/${id}/toggle`, {
        method: "PATCH",
        credentials: "include",
      });
      fetchProjects();

      fetchTodos();
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  const updateTodo = async () => {
    if (!selectedTodo) return;
    try {
      const res = await fetch(
        `${API_URL}/api/todos/update-todo/${selectedTodo.id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error("Failed to update", data.message);
        return;
      }

      fetchTodos();
      setOpenModal(false);
      setSelectedTodo(null);
      setTitle("");
    } catch (error) {
      console.error("Error updating todo", error);
    }
  };

  const editProject = async () => {
    if (!selectedProjectId) return;
    try {
      const res = await fetch(
        `${API_URL}/api/projects/update-project/${selectedProjectId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error("Failed to edit project", data.message);
        return;
      }

      fetchProjects();
      setOpenModal(false);
      setTitle("");
    } catch (error) {
      console.error("Error editing project", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchTodos(), fetchProjects()]);
    };
    loadData();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center mb-5 text-linear-to-r from-[#22fff1] to-[#b9ffb3]">
          Todos
        </h1>
        <CreateProject onProjectCreated={fetchProjects} />
      </div>
      <Container className="grid grid-cols-3 w-full gap-5">
        <Modal open={openModal} onClose={handleCloseModal}>
          <h2 className="text-lg font-bold mb-3">
            {modalMode === "create" ? "Create Todo" : "Update Todo"}
          </h2>
          <input
            type="text"
            placeholder="Title"
            className="border p-2 w-full rounded mb-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="flex gap-2">
            <button
              className="bg-blue-600 text-white p-2 rounded w-full"
              onClick={modalMode === "create" ? createTodo : updateTodo}
            >
              {modalMode === "create" ? "Create" : "Update"}
            </button>
            <button
              onClick={handleCloseModal}
              className="w-full text-black bg-gray-200 p-2 rounded-md hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </Modal>

        {projects.length === 0 ? (
          <div className="col-span-3 flex flex-col items-center gap-10">
            <p className="text-gray-500">
              No projects found. Please create a project first.
            </p>
          </div>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="border rounded-md mb-4 relative">
              <div className="flex justify-between items-center bg-[#b9ffb3] rounded-t-sm p-4 text-black">
                <h2 className="text-lg font-bold capitalize">
                  {project.title}
                </h2>
                {/* <i className="ri-file-edit-line"></i> */}
                <DeleteProjectButton
                  id={project.id}
                  onDelete={handleDeleteProject}
                />
              </div>
              <CreateButton
                onClick={() => {
                  setModalMode("create");
                  setSelectedTodo(null);
                  setSelectedProjectId(project.id);
                  setOpenModal(true);
                }}
              />

              <ul className="mt-2 p-4">
                {project.todos.length === 0 ? (
                  <p className="text-gray-500 text-sm">No todos yet</p>
                ) : (
                  project.todos.map((todo) => (
                    <div key={todo.id} className="flex justify-between">
                      <li className="flex items-center gap-3 mb-2">
                        <CircleCheckbox
                          checked={todo.isCompleted}
                          onToggle={() => toggleTodo(todo.id)}
                        />
                        <p
                          onClick={() => toggleTodo(todo.id)}
                          className={`cursor-pointer ${
                            todo.isCompleted ? "line-through text-gray-400" : ""
                          }`}
                        >
                          {todo.title}
                        </p>
                      </li>
                      <DeleteButton id={todo.id} onDelete={handleDelete} />
                    </div>
                  ))
                )}
              </ul>
            </div>
          ))
        )}
      </Container>
    </div>
  );
};

export default TodoPage;
