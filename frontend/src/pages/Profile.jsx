import { useEffect, useState } from "react";



import { useNavigate } from "react-router-dom";

import "../Profile.css";

function Profile() {

  const [user, setUser] = useState(null);

  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");

  const [selectedUser, setSelectedUser] =
    useState(null);

  const [showModal, setShowModal] =
    useState(false);

  const [editName, setEditName] =
    useState("");

  const [editAddress, setEditAddress] =
    useState("");

  const [editGender, setEditGender] =
    useState("");

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
          Authorization: 'Bearer ' + token,
        },
      }
    );

    const data = await response.json();

    setUser(data);

  }

  async function getUsers() {

    const response = await fetch(
      "http://localhost:3000/users"
    );

    const data = await response.json();

    setUsers(data);

  }

  async function deleteUser(id) {

    const isConfirmed = window.confirm(
      "Are you sure?"
    );

    if (!isConfirmed) return;

    await fetch(
      'http://localhost:3000/users/' + id,
      {
        method: "DELETE",
      }
    );

    getUsers();

  }

  async function updateUser() {

    await fetch(

      `http://localhost:3000/users/${selectedUser.id}`,

      {

        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({

          name: editName,

          address: editAddress,

          gender: editGender,

        }),

      }

    );

    getUsers();

    setShowModal(false);

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
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <br /><br />

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
            onClick={() => {

              setSelectedUser(user);

              setEditName(user.name);

              setEditAddress(user.address);

              setEditGender(user.gender);

              setShowModal(true);

            }}
          >

            <div className="avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <h3>{user.name}</h3>

            <button
              onClick={(e) => {

                e.stopPropagation();

                deleteUser(user.id);

              }}
            >
              Delete
            </button>

          </div>

        ))}

      {showModal && selectedUser && (

        <div
          className="modal-overlay"
          onClick={() => setShowModal(false)}
        >

          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >

            <h2>Edit User</h2>

            <input
              type="text"
              value={editName}
              onChange={(e) =>
                setEditName(e.target.value)
              }
            />

            <input
              type="text"
              value={editAddress}
              onChange={(e) =>
                setEditAddress(e.target.value)
              }
            />

            <input
              type="text"
              value={editGender}
              onChange={(e) =>
                setEditGender(e.target.value)
              }
            />

            <button onClick={updateUser}>
              Save
            </button>

            <button
              onClick={() => setShowModal(false)}
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>

  );

}

export default Profile;
