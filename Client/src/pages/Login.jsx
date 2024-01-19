import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const URL = "http://localhost:5000/api/auth/login";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      console.log("Login form", response);

      if (response.ok) {
        alert("Login Successful");
        setUser({
          email: "",
          password: "",
        });
        navigate("/");
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <main>
        <div className="section-registration">
          <h1 className="main-heading mb-3">Login form</h1>
          <br />
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <br></br>
              <input
                type="text"
                name="email"
                value={user.email}
                onChange={handleInput}
                placeholder="Email"
                autoComplete="off"
              />
            </div>
            <br></br>
            <div>
              <label htmlFor="password">Password</label>
              <br></br>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleInput}
                placeholder="Password"
                autoComplete="off"
              />
            </div>
            <br />
            <button type="submit" className="btn btn-submit">
              Login Now
            </button>
          </form>
        </div>
      </main>
    </section>
  );
}

export default Login;
