import React from "react";
import Signup from "../components/Signup";
import Signin from "../components/Signin";

const AuthPage: React.FC = () => {
  return (
    <div>
      <Signup />
      <hr />
      <Signin />
    </div>
  );
};

export default AuthPage;
