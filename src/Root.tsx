import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";
import DisplayTasks from "./DisplayTasks";

const Root = () => {
  return (
    <div>
      <Navbar />
      <DisplayTasks />
      <Outlet />
    </div>
  );
};

export default Root;
