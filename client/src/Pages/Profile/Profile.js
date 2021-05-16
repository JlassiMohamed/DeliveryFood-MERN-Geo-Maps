import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ProfileEdit from "../../Components/ProfileEdit/ProfileEdit";
import { deleteUser } from "../../JS/actions/user";

const Profile = ({ history }) => {
  const user = useSelector((state) => state.userReducer.user);
  const edit = useSelector((state) => state.editReducer.edit);
  const dispatch = useDispatch();
  let name = user === null ? null : user.name;
  let lastName = user === null ? null : user.lastName;
  let email = user === null ? null : user.email;
  let phone = user === null ? null : user.phone;
  let address = user === null ? null : user.address;
  let role = user === null ? null : user.role;
  let userToEdit = { name, lastName, email, phone, address };

  return (
    <div>
      <h1>PROFILE</h1>
      <p>Name: {name}</p>
      <p>Last Name: {lastName}</p>
      <p>E-Mail: {email}</p>
      <p>Phone Number: {phone}</p>
      {!edit ? <p>Local Address: {address}</p> : null}
      <p>Subscribed as: {role}</p>
      {/* <p>{password}</p> */}
      <ProfileEdit userToEdit={userToEdit} />
      <button onClick={() => dispatch(deleteUser(history))}>
        Delete Account
      </button>
    </div>
  );
};

export default Profile;
