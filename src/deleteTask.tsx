import { redirect } from "react-router-dom";
import { deleteTaskById } from "./Objects/Tasks";
import type { ActionFunctionArgs } from "react-router-dom";

export async function deleteTaskAction({ params }: ActionFunctionArgs) {
  const taskId = params.taskId;

  if (!taskId) {
    throw new Error("Task ID is missing");
  }

  await deleteTaskById(taskId);

  return redirect("/");
}
