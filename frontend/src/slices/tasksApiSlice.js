import { TASKS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const tasksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => ({
        url: TASKS_URL,
      }),
      keepUnusedDataFor: 5, // Keep data for 5 seconds
      providesTags: ["Task"],
    }),
    createTask: builder.mutation({
      query: (data) => ({
        url: TASKS_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Task"],
    }),
    updateTask: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${TASKS_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Task"],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `${TASKS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});
export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApiSlice;
