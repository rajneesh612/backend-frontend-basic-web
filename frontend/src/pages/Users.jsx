import { useEffect, useState } from "react";

function Users() {

  const [users, setUsers] = useState([]);

  useEffect(() => {

    getUsers();

  }, []);

  async function getUsers() {

    const response = await fetch(
      "http://localhost:3000/users"
    );

    const data = await response.json();

    console.log(data);

    setUsers(data);

  }

  return (

    <div>

      <h1>Users Page</h1>

      {users.map((user) => (

        <div key={user.id}>

          <h3>{user.name}</h3>

        </div>

      ))}

    </div>

  );

}

export default Users;