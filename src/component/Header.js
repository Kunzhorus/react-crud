import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { ToastContainer, toast } from "react-toastify";
import logoApp from "../assets/images/logo192.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Header() {
  const { logout, user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast.success("Logout Success");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary navbar">
        <Container>
          <Link to="/" className="nav-link" style={{ marginLeft: "-20px" }}>
            <Navbar.Brand>
              <img
                src={logoApp}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="React logo"
              />
              <span>React-CRUD</span>
            </Navbar.Brand>
          </Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/" className="nav-link">
                Home
              </Link>
              {user.auth && (
                <Link to="/users" className="nav-link">
                  Manage Users
                </Link>
              )}
            </Nav>

            <Nav>
              <div className="nav-link">
                {user.auth && `Welcome ${user.email}`}
              </div>
              <NavDropdown title="Setting" id="basic-nav-dropdown">
                {user && user.auth === true ? (
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item onClick={handleLogin}>
                    Login
                  </NavDropdown.Item>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <ToastContainer
        position="top-right"
        autoClose={600}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        draggable
        theme="dark"
      />
    </div>
  );
}

export default Header;
