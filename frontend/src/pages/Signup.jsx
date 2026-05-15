import { useState } from "react";

import { useNavigate } from "react-router-dom";

function Signup() {

  const [name, setName] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function signup() {

    const response = await fetch(
      "http://localhost:3000/users",
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

    alert(data.message);

    navigate("/login");

  }

  return (

    <div>

      <h1>Signup Page</h1>

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

      <button onClick={signup}>
        Signup
      </button>

    </div>

  );

}

export default Signup;