import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

function Login() {

  const [name, setName] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] =
  useState(false);

  const navigate = useNavigate();

  async function login() {

    setLoading(true);

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
    setLoading(false);

    console.log(data);

    if (data.token) {

      localStorage.setItem("token", data.token);

      toast.success("Login successful");

      navigate("/profile");

    } else {

      toast.error(data.message);

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

      <button
  onClick={login}
  disabled={loading}
>

  {loading
    ? "Logging in..."
    : "Login"}

</button>

    </div>

  );

}

export default Login;