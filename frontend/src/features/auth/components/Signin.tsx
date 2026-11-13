import React, { useState } from "react";
import { useAppDispatch } from "../../../app/hook";
import { useUserSigninMutation } from "../authApi";
import { setCredentials } from "../authSlice";

interface SignInData {
  email: string;
  password: string;
}

const Signin: React.FC = () => {
  const dispatch = useAppDispatch();

  const [userSignin, { data, isLoading, error }] = useUserSigninMutation();

  const [userdata, setUserdata] = useState<SignInData>({
    email: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setUserdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const result = await userSignin(userdata).unwrap();

      dispatch(
        setCredentials({
          user: {
            id: result.id,
            name: result.name,
            email: result.email,
            role: result.role,
          },
          fph_access_token: result.fph_access_token,
          fph_refresh_token: result.fph_refresh_token,
        }),
      );

      console.log("Signin success:", result);
    } catch (err) {
      console.log("Signin failed:", err);
    }
  }

  return (
    <div>
      <h1>Signin</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={userdata.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          value={userdata.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Signin"}
        </button>
      </form>

      {data && <p>Welcome {data.name}!</p>}

      {error && <p>Signin failed. Check your email and password.</p>}
    </div>
  );
};

export default Signin;
