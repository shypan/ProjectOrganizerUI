import { Form, useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { Task } from "./Objects/Task";

const EditTaskForm = () => {
  const context = useOutletContext<{ task: Task; refetch: () => void }>();
  const task = context.task;
  const navigate = useNavigate();

  if (!task) return <p>Loading...</p>;

  return (
    <>
      <Form method="put" action="updateTaskAction">
        <p>
          <span>Task Name</span>
          <input type="text" name="taskName" defaultValue={task.taskName} />
          <span>Description</span>
          <input
            type="text"
            name="description"
            defaultValue={task.description}
          />
        </p>
        <p>
          <button type="submit" onClick={() => context.refetch()}>
            Save
          </button>
        </p>
      </Form>
      <button onClick={() => navigate(-1)}>Cancel</button>
      <button onClick={() => console.log(task)}>Debug: Print Task</button>
    </>
  );
};

export default EditTaskForm;
