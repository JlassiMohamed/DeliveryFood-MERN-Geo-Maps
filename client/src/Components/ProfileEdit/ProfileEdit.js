import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { editUser } from "../../JS/actions/user";

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ProfileEdit = ({ userToEdit }) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const edit = useSelector((state) => state.editReducer.edit);
  const handleOpen = () => {
    setOpen(true);
    setNewUser(userToEdit);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState(userToEdit);
  //   console.log(newUser);

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleData = (e) => {
    e.preventDefault();
    dispatch(editUser(newUser));
    handleClose();
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Edit your private contact</h2>
      <form onSubmit={handleData}>
        <label>Name:</label>
        <input
          onChange={handleChange}
          name="name"
          value={newUser.name}
          placeholder="Edit your pseudo name"
        />
        <br />
        <label>Last Name:</label>
        <input
          onChange={handleChange}
          name="lastName"
          value={newUser.lastName}
          placeholder="Edit your last name"
        />
        <br />
        <label>E-Mail:</label>
        <input
          onChange={handleChange}
          name="email"
          value={newUser.email}
          placeholder="Edit your email"
        />
        <br />
        <label>Phone Number:</label>
        <input
          onChange={handleChange}
          name="phone"
          value={newUser.phone}
          placeholder="Edit your phone"
        />
        {!edit ? (
          <div>
            <label>Local Address:</label>
            <input
              onChange={handleChange}
              name="address"
              value={newUser.address}
              placeholder="Edit your address"
            />
          </div>
        ) : null}
        <button onClick={handleData}>save</button>
      </form>
    </div>
  );
  return (
    <div>
      <span>
        If you want to update your contact information, please click on:{" "}
      </span>
      <a
        onClick={handleOpen}
        style={{ width: "4rem", height: "2rem", color: "blue" }}
      >
        Setting
      </a>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default ProfileEdit;
