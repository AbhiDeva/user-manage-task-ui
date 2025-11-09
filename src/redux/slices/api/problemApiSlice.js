import { PROBLEMS_URL } from "../../../utils/contants";
import { apiSlice } from "../apiSlice";

export const problemApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createProblem: builder.mutation({
            query: (data) => ({
                url: `${PROBLEMS_URL}`,
                method: "POST",
                body: data,
                credentials: "include",
            }),
             invalidatesTags: ['Problem'],
        }),

        getAllProblems: builder.query({
            query: ({ difficulty = '', category = '', search = '' } = {}) => ({
                url: `${PROBLEMS_URL}?difficulty=${difficulty}&category=${category}&search=${search}`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ['Problem'],
        }),

        getSingleProblem: builder.query({
            query: (id) => ({
                url: `${PROBLEMS_URL}/${id}`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: (result, error, id) => [{ type: 'Problem', id}]
        }),


        updateProblem: builder.mutation({
            query: ({id, data}) => ({
                url: `${PROBLEMS_URL}/${id}`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Problem', id }, 'Problem'],
        }),

        deleteProblem: builder.mutation({
            query: ({ id }) => ({
                url: `${PROBLEMS_URL}/${id}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ['Problem'],
        })
    })
})

export const {
    useCreateProblemMutation,
    useGetAllProblemsQuery,
    useGetSingleProblemQuery,
    useUpdateProblemMutation,
    useDeleteProblemMutation
} = problemApiSlice