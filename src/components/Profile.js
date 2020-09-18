import * as React from "react";
import { useUserContext } from "../contexts/user";

/**
 * This should update the user context with the new values for email and name
 */
const Profile = () => {
  const user = useUserContext();
  
  return (
    <div>
      <h1>Edit your profile</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <label>Email: </label>
        <input
          name="email"
          value={user.email}
          onChange={e => {
            user.email = e.target.value;
          }}
        />
        <label>User Name: </label>
        <input
          name="name"
          defaultValue={user.name}
          onChange={e => {
            user.name = e.target.value;
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Profile;
