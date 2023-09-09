import "./App.scss";
import Header from "./component/Header";
import Home from "./component/Home";
import { Routes, Route } from "react-router-dom";
import TableUsers from "./component/TableUsers";
import Login from "./component/Login";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
function App() {
  // localStorage.removeItem("token")
  const { user } = useContext(UserContext);
  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {user && user.auth && <Route path="/users" element={<TableUsers />} />}
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
