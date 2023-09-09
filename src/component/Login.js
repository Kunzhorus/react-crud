import { useState } from "react";
import { loginUser } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
function Login() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPass, setIsShowPass] = useState(false);
  const [iconLoading, setIconLoading] = useState(false);
 
  const {loginContext} = useContext(UserContext)
  const navigate = useNavigate();
  

  const handleLogin = async() => {
    setIconLoading(true)
    if( email && password){
      let res  = await loginUser("eve.holt@reqres.in", password)
      if(res.token) {
        toast.success("Login success")
        loginContext(email, res.token)
        navigate("/")
      }
    }
    setIconLoading(false)
  }


  return (
    <div className="login-container col-11 col-sm-4">
      <div className="title">Login</div>
      <div className="text">Email or username</div>
      <input
        type="text"
        placeholder="Enter email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="input-password">
        <input
          type={isShowPass === true ? "text" : "password"}
          placeholder="Enter password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <i
          className={
            isShowPass === true
              ? "fa-solid fa-eye iPass"
              : "fa-solid fa-eye-slash iPass"
          }
          onClick={() => setIsShowPass(!isShowPass)}
        ></i>
      </div>
      <button className={email && password ? "active" : "disable"}

      onClick={handleLogin}
      >
        <i className={iconLoading ? "fa-solid fa-sync fa-spin" : ""}></i>
         &nbsp;Login
      </button>
      <div className="back-btn">
        <Link to="/" style={{color:"black", textDecoration:"none"}}><i className="fa-solid fa-angles-left"></i> Go back</Link>
      </div>
    </div>
  );
}

export default Login;
