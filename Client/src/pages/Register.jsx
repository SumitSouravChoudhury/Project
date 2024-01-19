import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    console.log(e);
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
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        alert("Registration Successful");
        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
        });
        navigate("/login");
      } else {
        alert("Registration Unsuccessful");
      }
    } catch (error) {
      console.log("Register", error);
    }
  };

  return (
    <section>
      <main>
        <div className="section-registration">
          <h1 className="main-heading mb-3">Registration form</h1>
          <br />
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <br></br>
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleInput}
                placeholder="Username"
                autoComplete="off"
              />
            </div>
            <br></br>
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
              <label htmlFor="phone">Phone</label>
              <br></br>
              <input
                type="number"
                name="phone"
                value={user.phone}
                onChange={handleInput}
                placeholder="Phone"
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
              Register Now
            </button>
          </form>
        </div>
      </main>
    </section>
  );
}

export default Register;
