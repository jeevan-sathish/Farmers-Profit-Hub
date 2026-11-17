import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useAppDispatch } from "../../../app/hook";
import { useUserSigninMutation } from "../authApi";
import { setCredentials } from "../authSlice";

const signinSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type SignInData = z.infer<typeof signinSchema>;

const Signin: React.FC = () => {
  const dispatch = useAppDispatch();

  const [userSignin, { isLoading }] = useUserSigninMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const inputStyle = (hasError: boolean) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:ring-4 ${
      hasError
        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
        : "border-gray-200 focus:border-green-500 focus:ring-green-100"
    }`;

  async function handleSignin(userdata: SignInData) {
    setApiError("");
    setSuccess("");

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

      setSuccess(`Welcome back, ${result.name}!`);

      console.log("Signin success:", result);
    } catch (err) {
      console.log("Signin failed:", err);
      setApiError("Invalid email or password. Please try again.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-xl shadow-gray-200/50">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-xl font-bold text-white">
            F
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Sign in to your FarmersProfitHub account
          </p>
        </div>

        {apiError && (
          <div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {apiError}
          </div>
        )}

        {success && (
          <div className="mb-5 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit(handleSignin)} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email address
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              className={inputStyle(!!errors.email)}
            />

            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password")}
                className={`${inputStyle(!!errors.password)} pr-16`}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-green-600 hover:text-green-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center rounded-xl bg-green-600 px-4 py-3 font-semibold text-white transition-all duration-200 hover:bg-green-700 focus:ring-4 focus:ring-green-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="font-semibold text-green-600 hover:text-green-700"
          >
            Create account
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signin;
