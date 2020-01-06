import * as React from "react";
import { useSetUserContext } from "../contexts/user";

const Login = () => {
  const [user] = React.useState({
    email: "",
    password: ""
  });
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    setError(null);
  }, [user.email, user.password]);

  const setUserContext = useSetUserContext();
  return (
    <>
      <h1>Login</h1>
      {error && <p>Error: {error}</p>}
      <form
        onSubmit={e => {
          setError(null);
          e.preventDefault();
          if (
            user.email &&
            user.password &&
            user.password.trim() === "password"
          ) {
            setUserContext({
              name: "Test User",
              ...user
            });
          } else {
            setError("invalid");
          }
        }}
      >
        <input
          name="email"
          value={user.email}
          onChange={event => {
            user.email = event.target.value;
          }}
        />
        <input
          name="password"
          value={user.password}
          onChange={event => {
            user.password = event.target.value;
          }}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
