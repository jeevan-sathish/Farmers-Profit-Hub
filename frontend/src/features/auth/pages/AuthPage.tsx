import React from "react";
import Signup from "../components/Signup";
import Signin from "../components/Signin";
import Demo from "../components/Demo";

const AuthPage: React.FC = () => {
  const [authMode, setAuthMode] = React.useState<"signup" | "signin">("signup");
  return (
    <div>
      <div>
        {" "}
        <button onClick={() => setAuthMode("signup")}>signup</button>{" "}
        <button onClick={() => setAuthMode("signin")}>signin</button>
      </div>
      {authMode == "signin" ? <Signin /> : <Signup />}
      <br />
      <br />

      <div>
        <Demo />
      </div>
    </div>
  );
};

export default AuthPage;
