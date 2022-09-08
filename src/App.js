import Login from "./componenents/Login";
import Register from "./componenents/Register";
import Layout from "./componenents/Layout";
import RequireAuth from "./componenents/RequireAuth";
import { Routes, Route } from "react-router-dom";
import Home from "./componenents/Home";
import LinkPage from "./componenents/LinkPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/*public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />

        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
