function UserCard({

  user,

  deleteUser,

  setSelectedUser,

  setEditName,

  setEditAddress,

  setEditGender,

  setShowModal,

}) {

  return (

    <div
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

  );

}

export default UserCard;