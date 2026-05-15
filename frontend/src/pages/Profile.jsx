import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import "../Profile.css";



function Profile() {

  const [user, setUser] = useState(null);

  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState(""); 

  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {

      navigate("/login");

      return;

    }

    getProfile();

  }, []);

  async function getProfile() {

    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:3000/users/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    console.log(data);

    setUser(data);

  }

async function getUsers() {

  const response = await fetch(
    "http://localhost:3000/users"
  );

  const data = await response.json();

  console.log(data);

  setUsers(data);

}


async function deleteUser(id) {

  const isConfirmed = window.confirm(
  "Are you sure?"
);

if (!isConfirmed) return;
  await fetch(
    `http://localhost:3000/users/${id}`,
    {
      method: "DELETE",
    }
  );

  getUsers();

}



  function logout() {

    localStorage.removeItem("token");

    navigate("/login");

  }

  return (

   <div className="container">

    <div className="navbar">

  <h2>My App</h2>

  <button onClick={logout}>
    Logout
  </button>

</div>

      <h1>Profile Page</h1>

      {user && (

        <div>

          <h2>User ID: {user.id}</h2>

          <h2>Name: {user.name}</h2>

        </div>

      )}

      <br />

      {users.length === 0 ? (

  <button onClick={getUsers}>
    Get Users
  </button>

  

) : (

  <button onClick={() => setUsers([])}>
    Back To Profile
  </button>

)}

<br /><br />

<input
  type="text"
  placeholder="Search user"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

<br /><br />

<br />

<br />

{users
  .filter((user) =>
    user.name
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .map((user) => (

  <div
    key={user.id}
     className="user-card"
  >

    <div
  style={{
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "lightgray",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  }}
>
  {user.name.charAt(0).toUpperCase()}
</div>

<h3>{user.name}</h3>

    <button onClick={() => deleteUser(user.id)}>
      Delete
    </button>

  </div>

))}



      

    </div>

  );

}

export default Profile;