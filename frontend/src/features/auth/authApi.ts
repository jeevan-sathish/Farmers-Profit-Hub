import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface SignupRequest {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface SignupResponse {
  id: number;
  name: string;
  email: string;
  role: string;
  fph_access_token: string;
  fph_refresh_token: string;
}

interface SigninRequest {
  email: string;
  password: string;
}

interface SigninResponse {
  id: number;
  name: string;
  email: string;
  role: string;
  fph_access_token: string;
  fph_refresh_token: string;
}

export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),

  endpoints: (builder) => ({
    userSignup: builder.mutation<SignupResponse, SignupRequest>({
      query: (data) => ({
        url: "auth/signup",
        method: "POST",
        body: data,
      }),
    }),

    userSignin: builder.mutation<SigninResponse, SigninRequest>({
      query: (data) => ({
        url: "auth/signin",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useUserSignupMutation, useUserSigninMutation } = authApi;
