import React, { useState } from "react";
import { useUserSignupMutation } from "../authSignupApi";

interface UserData {
  name: string;
  email: string;
  password: string;
  role: string;
}

const Signup: React.FC = () => {
  const [userdata, setData] = useState<UserData>({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [userSignup, { data, isLoading, error }] = useUserSignupMutation();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const result = await userSignup(userdata).unwrap();

      console.log("Signup success:", result);
    } catch (err) {
      console.log("Signup failed:", err);
    }
  }

  return (
    <div>
      <h1>Signup</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          name="name"
          value={userdata.name}
          onChange={handleChange}
        />

        <input
          type="email"
          placeholder="email"
          name="email"
          value={userdata.email}
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="password"
          name="password"
          value={userdata.password}
          onChange={handleChange}
        />

        <select name="role" value={userdata.role} onChange={handleChange}>
          <option value="admin">admin</option>
          <option value="user">user</option>
          <option value="seller">seller</option>
          <option value="buyer">buyer</option>
        </select>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Signup"}
        </button>
      </form>

      {data && <p>Welcome {data.name}!</p>}

      {error && <p>Signup failed. Please try again.</p>}
    </div>
  );
};

export default Signup;
