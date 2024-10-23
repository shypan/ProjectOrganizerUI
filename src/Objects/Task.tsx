import { useQuery } from "react-query";
import { retrieveTaskById } from "./Tasks";
import { Form, Outlet, useNavigate, useParams } from "react-router-dom";

export interface Task {
  _id?: number;
  taskId?: number;
  taskName: string;
  dateCreated?: Date;
  description: string;
  elementId?: string;
}

const Task = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const {
    data: task,
    error,
    isLoading,
    refetch,
  } = useQuery<Task>(["taskData", taskId], () =>
    retrieveTaskById(taskId as string)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading task</div>;
  }

  const formattedDate = task?.dateCreated
    ? new Date(task.dateCreated).toLocaleString()
    : "No date available";

  return (
    <div>
      <h2>{task?.taskName}</h2>
      <p>Description: {task?.description}</p>
      <p>Date Created: {formattedDate}</p>
      <Outlet context={{ task, refetch }} />

      <div>
        <Form action="updateTask">
          <button type="submit" onClick={() => refetch()}>
            Update Task
          </button>
        </Form>
        <Form
          method="post"
          action="deleteTask"
          onSubmit={(event) => {
            if (!confirm("Please confirm you want to delete this record.")) {
              event.preventDefault();
            }
          }}
        >
          <button type="submit">Delete Task</button>
        </Form>
        <button onClick={() => navigate("/")}>Back</button>
      </div>
    </div>
  );
};

export default Task;
