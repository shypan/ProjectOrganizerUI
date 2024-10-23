import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import Root from "./Root.tsx";
import Task from "./Objects/Task.tsx";
import DisplayTasks from "./DisplayTasks.tsx";
import NewTask from "./Pages/NewTask.tsx";
import { deleteTaskAction } from "./deleteTask.tsx";
import { updateTaskAction } from "./Pages/EditTask.tsx";
import EditTaskForm from "./EditTaskForm.tsx";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/tasks",
        element: (
          <div>
            <DisplayTasks />
          </div>
        ),
      },
      {
        path: "/tasks/:taskId",
        element: <Task />,
        children: [
          {
            path: "/tasks/:taskId/updateTask",
            element: <EditTaskForm />,
          },
        ],
      },
      {
        path: "/newTask",
        element: <NewTask />,
      },
      {
        path: "/tasks/:taskId/deleteTask",
        action: deleteTaskAction,
      },
      {
        path: "/tasks/:taskId/updateTask/updateTaskAction",
        action: updateTaskAction,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </QueryClientProvider>
);
