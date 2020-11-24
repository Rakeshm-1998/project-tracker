import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";
import "./style.css";

import Header from "./components/layout/Header";
//import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import UserContext from "./context/UserContext";
import CreateEngineer from "./components/pages/createEngineer";
import CreateProject from "./components/pages/createProject";
import projectList from "./components/pages/projectList";
import EditProjects from "./components/pages/editProject";
import CreateTask from "./components/pages/createTask";


export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,

  });
  


  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      const tokenRes = await Axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );

      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": token },
        });

        setUserData({
          token,
          user: userRes.data,
        });
      }
    };
    checkLoggedIn();
  }, []);



  return (

    <>

      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={projectList} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/projects" component={CreateProject} />
              <Route path="/engineers" component={CreateEngineer} />
              <Route path="/edit" component={EditProjects} />
              <Route path="/tasks" component={CreateTask} />



            </Switch>
          </div>
        </UserContext.Provider>
      </BrowserRouter>

    </>

  );

}