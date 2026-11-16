import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setCredentials } from "../authSlice";
import { useUserSignupMutation } from "../authApi";

const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must contain at least 3 characters")
    .max(50, "Name is too long"),

  email: z.string().trim().email("Enter a valid email address"),

  password: z
    .string()
    .min(8, "Password must contain at least 8 characters")
    .regex(/[A-Z]/, "Add at least one uppercase letter")
    .regex(/[0-9]/, "Add at least one number"),

  role: z.enum(["user", "seller", "buyer"]),
});

type UserData = z.infer<typeof signupSchema>;

const Signup: React.FC = () => {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [userSignup, { isLoading, error }] = useUserSignupMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "user",
    },
    mode: "onBlur",
  });

  async function onSubmit(userdata: UserData) {
    setSuccessMessage("");

    try {
      const result = await userSignup(userdata).unwrap();

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

      setSuccessMessage("Account created successfully!");
    } catch (err) {
      console.error("Signup failed:", err);
    }
  }

  const inputStyle = (hasError: boolean) =>
    `w-full rounded-xl border bg-white px-4 py-3
    text-gray-900 outline-none transition-all duration-200
    placeholder:text-gray-400
    focus:ring-4
    ${
      hasError
        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
        : "border-gray-200 focus:border-green-500 focus:ring-green-100"
    }`;

  return (
    <div
      className="min-h-screen bg-green-50/60 px-4 py-10
                    flex items-center justify-center"
    >
      <div
        className="w-full max-w-md rounded-3xl bg-white
                      p-6 sm:p-8 shadow-xl shadow-green-900/5
                      border border-green-100"
      >
        <div className="mb-8 text-center">
          <div
            className="mx-auto mb-4 flex h-14 w-14
                          items-center justify-center rounded-2xl
                          bg-green-100 text-green-700
                          text-2xl font-bold"
          >
            F
          </div>

          <h1
            className="text-3xl font-bold tracking-tight
                         text-gray-900"
          >
            Create account
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Join us and get started today.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label
              className="mb-2 block text-sm font-semibold
                              text-gray-700"
            >
              Full name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              autoComplete="name"
              {...register("name")}
              className={inputStyle(!!errors.name)}
            />

            {errors.name && (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-semibold
                              text-gray-700"
            >
              Email address
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              {...register("email")}
              className={inputStyle(!!errors.email)}
            />

            {errors.email && (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-semibold
                              text-gray-700"
            >
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                autoComplete="new-password"
                {...register("password")}
                className={`${inputStyle(!!errors.password)}
                            pr-16`}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2
                           -translate-y-1/2 text-sm
                           font-medium text-green-700
                           hover:text-green-900"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}

            <p className="mt-1.5 text-xs text-gray-400">
              Minimum 8 characters, 1 uppercase letter and 1 number.
            </p>
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-semibold
                              text-gray-700"
            >
              Account type
            </label>

            <select {...register("role")} className={inputStyle(!!errors.role)}>
              <option value="user">User</option>
              <option value="seller">Seller</option>
              <option value="buyer">Buyer</option>
            </select>

            {errors.role && (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.role.message}
              </p>
            )}
          </div>

          {error && (
            <div
              className="rounded-xl border border-red-200
                            bg-red-50 px-4 py-3 text-sm
                            text-red-700"
            >
              Signup failed. Email may already exist or the server is
              unavailable.
            </div>
          )}

          {successMessage && (
            <div
              className="rounded-xl border border-green-200
                            bg-green-50 px-4 py-3 text-sm
                            text-green-700"
            >
              {successMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || isSubmitting}
            className="flex w-full items-center justify-center
                       gap-2 rounded-xl bg-green-600 px-4 py-3.5
                       font-semibold text-white shadow-lg
                       shadow-green-600/20 transition-all
                       duration-200 hover:bg-green-700
                       hover:shadow-green-700/25
                       active:scale-[0.98]
                       disabled:cursor-not-allowed
                       disabled:opacity-60"
          >
            {isLoading || isSubmitting ? (
              <>
                <span
                  className="h-5 w-5 animate-spin
                                 rounded-full border-2
                                 border-white/30
                                 border-t-white"
                />
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a
            href="/signin"
            className="font-semibold text-green-700
                       hover:text-green-900"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
