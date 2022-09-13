import { Link } from "react-router-dom";
import Project from "./Project";

const Admin = () => {
  return (
    <section>
      <h1>Admins Page</h1>
      <br />
      <Project />
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};

export default Admin;
