import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../utils/auth";

function Login() {
  const [inputs, setInputs] = useState({});
  const auth = useAuth();
  const navigate = useNavigate();

  const handlelogin = () => {
    auth.login({
      email: inputs.username,
      password: inputs.password,
    })
    navigate("/home", { replace: true });
    
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    // console.log(JSON.stringify(inputs));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // alert(JSON.stringify(inputs));
    handlelogin();
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
    </div>
  );
}
export default Login;
