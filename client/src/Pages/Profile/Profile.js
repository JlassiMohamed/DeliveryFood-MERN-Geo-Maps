import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../JS/actions/user";

const Profile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return <div>PROFILE</div>;
};

export default Profile;
