import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Linkpage from "./Components/LinkPage/Linkpage";
import Admin from "./Components/Admin/Admin";
import Editor from "./Components/Editor/Editor";
import Lounge from "./Components/Lounge/Lounge";
import Missing from "./Components/Missing/Missing";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";
import UnAuthorized from "./Components/UnAuthorized/UnAuthorized";

const ROLES = {
  user: "user",
  admin: "admin",
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkspage" element={<Linkpage />} />
        <Route path="unauthorized" element={<UnAuthorized />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes allowedRoles={[ROLES.user]} />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<ProtectedRoutes allowedRoles={[ROLES.user]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>
        <Route element={<ProtectedRoutes allowedRoles={[ROLES.admin]} />}>
          <Route path="editor" element={<Editor />} />
        </Route>
        <Route
          element={<ProtectedRoutes allowedRoles={[ROLES.user, ROLES.admin]} />}
        >
          <Route path="lounge" element={<Lounge />} />
        </Route>

        {/* 404 */}
        <Route path="missing" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
