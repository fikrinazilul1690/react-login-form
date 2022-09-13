import { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';

const Project = () => {
  const [project, setProject] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const controller = new AbortController();

    const getProject = async () => {
      await axiosPrivate
        .get('/project', {
          signal: controller.signal,
        })
        .then((response) => {
          console.log(response?.data);
          setProject(response?.data);
        })
        .catch((err) => {
          if (!controller.signal.aborted) {
            console.log(err);
            navigate('/login', { state: { from: location }, replace: true });
          }
        });
    };

    getProject();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Project List</h2>
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
