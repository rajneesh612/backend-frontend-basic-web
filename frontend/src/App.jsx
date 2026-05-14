import { useState } from "react";

function App() {

  const [name, setName] = useState("");

  const [password, setPassword] = useState("");

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

  }

  return (

    <div>

      <h1>Welcome</h1>

      <input
        type="text"
        placeholder="Enter user name"
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

export default App;