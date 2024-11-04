import { useRouter } from "next/router";
import React, { useState } from "react";

function Index() {
  const router = useRouter();

  const [firstName, SetFirstName] = useState("");
  const [lastName, SetLastName] = useState("");
  const [userName, SetUserName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");

  const signupHandler = async (event) => {
    event.preventDefault();

    const userData = { firstName, lastName, userName, email, password };

    const res = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (res.status === 201) {
      SetFirstName("");
      SetLastName("");
      SetUserName("");
      SetEmail("");
      SetPassword("");
      alert("Join Successfully :))");
      router.replace("/dashboard");
    } else if (res.status == 422) {
      alert("This userName Or email exist already");
    }
  };

  return (
    <div className="box">
      <h1 align="center">SignUp Form</h1>
      <form role="form" method="post">
        <div className="inputBox">
          <input
            type="text"
            value={firstName}
            onChange={(e) => SetFirstName(e.target.value)}
            autoComplete="off"
            required
          />
          <label>Firstname</label>
        </div>
        <div className="inputBox">
          <input
            type="text"
            value={lastName}
            onChange={(e) => SetLastName(e.target.value)}
            autoComplete="off"
            required
          />
          <label>Lastname</label>
        </div>
        <div className="inputBox">
          <input
            type="text"
            value={userName}
            onChange={(e) => SetUserName(e.target.value)}
            autoComplete="off"
            required
          />
          <label>Username</label>
        </div>
        <div className="inputBox">
          <input
            type="email"
            value={email}
            onChange={(e) => SetEmail(e.target.value)}
            autoComplete="off"
            required
          />
          <label>Email</label>
        </div>
        <div className="inputBox">
          <input
            type="password"
            value={password}
            onChange={(e) => SetPassword(e.target.value)}
            autoComplete="off"
            required
          />
          <label>Password</label>
        </div>

        <input
          type="submit"
          className="register-btn"
          value="Sign Up"
          onClick={signupHandler}
        />
      </form>
    </div>
  );
}

export default Index;
