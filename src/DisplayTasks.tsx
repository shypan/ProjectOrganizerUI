import { useQuery } from "react-query";
import { Task } from "./Objects/Task.tsx";
import { retrieveTasks } from "./Objects/Tasks.tsx";
import { Link } from "react-router-dom";

const DisplayTasks: React.FC = () => {
  const {
    data: tasks,
    error,
    isLoading,
  } = useQuery<Task[], Error>(["tasksData"], retrieveTasks);

  if (isLoading) return <div>Fetching tasks...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <ul>
      {tasks?.map((task) => (
        <li key={task.elementId}>
          <Link to={"/tasks/" + task.elementId}> {task.taskName}</Link>
        </li>
      ))}
    </ul>
  );
};

export default DisplayTasks;
