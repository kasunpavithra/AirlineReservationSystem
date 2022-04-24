import { useState } from "react";
import Axios from "axios";
function Login() {
  const [inputs, setInputs] = useState({});
  const [loginStatus, setLoginStatus] = useState("");

  const login = () => {
    Axios.post("http://localhost:3001/api/login", {
      name: inputs.username,
      password: inputs.password,
    }).then((response) => {
      console.log(response);
      if (!response) {
        setLoginStatus("No user exists!!!");
      } else if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(response.data[0].name);
      }
    });
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    console.log(JSON.stringify(inputs));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // alert(JSON.stringify(inputs));
    login();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={inputs.username || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={inputs.password || ""}
            onChange={handleChange}
          />
        </label>
        <input type="submit" />
      </form>
      <h1>{loginStatus}</h1>
    </div>
  );
}
export default Login;
