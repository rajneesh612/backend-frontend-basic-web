import { useState } from "react";

import { useNavigate } from "react-router-dom";

function Login() {

  const [name, setName] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function login() {

    const response = await fetch(
      "http://localhost:3000/users/login",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          password,
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    if (data.token) {

      localStorage.setItem("token", data.token);

      alert("Login successful");

      navigate("/profile");

    } else {

      alert(data.message);

    }

  }

  return (

    <div>

      <h1>Login Page</h1>

      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={login}>
        Login
      </button>

    </div>

  );

}

export default Login;