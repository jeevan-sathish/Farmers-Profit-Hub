import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface SignupRequest {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface SignupResponce {
  id: number;
  name: string;
  email: string;
  role: string;
  fph_access_token: string;
  fph_refresh_token: string;
}

export const authSignupApi = createApi({
  reducerPath: "userSignup",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  endpoints: (builder) => ({
    userSignup: builder.mutation<SignupResponce, SignupRequest>({
      query: (data) => ({
        url: "auth/signup",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useUserSignupMutation } = authSignupApi;
