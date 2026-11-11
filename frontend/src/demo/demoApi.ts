import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface MessageRequest {
  message: string;
}

interface MessageResponse {
  response: string;
}

export const messageApi = createApi({
  reducerPath: "messageApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),

  endpoints: (builder) => ({
    sendMessage: builder.mutation<MessageResponse, MessageRequest>({
      query: (data) => ({
        url: "/message",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSendMessageMutation } = messageApi;
