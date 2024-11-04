import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Index() {
  const router = useRouter();
  const [identifier, SetIdentifier] = useState("");
  const [password, SetPassword] = useState("");

  useEffect(() => {
    fetch("/api/auth/me").then((res) => {
      if (res.status == 200) {
        router.replace("/todos");
      }
    });
  }, []);

  const signInHandler = async (event) => {
    event.preventDefault();

    const user = { identifier, password };

    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (res.status === 200) {
      SetIdentifier("");
      SetPassword("");
      alert("Logged in Successfully :))");
      router.replace("/todos");
    } else if (res.status == 404) {
      alert("User Not Found");
    } else if (res.status == 422) {
      alert("userName Or password is not correct");
    } else if (res.status == 500) {
      alert("Server Not Response");
    }
  };
  return (
    <div className="box">
      <h1 align="center">Login Form</h1>
      <form role="form" method="post">
        <div className="inputBox">
          <input
            type="text"
            value={identifier}
            onChange={(e) => SetIdentifier(e.target.value)}
            autoComplete="off"
            required
          />
          <label>Username Or Email</label>
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
          value="Sign In"
          onClick={signInHandler}
        />
      </form>
    </div>
  );
}

export default Index;
