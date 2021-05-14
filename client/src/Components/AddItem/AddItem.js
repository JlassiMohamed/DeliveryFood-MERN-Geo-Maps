import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { editItem, getItem, postItem } from "../../JS/actions/item";

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

const AddItem = ({ id }) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    if (id) return dispatch(getItem(id));
  };
  const itemToEdit = useSelector((state) => state.itemReducer.item);

  const handleClose = () => {
    setOpen(false);
  };

  const [newItem, setNewItem] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    id ? setNewItem(itemToEdit) : setNewItem({});
  }, [itemToEdit, id]);
  // console.log(newItem);

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };
  const handleData = (e) => {
    e.preventDefault();
    id
      ? dispatch(editItem(itemToEdit._id, newItem))
      : dispatch(postItem(newItem));
    handleClose();
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Enter your Item description</h2>
      <form onSubmit={handleData}>
        <label>title:</label>
        <input
          onChange={handleChange}
          name="title"
          value={newItem.title}
          placeholder="Enter the title"
        />
        <br />
        <label>description:</label>
        <input
          onChange={handleChange}
          name="description"
          value={newItem.description}
          placeholder="type description"
        />
        <br />
        <label>image Url:</label>
        <input
          onChange={handleChange}
          name="imageUrl"
          value={newItem.imageUrl}
          placeholder="Enter the image Url"
        />
        <br />
        <label>price:</label>
        <input
          onChange={handleChange}
          name="price"
          value={newItem.price}
          placeholder="type the price"
        />
        <button onClick={handleData}>{id ? "save" : "add"}</button>
      </form>
    </div>
  );
  return (
    <div>
      <button onClick={handleOpen} style={{ width: "4rem", height: "2rem" }}>
        {id ? "Edit" : "Add"}
      </button>
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

export default AddItem;
