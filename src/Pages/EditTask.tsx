import { ActionFunctionArgs, redirect } from "react-router-dom";
import { updateTask } from "../Objects/Tasks";

export async function updateTaskAction({
  params,
  request,
}: ActionFunctionArgs) {
  console.log("Hello!" + params.taskId);
  const elementId = params.taskId;
  if (!elementId) {
    throw new Error("Task ID is missing.");
  }

  const formData = await request.formData();
  const updatedTask = {
    taskName: formData.get("taskName") as string,
    description: formData.get("description") as string,
    elementId: elementId,
  };

  try {
    await updateTask(updatedTask);
    alert("Task updated!");
    return redirect(`/tasks/${elementId}`);
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
}
