import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export let allApi = createApi({
  reducerPath: "allApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://store-api.softclub.tj/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userData) => ({
        url: "Account/login",
        method: "POST",
        body: userData,
      }),
    }),

    getProducts: builder.query({
      query: (params) => ({
        url: "Product/get-products",
        params,
      }),
    }),
  }),
});

export let { useLoginMutation, useGetProductsQuery } = allApi;
