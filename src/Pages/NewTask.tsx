import { useState } from "react";
import { useMutation } from "react-query";
import { createTask } from "../Objects/Tasks";
import { Task } from "../Objects/Task";
import { useNavigate } from "react-router-dom";

const NewTask = () => {
  const [taskName, setTaskName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const navigate = useNavigate();

  const mutation = useMutation((newTask: Task) => createTask(newTask), {
    onSuccess: () => {
      navigate("/");
      alert("Task submitted!");
    },
  });

  const submitData = () => {
    mutation.mutate({ taskName, description });
  };

  if (mutation.isLoading) {
    return <span>Submitting...</span>;
  }

  if (mutation.isError) {
    return <span>Error: {(mutation.error as Error).message}</span>;
  }

  if (mutation.isSuccess) {
    return <span>Post submitted!</span>;
  }

  return (
    <div>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Title"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Body"
      />
      <button onClick={submitData}>Submit</button>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default NewTask;
