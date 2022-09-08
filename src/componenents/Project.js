import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const Project = () => {
  const [project, setProject] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getProject = async () => {
      try {
        const response = await axiosPrivate.get("/project", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setProject(response.data);
      } catch (err) {
        if (isMounted) {
          console.log(err);
          navigate("/login", { state: { from: location }, replace: true });
        }
      }
    };

    getProject();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Users List</h2>
      {project?.length ? (
        <ul>
          {project.map((project, i) => (
            <li key={i}>{project?.title}</li>
          ))}
        </ul>
      ) : (
        <p>No project to display</p>
      )}
    </article>
  );
};

export default Project;
