import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProfileEdit from "../../Components/ProfileEdit/ProfileEdit";
import { deleteUser, resetPassword } from "../../JS/actions/user";

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
  const [omit, setOmit] = useState(false);
  const [emailToCancel, setEmailToCancel] = useState("");
  const handleDelete = () => {
    !omit
      ? setOmit(true)
      : email === emailToCancel
      ? dispatch(deleteUser(history))
      : null;
  };
  const handleChangeDelete = (e) => {
    setEmailToCancel(e.target.value);
  };
  const [passwords, setPasswords] = useState({});
  const [newMdp, setNewMdp] = useState("");
  const [reset, setReset] = useState(false);
  const handleReset = () => {
    !reset
      ? setReset(true)
      : newMdp === passwords.newPassword
      ? (dispatch(resetPassword(passwords, history)), setReset(false))
      : alert("type again your new password");
  };
  const handleChangeMdp = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };
  const handleChangeNewMdp = (e) => {
    setNewMdp(e.target.value);
  };
  console.log(passwords);
  console.log(newMdp);

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
      {!omit ? <ProfileEdit userToEdit={userToEdit} /> : null}
      {!omit ? (
        <div>
          {!reset ? (
            <div>
              <span>
                Want you to change your password? Click on this link:{" "}
              </span>
              <a onClick={handleReset} style={{ color: "#d232ff" }}>
                Password
              </a>
            </div>
          ) : null}
          {reset ? (
            <div>
              <br />
              <span>Password must be composed of 6 characters at least</span>
              <label>Current Password:</label>
              <input
                onChange={handleChangeMdp}
                name="password"
                value={passwords.password}
                type="password"
                placeholder="Edit your current password"
                style={{ width: "200px" }}
              />
              <br />
              <label>New Password:</label>
              <input
                onChange={handleChangeMdp}
                name="newPassword"
                value={passwords.newPassword}
                type="password"
                placeholder="Edit the new password"
                style={{ width: "200px" }}
              />
              <br />
              <label>New Password:</label>
              <input
                onChange={handleChangeNewMdp}
                value={newMdp}
                type="password"
                placeholder="confirm the new password"
                style={{ width: "200px" }}
              />
              <br />
              <button onClick={handleReset}>Send</button>
              <br />
              <br />
            </div>
          ) : null}
        </div>
      ) : null}
      {omit ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "405px",
              border: "1px solid",
              backgroundColor: "#EFEFEF",
            }}
          >
            <p>Are you absolutely sure?</p>
            <p>
              Unexpected bad things will happen if you don’t read this! <br />
              This action cannot be undone. This will permanently delete your
              account, and remove all depending personal informations.
            </p>
            <span>Please type your contact email to confirm.</span>
          </div>
          <input
            onChange={handleChangeDelete}
            value={emailToCancel}
            placeholder="Enter your email contact"
            style={{ width: "405px" }}
          />
        </div>
      ) : null}
      {!omit ? "how to delete account? follow this link: " : null}
      {!omit ? (
        <a onClick={handleDelete} style={{ color: "red" }}>
          Delete Account
        </a>
      ) : (
        <div>
          <button
            onClick={handleDelete}
            style={{ width: "405px", color: "red" }}
          >
            I understand the consequences, delete my account
          </button>
          <br />
          <br />
          <button onClick={() => setOmit(false)}>discard</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
