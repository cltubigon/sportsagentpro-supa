// supabaseApi.js
import { createApi } from "@reduxjs/toolkit/query/react"
import supabase from "../config/supabaseClient"

export const supabaseApi = createApi({
  baseQuery: async (args) => {
    const { data, error } = await supabase.from(args.endpoint).select("*")
    if (error) throw error
    return { data }
  },
  endpoints: (builder) => ({
    getAthletes: builder.query({
      query: () => "athlete",
    }),
    getPosts: builder.query({
      query: () => "posts",
    }),
    getUsers: builder.query({
      query: () => "users",
    }),
  }),
})

export const { useGetAthletesQuery, useGetPostsQuery, useGetUsersQuery } =
  supabaseApi