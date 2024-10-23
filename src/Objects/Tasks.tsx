import axios from "axios";
import { Task } from "./Task";

export const retrieveTasks = async (): Promise<Task[]> => {
  const response = await axios.get<Task[]>("/api/v1/tasks");
  return response.data;
};

export const retrieveTaskById = async (id: string): Promise<Task> => {
  const response = await axios.get<Task>(`/api/v1/tasks/${id}`);
  return response.data;
};

export const createTask = async (
  newTask: Omit<Task, "elementId" | "_id" | "taskId" | "dateCreated">
): Promise<Task> => {
  try {
    const response = await axios.post<Task>("/api/v1/tasks/newTask", newTask);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const deleteTaskById = async (taskId: string): Promise<string> => {
  try {
    await axios.delete(`/api/v1/tasks/${taskId}`);

    return `Task with ID ${taskId} has been successfully deleted! 🎉`;
  } catch (error) {
    console.error("Error deleting task:", error);

    throw new Error(
      `Failed to delete task with ID ${taskId}. Please try again. 😞`
    );
  }
};

export const updateTask = async (
  taskToUpdate: Omit<Task, "_id" | "taskId" | "dateCreated">
): Promise<Task> => {
  try {
    const response = await axios.put<Task>(
      `/api/v1/tasks/${taskToUpdate.elementId}`,
      taskToUpdate
    );
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};
