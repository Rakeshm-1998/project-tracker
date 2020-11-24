import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const engineers = () => history.push("/engineers");
  const projects = () => history.push("/projects");
  const tasks = () => history.push("/tasks");


  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });

    localStorage.setItem("auth-token", "");

  };



  return (

    <nav className="auth-options">
      {userData.user ? (
        <div>
        <button onClick={engineers}>Add Users</button>
        <button onClick={projects}>Add Projects</button>
        <button onClick={tasks}>Add Tasks</button>
        <button onClick={logout}>Log out</button>
      </div>

      ) : (
      <div>
          <button onClick={register}>Register</button>
          <button onClick={login}>Log in</button>
        </div>

      )}

    </nav>

  );

}