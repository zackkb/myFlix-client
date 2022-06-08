import React, { useState } from "react";
import "./profile-view.scss";
import Button from "react-bootstrap/Button";
import axios from "axios";

import { connect } from "react-redux";
import { updateUser } from "../../actions/actions";

import { UserData } from "./user-data";
import { UpdateUserForm } from "./update-user";
import { FavoriteMoviesList } from "./favorite-movies";

function ProfileView(props) {
  const { user, onBackClick, favoriteMovies } = props;
  const [updatedUser, setUpdatedUser] = useState({});

  // Auth request
  let token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(
        `https://zachmovie.herokuapp.com/users/${user.Username}`,
        updatedUser
      )
      .then((response) => {
        props.updateUser(response.data);
        alert("Profile updated!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleUpdate = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value,
    });
  };

  const deleteProfile = (e) => {
    axios
      .delete(`https://zachmovie.herokuapp.com/users/${user.Username}`)
      .then(() => {
        alert("Profile deleted!");
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        window.open("/", "_self");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <UserData user={user} />
      <UpdateUserForm handleSubmit={handleSubmit} handleUpdate={handleUpdate} />

      <div>
        <Button
          className="mb-3"
          variant="danger"
          type="submit"
          onClick={deleteProfile}
        >
          Delete Profile
        </Button>
      </div>

      <FavoriteMoviesList favoriteMovies={favoriteMovies} user={user} />

      <div>
        <Button
          variant="outline-light"
          onClick={() => {
            onBackClick();
          }}
        >
          Back to list
        </Button>
      </div>
    </>
  );
}

export default connect(null, { updateUser })(ProfileView);
